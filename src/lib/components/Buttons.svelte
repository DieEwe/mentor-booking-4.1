<script lang="ts">
    // Props with TypeScript validation
    export let type: 'add' | 'primary' | 'secondary' = 'add';
    export let label = 'Add';
    export let disabled = false;
    export let onClick: () => void = () => {};
    export let className = '';
    export let showIcon = true;
</script>

<!-- Add Button -->
{#if type === 'add'}
<button 
    class="add-button {className}" 
    disabled={disabled}
    on:click={onClick}
>
    {#if showIcon}
    <svg
        height="24"
        width="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
    </svg>
    {/if}
    <span>{label}</span>
</button>

<!-- Primary Button -->
{:else if type === 'primary'}
<button 
    class="primary-button {className}" 
    disabled={disabled}
    on:click={onClick}
>
    <span>{label}</span>
</button>

<!-- Secondary Button -->
{:else if type === 'secondary'}
<button 
    class="secondary-button {className}" 
    disabled={disabled}
    on:click={onClick}
>
    <span>{label}</span>
</button>
{/if}

<style>
    /* Add Button styling */
    .add-button {
        display: flex;
        align-items: center;
        font-family: inherit;
        cursor: pointer;
        font-weight: 500;
        font-size: 16px;
        padding: 0.7em 1.4em 0.7em 1.1em;
        color: rgb(0, 0, 0);
        background: linear-gradient(
            0deg,
            rgba(20, 167, 62, 1) 0%,
            rgba(102, 247, 113, 1) 100%
        );
        border: none;
        box-shadow: 0 0.7em 1.5em -0.5em #14a73e98;
        letter-spacing: 0.05em;
        border-radius: 20em;
    }

    .add-button svg {
        margin-right: 6px;
    }

    .add-button:hover {
        box-shadow: 0 0.5em 1.5em -0.5em #14a73e98;
    }

    .add-button:active {
        box-shadow: 0 0.3em 1em -0.5em #14a73e98;
    }

    /* Primary button styling */
    .primary-button {
        background-color: #39e5e2;
        color: #1f2937;
        border: none;
        border-radius: 8px;
        padding: 0.7em 1.4em;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(57, 229, 226, 0.2);
        transition: all 0.2s ease;
    }

    .primary-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(57, 229, 226, 0.3);
    }

    /* Secondary button styling */
    .secondary-button {
        background-color: #f3f4f6;
        color: #4b5563;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 0.7em 1.4em;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .secondary-button:hover {
        background-color: #e5e7eb;
    }

    /* Shared disabled style */
    button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
</style>