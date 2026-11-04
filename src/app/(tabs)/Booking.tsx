import Barbers from "@/components/Barbers";
import Services, { Service } from "@/components/Services";
import TimeTable from "@/components/timeTable";
import { useSettings } from "@/context/settingsController";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BookingScreen() {
  const { theme, setTheme } = useSettings();
  const [bookingState, setBookingState] = useState("service");
  const [selectedService, setSelectedService] = useState<Service>();
  const [selectedBarber, setSelectedBarber] = useState("");

  const handleSelectedService = (service: Service) => {
    setSelectedService(service);
    setBookingState("barber");
  };

  const handleSelectedBarber = (barberName: string) => {
    setSelectedBarber(barberName);
    setBookingState("timetable");
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-100 dark:bg-slate-900">
      <ScrollView
        className="flex-1 px-5 pt-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {(bookingState == "service" && (
          <Services setSelectedService={handleSelectedService}></Services>
        )) ||
          (bookingState == "barber" && (
            <Barbers setName={handleSelectedBarber}></Barbers>
          )) ||
          (bookingState == "timetable" && (
            <TimeTable
              barberName={selectedBarber}
              serviceName={
                selectedService?.title || "" + selectedService?.time || ""
              }
            ></TimeTable>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
