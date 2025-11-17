// 🚀 Импорт React Router
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

// Импорт страниц
import StudentSchedulePage from "./components/studentSchedule/studentSChedule";
import TeacherSchedulePage from "./components/teacherSchedule/teacherSchedule";

// Корневой путь для Студентов
const STUDENT_PATH = "/";
// Путь для Преподавателей
const TEACHER_PATH = "/teacher";

function App() {
  return (
    // Оборачиваем все приложение в BrowserRouter
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        {/* 1. Навигационная панель (Navbar) */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to={STUDENT_PATH}>
              OnlineSchedule
            </Link>

            {/* 🚀 Кнопка переключения, используем Link для смены URL */}
            <div className="ms-auto">
              <Routes>
                {/* Если мы на странице Студентов, показываем кнопку "Преподаватель" */}
                <Route
                  path={STUDENT_PATH}
                  element={
                    <Link to={TEACHER_PATH} className="btn btn-outline-info">
                      Режим Преподавателя
                    </Link>
                  }
                />
                {/* Если мы на странице Преподавателей, показываем кнопку "Студент" */}
                <Route
                  path={TEACHER_PATH}
                  element={
                    <Link to={STUDENT_PATH} className="btn btn-outline-warning">
                      Режим Студента
                    </Link>
                  }
                />
              </Routes>
            </div>
          </div>
        </nav>

        {/* Основное содержимое страницы */}
        <main className="container my-5 flex-grow-1">
          {/* 🚀 Routes определяет, какой компонент отображать в зависимости от URL */}
          <Routes>
            <Route path={STUDENT_PATH} element={<StudentSchedulePage />} />
            <Route path={TEACHER_PATH} element={<TeacherSchedulePage />} />
            {/* Дополнительно: обработка 404 ошибки */}
            <Route
              path="*"
              element={
                <div className="alert alert-danger">
                  404: Страница не найдена
                </div>
              }
            />
          </Routes>
        </main>

        {/* 5. Футер (Footer) */}
        <footer className="footer mt-auto py-3 bg-light border-top">
          <div className="container text-center">
            <span className="text-muted">
              &copy; {new Date().getFullYear()} OnlineSchedule.
            </span>
          </div>
        </footer>
      </div>
      <Analytics />
    </BrowserRouter>
  );
}

export default App;
