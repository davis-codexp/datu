import {
	LoginForm, User,
} from "./types";
import { isEmpty } from "./helpers";

type ValidateBody = LoginForm | User;

const fields = {
	getOtp: ["email"],
	verifyOtp: ["email", "otp"],
	signup: ["name", "email", "age", "gender"],
};

export const validate = function(body: ValidateBody, entity: string) {
	const requiredFields = fields[entity as keyof typeof fields];
	return checkRequiredFields(body, requiredFields);
};

function checkRequiredFields(body: ValidateBody, requiredFields: string[]) {
	for (const field of requiredFields) {
		if (isEmpty(body[field as keyof typeof body])) {
			return false;
		}
	}
	return true;
}
