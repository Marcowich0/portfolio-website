import { create } from 'zustand';
import { DateTime } from 'luxon';

// Define the state interface
interface WorkExperience {
  id: number,
  name: string,
  position: string,
  location: string,
  time: string[],
  image: string,
  description: string[]
}

export const useWorkExperience = create<{
  experience: WorkExperience[]
  earliestDate: string
  timeSinceEarliest: number
  monthsToYearEnd: number
  setExperience: (experience: WorkExperience[]) => void
}>((set, get) => ({
  experience: [],
  earliestDate: '',
  timeSinceEarliest: 0,
  monthsToYearEnd: 0,
  setExperience: (loadedData) => {
    const earliestDate = findOldestDate(loadedData.map(exp => exp.time[0]));
    if (earliestDate) {
      const timeSinceEarliest = parseInt(calculateMonthDifference(earliestDate, DateTime.now().toISODate()!).toString(), 10);
      const monthsToYearEnd = parseInt(calculateMonthDifference(earliestDate, `${DateTime.fromISO(earliestDate).year}-12-31`).toString(), 10);
      set({ 
        experience: loadedData, 
        earliestDate,
        timeSinceEarliest,
        monthsToYearEnd
      });
    }
  },
}));


const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const dataUrl = new URL('/data/workExperience.json', baseUrl).toString();

fetch(dataUrl)
  .then(res => res.json())
  .then((data: WorkExperience[]) => {
    useWorkExperience.getState().setExperience(data);
  });


function findOldestDate(dates: string[]): string | undefined {
  const dateTimeObjects = dates.map(dateString => DateTime.fromISO(dateString));
  const oldestDateTime = dateTimeObjects.reduce((oldest, current) => (oldest < current ? oldest : current), dateTimeObjects[0]);
  return oldestDateTime?.toFormat('yyyy-MM-dd'); // Format only if a valid date is found
}

function calculateMonthDifference(startDate: string, endDate: string): number {
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  const diffInMonths = end.diff(start, 'months').months;
  const roundedMonths = Math.round(diffInMonths);

  return roundedMonths;
}