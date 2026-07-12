import type { ComponentType, SVGProps } from "react";

/** Every icon in src/icons follows this signature — a plain SVG React component. */
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string; // path under /public
  liveUrl?: string;
  repoUrl?: string;
}

export interface Polaroid {
  id: string;
  image: string;
  caption: string;
  /** Longer text shown in the modal */
  story: string;
}

export interface Skill {
  name: string;
  icon: IconComponent;
}

export interface SkillCategory {
  id: string;
  label: string;
  blurb: string;
  skills: Skill[];
}

export interface WorkExperience {
  id: string;
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
}
