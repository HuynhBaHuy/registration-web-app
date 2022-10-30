import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import "antd/dist/antd.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
