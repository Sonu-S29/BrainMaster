
import React from 'react';

function Keypad({ type, onInput }) {
  const calculatorLayout = [
    ['7', '8', '9', 'clear'],
    ['4', '5', '6', 'backspace'],
    ['1', '2', '3', '.'],
    ['0', '-', '+', '=']
  ];

  const phoneLayout = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['clear', '0', 'backspace']
  ];

  const layout = type === 'calculator' ? calculatorLayout : phoneLayout;

  const getButtonText = (key) => {
    switch (key) {
      case 'clear': return 'C';
      case 'backspace': return '⌫';
      case '=': return '=';
      default: return key;
    }
  };

  return (
    <div className={`keypad ${type}`}>
      {layout.flat().map((key, index) => (
        <button
          key={index}
          className="keypad-button"
          onClick={() => onInput(key)}
        >
          {getButtonText(key)}
        </button>
      ))}
    </div>
  );
}

export default Keypad;
