"use client";

import { ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function TimeSlotPicker({
    date,
    selectedTime,
    onSelect,
    onContinue,
    onBack
}: {
    date: Date;
    selectedTime: string | null;
    onSelect: (time: string) => void;
    onContinue: () => void;
    onBack: () => void;
}) {
    const slots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
        "16:30", "17:00", "17:30", "18:00", "18:30"
    ];

    return (
        <section className="w-full p-4 mt-2 animate-in fade-in zoom-in-95 duration-300">
            <button onClick={onBack} className="text-legado-gray mb-4 flex items-center gap-2 hover:text-legado-white transition-colors">
                <ArrowLeft size={18} />
                <span className="font-medium">Voltar aos serviços</span>
            </button>

            <h2 className="text-2xl font-bold text-legado-white mb-6 uppercase tracking-wider border-b border-legado-card pb-2">
                3. Escolha o <span className="text-legado-gold">Horário</span>
            </h2>

            <div className="grid grid-cols-4 gap-3 mb-6">
                {slots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                        <button
                            key={time}
                            onClick={() => onSelect(time)}
                            className={`p-3 rounded-xl border-2 font-bold text-center transition-all duration-300 ${isSelected
                                ? "border-legado-gold bg-zinc-800 text-legado-gold scale-105 shadow-md shadow-legado-gold/10"
                                : "border-legado-card bg-legado-card text-legado-white hover:border-legado-gray/50 hover:bg-zinc-800"
                                }`}
                        >
                            {time}
                        </button>
                    );
                })}
            </div>

            {selectedTime && (
                <div className="mt-6 flex justify-center sticky bottom-6 z-40">
                    <button
                        onClick={onContinue}
                        className="bg-legado-gold text-legado-black font-extrabold tracking-widest text-lg w-full py-4 rounded-xl shadow-lg shadow-legado-gold/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        AVANÇAR PARA DADOS
                    </button>
                </div>
            )}
        </section>
    );
}
