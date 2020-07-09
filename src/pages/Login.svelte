<script>
  import { Login } from "svelte-session-manager";
  import { session } from "../main.mjs";
  import api from "consts:api";
  export let router;
</script>

<div class="center modal">
  <Login
    {session}
    endpoint={api + '/authenticate'}
    result={() => router.continue()} />
</div>
