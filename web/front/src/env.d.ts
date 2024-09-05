/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_POST: string;
  readonly VITE_STATIC_PATH: string;
  readonly VITE_SITE_KEY: string;
  readonly VITE_GITHUB_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
