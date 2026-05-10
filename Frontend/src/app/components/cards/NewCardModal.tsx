import React, { useState, useEffect } from "react";
import { X, CreditCard, Calendar } from "lucide-react";

interface NewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (card: CardData) => void;
}

export type CardColor = "purple" | "orange" | "red" | "blue" | "green" | "gray";

export interface CardData {
  label: string;
  bank: string;
  totalLimit: number;
  lastDigits: string;
  closingDay: number;
  dueDay: number;
  color: CardColor;
}

const colorOptions: { value: CardColor; bgClass: string; label: string }[] = [
  { value: "purple", bgClass: "bg-purple-500", label: "Roxo" },
  { value: "orange", bgClass: "bg-orange-500", label: "Laranja" },
  { value: "red", bgClass: "bg-red-500", label: "Vermelho" },
  { value: "blue", bgClass: "bg-blue-500", label: "Azul" },
  { value: "green", bgClass: "bg-green-500", label: "Verde" },
  { value: "gray", bgClass: "bg-gray-500", label: "Cinza" },
];

export function NewCardModal({ isOpen, onClose, onSave }: NewCardModalProps) {
  const [label, setLabel] = useState("");
  const [bank, setBank] = useState("");
  const [limitStr, setLimitStr] = useState("");
  const [limitNum, setLimitNum] = useState(0);
  const [lastDigits, setLastDigits] = useState("");
  const [closingDay, setClosingDay] = useState<number | "">("");
  const [dueDay, setDueDay] = useState<number | "">("");
  const [color, setColor] = useState<CardColor>("purple");

  const formatCurrency = (value: string) => {
    if (!value) return { formatted: "", num: 0 };
    const numbers = value.replace(/\D/g, "");
    if (!numbers) return { formatted: "", num: 0 };
    const amount = parseFloat(numbers) / 100;
    return {
      formatted: amount.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      num: amount,
    };
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { formatted, num } = formatCurrency(e.target.value);
    setLimitStr(formatted);
    setLimitNum(num);
  };

  const handleDigitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    setLastDigits(val);
  };

  const handleDayChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number | "">>,
  ) => {
    const val = parseInt(e.target.value.replace(/\D/g, ""));
    if (!isNaN(val) && val >= 1 && val <= 31) {
      setter(val);
    } else if (e.target.value === "") {
      setter("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave && closingDay !== "" && dueDay !== "") {
      onSave({
        label,
        bank,
        totalLimit: limitNum,
        lastDigits,
        closingDay,
        dueDay,
        color,
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setLabel("");
    setBank("");
    setLimitStr("");
    setLimitNum(0);
    setLastDigits("");
    setClosingDay("");
    setDueDay("");
    setColor("purple");
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Overlay - Seguindo o padrão de temas automático sem classes `dark:` */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CreditCard size={24} className="text-[#2B5BBA]" />
            Novo Cartão
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Apelido do Cartão */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apelido do Cartão
              </label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Ex: Cartão Principal"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            {/* Banco Emissor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Banco / Instituição
              </label>
              <input
                type="text"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                placeholder="Ex: Nubank, Itaú..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Limite Total */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Limite Total
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  R$
                </span>
                <input
                  type="text"
                  value={limitStr}
                  onChange={handleLimitChange}
                  placeholder="0,00"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Últimos 4 dígitos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Últimos 4 Dígitos
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ****
                </span>
                <input
                  type="text"
                  value={lastDigits}
                  onChange={handleDigitsChange}
                  placeholder="1234"
                  className="w-full pl-14 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-mono tracking-widest"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Dia de Fechamento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dia de Fechamento
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={closingDay}
                  onChange={(e) => handleDayChange(e, setClosingDay)}
                  placeholder="Ex: 15"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Dia de Vencimento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dia de Vencimento
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="number"
                  min="1"
                  max="31"
                  value={dueDay}
                  onChange={(e) => handleDayChange(e, setDueDay)}
                  placeholder="Ex: 22"
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {/* Seleção de Cor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Cor de Exibição
            </label>
            <div className="flex flex-wrap gap-4">
              {colorOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setColor(opt.value)}
                  className={`w-10 h-10 rounded-full ${opt.bgClass} flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${opt.value}-500 ${
                    color === opt.value
                      ? "ring-2 ring-offset-2 ring-gray-900 scale-110"
                      : ""
                  }`}
                  aria-label={`Selecionar cor ${opt.label}`}
                />
              ))}
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl font-medium text-white bg-[#2B5BBA] hover:bg-[#1e4594] transition-all shadow-lg shadow-blue-500/20"
            >
              Criar Cartão
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
