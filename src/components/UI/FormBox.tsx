import styles from './FormBox.module.css';

type Props = {
	label: string;
	type: React.HTMLInputTypeAttribute;
	id: string;
	name?: string;
	placeholder?: string;
	isFlex?: boolean;
	isError?: boolean;
	errorMessage?: string;
	img?: string;
	value?: string;
	defaultValue?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: () => void;
};

const FormBox: React.FC<Props> = (props) => {
	return (
		<div className={`${styles.actions}  ${props.isFlex ? styles.flex : ''} ${props.isError ? styles.error : ''}`}>
			<label htmlFor={props.id}>{props.label}</label>
			<div>
				<img
					src={props.img}
					alt=''
				/>
				<input
					type={props.type}
					id={props.id}
					name={props.name}
					placeholder={props.placeholder}
					onChange={props.onChange}
					onBlur={props.onBlur}
					value={props.value}
					defaultValue={props.defaultValue}
				/>
				<p>{props.errorMessage ? props.errorMessage : "Can't be blank"}</p>
			</div>
		</div>
	);
};

export default FormBox;
