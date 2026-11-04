import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ImageViewer from "./ImageViewer";
import ReferencePictures from "./ReferencePictures";

const barberValues = [
  {
    id: "1",
    name: "Detky Daniel",
    text: "BlvrdBarberShop",
    referencePictures: [
      {
        id: "0",
        url: "https://cdn.salonic.hu/2620/employees/gallery/800_bb6f63480b259d4811e35e315ee2ebb4.jpeg",
      },
      {
        id: "1",
        url: "https://cdn.salonic.hu/2620/employees/gallery/800_f5bf947728ad77c656b26e6d4df76d6c.jpeg",
      },
      {
        id: "2",
        url: "https://cdn.salonic.hu/2620/employees/gallery/800_cfe3366c17a77facdc4fec191e65b137.jpeg",
      },
      {
        id: "3",
        url: "https://cdn.salonic.hu/2620/employees/gallery/800_1febbe35ed553140df8101974c1e5169.jpeg",
      },
    ],
  },
];

type Props = {
  setName: (name: string) => void;
};

export default function Barbers({ setName }: Props) {
  const [isImageOpened, setImageOpened] = useState(false);

  const handleImageOpened = (value: boolean, id: string) => {
    setImageOpened(value);
  };

  return (
    <View className="flex gap-2 mt-3 w-full">
      <Text className="text-white font-bold text-lg">
        Szolgáltatás kiválasztása:
      </Text>
      {barberValues.map((item) => (
        <View
          key={item.id}
          className="bg-slate-700 mt-2 p-4 rounded-xl items-center w-full gap-2"
        >
          <Image
            source={{
              uri: "https://cdn.salonic.hu/2620/employees/160_34fac443bf0b2202d7e4938d6c5c48d6.png",
            }}
            className="w-20 aspect-square rounded-full"
          />
          <Text className="text-white font-bold text-md">{item.name}</Text>
          <Text className="text-slate-300 text-md">{item.text}</Text>
          <View className="bg-slate-500 h-0.5 w-full my-1" />
          <Text className="text-white text-md">Legkorábbi időpontok</Text>
          <View className="flex-row gap-1">
            <TouchableOpacity className="bg-[#ffc629e7] py-0.5 px-1.5 rounded-md items-center">
              <Text className="text-white text-sm">Holnap 11:00</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#ffc629e7] py-0.5 px-1.5 rounded-md items-center">
              <Text className="text-white text-sm">Holnap 12:00</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#a0a0a0] py-0.5 px-1.5 rounded-md items-center"
              onPress={() => setName(item.name)}
            >
              <Text className="text-white text-sm">További időpontok</Text>
            </TouchableOpacity>
          </View>
          <View className="bg-slate-500 h-0.5 w-full my-1" />
          <Text className="text-white text-md">Referencia fotók</Text>
          <ReferencePictures
            setPicture={() => handleImageOpened}
            pictures={item.referencePictures}
          ></ReferencePictures>
          {isImageOpened && (
            <ImageViewer
              secureImageUri={item.referencePictures}
              setImageOpened={setImageOpened}
            ></ImageViewer>
          )}
        </View>
      ))}
    </View>
  );
}
