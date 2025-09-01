// client/src/vite-env.d.ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_IMG_ORIGIN: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}