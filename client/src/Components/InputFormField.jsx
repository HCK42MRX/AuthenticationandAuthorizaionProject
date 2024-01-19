import React from 'react'

function BasicInputField ({ type, label, placeholder, value, onChange, name }) {
	return (
		<>
			<div className="form-control">
				<label className="label">
					<span className="label-text">{label}</span>
				</label>
				<input
					type={type}
					name={name}
					placeholder={placeholder || label}
					className="input input-bordered"
					value={value}
					onChange={onChange}
					required
				/>
			</div>
		</>
	)
}

function PasswordInputField ({ value, onChange, name }) {
	return (
		<>
			<div className="form-control">
				<label className="label">
					<span className="label-text">Password</span>
				</label>
				<input
					type="password"
					name={name}
					placeholder="password"
					className="input input-bordered"
					value={value}
					onChange={onChange}
					required
				/>
			</div>
		</>
	)
}

export { BasicInputField, PasswordInputField }
