import { useState, useEffect } from 'react';

const useSuccess = () => {
	const [isSucces, setIsSucces] = useState(false);

	const successStatus = () => {
		setIsSucces((prevSuccess) => !prevSuccess);
	};

	useEffect(() => {
		const identifier = setTimeout(() => {
			setIsSucces(false);
		}, 2000);

		return () => {
			clearTimeout(identifier);
		};
	}, [isSucces]);

	return { isSucces, successStatus };
};

export default useSuccess;
