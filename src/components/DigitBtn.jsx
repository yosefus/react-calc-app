import { ACTIONS } from './Calc';

export default function DigitBtn({ dispatch, digit }) {
  return <button onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}>{digit}</button>;
}
