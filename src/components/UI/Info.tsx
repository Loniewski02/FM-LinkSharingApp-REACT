import { ReactNode } from 'react';
import { motion } from 'framer-motion';

import styles from './Info.module.css';

const Info: React.FC<{ children: ReactNode; isActive: boolean; ico: string }> = (props) => {
	return (
		<motion.p
			className={styles['info-pop']}
			initial={{ opacity: 0, x: '-50%', y: -50 }}
			animate={{ opacity: props.isActive ? 1 : 0, y: 0 }}
			exit={{ opacity: 0, y: -50 }}>
			<img
				src={props.ico}
				alt=''
			/>
			{props.children}
		</motion.p>
	);
};

export default Info;
