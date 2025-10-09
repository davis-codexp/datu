import { useState } from "react";
import Container from "@/components/Container"
import { View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback } from "react-native";
import { InputBoxGradient, ButtonGradient } from "@/components/common";
import { mainStyles } from "@/utils/styles";

export default function SignUp() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [screen, setScreen] = useState(1);

	const getOtp = () => {
		setScreen(2);
	};

	const verifyOtp = () => {
		setScreen(1);
		console.log({ email, otp });
	};

	return (
		<Container>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={mainStyles.mainContent}>
					<View style={styles.content}>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>Welcome</Text>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>StoryHead!</Text>
						{screen === 1 ? (
							<View style={styles.formContent}>
								<Text style={[mainStyles.smallText, mainStyles.boldText, mainStyles.buttonText]}>Create an account to continue!</Text>
								<InputBoxGradient
									placeholder="example@example.com"
									isSecureText={false}
									changeHandler={setEmail}
									value={email}
								/>
								<InputBoxGradient
									placeholder="Name eg: John Doe"
									isSecureText={false}
									changeHandler={setName}
									value={name}
								/>
								<ButtonGradient label="Register" clickHandler={getOtp} />
							</View>
						) : (
							<View style={styles.formContent}>
								<Text style={[mainStyles.smallText, mainStyles.boldText, mainStyles.buttonText]}>Enter OTP</Text>
								<InputBoxGradient
									placeholder="Enter OTP"
									isSecureText={true}
									changeHandler={setOtp}
									value={otp}
								/>
								<ButtonGradient label="Verify OTP" clickHandler={verifyOtp} />
							</View>
						)}
						
					</View>
				</View>
			</TouchableWithoutFeedback>
		</Container>
	);
}

const styles = StyleSheet.create({
	content: {
		marginTop: "40%",
		paddingHorizontal: 10,
	},
	formContent: {
		marginTop: 20,
	},
});
