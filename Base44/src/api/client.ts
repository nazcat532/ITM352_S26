// src/api/client.ts
import { createClient } from '@your-provider/sdk'; // Update the package name
import { appParams } from '@/lib/app-params';

const { appId, token, functionsVersion, appBaseUrl } = appParams;

// Initialize the API client for the application
export const api = createClient({
  appId,
  token,
  functionsVersion,
  serverUrl: '',
  requiresAuth: false,
  appBaseUrl
});