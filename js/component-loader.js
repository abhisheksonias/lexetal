/**
 * Component Loader - Loads HTML components dynamically
 */

// Function to load the brands-clients component
async function loadBrandsClients(containerId) {
    try {
        const response = await fetch('components/brands-clients.html');
        if (!response.ok) {
            throw new Error(`Failed to load component: ${response.status}`);
        }
        
        const componentHTML = await response.text();
        const container = document.getElementById(containerId);
        
        if (container) {
            container.innerHTML = componentHTML;
            
            // Execute any scripts within the component
            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.head.appendChild(newScript);
            });
            
            return true;
        } else {
            console.error(`Container with ID '${containerId}' not found`);
            return false;
        }
    } catch (error) {
        console.error('Error loading brands-clients component:', error);
        return false;
    }
}

// Generic component loader function
async function loadComponent(componentPath, containerId) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`Failed to load component: ${response.status}`);
        }
        
        const componentHTML = await response.text();
        const container = document.getElementById(containerId);
        
        if (container) {
            container.innerHTML = componentHTML;
            
            // Execute any scripts within the component
            const scripts = container.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.head.appendChild(newScript);
            });
            
            return true;
        } else {
            console.error(`Container with ID '${containerId}' not found`);
            return false;
        }
    } catch (error) {
        console.error(`Error loading component from ${componentPath}:`, error);
        return false;
    }
}