import React from 'react';
import { MapPin, Mail, BrandGithub, BrandLinkedin, Books } from 'tabler-icons-react';


interface iconItem {
    icon: React.ReactNode,
    text: string,
    href?: string,
}
const iconsize = 48;
const iconContainerSize = 64;

const iconItems: iconItem[] = [
    { icon: <MapPin size={iconsize} />, text: 'Copenhagen, Denmark', href: 'https://maps.app.goo.gl/Sy4UewkYC8GePGfPA' },
    { icon: <Mail size={iconsize} />, text: 'Marc.clausen00@gmail.com', href: 'mailto:Marc.clausen00@gmail.com' },
    { icon: <BrandGithub size={iconsize} />, text: 'Github.com/Marcowich0', href: 'https://github.com/Marcowich0' },
    { icon: <BrandLinkedin size={iconsize} />, text: 'Linkedin.com/in/marc-clausen/', href: 'https://www.linkedin.com/in/marc-clausen/' },
    { icon: <Books size={iconsize} />, text: 'Goodreads.com/user/show/156322902-marc', href: 'https://www.goodreads.com/user/show/156322902-marc' }
]

export default function ContactMe() {
    return (
        <div className="w-full h-full flex flex-row relative">
            <div className='w-2/3 h-full space-y-4'>
                {iconItems.map((item, index) => (
                    <div key={index} className='flex flex-row items-center space-x-8'>
                        <div className='bg-zinc-700 flex justify-center items-center rounded-xl' style={{ height: iconContainerSize, width: iconContainerSize }}>
                            {item.icon}
                        </div>
                        {item.href ? (
                            <a href={item.href} className="text-black text-2xl font-bold transition duration-200 hover:text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                {item.text}
                            </a>
                        ) : (
                            <h1 className="text-black text-2xl font-bold">{item.text}</h1>
                        )}
                    </div>
                ))}

            </div>
            <div className='w-1/3 h-full'>
                <img src="/DSE 2022.jpg" alt="contact me" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <div className='flex justify-center items-center absolute bottom-0'>
                <a href="/Marc_Clausen_Resume.pdf" download className="w-[400px] h-24  flex justify-center items-center bg-zinc-700 text-white text-4xl font-bold rounded-2xl transition duration-200 hover:bg-teal-600">
                    Download Resume
                </a>
            </div>
        </div>
    );
}