/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Where the tRPC server lives. Optional: without it the app talks to the
  // local server, which is what every developer wants by default.
  readonly VITE_TRPC_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
