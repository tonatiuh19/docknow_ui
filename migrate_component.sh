#!/bin/bash

# Component Migration Helper Script
# This script helps extract Tailwind classes from components and provides a starting template

component_name="$1"

if [ -z "$component_name" ]; then
  echo "Usage: ./migrate_component.sh <ComponentName>"
  echo "Example: ./migrate_component.sh PortCard"
  exit 1
fi

component_dir="/Users/felixgomez/Code/docknow_ui/components/$component_name"
component_file="$component_dir/$component_name.tsx"
css_file="$component_dir/$component_name.module.css"

if [ ! -f "$component_file" ]; then
  echo "Component file not found: $component_file"
  exit 1
fi

if [ ! -f "$css_file" ] || [ ! -s "$css_file" ]; then
  echo "Creating CSS module template for $component_name..."
  
  cat > "$css_file" << EOF
/* $component_name Component Styles */

.container {
  /* Main container styles */
}

.title {
  /* Title/heading styles */
}

.content {
  /* Content area styles */
}

.button {
  /* Button styles */
}

.card {
  /* Card/item styles */
}

/* Add your component-specific styles here */
/* Convert Tailwind classes to regular CSS */
/* Use CSS custom properties for colors: var(--color-ocean-600) */
/* Add responsive styles with media queries */

@media (min-width: 640px) {
  /* sm: breakpoint styles */
}

@media (min-width: 768px) {
  /* md: breakpoint styles */
}

@media (min-width: 1024px) {
  /* lg: breakpoint styles */
}

@media (min-width: 1280px) {
  /* xl: breakpoint styles */
}
EOF

  echo "✓ Created CSS module template: $css_file"
fi

# Check if the component already imports the CSS module
if ! grep -q "import styles from.*\.module\.css" "$component_file"; then
  echo "Adding CSS module import to $component_name.tsx..."
  
  # Create a backup
  cp "$component_file" "$component_file.backup"
  
  # Add the import after the last import statement
  awk '
    /^import/ { imports[++i] = $0; next }
    !imports_added && NF { 
      for (j=1; j<=i; j++) print imports[j]
      print "import styles from \"./" FILENAME ".module.css\";"
      print ""
      imports_added = 1
    }
    { print }
  ' FILENAME="$component_name" "$component_file" > "$component_file.tmp" && mv "$component_file.tmp" "$component_file"
  
  echo "✓ Added CSS module import to $component_name.tsx"
  echo "📝 Backup created: $component_file.backup"
fi

echo ""
echo "🎯 Migration steps for $component_name:"
echo "1. Open $css_file and add your styles"
echo "2. Replace Tailwind classes in $component_file with styles.className"
echo "3. Test the component to ensure styling is preserved"
echo "4. Remove the backup file when satisfied: rm $component_file.backup"
echo ""
echo "💡 Example conversion:"
echo "  Before: className=\"bg-white rounded-lg p-4\""
echo "  After:  className={styles.container}"
echo ""
echo "📖 See COMPONENT_MIGRATION.md for detailed guidelines"
