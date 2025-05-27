
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getProgressData, getHighScores } from '../utils/storage';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Progress({ onBack }) {
  const { t } = useTranslation();
  const [progressData, setProgressData] = useState([]);
  const [highScores, setHighScores] = useState({});
  const [selectedModule, setSelectedModule] = useState('all');

  useEffect(() => {
    setProgressData(getProgressData());
    setHighScores(getHighScores());
  }, []);

  const getChartData = () => {
    const filteredData = selectedModule === 'all' 
      ? progressData 
      : progressData.filter(d => d.module === selectedModule);

    return {
      labels: filteredData.map(d => new Date(d.date).toLocaleDateString()),
      datasets: [
        {
          label: t('accuracy') + ' (%)',
          data: filteredData.map(d => d.accuracy),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: t('progressChart'),
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  const totalSessions = progressData.length;
  const averageAccuracy = progressData.length > 0 
    ? Math.round(progressData.reduce((sum, d) => sum + d.accuracy, 0) / progressData.length)
    : 0;
  const totalTime = Math.round(progressData.reduce((sum, d) => sum + d.time, 0) / 60);

  return (
    <div className="progress">
      <div className="practice-header">
        <button className="back-button" onClick={onBack}>
          ← {t('back')}
        </button>
        <h2>{t('progress')}</h2>
        <div></div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{totalSessions}</div>
          <div className="stat-label">{t('totalSessions')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{averageAccuracy}%</div>
          <div className="stat-label">{t('averageAccuracy')}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalTime}</div>
          <div className="stat-label">{t('totalMinutes')}</div>
        </div>
      </div>

      <div className="settings-group">
        <label>{t('filterByModule')}</label>
        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
        >
          <option value="all">{t('allModules')}</option>
          <option value="addition">{t('modules.addition.title')}</option>
          <option value="subtraction">{t('modules.subtraction.title')}</option>
          <option value="multiplication">{t('modules.multiplication.title')}</option>
          <option value="division">{t('modules.division.title')}</option>
        </select>
      </div>

      {progressData.length > 0 && (
        <div className="chart-container">
          <Line data={getChartData()} options={chartOptions} />
        </div>
      )}

      <h3>{t('highScores')}</h3>
      <div className="stats-grid">
        {Object.entries(highScores).map(([module, score]) => (
          <div key={module} className="stat-card">
            <div className="stat-value">{score.accuracy}%</div>
            <div className="stat-label">{t(`modules.${module}.title`)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Progress;
