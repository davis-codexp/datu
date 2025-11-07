import { Tabs } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabProps = {
	focused: boolean;
	iconName: string;
	tabName: string;
};

export default function _Layout() {
	const insets = useSafeAreaInsets();

	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: "#100D18",
					marginBottom: 0,
					height: 60 + insets.bottom,
					overflow: "hidden",
					borderColor: "#100D18",
					paddingBottom: insets.bottom,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} iconName="home" tabName="Home" />		
					)
				}}
			/>
			<Tabs.Screen
				name="MyStories"
				options={{
					title: "My Stories",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} iconName="book-outline" tabName="My Stories" />		
					)
				}}
			/>
			<Tabs.Screen
				name="CreateStory"
				options={{
					title: "Create Story",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon focused={focused} iconName="moon-outline" tabName="Create" />		
					)
				}}
			/>
		</Tabs>
	);
}

function TabIcon(props: TabProps) {
	return (
		<View style={styles.tab}>
			<Ionicons
				name={props.iconName}
				color={props?.focused ? "#4947A1" : "#FAFAFA" }
				size={24}
			/>		
			<Text
				style={[styles.tabText, { color: props?.focused ? "#4947A1" : "#FAFAFA" }]}
			>{props.tabName}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	tab: {
		marginTop: 10,
		minWidth: 70,
		height: 53,
		alignItems: "center",
		justifyContent: "center",
	},
	tabText: {
		fontSize: 10,
		fontWeight: "bold",
		color: "#FAFAFA",
	},
});
