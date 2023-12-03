export const UNIQUE_PREFIX = (window as any)._env_
  ? (window as any)._env_.UNIQUE_PREFIX
  : process.env.UNIQUE_PREFIX || 'gemline-ss';
