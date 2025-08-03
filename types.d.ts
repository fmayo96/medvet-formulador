interface Window {
  electron: { hi: (data) => Promise<string> }
}

type EventPayloadMapping = {
  hi: string
}
