import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';

import { auth } from '../../../firebase.ts';
import useInput from '../../hooks/use-input.tsx';
import useSuccess from '../../hooks/use-success.tsx';

import Button from '../UI/Button';
import FormBox from '../UI/FormBox';
import LoadingIndicator from '../UI/LoadingIndicator.tsx';
import Info from '../UI/Info.tsx';

import emailIco from '../../assets/images/icon-email.svg';
import logo from '../../assets/images/logo-devlinks-large.svg';
import styles from './Auth.module.css';

const reg =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Reset: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);

	const { isSucces, successStatus } = useSuccess();

	const {
		enteredValue: enteredEmail,
		inputValueHandler: emailValueHandler,
		inputBlurHandler: emailBlurHandler,
		hasError: emailHasError,
		isValid: emailIsValid,
		errorMsg: emailError,
	} = useInput((value) => reg.test(value));

	const submitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		setIsLoading(true);

		if (!emailIsValid) {
			emailBlurHandler();
			successStatus();
			return;
		} else {
			handleForgotPassword();
		}
	};

	const sendPasswordReset = async (email: string) => {
		try {
			await sendPasswordResetEmail(auth, email);
			successStatus();
			setIsLoading(false);
		} catch (error) {
			console.error('Password reset error:', error);
			setIsLoading(false);
		}
	};

	const handleForgotPassword = () => {
		sendPasswordReset(enteredEmail);
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
						<h2 className={styles.auth__title}>Reset your password</h2>
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
							<Button type='submit'>{isLoading ? 'Sending' : 'Reset'}</Button>
							<p className={styles.auth__link}>
								Already have an account? <Link to='?mode=login'>Login</Link>
							</p>
						</form>
					</div>
				</div>
			</section>
			{isSucces && (
				<Info
					ico={emailIco}
					isActive={isSucces}>
					Password reset e-mail sent. Check your inbox.
				</Info>
			)}
		</>
	);
};

export default Reset;
