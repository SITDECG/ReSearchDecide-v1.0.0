import { View } from "native-base";
import tw from "twrnc";
import { FC } from "react";
import { SafeAreaView } from "react-native";

type GuestLayoutProps = {
  children: React.ReactNode
}

export const GuestLayout: FC<GuestLayoutProps> = ({ children }) => {
  return (
      <SafeAreaView
          style={ tw.style('py-7 px-12') }
      >
        { children }
      </SafeAreaView>
  )
}