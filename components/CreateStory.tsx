import { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Container from "@/components/Container";
import { mainStyles } from "@/utils/styles";
import { InputBoxGradient, ButtonGradient } from "@/components/common";
import DropDownPicker from "react-native-dropdown-picker";

export default function CreateStory() {
	const [openAge, setOpenAge] = useState(false);
	const [openDuration, setOpenDuration] = useState(false);
	const [openGender, setOpenGender] = useState(false);
	const [age, setAge] = useState(3);
	const [duration, setDuration] = useState(1);
	const [gender, setGender] = useState("boy");

	return (
		<Container>
			<View style={mainStyles.mainContent}>
				<View style={[mainStyles.ribbon, { paddingHorizontal: 10 }]}>
					<Text style={mainStyles.brandText}>Datu</Text>
					<TouchableOpacity>
						<Image
							source={{ uri: "https://skynet.codexp.in/storyapp/6142058503141424113.webp" }}
							style={mainStyles.thumbnail}
						/>
					</TouchableOpacity>
				</View>
				<View style={styles.content}>
					<View style={{ marginVertical: 10 }}>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>Create your own</Text>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>amazing tales</Text>
					</View>
					<InputBoxGradient
						placeholder="Start your own narration"
						value=""
						isSecureText={false}
						changeHandler={(value) => console.log(value)}
					/>
					<Text style={[mainStyles.buttonText, mainStyles.mediumText, { marginVertical: 5, textAlign: "center" }]}>OR</Text>
					<View style={styles.optionContainer}>
						<View style={styles.dropdownItem}>
							<Text style={[mainStyles.buttonText, mainStyles.smallText]}>Age</Text>
							<DropDownPicker
								open={openAge}
								value={age}
								items={[
									{ label: "3 yrs", value: 3 },
									{ label: "4 yrs", value: 4 },
									{ label: "5 yrs", value: 5 },
								]}
								setOpen={setOpenAge}
								setValue={setAge}
								style={styles.dropdown}
								textStyle={styles.dropdownText}
								dropDownContainerStyle={styles.dropdownList}
								listItemLabelStyle={styles.listItem}
							/>
						</View>
						<View style={styles.dropdownItem}>
							<Text style={[mainStyles.buttonText, mainStyles.smallText]}>Duration</Text>
							<DropDownPicker
								open={openDuration}
								value={duration}
								items={[
									{ label: "1 min", value: 1 },
									{ label: "2 min", value: 2 },
									{ label: "3 min", value: 3 },
								]}
								setOpen={setOpenDuration}
								setValue={setDuration}
								style={styles.dropdown}
								textStyle={styles.dropdownText}
								dropDownContainerStyle={styles.dropdownList}
								listItemLabelStyle={styles.listItem}
							/>
						</View>
						<View style={styles.dropdownItem}>
							<Text style={[mainStyles.buttonText, mainStyles.smallText]}>Gender</Text>
							<DropDownPicker
								open={openGender}
								value={gender}
								items={[
									{ label: "Boy", value: "boy" },
									{ label: "Girl", value: "girl" },
									{ label: "Both", value: "both" },
								]}
								setOpen={setOpenGender}
								setValue={setGender}
								style={styles.dropdown}
								textStyle={styles.dropdownText}
								dropDownContainerStyle={styles.dropdownList}
								listItemLabelStyle={styles.listItem}
							/>
						</View>
					</View>	
					<View style={{ width: "75%", paddingHorizontal: 5, marginTop: 10 }}>
						<InputBoxGradient
							placeholder="Search Genre"
							isSecureText={false}
							changeHandler={(val) => console.log(val)}
							value=""
						/>
					</View>
					<Text style={[mainStyles.buttonText, mainStyles.smallText, { marginTop: 5, marginHorizontal: 5 }]}>Popular Genres</Text>
					<View style={[mainStyles.row]}>
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Action</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Magic</Text>
						</TouchableOpacity>	
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Action</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Magic</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Action</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Magic</Text>
						</TouchableOpacity>
					</View>
					<Text style={[mainStyles.buttonText, mainStyles.smallText, { marginTop: 5, marginHorizontal: 5 }]}>Selected Genres</Text>
					<View style={[mainStyles.row]}>
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Action</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Magic</Text>
						</TouchableOpacity>	
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Action</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Magic</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Action</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.tagItem}>
							<Text style={{ color: "white" }}>Magic</Text>
						</TouchableOpacity>
					</View>
					<ButtonGradient
						label="Create Story"
						clickHandler={() => console.log("clicked")}
					/>
				</View>
			</View>
		</Container>
	);
}

const styles = StyleSheet.create({
	content: {
		marginTop: "2%",
		paddingHorizontal: 10,
	},
	dropdown: {
    	backgroundColor: "#4a4a6a",
    	borderRadius: 20,
    	borderColor: "transparent",
		marginTop: 5,
  	},
  	dropdownText: {
    	color: "#fff",
    	fontSize: 16,
    	textAlign: "center",
  	},
  	dropdownList: {
    	backgroundColor: "#4a4a6a",
    	borderRadius: 10,
    	borderColor: "transparent",
  	},
  	listItem: {
    	color: "#fff",
  	},
	optionContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		flexWrap: "nowrap",
		marginTop: 20,
	},
	dropdownItem: {
		width: "30%",
		marginHorizontal: 5,
		marginVertical: 5,
	},
	tagItem: {
		backgroundColor: "#464669",
		borderRadius: 20,
		padding: 8,
		margin: 5,
	},
});
