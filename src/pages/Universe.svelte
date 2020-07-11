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

    console.log($route);
    if (ev.dataTransfer.items) {
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        if (ev.dataTransfer.items[i].kind === "file") {
          let file = ev.dataTransfer.items[i].getAsFile();
          console.log(
            "A ... file[" + i + "].name = " + file.name,
            file.size,
            file.type
          );

          // backend.decodeJson(await file.text());

          console.log(await file.text());
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
    Drop file here
  </div>
</div>

<Link href="/universe/triple">Triples</Link>
