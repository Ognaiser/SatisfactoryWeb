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
│   ├── AppBreadcrumbs.tsx  # Navigation breadcrumb component
│   ├── ReduxThemeProvider.tsx # Theme context provider with Redux integration
│   └── ThemeToggle.tsx     # Dark/light mode toggle button
├── pages/                  # Route-specific page components
│   ├── About.tsx           # About page with project information
│   ├── Home.tsx            # Landing/home page
│   ├── Login.tsx           # User authentication page
│   ├── Settings.tsx        # Application settings and user preferences
│   ├── calculator/         # Calculator feature pages
│   │   ├── Advanced.tsx    # Advanced calculator functionality
│   │   └── Simple.tsx      # Simple calculator interface
│   └── Map/                # Interactive map components
│       ├── index.tsx       # Map page layout and routing
│       └── InteractiveMap.tsx # Leaflet-based interactive map
├── router/                 # React Router configuration
│   └── index.tsx           # Router setup and route definitions
├── store/                  # Redux store configuration
│   ├── index.ts            # Store setup and type definitions
│   ├── hooks.ts            # Typed Redux hooks (useAppSelector, useAppDispatch)
│   └── slices/             # Redux Toolkit slices
│       ├── drawerSlice.ts  # Navigation drawer state management
│       └── themeSlice.ts   # Theme mode state management
├── assets/                 # Static assets
└── App.tsx                 # Main application component with layout
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

### Routing & Navigation
- **React Router v6**: Use modern React Router v6 syntax and patterns
- **Nested Routes**: Implement nested routing with layout wrappers
- **Navigation Components**: Use MUI navigation components (Drawer, AppBar, Breadcrumbs)
- **Route-based Code Splitting**: Consider lazy loading for page components

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
- Production planning calculators (simple and advanced)
- User authentication and settings management
- Responsive design for desktop and mobile use
- Modern React/TypeScript development patterns