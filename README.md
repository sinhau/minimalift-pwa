# Minimalift PWA

An offline-first Progressive Web App (PWA) for the **Minimalift 3-Day** strength training program. Built with vanilla TypeScript, designed specifically for iOS/iPhone with comprehensive timer functionality.

![Minimalift PWA](https://img.shields.io/badge/PWA-Ready-success) ![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue) ![Offline First](https://img.shields.io/badge/Offline-First-orange)

## 🏋️‍♀️ Features

### **Core Functionality**
- ✅ **3-Day Program Structure** - Complete Minimalift workout program with warmup, strength, and accessory blocks
- ✅ **Offline-First** - Works completely offline with IndexedDB storage
- ✅ **Progressive Web App** - Installable on iPhone home screen
- ✅ **Background Timers** - Timers continue running when app is backgrounded
- ✅ **Comprehensive Timer System** - Multiple timer types for different workout formats
- ✅ **Haptic & Audio Feedback** - iOS-optimized feedback for timer events
- ✅ **Wake Lock Support** - Keeps screen active during workouts

### **Timer Types**

| Timer Mode | Description | Use Case | Example |
|------------|-------------|----------|---------|
| **Set-Based Rest** | Rest between sets within exercises | Individual exercises | Pogos: 3×20 with 10s rest |
| **EMOM** | Every Minute on the Minute | Simple timed rounds | 5 rounds, 1 exercise per minute |
| **E2MOM** | Every 2 Minutes | Complex exercises | Heavy lifts needing more time |
| **E4MOM** | Every 4 Minutes | Very heavy compounds | Max effort sets |
| **N90** | 90-second intervals | Work/rest cycles | 30s work + 60s rest |
| **Circuit** | Timed work/rest cycles | High-intensity circuits | Tabata: 20s work, 10s rest |

### **Workout Flow**
1. **Select Day** - Choose from Day 1, 2, or 3
2. **Start Session** - Begin workout with session tracking
3. **Complete Sets** - Track individual set completion with rest timers
4. **Block Progression** - Automatic progression through warmup → strength → accessories
5. **Session Complete** - Finish with workout summary

## 🛠️ Technical Stack

- **Frontend**: Vanilla TypeScript + Web Components
- **Build Tool**: Vite
- **Storage**: IndexedDB (offline-first)
- **Testing**: Vitest + jsdom
- **PWA**: Custom service worker + web app manifest
- **Styling**: CSS custom properties with dark/light mode support

## 📱 PWA Features

### **Installation**
- Installable on iPhone home screen
- Custom app icons and splash screens
- Native app-like experience

### **Offline Support**
- Complete offline functionality
- IndexedDB for persistent data storage
- Service worker caching strategy
- Background sync capabilities

### **iOS Optimization**
- Safe area support for iPhone notch/Dynamic Island
- Wake Lock API to prevent screen sleep
- Haptic feedback integration
- Background timer synchronization
- iOS-specific viewport and styling

## 🏃‍♂️ Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Development Setup**
```bash
# Clone repository
git clone https://github.com/sinhau/minimalift-pwa.git
cd minimalift-pwa

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Production Build**
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

### **Testing**
```bash
# Run unit tests
npm run test:run

# Run tests with UI
npm run test:ui

# Type checking
npm run typecheck
```

## 📋 Development Workflow

### **Pre-Commit Checklist** (Mandatory)
Before committing ANY changes, follow these steps in order:

1. **🏗️ Build Verification**
   ```bash
   npm run build
   ```
   - Must compile without errors

2. **🧪 Run Unit Tests**
   ```bash
   npm run test:run
   ```
   - Fix any failing tests before proceeding
   - All tests must pass to continue

3. **🚀 Commit & Push**
   ```bash
   git add .
   git commit -m "descriptive message"
   git push
   ```

**If ANY step fails, fix the issues and restart from step 1.**

## 🏗️ Architecture

### **Project Structure**
```
src/
├── data/           # Seed data and program definitions
├── timers/         # Timer engine implementations
│   ├── timer-engine.ts    # Base timer class
│   ├── emom.ts           # EMOM/E2MOM/E4MOM timers
│   ├── n90.ts            # N90 timer (30s work, 60s rest)
│   └── fixed-rest.ts     # Rest timers and circuits
├── ui/             # Web Components
│   ├── app-shell.ts      # Main app container
│   ├── view-home.ts      # Home/day selection
│   ├── view-day.ts       # Day overview
│   └── view-session.ts   # Workout session
├── utils/          # Utility modules
│   ├── background-timer.ts  # Background sync
│   ├── wake-lock.ts         # Screen wake management
│   ├── feedback.ts          # Haptic/audio feedback
│   └── app-updater.ts       # PWA updates
├── test/           # Test suites
├── idb.ts          # IndexedDB wrapper
├── program.ts      # Program data manager
├── router.ts       # SPA routing
└── main.ts         # App entry point
```

### **Timer System Architecture**

**Base Timer Engine** (`BaseTimer`)
- Unified timing infrastructure
- State management (idle, running, paused, completed)
- Event system with callbacks
- Consistent time formatting

**Specialized Timer Implementations**
- **EMOMTimer**: Fixed-interval training
- **N90Timer**: Work/rest cycle training  
- **FixedRestTimer**: Simple countdown timers
- **TimedCircuitTimer**: Complex circuit training

**Set-Based Rest System**
- Automatic rest timers between sets
- Uses `exercise.restSec` for timing
- Integrated with main timer system
- Progressive set tracking within exercises

## 💾 Data Model

### **Program Structure**
```typescript
interface Program {
  programId: string;
  title: string;
}

interface Day {
  dayId: string;
  programId: string;
  title: string;
  order: 1 | 2 | 3;
  blocks: Block[];
}

interface Block {
  type: 'warmup' | 'strength' | 'swole' | 'accessory';
  timerMode: TimerMode;
  exercises: Exercise[];
  durationSec?: number;  // For fixed_rest blocks
  rounds?: number;       // For EMOM/circuit blocks
}

interface Exercise {
  id: string;
  name: string;
  sets?: number;
  reps: string;
  restSec?: number;      // Rest between sets
  cues?: string;
  substitutes?: string[];
}

type TimerMode = 'none' | 'emom' | 'e2mom' | 'e4mom' | 'n90' | 'fixed_rest' | 'timed_circuit';
```

### **IndexedDB Stores**
- **`programs`**: Program metadata
- **`days`**: Day configurations with exercises
- **`sessions`**: Workout session tracking (planned feature)

## 🧪 Testing

### **Test Coverage**
- ✅ **Program Manager**: Data layer operations
- ⚠️ **Timer System**: Partially tested (integration tests needed)
- ❌ **UI Components**: Needs component testing
- ❌ **Session Flow**: Needs end-to-end testing

### **Testing Framework**
- **Vitest**: Fast unit testing with hot reload
- **jsdom**: DOM simulation for component testing
- **Custom Mocks**: IndexedDB and timer mocking utilities

### **Critical Test Areas**
- Timer synchronization during background/foreground transitions
- IndexedDB data persistence and retrieval
- Set-based rest timer functionality
- PWA offline capabilities

## 🚀 Deployment

### **GitHub Pages Deployment**
The app is automatically deployed to GitHub Pages on push to main branch.

### **PWA Deployment Checklist**
- [x] Service worker with proper caching strategy
- [x] Web app manifest with icons
- [x] HTTPS deployment (required for PWA features)
- [x] Responsive design for mobile devices
- [x] Offline functionality testing

### **Cache Strategy**
- **App Shell**: Cache first with fallback
- **Static Assets**: Cache with versioning
- **API Data**: Network first with cache fallback
- **Auto-generated cache versioning**: Based on build timestamps

## 🐛 Known Issues & Limitations

### **Timer System**
- ✅ **Fixed**: Rest timer display was stuck at initial value
- ✅ **Fixed**: "Start Timer" shown for exercises without timers
- ⚠️ **Limitation**: N90 timer not used in current program data
- ⚠️ **TODO**: Session persistence across app restarts

### **Testing**
- Most timer tests currently skipped due to mocking complexity
- Integration tests needed for complete workout flows
- Background timer synchronization needs more testing

### **Features**
- Exercise substitution UI implemented but not functional
- Settings modal referenced but not implemented
- Session save/restore not implemented (TODO in code)

## 🔮 Roadmap

### **Phase 1: Core Stability** 
- [ ] Fix all skipped timer tests
- [ ] Implement session persistence
- [ ] Add comprehensive integration tests
- [ ] Error handling and recovery

### **Phase 2: Enhanced Features**
- [ ] Exercise substitution functionality
- [ ] Settings/preferences system
- [ ] Workout history and tracking
- [ ] Progress visualization

### **Phase 3: Advanced Features**
- [ ] Multiple program support
- [ ] Custom program creation
- [ ] Export/import workout data
- [ ] Social features and sharing

## 📖 User Manual

For detailed exercise descriptions and program information, see:
- **`docs/The Minimalift Manual.pdf`** - Complete exercise guide
- **`docs/Minimalift 3 Day.pdf`** - Program structure and progression

## 🤝 Contributing

### **Development Guidelines**
1. Follow the mandatory pre-commit checklist
2. Maintain TypeScript strict mode compliance
3. Add tests for new functionality
4. Update documentation for API changes
5. Follow existing code style and patterns

### **Git Workflow**
- Main branch is automatically deployed
- All commits must pass build + test checks
- Use descriptive commit messages
- Include Co-authored-by for AI-assisted commits

## 📄 License

ISC License - See LICENSE file for details.

## 🙏 Acknowledgments

- **Minimalift Program**: Original strength training methodology
- **Claude Code**: AI-assisted development and testing
- **Vite**: Lightning-fast build tooling
- **TypeScript**: Type safety and developer experience

---

**Built with ❤️ for strength training enthusiasts who value simplicity and effectiveness.**