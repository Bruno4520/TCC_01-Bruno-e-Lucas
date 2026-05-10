import React, { useState, useEffect } from "react";
import {
  X,
  Home,
  Utensils,
  Car,
  HeartPulse,
  Gamepad2,
  ShoppingBag,
} from "lucide-react";

interface NewBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (budget: BudgetData) => void;
}

export type BudgetIcon =
  | "home"
  | "food"
  | "car"
  | "health"
  | "game"
  | "shopping";

export interface BudgetData {
  category: string;
  plannedAmount: number;
  month: string;
  icon: BudgetIcon;
}

const iconOptions: {
  id: BudgetIcon;
  component: React.ElementType;
  colorClass: string;
  bgClass: string;
  activeRing: string;
}[] = [
  {
    id: "home",
    component: Home,
    colorClass: "text-blue-600",
    bgClass: "bg-blue-50",
    activeRing: "ring-blue-500",
  },
  {
    id: "food",
    component: Utensils,
    colorClass: "text-green-600",
    bgClass: "bg-green-50",
    activeRing: "ring-green-500",
  },
  {
    id: "car",
    component: Car,
    colorClass: "text-purple-600",
    bgClass: "bg-purple-50",
    activeRing: "ring-purple-500",
  },
  {
    id: "health",
    component: HeartPulse,
    colorClass: "text-red-600",
    bgClass: "bg-red-50",
    activeRing: "ring-red-500",
  },
  {
    id: "game",
    component: Gamepad2,
    colorClass: "text-yellow-600",
    bgClass: "bg-yellow-50",
    activeRing: "ring-yellow-500",
  },
  {
    id: "shopping",
    component: ShoppingBag,
    colorClass: "text-pink-600",
    bgClass: "bg-pink-50",
    activeRing: "ring-pink-500",
  },
];

const categories = [
  "Moradia",
  "Alimentação",
  "Transporte",
  "Saúde",
  "Lazer",
  "Compras",
  "Outros",
];

const months = [
  "Janeiro 2026",
  "Fevereiro 2026",
  "Março 2026",
  "Abril 2026",
  "Maio 2026",
  "Junho 2026",
];

export function NewBudgetModal({
  isOpen,
  onClose,
  onSave,
}: NewBudgetModalProps) {
  const [category, setCategory] = useState("");
  const [amountStr, setAmountStr] = useState("");
  const [amountNum, setAmountNum] = useState(0);
  const [month, setMonth] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<BudgetIcon>("home");

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

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { formatted, num } = formatCurrency(e.target.value);
    setAmountStr(formatted);
    setAmountNum(num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        category,
        plannedAmount: amountNum,
        month,
        icon: selectedIcon,
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setCategory("");
    setAmountStr("");
    setAmountNum(0);
    setMonth("");
    setSelectedIcon("home");
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
      {/* Overlay - Sem classes dark: para respeitar o theme.css */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h2 className="text-xl font-semibold text-gray-900">
            Adicionar Orçamento
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
          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              required
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Valor Planejado */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor Planejado
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                R$
              </span>
              <input
                type="text"
                value={amountStr}
                onChange={handleAmountChange}
                placeholder="0,00"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Mês de Referência */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mês de Referência
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
              required
            >
              <option value="">Selecione o mês</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Ícone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Ícone
            </label>
            <div className="flex flex-wrap gap-4">
              {iconOptions.map((opt) => {
                const IconComponent = opt.component;
                const isSelected = selectedIcon === opt.id;

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedIcon(opt.id)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${opt.bgClass} ${opt.colorClass} ${
                      isSelected
                        ? `ring-2 ring-offset-2 ${opt.activeRing} scale-110 shadow-md`
                        : "hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                    aria-label={`Selecionar ícone ${opt.id}`}
                  >
                    <IconComponent size={24} />
                  </button>
                );
              })}
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
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
