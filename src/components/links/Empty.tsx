import emptyIco from '../../assets/images/illustration-empty.svg';
import styles from './Empty.module.css';

const EmptyBox: React.FC = () => {
	return (
		<div className={styles.empty}>
			<img
				src={emptyIco}
				alt=''
			/>
			<h2>Let’s get you started</h2>
			<p>
				Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them.
				We’re here to help you share your profiles with everyone!
			</p>
		</div>
	);
};

export default EmptyBox;
