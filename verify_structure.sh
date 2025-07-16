#!/bin/bash

echo "🔍 Verifying component imports after restructuring..."
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check for any remaining incorrect relative imports (excluding CSS modules)
echo "Checking for incorrect relative imports..."
incorrect_imports=$(find /Users/felixgomez/Code/docknow_ui/components -name "*.tsx" -exec grep -l 'import.*from "\./[A-Z]' {} \; 2>/dev/null | xargs grep -l 'import.*from "\./[A-Z]' | grep -v 'module.css' || true)

if [ -z "$incorrect_imports" ]; then
    echo -e "${GREEN}✓ No incorrect relative imports found${NC}"
else
    echo -e "${RED}✗ Found incorrect imports in:${NC}"
    echo "$incorrect_imports"
    echo ""
    echo "These should use '../ComponentName' instead of './ComponentName'"
fi

echo ""

# Check that all components have index.ts files
echo "Checking for missing index.ts files..."
missing_index=0
for dir in /Users/felixgomez/Code/docknow_ui/components/*/; do
    if [ -d "$dir" ]; then
        component_name=$(basename "$dir")
        if [ ! -f "$dir/index.ts" ]; then
            echo -e "${RED}✗ Missing index.ts in $component_name${NC}"
            missing_index=1
        fi
    fi
done

if [ $missing_index -eq 0 ]; then
    echo -e "${GREEN}✓ All components have index.ts files${NC}"
fi

echo ""

# Check that all components have their main .tsx file
echo "Checking for missing component files..."
missing_components=0
for dir in /Users/felixgomez/Code/docknow_ui/components/*/; do
    if [ -d "$dir" ]; then
        component_name=$(basename "$dir")
        if [ ! -f "$dir/$component_name.tsx" ]; then
            echo -e "${RED}✗ Missing $component_name.tsx in $component_name folder${NC}"
            missing_components=1
        fi
    fi
done

if [ $missing_components -eq 0 ]; then
    echo -e "${GREEN}✓ All components have their main .tsx files${NC}"
fi

echo ""

# Check that all components have CSS module files
echo "Checking for CSS module files..."
missing_css=0
for dir in /Users/felixgomez/Code/docknow_ui/components/*/; do
    if [ -d "$dir" ]; then
        component_name=$(basename "$dir")
        if [ ! -f "$dir/$component_name.module.css" ]; then
            echo -e "${YELLOW}⚠ Missing $component_name.module.css (this is expected for components not yet migrated)${NC}"
            missing_css=1
        fi
    fi
done

if [ $missing_css -eq 0 ]; then
    echo -e "${GREEN}✓ All components have CSS module files${NC}"
fi

echo ""

# Summary
echo "📊 Component Structure Summary:"
echo "Components with folder structure: $(find /Users/felixgomez/Code/docknow_ui/components -maxdepth 1 -type d | tail -n +2 | wc -l)"
echo "Components with CSS modules: $(find /Users/felixgomez/Code/docknow_ui/components -name "*.module.css" | wc -l)"
echo ""
echo "🎯 Next steps:"
echo "1. Run ./migrate_component.sh for each component to add CSS modules"
echo "2. Follow the examples in Hero and Header components"
echo "3. See COMPONENT_MIGRATION.md for detailed guidelines"
