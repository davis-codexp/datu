import { useState, useEffect } from "react";
import Container from "@/components/Container";
import {
	View, Text, StyleSheet, Modal,
} from "react-native";
import { ButtonGradient } from "@/components/common";
import { mainStyles } from "@/utils/styles";
import Profile from "@/components/Profile";
import StoryList from "@/components/StoryList";
import Header from "@/components/Header";
import { router } from "expo-router";
import { getItem, asyncHandler, capitalizeFirstLetter } from "@/utils/helpers";
import { Credentials } from "@/utils/types";

export default function Home() {
	const [showProfile, setShowProfile] = useState(false);
	const [credentials, setCredentials] = useState<Credentials | null>(null);
	const clickHandler = () => router.push("/CreateStory");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		asyncHandler(async () => {
			const cred = await getItem("credentials");
			if (cred) {
				setCredentials(JSON.parse(cred));
				setIsLoggedIn(true);
			}
		});
	}, []);

	if (!isLoggedIn) return null;
	return (
		<Container>
			<View style={mainStyles.mainContent}>
				<Header clickHandler={() => setShowProfile(true)} image={credentials?.user?.image} />
				<View style={styles.content}>
					<View style={{ marginVertical: 10 }}>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>Hi {capitalizeFirstLetter(credentials?.user?.name)}!</Text>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>Create amazing tales</Text>
					</View>
					<ButtonGradient
						label="Create your own Story"
						clickHandler={clickHandler}
					/>
				</View>
				<StoryList
					listHeight="67%"
					playerPosition="70%"
				/>
			</View>
			{credentials &&
				<Modal
					animationType="fade"
					transparent={true}
					visible={showProfile}
					onRequestClose={() => setShowProfile(false)}
				>
					<Profile
						onClose={() => setShowProfile(false)}
						cred={credentials}
						setCredentials={setCredentials}
					/>
				</Modal>
			}
		</Container>
	);
}

const styles = StyleSheet.create({
	content: {
		marginTop: "2%",
		paddingHorizontal: 10,
	},
});
