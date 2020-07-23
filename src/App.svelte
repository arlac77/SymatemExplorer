<script>
  import * as style from "./main.css";
  import {
    Router,
    Route,
    ChildStoreRoute,
    Outlet
  } from "svelte-guard-history-router";
  import base from "consts:base";
  import { Menue } from "svelte-common";
  import {
    backendObject,
    SymbolsRoute,
    TriplesRoute,
    session
  } from "./main.mjs";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Triples from "./pages/Triples.svelte";
  import Symbols from "./pages/Symbols.svelte";
  import SymbolPage from "./pages/Symbol.svelte";
  import SymbolLink from "./SymbolLink.svelte";
  import Universe from "./pages/Universe.svelte";
  import Login from "./pages/Login.svelte";

  function logout() {
    session.invalidate();
  }
</script>

<Router {base}>
  <nav>
    <Route href="/" path="*" component={Home}>
      <img class="logo" src="logo.svg" alt="Symatem Explorer" />
      Symatem Explorer
    </Route>

    <ul class="left">
      <li>
        <Route path="/universe" objectFor={backendObject} component={Universe}>
          Universe
          <Route path="/symbol" factory={SymbolsRoute} component={Symbols}>
            <Route
              path="/:symbol"
              factory={ChildStoreRoute}
              linkComponent={SymbolLink}
              component={SymbolPage} />
          </Route>
          <Route path="/triple" factory={TriplesRoute} component={Triples} />
        </Route>
      </li>
      <li>
        <Route path="/about" component={About}>About</Route>
      </li>
    </ul>

    <ul>
      <li>
        {#if $session.isValid}
          <Menue>
            <div slot="title" class="dropdown-trigger">{$session.username}</div>
            <div slot="content" class="dropdown-menu dropdown-menu-sw">
              <a
                href="/"
                class="dropdown-item"
                on:click|preventDefault={logout}>
                Logout {$session.username}
              </a>
              <div class="dropdown-divider" />
              <a href="#!" class="dropdown-item">three</a>
            </div>
          </Menue>
        {:else}
          <Route path="/login" component={Login}>Login</Route>
        {/if}
      </li>
    </ul>
  </nav>
  <main>
    <Outlet />
  </main>
</Router>
