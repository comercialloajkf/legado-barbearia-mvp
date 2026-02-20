"use client";

import { useState } from "react";
import { ServiceList } from "./ServiceList";
import { Calendar } from "./Calendar";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { CustomerForm } from "./CustomerForm";

type Service = {
    id: string;
    name: string;
    price: number;
    durationMinutes: number;
};

import { createAppointment } from "@/app/actions";

export function BookingFlow({ services }: { services: Service[] }) {
    const [step, setStep] = useState(1);
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const selectedService = services.find(s => s.id === selectedServiceId) || null;

    const handleConfirm = async (name: string, phone: string) => {
        setIsSubmitting(true);

        try {
            await createAppointment({
                serviceId: selectedService!.id,
                date: selectedDate!,
                time: selectedTime!,
                customerName: name,
                customerPhone: phone
            });
        } catch (e) {
            console.error("Failed to save to DB", e);
        }

        // Formatting date string for WhatsApp message
        const formattedDate = selectedDate?.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' });
        const message = `Fala, Wagner! Acabei de agendar pelo sistema o meu horário com a Legado Barber Shop:\n\n💈 *Serviço:* ${selectedService?.name}\n📅 *Data:* ${formattedDate}\n⏰ *Horário:* ${selectedTime}\n💰 *Valor:* R$ ${selectedService?.price.toFixed(2)}\n👤 *Nome:* ${name}\n📱 *WhatsApp:* ${phone}\n\nConfirme para mim, por favor!`;
        const encodedMessage = encodeURIComponent(message);

        window.location.href = `https://api.whatsapp.com/send?phone=5538998731266&text=${encodedMessage}`;
        setTimeout(() => setIsSubmitting(false), 2000); // Re-enable if user returns
    };

    return (
        <div className="w-full">
            {step === 1 && (
                <Calendar
                    selectedDate={selectedDate}
                    onSelect={setSelectedDate}
                    onContinue={() => setStep(2)}
                    onBack={() => { }} // No back from step 1
                />
            )}
            {step === 2 && (
                <ServiceList
                    services={services}
                    selectedServiceId={selectedServiceId}
                    onSelect={setSelectedServiceId}
                    onContinue={() => setStep(3)}
                    onBack={() => setStep(1)}
                />
            )}
            {step === 3 && selectedDate && selectedService && (
                <TimeSlotPicker
                    date={selectedDate}
                    selectedTime={selectedTime}
                    onSelect={setSelectedTime}
                    onContinue={() => setStep(4)}
                    onBack={() => setStep(2)}
                />
            )}
            {step === 4 && selectedService && selectedDate && selectedTime && (
                <CustomerForm
                    serviceName={selectedService.name}
                    price={selectedService.price}
                    date={selectedDate}
                    time={selectedTime}
                    onBack={() => setStep(3)}
                    onConfirm={handleConfirm}
                />
            )}
            {isSubmitting && (
                <div className="fixed inset-0 bg-legado-black/80 flex items-center justify-center z-50">
                    <div className="animate-pulse flex flex-col items-center">
                        <span className="text-legado-gold text-xl font-bold mb-2">Redirecionando para o WhatsApp...</span>
                        <div className="w-8 h-8 border-4 border-legado-gold border-t-transparent rounded-full animate-spin"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
