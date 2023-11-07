import { motion } from 'framer-motion';

import styles from './MobilePreview.module.css';
import Preview from './Preview';

const MobilePreview: React.FC = () => {
	return (
		<motion.aside
			className={styles['mobile-preview']}
			initial={{ opacity: 0, x: '-100%' }}
			animate={{ opacity: 1, x: 0, transition: { type: 'spring' } }}>
			<div className={styles.wrapper}>
				<Preview></Preview>
			</div>
		</motion.aside>
	);
};

export default MobilePreview;
