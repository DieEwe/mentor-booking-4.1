<!-- src/lib/components/PledgerProfileCard.svelte -->
<script lang="ts">
    import type { PledgerProfile } from '$lib/types/company';

    export let profile: PledgerProfile | undefined;
</script>

{#if profile}
    <div class="profile-card" role="region" aria-label="Pledger Profile">
        <div class="avatar-section">
            <div class="avatar-container">
                <img src={profile.logo_url || '/images/logo-placeholder.png'} alt="Pledger logo" class="avatar" />
            </div>
            <h2 class="user-name">{profile.companyname}</h2>
           {#if profile.website}
              <a href={profile.website} target="_blank" rel="noopener noreferrer">Website</a>
           {/if}
        </div>

        <div class="profile-content">
            <div class="info-section">

                {#if profile.description}
                    <div class="info-item Beschreibung">
                        <span class="label">Beschreibung</span>
                        <p class="value">{profile.description}</p>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{:else}
    <div class="profile-card">
        <p>Keine Profilinformationen verfügbar.</p>
    </div>
{/if}

<style>
    .profile-card {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #ffffff;
        border-radius: 1.5rem;
        max-width: 450px;
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        z-index: 1000; /* Ensure it's on top of other content */
        margin: 0 auto;
        font-family: sans-serif;
    }

    .avatar-section {
        text-align: center;
        margin-bottom: 2rem;
    }

    .avatar-container {
        width: 130px;
        height: 130px;
        margin: 0 auto 1rem;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .avatar {
        width: 100%;
        height: 100%;
        object-fit: contain; /* Changed from cover to contain */
        transition: transform 0.3s ease;
    }

    .avatar:hover {
        transform: scale(1.05);
    }

    .user-name {
        font-size: 1.75rem;
        font-weight: 600;
        margin: 0.5rem 0 0.25rem;
        color: var(--text);
    }

    .profile-content {
        padding: 1rem 0;
    }

    .info-section {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }

    .info-item {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .label {
        font-size: 0.875rem;
        color: var(--secondary);
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .value {
        color: var(--text);
        font-size: 1rem;
        margin: 0;
        line-height: 1.5;
    }

    .Beschreibung {
        margin-top: 1rem;
    }
    a {
        color: blue;
        text-decoration: underline;
    }

    @media (max-width: 768px) {
        .profile-card {
            width: 95%;
            padding: 1.5rem;
        }

        .avatar-container {
            width: 100px;
            height: 100px;
        }

        .user-name {
            font-size: 1.3rem;
        }

        .info-section {
            gap: 1rem;
        }

        .info-item {
            gap: 0.3rem;
        }

        .label {
            font-size: 0.75rem;
        }

        .value {
            font-size: 0.95rem;
        }
    }
</style>