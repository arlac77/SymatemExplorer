<script>
  import {
    About,
    ApplicationDetails,
    SessionDetails,
    ServiceWorkerDetails
  } from "svelte-common";
  import { session, serviceWorker } from "../main.mjs";
  import version from "consts:version";
  import description from "consts:description";
  import name from "consts:name";
</script>

<About>
  <ApplicationDetails {name} {version} {description} />
  <ServiceWorkerDetails serviceWorker={$serviceWorker} />
  <SessionDetails session={$session} />
</About>
