import Barbers from "@/components/Barbers";
import { useSettings } from "@/context/settingsController";
import {
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingScreen() {
  const { theme, setTheme } = useSettings();
  const isDarkMode = theme?.toLowerCase() === "dark";

  return (
    <SafeAreaView className="flex-1 bg-slate-100 dark:bg-slate-900">
      <ScrollView
        className="flex-1 px-5 pt-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* <Services></Services> */}
        <Barbers></Barbers>
      </ScrollView>
    </SafeAreaView>
  );
}
