<script>
  import Button, { Label } from '@smui/button';
  import Textfield from '@smui/textfield';
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  const dispatch = createEventDispatcher();

  let imgUrl = "";
  let posX = "";
  let posY = "";
  let mapsList = "";
  let game = {};
  let isButtonEnabled = false;

  // handle CORS policy

  onMount(() => {//config prod and local url
    //fetch('https://find-the-map.herokuapp.com/game')
    fetch('http://localhost:8008/game', {
      method : 'POST'
    })
    .then(res => {//refacto ce then utilisé partout
      if (!res.ok) {
        throw new Error('Could not get JSON response.');
      }
      return res.json();
    })
    .then(data => {
      game = data;
    })
    .catch(err => {
      console.log(err);
    });
  });

  function back() {
    dispatch('goHome');
  }

  function isFormValid() {
    if (posX !== "" && posY !== "" && imgUrl !== "") {
      isButtonEnabled = true;
    } else {
      isButtonEnabled = false;
    }
  }

  function convertToQueryParams(params) {
    return new URLSearchParams(params).toString()
  }

  function addMap() {
    const params = {
      url: imgUrl,
      posX: posX,
      posY: posY
    };
    const queryParams = convertToQueryParams(params);
    //let url = 'https://find-the-map.herokuapp.com/game/' + game.id;
    fetch(`http://localhost:8008/game/${game.id}?${queryParams}`, {
      method: 'PATCH'
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('Could not get JSON response.');
      }
      return res.json();
    })
    .then(data => {
      game = data;
      resetFields();
      // display maps in textarea
      console.log(`id = ${game.id}`);
    })
    .catch(err => {
      console.log(err);
    });
    // reload maps list with game
  }

  function resetFields() {
    imgUrl = "";
    posX = "";
    posY = "";
  }

  function saveGame() {
    alert("game saved, add a notification to remember to save the code or the game will be lost");
  }
</script>

<Button on:click={back} variant="raised">
  <Label>Go back to home</Label>
</Button>

<h2>Game creation</h2>
<p>Add some maps with the link to the image that you hosted before, and the position of the map.</p>

<form>
  <fieldset>
    <div>
      <Label>Image link</Label>
      <Textfield on:keyup={isFormValid} bind:value={imgUrl} />
    </div>

    <div>
      <Label>Position</Label>
      <Textfield on:keyup={isFormValid} bind:value={posX} variant="outlined" pattern="^-?[0-9][0-9]?$"/>
      <Textfield on:keyup={isFormValid} bind:value={posY} variant="outlined" pattern ="^-?[0-9][0-9]?$"/>
    </div>

    {#if isButtonEnabled == true}
      <Button on:click={addMap} variant="raised">
        <Label>Add map</Label>
      </Button>
    {:else}
      <Button on:click={addMap} variant="raised" disabled>
        <Label>Add map</Label>
      </Button>
    {/if}

  </fieldset>

  <Textfield textarea disabled bind:value={mapsList} label="Maps list"/>

  <Button on:click={saveGame} variant="raised">
    <Label>Save the game and generate a code</Label><!-- disabled if maps list is empty -->
  </Button>

</form>

