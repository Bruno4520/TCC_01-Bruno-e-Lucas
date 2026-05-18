import { ArrowDownRight, ArrowUpRight, ReceiptText } from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
}

interface RecentTransactionsProps {
  onAddTransaction?: () => void;
  onViewAll: () => void;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Churrascaria Fogo Forte",
    category: "Alimentação",
    amount: 185.9,
    type: "expense",
    date: "Hoje",
  },
  {
    id: "2",
    title: "Posto Ipiranga",
    category: "Transporte",
    amount: 250.0,
    type: "expense",
    date: "Hoje",
  },
  {
    id: "3",
    title: "Salário - Empresa XYZ",
    category: "Receitas",
    amount: 6500.0,
    type: "income",
    date: "Ontem",
  },
  {
    id: "4",
    title: "Uber (Trabalho)",
    category: "Transporte",
    amount: 45.0,
    type: "expense",
    date: "15 de Mai",
  },
  {
    id: "5",
    title: "Supermercado Extra",
    category: "Alimentação",
    amount: 680.0,
    type: "expense",
    date: "14 de Mai",
  },
];

export function RecentTransactions({ onViewAll }: RecentTransactionsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  };

  return (
    <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-sm border border-border/50 transition-colors duration-300 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold tracking-tight">
          Transações Recentes
        </h3>
        <button
          onClick={onViewAll}
          className="text-sm font-medium text-[#2B5BBA] hover:text-[#1e4594] dark:hover:text-[#5588ff] transition-colors"
        >
          Ver todas
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {mockTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-2 rounded-full ${transaction.type === "income" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}
              >
                {transaction.type === "income" ? (
                  <ArrowUpRight size={20} />
                ) : (
                  <ArrowDownRight size={20} />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {transaction.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {transaction.category} • {transaction.date}
                </p>
              </div>
            </div>
            <span
              className={`text-sm font-bold ${transaction.type === "income" ? "text-emerald-600 dark:text-emerald-400" : "text-foreground"}`}
            >
              {transaction.type === "income" ? "+" : "-"}{" "}
              {formatCurrency(transaction.amount)}
            </span>
          </div>
        ))}
        {mockTransactions.length === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
              <ReceiptText size={32} opacity={0.5} />
            </div>
            <p className="text-foreground font-bold mb-1">Nenhuma transação</p>
            <p className="text-sm text-muted-foreground max-w-[200px]">
              Os seus registos recentes aparecerão aqui.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
