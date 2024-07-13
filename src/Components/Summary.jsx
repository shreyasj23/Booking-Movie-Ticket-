const Summary = ({ selectedSeats, totalCost, handleSubmit }) => {
    return (
      <div className="summary">
        <h2>Selected Seats: {selectedSeats.join(', ')}</h2>
        <h2>Total Cost: ${totalCost}</h2>
        <button className="submit" onClick={handleSubmit}>Submit Seats</button>
      </div>
    );
  };
  
  export default Summary;
  