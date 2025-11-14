// src/pages/TeacherSchedulePage.tsx
import React, { useState, useMemo } from 'react'
import { parseSchedule, ParsedLesson } from '../../utils/scheduleParcer'
import rawScheduleData from '../../scheduleData.json'

const DAYS = ['ПОНЕДЕЛЬНИК', 'ВТОРНИК', 'СРЕДА', 'ЧЕТВЕРГ', 'ПЯТНИЦА']
const SAVED_TEACHER_NAME = 'savedTeacherName' // Ключ для localStorage

export default function TeacherSchedulePage() {
	// ❗ Инициализация состояния: Пытаемся загрузить данные из localStorage
	const [teacherName, setTeacherName] = useState(() => {
		return localStorage.getItem(SAVED_TEACHER_NAME) || ''
	})
	const [selectedDay, setSelectedDay] = useState(DAYS[0])

	const allLessons = useMemo(() => parseSchedule(rawScheduleData as any), [])

	const filteredSchedule: ParsedLesson[] = useMemo(() => {
		if (!teacherName) return []

		const normTeacher = teacherName.trim().toUpperCase()

		return allLessons
			.filter(
				lesson =>
					lesson.day === selectedDay &&
					lesson.discipline.toUpperCase().includes(normTeacher)
			)
			.sort((a, b) => a.time.localeCompare(b.time))
	}, [allLessons, teacherName, selectedDay])

	const handleTeacherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTeacherName(event.target.value)
	}

	const handleDayChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedDay(event.target.value)
	}

	// 🚀 НОВАЯ ФУНКЦИЯ: Сохранение фамилии в localStorage
	const handleSave = () => {
		if (teacherName.trim()) {
			localStorage.setItem(SAVED_TEACHER_NAME, teacherName.trim())
		}
	}

	// Функция для форматирования дня: Понедельник
	const formatDay = (day: string) =>
		day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()

	return (
		<>
			<div className='p-5 mb-4 bg-warning bg-opacity-10 rounded-3 text-center'>
				<h1 className='display-5 fw-bold text-warning'>
					Расписание для Преподавателей
				</h1>
				<p className='lead'>
					Введите фамилию (например, **Керимов**) и нажмите "Сохранить", чтобы
					запомнить выбор.
				</p>
			</div>

			<div className='card shadow mb-4'>
				<div className='card-body'>
					<h5 className='card-title'>Параметры поиска: Фамилия и День</h5>
					<div className='row g-3'>
						<div className='col-md-5'>
							<label htmlFor='teacherInput' className='form-label'>
								Фамилия преподавателя
							</label>
							<input
								type='text'
								className='form-control'
								id='teacherInput'
								value={teacherName}
								onChange={handleTeacherChange}
								placeholder='Например, Керимов'
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
								className='btn btn-warning w-100'
								disabled={!teacherName}
								onClick={handleSave} // Вызываем функцию сохранения
							>
								Сохранить
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* 📋 Отображение расписания (теперь фильтрация происходит мгновенно по мере ввода,
          а кнопку нужно нажать только для сохранения) */}
			{teacherName && (
				<div className='mt-5'>
					<h2 className='mb-3'>
						Нагрузка преподавателя **{teacherName}** на **
						{formatDay(selectedDay)}**
					</h2>
					<div className='table-responsive shadow-sm'>
						<table className='table table-hover table-striped table-bordered align-middle'>
							<thead className='table-dark'>
								<tr>
									<th>Время</th>
									<th>Группа</th>
									<th>Дисциплина</th>
								</tr>
							</thead>
							<tbody>
								{filteredSchedule.length > 0 ? (
									filteredSchedule.map((lesson, index) => (
										<tr key={index} className='table-warning'>
											<th>{lesson.time}</th>
											<td>
												{lesson.groupName} ({lesson.course})
											</td>
											<td>{lesson.discipline}</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={3} className='text-center text-muted'>
											{teacherName
												? `Преподаватель ${teacherName} не ведет занятия ${formatDay(
														selectedDay
												  )}.`
												: 'Введите фамилию для поиска.'}
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
