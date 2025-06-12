import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../components/ui/Spinner";
import StudentHeader from "../components/StudentHeader";
import "../layouts/StudentLayout.scss"; // Keep existing styles

const Dashboard = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user has an active room/match to redirect to
        const checkActiveRoom = async () => {
            try {
                // This API endpoint checks if the user is part of an active room
                const response = await axios.get("/api/student/competitive/check-pending-rooms", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                if (response.data && response.data.room_id) {
                    console.log('Found active room, redirecting:', response.data.room_id);
                    navigate(`/competitive/room/${response.data.room_id}`);
                }
            } catch (error) {
                console.error("Error checking active rooms:", error);
            } finally {
                setLoading(false);
            }
        };
        
        if (token) {
            checkActiveRoom();
        } else {
            setLoading(false);
        }
    }, [token, navigate]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner size="lg" />
            </div>
        );
    }

    // Original Dashboard content from layouts/StudentLayout/pages/Dashboard
    return (
        <div className="student-layout bg-gray-900 min-h-screen">
            <StudentHeader />
            <div className="layout-container">
                <main>
                    <div className="dashboard-container">
                        <h1>Student Dashboard</h1>
                        <p>Welcome to your dashboard. This is a standalone page with its own header.</p>
                        
                        {/* Dashboard content */}
                        <div className="dashboard-cards">
                            <div className="dashboard-card">
                                <h2>Your Progress</h2>
                                <p>Track your learning progress</p>
                            </div>
                            <div className="dashboard-card">
                                <h2>Coding Challenges</h2>
                                <p>Complete coding challenges to earn XP</p>
                            </div>
                            <div className="dashboard-card">
                                <h2>Leaderboard</h2>
                                <p>See how you rank against other students</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard; 