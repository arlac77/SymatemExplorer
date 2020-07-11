<script>
  import { Link } from "svelte-guard-history-router";

  export let router;

  const route = router.route;

  export function dragover(ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
  }

  export async function drop(ev) {
    ev.preventDefault();

    const backend = await router.route.objectFor();

    if (ev.dataTransfer.items) {
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === "file") {
          const file = ev.dataTransfer.items[i].getAsFile();
          /*console.log(
            "A ... file[" + i + "].name = " + file.name,
            file.size,
            file.type
          );*/

          backend.decodeJson(await file.text());
        }
      }
    }
  }
</script>

<style>
  .drop {
    border: 5px solid blue;
    width: 200px;
    height: 100px;
  }
</style>

<div>
  <div class="drop" on:dragover={dragover} on:drop={event => drop(event)}>
    Drop universe here
  </div>
</div>

<Link href="/universe/triple">Triples</Link>
<Link href="/universe/symbol">Symbols</Link>
