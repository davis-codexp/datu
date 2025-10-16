import { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainStyles } from "@/utils/styles";
import { LinearGradient } from "expo-linear-gradient";
import Player from "@/components/Player";
import Ionicons from "@react-native-vector-icons/ionicons"
import { useLocalSearchParams, router } from "expo-router";
import { Story } from "@/utils/types";

export default function StoryDetails() {
	const [showPlayer, setShowPlayer] = useState(false);
	const { data } = useLocalSearchParams<{ data: string }>();
	const story: Story = data ? JSON.parse(data) : null;

	return (
		<View style={{ flex: 1}}>
			<Image
				source={{ uri: story?.thumbnail }}
				style={{ height: "32%", width: "100%" }}
			/>
			<SafeAreaView style={styles.content}>
				<TouchableOpacity style={styles.backBtn} onPress={router.back}>
					<Ionicons name="chevron-back" size={24} color="#FAFAFA" />
				</TouchableOpacity>
				<View style={styles.titleContainer}>
					<Text style={styles.titleText}>{story?.title}</Text>
					<View style={[mainStyles.row, {justifyContent: "flex-start"}]}>
						{story?.tags?.map((tag: string) => (
							<TouchableOpacity key={tag} style={styles.tagItem}>
								<Text style={{ color: "white" }}>{tag?.toUpperCase()}</Text>
							</TouchableOpacity>
						))}
					</View>
				</View>
				<ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
					<Text style={[mainStyles.buttonText, { fontSize: 14, lineHeight: 22, letterSpacing: 0.15, textAlign: "justify" }]}>
						{story?.text}	
					</Text>
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
		position: "absolute",
		zIndex: 1,
		top: "1%",
		paddingLeft: 20,
	},
	titleText: {
		color: "#FAFAFA",
		fontSize: 28,
		fontWeight: "700",
		textAlign: "left",
	},	
	tagItem: {
		backgroundColor: "#464669",
		borderRadius: 20,
		padding: 8,
		margin: 5,
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
		marginTop: "20%",
		paddingHorizontal: 20,
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
		top: "-45%",
	},
});
