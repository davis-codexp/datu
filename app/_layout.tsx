import { useState, useEffect } from "react";
import { Stack, Redirect } from "expo-router";
import { StatusBar, View, Platform, useColorScheme } from "react-native";
import Toast from "react-native-toast-message";
import { getItem, asyncHandler } from "@/utils/helpers";
import { setAuthHeader } from "@/utils/api";
import { Credentials } from "@/utils/types";

export default function RootLayout() {
	const colorScheme = useColorScheme();
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
		<View style={{ flex: 1, backgroundColor: "#221B38" }}>
			{isLoggedIn ? (
				<Redirect href="/(tabs)" />
			) : (
				<Redirect href="/auth/login" />
			)}
			<StatusBar
				style="light"
				backgroundColor="#100D18"
			/>
			<Stack
				screenOptions={{ animation: Platform.OS === "android" ? "none" : "default" }}
			>
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
		</View>
	)	
}

