import MoviesList from './components/Movies/MovieList';
import DesignLayout from './components/Layouts';

function App() {
  return (
    <DesignLayout content={<MoviesList/>}>
    </DesignLayout>
    // <div className="App">
    //   <header className="App-header">
    //     <MoviesList/>
    //   </header>
    // </div>
  );
}

export default App;
