import { Image, TouchableOpacity, View } from "react-native";

export type PictureItem = {
    id: string;
    url: string;
}

type Props = {
    setPicture: (value: boolean) => void;
    pictures: PictureItem[];
};

export default function ReferencePictures({setPicture, pictures} : Props) {
  return (
    <View className="flex-row gap-3">
        {pictures.map((item) => (
            <TouchableOpacity
                className="items-center"
                key={item.id}
                onPress={() => setPicture(true)}
                >
                <Image 
                    source={{uri: item.url}} 
                    className="w-14 aspect-square rounded-lg"
                />
            </TouchableOpacity>
        ))}
    </View>
  );
}