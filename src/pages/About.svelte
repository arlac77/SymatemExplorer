<script>
  import { DateTime, Duration, formatBytes } from "svelte-common";
  import { session } from "../main.mjs";
  import version from "consts:version";
  import description from "consts:description";
  import api from "consts:api";
  import base from "consts:base";
  import name from "consts:name";
  import { serviceWorker } from "../main.mjs";
</script>

<div>
  <h2>{name}</h2>
  <p>{description}</p>
  <table class="bordered striped hoverable">
    <tbody>
      <tr>
        <td>Version</td>
        <td>{version}</td>
      </tr>
      <tr>
        <td>Service Worker</td>
        <td>{$serviceWorker.state}</td>
      </tr>
      <tr>
        <td>Username</td>
        <td>{$session.username}</td>
      </tr>
      <tr>
        <td>Session Expiration</td>
        <td class={$session.isValid ? 'ok' : 'error'}>
          <DateTime date={$session.expirationDate} />
        </td>
      </tr>
      <tr>
        <td>Entitlements</td>
        <td>
          {#each [...$session.entitlements].sort() as name}
            <div>{name}</div>
          {/each}
        </td>
      </tr>
    </tbody>
  </table>
</div>
