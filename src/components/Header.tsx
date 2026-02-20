import Link from 'next/link';

export function Header() {
    return (
        <header className="w-full bg-legado-black border-b border-legado-card p-4 flex items-center justify-center sticky top-0 z-50">
            <Link href="/">
                <h1 className="text-2xl font-bold tracking-widest text-legado-white">
                    LEGADO <span className="text-legado-gold">BARBER SHOP</span>
                </h1>
            </Link>
        </header>
    );
}
