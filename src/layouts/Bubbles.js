import { View } from "react-native";

const BubbleLayout = ({ children }) => {
  return (
      <View className="w-full h-screen bg-layout justify-center items-center">
        <View className="bg-circle w-52 h-52 rounded-full -left-9 -top-3 absolute" />
        <View className="bg-circle w-72 h-72 rounded-full -right-10 -bottom-10 absolute" />
        {children}
      </View>
  );
};

export default BubbleLayout;