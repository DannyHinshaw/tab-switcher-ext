import Port = browser.runtime.Port;
import { EXTENSION_NAME, IMessageObject } from "../index";
import { handleQueryTabs } from "./handlers";


/*     Types & Interfaces
 =================================== */

export interface IPortsHash {
	[key: string]: Port
}

export interface IBGMessageFlags {
	DATA_SENT: boolean
}

/*      Messaging Ports Configuration
 ========================================== */

export const EVENT_FLAGS: IBGMessageFlags = {
	DATA_SENT: false
};

const ports: IPortsHash = {};


/**
 * Add message handlers to ports.
 * @param {browser.runtime.Port} p
 */
const registerMessageHandlers = (p: Port) => {
	p.onMessage.addListener((msgObj: IMessageObject) => {
		console.log("background::msgObj::", msgObj);

		const isSwitchCommand: boolean = msgObj.switch && msgObj.to === EXTENSION_NAME;
		if (isSwitchCommand) {
			handleQueryTabs().then((res) => {
				console.log("Finished tab query::res::", res);
			}).catch(console.error);
		}
	});

	p.onDisconnect.addListener((port: Port) => {
		if (port.error) {
			// @ts-ignore
			console.log(`Disconnected due to an error: ${port.error.message}`);
		}
	});

	return p;
};

/**
 * Register content-script ports and assign listeners.
 * @param {browser.runtime.Port} p
 * @returns {IPortsHash}
 */
export const createPort = (p: Port): Port => {
	if (p && p.sender && p.sender.tab && p.sender.tab.id) {
		ports[p.sender.tab.id] = p;

		return registerMessageHandlers(ports[p.sender.tab.id]);
	}

	return p;
};
