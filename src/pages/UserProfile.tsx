// ==============================
// UserProfile.tsx (copy into src/components/UserProfile.tsx)
// ==============================
import React, { useEffect, useState } from "react";

import "../styles/scss/mentorProfile.scss";
import useHttp from "../customhooks/useHttp";
import { APP_ENDPOINTS } from "../config/app";
import { useParams } from "react-router-dom";
import { MenteeDataType, MentorDataType, ScheduleDataType } from "../types/DataTypes";
 import { Roles } from "../types/Roles";
// helpers (top of file or a utils file)
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
 

import  MentorProfile from './profiles/MentorProfile';
import MenteeProfile from "./profiles/MenteeProfile";
import { Link } from "react-router-dom";


dayjs.extend(utc);
dayjs.extend(tz);


 
 
export default function UserProfile() {
  const { get } = useHttp();
  const [user, setUser] = useState<MentorDataType |MenteeDataType| null>(null);
  const { role, user_id } = useParams();

  useEffect(() => {
    const url = `${APP_ENDPOINTS.USER.SINGLE}/${user_id}`; // Example user ID
    get(url)
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return user ? (
    <div className="user-profile-page">
      {role === "mentor" && <MentorProfile user={user as MentorDataType} />}
      {role === "mentee" && <MenteeProfile user={user as MenteeDataType} />}
    </div>
  ) : null;
}

