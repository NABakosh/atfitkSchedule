import styles from "./teachers.module.scss";
import schedule from "../schedule1.json";
import { useEffect, useState } from "react";

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

  return (
    <div className={styles.teachersPage}>
      <h2>Расписание преподавателей</h2>
      <input
        placeholder="Введите фамилию!"
        className={styles.input}
        value={teacher}
        onChange={(e) => setTeacher(e.target.value)}
      />
      <button onClick={search}>Поиск</button>

      <div className={styles.results}>
        {results.length > 0 ? (
          results.map((item, index) => (
            <div key={index} className={styles.resultItem}>
              <p>
                **Группа:** {item.group}, **День:** {item.day}, **Время:**{" "}
                {item.time}
              </p>
              <p>**Пара:** {item.lesson}</p>
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
