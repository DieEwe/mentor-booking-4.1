<!-- src/lib/components/ClickableName.svelte -->
<script lang="ts">
    export let companyname: string;
    export let href: string | undefined = undefined; // Optional href
    export let target: string | undefined = undefined; // Optional target
  </script>
  
  {#if href}
    <a {href} {target} class="clickable-name">
      {companyname}
    </a>
  {:else}
    <span class="clickable-name">
      {companyname}
      <slot /> <!-- For click events or other interactions -->
    </span>
  {/if}
  
  <style>
    .clickable-name {
      color: #007bff; /* Example: Bootstrap primary color */
      text-decoration: none;
      cursor: pointer;
    }
  
    .clickable-name:hover {
      text-decoration: underline;
      color: #0056b3;
    }
  
    a.clickable-name {
      display: inline-block; /* Prevents line breaks */
    }
  </style>