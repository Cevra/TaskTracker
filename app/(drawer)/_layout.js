import { Image, Text, TouchableOpacity } from "react-native";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView } from "@react-navigation/drawer";

function CustomDrawerContent(props) {
  const navigateToScreen = (screenName) => {
    props.navigation.navigate(screenName);
    props.navigation.closeDrawer();
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
      }}
      style={{ backgroundColor: "#B0D9F7" }}
    >
      <Image
        className="w-24 h-24 rounded-full mt-0 mb-16 justify-start"
        source={require("../../assets/worker_logo.jpg")}
      />

      <TouchableOpacity
        onPress={() => navigateToScreen("ScheduleAMember")}
        style={styles.button}
      >
        <Text className="text-white text-xl">Schedule a Member</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigateToScreen("EditSchedule")}
        style={styles.button}
      >
        <Text className="text-white text-xl">Edit a Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigateToScreen("AddNewMember")}
        style={styles.button}
      >
        <Text className="text-white text-xl">Add New Member</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigateToScreen("AddaJobLocation")}
        style={styles.button}
      >
        <Text className="text-white text-xl ">Add a Job Location</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = {
  button: {
    backgroundColor: "#758AB6",
    borderRadius: 30,
    marginVertical: 5,
    marginBottom: 30,
    marginTop: 8,
    height: 86,
    width: 231,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default function Layout() {
  return (
    <Drawer
      screenOptions={{
        headerStatusBarHeight: 0,
        drawerStyle: {
          backgroundColor: "#B0D9F7",
          flexDirection: "column",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    ></Drawer>
  );
}
