export function generateQuestion(type, difficulty = 'medium', customSettings = {}) {
  let question = {};

  const ranges = {
    easy: { min: 1, max: 10 },
    medium: { min: 5, max: 25 },
    hard: { min: 10, max: 50 },
    expert: { min: 25, max: 100 }
  };

  const range = ranges[difficulty];

  switch (type) {
    case 'addition':
      return generateAddition(range);
    case 'subtraction':
      return generateSubtraction(range);
    case 'multiplication':
      return generateMultiplication(range);
    case 'division':
      return generateDivision(range);
    case 'multiplicationTables':
      return generateMultiplicationTable(customSettings);
    case 'squareRoots':
      return generateSquareRoot();
    case 'exponents':
    case 'exponentsPractice':
      return generateExponent(customSettings);
    case 'memoryTraining':
      return generateMemoryTraining(range);
    case 'additionSubtraction':
      return randomChoice([generateAddition(range), generateSubtraction(range)]);
    case 'multiplicationDivision':
      return randomChoice([generateMultiplication(range), generateDivision(range)]);
    case 'mixedOperations':
      return generateMixed(range);
    default:
      return generateAddition(range);
  }
}

function generateAddition(range) {
  const a = randomInt(range.min, range.max);
  const b = randomInt(range.min, range.max);
  return {
    display: `${a} + ${b} = ?`,
    answer: a + b,
    operands: [a, b],
    operation: '+'
  };
}

function generateSubtraction(range) {
  const a = randomInt(range.min, range.max);
  const b = randomInt(range.min, a); // Ensure positive result
  return {
    display: `${a} - ${b} = ?`,
    answer: a - b,
    operands: [a, b],
    operation: '-'
  };
}

function generateMultiplication(range) {
  const a = randomInt(range.min, Math.min(range.max, 20));
  const b = randomInt(range.min, Math.min(range.max, 20));
  return {
    display: `${a} × ${b} = ?`,
    answer: a * b,
    operands: [a, b],
    operation: '×'
  };
}

function generateDivision(range) {
  const b = randomInt(2, Math.min(range.max, 20));
  const answer = randomInt(range.min, Math.min(range.max, 50));
  const a = b * answer;
  return {
    display: `${a} ÷ ${b} = ?`,
    answer: answer,
    operands: [a, b],
    operation: '÷'
  };
}

function generateMultiplicationTable(customSettings = {}) {
  const table = customSettings.tableOf || randomInt(2, 12);
  const multiplier = randomInt(1, customSettings.showTill || 12);
  return {
    display: `${table} × ${multiplier} = ?`,
    answer: table * multiplier,
    operands: [table, multiplier],
    operation: '×'
  };
}

function generateSquareRoot() {
  // Perfect squares from 1 to 100
  const perfectSquares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100];
  const square = perfectSquares[randomInt(0, perfectSquares.length - 1)];
  return {
    display: `√${square} = ?`,
    answer: Math.sqrt(square),
    operands: [square],
    operation: '√'
  };
}

function generateExponent(customSettings = {}) {
  const startValue = customSettings.startValue || 2;
  const endValue = customSettings.endValue || 10;
  const exponentOf = customSettings.exponentOf || randomInt(2, 4);

  const base = randomInt(startValue, endValue);
  return {
    display: `${base}^${exponentOf} = ?`,
    answer: Math.pow(base, exponentOf),
    operands: [base, exponentOf],
    operation: '^'
  };
}

function generateMemoryTraining(range) {
  const length = randomInt(3, 6);
  const numbers = Array.from({ length }, () => randomInt(1, 9));
  const sum = numbers.reduce((a, b) => a + b, 0);
  return {
    display: `${numbers.join(' + ')} = ?`,
    answer: sum,
    operands: numbers,
    operation: 'memory'
  };
}

function generateMixed(range) {
  const operations = [
    () => generateAddition(range),
    () => generateSubtraction(range),
    () => generateMultiplication(range),
    () => generateDivision(range)
  ];
  const randomOp = operations[randomInt(0, operations.length - 1)];
  return randomOp();
}

export function checkAnswer(question, userAnswer) {
  return Math.abs(question.answer - userAnswer) < 0.0001;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(array) {
  return array[randomInt(0, array.length - 1)];
}