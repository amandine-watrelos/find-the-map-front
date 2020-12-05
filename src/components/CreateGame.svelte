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

<div class="container-fluid" id="game-creation-container">
  <div id="game-creation-header">
    <button on:click={back} type="button" class="btn col-2">Back</button>
    <h4 class="d-inline offset-1 col-4">Game creation</h4>
  </div>

  <p class="text-justify">Add some maps with the link to the image that you hosted before, and the position of the map.</p>

  <form>
    <div class="form-group">
      <label for="img-url" class="col-4">Image link</label>
      <input type="text" id="img-url" class="form-control col-7" on:keyup={isFormValid} bind:value={mapInput.imgUrl} />
    </div>

    <div class="form-group">
      <label class="col-4">Position</label>
      <input type="text" on:keyup={isFormValid} bind:value={mapInput.posX} onpaste="return false" class="form-control col-2"/>
      <input type="text" on:keyup={isFormValid} bind:value={mapInput.posY} onpaste="return false" class="form-control col-2 offset-1"/>
    </div>

    {#if canAddMap == true}
      <button on:click={addMap} type="button" class="btn centered-button">Add map</button>
    {:else}
      <button disabled type="button" class="btn centered-button">Add map</button>
    {/if}
  </form>

  <div class="form-group" id="maps-textarea">
    <label type="text" for="maps-list" class="col-4">Maps list</label>
    <textarea disabled bind:value={mapsList} id="maps-list" class="form-control col-7"></textarea>
  </div>

  {#if mapsList === ""}
    <button disabled type="button" class="btn centered-button">Save the game</button>
  {:else}
    <button on:click={displayCode} type="button" class="btn centered-button">Save the game</button>
  {/if}
</div>

