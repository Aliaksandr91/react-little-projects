import React, {useEffect, useState} from 'react';
import './index.scss';
import {Collection} from "./Collection";

interface CollectionType {
    category: number
    name: string
    photos: string[]
}

const categories = [
    {"name": "All"},
    {"name": "Sea"},
    {"name": "Mountains"},
    {"name": "Architecture"},
    {"name": "Cities"}
]

function App() {
    const [collections, setCollections] = useState<CollectionType[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [categoryId, setCategoryId] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    useEffect(() => {
        setIsLoading(true)
        const category = categoryId ? `category=${categoryId}` : ''

        fetch(`https://6540fd8045bedb25bfc3032e.mockapi.io/photos?page=${page}&limit=3&${category}`)
            .then(res => res.json())
            .then(json => {
                setCollections(json)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, [categoryId,page])

    return (
        <div className="App">
            <h1>My collection of photos</h1>
            <div className="top">
                <ul className="tags">
                    {
                        categories.map((category, index) => <li onClick={() => setCategoryId(index)}
                                                                className={categoryId === index ? 'active' : ''}
                                                                key={category.name}>{category.name}</li>)
                    }
                </ul>
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.currentTarget.value)}
                    className="search-input" placeholder="Search by title"/>
            </div>
            <div className="content">
                {
                    isLoading
                        ? <h2>Loading...</h2>
                        : collections
                            .filter((collection) => {
                                return collection.name.toLowerCase().includes(searchValue.toLowerCase())
                            })
                            .map((collection, index) => (
                                <Collection
                                    key={index}
                                    name={collection.name}
                                    images={collection.photos}
                                />)
                            )
                }
            </div>
            <ul className="pagination">
                {
                    [...Array(3)].map((_, i) => <li onClick={() => setPage(i + 1)}
                                                    className={page === (i + 1) ? 'active' : ''}>{i + 1}</li>)
                }
            </ul>
        </div>
    );
}

export default App;