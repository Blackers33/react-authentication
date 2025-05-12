import React, { useEffect, useRef, useState } from "react";
import "./styles.css";
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Login() {
	const userRef = useRef<HTMLInputElement>(null);

	const errRef = useRef(null);

	const [user, setUser] = useState<string>("");
	const [pwd, setPwd] = useState<string>("");
	const [errMsg, setErrMsg] = useState<string>("");

	useEffect(() => {
		userRef.current?.focus();
	}, []);

	useEffect(() => {
		setErrMsg("");
	}, [user, pwd]);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		console.log("handle submit", user, pwd);
	}

	return (
		<section className='main'>
			<span className='welcome-text'>Sign In</span>
			<form className='connect-window' onSubmit={handleSubmit}>
				{/* 
					
					USERNAME
	
					*/}
				<label htmlFor='username'>Username</label>
				<input
					type='text'
					id='username'
					ref={userRef}
					required
					className='connect-input'
					placeholder='Enter your username'
					onChange={(e) => setUser(e.target.value)}
					value={user}
				/>
				{/* 
					
					PASSWORD
					
					*/}
				<label htmlFor='password'>Password</label>

				<input
					type='password'
					id='password'
					className='connect-input'
					required
					placeholder='Enter your password'
					onChange={(e) => setPwd(e.target.value)}
					value={pwd}
				/>
				<button>Connect</button>
			</form>
			<p>
				Need an account?
				<br />
				<span>
					{/*put router link here*/}
					<a href='#'>Sign Up</a>
				</span>
			</p>
		</section>
	);
}

export default Login;
