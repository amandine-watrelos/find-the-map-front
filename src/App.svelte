<script>
  import Navbar from './components/Navbar.svelte';
  import Home from './components/Home.svelte';
  import CreateGame from './components/CreateGame.svelte';

  let isCreateGame = false;

  const createGame = () => {
    isCreateGame = true;
  };

  const goHome = () => {
    isCreateGame = false;
  };
</script>

<Navbar />

<div class="wrapper">
  {#if isCreateGame == true}
    <CreateGame on:goHome={goHome} />
  {:else}
    <Home on:createGame={createGame} />
  {/if}
</div>
