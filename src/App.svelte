<script>
  import * as style from "./main.css";
  import {
    Router,
    Route,
    Outlet,
    link,
    active
  } from "svelte-guard-history-router";
  import { Menue } from "svelte-common";
  import { router, session } from "./main.mjs";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Triples from "./pages/Triples.svelte";
  import Symbols from "./pages/Symbols.svelte";
  import Login from "./pages/Login.svelte";

  function logout() {
    session.invalidate();
  }
</script>

<Router {router}>
  <nav>
    <Route path="/" component={Home}>
      <img class="logo" src="logo.svg" alt="Symatem Explorer" />
      Symatem Explorer
    </Route>
    <ul class="left">
      <li>
        <Route path="/symbols" component={Symbols}>Symbols</Route>
      </li>
      <li>
        <Route path="/triples" component={Triples}>Triples</Route>
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
          <Route path="/login">Login</Route>
        {/if}
      </li>
    </ul>
  </nav>
  <main>
    <Outlet />
  </main>
</Router>
