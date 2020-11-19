<script>
  import {
    ObjectLink
  } from "svelte-guard-history-router";

  export let router;
  
  const route = router.route;
  const symbols = $route.value;

</script>

{#if symbols}
  <table class="bordered striped hoverable">
    <thead>
      <tr>
        <th aria-sort="none" colspan="2">Symbol</th>
      </tr>
    </thead>
    <tbody>
      {#each symbols as symbol}
        <tr>
          <td>{symbol}</td>
          <td><ObjectLink object={symbol}/></td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}No symbols{/if}
