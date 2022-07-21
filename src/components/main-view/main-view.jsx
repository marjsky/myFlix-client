import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1,
          Title: 'Hancock',
          Description: 'Hancock is a superhero whose ill-considered behavior regularly causes damage in the millions. He changes when the person he saves helps him improve his public image.',
          ImagePath: 'https://www.imdb.com/title/tt0448157/mediaviewer/rm871864576/?ref_=tt_ov_i'},
        { _id: 2,
          Title: 'Friday Night Lights',
          Description: 'Based on H.G. Bissingers book, which profiled the economically depressed town of Odessa, Texas and their heroic high school football team, The Permian High Panthers.',
          ImagePath: 'https://www.imdb.com/title/tt0390022/mediaviewer/rm3683556608/?ref_=tt_ov_i'},
        { _id: 3,
          Title: 'Just Mercy',
          Description: 'World-renowned civil rights defense attorney Bryan Stevenson works to free a wrongly condemned death row prisoner.',
          ImagePath: 'https://www.imdb.com/title/tt4916630/mediaviewer/rm638288385/?ref_=tt_ov_i'}
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  
  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView
              movie={selectedMovie}
              onBackClick={newSelectedMovie =>
                { this.setSelectedMovie(newSelectedMovie);}
              }
            />
          : movies.map(movie => (
              <MovieCard 
                key={movie._id} 
                movie={movie} 
                onMovieClick={(movie) => 
                  { this.setSelectedMovie(movie)}
                }
              />
            ))
        }
      </div>
    );
  }
}

export default MainView