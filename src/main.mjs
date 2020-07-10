import {
  Guard,
  IteratorStoreRoute,
  StoreRoute
} from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import App from "./App.svelte";

import { SymbolInternals, RustWasmBackend } from "SymatemJS";
import { SymatemQueryMixin } from "@symatem/query";

export const session = new Session(localStorage);

class SessionGuard extends Guard {
  async enter(transition) {
    if (!session.isValid) {
      return transition.redirect("/login");
    }
  }
}

const needsSession = new SessionGuard();

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

export class Backend extends StoreRoute {
  async objectFor() {
    const {backend} = await initialize();
    return backend;
  }
}

export class TriplesRoute extends IteratorStoreRoute {
  async *iteratorFor() {
    const backend = this.parent.objectFor();
    //const { backend } = await initialize();

    for (const t of backend.queryTriples(backend.queryMasks.VVV, [
      backend.symbolByName.Void,
      backend.symbolByName.Void,
      backend.symbolByName.Void
    ])) {
      yield t;
    }
  }
}

/*
try {
  backend.decodeJson(
    await fs.promises.readFile(dumpFileName, defaultEncoding)
  );
} catch (e) {}
*/

export default new App({
  target: document.body
});
