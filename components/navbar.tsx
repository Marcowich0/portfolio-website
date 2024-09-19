import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconHome,
  IconBriefcase,
  IconHammer,
  IconTerminal2,
  IconChess
} from "@tabler/icons-react";

const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#home",
    },

    {
      title: "Work Experience",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#experience",
    },
    {
      title: "Projects",
      icon: (
        <IconHammer className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#projects",
    },
    {
      title: "Skills",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#skills",
    },

    {
      title: "Hobies",
      icon: (
        <IconChess className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#hobies",
    },

    
  ];


export default function Navbar() {
    return (
        <div className="flex items-center justify-center z-50" style={{ position: 'fixed', bottom: '40px' , left: '50%', transform: 'translateX(-50%)' }}>
        <FloatingDock
          items={links}
        />
      </div>
    )
}