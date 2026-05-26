# Ya9 Project Overview

Ya9 is a comprehensive baseball stadium recommendation and community application designed for KBO (Korea Baseball Organization) fans. It provides tailored experiences for "Cheering" and "Food" oriented fans, along with a community feature for real-time information sharing.

## Tech Stack

- **Frontend:** React 19 (Vite)
- **Icons:** Lucide React
- **Maps:** Kakao Map API
- **State Management:** React `useState` / `useEffect` (Global state managed in `App.jsx`)
- **Data Layer:** `localStorage` based mock database (`src/services/mockDb.js`)
- **Styling:** Vanilla CSS with dynamic theming via CSS variables.

## Project Structure

- `src/`: Main source code.
  - `components/`: UI components, primarily structured as "Step" components for a multi-stage user flow.
    - `HomeStep.jsx`: Main dashboard with KBO schedules, stats, and navigation.
    - `StadiumSelectStep.jsx`, `TypeSelectStep.jsx`: Initial selection flow.
    - `CheeringInfoStep.jsx`, `FoodInfoStep.jsx`: Mode-specific information.
    - `CommunityMapStep.jsx`: Interactive map using Kakao Map API.
    - `MessageListStep.jsx`, `ChatRoomStep.jsx`: 1:1 messaging features.
  - `services/`: Data fetching and storage logic.
    - `mockDb.js`: Offline-first persistence using `localStorage`.
  - `App.jsx`: Root component managing global state and navigation steps.
  - `App.css`, `index.css`: Global styles and theme definitions.
- `public/`: Static assets.
  - `images/`: Stadium photos, team logos, and other UI assets.
- `lo.go/`: SVG team logos.
- `design/`, `baseballim/`: Design reference screenshots and mockups.

## Key Workflows & Conventions

### Navigation (Step-based)
The application currently uses a `step` state (1-17) in `App.jsx` to navigate between screens.
- **Navigation:** Managed via `onNavigate(stepNumber, params)` and `goBack()`.
- **Refactoring Goal:** Transition to `react-router-dom` for URL-based navigation as per `PRD.md`.

### Theming
- **Dynamic Colors:** The app uses team-specific primary colors.
- **Implementation:** `App.jsx` sets `--primary-color` and `data-theme` on `document.body` based on `selectedTeam`.

### Data Management
- **Persistence:** All user data (profile, saved foods, diary entries) is stored in `localStorage` via `mockDbService`.
- **Initial Data:** Seed data is defined in `src/services/mockDb.js`.

### Map Integration
- **Kakao Map:** Used in `CommunityMapStep.jsx` and `KakaoMap.jsx`.
- **Prerequisite:** Requires the Kakao Maps SDK script to be loaded (API Key: `849ee984e85bceda41fd0849b6ba6a05` as per `agent.md`).

## Development Commands

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the project for production.
- `npm run lint`: Runs ESLint for code quality checks.
- `npm run preview`: Previews the production build locally.

## Development Mandates

1.  **Surgical Changes:** Only modify the components or logic requested.
2.  **Maintain Theming:** Ensure any new UI components respect the `--primary-color` and team-based theming.
3.  **Mock Data:** Use `mockDbService` for all data operations to maintain consistency.
4.  **Responsive Design:** Prioritize mobile-first responsive layouts as the app targets mobile users.
5.  **Documentation:** Refer to `PRD.md` and `agent.md` for detailed functional requirements and design notes.
