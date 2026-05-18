interface CreditCardItemProps {
  id: string;
  name: string;
  brand: string;
  lastDigits: string;
  color: string;
  isActive: boolean;
  onClick: () => void;
}

export function CreditCardItem({
  name,
  brand,
  lastDigits,
  color,
  isActive,
  onClick,
}: CreditCardItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full max-w-[400px] mx-auto aspect-[1.586/1] relative overflow-hidden rounded-2xl p-6 text-left flex flex-col justify-between transition-all duration-300 ${
        isActive
          ? `ring-2 ring-offset-2 ring-[#2B5BBA] dark:ring-offset-zinc-900 scale-[1.02] shadow-lg`
          : "opacity-70 hover:opacity-100 hover:scale-[1.01]"
      } bg-gradient-to-br ${color} text-white`}
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-xs font-medium text-white/70 uppercase tracking-wider">
            {brand}
          </p>
          <h3 className="text-lg font-bold">{name}</h3>
        </div>
        <div className="w-10 h-8 bg-white/20 rounded-md backdrop-blur-sm border border-white/10" />
      </div>

      <div className="flex justify-between items-end">
        <p className="text-xl font-mono tracking-[0.2em]">•••• {lastDigits}</p>
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full bg-red-500/80" />
          <div className="w-8 h-8 rounded-full bg-yellow-500/80" />
        </div>
      </div>
    </button>
  );
}
