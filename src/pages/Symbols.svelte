<script>
  import {
    ObjectLink
  } from "svelte-guard-history-router";

  export let router;
  
  const route = router.route;
</script>

{#if $route}
  <table class="bordered striped hoverable">
    <thead>
      <tr>
        <th aria-sort="none" colspan="2">Symbol</th>
      </tr>
    </thead>
    <tbody>
      {#each $route as symbol}
        <tr>
          <td>{symbol}</td>
          <td><ObjectLink object={symbol}/></td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}No symbols{/if}
