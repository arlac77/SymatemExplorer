<script>
  export let router;
  
  const route = router.route;
  const triples = $route.value;
</script>

{#if triples}
  <table class="bordered striped hoverable">
    <thead>
      <tr>
        <th aria-sort="none">E</th>
        <th>A</th>
        <th>V</th>
      </tr>
    </thead>
    <tbody>
      {#each triples as triple}
        <tr>
          <td>{triple[0]}</td>
          <td>{triple[1]}</td>
          <td>{triple[2]}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}No triples{/if}
