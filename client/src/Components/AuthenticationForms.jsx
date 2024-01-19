import React, { useState } from 'react'
import axios from 'axios'
// import components
import { BasicInputField, PasswordInputField } from 'components/InputFormField'
import { Link, useNavigate } from 'react-router-dom'

// import assets
function AuthenticationForms ({ type }) {
	const navigate = useNavigate()
	const isLogin = type.toLowerCase() === 'login'
	const [value, setValue] = useState({
		username: '',
		email: '',
		password: ''
	})
	const handleChange = (e) => {
		const { name, value: inputValue } = e.target
		setValue((prevState) => ({
			...prevState,
			[name]: inputValue
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const userLoginData = {
			username: value.username,
			password: value.password
		}
		const userRegisterData = {
			username: value.username,
			email: value.email,
			password: value.password
		}
		try {
			if (isLogin) {
				const loginUser = await axios.post(
					'http://localhost:3000/api/user/login',
					userLoginData
				)
				navigate('/')
			} else {
				const registerUser = await axios.post(
					'http://localhost:3000/api/user/register',
					userRegisterData
				)
				navigate('/')
			}
		} catch (error) {
			console.log(error.response.data)
		}
	}
	return (
		<>
			<div className="hero min-h-screen">
				<div className="hero-content flex-col lg:flex-row-reverse">
					<div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
						<form className="card-body w-96" onSubmit={handleSubmit}>
							{!isLogin
								? (
							// register input
									<>
										<BasicInputField
											type="text"
											label="Username"
											value={value.username}
											onChange={handleChange}
											name="username"
										/>
										<BasicInputField
											type="email"
											label="Email"
											value={value.email}
											onChange={handleChange}
											name="email"
										/>
										<PasswordInputField
											value={value.password}
											onChange={handleChange}
											name="password"
										/>
									</>
								)
								: (
							// Login input
									<>
										<BasicInputField
											type="text"
											label="Username"
											value={value.username}
											onChange={handleChange}
											name="username"
										/>
										<PasswordInputField
											value={value.password}
											onChange={handleChange}
											name="password"
										/>
									</>
								)}
							{isLogin
								? (
									<>
										<section className="flex justify-between items-center mt-5">
											<label htmlFor="remember-me" className="flex gap-x-2">
												<input type="checkbox" name="" id="" />
												<p>Remember me</p>
											</label>

											<label className="label">
												<a href="#" className="label-text-alt link link-hover">
                        Forgot password?
												</a>
											</label>
										</section>
									</>
								)
								: null}
							<div className="form-control mt-6">
								<button className="btn btn-primary">{type}</button>
							</div>
							{isLogin
								? (
									<label className="label">
										<Link
											to="/register"
											className="label-text-alt link link-hover"
										>
                    Belum mempunyai akun?
										</Link>
									</label>
								)
								: (
									<label className="label">
										<Link to="/login" className="label-text-alt link link-hover">
                    Sudah memiliki akun?
										</Link>
									</label>
								)}
						</form>
					</div>
				</div>
			</div>
		</>
	)
}

export default AuthenticationForms
