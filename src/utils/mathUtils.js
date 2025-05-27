
export function generateQuestion(type, difficulty) {
  const ranges = {
    easy: { min: 1, max: 10 },
    medium: { min: 1, max: 50 },
    hard: { min: 1, max: 100 },
    expert: { min: 1, max: 500 }
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
      return generateMultiplicationTable();
    case 'squareRoots':
      return generateSquareRoot(range);
    case 'exponents':
      return generateExponent(range);
    case 'memoryTraining':
      return generateMemoryTraining(range);
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

function generateMultiplicationTable() {
  const table = randomInt(2, 12);
  const multiplier = randomInt(1, 12);
  return {
    display: `${table} × ${multiplier} = ?`,
    answer: table * multiplier,
    operands: [table, multiplier],
    operation: '×'
  };
}

function generateSquareRoot(range) {
  const perfectSquares = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225];
  const square = perfectSquares[randomInt(0, perfectSquares.length - 1)];
  return {
    display: `√${square} = ?`,
    answer: Math.sqrt(square),
    operands: [square],
    operation: '√'
  };
}

function generateExponent(range) {
  const base = randomInt(2, 10);
  const exponent = randomInt(2, 4);
  return {
    display: `${base}^${exponent} = ?`,
    answer: Math.pow(base, exponent),
    operands: [base, exponent],
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
  const operations = ['addition', 'subtraction', 'multiplication', 'division'];
  const randomOp = operations[randomInt(0, operations.length - 1)];
  return generateQuestion(randomOp, 'medium');
}

export function checkAnswer(question, userAnswer) {
  return Math.abs(question.answer - userAnswer) < 0.0001;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
