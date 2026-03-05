import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "@/types/types";
import { useFocusEffect } from "expo-router";

type VideoItemProps = {
  postItem: Post;
  isActive: boolean;
};

export default function PostListItem({ postItem, isActive }: VideoItemProps) {
  const height = Dimensions.get("window").height;
  const { nrOfComments, nrOfLikes, nrOfShares, description, user, video_url } =
    postItem;
  const player = useVideoPlayer(video_url, (player) => {
    player.loop = true;
  });

  useFocusEffect(
    useCallback(() => {
      if (!player) return;

      try {
        if (isActive) {
          player.play();
        }
      } catch (error) {
        console.error(error);
      }

      return () => {
        try {
          if (player && isActive) {
            player.pause();
          }
        } catch (error) {
          console.error(error);
        }
      };
    }, [isActive, player]),
  );

  return (
    <View style={{ height: height - 80 }}>
      <VideoView
        style={{ flex: 1 }}
        player={player}
        contentFit="cover"
        // nativeControls={false}
      />
      <View style={styles.interactionBar}>
        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => console.log("Like Pressed")}
        >
          <Ionicons name="heart" size={33} color="#fff" />
          <Text style={styles.interactionText}>{nrOfLikes[0].count || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => console.log("Comment Pressed")}
        >
          <Ionicons name="chatbubble" size={33} color="#fff" />
          <Text style={styles.interactionText}>
            {nrOfComments[0].count || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.interactionButton}
          onPress={() => console.log("Share Pressed")}
        >
          <Ionicons name="share-social" size={33} color="#fff" />
          <Text style={styles.interactionText}>{nrOfShares[0].count || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.avatar}
          onPress={() => console.log("Profile Pressed")}
        >
          <Text style={styles.avatarText}>
            {user?.username.charAt(0).toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.videoInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  interactionBar: {
    position: "absolute",
    right: 20,
    bottom: 20,
    alignItems: "center",
    gap: 25,
  },
  interactionButton: {
    alignItems: "center",
    gap: 5,
  },
  interactionText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  avatar: {
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  videoInfo: {
    position: "absolute", // 부모 View 기준으로 절대 위치 배치
    bottom: 20, // 아래에서 20px 위
    left: 20, // 왼쪽에서 20px
    right: 100, // 오른쪽에서 100px (우측 여백 확보 → 좋아요/댓글 버튼 공간)
    gap: 5, // 자식 요소들 사이 간격 5px
  },
  username: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  description: {
    color: "#fff",
  },
});
