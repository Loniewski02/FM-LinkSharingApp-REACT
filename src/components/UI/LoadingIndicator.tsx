import styles from './LoadingIndicator.module.css';

const LoadingIndicator: React.FC = () => {
	return (
		<div className={styles.indicator}>
			<div></div>
		</div>
	);
};

export default LoadingIndicator;
