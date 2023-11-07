import { LoaderFunction, useLoaderData, useNavigate, useNavigation } from 'react-router-dom';

import { Links } from '../helpers/types';

import Button from '../components/UI/Button';
import Nav from '../components/layout/Nav';
import LoadingIndicator from '../components/UI/LoadingIndicator';

import { links as DUMMY_LINKS } from '../assets/links';
import IconArrowRight from '../assets/images/IconArrowRight';
import styles from './GlobalPreview.module.css';

const GlobalPreview: React.FC = () => {
	const navigation = useNavigation();
	const { name, lastName, email, links, profilePic } = useLoaderData() as {
		name: string;
		lastName: string;
		email: string;
		links: Links;
		profilePic: string;
	};
	const navigate = useNavigate();

	const navigateHandler = () => {
		navigate('/auth?mode=register');
	};

	return (
		<section className={styles.preview}>
			<header className={styles.header}>
				<div>
					<Nav>
						<Button
							type='button'
							isWhite={true}
							onClick={navigateHandler}>
							Sign Up
						</Button>
					</Nav>
				</div>
			</header>
			{navigation.state === 'loading' && <LoadingIndicator />}
			{navigation.state === 'idle' && (
				<div className={styles.wrapper}>
					<img
						src={profilePic}
						alt=''
						className={styles.profile__img}
					/>
					<p className={styles.profile__name}>{`${name} ${lastName}`}</p>
					<p className={styles.profile__email}>{email}</p>
					<div className={styles.profile__list}>
						<ul>
							{links &&
								links.length > 0 &&
								links.map((link) => (
									<li key={link.id}>
										<a
											href={link.url.value}
											target='_blank'
											rel='noopener noreferrer'
											className={styles[link.platform.class]}>
											<span>
												{DUMMY_LINKS.map((dlink) => {
													if (link.platform.name === dlink.name) {
														return dlink.ico;
													}
												})}
												{link.platform.name}
											</span>
											<IconArrowRight />
										</a>
									</li>
								))}
						</ul>
					</div>
				</div>
			)}
		</section>
	);
};

export default GlobalPreview;

export const loader: LoaderFunction = async ({ params }) => {
	const response = await fetch(
		`https://link-sharing-app-a3954-default-rtdb.firebaseio.com/users/${params.userId}.json`
	);
	const data = await response.json();
	return await data;
};
