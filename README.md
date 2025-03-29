# Local Event Explorer

Local Event Explorer is a React-based web application that allows users to discover events happening in their selected location. It integrates with the Ticketmaster API and OpenStreetMap to provide event details and map views.

## Features

- Search for events by city or location.
- View event details, including name, date, and time.
- Interactive map powered by Leaflet and OpenStreetMap.
- City information fetched from Wikipedia.

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

- Node.js (v16 or later)
- npm (v8 or later)

### Installation

1. Clone the repository:

   ```bash
   https://github.com/Arun-kumar2206/Local-Event-Explorer.git
   cd local-event-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Copy the contents of `.env.example` into `.env`.
   - Replace `your_ticketmaster_api_key_here` with your actual Ticketmaster API key.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:5173`.

## Environment Variables

This project requires an API key for Ticketmaster. Add the following to your `.env` file:

```
REACT_APP_TICKETMASTER_API_KEY=your_actual_api_key
```

## Live Demo

You can view the website using this link: [Local Event Explorer](https://arun-kumar2206.github.io/Local-Event-Explorer/)


## Screenshots

Here are some screenshots of the Local Event Explorer:

### Home Page

![Home Page](./screenshots/Home%20page.png)

### Main Page

![Main Page](./screenshots/Main%20page.png)

### Events Section

![Events Section](./screenshots/Events%20section.png)

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run preview`: Preview the production build.
- `npm run lint`: Run ESLint to check for code quality issues.

## Technologies Used

- **React**: Frontend framework.
- **Vite**: Build tool for fast development.
- **Leaflet**: Interactive maps.
- **React Router**: Routing for navigation.
- **Ticketmaster API**: Event data.
- **Wikipedia API**: City information.

## Acknowledgments

- [OpenStreetMap](https://www.openstreetmap.org/)
- [Ticketmaster API](https://developer.ticketmaster.com/)
- [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page)

## Thank You

Thank you for checking out the Local Event Explorer! We hope you find it useful and enjoyable. If you have any feedback or suggestions, feel free to contribute or reach out. Happy exploring!
