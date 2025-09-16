import { useEffect, useState } from "react";
import { UserDataType } from "../../../types/DataTypes";
import { Chip } from "@mui/material";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";
import ScheduleAvailability from "../../../pages/mentors/ScheduleAvailability";
import { ScheduleDataType } from "../../../types/DataTypes";

// import "../../../styles/scss/mentorProfile.scss";
 
dayjs.extend(utc);
dayjs.extend(tz);

type Slot = { start: string; end: string };
type AvailableTimeStatus = { startTime: string; status: string };
type DaySlots = { date: string; dow: string; slots: string[] };

const weekdayLabel = (isoDate: string, timeZone = "America/New_York") =>
  new Intl.DateTimeFormat("en-US", { weekday: "short", timeZone }).format(
    new Date(`${isoDate}T12:00:00Z`)
  );

/**
 *
 * @param {number} start_time inclusive start_time in int 24 hr format 0- 24
 * @param {number} end_time - exclusive end_time in int 24 hr format 0 - 24 the 24th hour will be excluded
 *
 * builds the available time slots for the mentorship platform. the start time defaults to 5
 * and the end_time defaults to 24
 *  @returns {AvailableTimeStatus} The computed availability model.
 */
const buildTimeSlots = (
  start_time = 5,
  end_time = 24
): AvailableTimeStatus[] => {
  let time_slots: AvailableTimeStatus[] = [];
  for (let hour = start_time; hour < end_time; hour++) {
    const current_hour = dayjs()
      .set("hour", hour)
      .set("minute", 0)
      .set("second", 0)
      .format("HH:mm:ss");
    time_slots.push({ startTime: current_hour, status: "available" });
  }

  return time_slots;
};

/**
 * Build a 7-day map of default availability where each date maps to the same
 * set of available start times (raw "HH:mm:ss" strings).
 *
 * @param {AvailableTimeStatus[]} timeSlots - Available items to seed defaults (date is ignored).
 * @returns {Map.<string, string[]>} Map keyed by 'YYYY-MM-DD' with an array of 'HH:mm:ss' times.
 *
 * @example
 * // Input timeSlots:
 * // [
 * //   { date: '2025-07-23', startTime: '05:00:00', status: 'available' },
 * //   { date: '2025-07-23', startTime: '06:00:00', status: 'available' },
 * //   { date: '2025-07-24', startTime: '09:00:00', status: 'available' }
 * // ]
 * //
 * // Output:
 * // Map {
 * //   '2025-08-30' => ['05:00:00','06:00:00','09:00:00'],
 * //   '2025-08-31' => ['05:00:00','06:00:00','09:00:00'],
 * //   ...
 * // }
 */
const buildDefaultAvailabilityList = (
  time_slots: AvailableTimeStatus[] = []
) => {
  const scheduleAvailability = new Map();
  for (let i = 0; i < 7; i++) {
    const date = dayjs().day(i).format("YYYY-MM-DD");
    scheduleAvailability.set(date, time_slots);
  }
  return scheduleAvailability;
};

/**
 *
 * @param {ScheduleDataType[]} schedule - this is the  users schedule
 * @param {Map<string,AvailableTimeStatus[]>} scheduleAvailability - this is the default schedule availaibility with all slots marked available
 *
 * Updates the availability status for each time slot, marking the status
 * to unavailable is the time slot is already scheduled for the user
 * @returns {Map<string,AvailableTimeStatus[]>}
 */
const updatedAvailabilityScheduleForUser = (
  schedule: ScheduleDataType[] = [],
  scheduleAvailability: Map<string, AvailableTimeStatus[]>
) => {
  if (!schedule || schedule.length === 0) return scheduleAvailability;
  schedule.forEach((slot) => {
    if (!scheduleAvailability.has(slot.date)) {
      return;
    }

    const current_date = slot.date;
    const current_date_time_slots = scheduleAvailability.get(slot.date) || [];
    const start_time = slot.date_time.start_time;
    const updated_slots = current_date_time_slots.map((time_slot: any) => {
      if (time_slot.startTime === start_time) {
        time_slot.status = "unavailable";
      }
      return time_slot;
    });

    scheduleAvailability.set(current_date, updated_slots);
  });

  return scheduleAvailability;
};

/**
 *
 * @param {Map<string,AvailableTimeStatus[]>} schedule_availability
 * @returns DaySlots[]
 */

const convertAvailableTimeScheduleToDayModel = (
  schedule_availability: Map<string, AvailableTimeStatus[]>
): DaySlots[] => {
  const dayModels: DaySlots[] = Array.from(schedule_availability).map(
    (value, key) => {
      const date = value[0];
      const slots = value[1]
        .filter(
          (item: { startTime: string; status: string }) =>
            item.status === "available"
        )
        .map((s: { startTime: string; status: string }) =>
          dayjs(s.startTime, "HH:mm:ss").format("hh:mm A")
        );

      const output = { date, dow: weekdayLabel(date), slots };
      return output;
    }
  );

  return dayModels;
};

export default function MentorAvailability({user}: {user: UserDataType}) {
  const [schedules, setSchedules] = useState<DaySlots[] | []>([]);
  useEffect(() => {
    if (user === null) return;

    const time_slots = buildTimeSlots();
    const schedule_availability = buildDefaultAvailabilityList(time_slots);
    const updated_availability = updatedAvailabilityScheduleForUser(
      user.schedule,
      schedule_availability
    );
    const users_day_slots =
      convertAvailableTimeScheduleToDayModel(updated_availability);
    setSchedules(users_day_slots);
  }, [user]);

  return (
    <>

        <div className="card">
          <h3 className="card-title with-ico">This Week </h3>
          {schedules.length === 0 && (
            <p className="muted">No available slots</p>
          )}
          
          <div className="availability-grid">
            {schedules.map((d) => (
              <div className="availability-day" key={d.date}>
                <div className="availability-day-name">
                  {d.dow}{" "}
                  <span className="muted">
                    ({dayjs(d.date).format("MMM DD")})
                  </span>
                </div>
                <div className="availability-times">
                  {d.slots.length ? (
                    d.slots.map((t, index) => (
                      <Chip key={index} label={t} variant="outlined"></Chip>
                    ))
                  ) : (
                    <span className="muted">No times</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
 
    </>
  );
}
