import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import { mainStyles } from "@/utils/styles";
import { User, Credentials } from "@/utils/types";
import { capitalizeFirstLetter, deleteItem, showNotification, saveItem, asyncHandler } from "@/utils/helpers";
import { logout, clearAuthHeader, uploadImage, updateProfile, imageURL } from "@/utils/api";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
type ProfileProps = {
	onClose: () => void;
 	cred: Credentials;
	setCredentials: (cred: Credentials) => void;
};

export default function Profile({ onClose, cred, setCredentials }: ProfileProps) {
	async function logoutHandler() {
    	await logout();
    	clearAuthHeader();
		deleteItem("credentials");
		router.push("/auth/login");
		onClose();
  	}

	const requestPermission = async () => {
		const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
		if (libraryStatus !== "granted" || cameraStatus !== "granted") {
			console.error("Permission denied for camera or media library");
			return false;
		}
		return true;
	};

	const openImagePicker = async () => {
		try {
			const hasPermission = await requestPermission();
			if (!hasPermission) return;
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsEditing: true,
				aspect: [4, 3],
				quality: 0.8,
			});
			if (!result.canceled && result.assets.length > 0) {
				_upload(result.assets[0]);
			}
        }
		catch (err){
			console.error(err);
            return false;
        }
    };

	const _upload = (image: any) => {
        asyncHandler(async () => {
            const filename = `${new Date().getTime()}.${image?.fileName.split(".")[1]}`;
			const file = { uri: image.uri, type: image.mimeType, name: filename };
            const imageForm = new FormData();
            imageForm.append("file", file);
            const response = await uploadImage(imageForm);
            if (response?.data?.success){
				const body: User = {
					...cred?.user,
					image: response?.data?.result,
				};
				//await updateProfile(user?._id ?? "", body);
				await saveItem("credentials", {...cred, user: body});	
				setCredentials({...cred, user: body});
            } else {
				showNotification("error", "Unable to upload image");
			}
        });
    };

	return (
		<View style={styles.modalContent}>
			<View style={styles.container}>
				<View style={[mainStyles.ribbon, { alignItems: "center" }]}>
					{cred?.user?.image ? (
						<TouchableOpacity onPress={openImagePicker}>
							<Image
								source={{ uri: `${imageURL}/${cred?.user?.image}` }}
								style={styles.profilePic}
							/>
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={openImagePicker}>
							<Ionicons name="image-outline" size={28} color="#FAFAFA" />
							<Text style={[mainStyles.buttonText, mainStyles.extraSmallText]}>Upload Image</Text>
						</TouchableOpacity>
					)}
					<TouchableOpacity onPress={() => onClose()} style={{ marginRight: 20, marginTop: -20 }}>
						<Ionicons name="close" size={22} color="#FAFAFA" />
					</TouchableOpacity>
				</View>
				<View style={styles.segment}>
					<Text style={styles.label}>Name</Text>
					<Text style={[mainStyles.buttonText, mainStyles.mediumText, mainStyles.boldText]}>{capitalizeFirstLetter(cred?.user?.name ?? "")}</Text>
				</View>
				<View style={styles.segment}>
					<Text style={styles.label}>Email</Text>
					<Text style={[mainStyles.buttonText, mainStyles.smallText, mainStyles.boldText]}>{cred?.user?.email}</Text>
				</View>
				<View style={styles.segment}>
					<Text style={styles.label}>Gender</Text>
					<Text style={[mainStyles.buttonText, mainStyles.smallText, mainStyles.boldText]}>{cred?.user?.gender}</Text>
				</View>
				<View style={[mainStyles.ribbon, { marginTop: 20, paddingRight: 40 }]}>
					<TouchableOpacity style={[mainStyles.row, { alignItems: "center" }]}>
						<Ionicons name="pencil-outline" size={18} color="#FAFAFA" />
						<Text style={[mainStyles.buttonText, mainStyles.smallText, mainStyles.boldText, { marginLeft: 5 }]}>Edit Profile</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={logoutHandler} style={[mainStyles.row, { alignItems: "center" }]}>
						<Ionicons name="power-outline" size={18} color="#FAFAFA" />
						<Text style={[mainStyles.buttonText, mainStyles.smallText, mainStyles.boldText, { marginLeft: 5 }]}>Logout</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
		
	);
}

const styles = StyleSheet.create({
	modalContent: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(36, 32, 48, 0.7)",
	},
	container: {
		backgroundColor: "rgba(36, 32, 48, 0.9)",
		borderWidth: 0.5,
		borderColor: "#4A4965",
		borderTopRightRadius: 32,
		borderBottomRightRadius: 32,
		width: "80%",
		paddingLeft: 40,
		paddingVertical: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: "400",
		color: "#9A8E86",
	},
	segment: {
		marginTop: 10
	},
	profilePic: {
		resizeMode: "contain",
		width: 120,
		height: 120,
		borderRadius: 60,
		marginTop: "-52%",
	},
});
