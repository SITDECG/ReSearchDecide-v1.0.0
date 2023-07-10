import { RouteProp, NavigationProp } from '@react-navigation/native';

export type RootStackParamList = {
  GuestWelcome: undefined;
  Home: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

type RootStackNavigationProp = NavigationProp<RootStackParamList>;

type RouteProps<T extends keyof RootStackParamList> = {
  navigation: RootStackNavigationProp;
  route: RouteProp<RootStackParamList, T>;
};

export { RootStackNavigationProp, RouteProps };
