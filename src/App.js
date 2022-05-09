import React, {Component} from 'react';
import axios from 'axios';
import {Provider} from "react-redux"
import './App.css';
import {Header} from "./components/Header";
import {Home, Details, NotFound, MoviePlayer} from "./routes";
import {API_KEY, API_URL, IMAGE_BASE, BACKDROP_SIZE} from "./config";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Spinner} from "./components/Spinner";
import store from "./store"



class App extends Component{
    state =  {
        loading: true,
        movies: [
        ],
        badge: 0,
        image: null,
        mTitle: '',
        mDesc: '',
        activePage: 0,
        totalPages: 0,
        searchText: ""
    };

    async componentDidMount() {
        try {
            const {data: {results, page, total_pages}} = await this.loadMovies();
            this.setState({
                movies: results,
                loading: false,
                activePage:page,
                totalPages: total_pages,
                image: `${IMAGE_BASE}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
                mTitle: results[0].title,
                mDesc: results[0].overview,
            })
        }catch (e) {
            console.log(e);
        }
    }

    loadMovies = () => {
        const  page = this.state.activePage + 1;
        const url = `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=fr`
        return axios.get(url);
    };
    searchMovie = () => {
        const url = `${API_URL}/search/movie?api_key=${API_KEY}&query=${this.state.searchText}&language=fr`;
        return axios.get(url);
    };
    handleSearch =  value => {
        try {
            this.setState({loading: true, searchText: value, image: null}, async () => {
                const {data: {results, page, total_pages}} = await this.searchMovie();
                this.setState({
                    movies: results,
                    loading: false,
                    activePage:page,
                    totalPages: total_pages,
                    image: `${IMAGE_BASE}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
                    mTitle: results[0].title,
                    mDesc: results[0].overview,
                })
            });
        }catch (e) {
            console.log(e)
        }
    };
    loadMore = async () => {
        try {
            this.setState({loading: true});
            const {data: {results, page, total_pages}} = await this.loadMovies();
            this.setState({
                movies: [...this.state.movies, ...results],
                loading: false,
                activePage:page,
                totalPages: total_pages,
                image: `${IMAGE_BASE}/${BACKDROP_SIZE}/${results[0].backdrop_path}`,
                mTitle: results[0].title,
                mDesc: results[0].overview,
            })
        }catch (e) {
            console.log(e)
        }
    };
  render() {
      return (
          <Provider store={store}>
          <BrowserRouter> // doit avoir qu'un seul enfant direct
              <div className="App">
                  <Header badge={this.state.badge}/>
                  {!this.state.image ? (
                      <Spinner/>
                  ):
                      (
                          <Switch>
                              <Route path="/" exact render={() => (
                                  <Home
                                      {...this.state}
                                      onSearchClick={this.handleSearch}
                                      onButtonClick={this.loadMore}
                                  />
                              )}></Route>
                              <Route path="/player" component={MoviePlayer}></Route>
                              <Route path="/player/:id" component={MoviePlayer}></Route>
                              <Route path="/:id" exact component={Details}>
                              </Route>
                              <Route component={NotFound}></Route>
                          </Switch>
                      )}

              </div>
          </BrowserRouter>
          </Provider>
      );
  }
}

export default App;
