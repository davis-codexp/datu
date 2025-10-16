import { StyleSheet, TextInput, TouchableOpacity, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { mainStyles } from "@/utils/styles";

type InputProps = {
	placeholder: string;
	isSecureText: boolean;
	changeHandler: (val: string) => void;
	value: string;
	keyboardType?: string;
};

type ButtonProps = {
	label: string;
	clickHandler: () => void;
};

export function InputBoxGradient(props: InputProps) {
	return (
		<LinearGradient
        	colors={["#252538", "#34344D"]}
        	start={{ x: 0.48, y: 0 }}
        	end={{ x: 0.96, y: 1 }}
        	style={styles.gradient}
      	>
			<TextInput
				style={styles.input}
				placeholder={props.placeholder}
				secureTextEntry={props.isSecureText}
				onChangeText={props.changeHandler}
				placeholderTextColor="rgba(255, 255, 255, 0.5)"
				value={props.value}
				keyboardType={props?.keyboardType ?? "default"}
			/>
		</LinearGradient>
  	);
}

export function ButtonGradient(props: ButtonProps) {
	return (
		<LinearGradient
			colors={["#4947A1", "#6463AD", "#DCA89A"]}
        	start={{ x: 0, y: 0 }}
        	end={{ x: 1, y: 1 }}
			style={styles.gradient}
		>
			<TouchableOpacity style={styles.button} onPress={props.clickHandler}>
				<Text style={[mainStyles.buttonText, mainStyles.boldText, mainStyles.mediumText]}>{props.label}</Text>
			</TouchableOpacity>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	input: {
		width: "100%",
    	color: "#FFE8D9",
    	paddingHorizontal: 15,
    	fontSize: 16,
  	},
	gradient: {
		marginVertical: 5,
    	width: "100%",
    	height: 51,
    	borderRadius: 20,
		shadowColor: '#0C0A15',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.7,
		shadowRadius: 8,
		elevation: 8,
		backgroundColor: 'rgba(12, 10, 21, 0.2)',
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: "100%",
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
	},
});
