import React, { useState, useEffect } from "react";
import { X, Building, Sprout, Wallet } from "lucide-react";

interface NewAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (account: AccountData) => void;
}

export interface AccountData {
  name: string;
  type: "checking" | "savings" | "wallet";
  balance: number;
  institution: string;
}

export function NewAccountModal({
  isOpen,
  onClose,
  onSave,
}: NewAccountModalProps) {
  const [type, setType] = useState<"checking" | "savings" | "wallet">(
    "checking",
  );
  const [name, setName] = useState("");
  const [balanceStr, setBalanceStr] = useState("");
  const [balanceNum, setBalanceNum] = useState(0);
  const [institution, setInstitution] = useState("");

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

  const handleBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { formatted, num } = formatCurrency(e.target.value);
    setBalanceStr(formatted);
    setBalanceNum(num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        name,
        type,
        balance: balanceNum,
        institution: type !== "wallet" ? institution : "Dinheiro Físico",
      });
    }
    handleClose();
  };

  const handleClose = () => {
    setType("checking");
    setName("");
    setBalanceStr("");
    setBalanceNum(0);
    setInstitution("");
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
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl font-semibold text-gray-900">Nova Conta</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de Conta
            </label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setType("checking")}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all ${
                  type === "checking"
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Building size={24} />
                Corrente
              </button>
              <button
                type="button"
                onClick={() => setType("savings")}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all ${
                  type === "savings"
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Sprout size={24} />
                Poupança
              </button>
              <button
                type="button"
                onClick={() => setType("wallet")}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl font-medium transition-all ${
                  type === "wallet"
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Wallet size={24} />
                Carteira
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Conta
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Itaú Principal"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saldo Inicial
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                  R$
                </span>
                <input
                  type="text"
                  value={balanceStr}
                  onChange={handleBalanceChange}
                  placeholder="0,00"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
          </div>

          {type !== "wallet" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instituição Financeira / Banco
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Ex: Nubank, Banco do Brasil..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200">
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
              Criar Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
