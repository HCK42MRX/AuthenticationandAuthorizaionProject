import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import component
import Home from './Page/Home'
import Register from './Page/Register'
import Login from './Page/Login'

function App () {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
