import { BaseRouter, Guard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import App from "./App.svelte";
import base from "consts:base";

import { SymbolInternals, RustWasmBackend } from "SymatemJS";

export const session = new Session(localStorage);

class SessionGuard extends Guard {
  async enter(transition) {
    if (!session.isValid) {
      return transition.redirect("/login");
    }
  }
}

const needsSession = new SessionGuard();

export const router = new BaseRouter([], base);

export async function fetchSymbols() {}

export async function fetchTriples() {
  const backend = await new RustWasmBackend();

  backend.initPredefinedSymbols();

  const repositoryNamespace = SymbolInternals.identityOfSymbol(
    backend.createSymbol(backend.metaNamespaceIdentity)
  );
  const modalNamespace = SymbolInternals.identityOfSymbol(
    backend.createSymbol(backend.metaNamespaceIdentity)
  );
  const recordingNamespace = SymbolInternals.identityOfSymbol(
    backend.createSymbol(backend.metaNamespaceIdentity)
  );

  const all = [];
  for (const t of backend.queryTriples(backend.queryMasks.VVV, [
    backend.symbolByName.Void,
    backend.symbolByName.Void,
    backend.symbolByName.Void
  ])) {
    all.push(t);
  }

  return all;
}

export default new App({
  target: document.body
});
