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
  <div class="row">
    <div id="img-container" class="col-md-6">
      <img src="/images/map-detouree.png" alt="map-image" id="map-image"/>
    </div>

    <div class="col-md-6 text-center">
      <p id="game-rules-intro">Prove who has traveled the most in Dofus with Find the Map !<br></p>
      <p class="text-justify" id="game-rules">
        One game includes a list of dofus maps screenshots : for every map, you must indicate the position you think is correct.
        If you are wrong, the difference between your proposal and the right answer will be taken into account.
        At the end of the game, the winner is the one with the smallest positions difference for all the maps.</p>
      <button on:click={goToGameCreation} type="button" class="btn">Create a new game</button>
      <p>_________</p>
      <form id="join-game-area">
        <p>Join an existing game :</p>

        <div class="form-group">
          <label for="playerName">Player name</label>
          <div class="col-8 col-md-4 d-md-inline-block">
            <input type="text" bind:value={playerName} name="playerName" id="playerName" class="form-control">
          </div>
        </div>

        <div class="form-group">
          <label for="gameId">Game ID</label>
          <div class="col-9 col-md-4 d-md-inline-block">
            <input type="text" bind:value={gameId} name="gameId" id="gameId" class="form-control">
          </div>
        </div>

        <button on:click={goToLobby} type="button" class="btn top-bot-margin">Play</button>
      </form>
    </div>
  </div>
</div>
