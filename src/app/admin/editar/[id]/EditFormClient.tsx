"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { updateAppointmentDetails } from "./actions";

function EditFormClient({ appointment, services }: any) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // States directly using original date values to keep it simple since we just want to update day/time string
    const [dateString, setDateString] = useState(format(new Date(appointment.date), "yyyy-MM-dd"));
    const [time, setTime] = useState(appointment.time);
    const [serviceId, setServiceId] = useState(appointment.serviceId);
    const [status, setStatus] = useState(appointment.status);

    const timeSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "13:30", "14:00", "14:30", "15:00", "15:30", "16:00",
        "16:30", "17:00", "17:30", "18:00", "18:30"
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Ensure string combines with time if needed, but in our DB they are separated: date is DateTime, time is String.
        // We will just recreate a new Date object from the input.
        const [year, month, day] = dateString.split('-');
        const targetDate = new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0); // Noon to avoid timezone shifts

        const res = await updateAppointmentDetails(appointment.id, {
            date: targetDate,
            time,
            serviceId,
            status
        });

        if (res.success) {
            router.push("/admin");
            router.refresh();
        } else {
            alert("Erro ao salvar! Tente novamente.");
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
                <label className="block text-legado-gray mb-2 text-sm font-bold">Cliente</label>
                <input
                    type="text"
                    value={appointment.customer.name}
                    disabled
                    className="w-full bg-legado-black/50 border border-zinc-800 rounded-xl py-3 px-4 text-legado-gray cursor-not-allowed"
                />
            </div>

            <div>
                <label className="block text-legado-gray mb-2 text-sm font-bold">Serviço</label>
                <select
                    value={serviceId}
                    onChange={(e) => setServiceId(e.target.value)}
                    className="w-full bg-legado-card border border-zinc-700 focus:border-legado-gold rounded-xl py-3 px-4 text-legado-white"
                >
                    {services.map((s: any) => (
                        <option key={s.id} value={s.id}>{s.name} - R$ {s.price.toFixed(2)}</option>
                    ))}
                </select>
            </div>

            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-legado-gray mb-2 text-sm font-bold">Data</label>
                    <input
                        type="date"
                        value={dateString}
                        onChange={(e) => setDateString(e.target.value)}
                        className="w-full bg-legado-card border border-zinc-700 focus:border-legado-gold rounded-xl py-3 px-4 text-legado-white"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-legado-gray mb-2 text-sm font-bold">Horário</label>
                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-legado-card border border-zinc-700 focus:border-legado-gold rounded-xl py-3 px-4 text-legado-white"
                    >
                        {timeSlots.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-legado-gray mb-2 text-sm font-bold">Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-legado-card border border-zinc-700 focus:border-legado-gold rounded-xl py-3 px-4 text-legado-white"
                >
                    <option value="PENDING">Pendente</option>
                    <option value="CONFIRMED">Confirmado</option>
                    <option value="CANCELLED">Cancelado</option>
                </select>
            </div>

            <div className="flex gap-4 mt-6">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex-1 py-3 bg-zinc-800 text-legado-white rounded-xl font-bold hover:bg-zinc-700 transition"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-legado-gold text-legado-black rounded-xl font-bold hover:bg-yellow-400 transition"
                >
                    {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </button>
            </div>
        </form>
    );
}

export { EditFormClient };
