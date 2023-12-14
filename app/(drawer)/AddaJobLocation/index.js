import { Drawer } from "expo-router/drawer";
import { Text, View } from "react-native";

export default function AddaJobLocation() {
  return (
    <View>
      <Drawer.Screen
        options={{ title: "AddaJobLocation", headerShown: false }}
      />
      <Text>AddaJobLocation</Text>
    </View>
  );
}
