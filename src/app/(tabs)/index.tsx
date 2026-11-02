import { useSettings } from "@/context/settingsController";
import { useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ServiceItem {
  name: string;
  status: "online" | "offline";
}

export default function HomeScreen() {
  const { appColor, theme } = useSettings();
  const isDarkMode = theme?.toLowerCase() === "dark";

  const [services, setServices] = useState<ServiceItem[]>([
    { name: "Jellyfin", status: "offline" },
    { name: "Samba", status: "offline" },
    { name: "Tailscale", status: "offline" },
    { name: "Qbittorrent", status: "offline" },
    { name: "Docker", status: "offline" },
  ]);

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      className="flex-1 bg-slate-100 dark:bg-gray-900"
    >
      <View className="flex items-center my-4">
        <Image
          source={{
            uri: "https://cdn.salonic.hu/2620/cover_8d5bc673b873dc821a81b545a9807d5f.jpeg",
          }}
          className="w-[90%] aspect-square rounded-2xl"
        ></Image>
      </View>

      <View className="bg-white dark:bg-slate-800 p-4 rounded-2xl mb-4 shadow-sm border border-slate-200 dark:border-slate-700 items-center">
        <Text className="">Boulevard Barbershop</Text>
      </View>
    </SafeAreaView>
  );
}
