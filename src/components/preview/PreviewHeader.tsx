import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import Button from '../UI/Button';
import Nav from '../layout/Nav';
import Preview from '../UI/Preview';
import Info from '../UI/Info';

import copied from '../../assets/images/icon-link-copied-to-clipboard.svg';
import styles from './PreviewHeader.module.css';

const PreviewHeader: React.FC = () => {
	const uid = sessionStorage.getItem('uid');
	const navigate = useNavigate();
	const [isLargeScreen, setIsLargeScreen] = useState(false);
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsLargeScreen(window.innerWidth >= 768);
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const identifier = setTimeout(() => {
			setIsCopied(false);
		}, 2000);

		return () => {
			clearTimeout(identifier);
		};
	}, [isCopied]);

	const navigateHandler = () => {
		navigate('/links');
	};

	const copyUrl = () => {
		const url = window.location.href + `/${uid}`;
		navigator.clipboard.writeText(url);
		setIsCopied(true);
	};

	return (
		<section className={styles.preview}>
			<motion.header
				className={styles.header}
				initial={{ height: isLargeScreen ? 0 : 'initial' }}
				animate={{ height: isLargeScreen ? 357 : 'initial', transition: { type: 'spring' } }}>
				<motion.div
					initial={{ y: -50 }}
					animate={{ y: 0, transition: { type: 'spring' } }}>
					<Nav>
						<Button
							type='button'
							isWhite={true}
							onClick={navigateHandler}>
							Back to editor
						</Button>
						<Button
							type='button'
							onClick={copyUrl}>
							Share Link
						</Button>
					</Nav>
				</motion.div>
			</motion.header>
			<div className={styles.wrapper}>
				<Preview></Preview>
			</div>
			<AnimatePresence>
				{isCopied && (
					<Info
						isActive={isCopied}
						ico={copied}>
						The Link has been copied to your clipboard!
					</Info>
				)}
			</AnimatePresence>
		</section>
	);
};

export default PreviewHeader;
