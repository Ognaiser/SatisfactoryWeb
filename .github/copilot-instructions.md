<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# SatisfactoryTour - Copilot Instructions

A modern React TypeScript application for Satisfactory game planning and tour management with comprehensive UI components and interactive mapping capabilities.

## Technology Stack

### Core Technologies
- **Build Tool**: [Vite](https://vitejs.dev/) v7.1.7 - Fast build tool and development server
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- **Language**: [TypeScript](https://www.typescriptlang.org/) v5.9.3 - Typed superset of JavaScript
- **Framework**: [React](https://reactjs.org/) v18.3.1 - UI library for building user interfaces

### State Management & Routing
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) v2.2.5 - Modern Redux with simplified API
- **React Redux**: v9.1.2 - Official React bindings for Redux
- **Routing**: [React Router](https://reactrouter.com/) v6.26.2 - Declarative routing for React

### UI Framework & Styling
- **UI Library**: [Material-UI (MUI)](https://mui.com/) v5.15.15 - React component library
- **Icons**: [@mui/icons-material](https://mui.com/material-ui/icons/) v5.15.15 - Material Design icons
- **Emotion**: [@emotion/react](https://emotion.sh/) v11.11.4 & [@emotion/styled](https://emotion.sh/) v11.11.5 - CSS-in-JS library
- **Theme System**: MUI Theme Provider with custom dark/light mode implementation

### Mapping & Interactive Features
- **Maps**: [Leaflet](https://leafletjs.com/) v1.9.4 - Open-source JavaScript library for mobile-friendly interactive maps
- **React Leaflet**: [react-leaflet](https://react-leaflet.js.org/) v4.2.1 - React components for Leaflet maps

### Code Quality & Development
- **Linting**: [ESLint](https://eslint.org/) v9.36.0 with TypeScript support
- **Formatting**: [Prettier](https://prettier.io/) v3.4.2 - Code formatter
- **Type Checking**: TypeScript with strict configuration

## Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── AppBar/             # Application bar component
│   │   ├── index.tsx       # Main AppBar component + export
│   │   ├── AppBar.d.ts     # Type definitions
│   │   └── UserMenu.tsx    # Supporting component
│   ├── AppBreadcrumbs/     # Navigation breadcrumb component
│   │   └── index.tsx       # Main component + export
│   ├── NavigationDrawer/   # Navigation drawer component
│   │   └── index.tsx       # Main component + export
│   ├── ReduxThemeProvider/ # Theme context provider with Redux integration
│   │   └── index.tsx       # Main component + export
│   └── ThemeToggle/        # Dark/light mode toggle button
│       └── index.tsx       # Main component + export
├── pages/                  # Route-specific page components
│   ├── about/              # About page
│   │   └── index.tsx       # Main page + export
│   ├── home/               # Landing/home page
│   │   └── index.tsx       # Main page + export
│   ├── login/              # User authentication page
│   │   └── index.tsx       # Main page + export
│   ├── settings/           # Application settings and user preferences
│   │   └── index.tsx       # Main page + export
│   ├── calculator/         # Calculator feature pages
│   │   ├── advanced/       # Advanced calculator functionality
│   │   │   └── index.tsx   # Main page + export
│   │   └── simple/         # Simple calculator interface
│   │       └── index.tsx   # Main page + export
│   └── map/                # Interactive map page
│       ├── index.tsx       # Main page + export
│       └── InteractiveMap.tsx # Supporting component
├── router/                 # React Router configuration
│   └── index.tsx           # Router setup and route definitions
├── store/                  # Redux store configuration
│   ├── index.ts            # Store setup and type definitions
│   ├── hooks.ts            # Typed Redux hooks (useAppSelector, useAppDispatch)
│   └── slices/             # Redux Toolkit slices
│       ├── drawerSlice.ts  # Navigation drawer state management
│       ├── themeSlice.ts   # Theme mode state management
│       └── userSlice.ts    # User state management
├── assets/                 # Static assets
└── App.tsx                 # Main application component with layout
```

### Folder Structure Rules

#### Components (`src/components/`)
All reusable components must follow this structure:

**Component Folder Naming**: Use **PascalCase** for component folder names
```
components/
└── ComponentName/          # PascalCase folder name
    ├── index.tsx           # Main component + default export
    ├── ComponentName.d.ts  # Type definitions (interfaces, types, props)
    ├── SupportingComponent.tsx  # Single small supporting component (same file)
    └── ComplexSubComponent/     # Multiple/complex supporting components (subfolder)
        ├── index.tsx
        └── ComplexSubComponent.d.ts
```

**Component File Structure**:
- `index.tsx`: Contains the main component implementation and must include the default export
- `ComponentName.d.ts`: Contains all TypeScript type definitions, interfaces, and prop types
- Supporting components:
  - **Single small component**: Create `SupportingComponent.tsx` in the same folder
  - **Multiple or complex components**: Create a subfolder following the same component rules

**Example Component Structure**:
```
components/
├── AppBar/
│   ├── index.tsx           # Main AppBar component
│   ├── AppBar.d.ts         # AppBarProps, MenuItemType, etc.
│   └── UserMenu.tsx        # Small supporting component
└── DataTable/
    ├── index.tsx           # Main DataTable component
    ├── DataTable.d.ts      # DataTableProps, ColumnDefinition, etc.
    ├── TableHeader/        # Complex supporting component
    │   ├── index.tsx
    │   └── TableHeader.d.ts
    └── TableRow/           # Complex supporting component
        ├── index.tsx
        └── TableRow.d.ts
```

#### Pages (`src/pages/`)
All page components must follow this structure:

**Page Folder Naming**: Use **snake_case** for page folder names
```
pages/
└── page_name/              # snake_case folder name
    ├── index.tsx           # Main page component + default export
    ├── PageComponent/      # Supporting components (follow component rules)
    │   ├── index.tsx
    │   └── PageComponent.d.ts
    └── SubPage/            # Sub-pages/routes (follow page rules)
        └── index.tsx
```

**Page File Structure**:
- `index.tsx`: Contains the main page implementation and must include the default export
- Supporting components: Create component folders following the **component folder rules** (PascalCase)
- Sub-pages: Create page folders following the **page folder rules** (snake_case)

**Example Page Structure**:
```
pages/
├── home/
│   └── index.tsx           # Simple page, no supporting components
├── login/
│   └── index.tsx           # Simple page
├── calculator/
│   ├── advanced/           # Sub-page
│   │   └── index.tsx
│   └── simple/             # Sub-page
│       └── index.tsx
└── map/
    ├── index.tsx           # Main map page
    └── InteractiveMap.tsx  # Single supporting component
```

#### Key Rules Summary
1. **Components**: Always use **PascalCase** for folder names
2. **Pages**: Always use **snake_case** for folder names
3. **Main Files**: Always named `index.tsx` with default export
4. **Type Files**: Named `ComponentName.d.ts` for type definitions
5. **Supporting Components**:
   - Small/single: `SupportingComponent.tsx` in same folder
   - Complex/multiple: Create subfolder with full component structure
6. **Imports**: Always import from the folder, not the index file directly
   ```tsx
   // Correct
   import AppBar from '../components/AppBar'
   import Home from '../pages/home'
   
   // Incorrect
   import AppBar from '../components/AppBar/index'
   ```

## Development Guidelines

### Component Architecture
- **Functional Components**: Use React functional components with hooks exclusively
- **TypeScript Integration**: Implement comprehensive TypeScript typing for all components, props, and state
- **Material-UI First**: Prefer MUI components over native HTML elements for consistency
- **Responsive Design**: Implement mobile-first responsive design using MUI breakpoints

### State Management Patterns
- **Redux Toolkit Slices**: Use RTK slices for state logic with proper TypeScript typing
- **Typed Hooks**: Use custom typed hooks from `store/hooks.ts` (`useAppSelector`, `useAppDispatch`)
- **Immutable Updates**: Follow Redux Toolkit patterns for immutable state updates
- **Slice Organization**: Organize related state logic in focused slices (theme, drawer, etc.)

### Styling Approach
- **MUI sx Prop**: Primary styling method using MUI's sx prop for component styling
- **Theme Integration**: Leverage MUI theme tokens for consistent spacing, colors, and typography
- **Responsive Values**: Use responsive values in sx prop: `sx={{ p: { xs: 1, md: 2 } }}`
- **Theme-Aware Styling**: Implement theme mode-dependent styling for dark/light modes

### Import Organization
```tsx
// React and hooks first
import React, { useState, useEffect } from 'react'
import type { ReactNode } from 'react'

// Third-party libraries
import { Box, Typography, Button } from '@mui/material'
import { Home as HomeIcon } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// Local imports (relative paths)
import { ComponentName } from '../components/ComponentName'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import type { RootState } from '../store'
```

### Component Template
```tsx
import React from 'react'
import { Box, Typography, Paper } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'

interface ComponentNameProps {
  title: string
  children?: React.ReactNode
  sx?: SxProps<Theme>
  optional?: boolean
}

export default function ComponentName({ 
  title, 
  children,
  sx,
  optional = false 
}: ComponentNameProps) {
  return (
    <Paper 
      elevation={2} 
      sx={[
        { p: 2, borderRadius: 2 },
        ...(Array.isArray(sx) ? sx : [sx])
      ]}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {children}
    </Paper>
  )
}
```

### Material-UI Best Practices
- **sx Prop Over styled**: Use sx prop for styling instead of styled components
- **Theme Tokens**: Leverage theme spacing, palette, and typography tokens
- **Component Composition**: Compose complex UIs using MUI's component system
- **Accessibility**: Ensure proper ARIA labels and keyboard navigation
- **Performance**: Use component lazy loading and memoization where appropriate

### TypeScript Conventions
- **Strict Configuration**: Maintain strict TypeScript configuration
- **Interface Definitions**: Define clear interfaces for component props and state
- **Type Safety**: Ensure type safety across Redux store, API calls, and component props
- **Generic Types**: Use generic types for reusable components and utilities

## Available Scripts

```bash
# Development
pnpm dev          # Start development server with hot reload
pnpm build        # Build for production (TypeScript compilation + Vite build)
pnpm preview      # Preview production build locally

# Code Quality
pnpm lint         # Run ESLint with TypeScript support
pnpm format       # Format code with Prettier

# Package Management
pnpm install      # Install dependencies
pnpm add <pkg>    # Add new dependency
pnpm add -D <pkg> # Add development dependency
```

## Feature-Specific Guidelines

### Interactive Mapping (Leaflet)
- Use `react-leaflet` components for map integration
- Implement proper TypeScript typing for Leaflet objects
- Handle map state in Redux when needed for global access
- Consider performance optimization for large datasets

### Theme System
- Use Redux-integrated theme management via `themeSlice`
- Support both automatic (system preference) and manual theme switching
- Implement theme persistence in localStorage
- Ensure consistent theming across all MUI components

### Navigation & Layout
- Implement responsive drawer navigation using MUI Drawer
- Use breadcrumb navigation for deep routes
- Maintain consistent header/toolbar across pages
- Handle mobile navigation patterns appropriately

## Project Context
This is a Satisfactory game planning application that includes:
- Interactive game world mapping capabilities
- Production planning calculators
- User authentication and settings management
- Responsive design for desktop and mobile use
- Modern React/TypeScript development patterns