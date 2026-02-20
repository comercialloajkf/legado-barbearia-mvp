"use client";

import { format, addDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";

export function Calendar({
    selectedDate,
    onSelect,
    onContinue,
    onBack
}: {
    selectedDate: Date | null;
    onSelect: (date: Date) => void;
    onContinue: () => void;
    onBack: () => void;
}) {
    const today = new Date();
    const nextDays = Array.from({ length: 15 }).map((_, i) => addDays(today, i));

    return (
        <section className="w-full p-4 mt-2 animate-in fade-in zoom-in-95 duration-300">

            <h2 className="text-2xl font-bold text-legado-white mb-6 uppercase tracking-wider border-b border-legado-card pb-2">
                1. Escolha a <span className="text-legado-gold">Data</span>
            </h2>

            <div className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar">
                {nextDays.map((date) => {
                    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false;
                    // Ignore sundays and mondays (common barber shop off days)
                    if (date.getDay() === 0 || date.getDay() === 1) return null;

                    return (
                        <button
                            key={date.toISOString()}
                            onClick={() => onSelect(date)}
                            className={`snap-center flex-shrink-0 w-24 flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300 ${isSelected
                                ? "border-legado-gold bg-zinc-800 scale-105 shadow-md shadow-legado-gold/10"
                                : "border-legado-card bg-legado-card hover:border-legado-gray/50 hover:bg-zinc-800"
                                }`}
                        >
                            <span className="text-sm uppercase font-bold text-legado-gray mb-1">
                                {format(date, "EEE", { locale: ptBR })}
                            </span>
                            <span className={`text-3xl font-black ${isSelected ? "text-legado-gold" : "text-legado-white"}`}>
                                {format(date, "dd")}
                            </span>
                            <span className="text-sm font-medium text-legado-gray mt-1">
                                {format(date, "MMM", { locale: ptBR })}
                            </span>
                        </button>
                    );
                })}
            </div>

            {selectedDate && (
                <div className="mt-6 flex justify-center sticky bottom-6 z-40">
                    <button
                        onClick={onContinue}
                        className="bg-legado-gold text-legado-black font-extrabold tracking-widest text-lg w-full py-4 rounded-xl shadow-lg shadow-legado-gold/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        AVANÇAR
                    </button>
                </div>
            )}
        </section>
    );
}
