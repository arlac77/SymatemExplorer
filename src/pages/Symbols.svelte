<script>
  import { session } from "../main.mjs";

</script>

<style>
</style>

{#await fetchServices()}
  <p>...fetching</p>
{:then services}
  <svg viewbox="0 0 {width} {height}">
    <g class="services">
      {#each Object.values(services) as service}
        <g class="service" transform="translate({service.x},{service.y})">
          <rect
            x="0"
            y="0"
            width={service.w}
            height={service.h}
            fill={stateColor[service.state]} />
          <text x="8" y="22">{service.name}</text>
          {#each Object.values(service.endpoints) as endpoint}
            <g
              class="endpoint"
              transform="translate({endpoint.x - 60},{endpoint.y})">

              <text x={72} y={3}>{endpoint.name}</text>
              <circle
                cx="80"
                cy="0"
                r="5"
                fill={endpoint.open ? 'black' : 'gray'} />
              {#each endpoint.connected as connected}
                <path
                  class="connection"
                  d="M80 0H{connected.x}{coordsFor(services, connected.target, endpoint)}" />
              {/each}
              {#each endpoint.interceptors as interceptor}
                <rect x={interceptor.x} y="-4" width="8" height="8" />
              {/each}
            </g>
          {/each}
        </g>
      {/each}
    </g>
  </svg>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
