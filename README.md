Hotel Room Reservation System


A dynamic hotel room reservation system built with React. This application simulates a hotel with 97 rooms across 10 floors and implements intelligent booking logic to minimize travel time between booked rooms. It follows specific rules for room allocation, visualization, and user interactions as per the assignment requirements.
🎯 Project Overview

* Problem Statement: Manage bookings for a hotel with floors 1-9 (10 rooms each: e.g., 101-110) and floor 10 (7 rooms: 1001-1007). Guests can book up to 5 rooms, prioritizing same-floor availability and minimizing total travel time (horizontal: 1 min/room, vertical: 2 min/floor).
* Key Features:

Input for number of rooms (1-5) and automated booking.
Visualization of all rooms with color-coding (green: available, red: booked).
Calculate and display total travel time for the booking.
Buttons: Book (assign optimal rooms), Reset (clear all bookings), Random (generate random occupancy for testing).
Optimal booking logic: Same floor first; if not possible, cross-floor with minimal combined travel time.



This project was developed as an assignment to demonstrate React state management, algorithmic logic, and UI/UX for a real-world simulation.

* Controls panel: Input field, Book/Reset/Random buttons, and travel time display.
* Hotel layout: Vertical stack of floors, each showing room numbers and status.

🚀 Technologies Used

* Frontend: React.js (Functional Components, Hooks: useState)
* Styling: CSS (Custom styles for layout and visualization)
* Logic: JavaScript algorithms for room optimization and travel time calculation
* Deployment: Vercel or Netlify (for live hosting)

🛠️ Installation & Setup (Local Development)

1. 
Clone the Repository:
git clone https://github.com/shwet111/hotel-reservation.git
cd hotel-reservation


2. 
Install Dependencies:
npm install


3. 
Run the Application:
npm start


The app will open at http://localhost:3000.


4. 
Build for Production (Optional):
npm run build


This creates an optimized build/ folder for deployment.



📖 Usage Guide

1. Enter Number of Rooms: Type a value between 1 and 5 in the input field.
2. Book Rooms: Click Book to automatically select optimal rooms based on availability and travel time rules. The total travel time will be displayed.
3. Visualize: Rooms are shown by floor. Available rooms are green; booked rooms turn red.
4. Test Scenarios:

Click Random to simulate partial occupancy (40% rooms booked randomly).
Click Reset to clear all bookings and start fresh.


5. Edge Cases: If not enough rooms are available, an alert will notify you.

Example Booking

* Request 4 rooms on a fresh hotel: Books rooms 101-104 (same floor, 3 min horizontal travel).
* After random occupancy: May book across floors, e.g., 101-102 (Floor 1) + 201-202 (Floor 2), with 4 min total travel (2 min vertical + 2 min horizontal).

🔧 Booking Logic Details

* Single Floor Priority: Checks each floor for sufficient available rooms, selecting the leftmost (closest to stairs/lift) contiguous set.
* Cross-Floor Fallback: If no single floor works, selects the set of available rooms (sorted by floor/position) that minimizes travel time between the first and last room in the set.
* Travel Time Formula: Vertical = |floorA - floorB| × 2 mins + Horizontal = |positionA - positionB| × 1 min (positions start from 0 near the lift).

🌐 Live Demo

* Deployed on Vercel (https://hotel-reservation-dun.vercel.app/)
* Or check the GitHub repo for the latest code.

📝 Assignment Compliance
This implementation fully addresses the deliverables:

* Interface for entering room count and booking.
* Room visualization.
* Random occupancy generator.
* Reset functionality.
* Dynamic travel time calculation.

🤝 Contributing
Feel free to fork this repo, create issues, or submit pull requests for improvements (e.g., adding persistence with localStorage or more advanced UI).
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
