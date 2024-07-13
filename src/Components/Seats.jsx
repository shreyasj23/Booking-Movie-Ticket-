const Seats = ({ rows, seats, selectedSeats, handleSeatSelection }) => {
    return (
      <div className="seats-container">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="row">
            {Array.from({ length: rowIndex + 1 }, (_, seatIndex) => {
              const seatNumber = rowIndex * rows + seatIndex + 1;
              const isReserved = seats.includes(seatNumber);
              return (
                <button
                  key={seatNumber}
                  className={`seat ${isReserved ? 'reserved' : ''} ${selectedSeats.includes(seatNumber) ? 'selected' : ''}`}
                  onClick={() => !isReserved && handleSeatSelection(seatNumber)}
                  disabled={isReserved}
                >
                  {`Row: ${rowIndex + 1}, Seat: ${seatNumber}`}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  };
  
  export default Seats;
  