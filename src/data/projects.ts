import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "adept",
    title: "Adept",
    description:
      "Minimal typing speed test with live WPM tracking, multiple modes, local leaderboards, customizable themes, and mechanical keyboard sound packs.",
    tags: ["Vanilla JS", "HTML5", "CSS3", "IndexedDB"],
    image: "/projects/adept.png",
    liveUrl: "https://adeptype.netlify.app/",
    repoUrl: "https://github.com/0xkhingx/typing-challenge",
  },
  {
    id: "yggdrasil",
    title: "Yggdrasil",
    description:
      "Gamified AI learning platform where knowledge grows as a living tree — master topics, unlock branches, earn streaks, and revisit content before it decays.",
    tags: ["React", "Express", "Supabase", "DeepSeek"],
    image: "/projects/yggdrasil.png",
    liveUrl: "https://yggdrasil-two.vercel.app",
    repoUrl: "https://github.com/0xkhingx/yggdrasil",
  },
  {
    id: "dusk-runner",
    title: "Dusk Runner",
    description:
      "2D platformer built with p5.js — run, jump, collect coins, avoid enemies, and reach the flag across a hand-crafted level with coyote time and jump buffering.",
    tags: ["p5.js", "Canvas", "Game Development"],
    image: "/projects/dusk-runner.png",
    liveUrl: "https://dusk-runner.netlify.app",
  },
  {
    id: "vigil",
    title: "Vigil",
    description:
      "AI-custodied trader bonds on Solana — stakers watch validator performance and got slashed if they miss. Stake. Watch. Slash.",
    tags: ["Solidity", "TypeScript", "React", "Python"],
    image: "/projects/vigil.png",
    liveUrl: "https://vigil.0xkhingx.workers.dev",
    repoUrl: "https://github.com/0xkhingx/vigil",
  },
];
