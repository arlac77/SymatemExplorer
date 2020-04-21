<script>
  import { session, fetchSymbols } from "../main.mjs";
</script>

<style>
</style>

{#await fetchSymbols()}
  <p>...fetching</p>
{:then symbols}
  <svg viewbox="0 0 100 100">
    <g>
    </g>
  </svg>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
