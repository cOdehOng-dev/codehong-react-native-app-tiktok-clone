import { View, Text } from "react-native";
import React from "react";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

export default function RootLayout() {
  const myTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: "white",
    },
  };
  return (
    // <Stack /> 이 app/ 폴더 하위의 모든 경로를 자동 스캔하여 라우트를 생성하기 때문에, Stack 컴포넌트는 app/ 폴더 하위의 모든 파일을 라우트로 인식
    // (tabs)/ 폴더를 발견하면, 그 안의 _layout.tsx (= TabsLayout)를 자동으로 Stack의 한 화면으로 등록
    //  (tabs)/index.tsx에 접근하면 TabsLayout이 먼저 렌더링되고 그 안에서 Tabs가 실행됨
    <ThemeProvider value={myTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}
