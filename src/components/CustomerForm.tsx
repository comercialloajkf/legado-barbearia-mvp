"use client";

import { useState } from "react";
import { ArrowLeft, MapPin, Copy, Check } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function CustomerForm({
    serviceName,
    price,
    date,
    time,
    onBack,
    onConfirm
}: {
    serviceName: string;
    price: number;
    date: Date;
    time: string;
    onBack: () => void;
    onConfirm: (name: string, phone: string) => void;
}) {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [copiedAddress, setCopiedAddress] = useState(false);

    // Altere este endereço para o endereço real da Barbearia
    const shopAddress = "Rua Principal, 123 - Centro, Montes Claros - MG";

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim() && phone.trim().length >= 14) {
            onConfirm(name, phone);
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/\D/g, "");
        if (val.length > 11) val = val.slice(0, 11);
        if (val.length > 2) val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
        if (val.length > 10) val = `${val.slice(0, 10)}-${val.slice(10)}`;
        setPhone(val);
    };

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(shopAddress);
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
    };

    // 11 digits minimum for valid cell phone number
    const isValid = name.trim().length > 2 && phone.replace(/\D/g, "").length === 11;

    return (
        <section className="w-full p-4 mt-2 animate-in fade-in zoom-in-95 duration-300">
            <button onClick={onBack} className="text-legado-gray mb-4 flex items-center gap-2 hover:text-legado-white transition-colors">
                <ArrowLeft size={18} />
                <span className="font-medium">Voltar para horários</span>
            </button>

            <h2 className="text-2xl font-bold text-legado-white mb-6 uppercase tracking-wider border-b border-legado-card pb-2">
                4. Seus <span className="text-legado-gold">Dados</span>
            </h2>

            <div className="bg-zinc-800/50 border border-legado-card rounded-2xl p-5 mb-8">
                <h3 className="text-legado-gold font-bold mb-2">Resumo do Agendamento</h3>
                <p className="text-legado-white font-medium">{serviceName}</p>
                <p className="text-legado-gray text-sm mt-1">{format(date, "EEEE, dd 'de' MMMM", { locale: ptBR })} às {time}</p>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-legado-card/50">
                    <span className="text-legado-gray text-sm">Total a pagar no salão:</span>
                    <span className="text-legado-white font-bold text-xl tracking-wider">R$ {price.toFixed(2)}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                    <label className="block text-legado-gray text-sm font-medium mb-2">Qual seu nome?</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-legado-card border-2 border-transparent focus:border-legado-gold rounded-xl p-4 text-legado-white outline-none transition-colors"
                        placeholder="Ex: João Silva"
                        required
                        minLength={3}
                    />
                </div>
                <div>
                    <label className="block text-legado-gray text-sm font-medium mb-2">Seu WhatsApp</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        className="w-full bg-legado-card border-2 border-transparent focus:border-legado-gold rounded-xl p-4 text-legado-white outline-none transition-colors"
                        placeholder="(38) 99999-9999"
                        required
                    />
                </div>

                <div className="mt-2 pt-6 border-t border-legado-card">
                    <p className="text-legado-gray text-sm font-medium mb-3 flex items-center gap-2">
                        <MapPin size={16} className="text-legado-gold" />
                        Local de Atendimento
                    </p>
                    <div className="flex items-center justify-between bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                        <span className="text-legado-white text-sm">{shopAddress}</span>
                        <button
                            type="button"
                            onClick={handleCopyAddress}
                            className="p-2 text-legado-gray hover:text-legado-gold hover:bg-legado-card rounded-lg transition-colors flex gap-2 items-center"
                            title="Copiar Endereço"
                        >
                            {copiedAddress ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                        </button>
                    </div>
                </div>

                <div className="mt-4 flex justify-center sticky bottom-6 z-40">
                    <button
                        type="submit"
                        disabled={!isValid}
                        className={`font-extrabold tracking-widest text-lg w-full py-4 rounded-xl shadow-lg transition-all ${isValid ? "bg-legado-gold text-legado-black shadow-legado-gold/20 hover:scale-[1.02] active:scale-95" : "bg-zinc-800 text-legado-gray cursor-not-allowed border border-legado-card"
                            }`}
                    >
                        CONFIRMAR
                    </button>
                </div>
            </form>
        </section>
    );
}
