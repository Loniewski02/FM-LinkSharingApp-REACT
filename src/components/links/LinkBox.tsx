import { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks';

import { linksActions } from '../../store/links-slice';
import { links } from '../../assets/links';

import FormBox from '../UI/FormBox';

import dragIco from '../../assets/images/icon-drag-and-drop.svg';
import linksIco from '../../assets/images/icon-link.svg';
import arrowIco from '../../assets/images/icon-chevron-down.svg';
import styles from './LinkBox.module.css';

type Props = {
	id: number;
	name?: string;
	index: number;
	url: string;
	isPlatformValid?: boolean;
	isUrlValid?: boolean;
	drag: any;
	onDelete: () => void;
};

const LinkBox: React.FC<Props> = (props) => {
	const dispatch = useAppDispatch();
	const [isLinksVisible, setIsLinksVsisble] = useState(false);

	const toggleLinksHandler = () => {
		setIsLinksVsisble((prevLinks) => !prevLinks);
	};

	const selectLinkPlatformHandler = (link: { name: string; class: string }) => {
		dispatch(linksActions.addPlatform({ id: props.id, name: link.name, class: link.class }));
		dispatch(linksActions.checkValidity());
		setIsLinksVsisble(false);
	};

	const selectUrlHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(linksActions.addUrl({ id: props.id, url: event.target.value }));
		dispatch(linksActions.checkValidity());
	};

	return (
		<div className={styles.box}>
			<div className={styles.box__heading}>
				<h3>
					<img
						{...props.drag.dragHandleProps}
						aria-label='drag and drop'
						src={dragIco}
						alt=''
					/>
					Link #{props.index}
				</h3>
				<button
					type='button'
					onClick={props.onDelete}>
					Remove
				</button>
			</div>
			<div className={styles.box__actions}>
				<label htmlFor={`platform-${props.id}`}>Platform</label>
				<button
					type='button'
					id={`platform-${props.id}`}
					onClick={toggleLinksHandler}
					className={!props.isPlatformValid ? styles.invalidP : ''}>
					<div>{props.name}</div>
					<img
						src={arrowIco}
						alt=''
					/>
				</button>
				{isLinksVisible && (
					<div className={styles.list}>
						{links.map((link) => (
							<button
								key={link.name}
								type='button'
								onClick={() => {
									selectLinkPlatformHandler(link);
								}}>
								{link.ico}
								{link.name}
							</button>
						))}
					</div>
				)}
			</div>
			<FormBox
				label='Link'
				id={`link-${props.id}`}
				name='link'
				type='url'
				img={linksIco}
				placeholder='e.g. https://www.github.com/johnappleseed'
				onChange={selectUrlHandler}
				isError={!props.isUrlValid}
				errorMessage='Enter a valid url'
				defaultValue={props.url}
			/>
		</div>
	);
};

export default LinkBox;
