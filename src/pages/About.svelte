<script>
  import { About, SessionDetails } from "svelte-common";
  import { session } from "../main.mjs";
  import version from "consts:version";
  import description from "consts:description";
  import api from "consts:api";
  import base from "consts:base";
  import name from "consts:name";
  import { serviceWorker } from "../main.mjs";
</script>

<About {name} {version} {description}>
  <tr>
    <td>Service Worker</td>
    <td colspan="2">{$serviceWorker.state}</td>
  </tr>
  <SessionDetails session={$session} />
</About>
