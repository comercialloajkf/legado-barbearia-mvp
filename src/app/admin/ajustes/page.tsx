export default function AjustesPage() {
    return (
        <div className="space-y-6">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-legado-white">Configurações Gerais</h1>
                <p className="text-legado-gray mt-1">Ajustes da plataforma da Legado Barber Shop.</p>
            </header>

            <div className="bg-legado-card border border-zinc-800 rounded-2xl p-8 max-w-2xl">
                <h2 className="text-xl font-bold text-legado-gold mb-6">Módulo Disponível em Breve</h2>
                <p className="text-legado-white leading-relaxed">
                    Nesta área você poderá futuramente cadastrar novos Serviços, editar o valor de cada corte diretamente na plataforma
                    e definir os horários de folga para o calendário dos clientes (ex: tirar horário de almoço ou bloquear um dia de férias).
                </p>

                <div className="mt-8 p-4 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-legado-gray">
                    <p>🛠️ Em desenvolvimento para a versão V2.</p>
                </div>
            </div>
        </div>
    );
}
