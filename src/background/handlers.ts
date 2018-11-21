import Tab = browser.tabs.Tab;


/**
 * Retrieves the next tabs in order (if exists).
 * @param {browser.tabs.Tab[]} tabs
 * @param {number} i
 * @returns {number}
 */
const getNextTab = (tabs: Tab[], i: number): number => {
	const nextTab: Tab = tabs[i + 1];
	if (i === (tabs.length - 1)) {
		// @ts-ignore
		return tabs[0].id
	} else if (nextTab) {
		// @ts-ignore
		return nextTab.id
	}

	// @ts-ignore
	return tabs[i].id;
};

/**
 * Iterates through the list of tabs in a window to activate.
 * @param {browser.tabs.Tab[]} tabs
 * @returns {boolean}
 */
const selectTab = (tabs: Tab[]): boolean => {
	return tabs.some((tab: Tab, i: number) => {
		if (tab.active) {
			const nextTabId: number = getNextTab(tabs, i);
			browser.tabs.update(nextTabId, { active: true })
				.then((res) => console.log("Tab Switch success::res::", res))
				.catch(console.error);
		}

		return tab.active;
	});
};

/**
 * Main export, wraps tab switching functions with error handling.
 * @returns {Promise<boolean>}
 */
export const handleQueryTabs = () => {
	return browser.tabs.query({ currentWindow: true })
		.then(selectTab)
		.catch(console.error);
};
