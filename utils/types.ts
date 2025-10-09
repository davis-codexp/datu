export type CardType = {
	_id: string;
	image: string;
	title: string;
	duration: string;
	tags: string;
};

export type User = {
	_id?: string;
	name?: string;
	mobile?: string;
	email?: string;
	age?: number | string;
	gender?: string;
	image?: string;
	created_date?: string;
	updated_date?: string;
};

export type Credentials = {
	user: User;
	token: string;
};

export type UserShort = {
	_id: string;
	name: string;
	email: string;
	image: string;
};

export type Story = {
	_id?: string;
	title?: string;
	thumbnail?: string;
	image1?: string;
	image2?: string;
	image3?: string;
	text?: string;
	audio?: string;
	tags?: string[];
	duration?: number;
	age?: number;
	gender?: string;
	user?: UserShort;
	messages?: Message[];
	created_date?: string;
	updated_date?: string;
};

export type Message = {
	role?: string;
	content?: string;
};

export type Metadata = {
	categories: string[];
	age: string[];
	duration: string[];
};

export type LoginForm = {
	email?: string;
	otp?: number;
};

export interface ApiResponse<T> {
	success: boolean;
	result?: {
		count: number;
		list: T[];
	};
	message?: string;
}

export type ApiCountResponse = {
	success: boolean;
	count: number;
};

export interface ApiSingleResponse<T> {
	success: boolean;
	result: T;
}

