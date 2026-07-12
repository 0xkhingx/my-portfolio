export interface SkillItem {
  category: 'programming' | 'tools' | 'skills'
  name: string
  icon: string
}

export const skills: SkillItem[] = [
  { category: 'programming', name: 'React.js', icon: 'react' },
  { category: 'programming', name: 'Python', icon: 'python' },
  { category: 'programming', name: 'Node.js', icon: 'nodedotjs' },
  { category: 'programming', name: 'JavaScript (ES6+)', icon: 'javascript' },
  { category: 'programming', name: 'Flask', icon: 'flask' },
  { category: 'programming', name: 'FastAPI', icon: 'fastapi' },
  { category: 'programming', name: 'Next.js', icon: 'nextdotjs' },
  { category: 'programming', name: 'TypeScript', icon: 'typescript' },
  { category: 'programming', name: 'Supabase', icon: 'supabase' },
  { category: 'programming', name: 'HTML5', icon: 'html5' },
  { category: 'programming', name: 'CSS3', icon: 'css3' },
  { category: 'tools', name: 'PostgreSQL', icon: 'postgresql' },
  { category: 'tools', name: 'SQLite', icon: 'sqlite' },
  { category: 'tools', name: 'Bootstrap', icon: 'bootstrap' },
  { category: 'tools', name: 'Tailwind CSS', icon: 'tailwindcss' },
  { category: 'tools', name: 'Git', icon: 'git' },
  { category: 'skills', name: 'Full-Stack Development', icon: 'layers' },
  { category: 'skills', name: 'ML Integration', icon: 'brain' },
  { category: 'skills', name: 'Responsive Design', icon: 'monitor-smartphone' },
  { category: 'skills', name: 'STEM Education', icon: 'book-open' },
  { category: 'skills', name: 'Agile Workflows', icon: 'git-branch' },
  { category: 'skills', name: 'System Design', icon: 'layout' },
  { category: 'skills', name: 'NLP', icon: 'message-square' },
  { category: 'skills', name: 'Computer Vision', icon: 'eye' },
]
