export type Links = {
	id: number;
	platform: {
		// ico: React.ReactElement | undefined;
		name: string;
		class: string;
		isValid?: boolean;
	};
	url: { value: string; isValid?: boolean };
}[];

export type User = {
	name: string;
	lastName: string;
	email: string;
	profilePic: string;
};


