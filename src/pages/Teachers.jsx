import styles from "./teachers.module.scss";
import schedule from "../schedule1.json";
import { useEffect, useState, useMemo } from "react"; // Добавлен useMemo

export default function Teachers() {
  const handleDays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];

  const [teacher, setTeacher] = useState("");
  const [results, setResults] = useState([]);

  const sortedScehedule = schedule[0];
  const keys = Object.keys(sortedScehedule);

  const search = () => {
    if (!teacher.trim()) {
      setResults([]);
      return;
    }

    const foundSchedules = [];

    for (const group of keys) {
      const groupSchedule = sortedScehedule[group];

      for (const dayKey of handleDays) {
        const daySchedule = groupSchedule[dayKey];
        if (!daySchedule) {
          continue;
        }

        for (let timeIndex = 0; timeIndex < daySchedule.length; timeIndex++) {
          const lessonString = daySchedule[timeIndex];

          if (lessonString.toLowerCase().includes(teacher.toLowerCase())) {
            const timeKey = "Время";
            const timeSlot = groupSchedule[timeKey]
              ? groupSchedule[timeKey][timeIndex]
              : "Нет времени";

            foundSchedules.push({
              group: group,
              day: dayKey,
              time: timeSlot,
              lesson: lessonString,
            });
          }
        }
      }
    }

    setResults(foundSchedules);
  };

  useEffect(() => {
    search();
  }, [teacher]);

  /**
   * Функция для группировки массива результатов по дню недели.
   * Возвращает объект вида: { "Понедельник": [...results], "Вторник": [...results] }
   */
  const groupedResults = useMemo(() => {
    if (results.length === 0) return {};

    return results.reduce((acc, item) => {
      const day = item.day;
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(item);
      return acc;
    }, {});
  }, [results]); // Пересчитываем только при изменении массива results

  // Получаем список дней в правильном порядке
  const daysWithResults = handleDays.filter(
    (day) => groupedResults[day] && groupedResults[day].length > 0
  );

  return (
    <div className={styles.teachersPage}>
      <h2>Расписание преподавателей</h2>
      <input
        placeholder="Введите фамилию!"
        className={styles.input}
        value={teacher}
        onChange={(e) => setTeacher(e.target.value)}
      />

      {/* Вместо прямого отображения results.map теперь итерируемся по сгруппированным результатам */}
      <div className={styles.resultsContainer}>
        {" "}
        {/* Добавим новый контейнер для группировки стилей */}
        {results.length > 0 ? (
          // Итерация по дням, в которых есть результаты
          daysWithResults.map((day) => (
            <div key={day} className={styles.dayGroup}>
              {/* Заголовок дня */}
              <h3 className={styles.dayHeader}>{day}</h3>

              {/* Контейнер для уроков этого дня */}
              <div className={styles.results}>
                {groupedResults[day].map((item, index) => (
                  <div key={`${day}-${index}`} className={styles.resultItem}>
                    <p>
                      {item.group} Группа
                      <br />
                      Время: {item.time}
                    </p>
                    <p>{item.lesson}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : teacher.trim() ? (
          <p>Преподаватель **"{teacher}"** не найден в расписании.</p>
        ) : (
          <p>Введите фамилию для поиска.</p>
        )}
      </div>
    </div>
  );
}
