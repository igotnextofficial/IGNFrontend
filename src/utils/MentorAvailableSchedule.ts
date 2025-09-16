type Block = {
  date: string; // "YYYY-MM-DD"
  date_time: { start_time: string; end_time: string }; // "HH:mm:ss"
  status: "unavailable" | "booked" | string;
};

type Interval = { start: string; end: string }; // "HH:mm"

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const fromMinutes = (min: number) => {
  const h = Math.floor(min / 60).toString().padStart(2, "0");
  const m = (min % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};

// Merge overlapping blocked intervals (on a single day)
const mergeIntervals = (blocks: Interval[]): Interval[] => {
  const sorted = [...blocks].sort(
    (a, b) => toMinutes(a.start) - toMinutes(b.start)
  );
  const merged: Interval[] = [];
  for (const cur of sorted) {
    if (!merged.length) merged.push({ ...cur });
    else {
      const last = merged[merged.length - 1];
      if (toMinutes(cur.start) <= toMinutes(last.end)) {
        last.end = fromMinutes(Math.max(toMinutes(last.end), toMinutes(cur.end)));
      } else merged.push({ ...cur });
    }
  }
  return merged;
};

// Subtract blocked intervals from working window (e.g., 08:00–20:00)
const subtractBlocked = (window: Interval, blocked: Interval[]): Interval[] => {
  let free: Interval[] = [window];
  for (const b of blocked) {
    const next: Interval[] = [];
    for (const f of free) {
      const fs = toMinutes(f.start), fe = toMinutes(f.end);
      const bs = toMinutes(b.start), be = toMinutes(b.end);
      // no overlap
      if (be <= fs || bs >= fe) { next.push(f); continue; }
      // left free
      if (bs > fs) next.push({ start: f.start, end: fromMinutes(bs) });
      // right free
      if (be < fe) next.push({ start: fromMinutes(be), end: f.end });
    }
    free = next;
  }
  return free;
};

// Generate fixed-length slots (e.g., 45 min) inside free intervals
export const generateSlots = (free: Interval[], slotMinutes: number): Interval[] => {
  const slots: Interval[] = [];
  for (const f of free) {
    let s = toMinutes(f.start);
    const e = toMinutes(f.end);
    while (s + slotMinutes <= e) {
      const start = fromMinutes(s);
      const end = fromMinutes(s + slotMinutes);
      slots.push({ start, end });
      s += slotMinutes; // or add a gap if you need
    }
  }
  return slots;
};

// Main: get available slots for a given date
export const getAvailableSlotsForDate = (
  date: string,
  schedule: Block[],
  workWindow: Interval = { start: "08:00", end: "20:00" },
  slotMinutes = 45
) => {
  const dayBlocks = schedule
    .filter(b => b.date === date && (b.status === "unavailable" || b.status === "booked"))
    .map(b => ({
      start: b.date_time.start_time.slice(0, 5), // "HH:mm"
      end: b.date_time.end_time.slice(0, 5),
    }));

  const mergedBlocked = mergeIntervals(dayBlocks);
  const free = subtractBlocked(workWindow, mergedBlocked);
  return generateSlots(free, slotMinutes);
};
