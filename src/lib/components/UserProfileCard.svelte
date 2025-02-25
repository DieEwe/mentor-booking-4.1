<script lang="ts">
    import type { UserProfile } from '$lib/types/user';
    import { createEventDispatcher } from 'svelte';
    
    const dispatch = createEventDispatcher<{
        updateProfile: UserProfile;
    }>();

    export let userData: UserProfile;
    let isEditing = false;
    let avatarUrl = userData.avatar_url || '/images/avatar-placeholder.jpg';
</script>

<div class="profile-card opaque-content-container" role="region" aria-label="User Profile">
    <div class="avatar-section">
        <div class="avatar-container">
            <img src="/images/avatar-placeholder.jpg" alt="User avatar" class="avatar" />
        </div>
        <h2 class="user-name">{userData.vorname} {userData.name}</h2>
        <p class="user-pronouns">{userData.pronouns}</p>
        <p class="value">{userData.role}</p>
    </div>

    <div class="profile-content">
        <div class="info-section">
            <div class="info-item">
                <span class="label">Email</span>
                <p class="value">{userData.email}</p>
            </div>

            <div class="info-item Zitat">
                <span class="label">Zitat</span>
                <p class="value">"{userData.Zitat}"</p>
            </div>

            <div class="info-item">
                <span class="label">Behinderung</span>
                <p class="value">{userData.disability}</p>
            </div>

            <div class="info-item">
                <span class="label">Sprachen</span>
                <div class="language-tags">
                    {#each userData.languages as language}
                        <span class="language-tag">{language}</span>
                    {/each}
                </div>
            </div>

            <div class="info-item Beschreibung">
                <span class="label">Über mich</span>
                <p class="value">{userData.Beschreibung}</p>
            </div>
        </div>
    </div>

    <button class="edit-button" aria-label="Profil bearbeiten"></button>
</div>

<style>
    .profile-card {
        background-color: #ffffff;
        border-radius: 1.5rem;
        max-width: 450px;  /* Reduced from 450px */
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        position: relative;
        margin: 0 auto;   /* Center the card */
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
        object-fit: cover;
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

    .user-pronouns {
        color: var(--secondary);
        font-size: 0.95rem;
        margin: 0 0 0.75rem;
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

    .Zitat {
        font-style: italic;
        padding: 1rem;
        background: #f8f9fa;
        border-radius: 1rem;
    }

    .language-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    .language-tag {
        padding: 0.3rem 0.8rem;
        background: #f0f2f5;
        border-radius: 1rem;
        font-size: 0.875rem;
        color: var(--text);
    }

    .Beschreibung {
        margin-top: 1rem;
    }

    .edit-button {
        background: url('/images/edit.svg') no-repeat center;  /* Remove 'static' from path */
        border: none;
        background-color: transparent;
        cursor: pointer;
        transition: transform 0.2s ease;
        width: 30px;    /* Add default width */
        height: 30px;   /* Add default height */
        background-size: contain;
        position: absolute;  /* Add positioning */
        top: 2rem;      /* Position from top */
        right: 2rem;    /* Position from right */
    }

    .edit-button:hover {
        transform: scale(1.2); /* makes the button 20% larger on hover */
        background-size: contain; /* Add this line to ensure the SVG fits within the button */
        }

        @media (max-width: 768px) {
        .profile-card {
            width: 90%;    /* Reduced from 95% */
            padding: 1.5rem;
            margin: 0 auto;
        }

        .avatar-container {
            width: 100px;
            height: 100px;
        }

        .user-name {
            font-size: 1.3rem;
        }

        .user-pronouns {
            font-size: 0.85rem;
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

        .language-tags {
            gap: 0.3rem;
        }
    }
</style>
