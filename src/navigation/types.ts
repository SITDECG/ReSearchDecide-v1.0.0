export interface MyParam {
  id: string | undefined;
  name: string | undefined;
}
  
  export type RootStackParamList = {
    Home: undefined;
    Details: { param: MyParam };
  };