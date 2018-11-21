import { EXTENSION_NAME, IMessageObject } from "../index";
import {contentPort} from "./message";


// Add listener for switch commands in window messages
window.addEventListener("message", (message: MessageEvent) => {
	const data = message.data as IMessageObject;
	const isSwitch = data && data.switch && data.to && data.to === EXTENSION_NAME;
	if (isSwitch) {
		contentPort.postMessage(data)
	}
});
