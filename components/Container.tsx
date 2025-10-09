import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

type ContainerProps = {
	children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
	return (
		<LinearGradient
			colors={["#2C234C", "#221B38", "#161128", "#100D18"]}
			start={{ x: 2, y: 0.5 }}
			end={{ x: 1, y: 1 }}
		>
			<SafeAreaView style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
				{children}
			</SafeAreaView>
		</LinearGradient>
		
	);
}
