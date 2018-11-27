# tab-switcher-ext

Extension built with the [ts-webext-skeleton](https://github.com/DannyHinshaw/ts-webext-skeleton)

Listens for commands to switch tabs in curent active window to the right.

Trigger with `window.postMessage`:

```typescript
window.postMessage({ to: "TAB_SWITCHER", switch: true }, "*");
```
