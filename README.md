# 🐾 Cat Paw Prints Trail

A lightweight JavaScript library that creates cat paw prints following your mouse cursor.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🎯 Zero dependencies - Pure vanilla JavaScript
- 🪶 Lightweight - Less than 10KB
- 🎨 Customizable colors and settings
- 📱 Touch and mouse support
- 🐈 Realistic cat walking pattern

## 🚀 Quick Start

```html
<!DOCTYPE html>
<html>
<body>
  <script src="cat-paw-prints.js"></script>
  <script>
    const pawPrints = new CatPawPrints();
    pawPrints.init();
  </script>
</body>
</html>
```

That's it! Move your mouse and enjoy the paw prints 🐾

## ⚙️ Customization

```javascript
const pawPrints = new CatPawPrints({
  color: '#FF69B4',        // Paw print color
  maxPaws: 6,              // Max visible paws
  fadeOutDuration: 3000,   // Fade duration (ms)
  spawnDistance: 25        // Distance between paws (px)
});

pawPrints.init();
```

| Option | Default | Description |
|--------|---------|-------------|
| `color` | `#6B7280` | Paw print color (any CSS color) |
| `maxPaws` | `4` | Maximum visible paw prints |
| `fadeOutDuration` | `2000` | Fade out duration in ms |
| `spawnInterval` | `10` | Min time between spawns (ms) |
| `spawnDistance` | `30` | Min distance to spawn (px) |
| `zIndex` | `9999` | Container z-index |

## 📖 API

**`init()`** - Start the paw prints effect

**`destroy()`** - Stop and clean up

```javascript
pawPrints.init();    // Start
pawPrints.destroy(); // Stop
```

## 🎨 Examples

**Pink paws:**
```javascript
new CatPawPrints({ color: '#FF69B4' }).init();
```

**Longer trail:**
```javascript
new CatPawPrints({ maxPaws: 8, fadeOutDuration: 4000 }).init();
```

**See the `example/` folder for a live demo!**

## 📄 License

MIT License - Free to use in your projects!

---

Made with ❤️ for cat lovers 🐱
