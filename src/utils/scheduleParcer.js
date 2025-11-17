// src/utils/scheduleParser.ts
/**
 * Извлекает полный текст занятия, включая преподавателя.
 * Отдельно извлекает период, но не разделяет дисциплину и преподавателя.
 */
function extractFullLessonText(lessonData) {
    let period = undefined;
    let fullDisciplineText = lessonData.trim();
    // 1. Извлечение периода (например, "До 18.11.25г.")
    const periodMatch = fullDisciplineText.match(/(\s*До\s+\d{2}\.\d{2}\.\d{2}г\.\s*)$/i);
    if (periodMatch) {
        period = periodMatch[0].trim();
        fullDisciplineText = fullDisciplineText
            .substring(0, periodMatch.index)
            .trim(); // Удаляем период
    }
    // 2. Очистка кода модуля (ПМ-1, ООМ-3 и т.п.)
    // Это помогает сделать вывод чище, но сохраняет ФИО преподавателя
    const codeMatch = fullDisciplineText.match(/^(ПМ|ООМ)-\d+\s/);
    if (codeMatch) {
        fullDisciplineText = fullDisciplineText.replace(codeMatch[0], '').trim();
    }
    return { fullDisciplineText, period };
}
export function parseSchedule(rawData) {
    const parsedData = [];
    rawData.forEach(row => {
        const time = row['ВРЕМЯ'];
        const day = row['ДНИ'];
        Object.keys(row).forEach(key => {
            if (['ДНИ', 'ВРЕМЯ', 'День', ''].includes(key)) {
                return;
            }
            const lessonDataRaw = row[key];
            if (!lessonDataRaw || lessonDataRaw.trim() === '') {
                return;
            }
            // 1. Извлечение метаданных (Курс и Группа)
            const courseMatch = key.match(/((\d)\s*курс)/i);
            const course = courseMatch ? courseMatch[1] : 'Курс не указан';
            const groupMatch = key.match(/\d{2}-\d{3}/);
            const groupName = groupMatch ? groupMatch[0] : key.substring(0, 15).trim();
            // 2. Разделяем строку по разделителю "/" и обрабатываем каждое занятие
            const rawLessons = lessonDataRaw
                .split('/')
                .map(l => l.trim())
                .filter(l => l.length > 0);
            // Определяем текст для добавления в скобках (нечетное/четное)
            let suffixes = [];
            if (rawLessons.length === 2) {
                suffixes = [' (нечетное)', ' (четное)'];
            }
            rawLessons.forEach((lessonData, index) => {
                // 3. Извлечение полного текста занятия и периода
                const { fullDisciplineText, period } = extractFullLessonText(lessonData);
                // Добавление суффикса (нечетное/четное)
                const finalDisciplineText = fullDisciplineText + (suffixes[index] || '');
                // Добавление периода, если он есть
                const finalPeriodText = finalDisciplineText + (period ? ` (${period})` : '');
                // Игнорируем пустые/несущественные записи
                if (fullDisciplineText.length > 0) {
                    parsedData.push({
                        day,
                        time,
                        groupName,
                        course,
                        discipline: finalPeriodText, // <-- Теперь здесь весь текст
                        teacher: '', // <-- Оставляем пустым
                        period: undefined, // <-- Период уже включен в discipline
                    });
                }
            });
        });
    });
    return parsedData;
}
