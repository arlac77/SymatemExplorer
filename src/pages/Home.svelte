<script>	
	export function dragover (ev) {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'move';
	}
		
	export function drop (ev) {
		ev.preventDefault();
		console.log(ev.dataTransfer);
		
		if (ev.dataTransfer.items) {
          for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            if (ev.dataTransfer.items[i].kind === 'file') {
              let file = ev.dataTransfer.items[i].getAsFile();
              console.log('A ... file[' + i + '].name = ' + file.name);
            }
          }
        } else {
          for (let i = 0; i < ev.dataTransfer.files.length; i++) {
            console.log('B ... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
          }
        }

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
    <div class="drop" on:dragover={dragover} on:drop={event => drop(event)}>
        Drop file here
    </div>
</div>