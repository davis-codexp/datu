import { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainStyles } from "@/utils/styles";
import { LinearGradient } from "expo-linear-gradient";
import Player from "@/components/Player";
import Ionicons from "@react-native-vector-icons/ionicons"
import { useLocalSearchParams, router } from "expo-router";
import { Story } from "@/utils/types";
import { getMins } from "@/utils/helpers";

export default function StoryDetails() {
	const [showPlayer, setShowPlayer] = useState(false);
	const { data } = useLocalSearchParams<{ data: string }>();
	const story: Story = data ? JSON.parse(data) : null;

	return (
		<View style={{ flex: 1}}>
			<SafeAreaView style={styles.content}>
				<Image
					source={{ uri: story?.thumbnail }}
					style={{ height: "35%", width: "100%", backgroundColor: "#100D18" }}
					resizeMode="cover"
				/>
				<TouchableOpacity style={styles.backBtn} onPress={router.back}>
					<Ionicons name="chevron-back" size={24} color="#FFFFFF" />
				</TouchableOpacity>
				<ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
					<View style={styles.titleContainer}>
						<Text style={styles.titleText}>{story?.title}</Text>
						<Text style={[mainStyles.smallText, { color: "#FFFFFF", marginVertical: 3 }]}>{story?.duration} {getMins(story?.duration ?? 1)}</Text>
						<View style={[mainStyles.row, {justifyContent: "flex-start"}]}>
							{story?.tags?.splice(0, 3)?.map((tag: string) => (
								<TouchableOpacity key={tag} style={styles.tagItem}>
									<Text style={[mainStyles.extraSmallText, mainStyles.buttonText]}>{tag?.toUpperCase()}</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
					<View style={{ paddingHorizontal: 10 }}>
						<Text style={[mainStyles.buttonText, { fontSize: 16, lineHeight: 22 }]}>
						{story?.text}	
						</Text>
					</View>
					
				</ScrollView>
				{showPlayer ? (
					<Player source={story?.audio ?? ""} />
				) : (
					<View style={[mainStyles.ribbon, { paddingHorizontal: 20, marginTop: 10 }]}>
						<TouchableOpacity style={styles.button} onPress={() => router.push("/MyStories")}>
							<Text style={[mainStyles.buttonText, mainStyles.boldText, mainStyles.mediumText]}>My Stories</Text>
						</TouchableOpacity>
						<LinearGradient
							colors={["#4947A1", "#6463AD", "#DCA89A"]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
							style={styles.gradient}
						>
							<TouchableOpacity onPress={() => setShowPlayer(true)}>
								<Text style={[mainStyles.buttonText, mainStyles.boldText, mainStyles.mediumText]}>Start Reading</Text>
							</TouchableOpacity>
						</LinearGradient>
					</View>
				)}
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		marginTop: 10,
		paddingLeft: 20,
	},
	titleText: {
		color: "#FFFFFF",
		fontSize: 20,
		fontWeight: "700",
		textAlign: "left",
	},	
	tagItem: {
		backgroundColor: "#464669",
		borderRadius: 20,
		paddingVertical: 4,
		paddingHorizontal: 8,
		margin: 3,
	},
	gradient: {
		marginVertical: 5,
    	width: "45%",
    	height: 51,
    	borderRadius: 20,
		backgroundColor: 'rgba(12, 10, 21, 0.2)',
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		borderColor: "#FFA188",
		borderWidth: 1,
		width: "45%",
		height: 49,
		marginTop: 5,
	},
	content: {
		flex: 1,
		backgroundColor: "#100D18",
	},
	scroll: {
		marginTop: 10,
		paddingHorizontal: 5,
		maxHeight: "65%",
	},
	backBtn: {
		backgroundColor: "#373751",
		width: 42,
		height: 42,
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		padding: 5,
		position: "absolute",
		left: "5%",
		top: "6%",
	},
});
