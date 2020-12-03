<script>
  import { createEventDispatcher } from 'svelte';

  export let playerName = '';
  export let gameId = '';

  const dispatch = createEventDispatcher();

  function goToGameCreation() {
    dispatch('createGame');
  }

  function goToLobby() {
    alert('hey yo');
  }
</script>

<div class="container-fluid">

  <img src="/images/map-detouree.png" alt="map-image" id="map-image" class="col-md-2"/>

  <div class="col-md-2 text-center">
    <button on:click={goToGameCreation} type="button" class="btn btn-primary button-margin">Create a new game</button>

    <div id="join-game-area">
      <p>.. or join an existing game!</p>

      <div>
        <label for="playerName">Player name</label>
        <input type="text" bind:value={playerName} name="playerName" id="playerName">
      </div>

      <div>
        <label for="gameId">Game ID</label>
        <input type="text" bind:value={gameId} name="gameId" id="gameId">
      </div>

      <button on:click={goToLobby} type="button" class="btn btn-primary button-margin">Play</button>
    </div>
  </div>
</div>
