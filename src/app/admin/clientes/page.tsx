import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export default async function ClientesPage() {
    const customers = await prisma.customer.findMany({
        include: {
            appointments: true
        },
        orderBy: { name: 'asc' }
    });

    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-legado-white">Ficha de Clientes</h1>
                <p className="text-legado-gray mt-1">Lista de todos os clientes cadastrados na plataforma e número de visitas.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map(customer => (
                    <div key={customer.id} className="bg-legado-card border border-zinc-800 rounded-2xl p-6 flex flex-col gap-2">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-legado-gold">{customer.name}</h3>
                            <span className="text-xs bg-zinc-800 text-legado-gray px-2 py-1 rounded font-bold">
                                {customer.appointments.length} cortes
                            </span>
                        </div>
                        <p className="text-legado-white text-sm bg-zinc-900 p-3 rounded-lg font-mono">
                            {customer.phone}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
