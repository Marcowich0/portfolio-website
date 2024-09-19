"use client";
import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', duration: 1.25, delay: 0 } },
};

interface Skill {
    id: number;
    name: string;
    designation: string;
    image: string;
}

const renderSkills = (skills: Skill[]) => {

    // Calculate total width based on image dimensions (adjust as needed)
    const width = skills.length * (128 + 16);
    const totalWidth = (width + 16) * 3;
    const duration = width / 20;

    return (
        <motion.div
            className="overflow-hidden h-full"
            initial={{ x: 0 }}
            animate={{ x: [0, -width] }}
            transition={{
                duration: duration, // Slow down on hover
                ease: 'linear',
                repeat: Infinity,
            }}
        >
            <div
                className={`flex flex-row items-center h-full ps-2`}
                style={{ width: `${totalWidth}px` }}
            >
                {Array.from({ length: 6 }).map((_, i) =>
                    skills.map((skill) => (
                        <motion.div
                            key={`${skill.id}-${i}`}
                            className="h-32 w-32 flex-shrink-0 m-2 bg-white p-4 rounded-lg relative"
                        >
                            <img
                                src={skill.image}
                                alt={`Skill ${skill.id}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                <span className="text-white text-md font-bold">{skill.name}</span>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default function SkillCategory() {
    return (

        <div className='w-full'>
            <div className="w-full h-40 bg-teal-100 rounded-3xl flex mt-8">
                <div className='w-[520px] flex justify-center items-center'>
                    <div className='flex justify-center items-center bg-zinc-100 p-4 rounded-lg '>
                        <h1 className="text-4xl font-bold text-black">Programming</h1>
                    </div>

                </div>
                <div className='bg-gradient-to-b from-pink-100 to-purple-100 w-full h-full rounded-3xl overflow-hidden'>
                    <div className='w-[3000px] h-full'>
                        {renderSkills(programming)}
                    </div>
                </div>
            </div>
            <div className="w-full h-40 bg-teal-100 rounded-3xl flex mt-8">
                <div className='bg-gradient-to-b from-purple-100 to-indigo-100 w-full h-full rounded-3xl overflow-hidden'>
                    <div className='w-[3000px] h-full'>
                        {renderSkills(development)}
                    </div>
                </div>
                <div className='w-[520px] flex justify-center items-center'>
                    <div className='flex justify-center items-center bg-zinc-100 p-4 rounded-lg '>
                        <h1 className="text-4xl font-bold text-black">Development</h1>
                    </div>
                </div>
            </div>

            <div className="w-full h-40 bg-teal-100 rounded-3xl flex mt-8">
                <div className='w-[520px] flex justify-center items-center'>
                    <div className='flex justify-center items-center bg-zinc-100 p-4 rounded-lg '>
                        <h1 className="text-4xl font-bold text-black">CAD/FEA/CFD</h1>
                    </div>
                </div>
                <div className='bg-gradient-to-b from-indigo-100 to-sky-100 w-full h-full rounded-3xl overflow-hidden'>
                    <div className='w-[3000px] h-full'>
                        {renderSkills(CAD)}
                    </div>
                </div>
            </div>

            <div className="w-full h-40 bg-teal-100 rounded-3xl flex mt-8">
                <div className='bg-gradient-to-b from-sky-100 to-teal-100 w-full h-full rounded-3xl overflow-hidden'>
                    <div className='w-[3000px] h-full'>
                        {renderSkills(general)}
                    </div>
                </div>
                <div className='w-[520px] flex justify-center items-center'>
                    <div className='flex justify-center items-center bg-zinc-100 p-4 rounded-lg '>
                        <h1 className="text-4xl font-bold text-black">General</h1>
                    </div>
                </div>
            </div>
        </div>

    );
}



const programming = [
    {
        id: 1,
        name: "Python",
        designation: "",
        image:
            "../SkillLogos/python.png",
    },
    {
        id: 2,
        name: "Java",
        designation: "",
        image:
            "../SkillLogos/java.png",
    },
    {
        id: 3,
        name: "C++",
        designation: "",
        image:
            "../SkillLogos/cpp.png",
    },
    {
        id: 4,
        name: "JavaScript",
        designation: "",
        image:
            "../SkillLogos/javascript.png",
    },
    {
        id: 5,
        name: "TypeScript",
        designation: "",
        image:
            "../SkillLogos/typescipt.webp",
    },
    {
        id: 6,
        name: "Matlab",
        designation: "",
        image:
            "../SkillLogos/matlab.png",
    },
    {
        id: 7,
        name: "Maple",
        designation: "",
        image:
            "../SkillLogos/maple.png",
    },
    {
        id: 8,
        name: "SQL",
        designation: "",
        image:
            "../SkillLogos/sql.jpg",
    },
    {
        id: 9,
        name: "postgresql",
        designation: "",
        image:
            "../SkillLogos/postgres.png",
    },
    {
        id: 10,
        name: "Git",
        designation: "",
        image:
            "../SkillLogos/git.webp",
    },
];


const development = [
    {
        id: 1,
        name: "HTML",
        designation: "",
        image:
            "../SkillLogos/html.jpg",
    },
    {
        id: 2,
        name: "CSS",
        designation: "",
        image:
            "../SkillLogos/css.jpg",
    },
    {
        id: 3,
        name: "Tailwind",
        designation: "",
        image:
            "../SkillLogos/tailwind.png",
    },
    {
        id: 4,
        name: "Next.js",
        designation: "",
        image:
            "../SkillLogos/nextjs.webp",
    },
    {
        id: 5,
        name: "React.js",
        designation: "",
        image:
            "../SkillLogos/react.png",
    },
    {
        id: 6,
        name: "Power BI",
        designation: "",
        image:
            "../SkillLogos/powerbi.jpg",
    },
    {
        id: 7,
        name: "Databricks",
        designation: "",
        image:
            "../SkillLogos/databricks.png",
    },
    {
        id: 8,
        name: "Palantir",
        designation: "",
        image:
            "../SkillLogos/palantir.png",
    },
];



const general = [
    {
        id: 1,
        name: "Word",
        designation: "",
        image:
            "../SkillLogos/word.png",
    },
    {
        id: 2,
        name: "Excel",
        designation: "",
        image:
            "../SkillLogos/excel.png",
    },
    {
        id: 3,
        name: "PowerPoint",
        designation: "",
        image:
            "../SkillLogos/powerpoint.jpg",
    },
    {
        id: 4,
        name: "Photoshop",
        designation: "",
        image:
            "../SkillLogos/photoshop.png",
    },
    {
        id: 5,
        name: "Premiere Pro",
        designation: "",
        image:
            "../SkillLogos/premier.png",
    },
];

const CAD = [
    {
        id: 1,
        name: "Solidworks",
        designation: "",
        image:
            "../SkillLogos/solidworks.png",
    },
    {
        id: 2,
        name: "Autodesk Inventor",
        designation: "",
        image:
            "../SkillLogos/inventor.png",
    },
    {
        id: 3,
        name: "Creo",
        designation: "",
        image:
            "../SkillLogos/creo.svg",
    },
    {
        id: 4,
        name: "OpenSCAD",
        designation: "",
        image:
            "../SkillLogos/openscad.png",
    },
    {
        id: 5,
        name: "StarCCM+",
        designation: "",
        image:
            "../SkillLogos/starccm.png",
    },
    {
        id: 6,
        name: "Ansys",
        designation: "",
        image:
            "../SkillLogos/ansys.png",
    },
    {
        id: 7,
        name: "Cura",
        designation: "",
        image:
            "../SkillLogos/cura.png",
    },
    {
        id: 8,
        name: "Bambu lab",
        designation: "",
        image:
            "../SkillLogos/bambulab.webp",
    },
    {
        id: 9,
        name: "Prusa slicer",
        designation: "",
        image:
            "../SkillLogos/prusa.png",
    },
    {
        id: 10,
        name: "Orca slicer",
        designation: "",
        image:
            "../SkillLogos/orca.png",
    },
    {
        id: 11,
        name: "Autodesk Netfabb",
        designation: "",
        image:
            "../SkillLogos/netfabb.jpg",
    },
];

