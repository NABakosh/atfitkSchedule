import { Link, useLocation } from 'react-router-dom'
import styles from './scss/slider.module.scss'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
export default function Slider() {
	const [active, setActive] = useState(false)
	const location = useLocation()
	useEffect(() => {
		if (location.pathname === '/teachers') {
			setActive(true)
		}
	}, [])
	return (
		<div className={styles.slider}>
			<nav className={styles.nav}>
				<span
					onClick={() => setActive(false)}
					className={clsx(styles.link, active ? '' : styles.active)}
				>
					<Link to='/'>Студенты</Link>
				</span>
				<span
					onClick={() => setActive(true)}
					className={clsx(styles.link, active ? styles.active : '')}
				>
					<Link to='/teachers'>Преподаватели</Link>
				</span>
			</nav>
		</div>
	)
}
