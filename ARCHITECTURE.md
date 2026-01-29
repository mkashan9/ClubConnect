# Project Structure & Architecture

## Directory Overview

```
clubconnect/
├── .github/                          # GitHub-specific files
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md            # Bug report template
│   │   ├── feature_request.md       # Feature request template
│   │   └── pull_request_template.md # Pull request template
│   └── workflows/                    # CI/CD workflows (future)
├── .editorconfig                     # Editor configuration
├── .gitignore                        # Git ignore rules
├── package.json                      # Project metadata
├── README.md                         # Main documentation
├── LICENSE                           # MIT License
├── CONTRIBUTING.md                   # Contribution guidelines
├── CODE_OF_CONDUCT.md               # Community code of conduct
├── SECURITY.md                       # Security policy
├── CHANGELOG.md                      # Version history
├── DEPLOYMENT.md                     # Deployment guide
├── ARCHITECTURE.md                   # This file - Architecture documentation
│
├── index.html                        # Landing page
├── demo.html                         # Demo/tutorial page
├── features.html                     # Features overview
├── contact.html                      # Contact page
│
├── login.html                        # User login page
├── signup.html                       # User registration page
│
├── player-dashboard.html             # Player dashboard interface
├── coach-dashboard.html              # Coach dashboard interface
├── owner-dashboard.html              # Club owner dashboard interface
├── super-admin-dashboard.html        # System admin dashboard interface
│
├── teams.html                        # Teams management page
├── leaderboards.html                 # Performance leaderboards page
│
├── privacy.html                      # Privacy policy
├── cookies.html                      # Cookie policy
├── terms.html                        # Terms of service
│
├── app.js                            # Main application logic
├── protection.js                     # Source code protection
│
├── style.css                         # Global styles
│
├── logo.png                          # Brand logo
├── coach-dashboard.png               # Coach dashboard screenshot
├── owner-dashboard.png               # Owner dashboard screenshot
├── player-dashboard.png              # Player dashboard screenshot
│
├── hero.mp4                          # Hero/banner video
└── v_back.mp4                        # Background video
```

## File Descriptions

### Root Configuration Files

| File | Purpose |
|------|---------|
| `.editorconfig` | Ensures consistent coding styles across editors |
| `.gitignore` | Specifies files to exclude from version control |
| `package.json` | Project metadata, dependencies, and scripts |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation and getting started guide |
| `CONTRIBUTING.md` | Guidelines for contributing to the project |
| `CODE_OF_CONDUCT.md` | Community standards and expectations |
| `SECURITY.md` | Security policies and vulnerability reporting |
| `CHANGELOG.md` | Version history and release notes |
| `DEPLOYMENT.md` | Deployment instructions for various platforms |
| `ARCHITECTURE.md` | Technical architecture overview |
| `LICENSE` | MIT License file |

### GitHub Templates

| File | Purpose |
|------|---------|
| `.github/ISSUE_TEMPLATE/bug_report.md` | Bug report issue template |
| `.github/ISSUE_TEMPLATE/feature_request.md` | Feature request template |
| `.github/ISSUE_TEMPLATE/pull_request_template.md` | Pull request template |

### HTML Pages

#### Public Pages
| Page | Purpose |
|------|---------|
| `index.html` | Landing page with hero section and overview |
| `demo.html` | Interactive demo and tutorial |
| `features.html` | Features and benefits overview |
| `contact.html` | Contact form and support |

#### Authentication
| Page | Purpose |
|------|---------|
| `login.html` | User login interface |
| `signup.html` | User registration interface |

#### Role-Based Dashboards
| Page | Purpose |
|------|---------|
| `player-dashboard.html` | Interface for player users |
| `coach-dashboard.html` | Interface for coach users |
| `owner-dashboard.html` | Interface for club owner users |
| `super-admin-dashboard.html` | Interface for system administrators |

#### Management Pages
| Page | Purpose |
|------|---------|
| `teams.html` | Team creation and management |
| `leaderboards.html` | Performance rankings and statistics |

#### Legal Pages
| Page | Purpose |
|------|---------|
| `privacy.html` | Privacy policy |
| `cookies.html` | Cookie usage policy |
| `terms.html` | Terms of service |

### JavaScript Files

| File | Purpose | Size |
|------|---------|------|
| `app.js` | Core application logic, payment processing, notifications | 799 lines |
| `protection.js` | Source code and developer tools protection | 145 lines |

### CSS & Styling

| File | Purpose | Size |
|------|---------|------|
| `style.css` | Global styles, design tokens, responsive layouts | 2149 lines |

### Media Assets

