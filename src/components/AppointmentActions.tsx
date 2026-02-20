"use client";

import { updateAppointmentStatus, deleteAppointment } from "@/app/admin/actions";
import { CheckCircle2, XCircle, Trash2, Edit } from "lucide-react";
import Link from "next/link";

export function AppointmentActions({
    id,
    status
}: {
    id: string,
    status: string
}) {
    const handleStatus = async (newStatus: string) => {
        await updateAppointmentStatus(id, newStatus);
    };

    const handleDelete = async () => {
        if (confirm("Tem certeza que deseja apagar esse registro?")) {
            await deleteAppointment(id);
        }
    };

    return (
        <div className="flex gap-2 justify-end">
            <Link
                href={`/admin/editar/${id}`}
                className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-colors flex items-center justify-center"
                title="Editar"
            >
                <Edit size={18} />
            </Link>

            {status !== 'CONFIRMED' && (
                <button
                    onClick={() => handleStatus('CONFIRMED')}
                    className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-colors"
                    title="Confirmar"
                >
                    <CheckCircle2 size={18} />
                </button>
            )}

            {status !== 'CANCELLED' && (
                <button
                    onClick={() => handleStatus('CANCELLED')}
                    className="p-2 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white rounded-lg transition-colors"
                    title="Cancelar (Manter no histórico)"
                >
                    <XCircle size={18} />
                </button>
            )}

            <button
                onClick={handleDelete}
                className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                title="Excluir Definitivamente"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}
