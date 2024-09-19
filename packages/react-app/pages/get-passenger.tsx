'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Web3 from 'web3'; // Import Web3

const PassengersList = () => {
  interface Passenger {
    _id: string;
    name: string;
    email: string;
    walletAddress: string;
    phoneNumber: string;
  }

  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [connectedWallet, setConnectedWallet] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch connected wallet address using web3.js
  const getConnectedWalletAddress = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const walletAddress = accounts[0];
        setConnectedWallet(walletAddress);
        return walletAddress;
      } catch (error) {
        console.error('Error getting connected wallet:', error);
        setError('Failed to connect to wallet');
      }
    } else {
      setError('MetaMask not installed');
    }
  };

  const fetchPassengers = async () => {
    setError(''); // Reset status
    try {
      const response = await axios.get('http://localhost:3001/api/passengers', {
        headers: {
          'Content-Type': 'application/json', // Optional: the server might automatically set this
        },
      });

      // Set the passengers state with the response data
      setPassengers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching passengers:', err);
      setError('Failed to load passengers');
      setLoading(false);
    }
  };

  // Use useEffect to call fetchPassengers and get the connected wallet
  useEffect(() => {
    const fetchData = async () => {
      const walletAddress = await getConnectedWalletAddress();
      if (walletAddress) {
        await fetchPassengers();
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading passengers...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Filter the passengers to only show the one with the connected wallet
  const filteredPassenger = passengers.find(
    (passenger) => passenger.walletAddress.toLowerCase() === connectedWallet.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Passenger Details</h1>
        {filteredPassenger ? (
          <div className="bg-gray-200 p-4 rounded-md">
            <p><strong>Name:</strong> {filteredPassenger.name}</p>
            <p><strong>Email:</strong> {filteredPassenger.email}</p>
            <p><strong>Wallet Address:</strong> {filteredPassenger.walletAddress}</p>
            <p><strong>Phone Number:</strong> {filteredPassenger.phoneNumber}</p>
          </div>
        ) : (
          <p>No passenger found for the connected wallet address.</p>
        )}
      </div>
    </div>
  );
};

export default PassengersList;
