import { NavLink, useNavigate } from 'react-router-dom';

import Nav from './Nav';
import Button from '../UI/Button';

import logoLarge from '../../assets/images/logo-devlinks-large.svg';
import logoSmall from '../../assets/images/logo-devlinks-small.svg';
import profileIco from '../../assets/images/icon-profile-details-header.svg';
import linksIco from '../../assets/images/icon-links-header.svg';
import previevIco from '../../assets/images/icon-preview-header.svg';
import styles from './Navigation.module.css';

const Navigation: React.FC = () => {
	const navigate = useNavigate();

	const navigateHandler = () => {
		navigate('/preview');
	};

	return (
		<Nav>
			<div className={styles.nav__box}>
				<img
					src={logoSmall}
					alt=''
					className={styles['logo-small']}
				/>
				<img
					src={logoLarge}
					alt=''
					className={styles['logo-large']}
				/>
				<NavLink
					to='/links'
					className={({ isActive }) => (isActive ? styles.active : '')}>
					<img
						src={linksIco}
						alt=''
					/>
					<span>Links</span>
				</NavLink>
			</div>
			<div className={styles.nav__box}>
				<NavLink
					to='/profile'
					className={({ isActive }) => (isActive ? styles.active : '')}>
					<img
						src={profileIco}
						alt=''
					/>
					<span>Profile Details</span>
				</NavLink>
				<Button
					type='button'
					isWhite={true}
					onClick={navigateHandler}>
					<img
						src={previevIco}
						alt=''
					/>
					<span>Preview</span>
				</Button>
			</div>
		</Nav>
	);
};

export default Navigation;
