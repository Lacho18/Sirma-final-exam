# Tech stack

React + Vite
React router
JavaScript
HTML & CSS

# React app created with Vite

npm create vite@latest my-app

# React router

npm install react-router-dom

# Application description

This is a web application that visualizes the matches and results from the European Football Championship. The app allows users to navigate between different pages to view various aspects of the championship, such as tournament structure, group stages and every match from the tournament with details about the formation of the teams, all players positions on the game and the score with which it ends.
The data that is used comes from .csv files, located inside public/data folder.

## Steps

1. On load inside App.js is called useReadFiles() custom hook. This hook reads all files, past as array of paths to the files.
   All data from the files is read once, on the loading of the application.
   File is first read then converted to string. After that they are split by every new line and then split by every ',' inserted inside array of objects.

2. After files are read, they are stored in a variable. By leveraging useContext() with context providers, the data is easily available to any component that needs it.

3. On loading of every route there are functions that finds the necessary data from the context provider for the component and structures it in usable array or object.

4. On error appearance, it's message is shown and nothing else.

## Routes

| Path               | Component             | Description                                                                                                                       |
| ------------------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| /                  | <Homepage />          | Uses data from matches and teams to visualize brackets view of all matches in the tournament.                                     |
| /groups            | <Groups />            | Uses data from teams to visualize the group phase for every country team.                                                         |
| /allMatches        | <AllMatches />        | Uses matches data to visualize all matches in the championship.                                                                   |
| /matchDetails/:id  | <MatchDetails />      | Shows more information of a match, such as the winner, result, both teams formation and details about the players.                |
| /Sirma-final-exam/ | <Homepage />          | Because of the deployment, this route is automatically added to the url on the start of the server. This route do the same as '/' |
| /\*                | <RouteNotFoundPage /> | This route handles all unsupported routes.                                                                                        |
