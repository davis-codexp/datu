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
	linkText: { fontWeight: "500", color: "#470BE5" },
	row: { flexDirection: "row", flexWrap: "wrap" },
	ribbon: { flexDirection: "row", justifyContent: "space-between", flexWrap: "nowrap" },
	brandText: {
		color: "#4947A1",
		fontWeight: "400",
		fontSize: 36,
	},
	thumbnail: {
		width: 36,
		height: 36,
		borderRadius: 36,
		resizeMode: "contain",
	},
	button: {
    	margin: 5,
    	padding: 10,
    	borderRadius: 20,
  	},
  	alphaBtn: {
    	backgroundColor: "#7966FF",
  	},
	dangerBtn: {
    	backgroundColor: "#FA1604",
  	},
});
