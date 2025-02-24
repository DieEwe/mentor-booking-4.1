<script lang="ts">
    import { user } from '../stores';
    import type { User, UserRole } from '../types/user';
    
    const roles: UserRole[] = ['guest', 'mentor', 'coach', 'admin'];
    
    function switchRole(role: UserRole) {
        const userData: User = {
            loggedIn: role !== 'guest',
            role: role
        };
        user.set(userData);
    }
</script>

<div class="role-switcher">
    <select 
        on:change={(e) => switchRole(e.currentTarget.value as UserRole)}
        class="role-select"
    >
        {#each roles as role}
            <option value={role}>
                Test as: {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
        {/each}
    </select>
</div>

<style>
    .role-switcher {
        position: fixed;
        top: 1rem;
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