import axios from "axios";
import {removeAll} from "@/utils/helpers";
import {
	ApiResponse,
	ApiSingleResponse,
	LoginForm,
	User,
	Story,
} from "@/utils/types";

// axios.defaults.baseURL = "http://192.168.28.92:9900/api/v1";
axios.defaults.baseURL = "https://storyapp.codexp.in/api/v1";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

export const setAuthHeader = (token: string) => {
	axios.defaults.headers.Cookie = `authorization=${token}`;
  	//axios.defaults.headers.Cookie = `authorization=$2a$12$FMXAmLt31i69VS.LQDPJGOK.8VGUs.IPZPaWzOFsqa7T6eG/lfxE6`;
};
export const clearAuthHeader = () => {
  	axios.defaults.headers.Cookie = null;
};
export const imageURL = "https://skynet.codexp.in/storyapp";
export const storyURI = "https://storyapp.codexp.in/gen-story/audio";
export const signup = (body: User) => callApi(`/auth/signup`, "POST", body);
export const getOtp = (body: LoginForm) => callApi("/auth/otp", "POST", body);
export const verifyOtp = (body: LoginForm) => callApi("/auth/otp/verify", "POST", body);
export const getStories = (
	offset = 0,
  	limit = 100,
  	category = "",
): Promise<ApiResponse<Story>> =>
  	callApi(
    	`/stories?offset=${offset}&limit=${limit}&category=${category}`,
    	"GET",
  	);
export const getStoryById = (id: string): Promise<ApiSingleResponse<any>> => callApi(`/stories/${id}`, "GET");
export const addStory = (body: Story): Promise<ApiResponse<any>> => callApi("/stories", "POST", body);
export const getProfile = (id: string) => callApi(`/users/${id}`, "GET");
export const updateProfile = (id: string, body: any) => callApi(`/users/${id}`, "PUT", body);
export const getMetadata = (): Promise<ApiSingleResponse<any>> => callApi(`/stories/metadata/list`, "GET");
export const createStory = (
	age: string,
	gender: string,
	tags: string,
	duration: string,
): Promise<any> =>
  	callApi(
    	`https://storyapp.codexp.in/gen-story?age=${age ?? ""}&gender=${
      	gender ?? ""
    	}&duration=${duration ?? ""}&tags=${tags ?? ""}`,
    	"GET",
  	);

export const uploadImage = (form: any) =>
  	axios.post("https://skynet.codexp.in/api/v1/upload?project=storyapp", form, {
    	headers: {
      	"Content-Type": "multipart/form-data",
      	Authorization:
        	"29acb3b424898e07019dd4a3d50ca4faecc464218e9696ccdc37a165209b33a1", //PROD
    	},
  	});
export const logout = async () => {
  	try {
    	await callApi("/auth/logout", "POST");
    	await removeAll();
    	return true;
  	} catch (err) {
    	console.error(err);
    	return null;
  	} finally {
    	clearAuthHeader();
  	}
};

const callApi = async function (url: string, method = "GET", body = {}) {
  	try {
    	let response;
    	if (method === "GET") {
     	 	response = await axios.get(url);
    	} else if (method === "POST") {
      		response = await axios.post(url, body);
    	} else if (method === "PUT") {
			response = await axios.put(url, body);
    	} else if (method === "DELETE") {
			response = await axios.delete(url);
    	} else {
      		throw new Error("INVALID METHOD");
    	}
    	return response?.status === 200 ? response?.data : {success: false};
  	} catch (err) {
    	console.error(err);
    	return {success: false};
  	}
};
