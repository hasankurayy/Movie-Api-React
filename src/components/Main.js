import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from './Card'

let API_key = "&api_key=342b46c9969fdeb0fa6bef44a96189f5"
let base_url = "https://api.themoviedb.org/3"
let url_popular = base_url + "/discover/movie?sort_by=popularity.desc" + API_key

let movieTypeArr = ["Popular","Theatre","Kids","Drama","Comedie"]

function Main() {

    const [movies, setMovies] = useState([])
    const [url, setUrl] = useState(url_popular)
    const [search, setSearch] = useState()

    const getMovieType = (movieType) => {
        if(movieType === "Popular"){
            setUrl(url_popular)
        }
        if(movieType === "Theatre"){
            setUrl(base_url+"/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22"+API_key)
        }
        if(movieType === "Kids"){
            setUrl(base_url+"/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc"+API_key)
        }
        if(movieType === "Drama"){
            setUrl(base_url+"/discover/movie?with_genres=18&primary_release_year=2014"+API_key)
        }
        if(movieType === "Comedie"){
            setUrl(base_url+"/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc"+API_key)
        }
    }

        const searchMovie = (e) => {
            if(e.key === "Enter"){
                setUrl(base_url+"/search/movie?api_key=342b46c9969fdeb0fa6bef44a96189f5&query="+search)
                setSearch("")
            }
        }

    useEffect(() => {
        axios(url)
            .then(res => setMovies(res.data.results))
    }, [url])

    return (
        <div>
            <div className="header">
                <nav>
                    <ul>
                        {movieTypeArr.map(movieType => (
                            <li><a href="#" name={movieType} onClick={e => getMovieType(e.target.name)} >{movieType}</a></li>
                        ))}
                    </ul>
                </nav>

                <form className='search'>
                    <input type="text" placeholder='Enter Movie Name' onChange={e => setSearch(e.target.value)} onKeyDown={searchMovie}/>
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
            </div>

            <div className="container">
                { (movies.length === 0) ? 
                    <p className='not-found'>Not Found</p>
                    :
                    movies.map((movie) => (
                        <Card movie={movie} />
                    ))
                    }
            </div>

        </div>
    )
}

export default Main