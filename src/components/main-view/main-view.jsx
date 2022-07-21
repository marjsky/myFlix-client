import React from 'react';

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
      ]
    }
  }
  
  render() {
    const { movies } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {movies.map(movie => <div key={movie._id}>{movie.Title}</div>)}
      </div>
    );
  }
}

export default MainView