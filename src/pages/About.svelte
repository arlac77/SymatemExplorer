<script>
  import { DateTime, Duration, formatBytes } from "svelte-common";
  import { websocketStore } from "svelte-websocket-store";
  import { session } from "../main.mjs";
  import version from "consts:version";
  import description from "consts:description";
  import api from "consts:api";
  import api_ws from "consts:api_ws";
  import base from "consts:base";
  import name from "consts:name";

  const protocols = ["access_token", session.access_token];

  let uptime = websocketStore(api_ws + "/state/uptime", -1, protocols);
  let memory = websocketStore(
    api_ws + "/state/memory",
    { heapTotal: -1, heapUsed: -1, external: -1, rss: -1 },
    protocols
  );
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
        <td>Mounted</td>
        <td>{base}</td>
      </tr>
      <tr>
        <td>API</td>
        <td>{api}</td>
      </tr>
      <tr>
        <td>Uptime</td>
        <td>
          {#if $uptime < 0}down{:else}<Duration seconds={$uptime}/>{/if}
        </td>
      </tr>
      <tr>
        <td>Server Heap Total</td>
        <td>{formatBytes($memory.heapTotal)}</td>
      </tr>
      <tr>
        <td>Server Heap Used</td>
        <td>{formatBytes($memory.heapUsed)}</td>
      </tr>
      <tr>
        <td>Username</td>
        <td>{$session.username}</td>
      </tr>
      <tr>
        <td>Session Expiration</td>
        <td class={$session.isValid ? 'ok' : 'error'}>
          <DateTime date={$session.expirationDate}/>
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
