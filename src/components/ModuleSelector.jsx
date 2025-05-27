
import React from 'react';
import { useTranslation } from 'react-i18next';

const mainModules = [
  { 
    id: 'additionSubtraction', 
    title: 'Addition & Subtraction',
    description: 'Master the fundamentals',
    icon: '+',
    iconClass: 'addition',
    progress: 87,
    bestTime: '2.1s',
    stars: 3
  },
  { 
    id: 'multiplicationDivision', 
    title: 'Multiplication & Division',
    description: 'Master the fundamentals',
    icon: '×',
    iconClass: 'multiplication',
    progress: 87,
    bestTime: '2.1s',
    stars: 3
  },
  { 
    id: 'squareRoots', 
    title: 'Square Roots',
    description: 'Master the fundamentals',
    icon: '√',
    iconClass: 'squares',
    progress: 87,
    bestTime: '2.1s',
    stars: 3
  },
  { 
    id: 'exponents', 
    title: 'Exponents',
    description: 'Master the fundamentals',
    icon: 'x²',
    iconClass: 'exponents',
    progress: 87,
    bestTime: '2.1s',
    stars: 3
  }
];

const individualModules = [
  { 
    id: 'addition', 
    title: 'Addition Only',
    description: 'Focus practice',
    icon: '+',
    iconClass: 'addition'
  },
  { 
    id: 'subtraction', 
    title: 'Subtraction Only',
    description: 'Focus practice',
    icon: '−',
    iconClass: 'subtraction'
  },
  { 
    id: 'multiplication', 
    title: 'Multiplication Only',
    description: 'Focus practice',
    icon: '×',
    iconClass: 'multiplication'
  },
  { 
    id: 'division', 
    title: 'Division Only',
    description: 'Focus practice',
    icon: '÷',
    iconClass: 'division'
  },
  { 
    id: 'exponentsPractice', 
    title: 'Exponents Only',
    description: 'Focus practice',
    icon: 'x²',
    iconClass: 'exponents'
  },
  { 
    id: 'multiplicationTables', 
    title: 'Times Tables',
    description: 'Custom practice',
    icon: '📊',
    iconClass: 'tables'
  }
];

function ModuleSelector({ onModuleSelect, onSettingsClick, onProgressClick }) {
  const { t } = useTranslation();

  const renderStars = (count) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span key={i} className={`star ${i < count ? 'filled' : ''}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="module-selector">
      <div className="nav-buttons">
        <button className="nav-button" onClick={onSettingsClick}>
          ⚙️ {t('settings')}
        </button>
        <button className="nav-button" onClick={onProgressClick}>
          📊 {t('progress')}
        </button>
      </div>
      
      <div className="modules-grid">
        {mainModules.map((module) => (
          <div
            key={module.id}
            className="module-card"
            onClick={() => onModuleSelect(module)}
          >
            <div className="module-card-header">
              <div className={`module-icon ${module.iconClass}`}>
                {module.icon}
              </div>
              <div className="module-stars">
                {renderStars(module.stars)}
              </div>
            </div>
            <h3 className="module-title">{module.title}</h3>
            <p className="module-description">{module.description}</p>
            <div className="module-stats">
              <span>Progress: {module.progress}%</span>
              <span>Best: {module.bestTime}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="individual-operations">
        <h2>Individual Operations</h2>
        <div className="individual-grid">
          {individualModules.map((module) => (
            <div
              key={module.id}
              className="individual-card"
              onClick={() => onModuleSelect(module)}
            >
              <div className={`individual-icon ${module.iconClass}`}>
                {module.icon}
              </div>
              <div className="individual-content">
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModuleSelector;
