
import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Keypad from './Keypad';
import Results from './Results';
import { generateQuestion, checkAnswer } from '../utils/mathUtils';
import { saveScore } from '../utils/storage';

function PracticeModule({ module, settings, onBack }) {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [startTime, setStartTime] = useState(Date.now());
  const [isComplete, setIsComplete] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showCustomInputs, setShowCustomInputs] = useState(false);
  const [customSettings, setCustomSettings] = useState({
    tableOf: 2,
    showTill: 10,
    startValue: 1,
    endValue: 10,
    exponentOf: 2
  });

  useEffect(() => {
    // Show custom inputs for specific modules
    if (['multiplicationTables', 'squareRoots', 'exponentsPractice'].includes(module.id)) {
      setShowCustomInputs(true);
    } else {
      setShowCustomInputs(false);
      generateNewQuestion();
      setStartTime(Date.now());
    }
  }, [module]);

  const generateNewQuestion = useCallback(() => {
    const question = generateQuestion(module.id, settings.difficulty, customSettings);
    setCurrentQuestion(question);
  }, [module, settings.difficulty, customSettings]);

  const handleStartPractice = () => {
    setShowCustomInputs(false);
    generateNewQuestion();
    setStartTime(Date.now());
  };

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const isCorrect = checkAnswer(currentQuestion, parseFloat(userAnswer));
    
    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      if (settings.soundEnabled) {
        // Play success sound
      }
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      if (settings.soundEnabled) {
        // Play error sound
      }
    }

    const nextIndex = questionIndex + 1;
    if (nextIndex >= settings.questionCount) {
      setIsComplete(true);
      const endTime = Date.now();
      const totalTime = Math.round((endTime - startTime) / 1000);
      const accuracy = Math.round((score.correct + (isCorrect ? 1 : 0)) / settings.questionCount * 100);
      
      saveScore(module.id, {
        score: score.correct + (isCorrect ? 1 : 0),
        total: settings.questionCount,
        accuracy,
        time: totalTime,
        difficulty: settings.difficulty,
        date: new Date().toISOString()
      });
      
      setTimeout(() => setShowResults(true), 1000);
    } else {
      setQuestionIndex(nextIndex);
      setUserAnswer('');
      generateNewQuestion();
    }
  };

  const handleKeypadInput = (value) => {
    if (value === 'clear') {
      setUserAnswer('');
    } else if (value === 'backspace') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else {
      setUserAnswer(prev => prev + value);
    }
  };

  const handleRestart = () => {
    setQuestionIndex(0);
    setScore({ correct: 0, incorrect: 0 });
    setUserAnswer('');
    setIsComplete(false);
    setShowResults(false);
    setStartTime(Date.now());
    generateNewQuestion();
  };

  if (showResults) {
    return (
      <Results
        score={score}
        totalQuestions={settings.questionCount}
        timeElapsed={Math.round((Date.now() - startTime) / 1000)}
        module={module}
        onRestart={handleRestart}
        onBack={onBack}
      />
    );
  }

  if (showCustomInputs) {
    return (
      <div className="practice-module">
        <div className="practice-header">
          <button className="back-button" onClick={onBack}>
            ← {t('back')}
          </button>
          <h2>{module.title}</h2>
        </div>

        <div className="module-inputs">
          {module.id === 'multiplicationTables' && (
            <>
              <div className="input-group">
                <label>Table of:</label>
                <input
                  type="number"
                  className="module-input"
                  value={customSettings.tableOf}
                  onChange={(e) => setCustomSettings(prev => ({
                    ...prev,
                    tableOf: parseInt(e.target.value) || 2
                  }))}
                  min="1"
                  max="20"
                />
              </div>
              <div className="input-group">
                <label>Show table till:</label>
                <select
                  className="module-input"
                  value={customSettings.showTill}
                  onChange={(e) => setCustomSettings(prev => ({
                    ...prev,
                    showTill: parseInt(e.target.value)
                  }))}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={40}>40</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </>
          )}

          {module.id === 'squareRoots' && (
            <div className="input-group">
              <label>Square roots from 1 to 100</label>
              <p>Practice square roots of perfect squares from 1 to 100</p>
            </div>
          )}

          {module.id === 'exponentsPractice' && (
            <>
              <div className="input-group">
                <label>Starting value:</label>
                <input
                  type="number"
                  className="module-input"
                  value={customSettings.startValue}
                  onChange={(e) => setCustomSettings(prev => ({
                    ...prev,
                    startValue: parseInt(e.target.value) || 1
                  }))}
                  min="1"
                  max="20"
                />
              </div>
              <div className="input-group">
                <label>Ending value:</label>
                <input
                  type="number"
                  className="module-input"
                  value={customSettings.endValue}
                  onChange={(e) => setCustomSettings(prev => ({
                    ...prev,
                    endValue: parseInt(e.target.value) || 10
                  }))}
                  min="1"
                  max="20"
                />
              </div>
              <div className="input-group">
                <label>Exponent of:</label>
                <input
                  type="number"
                  className="module-input"
                  value={customSettings.exponentOf}
                  onChange={(e) => setCustomSettings(prev => ({
                    ...prev,
                    exponentOf: parseInt(e.target.value) || 2
                  }))}
                  min="2"
                  max="5"
                />
              </div>
            </>
          )}
        </div>

        <button className="start-practice-button" onClick={handleStartPractice}>
          Start Practice
        </button>
      </div>
    );
  }

  return (
    <div className="practice-module">
      <div className="practice-header">
        <button className="back-button" onClick={onBack}>
          ← {t('back')}
        </button>
        <div className="progress-info">
          <span>{t('question')} {questionIndex + 1}/{settings.questionCount}</span>
          <span>{t('score')}: {score.correct}/{questionIndex}</span>
        </div>
      </div>

      {currentQuestion && (
        <>
          <div className="question-display">
            {currentQuestion.display}
          </div>

          <input
            type="text"
            className="answer-input"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder={t('enterAnswer')}
            autoFocus
          />

          <Keypad
            type={settings.keypadType}
            onInput={handleKeypadInput}
          />

          <button
            className="submit-button"
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
          >
            {t('submit')}
          </button>
        </>
      )}
    </div>
  );
}

export default PracticeModule;
