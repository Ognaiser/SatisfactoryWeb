# SatisfactoryTour by GPT 5

A modern React TypeScript project template with Redux Toolkit and React Router.

## Technology Stack

- **Build Tool**: [Vite](https://vitejs.dev/) - Fast build tool and development server
- **Package Manager**: [pnpm](https://pnpm.io/) - Fast, disk space efficient package manager
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- **Framework**: [React](https://reactjs.org/) - UI library for building user interfaces
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) - Modern Redux with simplified API
- **Routing**: [React Router](https://reactrouter.com/) - Declarative routing for React
- **Code Quality**: [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) - Linting and formatting

## Project Structure

```
src/
├── components/          # Reusable React components
├── pages/              # Route-specific page components
│   ├── Home.tsx        # Home page component
│   └── About.tsx       # About page component
├── router/             # React Router configuration
│   └── index.tsx       # Router setup and route definitions
├── store/              # Redux store configuration
│   ├── index.ts        # Store setup and type definitions
│   └── slices/         # Redux Toolkit slices
│       └── counterSlice.ts # Example counter slice
├── styles/             # CSS and styling files
├── types/              # TypeScript type definitions
├── App.tsx             # Main App component
└── main.tsx            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SatisfactoryTour
```

2. Install dependencies:
```bash
pnpm install
```

### Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Building

Build for production:
```bash
pnpm build
```

Preview the production build:
```bash
pnpm preview
```

### Code Quality

Run ESLint:
```bash
pnpm lint
```

Format code with Prettier:
```bash
pnpm format
```

## Features

- ⚡️ Fast development with Vite HMR
- 🎯 TypeScript for type safety
- 🗂 Redux Toolkit for predictable state management
- 🚦 React Router for client-side routing
- 📏 ESLint + Prettier for code quality
- 🏗️ Modern project structure
- 📦 pnpm for efficient package management

## Development Guidelines

- Use functional components with hooks
- Implement proper TypeScript typing
- Follow Redux Toolkit patterns for state management
- Use React Router v6 syntax
- Maintain consistent code formatting with Prettier
- Follow ESLint rules for code quality

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier