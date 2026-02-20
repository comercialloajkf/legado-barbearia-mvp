import { PrismaClient } from "@prisma/client";
import { format, startOfDay, endOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AppointmentActions } from "@/components/AppointmentActions";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const prisma = new PrismaClient();

export default async function AdminDashboard() {
    const today = new Date();

    // Get all appointments (for now, MVP simple fetch)
    const appointments = await prisma.appointment.findMany({
        include: {
            customer: true,
            service: true,
        },
        orderBy: {
            date: 'asc'
        }
    });

    // Basic metrics for today
    const todaysAppointments = appointments.filter(apt => {
        const aptDate = startOfDay(new Date(apt.date));
        return aptDate.getTime() === startOfDay(today).getTime();
    });

    const totalRevenueToday = todaysAppointments
        .filter(apt => apt.status === "CONFIRMED")
        .reduce((acc, apt) => acc + Number(apt.service.price), 0);

    const pendingRevenueToday = todaysAppointments
        .filter(apt => apt.status === "PENDING")
        .reduce((acc, apt) => acc + Number(apt.service.price), 0);

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-legado-white">Dashboard</h1>
                <p className="text-legado-gray mt-1">
                    Visão geral do dia {format(today, "dd 'de' MMMM", { locale: ptBR })}
                </p>
            </header>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-legado-card border border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-legado-gray text-sm font-medium mb-2">Agendamentos Hoje</h3>
                    <p className="text-4xl font-bold text-legado-white">{todaysAppointments.length}</p>
                </div>
                <div className="bg-legado-card border border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-legado-gray text-sm font-medium mb-2">Pendente (R$)</h3>
                    <p className="text-4xl font-bold text-legado-white">
                        <span className="text-xl text-legado-gray">R$</span> {pendingRevenueToday.toFixed(2)}
                    </p>
                </div>
                <div className="bg-legado-card border border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-legado-gray text-sm font-medium mb-2">Faturamento (Confirmado)</h3>
                    <p className="text-4xl font-bold text-legado-gold">
                        <span className="text-xl">R$</span> {totalRevenueToday.toFixed(2)}
                    </p>
                </div>
                <div className="bg-legado-card border border-zinc-800 rounded-2xl p-6">
                    <h3 className="text-legado-gray text-sm font-medium mb-2">Status</h3>
                    <p className="text-xl font-bold text-green-500 mt-2">Sistema Online</p>
                </div>
            </div>

            {/* Appointments List */}
            <div>
                <h2 className="text-xl font-bold text-legado-white mb-4">Próximos Agendamentos</h2>
                <div className="bg-legado-card border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-zinc-900 border-b border-zinc-800">
                                <tr>
                                    <th className="p-4 text-sm font-medium text-legado-gray">Data & Hora</th>
                                    <th className="p-4 text-sm font-medium text-legado-gray">Cliente</th>
                                    <th className="p-4 text-sm font-medium text-legado-gray">Serviço</th>
                                    <th className="p-4 text-sm font-medium text-legado-gray">Preço</th>
                                    <th className="p-4 text-sm font-medium text-legado-gray">Status</th>
                                    <th className="p-4 text-sm font-medium text-legado-gray text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {appointments.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-legado-gray">
                                            Nenhum agendamento encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    appointments.map((apt) => (
                                        <tr key={apt.id} className="hover:bg-zinc-800/50 transition-colors">
                                            <td className="p-4">
                                                <div className="text-legado-white font-medium">
                                                    {format(new Date(apt.date), "dd/MM/yyyy")}
                                                </div>
                                                <div className="text-legado-gold font-bold">
                                                    {format(new Date(apt.date), "HH:mm")}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="text-legado-white font-medium">{apt.customer.name}</div>
                                                <div className="text-legado-gray text-sm">{apt.customer.phone}</div>
                                            </td>
                                            <td className="p-4 text-legado-gray">{apt.service.name}</td>
                                            <td className="p-4 text-legado-white font-medium">R$ {Number(apt.service.price).toFixed(2)}</td>
                                            <td className="p-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${apt.status === 'CONFIRMED' ? 'bg-green-500/10 text-green-500' :
                                                    apt.status === 'CANCELLED' ? 'bg-red-500/10 text-red-500' :
                                                        'bg-yellow-500/10 text-yellow-500'
                                                    }`}>
                                                    {apt.status === 'PENDING' ? 'PENDENTE' : apt.status === 'CONFIRMED' ? 'CONFIRMADO' : 'CANCELADO'}
                                                </span>
                                            </td>
                                            <td className="p-4 h-full flex items-center justify-end gap-2">
                                                <AppointmentActions id={apt.id} status={apt.status} />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
