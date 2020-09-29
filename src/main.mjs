import { initializeServiceWorker } from "svelte-common";
import { redirectGuard, IteratorStoreRoute } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import App from "./App.svelte";

import { SymbolInternals, RustWasmBackend } from "@symatem/core";
import { SymatemQueryMixin } from "@symatem/query";

export const session = new Session(localStorage);
export const enshureSession = redirectGuard("/login", () => !session.isValid);

export async function initialize() {
  const BackendClass = SymatemQueryMixin(RustWasmBackend);
  const backend = await new BackendClass();

  const repositoryNamespace = SymbolInternals.identityOfSymbol(
    backend.createSymbol(backend.metaNamespaceIdentity)
  );
  const modalNamespace = SymbolInternals.identityOfSymbol(
    backend.createSymbol(backend.metaNamespaceIdentity)
  );
  const recordingNamespace = SymbolInternals.identityOfSymbol(
    backend.createSymbol(backend.metaNamespaceIdentity)
  );

  return { backend, repositoryNamespace, modalNamespace, recordingNamespace };
}

export async function backendObject(transition, properties) {
  const { backend } = await initialize();
  return backend;
}

export class TriplesRoute extends IteratorStoreRoute {
  async *iteratorFor(transition, properties) {
    const backend = await this.parent.objectFor();

    for (const t of backend.queryTriples(backend.queryMasks.VVV, [
      backend.symbolByName.Void,
      backend.symbolByName.Void,
      backend.symbolByName.Void
    ])) {
      yield t;
    }
  }
}

export class SymbolsRoute extends IteratorStoreRoute {
  async *iteratorFor(transition, properties) {
    const backend = await this.parent.objectFor();
    yield* backend.querySymbols();
  }
}

const { serviceWorker, serviceWorkerRegistration } = initializeServiceWorker("bundle.service-worker.mjs");
export { serviceWorker, serviceWorkerRegistration };

export default new App({
  target: document.body
});
