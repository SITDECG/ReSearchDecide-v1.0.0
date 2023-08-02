import { View } from "native-base";
import { ActivityIndicator } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

export const ActivityIndicatorComponent = ({ isLoading }: {isLoading: boolean}) => {
  return (
      <View style={ [styles.container, styles.horizontal] }>
        { isLoading && <ActivityIndicator size="large" color="#00ff00"/> }
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
