"""Backend tests for Manav Bhardwaj portfolio API.
Covers: root health, /api/chat (LLM, session continuity, validation), /api/contact, /api/contact/count.
"""
import os
import pytest
import requests
from dotenv import load_dotenv
from pathlib import Path

# Load frontend/.env to get the public URL used by the UI
FRONTEND_ENV = Path("/app/frontend/.env")
load_dotenv(FRONTEND_ENV)

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------- Health ----------
class TestHealth:
    def test_root_ok(self, session):
        r = session.get(f"{API}/", timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("ok") is True
        assert "message" in data


# ---------- Chat ----------
class TestChat:
    def test_chat_basic(self, session):
        r = session.post(
            f"{API}/chat",
            json={"message": "What does Manav specialize in? 2 sentences."},
            timeout=90,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert "session_id" in data and isinstance(data["session_id"], str) and len(data["session_id"]) > 0
        assert "reply" in data and isinstance(data["reply"], str) and len(data["reply"]) > 0
        # Store on the class for next test
        TestChat._sid = data["session_id"]

    def test_chat_continues_session(self, session):
        sid = getattr(TestChat, "_sid", None)
        if not sid:
            pytest.skip("No session id from previous test")
        r = session.post(
            f"{API}/chat",
            json={"message": "Give me one specific metric from his Thryl work.", "session_id": sid},
            timeout=90,
        )
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["session_id"] == sid
        assert isinstance(data["reply"], str) and len(data["reply"]) > 0

    def test_chat_invalid_body(self, session):
        # Missing 'message'
        r = session.post(f"{API}/chat", json={"foo": "bar"}, timeout=30)
        assert r.status_code == 422, r.text


# ---------- Contact ----------
class TestContact:
    def test_contact_count_baseline(self, session):
        r = session.get(f"{API}/contact/count", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert "count" in data and isinstance(data["count"], int)
        TestContact._baseline = data["count"]

    def test_contact_valid_submission(self, session):
        payload = {
            "name": "TEST_Reviewer",
            "email": "TEST_reviewer@example.com",
            "message": "Hello Manav — automated test submission.",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("ok") is True
        assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
        TestContact._new_id = data["id"]

    def test_contact_count_increments(self, session):
        baseline = getattr(TestContact, "_baseline", None)
        if baseline is None:
            pytest.skip("No baseline")
        r = session.get(f"{API}/contact/count", timeout=30)
        assert r.status_code == 200
        new_count = r.json()["count"]
        assert new_count >= baseline + 1, f"Expected >= {baseline + 1}, got {new_count}"
        assert new_count >= 1

    def test_contact_invalid_email(self, session):
        payload = {
            "name": "TEST_Bad",
            "email": "not-an-email",
            "message": "bad email payload",
        }
        r = session.post(f"{API}/contact", json=payload, timeout=30)
        assert r.status_code == 422, r.text

    def test_contact_missing_fields(self, session):
        r = session.post(f"{API}/contact", json={"name": "OnlyName"}, timeout=30)
        assert r.status_code == 422
