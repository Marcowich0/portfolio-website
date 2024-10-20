"use client";
import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';

interface Skill {
    id: number;
    name: string;
    designation: string;
    image: string;
}

function skillBar(skillLevel: number, animate: boolean) {
    let color = '';
    const widthPercent = skillLevel * 10;
    const skillDuration = 1.5 * skillLevel / 10;
    if (skillLevel < 0 || skillLevel > 10) {
        throw new Error("Skill level must be between 0 and 10");
    } else if (skillLevel < 2) {
        color = `bg-orange-400`;
    } else if (skillLevel < 4) {
        color = `bg-yellow-400`;
    } else if (skillLevel < 6) {
        color = `bg-lime-400`;
    } else if (skillLevel < 8) {
        color = `bg-green-400`;
    } else if (skillLevel < 10) {
        color = `bg-teal-400`;
    } else {
        color = `bg-cyan-400`;
    }

    return (
        <div className="w-full h-4 rounded-full overflow-hidden border-2 border-zinc-200">
            <motion.div
                className={`${color} h-full rounded-full`}
                style={{ width: `${widthPercent}%` }}
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                animate={animate ? { clipPath: 'inset(0 0 0 0)' } : {}}
                transition={{ duration: skillDuration, ease: "linear" }}
            />
        </div>
    );
}

function skillLevelName(skillLevel: number) {
    if (skillLevel < 2) {
        return "Novice";
    } else if (skillLevel < 4) {
        return "Apprentice";
    } else if (skillLevel < 6) {
        return "Proficient";
    } else if (skillLevel < 8) {
        return "Skilled";
    } else if (skillLevel < 10) {
        return "Mastery";
    } else {
        return "Expert";
    }
}

export default function SkillCategory() {
    const [animate, setAnimate] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    if (isInView && !animate) {
        setAnimate(true);
    }

    return (
        <div className='h-full columns-2xs 2k:columns-sm' ref={ref}>
            {skillArray.map((skills, index) => (
                <div className="border-[6px] border-zinc-300 rounded-2xl mb-4" key={uuidv4()} style={{ breakInside: "avoid" }}>
                    <h1 className="text-3xl font-bold text-black text-center my-6">{skillNames[index]}</h1>
                    {skills.map((skill) => (
                        <div key={skill.id} className="h-12 m-4 rounded-lg flex flex-row">
                            <div className='flex justify-center items-center w-14 h-12 rounded-lg overflow-hidden border-2 border-zinc-200 bg-white'>
                                <div className='relative w-full h-full'>
                                    <Image src={`/SkillLogos/${skill.image}`} alt={skill.name} fill style={{ objectFit: 'contain' }} />
                                </div>
                            </div>
                            <div className='w-full h-full flex flex-col justify-between ps-2'>
                                <div className='w-full flex flex-row justify-between'>
                                    <h1 className="text-black font-bold text-md">{skill.name}</h1>
                                    <h1 className="text-black font-bold">{skillLevelName(skill.level)}</h1>
                                </div>
                                {skillBar(skill.level, isInView)}

                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}



const programming = [
    {
        id: 1,
        name: "Python",
        level: 9,
        image: "python.png",
    },
    {
        id: 2,
        name: "Java",
        level: 5,
        image: "java.png",
    },
    {
        id: 3,
        name: "C++",
        level: 3,
        image: "cpp.svg",
    },
    {
        id: 4,
        name: "JavaScript",
        level: 5,
        image: "javascript.png",
    },
    {
        id: 5,
        name: "TypeScript",
        level: 5,
        image: "Typescript.svg.png",
    },
    {
        id: 6,
        name: "Matlab",
        level: 5,
        image: "matlab.png",
    },
    {
        id: 7,
        name: "Maple",
        level: 7,
        image: "maple.png",
    },
    {
        id: 8,
        name: "SQL",
        level: 6,
        image: "sql.jpg",
    },
    {
        id: 9,
        name: "postgresql",
        level: 7,
        image: "postgres.png",
    },
    {
        id: 10,
        name: "Git",
        level: 4,
        image: "git.webp",
    },
];


const development = [
    {
        id: 1,
        name: "HTML",
        level: 6,
        image: "html.svg",
    },
    {
        id: 2,
        name: "CSS",
        level: 6,
        image: "css.svg",
    },
    {
        id: 3,
        name: "Tailwind",
        level: 7,
        image: "tailwind.png",
    },
    {
        id: 4,
        name: "Next.js",
        level: 4,
        image: "nextjs.webp",
    },
    {
        id: 5,
        name: "React.js",
        level: 7,
        image: "react.png",
    },
    {
        id: 6,
        name: "Power BI",
        level: 3,
        image: "powerbi.jpg",
    },
    {
        id: 7,
        name: "Databricks",
        level: 3,
        image: "databricks.png",
    },
    {
        id: 8,
        name: "Palantir",
        level: 7,
        image: "palantir.png",
    },
];

const general = [
    {
        id: 1,
        name: "Word",
        level: 8,
        image: "word.svg",
    },
    {
        id: 2,
        name: "Excel",
        level: 8,
        image: "excel.svg",
    },
    {
        id: 3,
        name: "PowerPoint",
        level: 6,
        image: "powerpoint.svg",
    },
    {
        id: 4,
        name: "Photoshop",
        level: 6,
        image: "photoshop.png",
    },
    {
        id: 5,
        name: "Premiere Pro",
        level: 2,
        image: "premier.png",
    },
];

const CAD = [
    {
        id: 1,
        name: "Solidworks",
        level: 9,
        image: "solidworks.png",
    },
    {
        id: 2,
        name: "Autodesk Inventor",
        level: 5,
        image: "inventor.png",
    },
    {
        id: 3,
        name: "Creo",
        level: 2,
        image: "creo.svg",
    },
    {
        id: 4,
        name: "OpenSCAD",
        level: 5,
        image: "openscad.png",
    },
    {
        id: 5,
        name: "StarCCM+",
        level: 7,
        image: "starccm.png",
    },
    {
        id: 6,
        name: "Ansys",
        level: 5,
        image: "ansys.png",
    },
    {
        id: 7,
        name: "Cura",
        level: 8,
        image: "cura.png",
    },
    {
        id: 8,
        name: "Bambu lab",
        level: 8,
        image: "bambulab.webp",
    },
    {
        id: 9,
        name: "Prusa slicer",
        level: 5,
        image: "prusa.png",
    },
    {
        id: 10,
        name: "Orca slicer",
        level: 4,
        image: "orca.png",
    },
    {
        id: 11,
        name: "Autodesk Netfabb",
        level: 7,
        image: "netfabb.jpg",
    },
];

const skillArray = [programming, development, general, CAD];
const skillNames = ["Programming", "Development", "General", "CAD / FEA / CFD"];