import React, { useState } from 'react';
import './App.css';

// Initialize all rooms with floor, number, and booking status
const initializeRooms = () => {
  let rooms = [];
  // Floors 1-9: 10 rooms each
  for (let floor = 1; floor <=9; floor++) {
    for (let roomNum = 1; roomNum <=10; roomNum++) {
      rooms.push({
        floor: floor,
        number: floor * 100 + roomNum,
        booked: false
      });
    }
  }
  // Floor 10: 7 rooms
  for (let roomNum =1; roomNum <=7; roomNum++) {
    rooms.push({
      floor:10,
      number:1000 + roomNum,
      booked: false
    });
  }
  return rooms;
};

// Calculate travel time between two rooms
const calculateTravelTime = (roomA, roomB) => {
  const verticalTime = Math.abs(roomA.floor - roomB.floor) *2;
  const posA = roomA.floor <=9 ? (roomA.number % 100) -1 : (roomA.number %1000)-1;
  const posB = roomB.floor <=9 ? (roomB.number %100) -1 : (roomB.number %1000)-1;
  const horizontalTime = Math.abs(posA - posB);
  return verticalTime + horizontalTime;
};

// Find optimal rooms for booking
const findOptimalRooms = (rooms, numRooms) => {
  if (numRooms <1 || numRooms>5) return [];
  
  // Check for single floor availability first
  for (let floor =1; floor <=10; floor++) {
    const floorRooms = rooms.filter(r => r.floor === floor && !r.booked);
    if (floorRooms.length >= numRooms) {
      return floorRooms.sort((a,b) => a.number - b.number).slice(0, numRooms);
    }
  }
  
  // Find best cross-floor set with minimal travel time
  const availableRooms = rooms.filter(r => !r.booked).sort((a,b) => a.floor - b.floor || a.number - b.number);
  let bestSet = [];
  let minTotalTime = Infinity;
  
  for (let i=0; i <= availableRooms.length - numRooms; i++) {
    const candidateSet = availableRooms.slice(i, i+numRooms);
    const totalTime = calculateTravelTime(candidateSet[0], candidateSet.at(-1));
    if (totalTime < minTotalTime) {
      minTotalTime = totalTime;
      bestSet = candidateSet;
    }
  }
  
  return bestSet;
};

function App() {
  const [rooms, setRooms] = useState(initializeRooms());
  const [numRooms, setNumRooms] = useState("");
  const [travelTime, setTravelTime] = useState(0);

  const handleBook = () => {
    const num = parseInt(numRooms);
    if (isNaN(num) || num <1 || num>5) {
      alert("Please enter a valid number between 1-5");
      return;
    }
    
    const selectedRooms = findOptimalRooms(rooms, num);
    if (selectedRooms.length < num) {
      alert("Not enough available rooms to complete booking!");
      return;
    }
    
    setTravelTime(calculateTravelTime(selectedRooms[0], selectedRooms.at(-1)));
    setRooms(prev => prev.map(room => 
      selectedRooms.some(r => r.number === room.number) ? {...room, booked: true} : room
    ));
  };

  const handleReset = () => {
    setRooms(initializeRooms());
    setTravelTime(0);
    setNumRooms("");
  };

  const handleRandom = () => {
    setRooms(rooms.map(room => ({
      ...room,
      booked: Math.random() < 0.4
    })));
    setTravelTime(0);
  };

  const groupRoomsByFloor = () => {
    const groups = {};
    rooms.forEach(room => {
      if (!groups[room.floor]) groups[room.floor] = [];
      groups[room.floor].push(room);
    });
    return Object.keys(groups).sort((a,b) => parseInt(a)-parseInt(b)).map(floor => groups[floor]);
  };

  return (
    <div className="App">
      <div className="controls">
        <input
          type="number"
          placeholder="No of Rooms (1-5)"
          value={numRooms}
          onChange={(e) => setNumRooms(e.target.value)}
          min="1"
          max="5"
        />
        <button onClick={handleBook}>Book</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleRandom}>Random</button>
        {travelTime >0 && <div className="travel-time">Total Travel Time: {travelTime} mins</div>}
      </div>
      
      <div className="hotel-layout">
        {groupRoomsByFloor().map((floorRooms, floorIndex) => (
          <div key={floorIndex} className="floor">
            <div className="floor-label">Floor {floorRooms[0].floor}</div>
            <div className="rooms">
              {floorRooms.map(room => (
                <div 
                  key={room.number} 
                  className={`room ${room.booked ? 'booked' : 'available'}`}
                  title={`Room ${room.number}`}
                >
                  {room.number}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;