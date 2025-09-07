# 🎯 Quiz app — "Who wants to be a millionaire?"

## 🚀 Demo

**Live App:** [quiz-app-one-livid.vercel.app](https://quiz-app-one-livid.vercel.app/)

**Desktop Demo:** [YouTube](https://www.youtube.com/watch?v=9PjWnPELocs&ab_channel=ksalpern)

**Mobile Demo:** [YouTube Shorts](https://youtube.com/shorts/8Yt62629MMM)

## ⚡ Quick Start

### Requirements

- Node.js >= 22
- pnpm >= 10

### Installation

```bash
git clone https://github.com/ksalpern/quiz-app.git
cd quiz-app
pnpm install
pnpm dev
```

## 🏗 Project Structure

```
src/
├── app/                # Next.js App Router
├── components/ui/      # Reusable UI components
├── features/game/      # Game flow logic
│   ├── components/
│   ├── hooks/          # Business logic
│   └── services/       # Data layer
├── stores/             # Zustand store
├── types/              # Shared TypeScript types
└── utils/              # Helpers
```

## 🔑 Key Decisions

- **Next.js 15 + TypeScript strict mode** → scalability and type safety
- **Feature-based structure** → separation of concerns
- **Zustand for state management** → lightweight and predictable
- **JSON-driven configuration** → flexible number of answers, multiple correct answers
- **Error handling** → custom error classes, boundaries, validation
- **Responsive UI** → from iPhone 8 to 4K

## 🎮 Features

- 12 questions with progressive prizes
- Support for multiple correct answers
- Timer & progress bar per question
- Final result screen with summary
- Responsive design (mobile → 4K)

## 🧪 Code Quality

- ESLint + Prettier
- Husky git hooks for linting & testing
- Jest + React Testing Library
- TypeScript coverage

## 📈 Possible Improvements

- **Animations & micro-interactions** for smoother transitions

- **Sound effects & background music** to enhance engagement

- **Internationalization (i18n)** with JSON-based configs

- **User progress saving** (LocalStorage/session)

- **Difficulty levels** (Easy / Medium / Hard)

- **Lifelines** (50/50, Ask the audience, Call a friend)

- **Analytics & tracking** (time per question, common mistakes)

- **Config-driven questions** (JSON/API, multiple categories)

- **Mobile UX enhancements** (gestures, vibration feedback)

- **Extensible architecture** for new question types & feature flags

<p align="center">Built with ❤️</p>
