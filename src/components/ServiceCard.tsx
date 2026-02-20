export function ServiceCard({
    name,
    price,
    duration,
    selected,
    onClick,
}: {
    name: string;
    price: number;
    duration: number;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`w-full text-left p-4 mb-3 rounded-xl border-2 transition-all duration-300 flex justify-between items-center ${selected
                    ? "border-legado-gold bg-zinc-800"
                    : "border-transparent bg-legado-card hover:border-legado-gray/30 hover:bg-zinc-800"
                }`}
        >
            <div>
                <h3 className={`font-semibold text-lg transition-colors ${selected ? "text-legado-gold" : "text-legado-white"}`}>
                    {name}
                </h3>
                <span className="text-legado-gray text-sm font-medium">{duration} min</span>
            </div>
            <div className="text-right">
                <span className="text-legado-white font-bold tracking-wide">R$ {price.toFixed(2)}</span>
            </div>
        </button>
    );
}
