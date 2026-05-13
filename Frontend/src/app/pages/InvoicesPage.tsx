import { useState } from "react";
import { Download } from "lucide-react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/Header";
import { Footer } from "../components/dashboard/Footer";
import { InvoiceCard } from "../components/invoices/InvoiceCard";
import {
  InvoiceTable,
  type InvoiceItem,
} from "../components/invoices/InvoiceTable";

const invoices = [
  {
    id: "1",
    month: "Junho",
    year: 2026,
    status: "open" as const,
    dueDate: "12/07/2026",
    totalAmount: 1000.0,
    purchasesCount: 3,
  },
  {
    id: "2",
    month: "Maio",
    year: 2026,
    status: "paid" as const,
    dueDate: "12/06/2026",
    totalAmount: 950.5,
    purchasesCount: 12,
  },
  {
    id: "3",
    month: "Abril",
    year: 2026,
    status: "paid" as const,
    dueDate: "12/05/2026",
    totalAmount: 1120.75,
    purchasesCount: 15,
  },
];

// Transações que somam exatamente R$ 1.000,00
const invoiceItems: InvoiceItem[] = [
  {
    id: "1",
    date: "08/06/2026",
    description: "Supermercado Extra",
    category: "Alimentação",
    categoryColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    installment: "À vista",
    amount: 450.9,
  },
  {
    id: "2",
    date: "22/06/2026",
    description: "iFood (Pizza)",
    category: "Alimentação",
    categoryColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    installment: "À vista",
    amount: 89.2,
  },
  {
    id: "3",
    date: "25/06/2026",
    description: "Smartphone Samsung",
    category: "Eletrônicos",
    categoryColor: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    installment: "3/10",
    amount: 459.9,
  },
];

export function InvoicesPage() {
  const [selectedInvoiceId, setSelectedInvoiceId] = useState("1");

  const selectedInvoice =
    invoices.find((inv) => inv.id === selectedInvoiceId) || invoices[0];

  const handleExport = () => {
    console.log("Exportar fatura");
  };

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="João Silva" userRole="Administrador" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">
                Faturas
              </h1>
              <p className="text-muted-foreground font-medium">
                Acompanhe o histórico e status das suas faturas
              </p>
            </div>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 bg-card text-foreground px-6 py-3.5 rounded-xl border border-border/50 hover:bg-muted font-medium transition-colors shadow-sm"
            >
              <Download size={18} />
              Exportar
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
            {invoices.map((invoice) => (
              <InvoiceCard
                key={invoice.id}
                month={invoice.month}
                year={invoice.year}
                status={invoice.status}
                dueDate={invoice.dueDate}
                totalAmount={invoice.totalAmount}
                purchasesCount={invoice.purchasesCount}
                isActive={selectedInvoiceId === invoice.id}
                onClick={() => setSelectedInvoiceId(invoice.id)}
              />
            ))}
          </div>

          <div className="mb-8">
            <InvoiceTable
              month={selectedInvoice.month}
              year={selectedInvoice.year}
              items={invoiceItems}
            />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
