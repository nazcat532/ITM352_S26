/**
 * Utility to manage application parameters from URL, LocalStorage, or Environment Variables.
 */

const isNode = typeof window === 'undefined';

// Mock localStorage for SSR/Node environments to prevent crashes
const storage = !isNode 
  ? window.localStorage 
  : {
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
    };

const toSnakeCase = (str: string) => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

interface ParamOptions {
  defaultValue?: string;
  removeFromUrl?: boolean;
}

const getAppParamValue = (paramName: string, { defaultValue, removeFromUrl = false }: ParamOptions = {}) => {
  if (isNode) return defaultValue || null;

  const storageKey = `base44_${toSnakeCase(paramName)}`;
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get(paramName);

  if (removeFromUrl && searchParam) {
    urlParams.delete(paramName);
    const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}${window.location.hash}`;
    window.history.replaceState({}, document.title, newUrl);
  }

  if (searchParam) {
    storage.setItem(storageKey, searchParam);
    return searchParam;
  }

  const storedValue = storage.getItem(storageKey);
  if (storedValue) return storedValue;

  if (defaultValue) {
    storage.setItem(storageKey, defaultValue);
    return defaultValue;
  }

  return null;
}

const getAppParams = () => {
  // Clear security tokens if explicitly requested via URL
  if (getAppParamValue("clear_access_token") === 'true') {
    storage.removeItem('base44_access_token');
    storage.removeItem('token');
  }

  return {
    appId: getAppParamValue("app_id", { 
      defaultValue: import.meta.env.VITE_BASE44_APP_ID 
    }),
    token: getAppParamValue("access_token", { 
      removeFromUrl: true 
    }),
    fromUrl: getAppParamValue("from_url", { 
      defaultValue: !isNode ? window.location.href : "" 
    }),
    functionsVersion: getAppParamValue("functions_version", { 
      defaultValue: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION 
    }),
    appBaseUrl: getAppParamValue("app_base_url", { 
      defaultValue: import.meta.env.VITE_BASE44_APP_BASE_URL 
    }),
  }
}

export const appParams = getAppParams();