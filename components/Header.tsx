import { View, Text, TouchableOpacity, Image } from "react-native";
import { mainStyles } from "@/utils/styles";
import { imageURL } from "@/utils/api";
import Ionicons from "@react-native-vector-icons/ionicons";

type HeaderProps = {
	clickHandler: () => void;
	image?: string
};

export default function Header({ clickHandler, image }: HeaderProps) {
	return (
		<View style={[mainStyles.ribbon, { paddingHorizontal: 10 }]}>
			<View></View>
			<TouchableOpacity onPress={clickHandler}>
				{image ? (
					<Image
						source={{ uri: `${imageURL}/${image}` }}
						style={mainStyles.thumbnail}
					/>
				) : (
					<Ionicons name="person-outline" color="#FAFAFA" size={24} />
				)}
				
			</TouchableOpacity>
		</View>
	);
}
