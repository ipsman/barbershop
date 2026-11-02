import { Text, TouchableOpacity, View } from "react-native";

const buttonValues = [
  {id: '1', title: "Foglalás"},
  {id: '2', title: "Kapcsolat"},
  {id: '3', title: "Térkép"}
]

export default function Buttons() {
  return (
    <View className="flex gap-2 mt-3 w-full">
          {buttonValues.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-[#ffc629e7] p-2 rounded-xl items-center w-full"
            >
              <Text className="text-white font-bold text-lg">
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
          
    </View>
  );
}