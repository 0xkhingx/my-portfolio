import type { WorkExperience, Polaroid } from "@/types";

export const workExperience: WorkExperience[] = [
  {
    id: "exp-1",
    role: "Freelance Frontend Developer & Python Engineer",
    company: "Self-Employed",
    period: "2020 — Present",
    summary: "Designed and deployed responsive web applications and intelligent backend systems for clients across multiple industries.",
    highlights: [
      "Built responsive web apps using React, HTML5, CSS3 & JavaScript for multi-industry clients.",
      "Developed backend services & automation in Python (Flask, FastAPI, Django).",
      "Integrated ML models into production — NLP and computer vision applications.",
      "Delivered projects via Agile workflows with international clients, on time and within scope.",
    ],
  },
  {
    id: "exp-2",
    role: "Machine Learning Fellow",
    company: "Electric Sheep Africa",
    period: "2025 — 2026",
    summary: "Intensive machine learning program covering supervised learning, neural networks, and model deployment — bringing AI skills into the full-stack toolkit.",
    highlights: [],
  },
  {
    id: "exp-3",
    role: "Bioinformatics & ML Researcher",
    company: "Obafemi Awolowo University",
    period: "2025 — Present",
    summary: "Interdisciplinary research at the intersection of biochemistry and machine learning — protein structure prediction and drug discovery pipelines.",
    highlights: [],
  },
];

/**
 * The polaroid arc in the About section. Five reads best — enough for an arc,
 * few enough that each one keeps its character.
 */
export const polaroids: Polaroid[] = [
  {
    id: "p1",
    image: "/me-1.jpg",
    caption: "me",
    story: "\"I am not what happened to me, I am what I choose to become.\" — Carl Jung",
  },
  {
    id: "p2",
    image: "/me-2.jpg",
    caption: "me again",
    story: "\"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.\" — Ralph Waldo Emerson",
  },
  {
    id: "p3",
    image: "/tiredatwork.png",
    caption: "at the desk",
    story: "Tired doesn't mean done.",
  },
  {
    id: "p4",
    image: "/me-3.jpg",
    caption: "still me",
    story: "\"The only person you are destined to become is the person you decide to be.\" — Ralph Waldo Emerson",
  },
  {
    id: "p5",
    image: "/me-4.jpg",
    caption: "more me",
    story: "\"What lies behind us and what lies before us are tiny matters compared to what lies within us.\" — Ralph Waldo Emerson",
  },
];
