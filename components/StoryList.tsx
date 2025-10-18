import { useEffect, useState } from "react";
import {
	View, Text, ActivityIndicator, FlatList, StyleSheet,
	TouchableOpacity, RefreshControl,
} from "react-native";
import StoryCard from "@/components/StoryCard";
import { mainStyles } from "@/utils/styles";
import { Story, Metadata } from "@/utils/types";
import PlayerAlt from "@/components/PlayerAlt";
import { getStories, getMetadata } from "@/utils/api";
import { asyncHandler, capitalizeFirstLetter } from "@/utils/helpers"

type TagProps = {
	tag: string;
	activeTag: string;
	onClick: (val: string) => void;
};

type StoryListProps = {
	listHeight: string;
	playerPosition: string;
};

export default function StoryList({ listHeight, playerPosition }: StoryListProps) {
	const [stories, setStories] = useState<Story[]>([]);
	const [metadata, setMetadata]= useState<Metadata | null>(null);
	const [tags, setTags] = useState(["All"]);
	const [story, setStory] = useState<Story | null>(null);
	const [activeTag, setActiveTag] = useState("All");
	const [isLoading, setIsLoading] = useState(true);
	
	const clickHandler = (story: Story) => {
		setStory(story);
	};

	useEffect(() => {
		fetchStories();	
	}, []);

	const fetchStories = (tagVal = activeTag) => {
		asyncHandler(async () => {
			setIsLoading(true);
			const response = await getStories(tagVal);
			if (response?.success && response?.result) {
				setStories(response?.result?.list ?? []);
			}
			const metadata_response = await getMetadata();
			if (metadata_response?.success && metadata_response?.result) {
				setMetadata(metadata_response?.result ?? null);
				if (metadata_response?.result?.categories?.length > 0) {
					setTags(["All", ...metadata_response?.result?.categories]);
				}
			}
		}, undefined, () => setIsLoading(false));
	};

	const tagHandler = (val: string) => {
		setActiveTag(val);
		fetchStories(val);
	};

	if (isLoading && stories.length === 0) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
		<ActivityIndicator size="large" color="#FAFAFA" />
	</View>;
	return (
		<View style={styles.content}>
			<View style={{ marginVertical: 10 }}>
				<Text style={[mainStyles.mediumText, mainStyles.boldText, mainStyles.buttonText]}>My Stories</Text>
				<FlatList
					data={tags ?? []}
					renderItem={({ item }) => <Tag tag={item} activeTag={activeTag} onClick={tagHandler} />}
					keyExtractor={item => item}
					horizontal={true}
					style={{ marginVertical: 10 }}
					showsHorizontalScrollIndicator={false}
				/>
			</View>
			<View style={{ marginVertical: 10 }}>
				<FlatList
					data={stories ?? []}
					renderItem={({ item }) => <StoryCard story={item} clickHandler={clickHandler} />}
					keyExtractor={item => item._id}
					style={{ marginVertical: 10, height: listHeight }}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					columnWrapperStyle={{ justifyContent: "space-between" }}
					refreshControl={
						<RefreshControl
							refreshing={isLoading}
							onRefresh={fetchStories}
							tintColor="#007AFF"
							colors={['#007AFF']}
						/>
        			}
				/>
			</View>
			{story &&
				<View style={{...styles.playerContainer, top: playerPosition }}>
					<PlayerAlt
						story={story}
						closeHandler={() => setStory(null)}
					/>
				</View>
			}
		</View>	
	);
}

function Tag(props: TagProps) {
	return (
		<TouchableOpacity
			style={[styles.tag, { backgroundColor: props.activeTag === props.tag ? "#A9A9D3" : "#464669" }]}
			onPress={() => props.onClick(props.tag)}
		>
			<Text style={[mainStyles.smallText, { color: props.tag === props.activeTag ? "#292936" : "#FFE8D9" }]}>{capitalizeFirstLetter(props.tag)}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	content: {
		marginTop: "2%",
		paddingHorizontal: 10,
	},
	tag: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
		marginHorizontal: 5,
	},
	playerContainer: {
		position: "absolute",
		width: "100%",
		paddingHorizontal: 10,
		zIndex: 1,
	},
});
