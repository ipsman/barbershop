import Header from "@/components/Header";
import { SettingsProvider } from "@/context/settingsController";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SettingsProvider>
        <SafeAreaView className="flex-1">
          <Header></Header>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}
