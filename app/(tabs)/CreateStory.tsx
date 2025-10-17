import { useState, useEffect } from "react";
import { View, Modal, ScrollView, Text, ActivityIndicator, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import Container from "@/components/Container";
import { mainStyles } from "@/utils/styles";
import { InputBoxGradient, ButtonGradient } from "@/components/common";
import DropDownPicker from "react-native-dropdown-picker";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import { getMetadata, createStory, addStory, getStoryById } from "@/utils/api";
import { asyncHandler, getItem, showNotification, sanitizeNumber } from "@/utils/helpers";
import { Credentials, Story } from "@/utils/types";
import Ionicons from "@react-native-vector-icons/ionicons";
import { router } from "expo-router";

type Option = {
	label: string;
	value: string;
};
export default function CreateStory() {
	const [searchQuery, setSearchQuery] = useState("");
	const [ageOptions, setAgeOptions] = useState<Option[]>([]);
	const [durationOptions, setDurationOptions] = useState<Option[]>([]);
	const [tags, setTags] = useState<string[]>([]);
	const [popularTags, setPopularTags] = useState<string[]>([]);
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [filteredTags, setFilteredTags] = useState<string[]>([]);
	const [openAge, setOpenAge] = useState(false);
	const [openDuration, setOpenDuration] = useState(false);
	const [openGender, setOpenGender] = useState(false);
	const [age, setAge] = useState("1");
	const [duration, setDuration] = useState("1");
	const [gender, setGender] = useState("male");
	const [showProfile, setShowProfile] = useState(false);
	const [credentials, setCredentials] = useState<Credentials | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		asyncHandler(async () => {
			const response = await getMetadata();
			if (response?.success && response?.result) {
				const ageArr: Option[] = [];
				for (const age of response?.result?.age) {
					ageArr.push({ label: `${age} yrs`, value: age });
				}
				setAgeOptions(ageArr);
				const durationArr: Option[] = [];
				for (const duration of response?.result?.duration) {
					durationArr.push({ label: `${duration} min`, value: duration });
				}
				setDurationOptions(durationArr);
				const { categories } = response?.result;
				setTags(categories ?? []);
				if (categories?.length) setPopularTags(categories?.splice(0, 7));
			}
			const cred = await getItem("credentials");
			if (cred) {
				setCredentials(JSON.parse(cred));
			}
		});
	}, []);

	const handleSearch = (val: string) => {
		setSearchQuery(val);	
		setFilteredTags(tags?.filter(option =>
    		option?.toLowerCase().includes(searchQuery.toLowerCase()),
  		));
	};

	const handleSelect = (val: string) => {
		if (selectedTags.find(item => item === val)) return;
		setSelectedTags(prev => [...prev, val]);
		setSearchQuery("");
		Keyboard.dismiss();
	};

	const unselect = (val: string) => {
		const list = selectedTags.filter(item => item !== val);
		setSelectedTags(list);
	};

	const addTag = () => {
		if (searchQuery?.length > 0) {
			handleSelect(searchQuery);
		}
	};

	function handleCreate() {
    	if (age && gender && selectedTags && duration) {
			setIsLoading(true);
      		asyncHandler(
        		async () => {
          			const response = await createStory(age, gender, selectedTags.join(","), duration);
          			if (response) {
            			const story: Story = {
              				audio: response?.audio ?? "",
              				messages: response?.messages ?? [],
              				text: response?.story ?? "",
              				title: response?.title ?? "",
              				image1: response?.image1 ?? "",
              				image2: response?.image2 ?? "",
              				image3: response?.image3 ?? "",
              				gender,
              				age: sanitizeNumber(age),
              				duration: sanitizeNumber(duration),
              				tags: selectedTags,
            			};
            			const result = await addStory(story);
            			if (result?.success && result?.message) {
              				const storyResponse = await getStoryById(result?.message ?? "");
              				if (storyResponse?.success && storyResponse?.result) {
                				story.thumbnail = storyResponse?.result?.thumbnail ?? "";
								setAge("1");
								setDuration("1");
								setSelectedTags([]);
								router.push({
									pathname: "/story/StoryDetails",
									params: { data: JSON.stringify(story)},
								});
              				}
            			}
          			}
          			setIsLoading(false);
        		},
        		() => {
          			setIsLoading(false);
          			showNotification("error", "Unable to create story");
        		},
      		);
    	} else {
      		showNotification("error", "Please fill all the fields");
    	}
  	}

	if (isLoading) return <Container><Loader /></Container>;
	return (
		<Container>
			<View style={[mainStyles.mainContent]}>
				<Header clickHandler={() => setShowProfile(true)} image={credentials?.user?.image} />	
				<View style={styles.content}>
					<View style={{ marginVertical: 10 }}>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>Create your own</Text>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>amazing tales</Text>
					</View>
					<View style={styles.optionContainer}>
						<View style={styles.dropdownItem}>
							<Text style={[mainStyles.buttonText, mainStyles.smallText]}>Age</Text>
							<DropDownPicker
								open={openAge}
								value={age}
								items={ageOptions}
								setOpen={setOpenAge}
								setValue={setAge}
								style={styles.dropdown}
								textStyle={styles.dropdownText}
								dropDownContainerStyle={styles.dropdownList}
								listItemLabelStyle={styles.listItem}
							/>
						</View>
						<View style={styles.dropdownItem}>
							<Text style={[mainStyles.buttonText, mainStyles.smallText]}>Duration</Text>
							<DropDownPicker
								open={openDuration}
								value={duration}
								items={durationOptions}
								setOpen={setOpenDuration}
								setValue={setDuration}
								style={styles.dropdown}
								textStyle={styles.dropdownText}
								dropDownContainerStyle={styles.dropdownList}
								listItemLabelStyle={styles.listItem}
							/>
						</View>
						<View style={styles.dropdownItem}>
							<Text style={[mainStyles.buttonText, mainStyles.smallText]}>Gender</Text>
							<DropDownPicker
								open={openGender}
								value={gender}
								items={[
									{ label: "Boy", value: "male" },
									{ label: "Girl", value: "female" },
									{ label: "Both", value: "both" },
								]}
								setOpen={setOpenGender}
								setValue={setGender}
								style={styles.dropdown}
								textStyle={styles.dropdownText}
								dropDownContainerStyle={styles.dropdownList}
								listItemLabelStyle={styles.listItem}
							/>
						</View>
					</View>
					<View style={[mainStyles.ribbon, { paddingHorizontal: 5, marginTop: 10, alignItems: "center" }]}>
						<View style={{ width: "75%" }}>
							<Text style={[mainStyles.buttonText, mainStyles.smallText]}>Search Genre</Text>
							<InputBoxGradient
								placeholder="Search Genre"
								isSecureText={false}
								changeHandler={handleSearch}
								value={searchQuery}
							/>
						</View>
						<TouchableOpacity onPress={addTag} style={[mainStyles.row, { alignItems: "center", justifyContent: "center" }]}>
							<Ionicons name="add-outline" size={16} color="#FAFAFA" />
							<Text style={[mainStyles.buttonText]}>Add</Text>
						</TouchableOpacity>
					</View>
					<ScrollView style={{ marginBottom: 20, minHeight: 100, maxHeight: 300 }} keyboardShouldPersistTaps="always">
						{searchQuery?.length > 0 &&
							<View style={[mainStyles.row]}>
								{filteredTags?.map((tag: string) => (
									<TouchableOpacity onPress={() => handleSelect(tag)} key={tag} style={styles.tagItem}>
										<Text style={{ color: "#FAFAFA", textTransform: "capitalize" }}>{tag}</Text>
									</TouchableOpacity>
								))}
							</View>
						}
						{selectedTags?.length > 0 && (
							<>
								<Text style={[mainStyles.buttonText, mainStyles.smallText, { marginTop: 5, marginHorizontal: 5 }]}>Selected Genres</Text>
								<View style={[mainStyles.row]}>
									{selectedTags?.map((tag: string) => (
										<TouchableOpacity onPress={() => unselect(tag)} key={tag} style={styles.tagItem}>
											<Text style={{ color: "#FAFAFA", textTransform: "capitalize" }}>{tag}</Text>
										</TouchableOpacity>
									))}
								</View>
							</>
						)}
						<>
							<Text style={[mainStyles.buttonText, mainStyles.smallText, { marginTop: 5, marginHorizontal: 5 }]}>Popular Genres</Text>
							<View style={[mainStyles.row]}>
								{popularTags?.map((tag: string) => (
									<TouchableOpacity onPress={() => handleSelect(tag)} key={tag} style={styles.tagItem}>
										<Text style={{ color: "#FAFAFA", textTransform: "capitalize" }}>{tag}</Text>
									</TouchableOpacity>
								))}
							</View>
						</>
					</ScrollView>
					<ButtonGradient
						label="Create Story"
						clickHandler={handleCreate}
					/>
				</View>
				{credentials &&
					<Modal
						animationType="fade"
						transparent={true}
						visible={showProfile}
						onRequestClose={() => setShowProfile(false)}
					>
						<Profile
							onClose={() => setShowProfile(false)}
							cred={credentials}
							setCredentials={setCredentials}
						/>
					</Modal>
				}
			</View>
		</Container>
	);
}

