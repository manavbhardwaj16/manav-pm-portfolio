import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="App grain">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#121214",
            color: "#fafafa",
            border: "1px solid #27272a",
            borderRadius: 0,
            fontFamily: "Geist, sans-serif",
          },
        }}
      />
    </div>
  );
}

export default App;
