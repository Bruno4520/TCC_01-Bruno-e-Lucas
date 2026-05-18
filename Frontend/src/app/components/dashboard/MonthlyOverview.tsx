import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { id: "jan", month: "Jan", receitas: 6500, despesas: 5100 },
  { id: "fev", month: "Fev", receitas: 6500, despesas: 4800 },
  { id: "mar", month: "Mar", receitas: 6800, despesas: 5200 },
  { id: "abr", month: "Abr", receitas: 6500, despesas: 4900 },
  { id: "mai", month: "Mai", receitas: 7500, despesas: 5800 },
  { id: "jun", month: "Jun", receitas: 7700, despesas: 3850 },
];
export function MonthlyOverview() {
  return (
    <div className="bg-card text-card-foreground rounded-2xl p-6 shadow-sm border border-border/50 transition-colors duration-300">
      <h3 className="text-lg font-bold tracking-tight mb-6">Visão Mensal</h3>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#888888"
            strokeOpacity={0.2}
            vertical={false}
          />

          <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `R$${value}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              borderColor: "hsl(var(--border))",
              color: "hsl(var(--card-foreground))",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            itemStyle={{ color: "hsl(var(--foreground))" }}
          />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
            iconType="circle"
          />
          <Line
            type="monotone"
            dataKey="receitas"
            stroke="#10b981"
            strokeWidth={3}
            name="Receitas"
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
          <Line
            type="monotone"
            dataKey="despesas"
            stroke="#ef4444"
            strokeWidth={3}
            name="Despesas"
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
