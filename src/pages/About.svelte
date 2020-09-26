<script>
  import {
    About,
    ApplicationDetails,
    SessionDetails,
    ServiceWorkerDetails,
    ServiceWorkerRegistrationDetails
  } from "svelte-common";
  import { session, serviceWorker, serviceWorkerRegistration } from "../main.mjs";
  import version from "consts:version";
  import description from "consts:description";
  import name from "consts:name";
</script>

<About>
  <ApplicationDetails {name} {version} {description} />
  <SessionDetails session={$session} />
  <ServiceWorkerDetails serviceWorker={$serviceWorker}  />
  <ServiceWorkerRegistrationDetails serviceWorkerRegistration={$serviceWorkerRegistration} />
</About>
