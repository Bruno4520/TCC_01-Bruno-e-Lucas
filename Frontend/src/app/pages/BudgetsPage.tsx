import { useState } from "react";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Header } from "../components/dashboard/Header";
import { Footer } from "../components/dashboard/Footer";
import { BudgetSummaryCard } from "../components/budgets/BudgetSummaryCard";
import { BudgetCategoryCard } from "../components/budgets/BudgetCategoryCard";
import { CategoryModal } from "../components/budgets/NewCategoryModal";

const mockCategories = [
  {
    id: "c1",
    nome: "Moradia",
    icone: "home",
    cor: "bg-blue-500",
    isSystem: true,
  },
  {
    id: "c2",
    nome: "Alimentação",
    icone: "food",
    cor: "bg-emerald-500",
    isSystem: true,
  },
  {
    id: "c3",
    nome: "Transporte",
    icone: "car",
    cor: "bg-orange-500",
    isSystem: true,
  },
  {
    id: "c4",
    nome: "Lazer",
    icone: "game",
    cor: "bg-purple-500",
    isSystem: true,
  },
  {
    id: "c5",
    nome: "Compras Pessoais",
    icone: "receipt",
    cor: "bg-pink-500",
    isSystem: false,
  },
];

const mockBudgets = [
  { categoriaId: "c1", planned: 2200, spent: 2064.9 },
  { categoriaId: "c2", planned: 1000, spent: 865.9 },
  { categoriaId: "c3", planned: 400, spent: 295.0 },
  { categoriaId: "c4", planned: 300, spent: 224.2 },
  { categoriaId: "c5", planned: 500, spent: 400.0 },
];

export function BudgetsPage() {
  const [selectedMonth, setSelectedMonth] = useState("2026-05");
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [modalInitialData, setModalInitialData] = useState<any>(null);

  const totalPlanned = mockBudgets.reduce((sum, b) => sum + b.planned, 0);
  const totalSpent = mockBudgets.reduce((sum, b) => sum + b.spent, 0);
  const available = totalPlanned - totalSpent;

  const handleNewCategory = () => {
    setModalInitialData(null);
    setIsCategoryModalOpen(true);
  };

  const handleOpenConfigureCategory = (categoryId: string) => {
    const category = mockCategories.find((c) => c.id === categoryId);
    const budget = mockBudgets.find((b) => b.categoriaId === categoryId);

    setModalInitialData({
      ...category,
      plannedBudget: budget ? budget.planned : 0,
    });
    setIsCategoryModalOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    console.log(
      "Excluir Categoria e seu Orçamento vinculados no Prisma, ID:",
      categoryId,
    );
  };

  const handleSaveCategoryAndBudget = (data: any) => {
    console.log("Payload Unificado Enviado para o Backend:", data);
    setIsCategoryModalOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-background transition-colors duration-300">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Carlos Eduardo" userRole="Usuário Premium" />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground mb-1">
                Orçamentos
              </h1>
              <p className="text-muted-foreground font-medium">
                Controle de gastos: defina e acompanhe os seus limites mensais
                por categoria
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-3 bg-card border border-border/50 rounded-xl text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-[#2B5BBA] transition-all shadow-sm"
              />
              <button
                onClick={handleNewCategory}
                className="inline-flex items-center gap-2 bg-[#2B5BBA] text-white px-5 py-3 rounded-xl hover:opacity-90 font-bold transition-opacity shadow-sm"
              >
                Nova Categoria
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <BudgetSummaryCard type="planned" value={totalPlanned} />
            <BudgetSummaryCard type="spent" value={totalSpent} />
            <BudgetSummaryCard type="available" value={available} />
          </div>

          <h2 className="text-xl font-bold text-foreground mb-6">
            As Suas Categorias e Limites
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-8">
            {mockCategories.map((cat) => {
              const budget = mockBudgets.find((b) => b.categoriaId === cat.id);

              return (
                <BudgetCategoryCard
                  key={cat.id}
                  categoryId={cat.id}
                  category={cat.nome}
                  icon={cat.icone}
                  color={cat.cor}
                  planned={budget?.planned}
                  spent={budget?.spent}
                  isSystemCategory={cat.isSystem}
                  onSetBudget={() => handleOpenConfigureCategory(cat.id)}
                  onEditCategory={handleOpenConfigureCategory}
                  onDeleteCategory={handleDeleteCategory}
                />
              );
            })}
          </div>
        </main>
        <Footer />
      </div>

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        initialData={modalInitialData}
        onSave={handleSaveCategoryAndBudget}
      />
    </div>
  );
}
