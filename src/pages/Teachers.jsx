import styles from "./teachers.module.scss";
import schedule from "../schedule1.json";
import { useEffect, useState } from "react";

export default function Teachers() {
  const handleKeys = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"];
  const [teacher, setTeacher] = useState("");
  const [result, setResult] = useState([]);
  const sortedScehedule = schedule[0];
  const keys = Object.keys(sortedScehedule);
  const search = () => {
    const foundData = [];
    for (let i = 0; i < keys.length; i++) {
      const groupNumber = keys[i];
      if (teacher === "" || groupNumber.length == 0) return null;
      const groupWeekend = sortedScehedule[groupNumber];
      const weekKeys = Object.keys(groupWeekend);
      for (let j = 0; j < weekKeys.length; j++) {
        const time = groupWeekend["Время"];
        const groupData = groupWeekend[weekKeys[j]];
        groupData.forEach((element, k) => {
          const el = element.toLowerCase();
          if (el.includes(teacher.toLowerCase())) {
            console.log(
              `Группа: ${groupNumber}, День: ${weekKeys[j]}, Время: ${time[k]}, Пара: ${element}`
            );
            foundData.push({
              group: groupNumber,
              day: weekKeys[j],
              time: time[k],
              lesson: element,
            });
          }
        });
      }
    }
    setResult(foundData);
    console.log(result);
  };
  const grouppedSchedule = result.reduce((acc, lesson) => {
    const day = lesson.day;
    console.log(day);
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(lesson);
    return acc;
  }, {});
  useEffect(() => {
    search();
  }, [teacher]);
  return (
    <div className={styles.teachersPage}>
      <main>
        <h2>Расписание преподавателей</h2>
        <input
          placeholder="Введите фамилию!"
          className={styles.input}
          value={teacher}
          onChange={(e) => setTeacher(e.target.value)}
        />
        <button onClick={() => search()}>Поиск</button>
        <div className={styles.dayLists}>
          {handleKeys.map((obj, i) => {
            const lesson = grouppedSchedule[obj];
            console.log(grouppedSchedule);
            console.log(lesson);
            console.log(obj);
            if (lesson == undefined) {
              return null;
            }
            return (
              <div className={styles.dataLists} key={i}>
                <h2>{obj}</h2>
                <div className={styles.listStyle}>
                  {lesson.map((data, j) => (
                    <ul className={styles.teacherSchedule}>
                      <p>{data.group}</p>
                      <p>{data.time}</p>
                      <p>{data.lesson}</p>
                    </ul>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
