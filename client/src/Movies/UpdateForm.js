import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import axios from "axios"

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const UpdateForm = () => {
    const {push} = useHistory()
    const [movie, setMovie] = useState(initialMovie)
    const {id} = useParams()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            // console.log({res})
            //res.data
            setMovie(res.data)
        })
        .catch(err => {
            console.log({err})
        })
    }, [id])

    const handleChange = e => {
        e.persist()
        let value = e.target.value
        if(e.target.name === 'metascore'){
            value = parseInt(value, 10)
        }

        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()
        //axios.put will go here
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log("Movie-->", movie) //movie is the movie object
            //res.data
            //build a new array of items
            //loop through  old array of items--find the item that matches what we updated
            //update that item in your nrew array
            const updatedMovie = movie.filter(item => `${item.id}` !== res.data)
            setMovie(updatedMovie)
            push('/movies/:id')
        })
        .catch(err => {
            console.log("PUT Error", err)
        })
    }

    return(
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={submitForm}>
                <input 
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                value={movie.title}
                />
                <input 
                type="text"
                name="director"
                onChange={handleChange}
                placeholder="Director"
                value={movie.director}
                />
                <input 
                type="text"
                name="metascore"
                onChange={handleChange}
                placeholder="Metascore"
                value={movie.metascore}
                />
                <input 
                type="text"
                name="stars"
                onChange={handleChange}
                placeholder="Stars"
                value={movie.stars}
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateForm