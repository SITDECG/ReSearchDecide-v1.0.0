import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EditProfileScreen } from "../features/edit-profile/screens/EditProfileScreen";
import { Text } from "native-base";
import { useSignOut } from "../hooks/use-sign-out";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { GuestWelcomeScreen } from "../features/guest-welcome/screens/GuestWelcomeScreen";
import { CreateGroupScreen } from "../features/create-group/screens/CreateGroupScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeStack = ({ navigation }: any) => (
    <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={ HomeScreen }
          options={ {
            title: 'INVESTIGATION GROUPS',
            headerRight: () => (
                <TouchableOpacity
                    style={ styles.drawerButton }
                    onPress={ () => {
                      navigation.openDrawer(); // Abre el drawer al presionar el botón
                    } }
                >
                  <Ionicons name="menu-outline" size={ 24 } color="#000"/>
                </TouchableOpacity>
            ),
            headerTitleAlign: 'left',
            headerStyle: {
              backgroundColor: '#fff',
              borderBottomWidth: 2,
              shadowColor: '#484848',
              shadowOpacity: 0.1,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 2 },
            },
            headerTitleStyle: styles.headerTitle,
          } }
      />
      <Stack.Screen name={ 'CreateGroupScreen' } component={ CreateGroupScreen }/>
    </Stack.Navigator>
);

const EditProfileStack = ({ navigation }: any) => (
    <Stack.Navigator>
      <Stack.Screen
          name="EditProfile"
          component={ EditProfileScreen }
          options={ {
            title: 'EDIT PROFILE',
            headerRight: () => (
                <TouchableOpacity
                    style={ styles.drawerButton }
                    onPress={ () => {
                      navigation.openDrawer(); // Abre el drawer al presionar el botón
                    } }
                >
                  <Ionicons name="menu-outline" size={ 24 } color="#000"/>
                </TouchableOpacity>
            ),
            headerTitleAlign: 'left',
            headerStyle: {
              backgroundColor: '#fff',
              borderBottomWidth: 2,
              shadowColor: '#484848',
              shadowOpacity: 0.1,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 2 },
            },
            headerTitleStyle: styles.headerTitle,
          } }
      />
    </Stack.Navigator>
)

export const LogoutScreen = () => {
  const navigation = useNavigation();
  const [signOut] = useSignOut();

  const handleLogout = async () => {
    await signOut();
    navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'GuestWelcomeScreen' }],
        })
    );
  };

  return (
      <TouchableOpacity onPress={ handleLogout }>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
  );
};

export const VerifiedAppNavigator = () => (
    <Drawer.Navigator
        screenOptions={ {
          drawerPosition: 'right',
          drawerType: 'slide',
          headerShown: false,
          drawerLabel: 'Investigation groups',
          drawerLabelStyle: {
            color: '#146C94'
          },
        } }
    >
      <Drawer.Screen name="HomeStack" component={ HomeStack }/>
      <Drawer.Screen name="EditProfileStack" component={ EditProfileStack }
                     options={ { drawerLabel: 'Edit profile' } }/>
      <Drawer.Screen
          name="Logout"
          options={ { drawerLabel: 'Log out' } }
          component={ LogoutScreen }
      />
    </Drawer.Navigator>
);

const styles = StyleSheet.create({
  headerTitle: {
    color: '#000',
    fontSize: 15,
    fontWeight: '300',
    paddingVertical: 10,
  },
  drawerButton: {
    marginRight: 10,
    padding: 10,
  },
});
