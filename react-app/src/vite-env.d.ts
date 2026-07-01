/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the review API server. Empty = local-storage demo mode. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
