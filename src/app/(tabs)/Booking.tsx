import Barbers from "@/components/Barbers";
import BookingForm from "@/components/bookingForm";
import Services, { Service } from "@/components/Services";
import TimeTable from "@/components/timeTable";
import { useState } from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Javítva: Mostantól tartalmazza a teljes Service objektumot és a dátumot is!
export interface Booking {
  barberName: string;
  service: Service;
  appointmentDate: Date;
}

export default function BookingScreen() {
  const [bookingState, setBookingState] = useState("service");
  const [selectedService, setSelectedService] = useState<Service>();
  const [selectedBarber, setSelectedBarber] = useState("");
  const [bookingData, setBookingData] = useState<Booking>();

  const handleSelectedService = (service: Service) => {
    setSelectedService(service);
    setBookingState("barber");
  };

  const handleSelectedBarber = (barberName: string) => {
    setSelectedBarber(barberName);
    setBookingState("timetable");
  };

  const handleAddBookingDate = (bookingData: Booking) => {
    setBookingData(bookingData);
    setBookingState("bookingForm");
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
              service={selectedService!} // Átadjuk a teljes Service objektumot!
              addAppointment={handleAddBookingDate}
            ></TimeTable>
          )) ||
          (bookingState == "bookingForm" && (
            <BookingForm bookingData={bookingData}></BookingForm>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
}
