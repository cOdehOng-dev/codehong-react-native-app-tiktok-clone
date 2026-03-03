import { View, Text, FlatList } from "react-native";
import React from "react";
import PostListItem from "@/components/PostListItem";
import post from "@assets/data/posts.json";

export default function HomeScreen() {
  return (
    <View>
      <FlatList
        data={post}
        renderItem={({item}) => (
          <PostListItem postItem={item}/>
        )}/>
    </View>
  );
}
