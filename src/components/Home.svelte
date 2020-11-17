<script>
  import Textfield from '@smui/textfield';
  import Button, { Label } from '@smui/button';

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

<img src="/images/map-detouree.png" alt="map-image" id="map-image" />

<Button on:click={goToGameCreation} variant="raised" class="large-button">
  <Label>Create a new game</Label>
</Button>

<div id="join-game-area">
  <p>.. or join an existing game!</p>
  <Textfield bind:value={playerName} label="Player name" />
  <Textfield bind:value={gameId} label="Game ID" />
  <Button on:click={goToLobby} variant="raised">
    <Label>Play</Label>
  </Button>
</div>
