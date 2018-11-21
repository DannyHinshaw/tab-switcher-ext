import Port = browser.runtime.Port;


// Generate random uid for port
const uid: string = Math.random().toString(36).substring(5);
// @ts-ignore
export const contentPort: Port = browser.runtime.connect({ name: uid });
