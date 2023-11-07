import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

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

const Login: React.FC = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState('');

	const {
		enteredValue: enteredEmail,
		inputValueHandler: emailValueHandler,
		inputBlurHandler: emailBlurHandler,
		hasError: emailHasError,
		isValid: emailIsValid,
		errorMsg: emailError,
	} = useInput((value) => reg.test(value));

	const {
		enteredValue: enteredPassword,
		inputValueHandler: passwordValueHandler,
		inputBlurHandler: passwordBlurHandler,
		hasError: passwordHasError,
		isValid: passwordIsValid,
		errorMsg: passwordError,
	} = useInput((value) => value.trim().length > 8);

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoading(true);

		if (!passwordIsValid || !emailIsValid) {
			passwordBlurHandler();
			emailBlurHandler();
			setIsLoading(false);
			return;
		} else {
			login();
		}
	};

	const handleLoginError = (error: any) => {
		switch (error.code) {
			case 'auth/invalid-email':
				setError(`Email address ${enteredEmail} is invalid.`);
				break;
			case 'auth/operation-not-allowed':
				setError('Error during sign up.');
				break;
			case 'auth/weak-password':
				setError('Password is not strong enough.');
				break;
			default:
				setError('Invalid login credentials');
				break;
		}
	};

	const handleLoginSuccess = (user: any) => {
		if (user.emailVerified) {
			setIsError(false);
			user
				.getIdToken()
				.then((token: string) => {
					sessionStorage.setItem('token', token);
					const expiration = new Date();
					expiration.setHours(expiration.getHours() + 1);
					sessionStorage.setItem('expiration', expiration.toISOString());
				})
				.then(() => {
					setIsLoading(false);
					navigate('/links');
				});
		} else {
			setIsError(true);
			setError('Email address unverified. Confirm registration.');
			setIsLoading(false);
		}
	};

	const login = async () => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, enteredEmail, enteredPassword);
			const user = userCredential.user;
			sessionStorage.setItem('uid', user.uid);
			handleLoginSuccess(user);
		} catch (error) {
			console.error('Login error:', error);
			setIsError(true);
			handleLoginError(error);
			setIsLoading(false);
		}
	};
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
						<h2 className={styles.auth__title}>Login</h2>
						<p className={styles.auth__text}>Add your details below to get back into the app</p>{' '}
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
								onChange={emailValueHandler}
								onBlur={emailBlurHandler}
								errorMessage={emailError}
								img={emailIco}
							/>
							<FormBox
								label='Password'
								id='password'
								type='password'
								name='password'
								placeholder='Enter your password'
								isError={passwordHasError}
								onChange={passwordValueHandler}
								onBlur={passwordBlurHandler}
								errorMessage={passwordError}
								img={passwordIco}
							/>
							{isError && <p className={styles.auth__error}>{error}</p>}
							<p className={styles.auth__link}>
								Forget password? <Link to={'?mode=reset'}>Reset here</Link>.
							</p>
							<Button type='submit'>Login</Button>
							<p className={styles.auth__link}>
								Don't have an account? <Link to='?mode=register'>Create account</Link>
							</p>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
