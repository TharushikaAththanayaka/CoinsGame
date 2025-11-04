# 🌸 Flower Quest

A fully functional 3-match puzzle game built with React (JavaScript). Match three or more same-colored flower gems to score points and collect them in your basket!

## 🎮 Game Features

- **5x5 Game Board**: Play on a compact grid filled with colorful flower gems
- **3-Match Mechanics**: Align 3 or more same-colored flowers horizontally or vertically
- **Cascading Matches**: Automatic chain reactions when new matches form after refilling
- **10-Minute Timer**: Race against time to achieve the highest score
- **Score System**: Earn +5 points per matched flower
- **Collection Basket**: Track your collected flowers by color
- **Smooth Animations**: Beautiful match animations, falling flowers, and bounce effects
- **Responsive Design**: Play on desktop and mobile devices

## 🎯 How to Play

1. Click a flower to select it
2. Click an adjacent flower to swap them
3. Create matches of 3 or more same-colored flowers horizontally or vertically
4. Matched flowers disappear with animations and add to your score
5. Empty spaces are refilled automatically with new flowers
6. Chain matches for bonus points!
7. Score as many points as possible before the 10-minute timer runs out

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Game

Start the development server:
```bash
npm start
```

The game will open in your browser at [http://localhost:3000](http://localhost:3000)

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The build folder will contain the production-ready files that can be deployed to any static hosting service (e.g., GitLab Pages, GitHub Pages, Netlify, Vercel).

## 🛠️ Technologies Used

- **React 19.2.0**: Modern React with hooks (useState, useEffect, useRef)
- **react-icons**: Beautiful gem/flower icons
- **CSS3**: Modern styling with animations and responsive design
- **Create React App**: Development and build tooling

## 📁 Project Structure

```
src/
├── components/
│   ├── HomeScreen.js      # Game start screen with instructions
│   ├── GameScreen.js      # Main game container
│   ├── GameBoard.js       # 5x5 grid with game logic
│   ├── Flower.js          # Individual flower gem component
│   ├── Timer.js           # 10-minute countdown timer
│   ├── Score.js           # Score display
│   ├── CollectionBasket.js # Collected flowers tracker
│   └── EndScreen.js       # Game over screen
├── App.js                 # Main app component
└── index.js               # React entry point
```

## 🎨 Game Mechanics

- **Swap System**: Click to select, click adjacent to swap
- **Match Detection**: Automatically finds horizontal and vertical matches
- **Invalid Swap Revert**: Swaps that don't create matches are automatically reverted
- **Cascade Handling**: New matches after refilling trigger automatically
- **Animation System**: Smooth transitions for matches, drops, and selections

## 🌈 Color Palette

The game features 5 beautiful flower gem colors:
- 🔴 Red
- 🔵 Blue
- 🟡 Yellow
- 🟢 Green
- 🟣 Purple

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available for personal and educational use.

## 🎉 Enjoy Playing!

Have fun matching flowers and achieving high scores! Challenge yourself to beat your personal best!
