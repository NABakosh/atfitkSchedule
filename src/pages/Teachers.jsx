import styles from './teachers.module.scss'
import schedule from '../schedule1.json'
import { useState } from 'react'
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
		for (let i = 0; i < keys.length; i++) {
			const tmpSchedule = sortedScehedule[keys[i]]
			const group = keys[i]
			console.log(group, 'grop  ')
			for (let j = 0; j < 7; j++) {
				const tmpHandle = tmpSchedule[handleKeys[j]]
				console.log(tmpHandle[j])
			}
		}
	}
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
