<script>
  import { Login } from "svelte-session-manager";
  import { getContext } from "svelte";
  import { ROUTER } from "svelte-guard-history-router";
  import { session } from "../main.mjs";
  import api from "consts:api";
  const router = getContext(ROUTER);
</script>

<div class="center">
  <Login
    {session}
    endpoint={api + '/authenticate'}
    result={() => router.continue()} />
</div>
