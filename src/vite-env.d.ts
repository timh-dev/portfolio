/// <reference types="vite/client" />

declare module '*.md?raw' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_DISPLAY_NAME?: string;
  readonly VITE_INITIALS?: string;
  readonly VITE_EMAIL?: string;
  readonly VITE_GITHUB_URL?: string;
  readonly VITE_LINKEDIN_URL?: string;
  readonly VITE_TWITTER_URL?: string;
  readonly VITE_ROLE?: string;
  readonly VITE_LOCATION?: string;
  readonly VITE_LAYOUT?: string;
  readonly VITE_HERO_SKETCH?: string;
  readonly VITE_AVAILABILITY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
