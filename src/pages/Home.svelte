<script>	
	export function dragover (ev) {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
	}
		
	export function drop (ev, new_g) {
		ev.preventDefault();
		console.log(ev.dataTransfer);
		
		/*
		const i = ev.dataTransfer.getData("item");
		const old_g = ev.dataTransfer.getData("group");
		const item = groups[old_g].items.splice(i,1)[0];
		groups[new_g].items.push(item);
		$: groups = groups;
		*/
	}
</script>

<style>
.drop {
  border: 5px solid blue;
  width:  200px;
  height: 100px;
}
</style>

<div>
    <div class="drop" on:dragover={dragover} on:drop={event => drop(event, g)}>
        Drop file here
    </div>
</div>