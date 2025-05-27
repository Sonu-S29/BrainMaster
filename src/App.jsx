
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import ModuleSelector from './components/ModuleSelector';
import PracticeModule from './components/PracticeModule';
import Settings from './components/Settings';
import Progress from './components/Progress';
import { initializeStorage, getSettings, saveSettings } from './utils/storage';
import './i18n/i18n';

function App() {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);
  const [settings, setSettings] = useState({
    difficulty: 'medium',
    questionCount: 20,
    keypadType: 'calculator',
    soundEnabled: true,
    language: 'en'
  });

  useEffect(() => {
    initializeStorage();
    const savedSettings = getSettings();
    if (savedSettings) {
      setSettings(savedSettings);
    }
  }, []);

  const handleSettingsChange = (newSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
    setCurrentView('practice');
  };

  const handleBack = () => {
    setCurrentView('home');
    setSelectedModule(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'settings':
        return (
          <Settings
            settings={settings}
            onSettingsChange={handleSettingsChange}
            onBack={handleBack}
          />
        );
      case 'progress':
        return <Progress onBack={handleBack} />;
      case 'practice':
        return (
          <PracticeModule
            module={selectedModule}
            settings={settings}
            onBack={handleBack}
          />
        );
      default:
        return (
          <ModuleSelector
            onModuleSelect={handleModuleSelect}
            onSettingsClick={() => setCurrentView('settings')}
            onProgressClick={() => setCurrentView('progress')}
          />
        );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>{t('appTitle')}</h1>
      </header>
      <main className="app-main">
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;
