import React, { useState, useEffect } from "react";
import Calendar from "../../components/Calendar";
import { UserDataType } from "../../types/DataTypes";
import { Roles } from "../../types/Roles";
import { useUser } from "../../contexts/UserContext";

const mockUser: UserDataType = {
  id: "123",
  fullname: "Marlon Wayans",
  role: {id:'',type:Roles.MENTOR},
  profile_photo_path: "https://variety.com/wp-content/uploads/2022/08/Marlon-Wayans-Headshot-e1660058380740.jpg",
  bio: "Experienced Software Developer"
};

const ScheduleAvailability = () => {
  // In a real implementation, we would use:
  // const user = useContext(UserContext);
  const { user }= useUser(); // Using mock data for now
  const [showTooltip, setShowTooltip] = useState(false);

  if(!user){
    return null
  }
  
  return   (
    <div style={{
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '1.5rem',
            marginBottom: '0.5rem',
            fontWeight: 'normal'
          }}>Welcome {user.fullname}, Please Set Your Availability Schedule</h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            textTransform: 'capitalize'
          }}>Role: {user.role.type}</p>
          <div style={{
            position: 'relative',
            display: 'inline-block',
            marginTop: '0.5rem'
          }}>
            <span 
              style={{ 
                cursor: 'help',
                color: '#666',
                fontSize: '1.2rem',
                padding: '0.5rem'
              }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              ⓘ
            </span>
            {showTooltip && (
              <div style={{
                position: 'absolute',
                left: '2rem',
                top: '50%',
                transform: 'translateY(-50%)',
                backgroundColor: '#f5f5f5',
                padding: '0.75rem',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                zIndex: 1000,
                width: 'max-content',
                maxWidth: '300px'
              }}>
                <p style={{
                  fontSize: '0.9rem',
                  color: '#666',
                  margin: 0
                }}>Block off the times you are not available by clicking on a start time and dragging to an end time.</p>
              </div>
            )}
          </div>
        </div>
        {user.profile_photo_path && (
          <img 
            src={user.profile_photo_path}
            alt={user.fullname}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />
        )}
      </div>
      <Calendar />
    </div>
  );
};

export default ScheduleAvailability;
