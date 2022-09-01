



interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_MODE_NAME: string,
  readonly VITE_SOCKET_URL: string,
  readonly VITE_FINGERPRINT_KEY: string,
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
