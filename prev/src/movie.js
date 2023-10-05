
import { useEffect, useState } from 'react';
// import useLongPress from './longpress';
import './App.css';
import Auth from './Aut';
import { useLongPress } from 'use-long-press';
function Movie() {
    const [movie, setMovie] = useState([]);
    //used for modal???
    const [dat, setData] = useState(null);
    const [arrai, setArray] = useState([]);
    const [ep, setEp] = useState([]);
    const [detailsEp, setDE] = useState([]);
    var cat = localStorage.getItem("access_token");

    // const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetch("https://api.betaseries.com/shows/list?key=bdd22aad23fc").then(data => data.json()).then(data => {
            console.log(data)
            setMovie(data.shows)
        })


        // console.log(movie);
    }, [])
    const [longPressTimer, setLongPressTimer] = useState(null);

    const handleLongPressStart = (input) => {
        setLongPressTimer(setTimeout(() => {
            details(input);
        }, 1000));
    };

    const handleLongPressStart2 = (input) => {
        setLongPressTimer(setTimeout(() => {
            console.log(input)
            detailsEpisode(input);
        }, 1000));
    };

    function detailsEpisode(id) {
        fetch(`https://api.betaseries.com/episodes/display?key=bdd22aad23fc&&id=${id}`).then(data => data.json()).then(data => {
            console.log(data.episode)
            setDE(data.episode)
        })

    }
    function episodes(id) {
        fetch(`https://api.betaseries.com/episodes/list?key=bdd22aad23fc&&token=${cat}&&showId=${id}`).then(data => data.json()).then(data => {
            console.log(data)
            if (data.shows.length > 0) {
                console.log(data.shows[0].unseen)
                setEp(data.shows[0].unseen)
            }
        })
    }
    const handleLongPressEnd = () => {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
        }
    };
    function addserie(id) {
        fetch(`https://api.betaseries.com/shows/show?key=bdd22aad23fc&&id=${id}&&access_token=${cat}`, {
            method: "post"
        })
    }

    function archiver(id) {
        fetch(`https://api.betaseries.com/shows/archive?key=bdd22aad23fc&&id=${id}&&access_token=${cat}`, {
            method: "post"
        })
    }
    function details(input) {
        fetch(`https://api.betaseries.com/shows/display?key=bdd22aad23fc&&id=${input}`).then(data => data.json()).then(data => {
            console.log(data.show)
            setData(data.show)

        })
    }

    return (
        <div className="movie-list">
            {movie.map(ind => {
                if (!ind.title || !ind.images.poster) return null;
                return (
                    <>



                        <div
                            key={ind.id}
                            className='series'
                            onMouseDown={() => handleLongPressStart(ind.id)}
                            onMouseUp={handleLongPressEnd}
                            onMouseLeave={handleLongPressEnd}
                            onClick={() => episodes(ind.id)}
                        >
                            <p>{ind.title}</p>
                            <img src={ind.images.poster}></img>
                        </div>
                    </>
                )
            })}
            {dat &&

                <div className='details'>
                    <div className='full_x'>
                        <button onClick={() => setData(null)}>X</button>
                    </div>
                    <img src={dat?.images ? dat.images.poster : ""} />
                    <div>
                        <p className='details_title'>{dat.title}</p>
                        <p className='detail_description'>{dat.description}</p>
                        <button onClick={() => addserie(dat.id)}>ADD</button>
                        <button onClick={() => archiver(dat.id)}>ARCHIVER</button>
                    </div>
                    {console.log(dat?.images.poster)}
                    <div>
                        <p>nombre d'épisodes : {dat.episodes}</p>
                        <p>nombre de saisons : {dat.seasons}</p>
                        <p>durée des épisodes : {dat.length} min</p>
                        <p>note (moyenne) : {dat.notes.total} / 5</p>
                        <p>genres :</p>
                        <ul>
                            {Object.values(dat.genres).map((genre, index) => (
                                <p key={index}>{genre}</p>
                            ))}
                        </ul>
                        {/* <p>{dat.images.poster}</p> */}

                    </div>
                </div>
            }

            {detailsEp.title &&
                <div className='de'>

                    <p>title : {detailsEp.title}</p>
                    <p>{detailsEp.description}</p>
                </div>
            }

            {ep.length > 0 &&

                <div className='ep'>
                    <div className='full_x'>
                    <button onClick={() => setEp([])}>X</button>
                </div>
                    {ep.map(ind => {

                        return (

                            <p
                                onMouseDown={() => handleLongPressStart2(ind.id)}
                                onMouseUp={handleLongPressEnd}
                                onMouseLeave={handleLongPressEnd}
                            >{ind.code}
                            </p>
                        )
                    })


                    }


                </div>
            }


        </div>
    );
}

export default Movie;
