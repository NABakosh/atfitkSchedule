// processSchedule.ts

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
// Импортируем вашу рабочую функцию parseSchedule
import { parseSchedule } from "./utils/scheduleParcer";
import type { ParsedLesson } from "./utils/scheduleParcer"; // ❗ Вам нужно убедиться, что путь к scheduleData.json верен относительно этого скрипта
import rawScheduleData from "./scheduleData.json";

// Получаем __dirname для ES модулей
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Путь для сохранения обработанных данных
const PROCESSED_DATA_PATH = path.join(__dirname, "processedSchedule.json");

function processAndSaveSchedule() {
  try {
    const rawData: any[] = rawScheduleData;
    console.log(
      `🚀 Начинаем обработку ${rawData.length} строк сырых данных...`
    );

    // Парсинг данных
    const processedData: ParsedLesson[] = parseSchedule(rawData);

    // ❗ Опционально: Добавьте сортировку, если это не влияет на логику фронтенда
    // Например, отсортировать по группе, дню и времени:
    processedData.sort((a, b) => {
      if (a.groupName !== b.groupName) {
        return a.groupName.localeCompare(b.groupName);
      }
      if (a.day !== b.day) {
        return a.day.localeCompare(b.day);
      }
      return a.time.localeCompare(b.time);
    });

    // Записываем отсортированные и обработанные данные в новый JSON-файл
    fs.writeFileSync(
      PROCESSED_DATA_PATH,
      JSON.stringify(processedData, null, 2),
      "utf-8"
    );

    console.log(`✅ Обработка завершена!`);
    console.log(
      `Сохранено ${processedData.length} записей в файл: ${PROCESSED_DATA_PATH}`
    );
  } catch (error) {
    console.error("❌ Ошибка при обработке расписания:", error);
  }
}

processAndSaveSchedule();
