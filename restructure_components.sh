#!/bin/bash

# Components to restructure (excluding Hero and Header which are already done)
components=(
  "SearchBar"
  "FeaturedPorts"
  "FeaturedPrivatePorts"
  "Features"
  "Footer"
  "Layout"
  "Notifications"
  "PortCard"
  "PortFilters"
  "PortsList"
  "PortsMap"
  "ReadyToFindPortCTA"
  "InteractivePortMap"
)

# Base directory
base_dir="/Users/felixgomez/Code/docknow_ui/components"

for component in "${components[@]}"; do
  echo "Processing $component..."
  
  # Check if the component file exists
  if [ -f "$base_dir/$component.tsx" ]; then
    # Create component folder
    mkdir -p "$base_dir/$component"
    
    # Move the component file to the new folder and rename it
    mv "$base_dir/$component.tsx" "$base_dir/$component/$component.tsx"
    
    # Create index.ts file for re-export
    echo "export { default } from './$component';" > "$base_dir/$component/index.ts"
    
    # Create empty CSS module file
    touch "$base_dir/$component/$component.module.css"
    
    echo "✓ Restructured $component"
  else
    echo "⚠ $component.tsx not found, skipping..."
  fi
done

echo "Component restructuring complete!"
