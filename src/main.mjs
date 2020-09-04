import { readable } from "svelte/store";
import { redirectGuard, IteratorStoreRoute } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import App from "./App.svelte";

import { SymbolInternals, RustWasmBackend } from "SymatemJS";
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

let serviceWorkerRegistration;

export const serviceWorker = readable({ state: "initial" }, set => {
  for (const state of ["installing", "waiting", "active"]) {
    const sw = serviceWorkerRegistration[state];
    if (sw) {
      set({ state: sw.state });
      sw.onstatechange = event => set({ state: event.target.state });
    }
  }

  return () => {};
});

async function init() {
  serviceWorkerRegistration = await navigator.serviceWorker.register(
    "bundle.service-worker.mjs"
  );
}

init();

export default new App({
  target: document.body
});
