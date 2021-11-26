import React, { useReducer } from 'react';
import './calc.css';

// components
import DigitBtn from './DigitBtn';
import OperationBtn from './OperationBtn';
import Header from './Header';

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
};

const { ADD_DIGIT, CHOOSE_OPERATION, CLEAR, DELETE_DIGIT, EVALUATE } = ACTIONS;

function reducer(state, { type, payload }) {
  const { currentOperand, previousOperand, operation, overWrite } = state;

  switch (type) {
    case ADD_DIGIT:
      if (overWrite) {
        return {
          ...state,
          overWrite: false,
          currentOperand: payload.digit,
        };
      }

      if (
        (payload.digit === '0' && currentOperand === '0') ||
        (payload.digit === '.' && !currentOperand) ||
        (payload.digit === '.' && currentOperand.includes('.'))
      )
        return state;

      return {
        ...state,
        currentOperand: `${currentOperand || ''}${payload.digit}`,
      };

    case CHOOSE_OPERATION:
      if (!currentOperand && !previousOperand) return state;

      if (!currentOperand)
        return {
          ...state,
          operation: payload.operation,
        };

      if (!previousOperand)
        return {
          ...state,
          operation: payload.operation,
          previousOperand: currentOperand,
          currentOperand: null,
        };

      return {
        ...state,
        operation: payload.operation,
        previousOperand: evaluate(state),
        currentOperand: null,
      };

    case CLEAR:
      return {};

    case DELETE_DIGIT:
      if (!currentOperand) return state;
      if (overWrite) return {};
      if (currentOperand.length === 1) return { ...state, currentOperand: null };

      return {
        ...state,
        currentOperand: currentOperand.slice(0, -1),
      };

    case EVALUATE:
      if (!currentOperand || !previousOperand || !operation) return state;

      return {
        ...state,
        overWrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    default:
      break;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(curr)) return '';

  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + curr;
      break;
    case '-':
      computation = prev - curr;
      break;
    case '/':
      computation = prev / curr;
      break;
    case '*':
      computation = prev * curr;
      break;
    default:
      break;
  }

  return computation.toString();
}

export default function Calc() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="grid-calc">
      <Header currentOperand={currentOperand} operation={operation} previousOperand={previousOperand} />
      <button className="span-two" onClick={() => dispatch({ type: CLEAR })}>
        ac
      </button>
      <button onClick={() => dispatch({ type: DELETE_DIGIT })}>del</button>
      <OperationBtn operation="/" dispatch={dispatch} />
      <DigitBtn digit="1" dispatch={dispatch} />
      <DigitBtn digit="2" dispatch={dispatch} />
      <DigitBtn digit="3" dispatch={dispatch} />
      <OperationBtn operation="*" dispatch={dispatch} />
      <DigitBtn digit="4" dispatch={dispatch} />
      <DigitBtn digit="5" dispatch={dispatch} />
      <DigitBtn digit="6" dispatch={dispatch} />
      <OperationBtn operation="+" dispatch={dispatch} />
      <DigitBtn digit="7" dispatch={dispatch} />
      <DigitBtn digit="8" dispatch={dispatch} />
      <DigitBtn digit="9" dispatch={dispatch} />
      <OperationBtn operation="-" dispatch={dispatch} />
      <DigitBtn digit="." dispatch={dispatch} />
      <DigitBtn digit="0" dispatch={dispatch} />
      <button onClick={() => dispatch({ type: EVALUATE })} className="span-two">
        =
      </button>
    </div>
  );
}
