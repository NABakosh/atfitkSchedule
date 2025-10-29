import "./App.scss";
import Students from "./pages/Students";
import { Routes, Route } from "react-router-dom";
import Teachers from "./pages/Teachers";
import Slider from "./pages/components/Slider";
import { Analytics } from "@vercel/analytics/react";
function App() {
  return (
    <div className="App">
      <Analytics />
      <nav className="main-nav">
        <Slider></Slider>
      </nav>
      
      <Routes>
        <Route path="/" element={<Students />} />
        <Route path="/teachers" element={<Teachers />} />
      </Routes>
      <footer className="footer">
        <p>
          Ведутся технические работы по обновлению сайта <br></br>
          Об ошибках просим сообщать нам в WhatsApp:
          <a href="https://wa.me/+77471220635">+7 747 122 06 35</a>
        </p>
        <p></p>
      </footer>
    </div>
  );
}

export default App;
