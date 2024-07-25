/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_POST: string;
  readonly VITE_STATIC_PATH: string;
  readonly VITE_SITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
