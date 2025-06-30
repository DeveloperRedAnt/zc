import { Env } from './Env';

// Simple console-based logger without telemetry
export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (Env.NODE_ENV !== 'production') {
      // Use warn instead of info to comply with lint rules
      console.warn(`[INFO] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    console.error(`[ERROR] ${message}`, ...args);
  },
  warn: (message: string, ...args: unknown[]) => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  debug: (message: string, ...args: unknown[]) => {
    if (Env.NODE_ENV !== 'production') {
      // Use warn instead of debug to comply with lint rules
      console.warn(`[DEBUG] ${message}`, ...args);
    }
  },
};
