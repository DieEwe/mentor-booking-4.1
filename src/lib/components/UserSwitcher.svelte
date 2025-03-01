<!-- src/lib/components/UserSwitcher.svelte -->
<script lang="ts">
  import { mockUsers } from '$lib/mock/mockusers';
  import { user } from '$lib/stores';
  import type { User } from '$lib/types/user';

  let selectedUser: User | null = null; // Use null for guest.  Clearer intention.

  function handleUserChange() {
    if (selectedUser) {
        // Setting loggedIn to true is important  Here, we're *simulating* login.
        user.set({...selectedUser, loggedIn:true});
    } else {
      // Simulate logging out (becoming a guest user).
      user.set({
        id: 'guest-user',
        vorname: 'Guest',
        name: 'User',
        pronouns: '',
        role: 'guest',
        email: '',
        Zitat: '',
        disability: 'None',
        languages: [],
        Beschreibung: 'No profile available',
        loggedIn: false,
      });
    }
  }
</script>

<select bind:value={selectedUser} on:change={handleUserChange}>
  <option value={null}>Guest User</option> <!-- Explicit "Guest" option -->
  {#each mockUsers as mockUser (mockUser.id)}  <!-- Added key expression -->
    <option value={mockUser}>{mockUser.vorname} {mockUser.name} ({mockUser.role})</option>
  {/each}
</select>