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
      background-color: #fff;
      border-radius: 8px;
      padding: 1rem;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .tile:hover {
      transform: scale(1.02);
    }
    h2 {
      font-size: 1.5rem;
      color: var(--text-color);
      margin: 0;
    }
  </style>
  