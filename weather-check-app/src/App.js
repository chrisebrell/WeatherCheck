import NavBar from './Components/HeaderNav/NavBar';
import SearchBar from './Components/HeaderNav/SearchBar';
import AsideOne from './Components/AsideOne';
import AsideTwo from './Components/AsideTwo';
import Main from './Components/Main';
import WeatherApp from './WeatherApp';
import WeatherCard from './WeatherCard';
import './styles.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <SearchBar />

      <AsideOne />
      <Main />
      <AsideTwo />
      <WeatherApp />
      <WeatherCard />
    </div>
  );
}

export default App;
