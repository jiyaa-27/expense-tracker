import React, { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SpendingChart from "./components/SpendingChart";
import { loadLocal, saveLocal } from "./utils/storage";
import "./index.css";

function App(){
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState("");
  const [editItem, setEditItem] = useState(null);

  useEffect(()=>{
    const local = loadLocal();
    if(local) setTransactions(local);
  },[]);

  useEffect(()=>{
    saveLocal(transactions);
  },[transactions]);

  function addOrUpdate(tx){
    if(transactions.some(t=>t.id === tx.id)){
      // update
      setTransactions(prev => prev.map(p => p.id === tx.id ? tx : p));
      setEditItem(null);
    } else {
      setTransactions(prev => [tx, ...prev]);
    }
  }

  function remove(id){
    setTransactions(prev => prev.filter(t=>t.id !== id));
    if(editItem && editItem.id === id) setEditItem(null);
  }

  function edit(tx){ setEditItem(tx); }

  const income = transactions.filter(t=>t.amount>0).reduce((s,t)=>s+t.amount,0);
  const expense = Math.abs(transactions.filter(t=>t.amount<0).reduce((s,t)=>s+t.amount,0));
  const balance = (income - expense).toFixed(2);

  const budgetAlert = budget && (expense > Number(budget));

  return (
    <div className="app container">
      <header>
        <h1>Expense & Budget Tracker</h1>
        <p className="subtitle">React • Chart.js • LocalStorage</p>
      </header>

      <div className="top-row">
        <div className="card stat">
          <h4>Balance</h4>
          <div className="big">₹{balance}</div>
        </div>
        <div className="card stat">
          <h4>Income</h4>
          <div className="big plus">₹{income.toFixed(2)}</div>
        </div>
        <div className="card stat">
          <h4>Expense</h4>
          <div className="big minus">₹{expense.toFixed(2)}</div>
        </div>
      </div>

      <div className="main-grid">
        <div className="left-col">
          <div className="card">
            <h3>Set Budget</h3>
            <div className="budget-row">
              <input type="number" placeholder="Monthly budget (₹)" value={budget} onChange={e=>setBudget(e.target.value)} />
              <div className={`budget-pill ${budgetAlert ? "warn":""}`}>{budgetAlert ? "Exceeded" : "OK"}</div>
            </div>
          </div>

          <TransactionForm onAdd={addOrUpdate} editItem={editItem} onCancelEdit={()=>setEditItem(null)} />
          <TransactionList txs={transactions} onDelete={remove} onEdit={edit} />
        </div>

        <div className="right-col">
          <div className="card">
            <SpendingChart transactions={transactions} />
          </div>
        </div>
      </div>

      <footer className="muted">Built fast for demo • Copy for your portfolio</footer>
    </div>
  );
}

export default App;


