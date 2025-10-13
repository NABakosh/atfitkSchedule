import './App.scss'
import Students from './pages/Students'
import { Routes, Route } from 'react-router-dom'
import Teachers from './pages/Teachers'
import Slider from './pages/components/Slider'

function App() {
	return (
		<div className='App'>
			<nav className='main-nav'>
				<Slider></Slider>
			</nav>
			<Routes>
				<Route path='/' element={<Students />} />
				<Route path='/teachers' element={<Teachers />} />
			</Routes>
			<footer className='footer'>
				<p>
					В случае ошибки c расписанием,
					<a href='https://wa.me/+77471220635'>Нажми меня</a>
				</p>
			</footer>
		</div>
	)
}

export default App
