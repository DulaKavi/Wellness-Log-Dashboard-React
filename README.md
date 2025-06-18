# Wellness Log Dashboard

A React TypeScript application for tracking your wellness journey with mood, sleep, and activity logging. Features user authentication, responsive design, theme switching, and real-time filtering.

### ✅ **Core Requirements (Section 1)**
- **Authentication System**
  - Login/Signup forms with validation
  - JWT token-based authentication 
  - Secure local storage management
  - Protected routes

- **Reusable Form Components**
  - Login form with email/password validation
  - Signup form with password confirmation
  - Wellness log form with mood dropdown, sleep slider, and activity notes

- **TypeScript Integration**
  - Comprehensive type definitions
  - Type-safe form validation
  - Interface-driven development

- **Client-Side Validation**
  - Email format validation
  - Password length requirements
  - Real-time error display
  - Form field-specific error handling

- **Responsive Design**
  - Mobile-first approach
  - Desktop and tablet compatibility
  - Flexible grid layouts

### ✅ **Advanced Features (Section 2)**
- **Performance Optimization**
  - Lazy loading for non-critical components
  - Virtualized table rendering
  - Optimized re-renders with useMemo/useCallback

- **Theme Switching**
  - Light/Dark theme support
  - System preference detection
  - Persistent theme storage
  - CSS custom properties

- **Enhanced UX**
  - Loading states and spinners
  - Error handling and display
  - Search functionality
  - Statistics dashboard

## Technologies Used

- **Frontend**: React 18 + TypeScript
- **State Management**: Context API
- **Styling**: CSS Custom Properties + Responsive Design
- **Authentication**: Mock JWT implementation
- **API**: Postman Mock Server (real HTTP requests)
- **Data Storage**: Mock API responses
- **Performance**: React.lazy, Suspense

## Project Structure

```
src/
├── components/custom/          # Custom reusable components
│   ├── LoginForm.tsx          # Login form with validation
│   ├── SignupForm.tsx         # Signup form with password confirmation
│   ├── WellnessLogForm.tsx    # Wellness log entry form
│   ├── WellnessLogList.tsx    # Display and search logs
│   └── Layout.tsx             # App layout with header/footer
├── context/                   # React Context providers
│   ├── AuthContext.tsx        # Authentication state management
│   └── ThemeContext.tsx       # Theme switching logic
├── pages/                     # Page components
│   ├── AuthPage.tsx           # Login/signup page
│   └── DashboardPage.tsx      # Main dashboard with logs
├── services/                  # API services
│   └── api.ts                 # Postman Mock Server API integration
├── styles/                    # Global styles
│   └── global.css             # CSS custom properties and responsive design
├── types/                     # TypeScript definitions
│   └── index.ts               # All type interfaces
├── utils/                     # Utility functions
│   └── validation.ts          # Form validation logic
├── App.tsx                    # Main app component
└── index.tsx                  # App entry point
```

## Setup and Run Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**
   ```bash
   cd wellness-log-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Postman Mock Server**
   - Follow the detailed guide in `postman/README.md`
   - Import the Postman collection
   - Create a mock server
   - Get your mock server URL

4. **Configure API URL**
   ```bash
   # Create .env file in project root
   echo "REACT_APP_API_URL=https://ce5152bb-2381-4c50-a82a-a1acf151addd.mock.pstmn.io" > .env
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will make real HTTP requests to your Postman mock server

## Usage Guide

### Getting Started

1. **Create an Account**
   - Click "Sign up" on the login page
   - Enter a valid email format
   - Create a password (minimum 8 characters)
   - Confirm your password

2. **Login**
   - Use your created credentials to sign in
   - Your session will be saved for future visits

3. **Log Your Wellness**
   - Select your current mood from the dropdown
   - Adjust the sleep duration slider (0-12 hours)
   - Add activity notes (up to 200 characters)
   - Click "Save Log"

4. **View Your Journey**
   - Browse your wellness logs in the table
   - Use the search bar to filter by mood or activity notes
   - View statistics including total logs, average sleep, and happy days

5. **Customize Experience**
   - Toggle between light and dark themes using the theme button
   - Your preferences are automatically saved

### Features Demo

- **Form Validation**: Try submitting forms with invalid data to see real-time validation
- **Theme Switching**: Use the moon/sun button in the header to switch themes
- **Search Functionality**: Type in the search box to filter your wellness logs
- **Responsive Design**: Resize your browser or use mobile devices to see responsive behavior
- **Loading States**: Notice loading spinners during API operations

## API Documentation

### Postman Mock Server Endpoints

Postman Mock Server URL - https://ce5152bb-2381-4c50-a82a-a1acf151addd.mock.pstmn.io

The application uses **Postman Mock Server** for realistic API interactions:

#### Authentication
- `POST /auth/login` - User login with email/password
- `POST /auth/signup` - User registration

#### Wellness Logs
- `GET /wellness-logs` - Fetch user's wellness logs
- `POST /wellness-logs` - Create new wellness log
- `DELETE /wellness-logs/{id}` - Delete a wellness log

### Data Storage

- Data is handled by Postman Mock Server responses
- Mock servers return static responses (data doesn't persist)
- This simulates real API behavior without requiring a backend
- For persistent data, a real backend database would be needed

## Assessment Compliance

This project fulfills all requirements from the technical assessment:

### Section 1 Requirements ✅
- ✅ Reusable form components (Login, Signup, Wellness Log)
- ✅ TypeScript integration with comprehensive interfaces
- ✅ Client-side validation with error handling
- ✅ API integration with async/await
- ✅ Responsive CSS design
- ✅ Authentication with JWT tokens
- ✅ Protected dashboard access
- ✅ Search functionality for wellness logs

