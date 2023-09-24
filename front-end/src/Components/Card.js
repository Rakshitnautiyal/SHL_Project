import React from 'react';

function Card({ cardData }) {
  return (
    <div className="card" style={{ width: '18rem' }}>
      <div class="card-body">
    <h5 class="card-title">{cardData.Project.Title}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{cardData.Project.Technologies}</h6>
    <p class="card-text">{cardData.Technical_skillset.Database}</p>
    
    {
          console.log(cardData)
    }
  </div>
    </div>
  );
}

export default Card;

