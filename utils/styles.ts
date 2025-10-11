import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
	mainContent: {
		flex: 1,
		width: "100%",
		height: "100%",
		padding: 5,
	},
	largeText: { fontSize: 32 },
	smallText: { fontSize: 14 },
	extraSmallText: { fontSize: 10 },
	mediumText: { fontSize: 20 },
	boldText: { fontWeight: "500" },
	buttonText: { color: "#FFE8D9" },
	row: { flexDirection: "row", flexWrap: "wrap" },
	ribbon: { flexDirection: "row", justifyContent: "space-between", flexWrap: "nowrap" },
	brandText: {
		color: "#4947A1",
		fontWeight: "400",
		fontSize: 36,
	},
});
