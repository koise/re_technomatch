import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import StudentHeader from './StudentHeader';
import StudentFooter from './StudentFooter';
import axios from 'axios';
import CompetitivePopup from './CompetitivePopup';

const StudentLayout = () => {
  const [activeRooms, setActiveRooms] = useState([]);
  const [pendingRooms, setPendingRooms] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [roomData, setRoomData] = useState(null);
  
  // Check for active rooms - Mock implementation
  const checkActiveRoom = async () => {
    try {
      // Mock API call
      console.log('Using mock data for active rooms check');
      
      // Simulate API response
      const mockResponse = {
        data: {
          active_rooms: [],
          pending_rooms: []
        }
      };
      
      return mockResponse;
    } catch (error) {
      console.log('Error checking active rooms:', error);
      // Return empty arrays as fallback
      return {
        data: {
          active_rooms: [],
          pending_rooms: []
        }
      };
    }
  };
  
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await checkActiveRoom();
        
        if (response.data.active_rooms.length > 0) {
          setActiveRooms(response.data.active_rooms);
          setRoomData(response.data.active_rooms[0]);
          setShowPopup(true);
        }
        
        if (response.data.pending_rooms.length > 0) {
          setPendingRooms(response.data.pending_rooms);
          setRoomData(response.data.pending_rooms[0]);
          setShowPopup(true);
        }
      } catch (error) {
        console.log('Error fetching room data:', error);
      }
    };
    
    fetchRooms();
    
    // Poll for room updates every 10 seconds
    const interval = setInterval(fetchRooms, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handlePopupClose = () => {
    setShowPopup(false);
  };
  
  return (
    <div className="student-layout">
      <StudentHeader />
      <main className="content">
        <Outlet />
      </main>
      <StudentFooter />
      
      {showPopup && roomData && (
        <CompetitivePopup 
          room={roomData} 
          onClose={handlePopupClose}
          isActive={activeRooms.length > 0}
        />
      )}
    </div>
  );
};

export default StudentLayout; 