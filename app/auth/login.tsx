import { useState } from "react";
import Container from "@/components/Container"
import {
	View, Text, StyleSheet, Keyboard, TouchableWithoutFeedback,
	TouchableOpacity,
} from "react-native";
import { InputBoxGradient, ButtonGradient } from "@/components/common";
import { mainStyles } from "@/utils/styles";
import {
	showNotification, asyncHandler,
	sanitizeNumber, saveItem,
} from "@/utils/helpers";
import { validate } from "@/utils/validation";
import { router } from "expo-router";
import { getOtp, verifyOtp, setAuthHeader } from "@/utils/api";
import { LoginForm, Credentials } from "@/utils/types";

export default function Login() {
	const [email, setEmail] = useState("");
	const [otp, setOtp] = useState("");
	const [screen, setScreen] = useState(1);

	function fetchOtp() {
		const form: LoginForm = {
			email,
			otp: Number(otp),
		};
    	if (validate(form, "getOtp")) {
      		const body: LoginForm = {
        		email: form.email,
      		};
      		let message = "Unable to get OTP. Please try again after some time.";
      		asyncHandler(
				async () => {
					const response = await getOtp(body);
			  		if (response?.success) {
				  		setScreen(2);
				  		message = response?.message || "OTP has been sent to your email.";
						showNotification("success", message);
						Keyboard.dismiss();
			  		} else {
				  		showNotification(
							"error", response?.message || "This email is not registered. Please sign up."
				  		);
			  		}
		  		},
		  		() => showNotification("info", message),
	  		);
		} else {
      		showNotification("error", "Email cannot be empty");
    	}
	}

	function verify() {
		const form: LoginForm = {
			email,
			otp: Number(otp),
		};
		if (validate(form, "verifyOtp")) {
			const body: LoginForm = {
			...form,
			otp: sanitizeNumber(form.otp),
		};
		asyncHandler(
			async () => {
				const response = await verifyOtp(body);
				if (response?.success) {
					const cred: Credentials = response?.result as Credentials;
					await saveItem("credentials", cred);
					setAuthHeader(cred.token);
					Keyboard.dismiss();
					router.push("/(tabs)");
				} else {
					showNotification("error", response.message || "Invalid OTP");
				}
			},
			() =>
				showNotification(
					"info",
					"Unable to verify OTP. Please try again after some time.",
				),
			);
		} else {
			showNotification("error", "OTP cannot be empty");
		}
	}

	return (
		<Container>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={mainStyles.mainContent}>
					<View style={styles.content}>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>Sign In to</Text>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>your Account</Text>
						{screen === 1 ? (
							<View style={styles.formContent}>
								<Text style={[mainStyles.smallText, mainStyles.boldText, mainStyles.buttonText]}>Enter your email <Text style={{ color: "red" }}>*</Text></Text>
								<InputBoxGradient
									placeholder="Enter your Email"
									isSecureText={false}
									changeHandler={setEmail}
									value={email}
									keyboardType="email-address"
								/>
								<ButtonGradient label="Get OTP" clickHandler={fetchOtp} />
								<TouchableOpacity style={{ marginTop: 20, alignItems: "center" }} onPress={() => router.push("/auth/signup")}>
									<Text style={[mainStyles.smallText, { color: "#9A8E86" }]}>Don't have an account?
											<Text style={[mainStyles.smallText, mainStyles.boldText, { color: "#FAFAFA" }]}> Sign Up</Text>
									</Text>
								</TouchableOpacity>
							</View>
						) : (
							<View style={styles.formContent}>
								<Text style={[mainStyles.smallText, mainStyles.boldText, mainStyles.buttonText]}>Enter OTP <Text style={{ color: "red" }}>*</Text></Text>
								<InputBoxGradient
									placeholder="Enter OTP"
									isSecureText={true}
									changeHandler={setOtp}
									value={otp}
									keyboardType="numeric"
								/>
								<ButtonGradient label="Verify OTP" clickHandler={verify} />
								<TouchableOpacity onPress={fetchOtp} style={{ alignItems: "center", marginTop: 10}}>
									<Text style={{ color: "#FAFAFA", fontWeight: "500", fontSize: 16 }}>Resend OTP</Text>
								</TouchableOpacity>
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
