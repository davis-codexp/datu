import {
	ImageBackground, StyleSheet, TouchableOpacity,
	View, Text,
} from "react-native";
import { Story } from "@/utils/types";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";

type CardProps = {
	story: Story,
	clickHandler: (val: Story) => void;
};

export default function StoryCard({ story, clickHandler }: CardProps) {
	const goToDetails = () => {
		router.push({
			pathname: "/story/StoryDetails",
			params: { data: JSON.stringify(story)},
		});
	};

	return (
		<TouchableOpacity style={styles.container} onPress={goToDetails}>
      		<ImageBackground source={{ uri: story?.thumbnail }} style={styles.backgroundImage}>
        		<View style={styles.overlay}>
					<View style={{ backgroundColor: "#161128", opacity: 0.9, padding: 10 }}>
						<Text style={styles.title}>{story?.title}</Text>
						<Text numberOfLines={1} style={styles.subtitle}>{story?.tags?.join(", ")}</Text>
						<Text style={styles.subtitle}>{story?.duration} mins read</Text>
						<TouchableOpacity style={styles.playButton} onPress={() => clickHandler(story)}>
							<Ionicons name="play-outline" size={18} color="#FAFAFA" />
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
    	</TouchableOpacity>
	);	
}

const styles = StyleSheet.create({
	container: {
		width: "48%",
		height: 220,
		borderRadius: 10,
		marginBottom: 10,
		overflow: "hidden",
		backgroundColor: "#100D18",
	},
	backgroundImage: {
		flex: 1,
		justifyContent: "flex-end",
	},
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},
	badge: {
		position: "absolute",
		top: 10,
		left: 10,
		backgroundColor: "#E91E63",
		borderRadius: 10,
		paddingVertical: 2,
		paddingHorizontal: 8,
	},
	badgeText: {
		color: "gray",
		fontSize: 12,
		fontWeight: "bold",
	},
	title: {
		color: "#FFE8D9",
		fontSize: 16,
		fontWeight: "700",
	},
	subtitle: {
		color: "#9A8E86",
		fontSize: 10,
		fontWeight: "400",
	},
	playButton: {
		position: "absolute",
		top: "55%",
		left: "85%",
		backgroundColor: "#4947A1",
		opacity: 0.8,
		width: 36,
		height: 36,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},
});
