import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function SpendingChart({ transactions }) {
  const chartData = useMemo(()=>{
    const map = {};
    transactions.forEach(t=>{
      const c = t.category || "Other";
      // show expense amounts only (abs)
      map[c] = (map[c] || 0) + (t.amount < 0 ? Math.abs(t.amount) : 0);
    });
    const labels = Object.keys(map);
    const values = labels.map(l => map[l]);
    return {
      labels,
      datasets: [
        {
          label: "Expenses (₹)",
          data: values,
          backgroundColor: labels.map(()=> "rgba(255,99,132,0.7)"),
        }
      ]
    };
  },[transactions]);

  if(!transactions || transactions.length===0) return <div className="chart-empty muted">Add transactions to see chart</div>;

  return (
    <div className="chart-wrap">
      <h3>Spending by Category</h3>
      <Bar data={chartData} options={{ responsive:true, maintainAspectRatio:false }} />
    </div>
  );
}
