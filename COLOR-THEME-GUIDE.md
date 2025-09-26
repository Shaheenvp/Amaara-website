# 🎨 Amaara Property Management - Color Theme Guide

## 📁 File Structure
```
amaara-website/
├── color-theme.css          # 🎨 Central color management
├── styles.css              # 🎨 Main styles (imports color-theme.css)
├── index.html              # 📄 HTML file
└── COLOR-THEME-GUIDE.md    # 📖 This guide
```

## 🚀 Quick Color Changes

### Method 1: Edit `color-theme.css`
Open `color-theme.css` and change the color values in the `:root` section:

```css
:root {
    /* Change these values to update all colors */
    --primary-gold: #FFD700;      /* Main gold color */
    --secondary-gold: #FFA500;    /* Secondary gold */
    --accent-gold: #FF8C00;       /* Accent gold */
    --dark-gold: #B8860B;         /* Dark gold */
    --light-gold: #FFE55C;        /* Light gold */
}
```

### Method 2: Use Pre-built Themes
Uncomment any theme in `color-theme.css`:

```css
/* Classic Gold Theme */
:root {
    --primary-gold: #D4AF37;
    --secondary-gold: #B8860B;
    --accent-gold: #8B7355;
}

/* Bright Gold Theme */
:root {
    --primary-gold: #FFC107;
    --secondary-gold: #FF9800;
    --accent-gold: #FF5722;
}

/* Soft Gold Theme */
:root {
    --primary-gold: #FFD54F;
    --secondary-gold: #FFCA28;
    --accent-gold: #FF8F00;
}
```

## 🎨 Available Color Variables

### Primary Colors
- `--primary-gold` - Main brand color
- `--secondary-gold` - Secondary brand color
- `--accent-gold` - Accent color
- `--dark-gold` - Dark variant
- `--light-gold` - Light variant

### Text Colors
- `--text-accent` - Accent text color
- `--text-gold` - Gold text color
- `--text-gold-secondary` - Secondary gold text

### Gradients
- `--gradient-primary` - Main gradient
- `--gradient-secondary` - Secondary gradient
- `--gradient-accent` - Accent gradient
- `--gradient-gold` - Gold gradient

### Shadows
- `--shadow-gold` - Gold shadow
- `--shadow-gold-soft` - Soft gold shadow
- `--shadow-gold-strong` - Strong gold shadow

### Backgrounds
- `--bg-gold-light` - Light gold background
- `--bg-gold-medium` - Medium gold background
- `--bg-gold-strong` - Strong gold background

### Borders
- `--border-gold` - Gold border
- `--border-gold-light` - Light gold border
- `--border-gold-medium` - Medium gold border

### Hover Effects
- `--hover-gold` - Gold hover color
- `--hover-gold-bg` - Gold hover background
- `--hover-gold-border` - Gold hover border

### Focus Effects
- `--focus-gold` - Gold focus color
- `--focus-gold-shadow` - Gold focus shadow
- `--focus-gold-shadow-soft` - Soft gold focus shadow

## 🔧 How It Works

1. **Color Theme File**: `color-theme.css` contains all color variables
2. **Main Styles**: `styles.css` imports the color theme
3. **HTML**: `index.html` loads both files in order
4. **Automatic Updates**: Change colors in one place, updates everywhere

## 🎯 Benefits

✅ **Easy Management**: Change all colors from one file
✅ **Consistent Design**: All elements use the same color variables
✅ **Quick Themes**: Switch between pre-built color schemes
✅ **Maintainable**: No need to search through multiple files
✅ **Scalable**: Easy to add new color variations

## 🚀 Quick Start

1. **Change Main Color**: Edit `--primary-gold` in `color-theme.css`
2. **Switch Theme**: Uncomment a pre-built theme in `color-theme.css`
3. **Custom Colors**: Add your own color variables
4. **Test Changes**: Refresh your browser to see updates

## 📝 Example: Changing to Blue Theme

```css
:root {
    --primary-gold: #3B82F6;
    --secondary-gold: #2563EB;
    --accent-gold: #1D4ED8;
    --dark-gold: #1E40AF;
    --light-gold: #DBEAFE;
}
```

## 🎨 Color Combinations

### Professional Gold
```css
--primary-gold: #D4AF37;
--secondary-gold: #B8860B;
--accent-gold: #8B7355;
```

### Bright Gold
```css
--primary-gold: #FFD700;
--secondary-gold: #FFA500;
--accent-gold: #FF8C00;
```

### Elegant Gold
```css
--primary-gold: #FFC107;
--secondary-gold: #FF9800;
--accent-gold: #FF5722;
```

## 🔍 Troubleshooting

**Colors not updating?**
- Check if `color-theme.css` is loaded before `styles.css`
- Clear browser cache (Ctrl+F5)
- Verify CSS syntax in `color-theme.css`

**Missing colors?**
- Ensure all color variables are defined in `:root`
- Check for typos in variable names
- Verify CSS import order

## 📞 Support

For color theme questions or custom color schemes, refer to this guide or check the `color-theme.css` file for examples.
