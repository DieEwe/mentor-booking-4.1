<script lang="ts">
    import { onMount } from 'svelte';

    export let hideInDarkMode = false;

    // Position props
    export let x: string = "50%"; // horizontal position (can be px, %, vh, etc)
    export let y: string = "50%"; // vertical position
    
    // Size props
    export let size: string = "400px"; // diameter of circle
    
    // Color props
    export let primaryColor: string = "rgba(57, 229, 226, 0.6)"; // center color
    export let secondaryColor: string = "rgba(57, 229, 226, 0.3)"; // middle color
    export let tertiaryColor: string = "rgba(57, 229, 226, 0.1)"; // outer color
    
     // Dark mode color props (new addition)
    export let darkModePrimaryColor: string = "rgba(255, 255, 255, 0.6)";   // Yellow color
    export let darkModeSecondaryColor: string = "rgba(255, 255, 255, 0.3)"; // Yellow color
    export let darkModeTertiaryColor: string = "rgba(255, 255, 255, 0.1)";  // Yellow color

    // Intensity props
    export let centerOpacity: number = 0.6;
    export let midOpacity: number = 0.3;
    export let outerOpacity: number = 0.1;
    
    // Z-index for stacking
    export let zIndex: number = -1;
    
    // Animation props
    export let animate: boolean = false;
    export let animationDuration: string = "10s";
    
    // Responsive control
    export let responsive: boolean = true;
    
    // Fixed position or follow a specific corner
    export let position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'custom' = 'custom';
    
    // Internal state
    let windowWidth: number;
    let windowHeight: number;
    let computedX: string;
    let computedY: string;
    let computedSize: string;
    let isDarkMode = false;

        // Check current theme
        onMount(() => {
        if (typeof window !== 'undefined') {
            // Initial check for dark mode
            isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
            
            // Listen for theme changes
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.attributeName === 'data-theme') {
                        isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
                    }
                });
            });
            
            observer.observe(document.documentElement, { attributes: true });
            return () => observer.disconnect();
        }
    });
    
    // Add a class name for specific targeting
    export let className: string = "";

    // Parse color to create versions with different opacities
    function getColorWithOpacity(color: string, opacity: number): string {
        // If color is already in rgba format
        if (color.startsWith("rgba")) {
            return color.replace(/[\d.]+\)$/, `${opacity})`);
        }
        
        // If color is in hex or other format, convert to rgba
        return `${color.split(")")[0]}, ${opacity})`.replace("rgb", "rgba");
    }
    
    // Handle resize and update positioning
    function updateResponsiveValues() {
        if (!responsive || !windowWidth) return;
        
        // Position based on screen size
        if (position === 'custom') {
            // For custom positioning, still apply size responsiveness
            computedX = x;
            computedY = y;
        } else if (position === 'center') {
            computedX = "50%";
            computedY = "50%";
        } else if (position === 'top-left') {
            computedX = "15%";
            computedY = "15%";
        } else if (position === 'top-right') {
            computedX = "85%";
            computedY = "15%";
        } else if (position === 'bottom-left') {
            computedX = "15%";
            computedY = "85%";
        } else if (position === 'bottom-right') {
            computedX = "85%";
            computedY = "85%";
        }
        
        // Size based on screen width
        if (windowWidth <= 640) {
            // Mobile
            computedSize = Math.min(windowWidth * 0.9, 400) + "px";
        } else if (windowWidth <= 1024) {
            // Tablet
            computedSize = Math.min(windowWidth * 0.7, 600) + "px";
        } else {
            // Desktop
            computedSize = Math.min(windowWidth * 0.5, 800) + "px";
        }
    }
    
    onMount(() => {
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                windowWidth = window.innerWidth;
                windowHeight = window.innerHeight;
                updateResponsiveValues();
            };
            
            windowWidth = window.innerWidth;
            windowHeight = window.innerHeight;
            updateResponsiveValues();
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    });
    
    // Update values when props change
    $: {
        if (!responsive) {
            computedX = x;
            computedY = y;
            computedSize = size;
        } else if (windowWidth) {
            updateResponsiveValues();
        }
    }

    // New reactive statement to get the current theme colors
    $: currentPrimaryColor = isDarkMode ? darkModePrimaryColor : primaryColor;
    $: currentSecondaryColor = isDarkMode ? darkModeSecondaryColor : secondaryColor;
    $: currentTertiaryColor = isDarkMode ? darkModeTertiaryColor : tertiaryColor;
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<!-- Only render the circle if we're not in dark mode or hideInDarkMode is false -->
{#if !(isDarkMode && hideInDarkMode)}
<div 
    class="gradient-circle {className}" 
    style="
        left: {computedX || x}; 
        top: {computedY || y}; 
        width: {computedSize || size}; 
        height: {computedSize || size}; 
        z-index: {zIndex};
        animation: {animate ? `pulse ${animationDuration} infinite alternate` : 'none'};
        background: radial-gradient(
            circle at center,
            {getColorWithOpacity(primaryColor, centerOpacity)} 0%,
            {getColorWithOpacity(secondaryColor, midOpacity)} 30%,
            {getColorWithOpacity(tertiaryColor, outerOpacity)} 60%,
            rgba(255, 255, 255, 0) 70%
        );
    "
>
</div>
{/if}

<style>
    .gradient-circle {
        position: absolute;
        border-radius: 50%;
        pointer-events: none; /* Makes the circle non-interactive */
        transform: translate(-50%, -50%); /* Centers the circle on the specified coordinates */
    }
    
    @keyframes pulse {
        0% {
            transform: translate(-50%, -50%) scale(0.95);
            opacity: 0.9;
        }
        100% {
            transform: translate(-50%, -50%) scale(1.05);
            opacity: 1;
        }
    }
</style>

<!-- Basic usage with full responsiveness:
<GradientCircle 
    primaryColor="rgba(57, 229, 226, 0.8)"
    position="top-right"
    animate={true}
/>
Custom positioning but responsive sizing:
<GradientCircle 
    x="500px" 
    y="300px"
    position="custom" 
    primaryColor="rgba(57, 229, 226, 0.8)"
/>
Fixed size and position (no responsiveness):
<GradientCircle 
    x="500px" 
    y="300px" 
    size="800px" 
    responsive={false} 
    primaryColor="rgba(57, 229, 226, 0.8)"
/> -->
