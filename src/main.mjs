import { Router, route, NotFound, Guard } from "svelte-guard-history-router";
import { Session } from "svelte-session-manager";
import Home from "./pages/Home.svelte";
import About from "./pages/About.svelte";
import Triples from "./pages/Triples.svelte";
import Symbols from "./pages/Symbols.svelte";
import Login from "./pages/Login.svelte";
import App from "./App.svelte";
import base from 'consts:base';

export const session = new Session(localStorage);

class SessionGuard extends Guard {
  async enter(transition) {
    if (!session.isValid) {
      return transition.redirect("/login");
    }
  }
}

const needsSession = new SessionGuard();

export const router = new Router(
  [
    route("*", NotFound),
    route("/*", Home),
    route("/login", Login),
    route("/about", About),
    route("/symbols", needsSession, Symbols),
    route("/triples", needsSession, Triples),
  ],
  base
);


export async function fetchSymbols()
{
  return [];
}

export default new App({
  target: document.body
});
