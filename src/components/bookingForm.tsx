import { Booking } from "@/app/(tabs)/Booking";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

type Props = {
  bookingData?: Booking;
  onFinalSubmit?: (finalData: any) => void;
};

const magyarHonapok = [
  "január",
  "február",
  "március",
  "április",
  "május",
  "június",
  "július",
  "augusztus",
  "szeptember",
  "október",
  "november",
  "december",
];

const magyarNapok = [
  "vasárnap",
  "hétfő",
  "kedd",
  "szerda",
  "csütörtök",
  "péntek",
  "szombat",
];

// Biztonságos segédfüggvény a szép magyar dátumhoz
const formatAppointmentDate = (date: Date) => {
  if (!date || isNaN(date.getTime())) {
    return { dateString: "Nincs kiválasztva", timeString: "" };
  }

  const monthName = magyarHonapok[date.getMonth()] || magyarHonapok[0];
  const capitalizedMonth =
    monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const day = date.getDate();
  const weekday = magyarNapok[date.getDay()] || "";

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return {
    dateString: `${capitalizedMonth} ${day}. (${weekday})`,
    timeString: `${hours}:${minutes}`,
  };
};

export default function BookingForm({ bookingData, onFinalSubmit }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  // JAVÍTVA: Az appointmentDate-ből vesszük a pontos dátumot!
  const appointmentDateObj = bookingData?.appointmentDate
    ? new Date(bookingData.appointmentDate)
    : new Date();
  const { dateString, timeString } = formatAppointmentDate(appointmentDateObj);

  const handleSubmit = () => {
    if (!phoneNumber || !lastName || !firstName || !email) {
      alert("Kérlek töltsd ki az összes kötelező mezőt!");
      return;
    }

    const finalReservation = {
      ...bookingData,
      customer: {
        firstName,
        lastName,
        phoneNumber,
        email,
        comment,
      },
    };

    console.log("Végleges foglalási adatok:", finalReservation);
    alert(
      `Sikeres foglalás!\nNév: ${lastName} ${firstName}\nIdőpont: ${dateString} ${timeString}`,
    );

    if (onFinalSubmit) {
      onFinalSubmit(finalReservation);
    }
  };

  return (
    <View className="bg-slate-800 p-4 rounded-2xl w-full mt-3 gap-4 border border-slate-700">
      {/* --- KIVÁLASZTOTT ADATOK ÖSSZEGZÉSE --- */}
      <View className="items-center gap-1">
        <Image
          source={{
            uri: "https://cdn.salonic.hu/2620/employees/160_34fac443bf0b2202d7e4938d6c5c48d6.png",
          }}
          className="w-20 aspect-square rounded-full mb-1"
        />
        <Text className="text-white font-bold text-lg">
          {bookingData?.barberName}
        </Text>
        <Text className="text-[#ffc629] font-semibold text-md">
          {bookingData?.service?.title}
        </Text>
        <Text className="text-slate-300 text-sm">
          {dateString} • {timeString}
        </Text>
      </View>

      <View className="bg-slate-700 h-0.5 w-full my-1" />

      {/* --- VENDÉG ADATAI FORM --- */}
      <View>
        <Text className="text-white font-bold text-base mb-1">
          Mobiltelefonszám
        </Text>
        <TextInput
          className="border border-slate-700 p-3 rounded-xl mb-3 text-sm bg-slate-900 text-white"
          placeholder="+36 30 123 4567"
          placeholderTextColor="#64748b"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />

        <Text className="text-white font-bold text-base mb-1">Vezetéknév</Text>
        <TextInput
          className="border border-slate-700 p-3 rounded-xl mb-3 text-sm bg-slate-900 text-white"
          placeholder="Pl. Kovács"
          placeholderTextColor="#64748b"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />

        <Text className="text-white font-bold text-base mb-1">Keresztnév</Text>
        <TextInput
          className="border border-slate-700 p-3 rounded-xl mb-3 text-sm bg-slate-900 text-white"
          placeholder="Pl. Péter"
          placeholderTextColor="#64748b"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />

        <Text className="text-white font-bold text-base mb-1">E-mail cím</Text>
        <TextInput
          className="border border-slate-700 p-3 rounded-xl mb-3 text-sm bg-slate-900 text-white"
          placeholder="pelda@email.hu"
          placeholderTextColor="#64748b"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text className="text-white font-bold text-base mb-1">
          Megjegyzés a foglaláshoz (opcionális)
        </Text>
        <TextInput
          className="border border-slate-700 p-3 rounded-xl mb-3 text-sm bg-slate-900 text-white"
          placeholder="Megjegyzés"
          placeholderTextColor="#64748b"
          value={comment}
          onChangeText={setComment}
          autoCapitalize="sentences"
        />

        {/* --- VÉGLEGESÍTŐ GOMB --- */}
        <TouchableOpacity
          className="bg-[#ffc629] p-4 rounded-xl items-center mt-3 shadow-lg"
          onPress={handleSubmit}
        >
          <Text className="text-slate-900 font-bold text-base">
            Foglalás véglegesítése
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
