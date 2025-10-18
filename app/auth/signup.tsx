import { useState } from "react";
import Container from "@/components/Container"
import {
	View, Text, StyleSheet, Keyboard,
	TouchableWithoutFeedback, TouchableOpacity,
} from "react-native";
import { InputBoxGradient, ButtonGradient } from "@/components/common";
import { mainStyles } from "@/utils/styles";
import { showNotification, sanitizeNumber, asyncHandler } from "@/utils/helpers";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import { validate } from "@/utils/validation";
import { User } from "@/utils/types";
import { signup } from "@/utils/api";

export default function SignUp() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("");
	const [age, setAge] = useState("");
	const [gender, setGender] = useState("");
	const [openGender, setOpenGender] = useState(false);

	const submitHandler = () => {
		const form: User = {
			name, email, age, gender
		};
		if (validate(form, "signup")) {
			const body: User = {
				...form,
				age: sanitizeNumber(age),
			};
			asyncHandler(async () => {
				const response = await signup(body);
				if (response?.success) {
					Keyboard.dismiss();
					router.back();
					showNotification("success", "Successfully Signed Up");
				} else {
					showNotification("error", response?.message ?? "Unable to sign up. Please try again.");
				}
			}, () => showNotification("error", "Unable to sign up. Please try again"));
		} else {
			showNotification("error", "Please fill all the fields.");
		}	
	}

	return (
		<Container>	
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={mainStyles.mainContent}>
					<TouchableOpacity
						onPress={router.back}
						style={[mainStyles.row, { alignItems: "center" }]}
					>
						<Ionicons name="chevron-back" size={28} color="#FAFAFA" />
						<Text style={mainStyles.buttonText}>Log In</Text>
					</TouchableOpacity>
					<View style={styles.content}>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>Welcome StoryHead!</Text>
						<View style={styles.formContent}>
							<Text style={[mainStyles.smallText, mainStyles.boldText, mainStyles.buttonText]}>Create an account to continue!</Text>
							<View style={{ marginTop: 20 }}>
								<Text style={[mainStyles.buttonText, mainStyles.smallText]}>Name <Text style={{ color: "red" }}>*</Text></Text>
								<InputBoxGradient
									placeholder="Name eg: John Doe"
									isSecureText={false}
									changeHandler={setName}
									value={name}
								/>
							</View>
							<View style={{ marginTop: 10 }}>
								<Text style={[mainStyles.buttonText, mainStyles.smallText]}>Email <Text style={{ color: "red" }}>*</Text></Text>
								<InputBoxGradient
									placeholder="example@example.com"
									isSecureText={false}
									changeHandler={setEmail}
									value={email}
								/>
							</View>
							<View style={{ marginTop: 10 }}>
								<Text style={[mainStyles.buttonText, mainStyles.smallText]}>Age <Text style={{ color: "red" }}>*</Text></Text>
								<InputBoxGradient
									placeholder="Age"
									isSecureText={false}
									changeHandler={setAge}
									value={age}
									keyboardType="numeric"
								/>
							</View>
							<View style={styles.dropdownItem}>
								<Text style={[mainStyles.buttonText, mainStyles.smallText]}>Gender <Text style={{ color: "red" }}>*</Text></Text>
								<DropDownPicker
									open={openGender}
									value={gender}
									items={[
										{ label: "Male", value: "male" },
										{ label: "Female", value: "female" },
									]}
									setOpen={setOpenGender}
									setValue={setGender}
									style={styles.dropdown}
									textStyle={styles.dropdownText}
									dropDownContainerStyle={styles.dropdownList}
									listItemLabelStyle={styles.listItem}
								/>
							</View>
							<ButtonGradient label="Register" clickHandler={submitHandler} />
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Container>
	);
}

const styles = StyleSheet.create({
	content: {
		marginTop: "20%",
		paddingHorizontal: 10,
	},
	formContent: {
		marginTop: 20,
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
	dropdownItem: {
		width: "60%",
		marginHorizontal: 5,
		marginTop: 10,
		marginBottom: 30,
	},
});
