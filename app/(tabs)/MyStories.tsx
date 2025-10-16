import { useState, useEffect } from "react";
import { View, Modal } from "react-native";
import Container from "@/components/Container";
import StoryList from "@/components/StoryList";
import { mainStyles } from "@/utils/styles";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import { Credentials } from "@/utils/types";
import { asyncHandler, getItem } from "@/utils/helpers";

export default function MyStories() {
	const [credentials, setCredentials] = useState<Credentials | null>(null);
	const [showProfile, setShowProfile] = useState(false);

	useEffect(() => {
		asyncHandler(async () => {
			const cred = await getItem("credentials");
			if (cred) {
				setCredentials(JSON.parse(cred));
			}
		});
	}, []);

	return (
		<Container>
			<View style={mainStyles.mainContent}>
				<Header clickHandler={() => setShowProfile(true)} image={credentials?.user?.image} />
				<StoryList listHeight="80%" playerPosition="81%" />
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
			</View>
		</Container>
	)
}
