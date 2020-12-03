import { redirectGuard, MasterRoute } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import App from "./App.svelte";
import {} from "./service-worker/registration.mjs";

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

export async function backendObject(transition) {
  const { backend } = await initialize();
  return backend;
}

export class TriplesRoute extends MasterRoute {
  async *iteratorFor(transition) {
    const backend = await this.parent.objectFor(transition);

    for (const t of backend.queryTriples(backend.queryMasks.VVV, [
      backend.symbolByName.Void,
      backend.symbolByName.Void,
      backend.symbolByName.Void
    ])) {
      yield t;
    }
  }
}

export class SymbolsRoute extends MasterRoute {
  async *iteratorFor(transition) {
    const backend = await this.parent.objectFor(transition);
    yield* backend.querySymbols();
  }
}

export default new App({
  target: document.body
});
