# Decision Boards

A frontend application built with React and TypeScript for Ganit's Decision Board dashboard project. This platform provides interactive data visualization and decision-making tools for business intelligence.

## Overview

Decision Boards is a comprehensive dashboard solution that helps organizations visualize, track, and analyze business decisions and their impacts. It features:

- Decision archives with filtering and grouping capabilities
- Interactive data visualizations with 25+ chart types 
- Performance metrics tracking for business decisions
- Responsive design for various screen sizes

## Technology Stack

- **Frontend**: React, TypeScript
- **UI Framework**: TailwindCSS, Material UI (MUI)
- **Data Visualization**: Nivo charts library
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Testing**: Jest, React Testing Library
- **Documentation**: TypeDoc

## Pages

### Decision Archive (/archive)
- View historic decisions organized by quarter or insight category
- Filter and sort decisions for easier analysis

### Dashboards (/dashboards)
- Visualize data with multiple chart types:
  - Line, bar, and pie charts for standard visualizations
  - Area bump and stream charts for trend analysis
  - Sankey and chord diagrams for relationship visualization
  - Geospatial charts for geographic data
  - Specialized charts like treemaps, radar charts, and more

### Overview (/overview)
- Track execution excellence with KPIs
- Monitor decision performance and impact

### Decision Inventory (/inventory)
- Manage and categorize business decisions
- Track decision status and implementation

### Decision Insights (/insights)
- Derive insights from historical decisions

### Exception Tracking (/exceptions)
- Identify and monitor anomalies in business metrics
- Track exceptions to expected performance

## Optimization Features
- Lazy loading of charts for performance
- Error boundaries to prevent dashboard crashes
- Responsive design for various devices
- Data validation for consistent visualization

## Project Structure

The project follows a component-based architecture:

```
src/
├── assets/               # Static assets
│   ├── account-avatar.png      # User avatar
│   ├── audience_insights.csv   # Audience insights data
│   ├── Brand_Sentiment.csv     # Brand sentiment data
│   ├── client-logo.jpg         # Client branding
│   ├── Conversion_Rate.csv     # Conversion rate data
│   ├── CTR.csv                 # Click-through rate data
│   ├── Customer_Sentiment.csv  # Customer sentiment data
│   ├── decision_inventory_minified.xml # Decision inventory data
│   ├── ganitinc-logo.ico       # Ganit icon
│   ├── ganitinc-logo.svg       # Ganit logo
│   ├── landing_background.mp4  # Video background for landing page
│   ├── market_share_and_revenue.csv # Market share data
│   ├── chart_data/             # Sample data for charts
│   └── insightscharts/         # Chart images for insights
├── components/           # Reusable UI components
│   ├── ContactUs.tsx           # Contact form component
│   ├── CustomCursor.tsx        # Custom cursor implementation
│   ├── PageNavbar.tsx          # Navigation bar component
│   ├── PageTransition.tsx      # Page transition animations
│   ├── PoweredByGanit.tsx      # Ganit branding component
│   ├── UserNav.tsx             # User navigation component
│   ├── decision_archive/       # Decision history components
│   ├── decision_dashboards/    # Dashboard and chart components
│   ├── decision_insights/      # Insight visualization components
│   ├── decision_inventory/     # Inventory management components
│   ├── exception_tracking/     # Exception handling components
│   ├── overview/               # Overview page components 
│   ├── ui/                     # Generic UI components
│   └── unused/                 # Components pending integration
├── lib/                  # Utilities and helper functions
│   ├── parseXML.ts             # XML parsing utilities
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # General utility functions
├── pages/                # Main application pages
│   ├── DecisionArchive.tsx     # Historic decisions view
│   ├── DecisionDashboard.tsx   # Data visualization dashboards
│   ├── DecisionInsights.tsx    # Business insights view
│   ├── DecisionInventory.tsx   # Decision management system
│   ├── ExceptionTracking.tsx   # Exception monitoring system
│   ├── LandingPage.tsx         # Application entry point
│   └── Overview.tsx            # Dashboard overview page
├── tests/                # Test files
│   ├── DecisionDashboard.test.tsx # Dashboard component tests
│   ├── DecisionInsights.test.tsx  # Insights component tests
│   ├── LandingPage.test.tsx    # Landing page tests
│   ├── Overview.test.tsx       # Overview page tests
│   ├── example.test.tsx        # Example test
│   ├── pages.test.tsx          # General page tests
│   ├── setupTests.ts           # Test configuration
│   └── __mocks__/              # Mock files for testing
├── App.css               # App-specific styles
├── App.tsx               # Main application component
├── index.css             # Global styles
├── main.tsx              # Application entry point
└── vite-env.d.ts         # Vite environment type definitions
```

The project also includes documentation in the `docs` directory:

```
docs/
├── api/                  # API documentation (auto-generated)
│   ├── classes/          # Class documentation
│   ├── functions/        # Function documentation 
│   ├── interfaces/       # Interface documentation
│   ├── modules/          # Module documentation
│   ├── types/            # Type documentation
│   ├── variables/        # Variable documentation
│   └── assets/           # Documentation assets
├── components/           # Component documentation
├── dependency-cruiser.config.cjs # Dependency cruiser configuration
├── dependency-graph.dot  # Dependency graph (DOT format)
├── dependency-graph.svg  # Visual dependency map
├── legend-subgraph.dot   # Legend for dependency graph
├── development/          # Development guidelines
└── user-guide/           # End-user documentation
```

Additionally, there is a `public` directory containing assets for the production build:

```
public/
├── decision_inventory_minified.xml # Decision inventory data
├── vite.svg              # Vite logo
├── assets/               # Public assets
│   └── decision_inventory_minified.xml # Decision inventory data
└── logos/                # Logo assets
```

## Development

### Prerequisites
- Node.js 14.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/pratyush-ghosh-ganitinc/decision-boards.git

# Navigate to the project directory
cd decision-boards

# Install dependencies
npm install
# or
yarn
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`.

> **Important Note**: The development server may display significant CSS differences compared to the production build. For more accurate testing during development:

```bash
# First, create an initial build
npm run build
# or
yarn build

# Then use the build development mode for ongoing changes
npm run dev:build
# or
yarn dev:build
```

> This approach provides a live-updating preview that more closely matches the final production appearance.

### Testing

The project uses Jest and React Testing Library for component testing. To run tests:

```bash
# Run all tests
npm test
# or
yarn test

# Run tests in watch mode (useful during development)
npm run test:watch
# or
yarn test:watch

# Generate test coverage report
npm run test:coverage
# or
yarn test:coverage
```

The tests include:
- Basic rendering tests for each page component
- Component interaction tests
- Mock implementations for complex dependencies (charts, animations, etc.)

### Documentation

The project uses TypeDoc to generate API documentation from TypeScript source files:

```bash
# Generate documentation
npm run docs
# or
yarn docs
```

Documentation will be generated in the `docs/api` directory and includes:
- Component hierarchies
- Function documentation
- Type definitions
- Module documentation

The project also includes a dependency graph visualization. Note that updating this requires special dev dependencies such as dependency-cruiser and GraphViz. From the **docs** folder, run:

```bash
# Generate dependency graph
npx depcruise --config dependency-cruiser.config.cjs --include-only "^../src" --output-type dot ../src > dependency-graph.dot
# or
yarn depcruise --config dependency-cruiser.config.cjs --include-only "^../src" --output-type dot ../src > dependency-graph.dot
```

Then, optionally insert the contents of legend-subgraph.dot before the end of dependency-graph.dot (if you wish to generate a legend), and run:

```bash
dot -Tsvg dependency-graph.dot -o dependency-graph.svg
```