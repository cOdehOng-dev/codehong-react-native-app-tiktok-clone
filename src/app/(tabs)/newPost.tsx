import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function NewPostScreen() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [isRecording, setIsRecording] = useState(false);

  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (permission && !permission.granted && !permission.canAskAgain) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to use the camera
        </Text>
        <Button
          title="Grant Permission"
          onPress={() => Linking.openSettings()}
        />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const selectFromGallery = () => {};

  const startRecording = async () => {
    setIsRecording(true);
    const recordVideo = await cameraRef.current?.recordAsync();
    if (recordVideo?.uri) {
      console.log(recordVideo.uri)
    } 
  };

  const stopRecording = () => {
    setIsRecording(false);
    cameraRef.current?.stopRecording();
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing={facing} />
      <View style={styles.topBar}>
        <Ionicons
          name="close"
          size={40}
          color="white"
          onPress={() => router.back()}
        />
      </View>

      <View style={styles.bottomControls}>
        <Ionicons
          name="images"
          size={40}
          color="white"
          onPress={selectFromGallery}
        />
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recordingButton]}
          onPress={isRecording ? stopRecording : startRecording}
        />
        <Ionicons
          name="camera-reverse"
          size={40}
          color="white"
          onPress={toggleCameraFacing}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  permissionText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
  },
  recordButton: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 40,
  },
  recordingButton: {
    backgroundColor: "#f44336",
  },
  topBar: {
    position: "absolute",
    top: 55,
    left: 15,
  },
  bottomControls: {
    position: "absolute",
    bottom: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
});
