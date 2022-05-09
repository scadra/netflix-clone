import React, {Component} from 'react';
import {VideoPlayer, MvPlayerList} from "../components/";
import _ from "lodash"
import axios from 'axios';

import '../css/MoviePlayer.css'
import {API_URL, API_KEY, IMAGE_BASE, BACKDROP_SIZE} from "../config";
import {calcTime} from "../utils/helpers";

let newMovies = []

class MoviePlayer extends Component {
    state = {
        movies: [
        ],
        selectedMovie: {
        },
        loading: true
    }
    async componentDidMount() {
        const oldMovies = JSON.parse(localStorage.getItem('movies'))
        const results = await this.getNewMovies(oldMovies)
        newMovies = oldMovies.map((oldMovie, index) => {
            return{
                id: oldMovie.id,
                position: index +1,
                title: oldMovie.title,
                duration: results[index],
                imageUrl: `${IMAGE_BASE}/${BACKDROP_SIZE}/${oldMovie.backdrop_path}`,
                videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            }
        })
        const id = this.props.match.params.id;
        if(id) {
            const selectedMovie = this.getSelectedMovie(newMovies, id)
            this.setState({
                movies: [...newMovies],
                selectedMovie: selectedMovie
            })
        }else {
            const selectedMovie = newMovies[0];
            this.setState({
                movies: [...newMovies],
                selectedMovie: selectedMovie
            })
            this.props.history.push({
                pathname: `/player/${selectedMovie.id}/`
            })
        }
    }
    componentDidUpdate(prevProps) {
        console.log(prevProps)

        if(prevProps.match.params.id !== this.props.match.params.id) {
            const id = this.props.match.params.id;
            const selectedMovie = this.getSelectedMovie(newMovies, id);
            console.log(selectedMovie)
            this.setState({
                selectedMovie
            })
        }
    }
    getSelectedMovie = (movies, movieId) => {
        const selectedMovie =_.find(movies, { id: parseInt(movieId, 10)})
        console.log(selectedMovie)
        return selectedMovie
    }
    handleEnded = () => {
        console.log("video ended")
    }
    getTime = movieId => {
        return new Promise((resolve, reject) => {
            const url = `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr`
            axios.get(url).then(data => {
                const duration = data.data.runtime;
                resolve(duration)
            }).catch(e => {
                console.log(e)
                reject('error', e)
            })
        })
    }
    getNewMovies =  async oldMovies => {
        let promises = [];
        for(let i = 0; i < oldMovies.length; i++) {
            const element = oldMovies[i];
            const id = element.id;
            const time = await this.getTime(id)
            promises.push(calcTime(time));
        }
        return Promise.all(promises)
    }
    render() {
        const { movies, selectedMovie} = this.state;
        return (
            <div className="moviePlayer">
                <VideoPlayer
                videoUrl={selectedMovie.videoUrl}
                imageUrl={selectedMovie.imageUrl}
                handleEnded={this.handleEnded}/>
                <MvPlayerList
                    movies={movies}
                    selectedMovie={selectedMovie}
                />
            </div>
        )
    }
}

export {MoviePlayer};