import React, { useState, useEffect } from 'react';
import Card from './Card';

function CardContainer() {
  const [cardDataList, setCardDataList] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    title: '',
    technologies: '',
    // frontend: '',
    // backend: '',
    // databases: '',
    // infrastructure: '',
  });

  useEffect(() => {
    // Function to fetch data based on search criteria
    const fetchData = async () => {
      try {
        // Make a POST request to the searchProjects API
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/searchProjects`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(searchCriteria),
        });

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const dataList = await response.json();
        setCardDataList(dataList);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function whenever search criteria change
  }, [searchCriteria]);

  // Handle changes in input fields and update the corresponding state variable
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value,
    }));
  };

  return (
    <div className="card-container">
      <input
        type="text"
        name="title"
        value={searchCriteria.title}
        onChange={handleInputChange}
        placeholder="Search Project Title..."
        className="w-50 p-2"
      />
      <input
        type="text"
        name="technologies"
        value={searchCriteria.technologies}
        onChange={handleInputChange}
        placeholder="Search Technologies..."
        className="w-50 p-2"
      />
      {/* <input
        type="text"
        name="frontend"
        value={searchCriteria.frontend}
        onChange={handleInputChange}
        placeholder="Search Frontend Skills..."
        className="w-50 p-2"
      />
      <input
        type="text"
        name="backend"
        value={searchCriteria.backend}
        onChange={handleInputChange}
        placeholder="Search Backend Skills..."
        className="w-50 p-2"
      />
      <input
        type="text"
        name="databases"
        value={searchCriteria.databases}
        onChange={handleInputChange}
        placeholder="Search Database Skills..."
        className="w-50 p-2"
      />
      <input
        type="text"
        name="infrastructure"
        value={searchCriteria.infrastructure}
        onChange={handleInputChange}
        placeholder="Search Infrastructure Skills..."
        className="w-50 p-2"
      /> */}

      {cardDataList.map((cardData, index) => (
        <Card key={index} cardData={cardData} className="card" />
      ))}
    </div>
  );
}

export default CardContainer;
