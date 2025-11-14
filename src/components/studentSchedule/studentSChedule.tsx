// src/pages/StudentSchedulePage.tsx
import React, { useState, useMemo } from 'react'
import { parseSchedule, ParsedLesson } from '../../utils/scheduleParcer'
import rawScheduleData from '../../scheduleData.json'

// 🚀 Новый список дней
const DAYS = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА']
const SAVED_GROUP_NUMBER = 'savedGroupNumber' // Ключ для localStorage

export default function StudentSchedulePage() {
	// ❗ Инициализация состояния: Пытаемся загрузить данные из localStorage
	const [groupNumber, setGroupNumber] = useState(() => {
		return localStorage.getItem(SAVED_GROUP_NUMBER) || ''
	})
	const [selectedDay, setSelectedDay] = useState(DAYS[0]) // По умолчанию ПН

	const allLessons = useMemo(() => parseSchedule(rawScheduleData as any), [])

	const filteredSchedule: ParsedLesson[] = useMemo(() => {
		if (!groupNumber) return []

		const normGroup = groupNumber.trim().toUpperCase()

		return allLessons
			.filter(
				lesson =>
					lesson.day === selectedDay &&
					lesson.groupName.toUpperCase().includes(normGroup)
			)
			.sort((a, b) => a.time.localeCompare(b.time))
	}, [allLessons, groupNumber, selectedDay])

	const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setGroupNumber(event.target.value)
	}

	const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedDay(event.target.value)
	}

	// 🚀 НОВАЯ ФУНКЦИЯ: Сохранение кода группы в localStorage
	const handleSave = () => {
		if (groupNumber.trim()) {
			localStorage.setItem(SAVED_GROUP_NUMBER, groupNumber.trim())
		}
	}

	// Функция для форматирования дня: Понедельник
	const formatDay = (day: string) =>
		day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()

	return (
		<>
			<div className='p-5 mb-4 bg-light rounded-3 text-center'>
				<h1 className='display-5 fw-bold text-primary'>
					Расписание для Студентов
				</h1>
				<p className='lead'>
					Введите код группы (например, 09-220) и нажмите "Сохранить", чтобы
					запомнить выбор.
				</p>
			</div>

			<div className='card shadow mb-4'>
				<div className='card-body'>
					<h5 className='card-title'>Параметры поиска: Группа и День</h5>
					<div className='row g-3'>
						<div className='col-md-5'>
							<label htmlFor='groupInput' className='form-label'>
								Код группы
							</label>
							<input
								type='text'
								className='form-control'
								id='groupInput'
								value={groupNumber}
								onChange={handleGroupChange}
								placeholder='Например, 09-220'
							/>
						</div>

						<div className='col-md-5'>
							<label htmlFor='daySelect' className='form-label'>
								День недели
							</label>
							<select
								id='daySelect'
								className='form-select'
								value={selectedDay}
								onChange={handleDayChange}
							>
								{/* 🚀 Все 5 дней */}
								{DAYS.map(day => (
									<option key={day} value={day}>
										{day}
									</option>
								))}
							</select>
						</div>

						{/* 🚀 Кнопка "Сохранить" */}
						<div className='col-md-2 d-flex align-items-end'>
							<button
								className='btn btn-primary w-100'
								disabled={!groupNumber}
								onClick={handleSave} // Вызываем функцию сохранения
							>
								Сохранить
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* 📋 Отображение расписания */}
			{groupNumber && (
				<div className='mt-5'>
					<h2 className='mb-3'>
						Расписание для группы **{groupNumber}** на **
						{formatDay(selectedDay)}**
					</h2>
					<div className='table-responsive shadow-sm'>
						<table className='table table-hover table-striped table-bordered align-middle'>
							<thead className='table-dark'>
								<tr>
									<th>Время</th>
									<th>Дисциплина</th>
								</tr>
							</thead>
							<tbody>
								{filteredSchedule.length > 0 ? (
									filteredSchedule.map((lesson, index) => (
										<tr key={index}>
											<th>{lesson.time}</th>
											<td>{lesson.discipline}</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={2} className='text-center text-muted'>
											{groupNumber
												? `Нет занятий для группы ${groupNumber} на ${formatDay(
														selectedDay
												  )}.`
												: 'Введите код группы для поиска.'}
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>
				</div>
			)}
		</>
	)
}
