# DockNow 🚢

**DockNow** is a comprehensive Next.js web application that enables users to find, explore, and reserve boat docking spaces at marinas and private ports worldwide. The platform provides an intuitive interface for both tourists and boat owners to discover ports, view detailed information, and make reservations seamlessly.

## 🎯 Features

### Core Functionality

- **Port Discovery**: Interactive map-based port exploration with advanced filtering capabilities
- **Reservation System**: Complete booking flow with payment integration ready
- **User Authentication**: Secure login system with dropdown menu and profile management
- **Multi-language Support**: Available in English, Spanish, and French (i18n)
- **Port Type Filtering**: Filter between public marinas and private ports
- **Real-time Search**: Dynamic search with location-based results

### User Experience

- **Interactive Maps**: Leaflet maps integration for port visualization with custom markers
- **Port Details**: Comprehensive marina information including ratings, pricing, amenities, and specifications
- **Booking Management**: View, modify, and cancel reservations with status tracking
- **Profile Management**: User account with boat information and preferences
- **Advanced Filtering**: Filter by amenities, price range, boat length, ratings, and port type
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization

### Port Types

- **Public Marinas**: Traditional marinas with full facilities and services
- **Private Ports**: Exclusive private docking spaces with unique amenities
- **Mixed Search**: Ability to search across both port types simultaneously

## 🛠️ Tech Stack

### Frontend Framework

- **Next.js**: `14.0.4` - React framework with SSR/SSG capabilities
- **React**: `^18` - Component-based UI library
- **TypeScript**: `^5` - Static type checking and enhanced developer experience

### State Management

- **Redux Toolkit**: `^2.0.1` - Modern Redux state management
- **React Redux**: `^9.0.4` - React bindings for Redux
- **Async Thunks**: For handling asynchronous operations

### Styling & UI

- **Tailwind CSS**: `^3.3.0` - Utility-first CSS framework
- **Lucide React**: Modern icon library
- **Custom Components**: Reusable UI component library
- **Responsive Design**: Mobile-first approach

### Maps & Location

- **React Leaflet**: `^4.2.1` - React components for Leaflet maps
- **Leaflet**: `^1.9.4` - Interactive map library
- **Custom Markers**: Different icons for marinas vs private ports

### Internationalization

- **next-i18next**: `^15.2.0` - Next.js internationalization
- **Server-side Translations**: SSR-compatible multi-language support

### Development Tools

- **ESLint**: `^8` - Code linting and formatting
- **Next Config**: Custom configuration for build optimization

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd docknow_ui
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.local.example .env.local
   ```

   Update `.env.local` with your configuration:

   ```env
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret_here
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Platform Support

- **Web Browsers**: Full support for Chrome, Firefox, Safari, Edge
- **Mobile Web**: Responsive design for mobile browsers
- **Progressive Web App**: PWA capabilities for app-like experience
- **SEO Optimized**: Server-side rendering for better search engine visibility

## 🏗️ Project Structure

```
docknow_ui/
├── components/                   # Reusable UI components
│   ├── Header.tsx               # Navigation with user dropdown
│   ├── Hero.tsx                 # Landing page hero with search
│   ├── SearchBar.tsx            # Advanced search component
│   ├── InteractivePortMap.tsx   # Map with port markers
│   ├── PortCard.tsx             # Port display cards
│   ├── PortsList.tsx            # Port listing component
│   ├── PortsMap.tsx             # Main map interface
│   ├── PortFilters.tsx          # Advanced filtering sidebar
│   ├── FeaturedPorts.tsx        # Featured marina sections
│   ├── FeaturedPrivatePorts.tsx # Featured private ports
│   ├── Layout.tsx               # Main layout wrapper
│   ├── Footer.tsx               # Site footer
│   ├── Features.tsx             # Features showcase
│   └── Notifications.tsx        # Toast notifications
├── pages/                       # Next.js pages
│   ├── index.tsx                # Homepage with hero and search
│   ├── ports.tsx                # Main ports discovery page
│   ├── reservations.tsx         # User reservations management
│   ├── auth/                    # Authentication pages
│   │   ├── signin.tsx           # Sign in page
│   │   └── signup.tsx           # Sign up page
│   ├── booking/                 # Booking flow
│   │   └── [portId].tsx         # Dynamic booking page
│   └── ports/                   # Port details
│       └── [portId].tsx         # Individual port pages
├── store/                       # Redux store configuration
│   ├── index.ts                 # Store setup with middleware
│   └── slices/                  # Redux Toolkit slices
│       ├── portsSlice.ts        # Ports state and filtering
│       ├── authSlice.ts         # Authentication with mock user
│       ├── reservationsSlice.ts # Booking management
│       └── uiSlice.ts           # UI state and notifications
├── types/                       # TypeScript definitions
│   └── index.ts                 # Comprehensive type definitions
├── public/                      # Static assets
│   └── locales/                 # Translation files
│       ├── en/                  # English translations
│       ├── fr/                  # French translations
│       └── es/                  # Spanish translations
└── styles/                      # Global styles
    └── globals.css              # Tailwind CSS configuration
```

