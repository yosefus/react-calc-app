import React from 'react';

export default function Header({ previousOperand, currentOperand, operation }) {
  const integerFormater = new Intl.NumberFormat('en-us', { maximumFractionDigits: 0 });

  function formatOperand(operand) {
    if (!operand) return;

    const [integer, decimal] = operand.split('.');

    if (!decimal) return integerFormater.format(integer);
    return `${integerFormater.format(integer)}.${decimal}`;
  }

  return (
    <div className="header">
      <div className="previous">
        {formatOperand(previousOperand)}
        {operation}
      </div>
      <div className="current">{formatOperand(currentOperand)}</div>
    </div>
  );
}
