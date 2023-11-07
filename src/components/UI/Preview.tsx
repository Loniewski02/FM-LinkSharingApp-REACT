import { useAppSelector } from '../../hooks/hooks';
import { links as DUMMY_LINKS } from '../../assets/links';
import IconArrowRight from '../../assets/images/IconArrowRight';
import styles from './Preview.module.css';

const Preview: React.FC = () => {
	const { picture: profilePic, name, lastName, email } = useAppSelector((state) => state.profile);
	const links = useAppSelector((state) => state.links.links);

	return (
		<>
			<img
				src={profilePic}
				alt=''
				className={styles.profile__img}
			/>
			<p
				style={{
					backgroundColor: name.value === '' && lastName.value === '' ? 'transparent' : '#fff',
				}}
				className={styles.profile__name}>{`${name.value} ${lastName.value}`}</p>
			<p
				style={{ backgroundColor: email.value === '' ? 'transparent' : '#fff' }}
				className={styles.profile__email}>
				{email.value}
			</p>
			<div className={styles.profile__list}>
				<ul>
					{links.length > 0 &&
						links.map((link) => (
							<li key={link.id}>
								<a
									href={link.url.value}
									target='_blank'
									rel='noopener noreferrer'
									className={styles[link.platform.class]}>
									<span>
										{DUMMY_LINKS.map((dlink) => {
											if (link.platform.name === dlink.name) {
												return <span key={dlink.name}>{dlink.ico}</span>;
											}
										})}
										{link.platform.name}
									</span>
									{link.platform.name !== '' && <IconArrowRight />}
								</a>
							</li>
						))}
				</ul>
			</div>
		</>
	);
};

export default Preview;
