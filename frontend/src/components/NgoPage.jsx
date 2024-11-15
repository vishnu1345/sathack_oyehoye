import React, { useState } from 'react';
import axios from 'axios';
import './NgoPage.css';

function NgoPage() {
  const [files, setFiles] = useState(null);
  const [numberOfTrees, setNumberOfTrees] = useState('');
  const [treeSpecies, setTreeSpecies] = useState('');
  const [tempCompatibility, setTempCompatibility] = useState('');
  const [soilType, setSoilType] = useState('');
  const [elevation, setElevation] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }

    formData.append('numberOfTrees', numberOfTrees);
    formData.append('treeSpecies', treeSpecies);
    formData.append('tempCompatibility', tempCompatibility);
    formData.append('soilType', soilType);
    formData.append('elevation', elevation);
    formData.append('rainfall', rainfall);

    try {
      const response = await axios.post('http://localhost:3000/ngo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(`Submission successful: ${response.data.message}`);
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  return (
    <div className="main">
      <div className="ngo-page">
        <div className="form-container">
          <h1>NGO Submission</h1>
          <form onSubmit={handleSubmit} className="two-column-form">
            <div className="form-group">
              <label htmlFor="numberOfTrees">Number of Trees:</label>
              <input
                type="number"
                id="numberOfTrees"
                placeholder="Enter number of trees"
                value={numberOfTrees}
                onChange={(e) => setNumberOfTrees(e.target.value)}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="treeSpecies">Tree Species:</label>
              <input
                type="text"
                id="treeSpecies"
                placeholder="Enter tree species"
                value={treeSpecies}
                onChange={(e) => setTreeSpecies(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="tempCompatibility">Temperature Compatibility (°C):</label>
              <input
                type="number"
                id="tempCompatibility"
                placeholder="Enter temperature compatibility"
                value={tempCompatibility}
                onChange={(e) => setTempCompatibility(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="soilType">Soil Type:</label>
              <input
                type="text"
                id="soilType"
                placeholder="Enter soil type"
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="elevation">Elevation (m):</label>
              <input
                type="number"
                id="elevation"
                placeholder="Enter elevation"
                value={elevation}
                onChange={(e) => setElevation(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rainfall">Rainfall (mm/year):</label>
              <input
                type="number"
                id="rainfall"
                placeholder="Enter rainfall"
                value={rainfall}
                onChange={(e) => setRainfall(e.target.value)}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="files">Upload Files:</label>
              <input
                type="file"
                id="files"
                multiple
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default NgoPage;
