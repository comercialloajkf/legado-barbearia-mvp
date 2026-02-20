import { PrismaClient } from "@prisma/client";
import { notFound, redirect } from "next/navigation";
import { EditFormClient } from "./EditFormClient";


const prisma = new PrismaClient();

export default async function EditAppointmentPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    if (!id) redirect("/admin");

    const appointment = await prisma.appointment.findUnique({
        where: { id },
        include: { customer: true, service: true }
    });

    if (!appointment) notFound();

    const services = await prisma.service.findMany({
        orderBy: { price: "asc" }
    });

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-legado-white">Editar Agendamento</h1>
                <p className="text-legado-gray mt-1">Modifique os dados de data, horário, serviço ou status.</p>
            </header>

            <div className="bg-legado-card border border-zinc-800 rounded-2xl p-8">
                <EditFormClient appointment={appointment} services={services} />
            </div>
        </div>
    );
}
