<script>
  import Navbar from './components/Navbar.svelte';
  import Home from './components/Home.svelte';

  const createGame = (e) => {
    alert('create a game');
  };
</script>

<Navbar />

<div class="wrapper">
  <Home on:createGame={createGame} />
</div>
