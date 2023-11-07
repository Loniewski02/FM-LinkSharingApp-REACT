import { ref, set, getDatabase } from 'firebase/database';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { auth } from '../../../firebase.ts';
import useInput from '../../hooks/use-input.tsx';

import Button from '../UI/Button';
import FormBox from '../UI/FormBox';
import LoadingIndicator from '../UI/LoadingIndicator.tsx';

import emailIco from '../../assets/images/icon-email.svg';
import passwordIco from '../../assets/images/icon-password.svg';
import logo from '../../assets/images/logo-devlinks-large.svg';
import styles from './Auth.module.css';

const reg =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const USERDATA = {
	name: '',
	lastName: '',
	email: '',
	profilePic: '',
	links: [],
};

const Register: React.FC = () => {
	const navigate = useNavigate();
	const database = getDatabase();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState('');

	const {
		enteredValue: enteredEmail,
		hasError: emailHasError,
		isValid: emailIsValid,
		inputBlurHandler: emailBlurHandler,
		inputValueHandler: emailValueHandler,
		reset: emailReset,
		errorMsg: emailError,
	} = useInput((value) => reg.test(value));

	const {
		enteredValue: enteredPassword,
		hasError: passwordHasError,
		isValid: passwordIsValid,
		inputBlurHandler: passwordBlurHandler,
		inputValueHandler: passwordValueHandler,
		reset: passwordReset,
		errorMsg: passwordError,
	} = useInput((value) => value.trim().length > 8);

	const {
		enteredValue: enteredPasswordCheck,
		inputValueHandler: passwordCheckValueHandler,
		inputBlurHandler: passwordCheckBlurHandler,
		hasError: passwordCheckHasError,
		reset: passwordCheckReset,
		errorMsg: passwordCheckError,
	} = useInput((value) => value.trim().length > 8);

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		let isPasswordValid;

		if (enteredPassword && enteredPasswordCheck) {
			isPasswordValid = enteredPassword === enteredPasswordCheck;
		}

		if (!emailIsValid || !isPasswordValid || !passwordIsValid) {
			emailBlurHandler();
			passwordBlurHandler();
			passwordCheckBlurHandler();
			setIsLoading(false);
			return;
		} else {
			registerUser(enteredEmail, enteredPassword);
			emailReset();
			passwordReset();
			passwordCheckReset();
		}
	};

	const registerUser = async (email: string, password: string) => {
		try {
			const userData = await createUserWithEmailAndPassword(auth, email, password);
			const user = userData.user;
			const userRef = ref(database, `users/${user.uid}`);
			sendEmailVerification(user);
			set(userRef, { ...USERDATA, email: user.email });
			navigate('?mode=login');
			setIsLoading(false);
			setIsError(false);
		} catch (error) {
			console.error('Error during registration:', error);
			setIsError(true);
			setError('Error during registration');
			setIsLoading(false);
		}
	};

	let passwordValidity;

	if (passwordHasError) {
		passwordValidity = passwordHasError;
	} else if (enteredPassword.trim().length > 0 && enteredPassword !== enteredPasswordCheck) {
		passwordValidity = true;
	}

	return (
		<>
			{isLoading && <LoadingIndicator />}
			<section className={styles.auth}>
				<div className={styles.auth__wrapper}>
					<img
						src={logo}
						alt=''
					/>
					<div>
						<h2 className={styles.auth__title}>Create account</h2>
						<p className={styles.auth__text}>Let’s get you started sharing your links!</p>
						<form
							onSubmit={submitHandler}
							className={styles.form}>
							<FormBox
								label='Email address'
								id='email'
								type='email'
								name='email'
								placeholder='e.g. alex@email.com'
								isError={emailHasError}
								img={emailIco}
								onChange={emailValueHandler}
								onBlur={emailBlurHandler}
								errorMessage={emailError}
								value={enteredEmail}
							/>
							<FormBox
								label='Create Password'
								id='password'
								type='password'
								name='password'
								placeholder='At least .8 characters'
								isError={passwordValidity}
								onChange={passwordValueHandler}
								onBlur={passwordBlurHandler}
								value={enteredPassword}
								errorMessage={passwordError}
								img={passwordIco}
							/>
							<FormBox
								label='Confirm password'
								id='password-check'
								type='password'
								name='password'
								placeholder='At least .8 characters'
								isError={passwordCheckHasError}
								onChange={passwordCheckValueHandler}
								onBlur={passwordCheckBlurHandler}
								value={enteredPasswordCheck}
								errorMessage={passwordCheckError}
								img={passwordIco}
							/>
							<p className={styles.auth__info}>Password must contain at least 8 characters</p>
							{isError && <p className={styles.auth__error}>{error}</p>}
							<Button type='submit'>Create new account</Button>
							<p className={styles.auth__link}>
								Already have an account? <Link to='?mode=login'>Login</Link>
							</p>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default Register;
