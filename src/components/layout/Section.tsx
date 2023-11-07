import { ReactNode } from 'react';
import { Form, useNavigation } from 'react-router-dom';
import { motion } from 'framer-motion';

import Button from '../UI/Button';
import MobilePreview from '../UI/MobilePreview';

import styles from './Section.module.css';

type Props = {
	children: ReactNode;
	title: string;
	description: string;
	onSubmit: (event: React.FormEvent) => void;
};

const Section: React.FC<Props> = (props) => {
	const navigation = useNavigation();
	return (
		<section className={styles.section}>
			<MobilePreview />
			<motion.div
				initial={{ opacity: 0, scale: 0 }}
				animate={{ opacity: 1, scale: 1, transition: { type: 'spring', mass: 0.5 } }}>
				<Form
					method='PATCH'
					onSubmit={props.onSubmit}
					className={styles.main}>
					<h1>{props.title}</h1>
					<p className={styles.main__desc}>{props.description}</p>
					{props.children}
					<div className={styles.main__hr} />
					<Button
						type='submit'
						className={styles['align-btn']}>
						{navigation.state === 'submitting' ? 'Saving' : 'Save'}
					</Button>
				</Form>
			</motion.div>
		</section>
	);
};

export default Section;
