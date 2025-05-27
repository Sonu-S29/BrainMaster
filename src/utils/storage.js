
const STORAGE_KEYS = {
  SETTINGS: 'mathWorkout_settings',
  SCORES: 'mathWorkout_scores',
  PROGRESS: 'mathWorkout_progress'
};

export function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    const defaultSettings = {
      difficulty: 'medium',
      questionCount: 20,
      keypadType: 'calculator',
      soundEnabled: true,
      language: 'en'
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(defaultSettings));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SCORES)) {
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify({}));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PROGRESS)) {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify([]));
  }
}

export function getSettings() {
  try {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : null;
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

export function saveScore(module, scoreData) {
  try {
    const scores = JSON.parse(localStorage.getItem(STORAGE_KEYS.SCORES) || '{}');
    
    if (!scores[module]) {
      scores[module] = [];
    }
    
    scores[module].push(scoreData);
    
    // Keep only last 50 scores per module
    if (scores[module].length > 50) {
      scores[module] = scores[module].slice(-50);
    }
    
    localStorage.setItem(STORAGE_KEYS.SCORES, JSON.stringify(scores));
    
    // Also save to progress data
    const progress = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) || '[]');
    progress.push({
      module,
      ...scoreData
    });
    
    // Keep only last 100 progress entries
    if (progress.length > 100) {
      progress.splice(0, progress.length - 100);
    }
    
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving score:', error);
  }
}

export function getHighScores() {
  try {
    const scores = JSON.parse(localStorage.getItem(STORAGE_KEYS.SCORES) || '{}');
    const highScores = {};
    
    Object.entries(scores).forEach(([module, moduleScores]) => {
      if (moduleScores.length > 0) {
        highScores[module] = moduleScores.reduce((best, current) => 
          current.accuracy > best.accuracy ? current : best
        );
      }
    });
    
    return highScores;
  } catch (error) {
    console.error('Error loading high scores:', error);
    return {};
  }
}

export function getProgressData() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROGRESS) || '[]');
  } catch (error) {
    console.error('Error loading progress data:', error);
    return [];
  }
}

export function getModuleStats(module) {
  try {
    const scores = JSON.parse(localStorage.getItem(STORAGE_KEYS.SCORES) || '{}');
    const moduleScores = scores[module] || [];
    
    if (moduleScores.length === 0) return null;
    
    const totalSessions = moduleScores.length;
    const averageAccuracy = moduleScores.reduce((sum, score) => sum + score.accuracy, 0) / totalSessions;
    const bestScore = moduleScores.reduce((best, current) => 
      current.accuracy > best.accuracy ? current : best
    );
    
    return {
      totalSessions,
      averageAccuracy: Math.round(averageAccuracy),
      bestScore
    };
  } catch (error) {
    console.error('Error loading module stats:', error);
    return null;
  }
}
