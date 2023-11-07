import { useState } from 'react';

const useInput = (inpValidity: (value: string) => boolean) => {
	const [enteredValue, setEnteredValue] = useState<string>('');
	const [isTouched, setIsTouched] = useState<boolean>(false);
	const [errorMsg, setErrorMsg] = useState('');

	const isValid = inpValidity(enteredValue);
	const hasError = isTouched && !isValid;

	const setCustomValue = (value: string) => {
		setEnteredValue(value);
	};

	const inputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setEnteredValue(value);
		if (value === '') {
			setErrorMsg("Can't be blank");
		} else if (!inpValidity(enteredValue)) {
			setErrorMsg('Please check again');
		}
	};

	const inputBlurHandler = () => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		enteredValue,
		isValid,
		hasError,
		inputBlurHandler,
		inputValueHandler,
		reset,
		setCustomValue,
		errorMsg,
	};
};

export default useInput;
