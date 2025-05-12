import React, { useEffect, useRef, useState } from "react";
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.css";
import axios from "../../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export default function Register() {
	const userRef = useRef<HTMLInputElement>(null);

	const [user, setUser] = useState<string>("");
	const [validName, setValidName] = useState<boolean>(false);
	const [userFocus, setUserFocus] = useState<boolean>(false);

	const [pwd, setPwd] = useState<string>("");
	const [validPwd, setValidPwd] = useState<boolean>(false);
	const [pwdFocus, setPwdFocus] = useState<boolean>(false);

	const [matchPwd, setMatchPwd] = useState<string>("");
	const [validMatch, setValidMatch] = useState<boolean>(false);
	const [matchFocus, setMatchFocus] = useState<boolean>(false);

	//Focus on page loading
	useEffect(() => {
		userRef.current?.focus();
	}, []);

	//testing of the username
	useEffect(() => {
		setValidName(USER_REGEX.test(user));
	}, [user]);


	//testing of the password
	useEffect(() => {
		const result = PWD_REGEX.test(pwd);
		setValidPwd(result);
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	interface RegisterFormData {
		user: string;
		pwd: string;
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();
		console.log("Successful " + user + " " + pwd);
		try {
			const formData: RegisterFormData = { user, pwd };
			const response = await axios.post('/register', JSON.stringify(formData), {
				headers: { 'Content-Type': 'application/json' },
				withCredentials: true,
			});
			console.log(response.data);
		} catch (e: unknown) {
			console.log(e);
		}
	}

	return (
		<section className='main'>
			<span className='welcome-text'>Hello</span>
			<form className='connect-window' onSubmit={handleSubmit}>
				{/* 
				
				USERNAME

				*/}
				<label htmlFor='username'>
					Username{" "}
					<span className={validName ? "" : "hidden"}>
						<FontAwesomeIcon icon={faCheck} />
					</span>
					<span className={validName || !user ? "hidden" : ""}>
						<FontAwesomeIcon icon={faTimes} />
					</span>
				</label>
				<input
					ref={userRef}
					required
					aria-invalid={validName ? "false" : "true"}
					aria-describedby='uidnote'
					id='username'
					className='connect-input'
					type='text'
					placeholder='Enter your username'
					onChange={(e) => setUser(e.target.value)}
					value={user}
					onFocus={() => setUserFocus(true)}
					onBlur={() => setUserFocus(false)}
				/>
				{/* 
				
				PASSWORD
				
				*/}
				<label htmlFor='password'>
					Password
					<span className={validPwd ? "" : "hidden"}>
						<FontAwesomeIcon icon={faCheck} />
					</span>
					<span className={validPwd || !pwd ? "hidden" : ""}>
						<FontAwesomeIcon icon={faTimes} />
					</span>
				</label>

				<input
					id='password'
					className='connect-input'
					type='password'
					required
					aria-describedby='pwdnote'
					aria-invalid={validPwd ? "false" : "true"}
					placeholder='Enter your password'
					onChange={(e) => setPwd(e.target.value)}
					value={pwd}
					onFocus={() => setPwdFocus(true)}
					onBlur={() => setPwdFocus(false)}
				/>
				{/* 
				
				PASSWORD VALIDATION
				
				*/}
				<label htmlFor='confirm_pwd'>
					Confirm Password:
					<FontAwesomeIcon
						icon={faCheck}
						className={validMatch && matchPwd ? "" : "hidden"}
					/>
					<FontAwesomeIcon
						icon={faTimes}
						className={validMatch || !matchPwd ? "hidden" : ""}
					/>
				</label>
				<input
					type='password'
					className='connect-input'
					id='confirm_pwd'
					placeholder='Password validation'
					onChange={(e) => setMatchPwd(e.target.value)}
					value={matchPwd}
					required
					aria-invalid={validMatch ? "false" : "true"}
					aria-describedby='confirmnote'
					onFocus={() => setMatchFocus(true)}
					onBlur={() => setMatchFocus(false)}
				/>
				<br />
				<button
					disabled={!validName || !validPwd || !validMatch ? true : false}
				>
					Connect
				</button>
			</form>
			<p>
				Already registered?
				<br />
				<span>
					{/*put router link here*/}
					<a href='#'>Sign In</a>
				</span>
			</p>
			{/* 
			
			ERROR MESSAGES
			
			*/}

			<p
				id='uidnote'
				className={userFocus && user && !validName ? "instructions" : "hidden"}
			>
				<FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
				<br /> Must begin with a letter. <br />
				Letters, numbers, underscores, hyphens allowed.
			</p>
			<p
				id='pwdnote'
				className={pwdFocus && !validPwd ? "instructions" : "hidden"}
			>
				<FontAwesomeIcon icon={faInfoCircle} /> 4 to 24 characters.
				<br /> Must include uppercase and lowercase letters, a number and a
				special character : <span aria-label='exclamation-mark'> !</span>
				<span aria-label='at symbol'> @</span>
				<span aria-label='hashtag'> #</span> or
				<span aria-label='dollar sign'> $</span>
			</p>
			<p
				id='confirmnote'
				className={
					matchFocus && !validMatch && matchPwd ? "instructions" : "hidden"
				}
			>
				<FontAwesomeIcon icon={faInfoCircle} /> Passwords do not match.
			</p>
		</section>
	);
}
