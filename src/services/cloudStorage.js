// Calori Cloud Data Storage & Sync Service
import { saveUserLogsToFirebase } from './firebase';

const STORAGE_KEYS = {
  LOGS: 'calori_logs_v2', // bumped key to ensure previous demo logs in v1 are wiped clean!
  TARGETS: 'calori_targets_v1',
  SESSION_ID: 'calori_cloud_session_id',
  CUSTOM_FOODS: 'calori_custom_foods_v1'
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

// Saved Custom Foods manager
export const loadSavedCustomFoods = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_FOODS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
};

export const saveCustomFoodItem = (newFood) => {
  try {
    const existing = loadSavedCustomFoods();
    const updated = [newFood, ...existing];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FOODS, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error saving custom food:', err);
    return [];
  }
};

// Initial empty logs structure for real user usage
export const getInitialEmptyLogs = () => {
  return {};
};

// Local & Cloud storage manager
export const loadAllLogs = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (!raw) {
      const empty = getInitialEmptyLogs();
      localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(empty));
      return empty;
    }
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error('Error loading local logs:', err);
    return getInitialEmptyLogs();
  }
};

export const clearAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.LOGS);
  localStorage.removeItem('calori_logs_v1');
  return getInitialEmptyLogs();
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

// Cloud API Sync service (Firebase Firestore + Local fallback)
export const syncWithCloudServer = async (allLogs) => {
  const sessionId = getCloudSessionId();
  try {
    const payload = {
      sessionId,
      updatedAt: new Date().toISOString(),
      logs: allLogs,
      targets: loadTargets()
    };
    
    // 1. Local & Session persistence snapshot
    localStorage.setItem(`calori_cloud_remote_${sessionId}`, JSON.stringify(payload));

    // 2. Firebase Firestore cloud document push
    const fbRes = await saveUserLogsToFirebase(sessionId, allLogs, loadTargets());

    return { success: true, timestamp: payload.updatedAt, sessionId, mode: fbRes.mode };
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
