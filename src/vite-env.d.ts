/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly APP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
