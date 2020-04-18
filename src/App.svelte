<script>
  import * as style from "./main.css";
  import { Outlet, link, active } from "svelte-guard-history-router";
  import { Menue } from "svelte-common";
  import { router, session } from "./main.mjs";

  function logout() {
    session.invalidate();
  }
</script>

<nav>
  <a href="/" use:link={router} use:active={router}>
    <img class="logo" src="logo.svg" alt="Symatem Explorer" />
    Symatem Explorer
  </a>
  <ul class="left">
    <li>
      <a href="/symbols" use:link={router} use:active={router}>Symbols</a>
    </li>
    <li>
      <a href="/triples" use:link={router} use:active={router}>Triples</a>
    </li>
  </ul>
  <ul>
    <li>
      {#if $session.isValid}
        <Menue>
          <div slot="title" class="dropdown-trigger">{$session.username}</div>
          <div slot="content" class="dropdown-menu dropdown-menu-sw">
            <a href="/" class="dropdown-item" on:click|preventDefault={logout}>
              Logout {$session.username}
            </a>
            <div class="dropdown-divider" />
            <a href="#!" class="dropdown-item">three</a>
          </div>
        </Menue>
      {:else}
        <a href="/login" use:link={router} use:active={router}>Login</a>
      {/if}
    </li>
  </ul>
</nav>
<main>
  <Outlet {router} />
</main>
