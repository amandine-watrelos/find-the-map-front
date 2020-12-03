<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import GameController from '../controllers/GameController';

  const dispatch = createEventDispatcher();

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

  function displayCode() {
      alert(`The game has been saved. Please note this code somewhere or you will lose your freshly game created : ${game.code}`);
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

<button on:click={back} class="back-button">Back</button>

<div class="game-creation-title">
  <h2>Game creation</h2>
  <p>Add some maps with the link to the image that you hosted before, and the position of the map.</p>
</div>

<div class="add-map">
  <div>
    <label for="imgUrl">Image link</label>
    <input type="text" id="imgUrl" on:keyup={isFormValid} bind:value={mapInput.imgUrl} />
  </div>

  <div>
    <label>Position</label>
    <input type="text" on:keyup={isFormValid} bind:value={mapInput.posX} class="position-input" onpaste="return false"/>
    <input type="text" on:keyup={isFormValid} bind:value={mapInput.posY} class="position-input" onpaste="return false"/>
  </div>

  {#if canAddMap == true}
    <button on:click={addMap}>Add map</button>
  {:else}
    <button disabled>Add map</button>
  {/if}
</div>

<div>
  <label type="text" for="mapsList">Maps list</label>
  <textarea disabled bind:value={mapsList} id="mapsList" class="maps-list"></textarea>
</div>

{#if mapsList === ""}
  <button class="save-game-button" disabled>Save the game</button>
{:else}
  <button on:click={displayCode} class="save-game-button">Save the game</button>
{/if}

