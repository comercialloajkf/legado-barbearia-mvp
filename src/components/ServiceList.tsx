"use client";

import { ServiceCard } from "./ServiceCard";
import { ArrowLeft } from "lucide-react";

type Service = {
    id: string;
    name: string;
    price: number;
    durationMinutes: number;
};

export function ServiceList({
    services,
    selectedServiceId,
    onSelect,
    onContinue,
    onBack
}: {
    services: Service[];
    selectedServiceId: string | null;
    onSelect: (id: string) => void;
    onContinue: () => void;
    onBack?: () => void;
}) {
    return (
        <section className="w-full p-4 mt-2 animate-in fade-in zoom-in-95 duration-300">
            {onBack && (
                <button onClick={onBack} className="text-legado-gray mb-4 flex items-center gap-2 hover:text-legado-white transition-colors">
                    <ArrowLeft size={18} />
                    <span className="font-medium">Voltar para Data</span>
                </button>
            )}
            <h2 className="text-2xl font-bold text-legado-white mb-6 uppercase tracking-wider border-b border-legado-card pb-2">
                2. Escolha o <span className="text-legado-gold">Serviço</span>
            </h2>

            <div className="flex flex-col">
                {services.map((svc) => (
                    <ServiceCard
                        key={svc.id}
                        name={svc.name}
                        price={svc.price}
                        duration={svc.durationMinutes}
                        selected={selectedServiceId === svc.id}
                        onClick={() => onSelect(svc.id)}
                    />
                ))}
            </div>

            {selectedServiceId && (
                <div className="mt-8 flex justify-center sticky bottom-6 z-40">
                    <button
                        onClick={onContinue}
                        className="bg-legado-gold text-legado-black font-extrabold tracking-widest text-lg w-full py-4 rounded-xl shadow-lg shadow-legado-gold/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        CONTINUAR
                    </button>
                </div>
            )}
        </section>
    );
}
