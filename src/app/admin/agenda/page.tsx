import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function AgendaPage() {
    const appointments = await prisma.appointment.findMany({
        include: { customer: true, service: true },
        orderBy: { date: 'asc' }
    });

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-legado-white">Agenda Completa</h1>
                <p className="text-legado-gray mt-1">Histórico completo de todos os agendamentos cadastrados.</p>
            </header>

            <div className="bg-legado-card border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-zinc-900 border-b border-zinc-800">
                            <tr>
                                <th className="p-4 text-sm font-medium text-legado-gray">Data</th>
                                <th className="p-4 text-sm font-medium text-legado-gray">Hora</th>
                                <th className="p-4 text-sm font-medium text-legado-gray">Cliente</th>
                                <th className="p-4 text-sm font-medium text-legado-gray">Serviço</th>
                                <th className="p-4 text-sm font-medium text-legado-gray">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {appointments.map((apt) => (
                                <tr key={apt.id} className="hover:bg-zinc-800/50 transition-colors">
                                    <td className="p-4 text-legado-white font-medium">
                                        {format(new Date(apt.date), "dd/MM/yyyy")}
                                    </td>
                                    <td className="p-4 text-legado-gold font-bold">
                                        {format(new Date(apt.date), "HH:mm")}
                                    </td>
                                    <td className="p-4">
                                        <div className="text-legado-white">{apt.customer.name}</div>
                                        <div className="text-legado-gray text-xs">{apt.customer.phone}</div>
                                    </td>
                                    <td className="p-4 text-legado-gray">{apt.service.name}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${apt.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500' :
                                                apt.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                                                    'bg-yellow-500/10 text-yellow-500'
                                            }`}>
                                            {apt.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
