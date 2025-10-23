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
          Сайт находиться в стадий обновления <br></br>При нахождений ошибок
          прошу написать на ватсап
          <a href="https://wa.me/+77471220635">+77471220635</a>
        </p>
        <p></p>
      </footer>
    </div>
  );
}

export default App;
