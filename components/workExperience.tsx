"use client";
import React from 'react';

import { DateTime } from 'luxon';

import { useWorkExperience } from '@/store/workExperience';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { cubicBezier } from "framer-motion"

import { v4 as uuidv4 } from 'uuid';

const now = DateTime.now();

const yearSpacing = 2;
const monthSpacing = 2;
const totalDuration = 4;

interface WorkExperienceProps {
    animate: boolean;
}

export default function WorkExperience({ animate }: WorkExperienceProps) {

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [hoveredPosition, setHoveredPosition] = useState<DOMRect | null>(null);
    const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);

    const experienceData = useWorkExperience((state) => state.experience);

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

    return (
        <div
            className="w-full h-auto p-16  border-[6px] rounded-2xl border-zinc-300 overflow-visible"
            onMouseLeave={() => {
                setHoveredIndex(null);
            }}>
            <div className='w-full h-full flex flex-row overflow-visible'>
                <div className="relative w-full h-auto pb-16 overflow-visible">
                    {verticalYearLines.map((line) => (
                        <div key={uuidv4()} className="absolute bottom-0 top-0 w-[5px] flex justify-center" style={{ left: `${line.position}%` }}>
                            <h1 className="text-4xl text-black">{line.year}</h1>
                            <div className="absolute bottom-0 top-14 w-full bg-black flex justify-center"></div>
                        </div>
                    ))}
                    {verticalMonthLines.map((line) => (
                        <div key={uuidv4()} className="absolute bottom-0 top-14 w-[1px] bg-black opacity-40" style={{ left: `${line}%` }}></div>
                    ))}

                    <AnimatePresence mode="popLayout">
                        {hoveredIndex !== null && hoveredIndex !== undefined && (
                            <div className='w-full h-full absolute' key={hoveredIndex}>
                                <motion.div
                                    className='w-[650px] h-[300px] z-[9999] fixed flex justify-between p-4 rounded-2xl border-2 border-zinc-500 bg-zinc-50'
                                    style={{
                                        left: `${hoveredPosition ? hoveredPosition.left + hoveredPosition.width / 2 : 0}px`,
                                        top: `${hoveredPosition ? hoveredPosition.top - 332 : 0}px`
                                    }}
                                    initial={{ opacity: 0, scale: 0, x: '-50%', y: "160px" }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0, x: '-50%', y: "160px" }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className='w-2/3 pe-8'>
                                        <h1 className="text-black font-bold text-xl">{experienceData[hoveredIndex - 1].name}</h1>
                                        <h2 className="text-m bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-cyan-400 font-bold">{experienceData[hoveredIndex - 1].position}</h2>
                                        <ul className="list-disc pl-6 mt-4">
                                            {experienceData[hoveredIndex - 1].description.map((desc, index) => (
                                                <li key={uuidv4()} className='text-sm text-black'>{desc}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className='flex flex-col items-end w-1/3'>
                                        <h1 className="text-teal-800 font-bold text-[15px] opacity-80">{DateTime.fromISO(experienceData[hoveredIndex - 1].time[0]).toFormat('dd/MM/yyyy')}  {"->"}  {experienceData[hoveredIndex - 1].time[1] === "present" ? "Present" : DateTime.fromISO(experienceData[hoveredIndex - 1].time[1]).toFormat('dd/MM/yyyy')}</h1>
                                        <h1 className="text-teal-800 text-m opacity-80">{experienceData[hoveredIndex - 1].location}</h1>
                                        <div className='flex justify-end h-[75%] w-full my-4 bg-white p-4 rounded-lg border-2 border-zinc-200'>
                                            <div className='relative w-full h-full'>
                                                <Image src={`/experienceLogos/${experienceData[hoveredIndex - 1].image}`} alt="big logo" fill style={{ objectFit: "contain" }} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    <div className='absolute top-14 w-full flex flex-col space-y-6 mt-3 overflow-visible'>
                        {experienceData.map((exp, index) => (
                            <div className='relative' style={{ left: `${dateToPosition(exp.time[0])}%`, width: `${dateToPosition(exp.time[1]) - dateToPosition(exp.time[0])}%` }}
                                key={uuidv4()}>
                                <div
                                    key={uuidv4()}
                                    ref={(el) => { (experienceRefs.current[index] = el) }}
                                    className="relative h-12 rounded-full bg-zinc-400 border-2 border-zinc-400 overflow-hidden"
                                >

                                </div>
                            </div>

                        ))}
                    </div>
                    

                    <motion.div className="relative top-14 w-full h-auto flex flex-col space-y-6 mt-3 overflow-visible"
                        initial={{ clipPath: 'inset(0 100% 0 0)' }}
                        animate={(isInView && animate) ? { clipPath: 'inset(0 0 0 0)' } : {}}
                        transition={{ duration: totalDuration, ease: "linear" }}
                        ref={ref}
                    >
                        {experienceData.map((exp, index) => (

                            <div className='relative' style={{ left: `${dateToPosition(exp.time[0])}%`, width: `${dateToPosition(exp.time[1]) - dateToPosition(exp.time[0])}%` }}
                                key={uuidv4()}>
                                <div
                                    key={uuidv4()}
                                    ref={(el) => { (experienceRefs.current[index] = el) }}
                                    onMouseEnter={() => {
                                        if (hoveredIndex !== exp.id) {
                                            setHoveredIndex(exp.id);
                                        }
                                        if (experienceRefs.current[index] && hoveredIndex !== exp.id) {
                                            const position = experienceRefs.current[index].getBoundingClientRect();
                                            setHoveredPosition(position);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredIndex(null);
                                    }}

                                    className="relative h-12 rounded-full flex flex-row items-center ps-1 bg-gradient-to-r from-teal-400 to-cyan-400 border-2 border-zinc-400 overflow-hidden"
                                >

                                    <div className='bg-white w-16 h-10 rounded-full overflow-hidden flex-shrink-0 flex justify-center items-center'>
                                        <div className='relative w-full h-full'>
                                            <Image src={`/experienceLogos/${exp.image}`} alt="big logo" fill style={{ objectFit: "contain" }} />
                                        </div>
                                    </div>

                                    <div className="overflow-hidden text-ellipsis whitespace-nowrap w-full">
                                        <h1 className="text-zinc-100 font-bold ps-2">{exp.name}</h1>
                                    </div>
                                </div>
                            </div>

                        ))}

                    </motion.div>

                    

                    

                    <motion.div className="absolute bottom-0 top-14 w-1"
                        initial={{ left: "0px", transform: "translateX(-50%)" }}
                        animate={(isInView && animate) ? { left: "100%" } : {}}
                        transition={{ duration: totalDuration, ease: "linear" }}>
                        <motion.div className="w-full h-full bg-black"
                            initial={{ opacity: 100 }}
                            animate={{ opacity: 0 }}
                            transition={{ duration: 1, delay: totalDuration, ease: "linear" }} />
                    </motion.div>


                </div>
            </div>
        </div>
    );
}




