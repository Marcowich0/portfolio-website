"use client";
import React from 'react';

import { DateTime } from 'luxon';

import { useWorkExperience } from '@/store/workExperience';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import {
    useTransform,
    useMotionValue,
    useSpring,
} from "framer-motion";

const now = DateTime.now();
const present = now.toFormat('yyyy-MM-dd');

const yearSpacing = 2;
const monthSpacing = 2;
const totalDuration = 4;

export default function WorkExperience() {

    /*
    const [selected, setSelected] = useState<Card | null>(null);
    const [lastSelected, setLastSelected] = useState<Card | null>(null);

    const handleClick = (card: Card) => {
        setLastSelected(selected);
        setSelected(card);
      };
    
      const handleOutsideClick = () => {
        setLastSelected(selected);
        setSelected(null);
      };
    */

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const x = useMotionValue(0); // going to set this value on mouse move
    const springConfig = { stiffness: 100, damping: 50 };
    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig
    );
    // translate the tooltip
    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig
    );

    const experienceData = useWorkExperience((state) => state.experience);
    console.log(experienceData);

    function calculateMonthDifference(startDate: string, endDate: string): number {
        const start = DateTime.fromISO(startDate);
        const end = DateTime.fromISO(endDate);

        const diffInMonths = end.diff(start, 'months').months;
        const roundedMonths = Math.round(diffInMonths);

        return roundedMonths;
    }

    const earliestDate = useWorkExperience((state) => state.earliestDate);
    const timeSinceEarliest = useWorkExperience((state) => state.timeSinceEarliest);
    const monthsToYearEnd = useWorkExperience((state) => state.monthsToYearEnd);
    const verticalYearLines = [];

    for (let i = 0; i < Math.ceil(timeSinceEarliest / 12 / yearSpacing); i++) {
        verticalYearLines.push({
            position: monthsToYearEnd / timeSinceEarliest * 100 + i * (12 * yearSpacing) / timeSinceEarliest * 100,
            year: DateTime.fromISO(earliestDate).year + i * yearSpacing + 1
        }
        );
    }

    const verticalMonthLines = [];
    for (let i = 0; i < timeSinceEarliest / monthSpacing; i++) {
        verticalMonthLines.push(
            i * monthSpacing / timeSinceEarliest * 100,
        );
    }
    verticalMonthLines.push(100);

    const dateToPosition = (date: any): number => {
        if (date === 'present') {
            date = now
        }
        const diff = calculateMonthDifference(earliestDate, date);
        return diff / timeSinceEarliest * 100;
    }

    console.log(verticalYearLines);
    return (
        <div className='w-full h-full flex flex-row overflow-visible'>
            <div className="relative w-full h-auto overflow-visible">
            {verticalYearLines.map((line) => (
                    <div key={line.year} className="absolute bottom-0 top-0 w-[5px] flex justify-center" style={{ left: `${line.position}%` }}>
                        <h1 className="text-4xl text-black">{line.year}</h1>
                        <div className="absolute bottom-0 top-14 w-full bg-black flex justify-center"></div>
                    </div>
                ))}
                {verticalMonthLines.map((line) => (
                    <div key={line} className="absolute bottom-0 top-14 w-[1px] bg-black opacity-40" style={{ left: `${line}%` }}></div>
                ))}

                <div className="absolute top-14 w-full h-auto flex flex-col space-y-6 mt-3 overflow-visible"
                //initial={{ clipPath: 'inset(0 100% 0 0)' }}
                //whileInView={{
                //    clipPath: 'inset(0 0 0 0)',
                //    transition: { duration: totalDuration,  ease: "linear" }
                //}}
                >
                    {experienceData.map((exp) => (

                        <div className='relative' style={{ left: `${dateToPosition(exp.time[0])}%`, width: `${dateToPosition(exp.time[1]) - dateToPosition(exp.time[0])}%` }}>
                            <div
                                onMouseEnter={() => {
                                    setHoveredIndex(exp.id);
                                }}
                                onMouseLeave={() => {
                                    setHoveredIndex(null);
                                }}

                                className="relative h-12 rounded-full flex flex-row items-center ps-1 bg-gradient-to-r from-emerald-400 to-cyan-400 border-2 border-zinc-400 overflow-hidden"
                                key={exp.id}
                                
                            >

                                <div className='bg-white w-16 rounded-full overflow-hidden flex-shrink-0 flex justify-center items-center'>
                                    <img src={`/experienceLogos/${exp.image}`} className="h-10 " />
                                </div>

                                <div className="overflow-hidden text-ellipsis whitespace-nowrap w-full">
                                    <h1 className="text-zinc-100 font-bold ps-2">{exp.name}</h1>
                                </div>
                            </div>
                            <AnimatePresence mode="popLayout">
                                {hoveredIndex === exp.id && (
                                    <motion.div
                                        className='w-[650px] h-[300px] z-[9999] absolute flex justify-between p-4 rounded-2xl border-2 border-zinc-500 bg-zinc-100'
                                        style={{ left: '50%', top: "-320px" }}
                                        initial={{ opacity: 0, scale: 0, x: '-50%', y: "160px" }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0, x: '-50%', y: "160px" }}
                                        transition={{ duration: 0.3, ease: 'easeOut' }}
                                    >
                                        <div className='w-2/3 pe-8'>
                                            <h1 className="text-black font-bold text-xl">{exp.name}</h1>
                                            <h2 className="text-m bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 font-bold">{exp.position}</h2>
                                            <ul className="list-disc pl-6 mt-4">
                                                {exp.description.map((desc) => (
                                                    <li key={desc} className='text-sm text-black'>{desc}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className='flex flex-col items-end w-1/3'>
                                            <h1 className="text-black font-bold text-[15px] opacity-50">{exp.time[0]}  {"->"}  {exp.time[1]}</h1>
                                            <h1 className="text-black text-m opacity-50">{exp.location}</h1>
                                            <div className='flex justify-end h-[75%] w-full my-4 bg-white p-8 rounded-lg border-2 border-zinc-200'>
                                                <img src={`/experienceLogos/${exp.image}`} className="w-full h-full object-contain" />
                                            </div>

                                        </div>


                                    </motion.div>
                                )}

                            </AnimatePresence>

                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
}




