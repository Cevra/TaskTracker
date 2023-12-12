import { Drawer } from "expo-router/drawer";
import { Text, View } from "react-native";

export default function AddNewMember() {
  return (
    <View>
      <Drawer.Screen options={{ title: "AddNewMember", headerShown: false }} />
      <Text>AddNewMembeer</Text>
    </View>
  );
}
