
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

  const generateNewQuestion = useCallback(() => {
    const question = generateQuestion(module.type || module.id, settings.difficulty);
    setCurrentQuestion(question);
  }, [module, settings.difficulty]);

  useEffect(() => {
    generateNewQuestion();
    setStartTime(Date.now());
  }, [generateNewQuestion]);

  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const isCorrect = checkAnswer(currentQuestion, parseFloat(userAnswer));
    
    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      if (settings.soundEnabled) {
        // Play success sound (you can implement this)
      }
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      if (settings.soundEnabled) {
        // Play error sound (you can implement this)
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
