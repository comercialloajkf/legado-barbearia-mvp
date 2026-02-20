import Link from "next/link";
import { LayoutDashboard, Calendar as CalendarIcon, Users, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-legado-black text-legado-white flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-legado-card hidden md:flex flex-col">
                <div className="p-6 border-b border-legado-card">
                    <Link href="/admin">
                        <h2 className="text-xl font-bold tracking-widest text-legado-white">
                            LEGADO <span className="text-legado-gold block text-sm">ADMIN</span>
                        </h2>
                    </Link>
                </div>

                <nav className="flex-1 p-4 flex flex-col gap-2">
                    <Link href="/admin" className="flex items-center gap-3 p-3 rounded-lg hover:bg-legado-card hover:text-legado-gold transition-colors">
                        <LayoutDashboard size={20} />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="/admin/agenda" className="flex items-center gap-3 p-3 rounded-lg hover:bg-legado-card hover:text-legado-gold transition-colors text-legado-gray">
                        <CalendarIcon size={20} />
                        <span className="font-medium">Agenda Completa</span>
                    </Link>
                    <Link href="/admin/clientes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-legado-card hover:text-legado-gold transition-colors text-legado-gray">
                        <Users size={20} />
                        <span className="font-medium">Clientes VIP</span>
                    </Link>
                    <Link href="/admin/ajustes" className="flex items-center gap-3 p-3 rounded-lg hover:bg-legado-card hover:text-legado-gold transition-colors text-legado-gray">
                        <Settings size={20} />
                        <span className="font-medium">Ajustes</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-legado-card">
                    <Link href="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors text-legado-gray">
                        <LogOut size={20} />
                        <span className="font-medium">Sair do Painel</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                {/* Mobile Header */}
                <header className="md:hidden bg-zinc-900 border-b border-legado-card p-4 flex items-center justify-between">
                    <h2 className="text-lg font-bold tracking-widest text-legado-white">
                        LEGADO <span className="text-legado-gold">ADMIN</span>
                    </h2>
                    {/* Mobile menu button could go here */}
                </header>

                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
