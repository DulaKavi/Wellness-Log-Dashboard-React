# Wellness Log Dashboard

A React TypeScript application for tracking your wellness journey with mood, sleep, and activity logging. Features user authentication, responsive design, theme switching, and real-time filtering.

## Features

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
   # If you have the project files, navigate to the project directory
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
   echo "REACT_APP_API_URL=https://your-mock-server-url.mock.pstmn.io" > .env
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will make real HTTP requests to your Postman mock server

### Building for Production

```bash
# Create an optimized production build
npm run build

# The build files will be in the 'build' directory
# You can serve them with any static file server
```

### Testing

```bash
# Run the test suite
npm test
```

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

The application uses **Postman Mock Server** for realistic API interactions:

#### Authentication
- `POST /auth/login` - User login with email/password
- `POST /auth/signup` - User registration

#### Wellness Logs
- `GET /wellness-logs` - Fetch user's wellness logs
- `POST /wellness-logs` - Create new wellness log
- `DELETE /wellness-logs/{id}` - Delete a wellness log

### Setup Required
1. **Import** the Postman collection from `postman/`
2. **Create** a mock server in Postman
3. **Configure** the `.env` file with your mock server URL
4. **See** `postman/README.md` for detailed setup instructions

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance Optimizations

1. **Code Splitting**: Non-critical components are lazy-loaded
2. **Memoization**: Complex calculations are memoized with useMemo
3. **Efficient Updates**: Components avoid unnecessary re-renders
4. **Responsive Images**: Optimized for different screen sizes

## Security Features

- Password strength requirements
- Client-side form validation
- Secure token storage
- XSS protection through React's built-in escaping

## Future Enhancements

- Server-side rendering with Next.js
- Real backend API integration
- Data visualization charts
- Export functionality
- Mobile app with React Native

## Troubleshooting

### Common Issues

1. **App won't start**: Ensure Node.js 16+ is installed and run `npm install`
2. **Blank page**: Check browser console for errors, try clearing localStorage
3. **Styles not loading**: Clear browser cache and restart the development server

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

### Section 2 Requirements ✅
- ✅ Component lazy loading for performance
- ✅ Theme switching with Context API
- ✅ State management with proper error handling

### Section 3 Answers

1. **Responsive tabs component**: Use flexbox with `flex-wrap`, implement touch gestures for mobile, use CSS breakpoints for layout adaptation.

2. **Virtualized list optimization**: Implement windowing with libraries like react-window, use fixed item heights, implement infinite scrolling, and memoize list items.

3. **Accessibility features**: Add proper ARIA labels, support keyboard navigation (Tab, Enter, Escape), provide screen reader announcements, and ensure focus management.

4. **Client-side auth security**: Store tokens in httpOnly cookies when possible, implement token refresh, use HTTPS, validate tokens client-side, and implement proper logout.

5. **SSR benefits/challenges**: Benefits include better SEO and faster initial load. Challenges include hydration complexity, server requirements, and increased deployment complexity.

### React Native Answers

1. **Component differences**: View is like div (container), Text handles all text content (required for text), ScrollView enables scrolling with momentum.

2. **Secure credential storage**: Use react-native-keychain for iOS/Android keychain storage, implement biometric authentication, and use secure storage libraries.

3. **Navigate vs Push**: Navigate replaces current screen, push adds to stack. Navigate can go to any screen, push only adds to top of stack.

4. **Performance improvement**: Use FlatList for large lists, optimize images, implement lazy loading, use native modules for heavy operations, and avoid inline functions in render.

---

**Developed as part of a technical assessment demonstrating React TypeScript proficiency, responsive design, and modern web development practices.** 