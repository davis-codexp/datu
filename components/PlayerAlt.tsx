import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import Ionicons from "@react-native-vector-icons/ionicons";
import Slider from "@react-native-community/slider";
import { mainStyles } from "@/utils/styles";
import { Story } from "@/utils/types";
import { formatDuration } from "@/utils/helpers";
import { storyURI } from "@/utils/api";

type PlayerAltProps = {
	story: Story
	closeHandler: () => void;
};

export default function PlayerAlt({ story, closeHandler }: PlayerAltProps) {
	const player = useAudioPlayer(`${storyURI}/${story?.audio ?? ""}`);
	const playerStatus = useAudioPlayerStatus(player);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(1);

	useEffect(() => {
		setIsPlaying(false);
	}, [story]);

	const setRate = (rate: number) => {
		player.setPlaybackRate(rate);
		setPlaybackRate(rate);
	};
	const toggleModal = () => setShowModal(prev => !prev);

	const playHandler = (flag: boolean) => {
		if (flag) player.play();
		else player.pause();
		setIsPlaying(flag);
	};

	const replay = () => {
		player.seekTo(0);
		player.play();
	};

	const slideHandler = (position: any) => {
		player.seekTo(position);
	};

	return (
		<View style={styles.container}>
			<Image
				style={styles.thumbnail}
				source={{ uri: story.thumbnail }}
			/>
			<View style={{ width: "65%" }}>
				<Text numberOfLines={1} style={[mainStyles.buttonText]}>{story.title}</Text>
				<Text style={[mainStyles.buttonText, mainStyles.extraSmallText]}>
					{story?.tags?.join(", ")}
				</Text>
				<Slider
					style={{ width: "100%", marginTop: -10 }}
					minimumValue={0}
					maximumValue={Math.floor(playerStatus?.duration || 1)}
					value={Math.floor(playerStatus?.currentTime || 0)}
					disabled={!playerStatus?.isLoaded}
					minimumTrackTintColor="#DCA89A"
					maximumTrackTintColor="#373751"
					thumbTintColor="transparent"
					onSlidingComplete={slideHandler}
				/>
				<View style={[mainStyles.ribbon, { marginTop: -10, paddingHorizontal: 5 }]}>
					<Text style={[mainStyles.buttonText, mainStyles.extraSmallText]}>{formatDuration(playerStatus.currentTime)}</Text>
					<Text style={[mainStyles.buttonText, mainStyles.extraSmallText]}>{formatDuration(playerStatus.duration)}</Text>
				</View>
			</View>
			<View style={{ alignItems: "center", marginHorizontal: 5, marginTop: 10 }}>
				{playerStatus?.isLoaded &&
					<>
						{playerStatus?.currentTime !== playerStatus?.duration ? (
							<TouchableOpacity style={styles.playButton} onPress={() => playHandler(!isPlaying)}>
								<Ionicons name={isPlaying ? "pause-outline" : "play-outline"} size={24} color="#FFE8D9" />
							</TouchableOpacity>
						) : (
							<TouchableOpacity style={styles.playButton} onPress={() => replay()}>
								<Ionicons name="reload-outline" size={24} color="#FFE8D9" />
							</TouchableOpacity>
						)}
						
					</>
				}	
			</View>		
			<TouchableOpacity
				style={{
					position: "absolute",
					left: "92%",
					top: "1%",
					width: 30,
					justifyContent: "center",
					alignItems: "center",
					height: 25,
				}}
				onPress={closeHandler}
			>
				<Ionicons name="close" color="#FAFAFA" size={18} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#464669",
		borderRadius: 20,
		width: "100%",
		height: 88,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: 5,
	},
	thumbnail: {
		width: 56,
		height: 56,
		borderRadius: 12,
		resizeMode: "contain",
		marginHorizontal: 5,
	},
	playButton: {
		width: 35,
		height: 35,
		backgroundColor: "#4947A1",
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
	},
});
