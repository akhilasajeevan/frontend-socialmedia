import React, { useState } from 'react';
import axios from 'axios';

const SearchUsers = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/api/users/search?name=${query}`);
      setResults(response.data);
      setMessage(`Found ${response.data.length} user(s).`);
    } catch (error) {
      console.error('Error searching users:', error);
      setMessage('Error searching users. Please try again.');
    }
  };

  return (
    <div>
      <h2>Search Users</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter name to search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
        {results.map(user => (
          <li key={user._id}>{user.name}</li> // Display user names
        ))}
      </ul>
    </div>
  );
};

export default SearchUsers;
