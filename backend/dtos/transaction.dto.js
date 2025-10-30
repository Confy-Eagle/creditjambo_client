// src/dtos/transaction.dto.js
function toPublicTransaction(tx) {
  return {
    id: tx.id,
    type: tx.type,
    amount: tx.amount,
    balance_after: tx.balance_after,
    description: tx.description,
    created_at: tx.created_at,
  };
}

module.exports = { toPublicTransaction };
