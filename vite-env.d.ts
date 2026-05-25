/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NODE_ENV: 'development' | 'production' | 'test';
  readonly MODE: 'development' | 'production' | 'test';
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly BASE_URL: string;
  readonly VITE_PUBLIC_SITE_URL?: string;
  readonly VITE_VERIFY_ACCESS_URL?: string;
  readonly VITE_MAX_ACCESSIBLE_MODULE?: string;
  readonly VITE_MVP_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
