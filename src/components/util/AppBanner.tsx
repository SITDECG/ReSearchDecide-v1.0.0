import { Text, View } from "native-base";
import tw from "twrnc";
import React from "react";

export const AppBanner = () => {
  return (
      <View>
        <Text style={ tw.style('text-center text-3xl font-bold mb-3') }>
          INVESTIGATION GROUPS
        </Text>
        <Text style={ tw.style('text-center text-2xl font-medium text-gray-500 mb-10') }>
          Meet researchers who share your interests
        </Text>
      </View>
  );
}