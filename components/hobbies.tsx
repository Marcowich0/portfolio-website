import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useHobbies } from "@/store/hobbies";
import { stat } from "fs";

const FramePositions = [
    {
        top: "60%",
        left: "0%",
        width: "30%",
        height: "40%"
    },
    {
        top: "66%",
        left: "80%",
        width: "18%",
        height: "26%"
    },
    {
        top: "64%",
        left: "28%",
        width: "26%",
        height: "28%"
    },
    {
        top: "10%",
        left: "72%",
        width: "28%",
        height: "60%"
    },
    {
        top: "60%",
        left: "52%",
        width: "30%",
        height: "36%"
    },
    {
        top: "2%",
        left: "53%",
        width: "26%",
        height: "36%"
    },
    {
        top: "0%",
        left: "6%",
        width: "30%",
        height: "30%"
    },
    {
        top: "26%",
        left: "8%",
        width: "26%",
        height: "44%"
    },
    {
        top: "6%",
        left: "34%",
        width: "22%",
        height: "20%"
    },
    {
        top: "22%",
        left: "32%",
        width: "44%",
        height: "44%"
    }
];

export default function HobbyFrames() {
    const [selectedHobby, setSelectedHobby] = React.useState<{
        id: number;
        headline: string;
        content: string;
        thumbnail: string;
    } | null>(null);
    const [selectedHobbyPosition, setSelectedHobbyPosition] = React.useState<{ x: number; y: number, width: number, height: number } | null>(null);

    const hobbyInformation = useHobbies((state) => state.hobbies);

    return (
        <div className="w-full h-full relative">
            <AnimatePresence>
                {hobbyInformation.map((hobby, index) => (
                    <motion.div
                        key={index}
                        className="absolute border-4 border-zinc-300 rounded-xl overflow-hidden cursor-pointer transform transition-transform duration-300  flex justify-center items-center group"
                        style={FramePositions[index]}
                        onClick={() => {
                            setSelectedHobby(hobby)
                            setSelectedHobbyPosition({
                                x: parseFloat(FramePositions[index].left),
                                y: parseFloat(FramePositions[index].top),
                                width: parseFloat(FramePositions[index].width),
                                height: parseFloat(FramePositions[index].height)
                            })
                        }}
                    >
                        <Image src={`/hobbies/${hobby.thumbnail}`} alt="hobby" fill style={{ objectFit: "cover" }} />
                        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                            <h1 className="relative text-2xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                {hobby.headline}
                            </h1>
                        </div>
                        <AnimatePresence>
                            {selectedHobby && (
                                <motion.div
                                    className="w-full h-full bg-black absolute"
                                    initial={{ opacity: "0%" }}
                                    animate={{ opacity: "35%" }}
                                    exit={{ opacity: "0%" }}
                                    transition={{ duration: 0.3 }}>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </motion.div>
                ))}

                {selectedHobby && selectedHobbyPosition && (
                    <div>
                        <motion.div
                            className="rounded-2xl overflow-hidden border-4 border-zinc-300 z-[70] absolute"
                            initial={{
                                top: `${selectedHobbyPosition.y}%`,
                                left: `${selectedHobbyPosition.x}%`,
                                width: `${selectedHobbyPosition.width}%`,
                                height: `${selectedHobbyPosition.height}%`
                            }}
                            animate={{
                                top: "50%",
                                left: "50%",
                                width: window.innerWidth > 2400 ? "850px" : "600px",
                                height: window.innerHeight > 1300 ? "450px" : "300px",
                                transform: "translate(-50%, -50%)",
                            }}
                            exit={{
                                top: `${selectedHobbyPosition.y}%`,
                                left: `${selectedHobbyPosition.x}%`,
                                width: `${selectedHobbyPosition.width}%`,
                                height: `${selectedHobbyPosition.height}%`,
                                transform: "translate(0, 0)",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image src={`/hobbies/${selectedHobby.thumbnail}`} alt="hobby" fill style={{ objectFit: "cover"}} />
                            <motion.div
                                className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-70 text-white w-full"
                                initial={{ opacity:0, transform: "translateY(100%)" }}
                                animate={{ opacity:1, transform: "translateY(0)" }}
                                exit={{ opacity:0, transform: "translateY(100%)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <h2 className="text-2xl font-bold">{selectedHobby.headline}</h2>
                                <p className="mt-2">{selectedHobby.content}</p>
                            </motion.div>
                        </motion.div>
                        <div
                            className="absolute w-screen h-screen bg-black opacity-0 z-[80]"
                            onClick={() => setSelectedHobby(null)}
                            style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
                        />
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
}

