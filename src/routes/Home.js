import React, {Component} from 'react';
import {HeaderImg, Searchbar, PosterList} from '../components';
import {LoadButton} from "../components/LoadButton";
import {connect} from 'react-redux';
import {getMovies} from '../actions/movie';

class HomeComponent extends Component {
    componentDidMount() {
        this.props.getMovies();
    }
    render() {
        const {mTitle, mDesc, image, movies, loading } = this.props;
        console.log(movies)
        console.log(this.props.localMovies)

        return (
            <div>
                <HeaderImg
                    title={mTitle}
                    overview={mDesc}
                    imgSrc={image}
                    />
                <Searchbar onSearchClick={this.props.onSearchClick}/>
                <PosterList  movies={movies} localMovies={this.props.localMovies}/>
                <LoadButton loading={loading} onButtonClick={this.props.onButtonClick}/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    if(Array.isArray(state.movies.movies)) {
        return {
            localMovies: state.movies.movies
        }
    }
}
const mapDispachToProps = dispatch => {
    console.log(getMovies())
    return {
        getMovies: () => dispatch(getMovies()),
    }
}
const Home = connect(mapStateToProps, mapDispachToProps)(HomeComponent);

export { Home };