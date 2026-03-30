/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DISPLAY_NAME?: string;
  readonly VITE_INITIALS?: string;
  readonly VITE_EMAIL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_ROLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
