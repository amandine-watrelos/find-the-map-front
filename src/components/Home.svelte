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
    <button on:click={goToGameCreation} type="button" class="btn">Create a new game</button>
    <p>_________</p>
    <form id="join-game-area">
      <p>Join an existing game :</p>

      <div class="form-group">
        <label for="playerName">Player name</label>
        <div class="col-8">
          <input type="text" bind:value={playerName} name="playerName" id="playerName" class="form-control">
        </div>
      </div>

      <div class="form-group">
        <label for="gameId">Game ID</label>
        <div class="col-9">
          <input type="text" bind:value={gameId} name="gameId" id="gameId" class="form-control">
        </div>
      </div>

      <button on:click={goToLobby} type="button" class="btn top-bot-margin">Play</button>
    </form>
  </div>
</div>
