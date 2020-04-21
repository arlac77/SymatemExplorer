<script>
  import { session, fetchTriples } from "../main.mjs";
</script>

{#await fetchTriples()}
  <p>...fetching</p>
{:then triples}
  <svg viewbox="0 0 100 100">
    <g>
    </g>
  </svg>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
