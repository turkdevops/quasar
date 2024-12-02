---
title: Supporting TypeScript
desc: (@quasar/app-vite) How to enable support for TypeScript in a Quasar app.
related:
  - /quasar-cli-vite/quasar-config-file
---

If you didn't select TypeScript support when creating your project, you can still add it later. This guide will show you how to add TypeScript support to your existing JavaScript-based Quasar project.

::: tip
If you selected TypeScript support when creating your project, you can skip this guide.
:::

## Installation of TypeScript Support

Install the `typescript` package:

```tabs
<<| bash Yarn |>>
$ yarn add --dev typescript@~5.5.3
<<| bash NPM |>>
$ npm install --save-dev typescript@~5.5.3
<<| bash PNPM |>>
$ pnpm add -D typescript@~5.5.3
<<| bash Bun |>>
$ bun add --dev typescript@~5.5.3
```

Then, create `/tsconfig.json` file at the root of you project with this content:

```json /tsconfig.json
{
  "extends": "./.quasar/tsconfig.json"
}
```

Run `$ quasar prepare` in the root of your project folder.

Now you can start using TypeScript into your project. Note that some IDEs might require a restart for the new setup to fully kick in.

::: tip
Remember that you must change the extension of your JavaScript files to `.ts` to be allowed to write TypeScript code inside them. To use TypeScript in Vue files, you must update the script tag to include the `lang="ts"` attribute, like `<script lang="ts">` or `<script setup lang="ts">`
:::

::: warning
If you forget to add the `tsconfig.json` file, the application will break at compile time!
:::

### Linting setup

You might want to check the requirements for it [here](/quasar-cli-vite/linter).

### TypeScript Declaration Files

If you chose TypeScript support when scaffolding the project, the following declaration file was automatically scaffolded for you. If TypeScript support wasn't enabled during project creation, create it:

```ts /src/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    // Define any custom env variables you have here, if you wish
  }
}
```

See the following sections for the features and build modes you are using.

#### Pinia

If you are using [Pinia](/quasar-cli-vite/state-management-with-pinia), add the section below to your project. Quasar CLI provides the `router` property, you may need to add more global properties if you have them.

```ts /src/stores/index.ts
import type { Router } from 'vue-router';

/*
 * When adding new properties to stores, you should also
 * extend the `PiniaCustomProperties` interface.
 * @see https://pinia.vuejs.org/core-concepts/plugins.html#typing-new-store-properties
 */
declare module 'pinia' {
  export interface PiniaCustomProperties {
    readonly router: Router;
  }
}
```

#### PWA mode

If you are using [PWA mode](/quasar-cli-vite/developing-pwa/introduction), make the following modifications to your project, and create any files that do not exist:

```ts /src-pwa/pwa-env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    SERVICE_WORKER_FILE: string;
    PWA_FALLBACK_HTML: string;
    PWA_SERVICE_WORKER_REGEX: string;
  }
}
```

```ts /src-pwa/custom-service-worker.ts
// at the top of the file
declare const self: ServiceWorkerGlobalScope &
  typeof globalThis & { skipWaiting: () => void };
```

```json /src-pwa/tsconfig.json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "lib": ["WebWorker", "ESNext"]
  },
  "include": ["*.ts", "*.d.ts"]
}
```

#### Electron mode

If you are using [Electron mode](/quasar-cli-vite/developing-electron-apps/introduction), add the section below to your project.

```ts /src-electron/electron-env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    QUASAR_PUBLIC_FOLDER: string;
    QUASAR_ELECTRON_PRELOAD_FOLDER: string;
    QUASAR_ELECTRON_PRELOAD_EXTENSION: string;
    APP_URL: string;
  }
}
```

#### BEX mode

If you are using [BEX mode](/quasar-cli-vite/developing-browser-extensions/introduction), add the section below to your project. You may need to adjust it to your needs depending on the events you are using. The key is the event name, the value is a tuple where the first element is the input and the second is the output type.

```ts /src-bex/background.ts
declare module '@quasar/app-vite' {
  interface BexEventMap {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    log: [{ message: string; data?: any[] }, never];
    getTime: [never, number];

    'storage.get': [{ key: string | null }, any];
    'storage.set': [{ key: string; value: any }, any];
    'storage.remove': [{ key: string }, any];
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}
```

You'll also need this in every content script file:

```ts /src-bex/my-content-script.ts
declare module '@quasar/app-vite' {
  interface BexEventMap {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    'some.event': [{ someProp: string }, void];
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}
```
