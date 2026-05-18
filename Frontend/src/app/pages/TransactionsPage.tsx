import { useState } from "react";
import { Plus } from "lucide-react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/Header";
import { Footer } from "../components/dashboard/Footer";
import { TransactionFilters } from "../components/transactions/TransactionFilters";
import {
  TransactionTable,
  type Transaction,
} from "../components/transactions/TransactionTable";
import { NewTransactionModal } from "../components/transactions/NewTransactionModal";

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "17/05/2026",
    description: "Churrascaria Fogo Forte",
    category: "Alimentação",
    account: "Cartão Itaú Click",
    paymentMethod: "Crédito",
    amount: 185.9,
    type: "expense",
    observation: "Almoço de aniversário do amigo",
  },
  {
    id: "2",
    date: "17/05/2026",
    description: "Posto Ipiranga",
    category: "Transporte",
    account: "Cartão Nubank",
    paymentMethod: "Crédito",
    amount: 250.0,
    type: "expense",
    observation: "Tanque cheio",
  },
  {
    id: "3",
    date: "16/05/2026",
    description: "Salário - Empresa XYZ",
    category: "Receitas",
    account: "Conta Corrente Itaú",
    paymentMethod: "PIX",
    amount: 6500.0,
    type: "income",
    observation: "Salário referente a Abril/2026",
  },
  {
    id: "4",
    date: "15/05/2026",
    description: "Uber (Trabalho)",
    category: "Transporte",
    account: "Cartão Nubank",
    paymentMethod: "Crédito",
    amount: 45.0,
    type: "expense",
  },
  {
    id: "5",
    date: "14/05/2026",
    description: "Supermercado Extra",
    category: "Alimentação",
    account: "Cartão Itaú Click",
    paymentMethod: "Crédito",
    amount: 680.0,
    type: "expense",
    observation: "Compra do mês",
  },
  {
    id: "6",
    date: "13/05/2026",
    description: "Spotify Premium",
    category: "Lazer",
    account: "Cartão Nubank",
    paymentMethod: "Crédito",
    amount: 21.9,
    type: "expense",
  },
  {
    id: "7",
    date: "12/05/2026",
    description: "Freelance Landing Page",
    category: "Receitas",
    account: "Conta Corrente Itaú",
    paymentMethod: "PIX",
    amount: 1200.0,
    type: "income",
    observation: "Cliente: Agência Criativa",
  },
  {
    id: "8",
    date: "11/05/2026",
    description: "Internet (Claro)",
    category: "Moradia",
    account: "Cartão Nubank",
    paymentMethod: "Crédito",
    amount: 119.9,
    type: "expense",
  },
  {
    id: "9",
    date: "10/05/2026",
    description: "Conta de Luz (Enel)",
    category: "Moradia",
    account: "Conta Corrente Itaú",
    paymentMethod: "Débito",
    amount: 145.0,
    type: "expense",
  },
  {
    id: "10",
    date: "06/05/2026",
    description: "Aluguel e Condomínio",
    category: "Moradia",
    account: "Conta Corrente Itaú",
    paymentMethod: "PIX",
    amount: 1800.0,
    type: "expense",
    observation: "Edifício Central - Ref. Abril",
  },
];

export function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilter = () => console.log("Aplicar filtros");
  const handleAddTransaction = () => setIsModalOpen(true);
  const handleSaveTransaction = (data: any) => {
    console.log("Nova transação salva:", data);
    setIsModalOpen(false);
  };
  const handleEdit = (id: string) => console.log("Editar transação:", id);
  const handleDelete = (id: string) => console.log("Excluir transação:", id);

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Carlos Eduardo" userRole="Usuário Premium" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">
              Transações
            </h1>
            <p className="text-muted-foreground font-medium">
              Gerencie suas receitas e despesas
            </p>
          </div>

          <TransactionFilters onFilter={handleFilter} />

          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddTransaction}
              className="inline-flex items-center gap-2 bg-[#2B5BBA] text-white px-6 py-3.5 rounded-xl hover:opacity-90 transition-opacity font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2B5BBA] focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
            >
              <Plus size={20} />
              Nova Transação
            </button>
          </div>

          <TransactionTable
            transactions={mockTransactions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </main>

        <Footer />
      </div>

      <NewTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
      />
    </div>
  );
}
