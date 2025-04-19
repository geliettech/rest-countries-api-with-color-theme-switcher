# 🌍 REST Countries API with Color Theme Switcher

A responsive, theme-switchable country information app powered by the REST Countries API. Built with React and Material-UI, this project showcases API integration, dynamic routing, and a dark/light mode toggle. solution to the [REST Countries API with Color Theme Switcher challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). This challenge offered a great opportunity to practice working with APIs, dynamic routing, and implementing a dark/light theme toggle in a React application.

---

## 📋 Table of Contents

- [Overview](#overview)
  - [The Challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Live Links](#live-links)
- [Development Process](#development-process)
  - [Tech Stack](#tech-stack)
  - [Key Learnings](#key-learnings)
  - [Future Improvements](#future-improvements)
  - [Resources](#resources)
- [Getting Started](#getting-started)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## 🔎 Overview

### The Challenge

Users should be able to:

- View all countries from the REST API on the homepage
- Search for a country by name
- Filter countries by region
- Click on a country to view more detailed information on a separate page
- Navigate to border countries from the country details page
- Toggle between light and dark themes (optional feature)


### Screenshot

![Desktop Preview](https://raw.github.com/oge-dev/rest-countries-api-with-color-theme-switcher/main/src/design/desktop-preview.jpg)


### Live Links

- 💻 **GitHub Repository**: [github.com/oge-dev/rest-countries-api-with-color-theme-switcher](https://github.com/oge-dev/rest-countries-api-with-color-theme-switcher)
- 🌐 **Live Demo**: [rest-countries-api-with-color-theme-switcher-byoge.vercel.app](https://rest-countries-api-with-color-theme-switcher-byoge.vercel.app/)

---

## 🛠 Development Process

### Tech Stack

- **React** – JavaScript library for building user interfaces
- **Material-UI (MUI)** – For reusable UI components and theming
- **Axios** – For making HTTP requests to the REST Countries API
- **React Router DOM** – For dynamic routing between pages
- **CSS Grid & Flexbox** – For responsive layouts
- **React Icons** – For consistent and scalable icon usage

---

### Key Learnings

This project helped me strengthen my knowledge in:

- 🔄 Building dynamic SPAs with React and routing
- 📡 Fetching data with Axios and managing API states
- 🌗 Implementing a dark/light mode toggle using MUI’s `createTheme`
- 🧩 Organizing components and managing application state efficientl

Example code snippet:

```js
const theme = createTheme({
  palette: {
    mode: darkMode ? "dark" : "light", // Set MUI's color mode
    background: {
      default: darkMode ? "hsl(207, 26%, 17%)" : "hsl(0, 0%, 98%)",
      paper: darkMode ? "hsl(209, 23%, 22%)" : "hsl(0, 0%, 100%)",
    },
    text: {
      primary: darkMode ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
    },
    action: {
      input: darkMode ? "hsl(0, 0%, 52%)" : "hsl(0, 0%, 52%)",
    },
  },
});
```

---

### Future Improvements

♿ Improve accessibility (ARIA roles, keyboard navigation)
🧪 Add unit and integration tests
⚛ Use Context API or Redux for scalable state management
📷 Optimize images and assets for better performance
💾 Consider offline support using service workers

---

### Resources

- [Material UI Documentation](https://mui.com/) – For theming and reusable components
- [React Router](https://reactrouter.com/) – For handling routing and navigation
- [REST Countries API](https://restcountries.com/) – Official API source for country data

---
## 🚀 Getting Started
To run this project locally:

Clone the repository:
```bash
git clone https://github.com/oge-dev/rest-countries-api-with-color-theme-switcher.git
```

Navigate to the project folder:
```bash
cd rest-countries-api-with-color-theme-switcher
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm start
```

The app will open on [http://localhost:3000](http://localhost:3000)

## 👩‍💻 Author

- Frontend Mentor – [@oge-dev](https://www.frontendmentor.io/profile/oge-dev)
- GitHub – [@oge-dev](https://github.com/oge-dev)
- Twitter – [@oge_dev](https://twitter.com/oge_dev)

---

## 🙏 Acknowledgments
Thanks to  [Frontend Mentor](https://www.frontendmentor.io/)  for providing engaging, real-world development challenges. Special appreciation to the open-source community and documentation writers who make building awesome projects easier every day.