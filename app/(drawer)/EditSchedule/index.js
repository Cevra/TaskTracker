import { Drawer } from "expo-router/drawer";
import { Text, View } from "react-native";

export default function EditSchedule() {
  return (
    <View>
      <Drawer.Screen options={{ title: "EditSchedule", headerShown: false }} />
      <Text>EditSchedule</Text>
    </View>
  );
}
