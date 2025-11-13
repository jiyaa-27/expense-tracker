import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TransactionForm({ onAdd, editItem, onCancelEdit }) {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Other");

  useEffect(()=>{
    if(editItem){
      setText(editItem.text);
      setAmount(editItem.amount);
      setCategory(editItem.category || "Other");
    } else {
      setText(""); setAmount(""); setCategory("Other");
    }
  },[editItem]);

  function submit(e){
    e.preventDefault();
    if(!text || amount==="" ) return alert("Enter description and amount");
    const tx = {
      id: editItem ? editItem.id : uuidv4(),
      text,
      amount: Number(amount),
      category,
      date: editItem ? editItem.date : new Date().toISOString()
    };
    onAdd(tx);
    if(!editItem){
      setText(""); setAmount(""); setCategory("Other");
    }
  }

  return (
    <form className="card form" onSubmit={submit}>
      <h3>{editItem ? "Edit Transaction" : "Add new transaction"}</h3>

      <div className="form-row">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Description (eg. Groceries)" />
        <input value={amount} onChange={e=>setAmount(e.target.value)} type="number" step="0.01" placeholder="Amount (+ income, - expense)" />
      </div>

      <div className="form-row">
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Salary</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn">{editItem ? "Save" : "Add"}</button>
        {editItem && <button type="button" className="btn alt" onClick={onCancelEdit}>Cancel</button>}
      </div>
    </form>
  );
}
