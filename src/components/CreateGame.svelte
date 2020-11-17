<script>
  import Button, { Label } from '@smui/button';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function back() {
    dispatch('goHome');
  }
</script>

je créer une game youpiiii
<br />

<Button on:click={back} variant="raised" class="large-button">
  <Label>Back to the hell</Label>
</Button>
