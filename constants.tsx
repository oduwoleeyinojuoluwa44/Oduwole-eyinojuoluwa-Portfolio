import {
  SpecRow,
  ProofStat,
  OpenSourceProject,
  CaseStudy,
  ClientWork,
  ExperienceItem,
  Principle,
} from './types';

const GH = 'https://github.com/oduwoleeyinojuoluwa44';
const OG = 'https://opengraph.githubassets.com/1/oduwoleeyinojuoluwa44';

export const LINKS = {
  github: `${GH}?tab=repositories`,
  linkedin: 'https://www.linkedin.com/in/oduwole-eyinojuoluwa-taofeek-teo-54544b290/',
  email: 'mailto:oduwoleeyinojoluwa44@gmail.com',
  emailText: 'oduwoleeyinojoluwa44@gmail.com',
};

export const SPEC: SpecRow[] = [
  { label: 'BASED', value: 'Lagos, NG' },
  { label: 'MODE', value: 'Remote · Intl' },
  { label: 'ENGAGE', value: 'Full-time / Contract' },
  { label: 'STACK', value: 'React · Node · Python' },
  { label: 'STATUS', value: 'Available', isStatus: true },
];

export const MARQUEE_TECH = [
  'REACT', 'NEXT.JS', 'NODE.JS', 'TYPESCRIPT', 'NESTJS', 'EXPRESS', 'PYTHON', 'GO',
  'POSTGRESQL', 'MONGODB', 'REDIS', 'KAFKA', 'RABBITMQ',
  'DOCKER', 'KUBERNETES', 'AWS', 'TERRAFORM',
];

// devicon CDN filenames, keyed by the display names used across the site
const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
export const TECH_ICONS: Record<string, string> = {
  REACT: `${DEVICON}/react/react-original.svg`,
  React: `${DEVICON}/react/react-original.svg`,
  'NEXT.JS': `${DEVICON}/nextjs/nextjs-original.svg`,
  'NODE.JS': `${DEVICON}/nodejs/nodejs-original.svg`,
  'Node.js': `${DEVICON}/nodejs/nodejs-original.svg`,
  TYPESCRIPT: `${DEVICON}/typescript/typescript-original.svg`,
  TypeScript: `${DEVICON}/typescript/typescript-original.svg`,
  JavaScript: `${DEVICON}/javascript/javascript-original.svg`,
  NESTJS: `${DEVICON}/nestjs/nestjs-original.svg`,
  NestJS: `${DEVICON}/nestjs/nestjs-original.svg`,
  EXPRESS: `${DEVICON}/express/express-original.svg`,
  'Express.js': `${DEVICON}/express/express-original.svg`,
  PYTHON: `${DEVICON}/python/python-original.svg`,
  Python: `${DEVICON}/python/python-original.svg`,
  GO: `${DEVICON}/go/go-original.svg`,
  POSTGRESQL: `${DEVICON}/postgresql/postgresql-original.svg`,
  PostgreSQL: `${DEVICON}/postgresql/postgresql-original.svg`,
  MONGODB: `${DEVICON}/mongodb/mongodb-original.svg`,
  MongoDB: `${DEVICON}/mongodb/mongodb-original.svg`,
  REDIS: `${DEVICON}/redis/redis-original.svg`,
  Redis: `${DEVICON}/redis/redis-original.svg`,
  KAFKA: `${DEVICON}/apachekafka/apachekafka-original.svg`,
  Kafka: `${DEVICON}/apachekafka/apachekafka-original.svg`,
  RABBITMQ: `${DEVICON}/rabbitmq/rabbitmq-original.svg`,
  RabbitMQ: `${DEVICON}/rabbitmq/rabbitmq-original.svg`,
  DOCKER: `${DEVICON}/docker/docker-original.svg`,
  Docker: `${DEVICON}/docker/docker-original.svg`,
  KUBERNETES: `${DEVICON}/kubernetes/kubernetes-original.svg`,
  Kubernetes: `${DEVICON}/kubernetes/kubernetes-original.svg`,
  AWS: `${DEVICON}/amazonwebservices/amazonwebservices-plain-wordmark.svg`,
  TERRAFORM: `${DEVICON}/terraform/terraform-original.svg`,
  FastAPI: `${DEVICON}/fastapi/fastapi-original.svg`,
  Flask: `${DEVICON}/flask/flask-original.svg`,
  'Next.js': `${DEVICON}/nextjs/nextjs-original.svg`,
  MySQL: `${DEVICON}/mysql/mysql-original.svg`,
  Firebase: `${DEVICON}/firebase/firebase-original.svg`,
  Supabase: `${DEVICON}/supabase/supabase-original.svg`,
  Nginx: `${DEVICON}/nginx/nginx-original.svg`,
};

