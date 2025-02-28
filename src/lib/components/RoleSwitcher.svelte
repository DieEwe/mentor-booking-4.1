<script lang="ts">
    import { user } from '../stores';
    import { goto } from '$app/navigation';
    import type { User, UserRole } from '../types/user';
  
    const roles: UserRole[] = ['guest', 'mentor', 'coach', 'admin'];
  
    // Create a reactive variable that reflects the current user role.
    $: currentRole = $user.role;
  
    function switchRole(role: UserRole) {
      if (role === 'guest') {
        // Switching to guest: set logged-out state and redirect to home.
        user.set({
          loggedIn: false,
          role: 'guest'
        });
        goto('/');
      } else {
        // For other roles, set logged-in state with a test username.
        const userData: User = {
          loggedIn: true,
          role,
          username: `test_${role}@example.com`
        };
        user.set(userData);
      }
      console.log($user.role)
    } 

    
  </script>
  
  <div class="role-switcher">
    <select
      bind:value={currentRole}
      on:change={(e) => switchRole(e.currentTarget.value as UserRole)}
      class="role-select"
    >
      {#each roles as role}
        <option value={role}>{role}</option>
      {/each}
    </select>
  </div>
  

<style>
    .role-switcher {
        position: fixed;
        bottom: 10rem;
        left: 1rem;
        z-index: 1001;
        background: white;
        padding: 0.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .role-select {
        padding: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ddd;
        background: white;
        cursor: pointer;
        font-size: 0.9rem;
    }

    /* Only show in development mode */
    :global([data-mode='production']) .role-switcher {
        display: none;
    }
</style>