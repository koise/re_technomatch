import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import AuthTopBar from "../components/AuthTopBar";
import Spinner from "../components/ui/Spinner";

const StudentLayout = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Skip the check if user is already on a room or match page
        if (location.pathname.includes('/competitive/room/') || 
            location.pathname.includes('/competitive/match/')) {
            setLoading(false);
            return;
        }

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
    }, [token, navigate, location.pathname]);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="student-layout">
            <AuthTopBar />
            <div className="layout-container">
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default StudentLayout;
