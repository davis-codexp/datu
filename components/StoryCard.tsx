import {
	ImageBackground, StyleSheet, TouchableOpacity,
	View, Text,
} from "react-native";
import { CardType } from "@/utils/types";

type CardProps = {
	card: CardType,
};

export default function StoryCard({ card }: CardProps) {
	return (
		<View style={styles.container}>
      		<ImageBackground source={{ uri: card.image }} style={styles.backgroundImage}>
        		<View style={styles.overlay}>
					<View style={{ backgroundColor: "#161128", opacity: 0.9, padding: 10 }}>
						<Text style={styles.title}>{card.title}</Text>
						<Text numberOfLines={1} style={styles.subtitle}>{card.tags}</Text>
						<Text style={styles.subtitle}>{card.duration} mins read</Text>
						<TouchableOpacity style={styles.playButton}>
							<Text style={styles.playButtonText}>▶</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
    	</View>
	);	
}

const styles = StyleSheet.create({
	container: {
		width: "48%",
		height: 220,
		borderRadius: 10,
		marginBottom: 10,
		overflow: "hidden",
		backgroundColor: "red",
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
		top: "65%",
		left: "85%",
		backgroundColor: "#4947A1",
		opacity: 0.8,
		width: 36,
		height: 36,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	playButtonText: {
		color: "#FAFAFA",
		fontSize: 18,
	},
});
