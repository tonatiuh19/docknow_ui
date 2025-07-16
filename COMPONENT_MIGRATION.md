# Component Architecture Migration Guide

This project has been restructured to follow an Angular-like component architecture where each component has its own folder containing:

## New Structure

```
components/
├── ComponentName/
│   ├── ComponentName.tsx      # Main component file
│   ├── ComponentName.module.css # Component-specific styles
│   └── index.ts              # Export file for clean imports
```

## Migration Status ✅

**🎉 COMPONENT RESTRUCTURING COMPLETE!**

The development server is now running successfully at http://localhost:3000 with the new component architecture.

✅ **Hero** - Fully migrated with CSS modules
✅ **Header** - Fully migrated with CSS modules  
✅ **SearchBar** - Partially migrated (example implementation)
✅ **All Components** - Successfully restructured with proper folder architecture

### Fixed Issues:

- ✅ Import paths corrected for all components
- ✅ Development server compiling successfully
- ✅ All components have proper index.ts files
- ✅ CSS module structure in place for all components

## Remaining Components

The following components have been restructured but still need their styles extracted to CSS modules:

- [ ] FeaturedPorts
- [ ] FeaturedPrivatePorts
- [ ] Features
- [ ] Footer
- [ ] Layout
- [ ] Notifications
- [ ] PortCard
- [ ] PortFilters
- [ ] PortsList
- [ ] PortsMap
- [ ] ReadyToFindPortCTA
- [ ] InteractivePortMap

## Migration Process

### For each component:

1. **Extract Tailwind classes** from JSX into semantic CSS classes
2. **Create CSS module file** (ComponentName.module.css)
3. **Update component file** to import and use the CSS module
4. **Test the component** to ensure styling is preserved

### CSS Module Guidelines

- Use semantic class names (e.g., `.container`, `.title`, `.button`)
- Convert Tailwind utilities to regular CSS properties
- Use CSS custom properties for colors (already defined in variables.css)
- Maintain responsive design with media queries
- Group related styles together

### Example Migration

**Before (Tailwind in JSX):**

```tsx
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Title</h2>
  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    Click me
  </button>
</div>
```

**After (CSS Modules):**

```tsx
import styles from "./Component.module.css";

<div className={styles.container}>
  <h2 className={styles.title}>Title</h2>
  <button className={styles.button}>Click me</button>
</div>;
```

**CSS Module (Component.module.css):**

```css
.container {
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: box-shadow 300ms;
}

.container:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 1rem;
}

.button {
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: background-color 300ms;
}

.button:hover {
  background: #1d4ed8;
}
```

## Benefits

1. **Better maintainability** - Styles are co-located with components
2. **Scoped styling** - CSS modules prevent style conflicts
3. **Improved performance** - Only load styles for used components
4. **Developer experience** - Clear separation of concerns
5. **Angular-like structure** - Familiar pattern for Angular developers

## Usage

Components can still be imported the same way thanks to index.ts files:

```tsx
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
```

## Global Styles

Global styles remain in:

- `styles/globals.css` - Global resets and base styles
- `styles/variables.css` - CSS custom properties
- `styles/components.css` - Utility classes (to be gradually phased out)

## Next Steps

1. Complete the CSS module migration for all remaining components
2. Test each component thoroughly
3. Remove unused Tailwind classes from components.css
4. Update any page-level imports if needed
5. Consider implementing a similar structure for pages if desired
