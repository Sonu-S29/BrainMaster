
import React from 'react';
import { useTranslation } from 'react-i18next';

function Settings({ settings, onSettingsChange, onBack }) {
  const { t, i18n } = useTranslation();

  const handleChange = (key, value) => {
    const newSettings = { ...settings, [key]: value };
    onSettingsChange(newSettings);
    
    if (key === 'language') {
      i18n.changeLanguage(value);
    }
  };

  return (
    <div className="settings">
      <div className="practice-header">
        <button className="back-button" onClick={onBack}>
          ← {t('back')}
        </button>
        <h2>{t('settings')}</h2>
        <div></div>
      </div>

      <div className="settings-group">
        <label>{t('difficulty')}</label>
        <select
          value={settings.difficulty}
          onChange={(e) => handleChange('difficulty', e.target.value)}
        >
          <option value="easy">{t('difficulties.easy')}</option>
          <option value="medium">{t('difficulties.medium')}</option>
          <option value="hard">{t('difficulties.hard')}</option>
          <option value="expert">{t('difficulties.expert')}</option>
        </select>
      </div>

      <div className="settings-group">
        <label>{t('numberOfQuestions')}</label>
        <select
          value={settings.questionCount}
          onChange={(e) => handleChange('questionCount', parseInt(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={40}>40</option>
        </select>
      </div>

      <div className="settings-group">
        <label>{t('keypadType')}</label>
        <select
          value={settings.keypadType}
          onChange={(e) => handleChange('keypadType', e.target.value)}
        >
          <option value="calculator">{t('keypadTypes.calculator')}</option>
          <option value="phone">{t('keypadTypes.phone')}</option>
        </select>
      </div>

      <div className="settings-group">
        <label>{t('language')}</label>
        <select
          value={settings.language}
          onChange={(e) => handleChange('language', e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="ru">Русский</option>
          <option value="zh">中文</option>
          <option value="hi">हिन्दी</option>
          <option value="hy">Հայերեն</option>
        </select>
      </div>

      <div className="settings-group">
        <div className="checkbox-group">
          <input
            type="checkbox"
            id="sound"
            checked={settings.soundEnabled}
            onChange={(e) => handleChange('soundEnabled', e.target.checked)}
          />
          <label htmlFor="sound">{t('enableSound')}</label>
        </div>
      </div>
    </div>
  );
}

export default Settings;
