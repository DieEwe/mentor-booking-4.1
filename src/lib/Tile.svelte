<script lang="ts">
    export let title: string = '';
  </script>
  
  <div class="tile">
    {#if title}
      <h2>{title}</h2>
    {:else}
      <slot />
    {/if}
  </div>
  
  <style>
    .tile {
      background-color: var(--secondary);
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }
    .tile:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    h2 {
      font-size: 1.5rem;
      /* Update text color reference */
      color: var(--text);
      margin: 0;
    }
  </style>
  