
import React from 'react';
import { useTranslation } from 'react-i18next';

function Results({ score, totalQuestions, timeElapsed, module, onRestart, onBack }) {
  const { t } = useTranslation();
  
  const accuracy = Math.round((score.correct / totalQuestions) * 100);
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return minutes > 0 ? `${minutes}m ${remainingSeconds}s` : `${remainingSeconds}s`;
  };

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return t('excellent');
    if (accuracy >= 80) return t('good');
    if (accuracy >= 70) return t('fair');
    return t('needsPractice');
  };

  return (
    <div className="results">
      <h2>{t('sessionComplete')}</h2>
      
      <div className="results-score">
        {accuracy}%
      </div>
      
      <p>{getPerformanceMessage()}</p>
      
      <div className="results-details">
        <div className="result-item">
          <div className="result-value">{score.correct}</div>
          <div className="result-label">{t('correct')}</div>
        </div>
        <div className="result-item">
          <div className="result-value">{score.incorrect}</div>
          <div className="result-label">{t('incorrect')}</div>
        </div>
        <div className="result-item">
          <div className="result-value">{formatTime(timeElapsed)}</div>
          <div className="result-label">{t('timeElapsed')}</div>
        </div>
        <div className="result-item">
          <div className="result-value">{Math.round(totalQuestions / (timeElapsed / 60))}</div>
          <div className="result-label">{t('questionsPerMinute')}</div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="action-button primary-button" onClick={onRestart}>
          {t('playAgain')}
        </button>
        <button className="action-button secondary-button" onClick={onBack}>
          {t('backToModules')}
        </button>
      </div>
    </div>
  );
}

export default Results;
