import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { formatDuration } from "@/utils/helpers";
import Ionicons from "@react-native-vector-icons/ionicons"
import Slider from "@react-native-community/slider";
import { mainStyles } from "@/utils/styles";

type PlayerProps = {
	source: string;
};

export default function Player({ source }: PlayerProps) {
	const player = useAudioPlayer(source);
	const playerStatus = useAudioPlayerStatus(player);
	const [isPlaying, setIsPlaying] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [playbackRate, setPlaybackRate] = useState(1);

	useEffect(() => {
		if (playerStatus?.isLoaded) {
			setIsPlaying(true);
			player.play();
		}
	}, [playerStatus?.isLoaded]);

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
    	<View style={styles.player}>
			<Slider
				style={{
					width: "80%",
				}}
				minimumValue={0}
				maximumValue={Math.floor(playerStatus?.duration || 1)}
				value={Math.floor(playerStatus?.currentTime || 0)}
				disabled={!playerStatus?.isLoaded}
				minimumTrackTintColor="#DCA89A"
				maximumTrackTintColor="#373751"
				thumbTintColor="transparent"
				onSlidingComplete={slideHandler}
			/>
			<View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around" }}>
				<Text style={[mainStyles.buttonText]}>{ formatDuration(playerStatus.currentTime) }</Text>
				<View style={{ alignItems: "center" }}>
					{playerStatus?.isLoaded &&
						<>
							{playerStatus?.currentTime !== playerStatus?.duration ? (
								<TouchableOpacity style={styles.playButton} onPress={() => playHandler(!isPlaying)}>
									<Ionicons name={isPlaying ? "pause-outline" : "play-outline"} size={32} color="#FFE8D9" />
								</TouchableOpacity>
							) : (
								<TouchableOpacity style={styles.playButton} onPress={() => replay()}>
									<Ionicons name="reload-outline" size={24} color="#FFE8D9" />
								</TouchableOpacity>
							)}
						</>
					}
				</View>
				<View>
					<Text style={[mainStyles.buttonText]}>{ formatDuration(playerStatus.duration) }</Text>
					<TouchableOpacity style={{ marginLeft: 5, width: 30, height: 30, justifyContent: "center", alignItems: "center" }} onPress={toggleModal}>
						<Ionicons name="settings-outline" size={18} color="#FAFAFA" />
					</TouchableOpacity>
				</View>
			</View>
			<Modal
				animationType="fade"
				transparent={true}
				visible={showModal}
				onRequestClose={toggleModal}
			>
				<View style={styles.modal}>
					<View style={[styles.modalContent]}>
						<View style={[mainStyles.ribbon, { marginBottom: 10 }]}>
							<Text style={[mainStyles.buttonText]}>Playback Speed</Text>
							<TouchableOpacity style={{ height: 20, width: 30, justifyContent: "center", alignItems: "center" }} onPress={toggleModal}>
								<Ionicons name="close" size={18} color="#FAFAFA" />
							</TouchableOpacity>
						</View>
						<View style={styles.modalButtons}>
							{[0.5, 0.75, 1, 1.25, 1.75, 2].map((rate: number) => (
								<TouchableOpacity
									key={rate}
									style={[styles.modalButton, playbackRate === rate && styles.modalButtonSelected ]}
									onPress={() => setRate(rate)}
								>
									<Text style={[ mainStyles.extraSmallText, mainStyles.buttonText, playbackRate === rate && styles.modalButtonTextSelected]}>{rate}x</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>
				</View>
			</Modal>
    	</View>
  );	
}

const styles = StyleSheet.create({
	player: {
		maxHeight: 100,
		width: "100%",
		justifyContent: "center",
		padding: 10,
		alignItems: "center",
		backgroundColor: "#100D18",
	},
	playButton: {
		width: 50,
		height: 50,
		backgroundColor: "#4947A1",
		borderRadius: 50,
		alignItems: "center",
		justifyContent: "center",
		margin: 10,
	},
	modal: {
		flex: 1,
    	justifyContent: 'center',
    	alignItems: 'center',
    	backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: "#100D18",
    	borderRadius: 10,
    	padding: 20,
    	width: '60%',
	},
	modalButtons: {
    	width: '100%',
		flexDirection: "row",
		justifyContent: "space-around",
		flexWrap: "wrap",
  	},
	modalButton: {
    	padding: 10,
    	borderRadius: 50,
    	backgroundColor: "gray",
		height: 50,
    	width: 50,
		alignItems: "center",
		justifyContent: "center",
		margin: 3,
  	},
	modalButtonSelected: {
    	backgroundColor: '#007AFF',
  	},
  	modalButtonTextSelected: {
  		color: '#FFFFFF',
    	fontWeight: 'bold',
  	},
});