export const PROOF_STATS: ProofStat[] = [
  {
    target: 10, suffix: 'K+',
    text: 'Concurrent users on microservices infrastructure I architected.',
    tags: 'MICROSERVICES · K8S',
  },
  {
    target: 78, prefix: '−', suffix: '%',
    text: 'API response times after the Redis caching layer I built.',
    tags: 'REDIS · CACHING',
  },
  {
    target: 99.95, suffix: '%', decimals: 2,
    text: 'Production uptime with Kubernetes auto-scaling.',
    tags: 'K8S · AUTO-SCALING',
  },
  {
    target: 50, suffix: 'K+',
    text: 'Daily shipments through a distributed job queue. PCI DSS compliant.',
    tags: 'QUEUES · LOGISTICS',
  },
  {
    target: 65, prefix: '−', suffix: '%',
    text: 'Database load after killing N+1 queries during code audits.',
    tags: 'POSTGRES · AUDITS',
  },
];

export const CREDENTIALS = 'AWS CERTIFIED · ISO 27001 LI · HNG13 FINALIST · TOP 10 / 5,000+ (ENYATA) · OPEN SOURCE MAINTAINER';

export const ENGAGEMENTS = [
  {
    title: 'RESCUE & RESCALE',
    problem: 'Your API is slow, or your system keeps falling over.',
    bullets: ['Architecture & query audit', 'Bottleneck identification', 'Fixes shipped to production'],
  },
  {
    title: 'MVP, END-TO-END',
    problem: 'You have a product idea and need it built right the first time — UI to database.',
    bullets: ['Frontend, auth, payments, queues', 'Zero to production', 'Documented & handed over'],
  },
  {
    title: 'EMBEDDED ENGINEER',
    problem: 'You need a full stack engineer who owns outcomes, not tickets.',
    bullets: ['Full-time or contract', 'Remote, async-first', 'Team-lead experience'],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    number: '01',
    title: 'A PRODUCTION JOB SCHEDULER, FROM HEAP TO DASHBOARD',
    subtitle: 'DAG WORKFLOWS · DLQ · LIVE SSE DASHBOARD',
    url: `${GH}/dilamme-job-scheduler`,
    image: `${OG}/dilamme-job-scheduler`,
  },
  {
    number: '02',
    title: 'THE LOG FILE IS THE DATABASE',
    subtitle: 'APPEND-ONLY EVENT STORE · CRASH RECOVERY',
    url: `${GH}/append-only-event-store`,
    image: `${OG}/append-only-event-store`,
  },
];

export const OPEN_SOURCE: OpenSourceProject[] = [
  {
    name: 'FUZZRUN',
    stars: 9,
    tagline: 'Typos, fixed before you notice.',
    description:
      'A CLI that auto-corrects mistyped commands and re-runs them instantly — no prompt when the fix is high-confidence. Published on npm as fuzzrunx, with bash, zsh, and PowerShell hooks.',
    tags: ['CLI', 'NPM', 'DX'],
    url: `${GH}/FuzzRun`,
    image: `${OG}/FuzzRun`,
  },
  {
    name: 'CLUELESS',
    stars: 8,
    tagline: 'The AI overlay that costs $0, not $12.',
    description:
      'Always-on-top Electron overlay with screen-share protection and a built-in AI assistant panel. One OpenRouter key works with any model — GPT, Claude, Gemini, Llama.',
    tags: ['ELECTRON', 'AI', 'DESKTOP'],
    url: `${GH}/Clueless-`,
    image: `${OG}/Clueless-`,
  },
  {
    name: 'CODEROAST',
    stars: 8,
    tagline: 'Code reviews with receipts.',
    description:
      'Agent-based pipeline for evidence-bound code roasts: deterministic analysis first, tightly constrained narration second. No hallucinated feedback — every roast has proof.',
    tags: ['AGENTS', 'AI', 'CODE REVIEW'],
    url: `${GH}/CodeRoast`,
    image: `${OG}/CodeRoast`,
  },
];

