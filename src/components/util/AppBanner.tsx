import { Text, View } from "native-base";
import tw from "twrnc";
import React from "react";
import { Platform } from "react-native";

export const AppBanner = () => {
  const isWeb = Platform.OS === 'web';
  const textSize = isWeb ? 'text-5xl' : 'text-3xl';
  const textSizeSub = isWeb ? 'text-4xl' : 'text-2xl';
  const textCenter = isWeb ? '' : 'text-center';

  return (
      <View>
        <Text style={ tw.style(`${ textCenter } font-bold mb-3 ${ textSize }`) }>
          INVESTIGATION GROUPS
        </Text>
        <Text style={ tw.style(`${ textCenter }  ${ textSizeSub } font-medium text-gray-500 mb-10`) }>
          Meet researchers who share your interests
        </Text>
      </View>
  );
};
