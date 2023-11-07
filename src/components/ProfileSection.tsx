import { ActionFunction } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { auth } from '../../firebase';
import { profileActions } from '../store/profile-slice';
import useSuccess from '../hooks/use-success';

import FormBox from './UI/FormBox';
import Section from './layout/Section';
import Info from './UI/Info';

import saveIco from '../assets/images/icon-changes-saved.svg';
import imgIco from '../assets/images/icon-upload-image.svg';
import styles from './ProfileSection.module.css';

const ProfileSection: React.FC = () => {
	const dispatch = useAppDispatch();
	const { picture: selectedImg, name, lastName, email } = useAppSelector((state) => state.profile);
	const { isSucces, successStatus } = useSuccess();

	const imageHandler = () => {
		dispatch(profileActions.profilePicHandler());
	};

	const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(profileActions.emailHandler(event.target.value));
	};

	const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(profileActions.inputHandler({ field: 'name', value: event.target.value }));
	};

	const lastNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(profileActions.inputHandler({ field: 'lastName', value: event.target.value }));
	};

	const handleSubmit = (event: React.FormEvent) => {
		dispatch(profileActions.emailHandler(email.value));
		dispatch(profileActions.inputHandler({ field: 'name', value: name.value }));
		dispatch(profileActions.inputHandler({ field: 'lastName', value: lastName.value }));

		if (!name.isValid || !lastName.isValid || !email.isValid) {
			event.preventDefault();
			return;
		}
		successStatus();
	};

	return (
		<>
			<Section
				title='Profile Details'
				description='Add your details to create a personal touch to your profile.'
				onSubmit={handleSubmit}>
				<div className={styles.photo}>
					<p className={styles.photo__title}>Profile picture</p>
					<button
						type='button'
						style={{ backgroundImage: `url(${selectedImg}` }}
						onClick={imageHandler}>
						<div>
							<img
								src={imgIco}
								alt=''
							/>
							<span>+ Upload Image</span>
						</div>
					</button>
					<p className={styles.photo__info}>Image must be below 1024x1024px. Use PNG or JPG format.</p>
				</div>
				<div className={styles.data}>
					<FormBox
						isFlex={true}
						type='text'
						id='first-name'
						name='first-name'
						label='First name*'
						placeholder='e.g. John'
						onChange={nameHandler}
						isError={name.hasError}
						errorMessage={name.msgError}
						value={name.value}
					/>
					<FormBox
						isFlex={true}
						type='text'
						id='last-name'
						name='last-name'
						label='Last name*'
						placeholder='e.g. Appleseed'
						onChange={lastNameHandler}
						isError={lastName.hasError}
						errorMessage={lastName.msgError}
						value={lastName.value}
					/>
					<FormBox
						isFlex={true}
						type='email'
						id='email'
						name='email'
						label='Email'
						placeholder='e.g. email@example.com'
						onChange={emailHandler}
						isError={email.hasError}
						errorMessage={email.msgError}
						value={email.value}
					/>
				</div>
			</Section>
			{isSucces && (
				<Info
					isActive={true}
					ico={saveIco}>
					Your changes have been successfully saved!
				</Info>
			)}
		</>
	);
};

export default ProfileSection;

export const action: ActionFunction = async ({ request }) => {
	const uid = auth.currentUser?.uid;
	const data = await request.formData();

	const userData = {
		name: data.get('first-name'),
		lastName: data.get('last-name'),
		email: data.get('email'),
		profilePic: localStorage.getItem('image'),
	};

	const response = await fetch(`https://link-sharing-app-a3954-default-rtdb.firebaseio.com/users/${uid}.json`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});

	return response;
};
