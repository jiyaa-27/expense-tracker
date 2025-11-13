import React from "react";

export default function TransactionList({ txs, onDelete, onEdit }) {
  if(!txs || txs.length===0) return <div className="list"><p className="muted">No transactions yet</p></div>;
  return (
    <div className="list">
      {txs.map(t=>(
        <div className={`list-item ${t.amount >= 0 ? "plus":"minus"}`} key={t.id}>
          <div className="left">
            <div className="title">{t.text}</div>
            <div className="meta">{t.category} • {new Date(t.date).toLocaleString()}</div>
          </div>

          <div className="right">
            <div className="amount">{t.amount >=0 ? `+₹${t.amount.toFixed(2)}` : `-₹${Math.abs(t.amount).toFixed(2)}`}</div>
            <div className="actions">
              <button className="icon" onClick={()=>onEdit(t)}>✏️</button>
              <button className="icon" onClick={()=>onDelete(t.id)}>🗑️</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
