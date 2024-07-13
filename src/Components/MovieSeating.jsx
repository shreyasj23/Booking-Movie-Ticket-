import { useState, useEffect } from 'react';
import "./MovieSeating.css";
import Seats from './Seats';
import Summary from './Summary';

const MovieSeating = () => {
  const [rows, setRows] = useState(3);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetchSeats(rows);
  }, [rows]);

  const fetchSeats = async (rowCount) => {
    try {
      const response = await fetch(`https://codebuddy.review/seats?count=${rowCount}`);
      const data = await response.json();
      setSeats(data);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  const handleRowChange = (e) => {
    const value = Math.max(3, Math.min(10, e.target.value));
    setRows(value);
  };

  const handleSeatSelection = (seat) => {
    if (selectedSeats.length < 5 || selectedSeats.includes(seat)) {
      const newSelectedSeats = selectedSeats.includes(seat)
        ? selectedSeats.filter(s => s !== seat)
        : [...selectedSeats, seat];
      setSelectedSeats(newSelectedSeats);
      calculateTotalCost(newSelectedSeats);
    }
  };

  const calculateTotalCost = (selectedSeats) => {
    let cost = 0;
    selectedSeats.forEach(seat => {
      const rowNumber = Math.ceil(seat / rows);
      cost += rowNumber * 10;
    });
    setTotalCost(cost + 20);
  };

  const handleSubmit = async () => {
    if (selectedSeats.length < 1 || selectedSeats.length > 5) {
      alert('Please select between 1 and 5 seats.');
      return;
    }
    try {
      await fetch('https://codebuddy.review/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seats: selectedSeats })
      });
      alert('Seats successfully submitted');
    } catch (error) {
      console.error('Error submitting seats:', error);
    }
  };

  return (
    <div className='movie-seating'>
      <h1 >Movie Theater Seat Booking</h1>
      <label>
        Number of Rows:
        <input
          type="number"
          value={rows}
          onChange={handleRowChange}
          min="3"
          max="10"
        />
      </label>
      <button className='fetched' onClick={() => fetchSeats(rows)}>Fetch Seats</button>
      <Seats rows={rows} seats={seats} selectedSeats={selectedSeats} handleSeatSelection={handleSeatSelection} />
      <Summary selectedSeats={selectedSeats} totalCost={totalCost} handleSubmit={handleSubmit} />
    </div>
  );
};

export default MovieSeating;
