import { View, Text, TouchableOpacity, Image, ImageBackground, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mainStyles } from "@/utils/styles";
import { LinearGradient } from "expo-linear-gradient";
import { ButtonGradient } from "@/components/common";

export default function Story() {
	return (
		<View style={{ flex: 1}}>
			<Image
				source={{ uri: "https://skynet.codexp.in/storyapp/1789434559218061412.webp" }}
				style={{ height: "37%", width: "100%" }}
			/>
			<SafeAreaView style={styles.content}>
				<View style={styles.titleContainer}>
					<Text style={{ color: "#FAFAFA", fontSize: 28, fontWeight: "700", textAlign: "center" }}>
			Lily and the Robot Science Adventure
					</Text>
					<View style={[mainStyles.row, {justifyContent: "center"}]}>
						<View style={styles.tagItem}>
							<Text style={{ color: "white" }}>Action</Text>
						</View>
						<View style={styles.tagItem}>
							<Text style={{ color: "white" }}>Action</Text>
						</View>
					</View>
				</View>
				<ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
					<Text style={[mainStyles.buttonText, { fontSize: 14, lineHeight: 22, letterSpacing: 0.15, textAlign: "justify" }]}>
						Rosie the rabbit loved to help her friends in the forest. One sunny day, her friend Benny the beaver needed help building a new dam. Rosie said, "I can do it!" and started to dig. But she dug too deep and made a big hole. Benny's dam started to leak. Rosie felt sad and said, "Oh no! I made a mistake!" Benny said, "It's okay, Rosie. We can fix it together." Rosie and Benny worked together and fixed the dam. Rosie learned that making mistakes is okay, and it's always good to ask for help when you need it. Rosie felt happy and proud to help her friend Benny.
Rosie the rabbit loved to help her friends in the forest. One sunny day, her friend Benny the beaver needed help building a new dam. Rosie said, "I can do it!" and started to dig. But she dug too deep and made a big hole. Benny's dam started to leak. Rosie felt sad and said, "Oh no! I made a mistake!" Benny said, "It's okay, Rosie. We can fix it together." Rosie and Benny worked together and fixed the dam. Rosie learned that making mistakes is okay, and it's always good to ask for help when you need it. Rosie felt happy and proud to help her friend Benny.
Rosie the rabbit loved to help her friends in the forest. One sunny day, her friend Benny the beaver needed help building a new dam. Rosie said, "I can do it!" and started to dig. But she dug too deep and made a big hole. Benny's dam started to leak. Rosie felt sad and said, "Oh no! I made a mistake!" Benny said, "It's okay, Rosie. We can fix it together." Rosie and Benny worked together and fixed the dam. Rosie learned that making mistakes is okay, and it's always good to ask for help when you need it. Rosie felt happy and proud to help her friend Benny.
					</Text>
				</ScrollView>
				<View style={[mainStyles.ribbon, { paddingHorizontal: 20 }]}>
					<LinearGradient
						colors={["#4947A1", "#6463AD", "#DCA89A"]}
        				start={{ x: 0, y: 0 }}
        				end={{ x: 1, y: 1 }}
						style={styles.gradient}
					>
						<TouchableOpacity style={styles.button}>
							<Text style={[mainStyles.buttonText, mainStyles.boldText, mainStyles.mediumText]}>My Stories</Text>
						</TouchableOpacity>
					</LinearGradient>
					<LinearGradient
						colors={["#4947A1", "#6463AD", "#DCA89A"]}
        				start={{ x: 0, y: 0 }}
        				end={{ x: 1, y: 1 }}
						style={styles.gradient}
					>
						<TouchableOpacity style={styles.button}>
							<Text style={[mainStyles.buttonText, mainStyles.boldText, mainStyles.mediumText]}>Start Reading</Text>
						</TouchableOpacity>
					</LinearGradient>
				</View>
			</SafeAreaView>
		</View>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		position: "absolute",
		zIndex: 1,
		top: "1%",
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
});
