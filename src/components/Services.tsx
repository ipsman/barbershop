import { Text, TouchableOpacity, View } from "react-native";

export interface Service {
  id: string;
  title: string;
  text: string;
  time: string;
  price: number;
}

const buttonValues = [
  {
    id: "1",
    title: "Skin Fade (Bőrből induló átmenet)",
    text: "• Átmenet vágása borotvagépről indulva + hajmosás ha szükséges + finishelés",
    time: "1 óra ",
    price: 6500,
  },
  {
    id: "2",
    title: "Hajvágás",
    text: "• Átmenetes hajvágás rövid középhosszú vagy hosszú hajból + hajmosás ha szükséges + finishelés",
    time: "30 perc",
    price: 6500,
  },
  {
    id: "3",
    title: "Szakáll vágás",
    text: "• Szakállvágás és/vagy igazítás + szakáll összedolgozása a hajjal vagy átmenetesen vágva + finishelés",
    time: "30 perc",
    price: 5500,
  },
  {
    id: "4",
    title: "Haj és szakáll vágás",
    text: "• Hajvágás és a szakállvágás kombinációja + hajmosás ha szükséges + finishelés",
    time: "1 óra",
    price: 9500,
  },
  {
    id: "5",
    title: "Egyhossz hajvágás",
    text: "• Egyhosszra történő átmenet nélküli hajvágás kontúrozással + hajmosás ha szükséges + finishelés",
    time: "30 perc",
    price: 5500,
  },
  {
    id: "6",
    title: "Egyhossz hajvágás és szakállvágás",
    text: "• Egyhossz hajvágás és a szakállvágás kombinációja + hajmosás ha szükséges + finishelés",
    time: "1 óra",
    price: 7500,
  },
  {
    id: "7",
    title: "Apa fia hajvágás",
    text: "• Apa és Fia hajvágása egy közös programként + hajmosás ha szükséges + finishelés",
    time: "1 óra",
    price: 10500,
  },
  {
    id: "8",
    title: "Apa gyerek hajvágás 13 éves korig",
    text: "• Apa és 13 év alatti gyerkőc hajvágása egy közös programként + hajmosás ha szükséges + finishelés",
    time: "1 óra",
    price: 9500,
  },
  {
    id: "9",
    title: "Gyerek hajvágás 13 éves korig",
    text: "• 13éves kor alatti gyerkőc hajvágása már pár hónapos kortól is + hajmosás ha szükséges + finishelés",
    time: "30 perc",
    price: 5500,
  },
  {
    id: "10",
    title: "Senior hajvágás 60 év felett",
    text: "• Hajvágás a 60 év feletti vendégeink számára + hajmosás ha szükséges + finishelés",
    time: "30 perc",
    price: 5500,
  },
];

type Props = {
  setSelectedService: (service: Service) => void;
};

export default function Services({ setSelectedService }: Props) {
  return (
    <View className="flex gap-2 mt-3 w-full">
      <Text className="text-white font-bold text-lg">
        Szolgáltatás kiválasztása:
      </Text>
      {buttonValues.map((item) => (
        <TouchableOpacity
          key={item.id}
          className="bg-slate-700 mt-2 p-2 rounded-xl items-start w-full gap-2"
          onPress={() => setSelectedService(item)}
        >
          <Text className="text-white font-bold text-md">{item.title}</Text>
          <Text className="text-slate-300 text-md">
            {item.time + item.text}
          </Text>
          <Text className="text-white font-bold text-md">{item.price} Ft</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
