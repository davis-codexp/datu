import { useState } from "react";
import Container from "@/components/Container"
import {
	View, Text, StyleSheet, Keyboard,
	TouchableWithoutFeedback, FlatList,
	TouchableOpacity,
} from "react-native";
import { ButtonGradient } from "@/components/common";
import StoryCard from "@/components/StoryCard";
import { mainStyles } from "@/utils/styles";
import { CardType } from "@/utils/types";

const tags: string[] = ["All", "Action", "Adventure", "Space Travel", "Superhero", "History", "Magic", "Fantasy", "Mystery"];
const cards: CardType[] = [
	{
		_id: "1001",
		image: "https://skynet.codexp.in/storyapp/1789434559218061412.webp",
		title: "Lily and the Robot Science Adventure",
		duration: "1",
		tags: "Adventure, Science",
	},
	{
		_id: "1002",
		image: "https://skynet.codexp.in/storyapp/8945410811535339308.webp",
		title: "Lily and the Magic Paintbrush",
		duration: "2",
		tags: "Creativity, Imagination",
	},
	{
		_id: "1003",
		image: "https://skynet.codexp.in/storyapp/1789434559218061412.webp",
		title: "Lily and the Robot Science Adventure",
		duration: "1",
		tags: "Adventure, Science",
	},
	{
		_id: "1004",
		image: "https://skynet.codexp.in/storyapp/8945410811535339308.webp",
		title: "Lily and the Magic Paintbrush",
		duration: "2",
		tags: "Creativity, Imagination",
	},
	{
		_id: "1005",
		image: "https://skynet.codexp.in/storyapp/1789434559218061412.webp",
		title: "Lily and the Robot Science Adventure",
		duration: "1",
		tags: "Adventure, Science",
	},
	{
		_id: "1006",
		image: "https://skynet.codexp.in/storyapp/8945410811535339308.webp",
		title: "Lily and the Magic Paintbrush",
		duration: "2",
		tags: "Creativity, Imagination",
	}
];

type TagProps = {
	tag: string;
	activeTag: string;
	onClick: (val: string) => void;
};

export default function Login() {
	const [activeTag, setActiveTag] = useState("All");
	const clickHandler = () => console.log("clicked");

	return (
		<Container>
			<View style={mainStyles.mainContent}>
				<View style={styles.content}>
					<View style={{ marginVertical: 10 }}>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>Hi There!</Text>
						<Text style={[mainStyles.largeText, mainStyles.boldText, mainStyles.buttonText]}>Create amazing tales</Text>
					</View>
					<ButtonGradient
						label="Create your own Story"
						clickHandler={clickHandler}
					/>
					<View style={{ marginVertical: 10 }}>
						<Text style={[mainStyles.mediumText, mainStyles.boldText, mainStyles.buttonText]}>My Stories</Text>
						<FlatList
							data={tags}
							renderItem={({ item }) => <Tag tag={item} activeTag={activeTag} onClick={setActiveTag} />}
							keyExtractor={item => item}
							horizontal={true}
							style={{ marginVertical: 10 }}
							showsHorizontalScrollIndicator={false}
						/>
					</View>
					<View style={{ marginVertical: 10 }}>
						<FlatList
							data={cards}
							renderItem={({ item }) => <StoryCard card={item} />}
							keyExtractor={item => item._id}
							style={{ marginVertical: 10, height: "65%" }}
							showsVerticalScrollIndicator={false}
							numColumns={2}
							columnWrapperStyle={{ justifyContent: "space-between" }}
						/>
					</View>
				</View>
			</View>
		</Container>
	);
}

function Tag(props: TagProps) {
	return (
		<TouchableOpacity
			style={[styles.tag, { backgroundColor: props.activeTag === props.tag ? "#A9A9D3" : "#464669" }]}
			onPress={() => props.onClick(props.tag)}
		>
			<Text style={[mainStyles.smallText, { color: props.tag === props.activeTag ? "#292936" : "#FFE8D9" }]}>{props.tag}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	content: {
		marginTop: "10%",
		paddingHorizontal: 10,
	},
	tag: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 20,
		marginHorizontal: 5,
	},
});
