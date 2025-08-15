// Component Loader Utility
class ComponentLoader {
    static async loadComponent(componentPath, targetElement) {
        try {
            const response = await fetch(componentPath);
            const html = await response.text();
            
            if (typeof targetElement === 'string') {
                const element = document.querySelector(targetElement);
                if (element) {
                    element.innerHTML = html;
                }
            } else if (targetElement) {
                targetElement.innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading component from ${componentPath}:`, error);
        }
    }

    static async loadComponents(components) {
        const promises = components.map(component => 
            this.loadComponent(component.path, component.target)
        );
        
        await Promise.all(promises);
    }
}

// Usage example:
// ComponentLoader.loadComponent('components/hero.html', '#hero-container');
// 
// Or load multiple components:
// ComponentLoader.loadComponents([
//     { path: 'components/hero.html', target: '#hero-container' }
// ]);