## 🎨 Design System

### Color Palette

- **Ocean Blue**: Primary brand colors (`ocean-50` to `ocean-900`)
- **Accent Colors**: Orange and purple for highlights
- **Status Colors**: Green (confirmed), Yellow (pending), Red (cancelled)

### Component Library

- **Port Cards**: Consistent design with status badges
- **Interactive Maps**: Custom markers for different port types
- **Search Interface**: Grouped form fields with autocomplete
- **Filter System**: Collapsible sidebar with multiple filter options

## 🔧 Configuration

### Environment Setup

Key features requiring configuration:

- **Map Integration**: Leaflet configuration for interactive maps
- **Payment Integration**: Stripe setup for reservation payments
- **Internationalization**: Multi-language support setup
- **Authentication**: User management system

### Build Configuration

- `next.config.js`: Next.js optimization settings
- `tailwind.config.js`: Custom design system configuration
- `next-i18next.config.js`: Internationalization setup

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Quality Assurance
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Deployment
vercel               # Deploy to Vercel
```

## 🌐 Live Deployment

The application is deployed and accessible at:
**Production URL**: https://docknow-81shoircx-alex-gomezs-projects-d5136c4b.vercel.app

### Deployment Features

- **Global CDN**: Fast loading worldwide
- **Automatic HTTPS**: Secure connections
- **Performance Optimization**: Next.js optimizations enabled
- **SEO Ready**: Server-side rendering for search engines

## 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Tablet Support**: Enhanced experience for tablet users
- **Desktop**: Full-featured desktop interface
- **Touch Friendly**: Gesture support for mobile interactions

## 🔐 Security Features

- **Secure Authentication**: JWT-based user sessions
- **Payment Security**: Stripe integration for secure payments
- **Data Validation**: Input sanitization and validation
- **HTTPS Enforcement**: Secure data transmission

## 🌍 Internationalization

The platform supports multiple languages:

- **English** (en) - Default
- **Spanish** (es) - Español
- **French** (fr) - Français

Language files located in `public/locales/[locale]/common.json`.

## 💳 Payment Integration

- **Stripe Ready**: Payment processing integration prepared
- **Multiple Currencies**: Support for EUR, USD, and more
- **Secure Checkout**: PCI compliant payment processing
- **Booking Confirmations**: Automated confirmation system

## 🚢 Mock Data & Demo

### Sample Marinas

- **Marina del Sol** (Barcelona, Spain)

  - Premium Mediterranean marina
  - €135 for 3 nights
  - Full amenities with security

- **Porto Azzurro** (Cinque Terre, Italy)

  - Scenic Italian coastal marina
  - €76 for 2 nights
  - Traditional fishing port atmosphere

- **Port de Cannes** (Cannes, France)
  - Luxury French Riviera marina
  - €320 for 4 nights
  - Premium amenities and services

### Demo Features

- ✅ Interactive port discovery
- ✅ Advanced filtering system
- ✅ Reservation management
- ✅ User authentication with mock data
- ✅ Multi-language switching
- ✅ Responsive design showcase

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, please email support@docknow.com or create an issue in the repository.

## 🚀 Version History

- **1.0.0**: Initial release with core functionality
  - Port discovery with interactive maps
  - Advanced filtering system
  - Reservation management system
  - Multi-language support
  - Responsive web design
  - Production deployment ready

---

Built with ❤️ using Next.js, React, and modern web technologies

**DockNow** - Making marina reservations simple and accessible worldwide! ⚓
