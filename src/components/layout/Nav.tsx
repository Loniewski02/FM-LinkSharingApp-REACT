import { ReactNode } from 'react';

import styles from './Nav.module.css';

const Nav: React.FC<{ children: ReactNode }> = (props) => {
	return (
		<nav className={styles.nav}>
			<div className={styles.wrapper}>{props.children}</div>
		</nav>
	);
};

export default Nav;
