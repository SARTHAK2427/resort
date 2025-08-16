#!/bin/bash

echo "Starting EcoRewards Platform..."
echo

echo "Starting Flask Backend..."
cd backend && python app.py &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

echo "Starting React Frontend..."
npm run dev &
FRONTEND_PID=$!

echo
echo "EcoRewards Platform is starting..."
echo
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5000"
echo
echo "Press Ctrl+C to stop both servers..."

# Wait for user to stop
trap "echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
