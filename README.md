# 🦜 Zycash Dashboard

## 📋 Detail
Zycash Dashboard is a modern web dashboard built with Next.js 15+, Tailwind CSS 4, and TypeScript. It provides a robust foundation for scalable, maintainable, and beautiful web applications.

## 📄 Product Requirement & Design

| Item                | Link                                 |
|---------------------|--------------------------------------|
| Product Requirement | [Insert Product Requirement Link Here]|
| Design              | https://www.figma.com/design/UxKmnm1zQ7UnYHq82GYAch/Zycas-Revamp-V2?node-id=3146-1469&p=f&t=7ZvMWZYEK2G9MsS0-0            |


## 🧑‍💻 Tech Stack
- **Framework:** Next.js 15+
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript
- **UI Components:** Radix UI, Lucide, Tabler Icons
- **State/Form:** React Hook Form, Zod
- **Authentication:** NextAuth.js
- **Testing:** Vitest, Playwright, Testing Library
- **Linting/Formatting:** Biome, Commitlint, Husky
- **Others:** Vite, Storybook

## 🏛️ Architecture

This architecture follows Domain-Driven Design (DDD), modular organization, and Atomic Design for UI components. It ensures scalability, maintainability, and optimal team collaboration by enforcing clear separation of concerns.

### Core Principles
- **Domain-Driven Design:** Business domains are clearly separated and define their own models and rules.
- **Modular Architecture:** Features are organized into self-contained modules.
- **Atomic Design:** UI components follow a hierarchical composition pattern (Atoms, Molecules, Organisms).
- **Separation of Concerns:** Clear boundaries between business logic, presentation, and infrastructure.

### Layered Structure
- **Domains:** Business logic and models, organized by domain.
- **Modules:** Feature-specific logic, state, and components.
- **Shared/UI Components:** Reusable UI elements built using Atomic Design (Atoms, Molecules, Organisms).
- **Layouts/Templates:** Define page structure and composition.
- **Container Components:** Handle data fetching and business logic.
- **Presentation Components:** Focus on rendering UI.

### Component Decomposition & UI Slicing
- **Decomposition Strategy:**
  - Single Responsibility: Each component has one clear responsibility.
  - Composition Over Inheritance: Build complex components by composing simpler ones.
  - Encapsulation: Hide implementation details in components.
  - Separate Logic & Presentation: Business logic is separated from UI rendering.
- **Atomic Design Hierarchy:**
  - **Atoms:** Basic elements (Button, Input, Typography)
  - **Molecules:** Combinations of atoms (FormField, SearchBar)
  - **Organisms:** Complex compositions (DataTable, Modal)
- **UI Slicing Process:**
  1. Analyze design mockups and identify component patterns
  2. Identify responsive behaviors and breakpoints
  3. Map out component hierarchy (atoms, molecules, organisms)
  4. Implement skeleton components and apply TailwindCSS utility classes
  5. Ensure accessibility and responsive design

#### Example: Product Listing Decomposition
```
ProductListingPage
├── FilterSidebar (Organism)
│   ├── PriceRangeFilter (Molecule)
│   │   ├── RangeSlider (Molecule)
│   │   │   ├── Slider (Atom)
│   │   │   └── Input (Atom)
│   │   └── Button (Atom)
│   └── CategoryFilter (Molecule)
│       ├── Checkbox (Atom)
│       └── List (Atom)
└── ProductGrid (Organism)
    └── ProductCard (Molecule)
        ├── Image (Atom)
        ├── Typography (Atom)
        ├── Badge (Atom)
        └── Button (Atom)
```

### Reusability & Functionality
- **Prop-Based Configuration:** Components accept props for flexible behavior and appearance.
- **Component Composition:** Compose components to build new functionality.
- **Hooks:** Share logic between components.
- **Variants & Props:** Components support variants and configurations.
- **Compound Components:** Related components grouped for cohesive functionality.
- **Controlled & Uncontrolled Patterns:** Support both usage patterns where appropriate.
- **Comprehensive Documentation:** Each component documents its purpose, API, and examples.

#### Example: Button Component API
```ts
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
}
```

### Data Flow & State Management
- **Unidirectional Data Flow:** Data flows down via props; events flow up via callbacks.
- **State Management Layers:**
  - Local component state for UI-specific state
  - Module state for feature-specific state (e.g., Zustand)
  - Global state for app-wide state
- **Data Fetching:**
  - **React Query:** Server state management and caching
  - **Axios:** HTTP client for API interactions
  - **Custom Hooks:** Encapsulate data fetching and logic
- **Separation of Logic from UI:**
  - Custom hooks encapsulate business logic
  - Container components handle data fetching and state
  - Presentation components focus on rendering

#### Example: Product Feature Data Flow
1. User applies filters in the UI
2. Filter state updates in the product store (Zustand)
3. React Query fetches data from API with updated filters
4. UI components re-render with new data

### Implementation Plan
1. **Foundation Setup:** Project initialization, domain models, core infrastructure
2. **UI Component Library:** Atomic design implementation, Storybook, documentation
3. **Feature Development:** Module implementation, backend integration, end-to-end testing
4. **Performance Optimization:** Bundle size, code splitting, profiling
5. **Deployment & Launch:** Production config, monitoring, analytics

---
This architecture supports team autonomy, code reusability, business alignment, technical excellence, and maintainability. For more details, see the POC documentation.

## 🚀 How to Start & Release

### Start Development
```bash
pnpm install
pnpm dev
```

### Build for Production
```bash
pnpm build
```

### Run Tests
```bash
pnpm test
pnpm test:e2e
```

### Release
Release is automated via semantic-release. Push to the `main` branch to trigger a release.

## 📦 Package List & Why We Need Them

| Package(s) | Purpose / Why We Need It |
|------------|-------------------------|
| **next**, **react**, **react-dom** | Core framework and React runtime |
| **tailwindcss**, **tailwind-merge**, **tailwind-variants**, **tailwindcss-animate** | Styling utilities |
| **@radix-ui/*** | Accessible UI primitives for fast UI development |
| **lucide-react**, **@tabler/icons-react** | Icon libraries |
| **next-auth** | Authentication solution for Next.js |
| **react-hook-form**, **zod**, **@hookform/resolvers** | Form state management and validation |
| **vite**, **@vitejs/plugin-react** | Fast development/build tooling |
| **vitest**, **@testing-library/***, **playwright** | Testing tools for unit, integration, and e2e |
| **biome**, **commitlint**, **husky**, **lint-staged** | Code quality, linting, and git hooks |
| **storybook** | UI component documentation and development |
| **date-fns** | Date utilities |
| **consola** | Elegant console logger |
| **embla-carousel-react** | Carousel/slider component |
| **kbar** | Command bar for navigation |
| **nuqs** | Query string state management |
| **sonner** | Toast notification |
| **drizzle-kit** | ORM/Database toolkit (if used in project) |

> _For a full list and rationale, see `package.json`._

---

Feel free to update the Product Requirement and Design links above. For more detailed documentation, see the `docs/` folder.
