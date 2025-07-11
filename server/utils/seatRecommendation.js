import Show from "../models/Show.js";

export const seatRecommendation = async (showId) => {

      const showData = await Show.findById(showId);
      if(!showData) return null;  //---------check it 
      const occupiedSeats = showData.occupiedSeats;

      let bestSeat = null;
  let minDistance = Infinity;
const seatMap = [
  ['X', 'X', 'X', 'X','A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'X', 'X', 'X', 'X'],            
  ['X', 'X', 'X', 'X', 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'X', 'X', 'X', 'X'],            
  ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9'],  
  ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9'],  
  ['G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9'],  
  ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7', 'J8', 'J9'], 
];
  const rows = seatMap.length;
  const col = Math.max(...seatMap.map(row => row.length));

  const centerRow = Math.floor(rows / 2);
  const centerCol = Math.floor(col / 2);

  seatMap.forEach((row, rowIndex) => {
    row.forEach((seat, colIndex) => {
      if (!occupiedSeats[seat] && seat !== 'X') {
        const distance = Math.abs(centerRow - rowIndex) + Math.abs(centerCol - colIndex);
        if (distance < minDistance) {
          minDistance = distance;
          bestSeat = seat;
        }
      }
    });
  });
   
  return bestSeat;
}