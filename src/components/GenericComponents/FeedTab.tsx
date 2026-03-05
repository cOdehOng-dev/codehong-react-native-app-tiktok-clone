import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// 피드 상단 탭 버튼 하나를 나타내는 컴포넌트 (예: "For You", "Following")
type FeedTabProps = {
  title: string;                        // 탭에 표시할 텍스트
  setActiveTab: (title: string) => void; // 탭 선택 시 호출되는 콜백
  activeTab: string;                    // 현재 활성화된 탭의 title
};

export default function FeedTab({
  title,
  setActiveTab,
  activeTab,
}: FeedTabProps) {
  return (
    // 탭 버튼 - 누르면 해당 탭을 활성화
    <TouchableOpacity
      style={styles.tabContainer}
      onPress={() => setActiveTab(title)}
    >
      {/* 활성 탭이면 흰색, 아니면 회색 텍스트 */}
      <Text
        style={[styles.tabText, activeTab === title && styles.activeTabText]}
      >
        {title}
      </Text>
      {/* 활성 탭 아래에만 흰색 밑줄 표시 */}
      {activeTab === title && <View style={styles.activeDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 17,
    color: "gray",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
  },
  activeDot: {
    width: 20,
    height: 2,
    backgroundColor: "#fff",
    marginTop: 4, // 텍스트와 밑줄 사이 간격
  },
});
