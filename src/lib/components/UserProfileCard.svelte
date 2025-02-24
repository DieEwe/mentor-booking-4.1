<!-- src/lib/components/ProfileCard.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import type { UserData } from '$lib/types/user';
    
    // TODO: Import Supabase client
    // import { supabase } from '$lib/supabaseClient';
    
    const dispatch = createEventDispatcher<{
        updateProfile: UserData;
    }>();

    export let userData: UserData;
    let isEditing = false;
    let avatarUrl = userData.avatar_url || '/images/avatar-placeholder.jpg';

    // TODO: Add these functions when implementing Supabase
    /*
    async function uploadAvatar(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${userData.id}-avatar.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true });

            if (!uploadError) {
                userData.avatar_url = filePath;
                await updateProfile();
            }
        }
    }

    async function updateProfile() {
        try {
            const { error } = await supabase
                .from('profiles')
                .update(userData)
                .eq('id', userData.id);

            if (!error) {
                isEditing = false;
                dispatch('updateProfile', userData);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    }
    */
</script>

<div class="profile-card" role="region" aria-label="User Profile">
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
        max-width: 500px;
        width: 100%;
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        position: relative;
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
            padding: 1.5rem;
            border-radius: 1rem;
            max-width: 100%;
            margin: 0 1rem;
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
