<script>
    import Textfield from '@smui/textfield';
    import Button, {Label} from '@smui/button';
	export let appName = "Find the Map";
    export let playerName = '';
    export let gameId = '';

    function goToGameCreation() {
        alert('hey yo');
    }

    function goToLobby() {
        alert('hey yo');
    }
</script>

<nav>{appName}</nav>

<div class="wrapper">

    <img src="/images/map-detouree.png" alt="map-image" id ="map-image"/>

    <Button on:click={goToGameCreation} variant="raised" id="create-game-button">
        <Label>Create a new game</Label>
    </Button>

    <div id="join-game-area">
        <p>.. or join an existing game!</p>
        <Textfield bind:value={playerName} label="Player name"/>
        <Textfield bind:value={gameId} label="Game ID"/>
        <Button on:click={goToLobby} variant="raised">
            <Label>Play</Label>
        </Button>
    </div>

</div>


