<script>
  import { router } from "../main.mjs";

  const triples = router.routes.find(r => r.path === "/triple");
</script>

{#if $triples}
  <table class="bordered striped hoverable">
    <thead>
      <tr>
        <th aria-sort="none">E</th>
        <th>A</th>
        <th>V</th>
      </tr>
    </thead>
    <tbody>
      {#each $triples as triple}
        <tr>
          <td>{triple[0]}</td>
          <td>{triple[1]}</td>
          <td>{triple[2]}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}No triples{/if}