export const CLIENT_WORK: ClientWork[] = [
  {
    name: 'DEEN AI',
    role: 'On-Call Backend Engineer',
    roleType: 'BE',
    description:
      'Architected microservices infrastructure handling 10K+ concurrent users. Built the Redis caching layer and real-time WebSocket streaming. Deployed on Kubernetes with auto-scaling.',
    results: '10K+ concurrent users · −78% response times · 99.95% uptime',
    tags: ['Microservices', 'Redis', 'WebSockets', 'K8s'],
    duration: '2+ years',
    url: 'https://deenai.app/',
  },
  {
    name: 'US EXPRESS DROP',
    role: 'Backend Developer',
    roleType: 'BE',
    description:
      'Built PCI DSS-compliant payment processing, a geolocation API, and a distributed job queue for a logistics platform with real-time package tracking.',
    results: '50K+ daily shipments · <200ms tracking latency · −40% support tickets',
    tags: ['Payments', 'Geolocation', 'Queues'],
    duration: '1.5+ years',
    url: 'https://www.usexpressdrop.com/',
  },
  {
    name: 'MANIFESTI',
    role: 'Backend Developer (Code Audits)',
    roleType: 'BE',
    description:
      'Comprehensive code audits on an enterprise content platform: fixed N+1 query problems, refactored the authentication system, standardized error handling across 50+ endpoints.',
    results: '−65% database load · security hardening · 50+ endpoints cleaned',
    tags: ['Audits', 'Security', 'Performance'],
    duration: '1+ year',
    url: 'https://manifesti.app/',
  },
  {
    name: 'LAWYERS FOR VISAS',
    role: 'CTO',
    roleType: 'CTO',
    description:
      'Leading the technical direction of a visa immigration consulting platform — architecture design, team leadership, and full-stack optimization.',
    tags: ['Architecture', 'Leadership'],
    duration: 'Current',
    url: 'https://www.lawyersforvisas.com',
  },
  {
    name: 'MOMENTO LIVING',
    role: 'Head of Development (Age 19)',
    roleType: 'FE',
    description:
      'Led the full development team of a premium property and lifestyle management platform. Built scalable infrastructure and managed 5+ developers.',
    tags: ['Team Lead', 'Infrastructure'],
    duration: '1.5+ years',
    url: 'https://www.momentoliving.com/',
  },
  {
    name: 'VERTA PROPERTY GROUP',
    role: 'Full Stack Developer',
    roleType: 'FE',
    description:
      'Real estate solutions with integrated property management systems — responsive design, performance optimization, UX enhancement.',
    tags: ['Full Stack', 'Performance'],
    duration: '1+ year',
    url: 'https://vertapropertygroup.co.uk/',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  { title: 'On-Call Backend Engineer', company: 'Deen AI', type: 'WIF auth · microservices · uptime', date: '2025 — Present', location: 'Remote' },
  { title: 'Backend Team Lead (Finalist)', company: 'HNG13', type: 'Led Deen AI microservices · wallet system · mentoring', date: '2025', location: 'Remote' },
  { title: 'Back End Developer', company: 'XPRESSCORE', type: 'Full-time', date: 'Oct 2025 — Present' },
  { title: 'Cyber Security Analyst', company: 'KPMG', type: '95% readiness · 20+ risks mitigated · ISO 22301 DR plan', date: 'Mar 2024 — Nov 2024', location: 'Lagos' },
  { title: 'Software Developer', company: 'CodeAlpha', type: 'Network sniffer · log-analysis automation', date: 'Mar 2024 — May 2024', location: 'Remote' },
  { title: 'Backend Web Developer (Client Project)', company: 'KPMG', type: '15+ KYC APIs · +30% processing speed · 1K+ weekly users', date: 'Mar 2023 — Nov 2023', location: 'Lagos' },
  { title: 'Backend Developer', company: 'HNG Bootcamp', type: 'REST APIs · Node.js · MySQL', date: 'Aug 2023 — Nov 2023', location: 'Remote' },
];

export const EDUCATION = 'B.SC. COMPUTER SCIENCE — CRESCENT UNIVERSITY · SECOND CLASS UPPER';

export const CERTIFICATIONS = [
  'ISO 27001 Lead Implementer — Mastermind Assurance (2025)',
  'AWS Cloud Practitioner — AWS (2024)',
  'Fundamentals of Cybersecurity — ISC2 (2024)',
  'Python for Data Science — Coursera (2023)',
  'HNG Backend Developer (2023 & 2025)',
];

export const PRINCIPLES: Principle[] = [
  {
    number: '01',
    title: 'I OWN THE OUTCOME',
    text: "Give me the problem, not a ticket. I map the path, flag risks early, and ship — you don't chase me for updates.",
  },
  {
    number: '02',
    title: 'REMOTE, ASYNC, RELIABLE',
    text: 'Remote-first, async-first, with overlap for the calls that matter. Decisions in writing, so nobody waits on me to move.',
  },
  {
    number: '03',
    title: 'PROOF OVER PROMISES',
    text: "Every claim on this page has a number behind it. That's also how I report progress — metrics, not vibes.",
  },
  {
    number: '04',
    title: 'BUILT TO NOT WAKE YOU UP',
    text: 'Idempotent jobs, retries, dead-letter queues, audit trails. Systems that fail loudly in dev and recover quietly in prod.',
  },
];

export const SKILLS: Record<string, string[]> = {
  Languages: ['TypeScript', 'JavaScript', 'Node.js', 'Python'],
  Frameworks: ['React', 'Next.js', 'Express.js', 'NestJS', 'FastAPI', 'Flask'],
  'Databases & BaaS': ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'Firebase', 'Supabase'],
  Infrastructure: ['Docker', 'Kubernetes', 'AWS', 'Nginx', 'RabbitMQ', 'Kafka'],
};
