



interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_MODE_NAME: string,
  readonly VITE_SOCKET_URL: string,
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
