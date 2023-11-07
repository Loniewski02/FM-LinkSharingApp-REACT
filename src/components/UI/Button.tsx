import { ReactNode } from 'react';

import styles from './Button.module.css';

type Props = {
	children: ReactNode;
	type: 'submit' | 'button' | 'reset';
	isWhite?: boolean;
	className?: string;
	onClick?: () => void;
};

const Button: React.FC<Props> = (props) => {
	return (
		<button
			type={props.type}
			onClick={props.onClick}
			className={`${styles.button} ${props.isWhite ? styles.white : ''} ${props.className}`}>
			{props.children}
		</button>
	);
};

export default Button;
