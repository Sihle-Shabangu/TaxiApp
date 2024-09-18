'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const PassengersList = () => {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchPassengers = async () => {
       // Reset status
        setError('');
    try {
      // Make GET request to fetch passengers
      const response = await axios.get('http://localhost:3001/api/passengers', {
        headers: {
          'Content-Type': 'application/json', // Optional: the server might automatically set this
        },
      });

      // Set the passengers state with the response data
      setPassengers(response.data);
      console.log(response.data)
      setLoading(false);
    } catch (err) {
      // Handle errors
      console.error('Error fetching passengers:', err);
      setError('Failed to load passengers');
      setLoading(false);
    }
  };

  // Use useEffect to call fetchPassengers when the component loads
  useEffect(() => {
    fetchPassengers();
  }, []);

  if (loading) {
    return <p>Loading passengers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Passengers List</h1>
        {passengers.length > 0 ? (
          <ul className="space-y-4">
            {passengers.map((passenger) => (
              <li key={passenger._id} className="bg-gray-200 p-4 rounded-md">
                <p><strong>Name:</strong> {passenger.name}</p>
                <p><strong>Email:</strong> {passenger.email}</p>
                <p><strong>Wallet Address:</strong> {passenger.walletAddress}</p>
                <p><strong>Phone Number:</strong> {passenger.phoneNumber}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No passengers found.</p>
        )}
      </div>
    </div>
  );
};

export default PassengersList;
