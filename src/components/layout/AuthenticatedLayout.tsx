import { View } from "native-base";
import tw from "twrnc";
import React, { FC } from "react";
import { SafeAreaView } from "react-native";

type AuthenticatedLayout = {
  children: React.ReactNode
}

export const AuthenticatedLayout: FC<AuthenticatedLayout> = ({children}) => {
  return (
      <SafeAreaView
          style={ tw.style('p-4 items-center') }
      >
        { children }
      </SafeAreaView>
  )
}