| File | Purpose | Type |
|------|---------|------|
| `logo.png` | Brand logo | Image |
| `coach-dashboard.png` | Coach interface screenshot | Image |
| `owner-dashboard.png` | Owner interface screenshot | Image |
| `player-dashboard.png` | Player interface screenshot | Image |
| `hero.mp4` | Landing page hero video | Video |
| `v_back.mp4` | Background video | Video |

## Architecture Overview

### Layered Architecture

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│     (HTML, CSS, Responsive Design)      │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Application Layer               │
│    (JavaScript Logic, State Management)  │
│           (app.js, protection.js)       │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│         Data & Integration Layer        │
│  (Browser Storage, Web3, MetaMask API)  │
│    (Blockchain, Payment Processing)     │
└─────────────────────────────────────────┘
```

### Key Components

#### 1. **User Interface Components**
- Landing page with hero section
- Role-based dashboards
- Navigation and header
- Forms and input validation
- Responsive layout system

#### 2. **Authentication System**
- Login/Signup pages
- Session management
- Role-based access control
- User data persistence

#### 3. **Payment Processing**
- Web3 wallet integration
- Blockchain transactions
- Multiple payment types
- Transaction tracking

#### 4. **Notification System**
- Toast notifications
- Confirmation dialogs
- Error handling
- User feedback

#### 5. **Data Management**
- Browser storage (localStorage)
- Session storage
- User profiles
- Team/club data

#### 6. **Security Features**
- Developer tools disabled
- Source code protection
- Context menu disabled
- Keyboard shortcut blocking

## Module Dependencies

```
app.js (Main Application)
├── DOM Manipulation
├── Web3 Integration (MetaMask)
├── Notification System
├── Data Persistence (localStorage)
└── Payment Processing

protection.js (Security)
├── Event Listeners
└── Developer Tools Prevention

style.css (Styling)
├── CSS Variables & Tokens
├── Layout System
├── Component Styles
└── Animations & Transitions

HTML Pages
├── index.html → app.js, style.css
├── login.html → app.js, style.css
├── dashboards → app.js, style.css
└── Other pages → style.css
```

## Data Flow

### User Authentication Flow
```
User Input → Validation → Storage → Session → Dashboard Access
```

### Payment Flow
```
User Action → Wallet Connect → Transaction Approval → Blockchain → Confirmation
```

### Team Management Flow
```
User Input → Validation → Storage → Dashboard Update → Notification
```

## Technology Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with variables
- **JavaScript (ES6+)**: Application logic
- **Font Awesome**: Icon library
- **Google Fonts**: Typography

### Integration
- **Web3.js**: Blockchain interaction
- **MetaMask**: Wallet connection
- **Ethereum/Polygon**: Payment networks

### Browser APIs Used
- `localStorage`: Data persistence
- `sessionStorage`: Temporary data
- `DOM API`: Element manipulation
- `Fetch API`: Server communication (future)
- `Event Listeners`: User interactions

## Code Standards

### JavaScript
- 2-space indentation
- Camel case for variables/functions
- Pascal case for classes
- JSDoc comments for functions
- Semicolons required

### HTML
- 2-space indentation
- Semantic elements
- Lowercase tags
- Descriptive IDs and classes

### CSS
- 2-space indentation
- CSS custom properties
- Kebab case for classes
- Mobile-first approach

## Performance Considerations

### Optimization Techniques
- CSS custom properties for efficient styling
- Minimal JavaScript dependencies
- Efficient DOM queries
- Event delegation where applicable
- Image optimization
- Video compression

### Future Optimizations
- Minification of CSS/JS
- Asset bundling
- Lazy loading
- Service workers
- CDN delivery

## Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✓ Supported |
| Firefox | 88+ | ✓ Supported |
| Safari | 14+ | ✓ Supported |
| Edge | 90+ | ✓ Supported |
| Mobile (iOS) | 14+ | ✓ Supported |
| Mobile (Android) | 10+ | ✓ Supported |

## Accessibility Considerations

- Semantic HTML for screen readers
- Keyboard navigation support
- Color contrast compliance
- ARIA labels for complex components
- Focus management

## Security Architecture

### Client-Side Security
- Developer tools prevention
- Source code protection
- Session management
- Input validation

### Server-Side (Future Implementation)
- API authentication
- Rate limiting
- CSRF protection
- SQL injection prevention
- Data encryption

## Scalability Considerations

### Current Limitations
- Browser storage limitations (~5-10MB)
- Single-user scope
- No backend persistence

### Future Improvements
- Backend API integration
- Database implementation
- Real-time synchronization
- Horizontal scaling

## Deployment Architecture

### Current Setup
- Static file hosting
- No server-side processing
- Client-side processing only
- CDN-friendly

### Supported Platforms
- GitHub Pages
- Netlify
- Vercel
- Traditional web hosting (Apache/Nginx)
- Docker containers

---

**For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

**Last Updated**: January 2024
**Version**: 1.0.0
