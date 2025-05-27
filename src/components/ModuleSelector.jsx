
import React from 'react';
import { useTranslation } from 'react-i18next';

const modules = [
  { id: 'addition', icon: '➕', type: 'basic' },
  { id: 'subtraction', icon: '➖', type: 'basic' },
  { id: 'multiplication', icon: '✖️', type: 'basic' },
  { id: 'division', icon: '➗', type: 'basic' },
  { id: 'multiplicationTables', icon: '📊', type: 'tables' },
  { id: 'squareRoots', icon: '√', type: 'advanced' },
  { id: 'exponents', icon: 'x²', type: 'advanced' },
  { id: 'memoryTraining', icon: '🧠', type: 'memory' },
  { id: 'mixedOperations', icon: '🔀', type: 'mixed' }
];

function ModuleSelector({ onModuleSelect, onSettingsClick, onProgressClick }) {
  const { t } = useTranslation();

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
        {modules.map((module) => (
          <button
            key={module.id}
            className="module-card"
            onClick={() => onModuleSelect(module)}
          >
            <div className="module-icon">{module.icon}</div>
            <h3 className="module-title">{t(`modules.${module.id}.title`)}</h3>
            <p className="module-description">{t(`modules.${module.id}.description`)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ModuleSelector;
