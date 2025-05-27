
import React from 'react';

function Keypad({ type, onInput }) {
  const phoneLayout = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['clear', '0', 'backspace']
  ];

  const calculatorLayout = [
    ['7', '8', '9', 'clear'],
    ['4', '5', '6', 'backspace'],
    ['1', '2', '3', '.'],
    ['0', '00', '-', '+']
  ];

  const layout = type === 'phone' ? phoneLayout : calculatorLayout;

  const getButtonText = (value) => {
    switch (value) {
      case 'clear': return 'C';
      case 'backspace': return '⌫';
      case '00': return '00';
      default: return value;
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
