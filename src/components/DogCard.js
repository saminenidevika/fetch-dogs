// src/components/DogCard.js
import React from 'react';

function DogCard({ dog, showFavorite=true, toggleFavorite, isFavorite }) {
  return (
    <div className={`dog-card ${isFavorite ? 'favorite' : ''}`} onClick={() => toggleFavorite(dog.id)}>
      <img src={dog.img} alt={dog.name} />
      <h3>{dog.name}</h3>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      <p>Location: {dog.zip_code}</p>
      {showFavorite && <button className="favorite-btn" >
        {isFavorite ? '❤️ Favorited' : '♡ Favorite'}
      </button>}
    </div>
  );
}

export default DogCard;
