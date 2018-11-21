# tab-switcher-ext

Extension built with the [ts-webext-skeleton](https://github.com/DannyHinshaw/ts-webext-skeleton)

Listens for commands to switch tabs in curent active window to left or right.

Trigger with `window.postMessage`:

```typescript
const data = { to: "TAB_SWITCHER", direction: "right" };
window.postMessage(data, "*");
```
