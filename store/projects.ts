import { create } from 'zustand';
import { DateTime } from 'luxon';

// Define the state interface
interface project {
  key: number,
  title: string,
  monthYear: string,
  imagePath: string,
  image: string[],
  description: string[],
  fullImagePath: string[], 
}

export const useProjects = create<{
  projects: project[]
  setProjects: (projects: project[]) => void
}>((set, get) => ({
  projects: [],
  setProjects: (loadedData) => {
    const updatedData = loadedData.map(proj => ({
      ...proj,
      fullImagePath: proj.image.map(img => `${proj.imagePath}${img}`), // Concatenate imagePath and image
    }));
    set({ 
      projects: updatedData,
    });
  },
}));

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
const dataUrl = new URL('/data/projects.json', baseUrl).toString();

fetch(dataUrl)
  .then(res => res.json())
  .then((data: project[]) => {
    useProjects.getState().setProjects(data);
    console.log(useProjects.getState().projects);
  });

