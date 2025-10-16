import { useState, useEffect } from "react";
import { Stack, Redirect } from "expo-router";
import { StatusBar } from "react-native";
import Toast from "react-native-toast-message";
import { getItem, asyncHandler } from "@/utils/helpers";
import { setAuthHeader } from "@/utils/api";
import { Credentials } from "@/utils/types";

export default function RootLayout() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		asyncHandler(async () => {
			const cred: string | null = await getItem("credentials");
    		if (cred) {
      			const userCred: Credentials = JSON.parse(cred);
      			setIsLoggedIn(true);
      			setAuthHeader(userCred.token);
    		} else {
      			setIsLoggedIn(false);
    		}	
		}, undefined, () => setIsLoading(false));
	}, []);

	if (isLoading) return null;
	return (
		<>
			{isLoggedIn ? (
				<Redirect href="/(tabs)" />
			) : (
				<Redirect href="/auth/login" />
			)}
			<StatusBar
				barStyle="default"
				backgroundColor="#2075C6"
			/>
			<Stack>
				<Stack.Screen
					name="(tabs)"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="story/StoryDetails"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="auth/login"
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="auth/signup"
					options={{ headerShown: false }}
				/>
			</Stack>
			<Toast />
		</>
	)	
}