function Loader() {
	return (
		<View style={{ paddingHorizontal: 20}}>
			<ActivityIndicator size="large" color="#FAFAFA" />
			<Text style={[{ marginTop: 20 }, mainStyles.boldText, mainStyles.buttonText, mainStyles.largeText]}>
            	Crafting a story for you. This might a take a minute. 
          </Text>
		</View>
	)
}

const styles = StyleSheet.create({
	content: {
		marginTop: "2%",
		paddingHorizontal: 10,
	},
	dropdown: {
    	backgroundColor: "#4a4a6a",
    	borderRadius: 20,
    	borderColor: "transparent",
		marginTop: 5,
  	},
  	dropdownText: {
    	color: "#fff",
    	fontSize: 16,
    	textAlign: "center",
  	},
  	dropdownList: {
    	backgroundColor: "#4a4a6a",
    	borderRadius: 10,
    	borderColor: "transparent",
  	},
  	listItem: {
    	color: "#fff",
  	},
	optionContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		flexWrap: "nowrap",
		marginTop: 20,
	},
	dropdownItem: {
		width: "30%",
		marginHorizontal: 5,
		marginVertical: 5,
	},
	tagItem: {
		backgroundColor: "#464669",
		borderRadius: 20,
		padding: 8,
		margin: 5,
	},
});
