# Pokedex

**Pokedex** is a web-based application that allows users to search for and explore detailed information about Pokémon. This React app uses dynamic data fetching and features a clean, responsive UI designed with Tailwind CSS. It provides a rich user experience with real-time search, type filtering, and individual Pokémon details.

## Features

1. **Search and Filter Functionality**:
   - Users can search for Pokémon by name in the search bar, which provides instant results and suggestions.
   - A filter option allows users to narrow down the list of Pokémon based on their type (e.g., "Fire," "Water," etc.).

2. **Dynamic Data Fetching**:
   - The app fetches data from an external API (such as the Pokémon API) and presents an infinite scroll for users to explore the full Pokémon catalog.
   - When users select a specific type filter, the app dynamically fetches and displays only the Pokémon that match the selected type.

3. **Individual Pokémon Details**:
   - Clicking on a Pokémon from the main list directs users to a detailed page displaying information such as the Pokémon's stats, abilities, and type.

4. **Responsive Design**:
   - The app is fully responsive, providing a seamless experience on both desktop and mobile devices. The layout and components are optimized for various screen sizes using Tailwind CSS.

5. **React Router for Navigation**:
   - The app uses `react-router-dom` to handle page navigation, allowing smooth transitions between the homepage, filtered lists, and individual Pokémon pages.

6. **Efficient State Management**:
   - React hooks, such as `useState` and `useEffect`, are used for managing search queries, filtering logic, and data fetching from the API, ensuring a smooth and efficient user experience.

7. **Tailwind CSS for Styling**:
   - Tailwind CSS is used throughout the application for quick and easy custom styling. The app is built with a modern design approach that enhances user interaction with hover effects, smooth transitions, and a sleek interface.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/nikhil-tiwari/pokedex.git
    ```

2. Navigate to the project directory:

    ```bash
    cd pokedex
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Start the development server:

    ```bash
    npm run dev
    ```

5. Open the app in your browser at http://localhost:5173/

## Technologies Used

- **React.js**: For building the user interface.
- **Tailwind CSS**: For state management.
- **React Router**: For UI components and styling.
- **Pokémon API**: For authentication and real-time database.