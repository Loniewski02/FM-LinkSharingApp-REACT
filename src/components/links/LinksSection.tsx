import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { ActionFunction } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { linksActions } from '../../store/links-slice';
import useSuccess from '../../hooks/use-success';

import EmptyBox from './Empty';
import Button from '../UI/Button';
import LinkBox from './LinkBox';
import Section from '../layout/Section';
import Info from '../UI/Info';

import saveIco from '../../assets/images/icon-changes-saved.svg';
import styles from './LinksSection.module.css';

const LinksSection: React.FC = () => {
	const links = useAppSelector((state) => state.links.links);
	const isValid = useAppSelector((state) => state.links.isValid);
	const dispatch = useAppDispatch();

	const { isSucces, successStatus } = useSuccess();

	const onDragEnd = (result: any) => {
		if (!result.destination) {
			return;
		}

		const reorderedLinks = [...links];
		const [movedLink] = reorderedLinks.splice(result.source.index, 1);
		reorderedLinks.splice(result.destination.index, 0, movedLink);

		dispatch(linksActions.replaceData(reorderedLinks));
	};

	const newLinkHandler = () => {
		dispatch(linksActions.addLink());
	};

	const deleteLinkHandler = (id: number) => {
		dispatch(linksActions.deleteLink(id));
		dispatch(linksActions.checkValidity());
	};

	const submitHandler = (event: React.FormEvent) => {
		if (links.length === 0) dispatch(linksActions.checkValidity());
		links.forEach((link) => {
			dispatch(linksActions.checkValidity());
			dispatch(linksActions.addUrl({ id: link.id, url: link.url.value }));
			dispatch(linksActions.addPlatform({ id: link.id, name: link.platform.name, class: link.platform.class }));
		});

		if (!isValid) {
			event.preventDefault();
			console.log('returned');
			return;
		}
		successStatus();
		localStorage.setItem('links', JSON.stringify(links));
	};

	return (
		<>
			<Section
				title='Customize your links'
				description='Add/edit/remove links below and then share all your profiles with the world!'
				onSubmit={submitHandler}>
				<Button
					type='button'
					isWhite={true}
					onClick={newLinkHandler}>
					+ Add new link
				</Button>
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId='links'>
						{(provided) => (
							<div
								className={styles.content}
								{...provided.droppableProps}
								ref={provided.innerRef}>
								{links.length === 0 && <EmptyBox />}
								{links.length > 0 &&
									links.map((link, index) => {
										return (
											<Draggable
												key={link.id}
												draggableId={link.id.toString()}
												index={index}>
												{(provided) => (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}>
														<LinkBox
															key={link.id}
															id={link.id}
															name={link.platform.name === '' ? 'Select platform' : link.platform.name}
															index={index + 1}
															isPlatformValid={link.platform.isValid}
															isUrlValid={link.url.isValid}
															url={link.url.value}
															onDelete={() => deleteLinkHandler(link.id)}
															drag={provided}
														/>
													</div>
												)}
											</Draggable>
										);
									})}
								{provided.placeholder}
							</div>
						)}
					</Droppable>
				</DragDropContext>
			</Section>
			{isSucces && (
				<Info
					isActive={true}
					ico={saveIco}>
					Your changes have been successfully saved!
				</Info>
			)}
		</>
	);
};

export default LinksSection;

export const action: ActionFunction = async () => {
	const uid = sessionStorage.getItem('uid');
	const token = sessionStorage.getItem('token');
	const arr = localStorage.getItem('links');

	if (arr !== null) {
		const data = JSON.parse(arr);

		const response = await fetch(
			`https://link-sharing-app-a3954-default-rtdb.firebaseio.com/users/${uid}.json?auth=${token}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ links: data }),
			}
		);

		localStorage.removeItem('links');
		return response;
	}

	return null;
};
