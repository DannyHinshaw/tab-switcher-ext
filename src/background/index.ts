import { createPort } from "./message";


// Listen for message port connections
browser.runtime.onConnect.addListener(createPort);
