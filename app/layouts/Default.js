import { SafeAreaView } from "react-native";
import BottomNavigation from "../BottomNavigation";

const Default = ({ children }) => {
  return (
      <SafeAreaView className="w-full h-screen bg-layout justify-center items-center">
        {children}
        <BottomNavigation />
      </SafeAreaView>
  );
};

export default Default;