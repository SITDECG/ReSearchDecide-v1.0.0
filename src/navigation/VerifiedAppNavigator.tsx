import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { HomeScreen } from '../features/home/screens/HomeScreen';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EditProfileScreen } from "../features/edit-profile/screens/EditProfileScreen";
import { useSignOut } from "../hooks/use-sign-out";
import { CreateGroupScreen } from "../features/create-group/screens/CreateGroupScreen";
import { ValuationScreen } from '../features/valuation/screens/ValuationScreen';
import { GroupScreen } from '../features/group/screens/GroupScreen';
import { AdvancedSearchScreen } from '../features/discussion/screens/AdvancedSearchScreen';
import { DecisionScreen } from '../features/decision/screens/DecisionScreen';
import { EditGroupScreen, EditGroupScreenProps } from '../features/edit-group/screens/EditGroupScreen';
import { useGroupsContext } from "../context/GroupContext";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const HeaderImageComponent = () => {
  return <Image
          source={require('../../assets/logoA.png')} 
          style={{ width: 160, height: 40 }} 
          resizeMode="contain"
        />;
};
const HomeStack = ({ navigation }: any) => (
    <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={ HomeScreen }
          options={ {
            headerTitle: HeaderImageComponent,
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
      {/* <Stack.Screen name={ 'CreateGroupScreen' } options={ { title: 'Create Group' } } component={ CreateGroupScreen }/>
      <Stack.Screen name={ 'EditGroupScreen' } options={ { title: 'Edit Group' } }
                    component={ () => <EditGroupScreen
                        route={ { params: { group: { name: '', id: '', description: '' } } } }/> }
      />
      <Stack.Screen name={ 'GroupScreen' } options={ { title: 'Discussion' } } component={ GroupScreen }/>
      <Stack.Screen name={ 'ValuationScreen' } options={ { title: 'Valuation' } } component={ ValuationScreen }/>
      <Stack.Screen name={ 'AdvancedSearchScreen' } options={ { title: 'Advanced Search' } }
                    component={ AdvancedSearchScreen }/>
      <Stack.Screen name={ 'DecisionScreen' } options={ { title: 'Decision' } } component={ DecisionScreen }/> */}

      <Stack.Screen name={ 'CreateGroupScreen' } options={ { 
        headerTitle: HeaderImageComponent,
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
            headerTitleStyle: styles.headerTitle, } }  component={ CreateGroupScreen }/>
      <Stack.Screen name={ 'EditGroupScreen' } options={ { 
        headerTitle: HeaderImageComponent,
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
            headerTitleStyle: styles.headerTitle, } } 
            component={ EditGroupScreen}/>
      <Stack.Screen name={ 'GroupScreen' } options={ { 
        headerTitle: HeaderImageComponent,
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
            headerTitleStyle: styles.headerTitle, } } 
            component={ GroupScreen}/>
      <Stack.Screen name={ 'ValuationScreen' } options={ { 
        headerTitle: HeaderImageComponent,
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
            headerTitleStyle: styles.headerTitle, } }  component={ ValuationScreen}/>
      <Stack.Screen name={ 'AdvancedSearchScreen' } options={ { 
        headerTitle: HeaderImageComponent,
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
            headerTitleStyle: styles.headerTitle, } }  component={ AdvancedSearchScreen} />
      <Stack.Screen name={ 'DecisionScreen' } options={ { 
        headerTitle: HeaderImageComponent,
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
            headerTitleStyle: styles.headerTitle, } }  component={ DecisionScreen} />
     
    </Stack.Navigator>
);

const EditProfileStack = ({ navigation }: any) => (
    <Stack.Navigator>
      <Stack.Screen
          name="EditProfileScreen"
          component={ EditProfileScreen }
          options={ {
            headerTitle: HeaderImageComponent,
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
);


export const VerifiedAppNavigator = () => {
  const [handleSignOut, { isLoading, error }] = useSignOut();

  const handleLogout = async () => {
    await handleSignOut();
  };

  return (
      <Drawer.Navigator
          screenOptions={ {
            drawerPosition: 'right',
            drawerType: 'slide',
            headerShown: false,
            drawerLabel: 'Investigation groups',
            drawerLabelStyle: {
              color: '#146C94',
            },
          } }
          drawerContent={ (props) => (
              <DrawerContentScrollView { ...props }>
                <DrawerItemList { ...props } />
                <DrawerItem
                    label="Log out"
                    onPress={ handleLogout }
                    activeBackgroundColor="#146C94"
                    labelStyle={ { color: '#146C94' } }
                />
              </DrawerContentScrollView>
          ) }
      >
        <Drawer.Screen name="HomeStack" component={ HomeStack }/>
        <Drawer.Screen name="EditProfileStack" component={ EditProfileStack }
                       options={ { drawerLabel: 'Edit profile' } }/>
      </Drawer.Navigator>
  );
};


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
