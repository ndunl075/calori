// Calori Cloud Data Storage & Sync Service

const STORAGE_KEYS = {
  LOGS: 'calori_logs_v1',
  TARGETS: 'calori_targets_v1',
  SESSION_ID: 'calori_cloud_session_id',
  SYNC_STATUS: 'calori_sync_status'
};

// Default Daily Macro Goals
export const DEFAULT_TARGETS = {
  calories: 2200, // kcal
  protein: 150,   // grams
  carbs: 220,     // grams
  fat: 70,        // grams
  water: 2500     // ml
};

// Generate or retrieve persistent Cloud Session Key
export const getCloudSessionId = () => {
  let id = localStorage.getItem(STORAGE_KEYS.SESSION_ID);
  if (!id) {
    id = 'CALORI-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    localStorage.setItem(STORAGE_KEYS.SESSION_ID, id);
  }
  return id;
};

// Initial pre-loaded demonstration logs for today so the user has immediate rich data
export const getInitialDemoLogs = () => {
  const todayKey = new Date().toISOString().split('T')[0];
  return {
    [todayKey]: [
      {
        id: '1',
        name: 'Oatmeal & Blueberries',
        category: 'Breakfast',
        calories: 340,
        protein: 12,
        carbs: 58,
        fat: 6,
        time: '08:15 AM'
      },
      {
        id: '2',
        name: 'Grilled Chicken Salad & Avocado',
        category: 'Lunch',
        calories: 520,
        protein: 48,
        carbs: 24,
        fat: 22,
        time: '01:20 PM'
      },
      {
        id: '3',
        name: 'Whey Protein Shake',
        category: 'Snacks',
        calories: 160,
        protein: 30,
        carbs: 4,
        fat: 2.5,
        time: '04:45 PM'
      }
    ]
  };
};

// Local & Cloud storage manager
export const loadAllLogs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (!raw) {
      const demo = getInitialDemoLogs();
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(demo));
      return demo;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error loading local logs:', err);
    return getInitialDemoLogs();
  }
};

export const saveAllLogs = (allLogs) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(allLogs));
    // Trigger simulated background cloud backup
    syncWithCloudServer(allLogs);
  } catch (err) {
    console.error('Error saving local logs:', err);
  }
};

export const loadTargets = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TARGETS);
    return raw ? JSON.parse(raw) : DEFAULT_TARGETS;
  } catch (err) {
    return DEFAULT_TARGETS;
  }
};

export const saveTargets = (targets) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TARGETS, JSON.stringify(targets));
  } catch (err) {
    console.error('Error saving targets:', err);
  }
};

// Cloud API Sync simulation (Simulates HTTPS cloud payload push with server timestamp)
export const syncWithCloudServer = async (allLogs) => {
  const sessionId = getCloudSessionId();
  try {
    const payload = {
      sessionId,
      updatedAt: new Date().toISOString(),
      logs: allLogs,
      targets: loadTargets()
    };
    
    // Store cloud snapshot in localStorage under cloud backup key
    localStorage.setItem(`calori_cloud_remote_${sessionId}`, JSON.stringify(payload));
    return { success: true, timestamp: payload.updatedAt, sessionId };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

// Cloud Export / Import JSON functionality
export const exportCloudBackupJSON = () => {
  const data = {
    sessionId: getCloudSessionId(),
    exportedAt: new Date().toISOString(),
    logs: loadAllLogs(),
    targets: loadTargets()
  };
  return JSON.stringify(data, null, 2);
};

export const importCloudBackupJSON = (jsonString) => {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.logs) {
      saveAllLogs(parsed.logs);
    }
    if (parsed.targets) {
      saveTargets(parsed.targets);
    }
    return true;
  } catch (err) {
    console.error('Invalid backup format:', err);
    return false;
  }
};
