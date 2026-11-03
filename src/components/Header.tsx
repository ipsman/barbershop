import { Image, Text, TouchableOpacity, View } from "react-native";

export default function Header() {
  return (
    <View className="bg-slate-800 flex-row content-center justify-between gap-2 p-2 w-full">
          <Image 
          source={{uri: "https://boulevard-barbershop.salonic.hu/logo.png"}} 
          className="w-14 aspect-square rounded-lg"
          ></Image>
          <TouchableOpacity
          className="">
          <Text className="text-black font-bold text-xl">-</Text>
        </TouchableOpacity>
    </View>
  );
}