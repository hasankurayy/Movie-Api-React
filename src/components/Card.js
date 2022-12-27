import React from 'react'

function Card({movie}) {

    let image_path = "https://image.tmdb.org/t/p/w500"

    return (
        <div className='movie'>
            <img src={image_path+movie.poster_path} alt="" />
            <div className="movie-details">
                <div className="box">
                    <h4 className="title">{movie.title}</h4>
                    <p className="rating">{movie.vote_average}</p>
                </div>
                <div className="overview">
                    <h1>overview</h1>
                    <p>{movie.overview}</p>
                </div>
            </div>
        </div>
    )
}

export default Card