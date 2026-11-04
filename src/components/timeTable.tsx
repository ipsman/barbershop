import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

// Mockolt adatok: napokhoz tartozó szabad idősávok "YYYY-MM-DD" formátumban
const availableSlotsData: { [date: string]: string[] } = {
  "2026-11-04": ["09:00", "09:30", "10:30", "12:00", "14:00", "16:30"],
  "2026-11-05": ["10:00", "11:00", "11:30", "13:00", "15:00", "17:00"],
  "2026-11-06": ["09:00", "10:00", "11:00", "12:30", "14:00", "15:30", "18:00"],
  "2026-11-10": ["10:00", "12:00", "14:00", "16:00"],
  "2026-11-12": ["09:00", "11:00", "13:00", "15:00"],
  "2026-11-15": ["10:30", "11:30", "14:30"],
};

const magyarHonapok = [
  "Január",
  "Február",
  "Március",
  "Április",
  "Május",
  "Június",
  "Július",
  "Augusztus",
  "Szeptember",
  "Október",
  "November",
  "December",
];

const hetNapjai = ["H", "K", "Sze", "Cs", "P", "Szo", "V"];

type Props = {
  barberName: string;
  serviceName: string;
};

export default function TimeTable({ barberName, serviceName }: Props) {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const formattedToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [selectedDate, setSelectedDate] = useState(formattedToday);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const startingDayIndex = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < startingDayIndex; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= totalDaysInMonth; day++) {
    const monthStr = String(currentMonth + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    calendarDays.push(`${currentYear}-${monthStr}-${dayStr}`);
  }

  const currentSlots = availableSlotsData[selectedDate] || [];

  return (
    <View className="bg-slate-800 p-4 rounded-2xl w-full mt-3 gap-4 border border-slate-700">
      <View className="flex items-center">
        <Image
          source={{
            uri: "https://cdn.salonic.hu/2620/employees/160_34fac443bf0b2202d7e4938d6c5c48d6.png",
          }}
          className="w-20 aspect-square rounded-full"
        />
        <Text className="text-white font-bold text-md">{barberName}</Text>
        <Text className="text-slate-300 text-md">{serviceName}</Text>
      </View>

      <View className="bg-slate-500 h-0.5 w-full my-1" />
      <View>
        <Text className="text-white font-bold text-lg mb-1">
          Időpont kiválasztása
        </Text>
        <Text className="text-slate-400 text-xs">
          Kattints egy napra a naptárban, majd válassz idősávot:
        </Text>
      </View>

      {/* Fő konténer: Havi naptár + Idősávok panel */}
      <View className="gap-4">
        {/* --- 1. HAVI NAPTÁR NÉZET --- */}
        <View className="bg-slate-900 p-3 rounded-xl border border-slate-700">
          {/* Hónap váltó fejléc */}
          <View className="flex-row justify-between items-center mb-3">
            <TouchableOpacity
              onPress={handlePrevMonth}
              className="p-2 bg-slate-800 rounded-lg"
            >
              <Text className="text-white font-bold">{"<"}</Text>
            </TouchableOpacity>

            <Text className="text-white font-bold text-base">
              {currentYear}. {magyarHonapok[currentMonth]}
            </Text>

            <TouchableOpacity
              onPress={handleNextMonth}
              className="p-2 bg-slate-800 rounded-lg"
            >
              <Text className="text-white font-bold">{">"}</Text>
            </TouchableOpacity>
          </View>

          {/* Hét napjai fejléc */}
          <View className="flex-row justify-between mb-2">
            {hetNapjai.map((dayName, idx) => (
              <Text
                key={idx}
                className="text-slate-400 font-bold text-xs w-[12%] text-center"
              >
                {dayName}
              </Text>
            ))}
          </View>

          {/* Napok rácsa (Grid) */}
          <View className="flex-row flex-wrap">
            {calendarDays.map((dateStr, index) => {
              if (!dateStr) {
                return (
                  <View key={`empty-${index}`} className="w-[14.28%] p-1" />
                );
              }

              const dayNumber = parseInt(dateStr.split("-")[2], 10);
              const isSelected = selectedDate === dateStr;
              const hasSlots = availableSlotsData[dateStr] !== undefined;

              return (
                <TouchableOpacity
                  key={dateStr}
                  onPress={() => {
                    setSelectedDate(dateStr);
                    setSelectedTime(null);
                  }}
                  className={`w-[14.28%] aspect-square items-center justify-center p-1 rounded-lg mb-1 ${
                    isSelected
                      ? "bg-[#ffc629]"
                      : hasSlots
                        ? "bg-slate-800 border border-slate-600"
                        : "bg-slate-900 opacity-40"
                  }`}
                >
                  <Text
                    className={`font-bold text-sm ${isSelected ? "text-slate-900" : hasSlots ? "text-white" : "text-slate-500"}`}
                  >
                    {dayNumber}
                  </Text>
                  {/* Kis pötty jelzi, ha van szabad hely */}
                  {hasSlots && !isSelected && (
                    <View className="w-1 h-1 bg-[#ffc629] rounded-full mt-0.5" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* --- 2. KIVÁLASZTOTT NAPI IDŐSÁVOK PANEL --- */}
        <View className="bg-slate-900 p-3 rounded-xl border border-slate-700">
          <Text className="text-slate-300 font-semibold text-sm mb-2">
            Szabad idősávok ekkor:{" "}
            <Text className="text-[#ffc629] font-bold">{selectedDate}</Text>
          </Text>

          {currentSlots.length === 0 ? (
            <View className="py-4 items-center">
              <Text className="text-slate-500 text-sm">
                Ezen a napon nincsenek szabad időpontok.
              </Text>
            </View>
          ) : (
            <View className="flex-row flex-wrap gap-2">
              {currentSlots.map((time) => {
                const isTimeSelected = selectedTime === time;

                return (
                  <TouchableOpacity
                    key={time}
                    onPress={() => setSelectedTime(time)}
                    className={`py-2 px-4 rounded-lg border ${
                      isTimeSelected
                        ? "bg-green-600 border-green-500"
                        : "bg-slate-800 border-slate-700"
                    }`}
                  >
                    <Text
                      className={`font-bold text-sm ${isTimeSelected ? "text-white" : "text-slate-200"}`}
                    >
                      {time} {isTimeSelected ? "✓" : ""}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </View>

      {/* --- 3. VÉGLEGESÍTŐ GOMB --- */}
      {selectedTime && (
        <TouchableOpacity
          className="bg-[#ffc629] p-3 rounded-xl items-center mt-1 shadow-lg"
          onPress={() =>
            alert(`Sikeres foglalás: ${selectedDate} - ${selectedTime}`)
          }
        >
          <Text className="text-slate-900 font-bold text-base">
            Foglalás megerősítése ({selectedDate} - {selectedTime})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
