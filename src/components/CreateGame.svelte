<script>
  import Button, { Label } from '@smui/button';
  import Textfield from '@smui/textfield';
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import GameController from '../controllers/GameController';

  const dispatch = createEventDispatcher();

  /* TODO :
  - handle CORS Policy
   */

  let mapInput = {
      imgUrl : "",
      posX : "",
      posY : ""
  };
  let game = {};
  let canAddMap = false;
  let mapsList = "";

  const positionRegex = RegExp("^-?[0-9]?[0-9]?$");

  onMount(() => {
    initGame();
    initPositionInputEvents();
  });

  async function initGame() {
    try {
      const gameCreated = await GameController.createGame();
      game = gameCreated;
    } catch (e) {
      console.log('Error while game initialization',e)
    }
  }

  async function addMap() {
    const params = {
      url: mapInput.imgUrl,
      posX: mapInput.posX,
      posY: mapInput.posY
    };
    try {
      const gameUpdated = await GameController.addMap(game.id, convertToQueryParams(params));
      game = gameUpdated;
      resetFields();
      mapsList = convertMapListToString(game.dofusMaps);
    } catch (e) {
      console.log('Error while adding a map', e)
    }
  }

  async function saveGame() {
    try {
      const gameUpdated = await GameController.generateCode(game.id);
      game = gameUpdated;
      alert(`The game has been saved. Please note this code somewhere or you will lose your freshly game created : ${game.code}`);
    } catch (e) {
      console.log('Error while generating code', e)
    }
  }

  function initPositionInputEvents() {
    document.querySelectorAll(".position-input").forEach((element) => {
      element.onkeypress = function(event) {
        return positionRegex.test(event.key) ;
      }
    });
  }

  function back() {
    dispatch('goHome');
  }

  function isFormValid() {
    canAddMap = mapInput.posX !== "" && mapInput.posY !== "" && mapInput.imgUrl !== "" ? true : false;
  }

  function convertToQueryParams(params) {
    return new URLSearchParams(params).toString()
  }

  function convertMapListToString(maps) {
    let mapsString = "";
    maps.forEach(map => {
        mapsString += `${map.url}\t`;
        mapsString += `[${map.posX},`;
        mapsString += `${map.posY}]\r`;
    });
    return mapsString;
  }

  function resetFields() {
    mapInput.imgUrl = "";
    mapInput.posX = "";
    mapInput.posY = "";
    canAddMap = false;
  }

</script>

<Button on:click={back} variant="raised" class="back-button">
  <Label>Back</Label>
</Button>

<div class="game-creation-title">
  <h2>Game creation</h2>
  <p>Add some maps with the link to the image that you hosted before, and the position of the map.</p>
</div>

<div class="add-map">
  <div>
    <Label>Image link</Label>
    <Textfield on:keyup={isFormValid} bind:value={mapInput.imgUrl} />
  </div>

  <div>
    <Label>Position</Label>
    <Textfield on:keyup={isFormValid} bind:value={mapInput.posX} class="position-input" onpaste="return false" variant="outlined"/>
    <Textfield on:keyup={isFormValid} bind:value={mapInput.posY} class="position-input" onpaste="return false" variant="outlined" />
  </div>

  {#if canAddMap == true}
    <Button on:click={addMap} type="button" variant="raised">
      <Label>Add map</Label>
    </Button>
  {:else}
    <Button variant="raised" disabled>
      <Label>Add map</Label>
    </Button>
  {/if}
</div>

<Textfield textarea disabled bind:value={mapsList} label="Maps list" class="maps-list"/>

{#if mapsList === ""}
  <Button variant="raised" class="save-game-button" disabled>
    <Label>Save the game</Label>
  </Button>
{:else}
  <Button on:click={saveGame} variant="raised" class="save-game-button">
    <Label>Save the game</Label>
  </Button>
{/if}

