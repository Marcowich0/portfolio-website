import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBriefcase,
  IconHammer,
  IconTerminal2,
  IconChess,
  IconSchool
} from "@tabler/icons-react";

const iconClassname = "h-full w-full text-neutral-500 dark:text-neutral-300";
const links = [

    {
      title: "Work Experience",
      icon: (
        <IconBriefcase className={iconClassname} />
      ),
      href: "#experience",
    },
    {
      title: "Education",
      icon: (
        <IconSchool className={iconClassname} />
      ),
      href: "#education",
    },
    {
      title: "Projects",
      icon: (
        <IconHammer className={iconClassname} />
      ),
      href: "#projects",
    },
    {
      title: "Skills",
      icon: (
        <IconTerminal2 className={iconClassname} />
      ),
      href: "#skills",
    },

    {
      title: "Hobies",
      icon: (
        <IconChess className={iconClassname} />
      ),
      href: "#hobies",
    }
    
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