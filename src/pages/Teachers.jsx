import styles from './teachers.module.scss'
import schedule from '../schedule1.json'
import { useEffect, useState } from 'react'
export default function Teachers() {
	const handleKeys = [
		'Время',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
	]
	const [teacher, setTeacher] = useState('')
	const sortedScehedule = schedule[0]
	const keys = Object.keys(sortedScehedule)
	const search = () => {
		for (let i = 0; i < keys.length - 1; i++) {
			const groupNumber = keys[i]
			if (teacher === '' || groupNumber.length == 0) return null
			const groupWeekend = sortedScehedule[groupNumber]
			const weekKeys = Object.keys(groupWeekend)
			for (let j = 0; j < weekKeys.length; j++) {
				const time = groupWeekend['Время']
				const groupData = groupWeekend[weekKeys[j]]
				groupData.forEach((element, k) => {
					if (element.includes(teacher)) {
						console.log(
							`Группа: ${groupNumber}, День: ${weekKeys[j]}, Время: ${time[k]}, Пара: ${element}`
						)
					}
				})
			}
		}
	}

	useEffect(() => {
		search()
	}, [teacher])
	return (
		<div className={styles.teachersPage}>
			<h2>Расписание преподавателей</h2>
			<input
				placeholder='Введите фамилию!'
				className={styles.input}
				value={teacher}
				onChange={e => setTeacher(e.target.value)}
			/>
			<button onClick={() => search()}>Поиск</button>
		</div>
	)
}
