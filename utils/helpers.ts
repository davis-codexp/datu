import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const isEmpty = function(value: any) {
	return value === null || value === undefined || value.toString().trim().length === 0;
};
export const saveItem = (key: string, value: any) => AsyncStorage.setItem(key, JSON.stringify(value));
export const getItem = (key: string) => AsyncStorage.getItem(key);
export const deleteItem = (key: string) => AsyncStorage.removeItem(key);
export const removeAll = () => AsyncStorage.multiRemove(["credentials"]);
export const sanitizeValue = (value: any) => isEmpty(value) || isNaN(value) ? 0 : value;
export const sanitizeNumber = (value: any) => isEmpty(value) || isNaN(value) ? 0 : Number(value);
export const showNotification = (type: string, message: string) => {
	Toast.show({
		type,
		text1: message,
		topOffset: 70,
		visibilityTime: 2000,
	});
};

export const asyncHandler = (func: () => void, errorHandler?: () => void, finalHandler?: () => void) => {
	try {
		return func();
	} catch(err) {
		console.error(err);
		if (errorHandler !== undefined) {
			errorHandler();
		}
	} finally {
		if (finalHandler !== undefined) {
			finalHandler();
		}
	}
};

export function capitalizeFirstLetter(str: string | null | undefined): string | null | undefined {
  if (str === null || str === undefined) return str;
  return str?.substring(0, 1)?.toUpperCase() + str?.substring(1);
};

export function formatTags(tags: string[]): string {
	let str = "";
	for (const tag of tags) {
		str += capitalizeFirstLetter(tag) + ", "
	}
	if (str.endsWith(", ")) {
    	return str.trim(" ").slice(0, -1);
  	}
	return str;
}

export function formatDuration(seconds: number): string {
	if (!seconds || seconds < 0) return "00:00";
  	const minutes = Math.floor(seconds / 60);
   	const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
}
