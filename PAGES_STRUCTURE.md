# Pages Structure - Angular-like Organization

This project now follows an Angular-like folder structure where each page has its own dedicated folder containing both the component file and its styles.

## Final Structure

```
pages/
├── _app.tsx                           # Next.js App component (unchanged)
├── _document.tsx                      # Next.js Document component (unchanged)
├── index.tsx                          # Route redirector to home page
├── ports_new.tsx                      # Route redirector to ports-new page
│
├── home/                              # Home page (/)
│   ├── index.tsx                     # Home page component
│   └── home.module.css               # Home page styles
│
├── reservations/                      # Reservations page (/reservations)
│   ├── index.tsx                     # Reservations page component
│   └── reservations.module.css       # Reservations page styles
│
├── ports/                             # Ports routes
│   ├── index.tsx                     # Route redirector to ports-list (/ports)
│   ├── [portId].tsx                  # Port detail page (/ports/[portId])
│   └── port-detail/                  # Port detail styles folder
│       └── port-detail.module.css    # Port detail styles
│
├── ports-list/                       # Ports listing page (internal)
│   ├── index.tsx                     # Ports list component
│   └── ports.module.css              # Ports list styles
│
├── ports-new/                        # New ports page (internal)
│   ├── index.tsx                     # New ports component
│   └── ports-new.module.css          # New ports styles
│
├── auth/                              # Authentication pages
│   ├── signin/                       # Sign in page (/auth/signin)
│   │   ├── index.tsx                 # Sign in component
│   │   └── signin.module.css         # Sign in styles
│   └── signup/                       # Sign up page (/auth/signup)
│       ├── index.tsx                 # Sign up component
│       └── signup.module.css         # Sign up styles
│
└── booking/                           # Booking pages
    ├── [portId].tsx                  # Port booking page (/booking/[portId])
    └── port-detail/                  # Booking styles folder
        └── booking.module.css        # Booking styles
```

## Benefits of This Structure

1. **Separation of Concerns**: Each page has its own dedicated folder with styles
2. **Better Organization**: Similar to Angular component structure
3. **Maintainability**: Easier to find and modify page-specific styles
4. **Scalability**: Easy to add more files per page (tests, utils, etc.)
5. **Consistent Spacing**: All pages now have proper header clearance CSS classes
6. **Route Compatibility**: All original routes still work through redirectors

## Styling Approach

Each page now has its own CSS module with:

- Responsive header spacing (8rem → 10rem → 12rem across breakpoints)
- Consistent container widths and padding
- Page-specific styling classes
- Proper header clearance for all pages

## Routing

The routing is maintained through redirector files:

- `/` → `home/index.tsx`
- `/reservations` → `reservations/index.tsx`
- `/ports` → `ports-list/index.tsx` (via `ports/index.tsx` redirector)
- `/ports_new` → `ports-new/index.tsx` (via `ports_new.tsx` redirector)
- `/auth/signin` → `auth/signin/index.tsx`
- `/auth/signup` → `auth/signup/index.tsx`
- `/booking/[portId]` → `booking/[portId].tsx`
- `/ports/[portId]` → `ports/[portId].tsx`

## CSS Module Import Pattern

Each component imports its styles using relative paths:

```tsx
import styles from "./component-name.module.css";
// or for dynamic routes:
import styles from "./folder/component-name.module.css";
```

This ensures styles are scoped to each component and prevents naming conflicts.

## Route Redirectors

Some routes use redirector files to maintain Next.js routing while keeping the organized folder structure:

- `pages/index.tsx` → redirects to `pages/home/`
- `pages/ports/index.tsx` → redirects to `pages/ports-list/`
- `pages/ports_new.tsx` → redirects to `pages/ports-new/`

These redirectors properly import and re-export both the default component and any `getStaticProps` functions.
