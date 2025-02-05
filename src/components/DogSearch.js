import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DogCard from './DogCard';

const DogSearch = ({ onLoginSuccess }) => {
    const [dogs, setDogs] = useState([]);
    const [filteredDogs, setFilteredDogs] = useState([]);
    const [searchIds, setSearchIds] = useState([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const [favorites, setFavorites] = useState([]);
    const [match, setMatch] = useState(null);

    useEffect(() => {
        handleSearch();
    }, [page, sortOrder]);

    const fetchDogs = async (ids) => {
        try {
            const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs', ids, {
                withCredentials: true,
            });
            setDogs(response.data);
            setFilteredDogs(response.data);
        } catch (error) {
            console.error('Error fetching dogs:', error);
        }
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
                params: {
                    breeds: selectedBreed ? [selectedBreed] : [],
                    size: 25,
                    sort: `breed:${sortOrder}`,
                    from: (page - 1) * 25,
                },
                withCredentials: true,
            });
            setSearchIds(response.data.resultIds);
            fetchDogs(response.data.resultIds);
        } catch (error) {
            onLoginSuccess(false);
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        if (searchIds.length > 0) {
            const matchedDogs = dogs.filter(dog => searchIds.includes(dog.id));
            setFilteredDogs(matchedDogs);
        } else {
            setFilteredDogs(dogs);
        }
    }, [searchIds, dogs]);

    const toggleFavorite = (dogId) => {
        setFavorites(prevFavorites =>
            prevFavorites.includes(dogId)
                ? prevFavorites.filter(id => id !== dogId)
                : [...prevFavorites, dogId]
        );
    };

    const generateMatch = async () => {
        try {
            const response = await axios.post('https://frontend-take-home-service.fetch.com/dogs/match', favorites, {
                withCredentials: true,
            });

            const dogsResponse = await axios.post('https://frontend-take-home-service.fetch.com/dogs', [response.data.match], {
                withCredentials: true,
            });
            setMatch(dogsResponse.data[0]); // Assuming the API returns a match object
        } catch (error) {
            console.error('Error generating match:', error);
        }
    };

    return (
        <div className="dog-search-container">
            <h2>Find Your Perfect Dog</h2>
            <div className="content">
                <div className="list-section">
                    <div className="filters">
                        <label>
                            Breed:
                            <input
                                type="text"
                                value={selectedBreed}
                                onChange={(e) => setSelectedBreed(e.target.value)}
                                placeholder="Search breed..."
                            />
                        </label>
                        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                            Sort: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                        </button>
                        <button onClick={handleSearch}>Search</button>
                    </div>

                    <div className="dog-list">
                        {filteredDogs.length === 0 ? (
                            <p>No dogs found. Try adjusting your search filters.</p>
                        ) : (
                            filteredDogs.map(dog => (
                                <DogCard key={dog.id} dog={dog} toggleFavorite={toggleFavorite} isFavorite={favorites.includes(dog.id)} />
                            ))
                        )}
                    </div>
                    <div className="pagination">
                        <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1} className="pagination-btn">
                            Previous
                        </button>
                        <button onClick={() => setPage(prev => prev + 1)} className="pagination-btn">
                            Next
                        </button>
                    </div>
                </div>

                <div className="match-section">
                    <h3>Favorites</h3>
                    {favorites.length > 0 ? (
                        <button onClick={generateMatch} className="match-btn">Generate Match</button>
                    ) : (
                        <p>Select some dogs to find a match!</p>
                    )}
                    {match && (
                        <div className="match-result">
                            <h3>Your Match</h3>
                            <DogCard key={match.id} dog={match} showFavorite={false} toggleFavorite={toggleFavorite} isFavorite={favorites.includes(match.id)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DogSearch;
