import React, { useEffect, useRef, useState } from 'react';
import {
  LINKS, SPEC, MARQUEE_TECH, PROOF_STATS, CREDENTIALS,
  ENGAGEMENTS, CASE_STUDIES, OPEN_SOURCE, CLIENT_WORK, EXPERIENCE, PRINCIPLES, SKILLS,
  EDUCATION, CERTIFICATIONS, TECH_ICONS,
} from './constants';
import { ProofStat } from './types';

/* ---------- Shared primitives ---------- */

// Hard-shadow brutalist box
const Box = ({
  children,
  className = '',
  as = 'div',
  shadow = 8,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  shadow?: number;
  [key: string]: any;
}) => {
  const Component = as;
  return (
    <Component
      className={`border-4 border-black shadow-[${shadow}px_${shadow}px_0_0_#000] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

// Section label with small square, e.g. "■ PROOF, NOT ADJECTIVES"
const Kicker = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`font-mono text-xs md:text-sm font-bold tracking-widest flex items-center gap-2 ${light ? 'text-white' : 'text-black'}`}>
    <span className={`inline-block w-3 h-3 border-2 border-black ${light ? 'bg-brand-yellow' : 'bg-brand-yellow'}`}></span>
    {children}
  </p>
);

// Scroll reveal wrapper
const Reveal = ({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// Count-up number for PROOF cards
const CountUp = ({ stat }: { stat: ProofStat }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(stat.target * eased);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.target]);

  const display = stat.decimals ? value.toFixed(stat.decimals) : Math.round(value).toString();
  return (
    <span ref={ref} className="font-display text-4xl lg:text-5xl border-b-4 border-brand-yellow pb-1 inline-block">
      {stat.prefix ?? ''}{display}{stat.suffix ?? ''}
    </span>
  );
};

// Tech logo in a small white chip so dark logos stay visible on any background
const TechIcon = ({ name, size = 'w-5 h-5' }: { name: string; size?: string }) => {
  const src = TECH_ICONS[name];
  if (!src) return null;
  return (
    <span className="inline-flex items-center justify-center bg-white border-2 border-black p-0.5 shrink-0">
      <img src={src} alt="" loading="lazy" className={`${size} object-contain`} />
    </span>
  );
};

// Sui-style vertical light-bar curtain, drawn on canvas
const LightBars = ({ className = '' }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let bars: { x: number; w: number; hue: number; phase: number; speed: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      bars = [];
      let x = 0;
      while (x < canvas.width) {
        const w = 6 + Math.random() * 42;
        bars.push({
          x,
          w,
          hue: 197 + Math.random() * 14, // sky blues
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.9,
        });
        x += w;
      }
    };

    const draw = (t: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      for (const bar of bars) {
        const lum = 18 + 34 * (0.5 + 0.5 * Math.sin(bar.phase + (t / 1000) * bar.speed));
        ctx.fillStyle = `hsl(${bar.hue}, 92%, ${lum}%)`;
        ctx.fillRect(bar.x, 0, bar.w + 1, height);
      }
      // dark center vignette, like Sui's curtain
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.42, 'rgba(0,0,0,0.82)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.9)');
      grad.addColorStop(0.58, 'rgba(0,0,0,0.82)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(0);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 w-full h-full ${className}`} aria-hidden="true" />;
};

// Sui-style dotted connector between sections, with a square node that tracks scroll
const Connector = ({ light = false }: { light?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={ref} className="relative h-28 md:h-36 flex justify-center" aria-hidden="true">
      <div className={`connector-dots ${light ? 'light' : ''} w-1 h-full`}></div>
      <div
        className={`absolute w-3 h-3 border-2 border-black ${light ? 'bg-brand-yellow' : 'bg-white'}`}
        style={{ top: `calc(${(progress * 100).toFixed(1)}% - 6px)`, left: 'calc(50% - 6px)' }}
      ></div>
    </div>
  );
};

// Sui-style footer glow skyline
const GlowColumns = () => (
  <div className="flex items-end justify-between gap-2 h-24 md:h-32 px-4 md:px-8 overflow-hidden" aria-hidden="true">
    {Array.from({ length: 24 }).map((_, i) => (
      <div
        key={i}
        className="glow-col flex-1"
        style={{
          height: `${28 + ((i * 37) % 65)}%`,
          animationDelay: `${(i % 6) * 0.55}s`,
        }}
      ></div>
    ))}
  </div>
);

const ArrowCTA = ({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) => (
  <a
    href={href}
    target={href.startsWith('mailto') ? undefined : '_blank'}
    rel="noopener noreferrer"
    className={`inline-block font-mono font-bold text-sm md:text-base border-4 border-black bg-brand-yellow text-black px-6 py-3 shadow-[6px_6px_0_0_#000] hover:shadow-[10px_10px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all ${className}`}
  >
    {children}
  </a>
);

/* ---------- Sections ---------- */

const Header = () => (
  <header className="sticky top-0 z-50 bg-black text-white border-b-4 border-black">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
      <a href="#top" className="flex items-center gap-3">
        <span className="bg-brand-yellow text-black font-display text-sm px-2 py-1 border-2 border-white">OE</span>
        <span className="font-display text-xs md:text-sm tracking-wide hidden sm:inline">ODUWOLE EYINOJUOLUWA</span>
      </a>
      <nav className="flex items-center gap-4 md:gap-6 font-mono text-xs md:text-sm font-bold">
        <a href="#proof" className="hover:text-brand-yellow transition-colors hidden md:inline">PROOF</a>
        <a href="#hire" className="hover:text-brand-yellow transition-colors hidden md:inline">HIRE ME</a>
        <a href="#work" className="hover:text-brand-yellow transition-colors hidden md:inline">WORK</a>
        <a href="#oss" className="hover:text-brand-yellow transition-colors hidden md:inline">OPEN SOURCE</a>
        <a href="#experience" className="hover:text-brand-yellow transition-colors hidden md:inline">EXPERIENCE</a>
        <a
          href={LINKS.email}
          className="bg-brand-yellow text-black px-4 py-2 border-2 border-white shadow-[4px_4px_0_0_#fff] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
        >
          EMAIL ME →
        </a>
      </nav>
    </div>
  </header>
);

const Hero = () => (
  <section id="top" className="bg-brand-blue px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
    {/* Sui-style glow blooms */}
    <div className="hero-glow w-[480px] h-[480px] bg-white/70 -top-40 -left-24"></div>
    <div className="hero-glow w-[380px] h-[380px] bg-sky-300/80 top-1/3 right-0" style={{ animationDelay: '2.2s' }}></div>
    <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_420px] gap-12 items-center relative z-10">
      <div>
        <Reveal>
          <Kicker>BACKEND ENGINEER · BUILDER</Kicker>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mt-6 text-black">
            YOU NEED IT
            <br />
            BUILT.
            <br />
            <span className="bg-brand-yellow px-3 inline-block mt-2 border-4 border-black shadow-[8px_8px_0_0_#000]">
              I SHIP IT.
            </span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="font-body text-lg md:text-xl text-black max-w-xl mt-8 leading-relaxed">
            For founders and teams whose API is slow, whose system won't scale,
            or whose product still needs its backend built: I find what's
            blocking it and ship the fix — with a number to prove it worked.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <ArrowCTA href={LINKS.email}>EMAIL ME →</ArrowCTA>
            <a href="#proof" className="font-mono font-bold text-black text-sm md:text-base underline underline-offset-4 hover:bg-black hover:text-white px-2 py-1 transition-colors">
              SEE THE PROOF ↓
            </a>
          </div>
        </Reveal>
      </div>

      {/* ENGINEER SPEC table */}
      <Reveal delay={200}>
        <Box className="bg-white">
          <div className="bg-brand-yellow border-b-4 border-black px-5 py-3">
            <h2 className="font-mono font-bold text-sm tracking-widest text-black">ENGINEER SPEC</h2>
          </div>
          <dl>
            {SPEC.map((row, i) => (
              <div
                key={row.label}
                className={`flex items-center justify-between px-5 py-3.5 ${i !== SPEC.length - 1 ? 'border-b-2 border-black/20' : ''}`}
              >
                <dt className="font-mono text-xs text-gray-500 tracking-widest">{row.label}</dt>
                <dd className="font-mono font-bold text-sm text-black flex items-center gap-2">
                  {row.isStatus && <span className="status-dot inline-block w-2.5 h-2.5 bg-green-500 border border-black rounded-full"></span>}
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Box>
      </Reveal>
    </div>
  </section>
);

const Marquee = () => (
  <div className="bg-black border-y-4 border-black overflow-hidden py-4 relative">
    <div className="animate-marquee flex whitespace-nowrap w-max">
      {[...MARQUEE_TECH, ...MARQUEE_TECH].map((tech, i) => (
        <span key={i} className="font-mono font-bold text-white text-sm md:text-base mx-6 flex items-center gap-3">
          <TechIcon name={tech} />
          {tech}
          <span className="text-brand-yellow text-xs ml-9">◆</span>
        </span>
      ))}
    </div>
  </div>
);

const Proof = () => (
  <section id="proof" className="bg-brand-blue px-4 md:px-8 py-16 md:py-24">
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <Kicker>PROOF, NOT ADJECTIVES</Kicker>
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 mt-8 border-4 border-black shadow-[10px_10px_0_0_#000] bg-white">
        {PROOF_STATS.map((stat, i) => (
          <div
            key={i}
            className={`p-6 flex flex-col gap-3 ${i !== PROOF_STATS.length - 1 ? 'lg:border-r-4 border-black' : ''} ${i % 2 === 0 ? 'sm:border-r-4 lg:sm:border-r-0' : ''} border-b-4 lg:border-b-0 border-black`}
          >
            <CountUp stat={stat} />
            <p className="font-body text-sm text-black leading-snug flex-grow">{stat.text}</p>
            <p className="font-mono text-[10px] text-gray-500 tracking-widest">{stat.tags}</p>
          </div>
        ))}
      </div>
      <Reveal delay={150}>
        <p className="font-mono text-xs md:text-sm font-bold text-black tracking-widest mt-8 text-center">
          {CREDENTIALS}
        </p>
      </Reveal>
    </div>
  </section>
);

const HireMe = () => (
  <section id="hire" className="bg-white border-y-4 border-black px-4 md:px-8 py-16 md:py-24">
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <Kicker>TYPICAL ENGAGEMENTS</Kicker>
        <h2 className="font-display text-3xl md:text-5xl text-black mt-4">WHY YOU SHOULD HIRE ME.</h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-8 mt-10">
        {ENGAGEMENTS.map((eng, i) => (
          <Reveal key={eng.title} delay={i * 100}>
            <Box className="bg-white h-full flex flex-col p-6" shadow={6}>
              <h3 className="font-body font-bold text-lg text-black border-b-4 border-brand-yellow pb-3">{eng.title}</h3>
              <p className="font-body text-sm text-gray-700 mt-4 leading-relaxed">{eng.problem}</p>
              <ul className="mt-4 space-y-2 flex-grow">
                {eng.bullets.map((bullet) => (
                  <li key={bullet} className="font-body text-sm text-gray-800 flex items-start gap-2">
                    <span className="text-brand-yellow text-xs mt-1">◆</span>{bullet}
                  </li>
                ))}
              </ul>
            </Box>
          </Reveal>
        ))}
      </div>
      <Reveal delay={150}>
        <div className="text-center mt-12">
          <ArrowCTA href={LINKS.email}>EMAIL ME →</ArrowCTA>
          <p className="font-mono text-xs text-gray-500 mt-3">NO PITCH — JUST YOUR PROBLEM AND WHETHER I FIT.</p>
        </div>
      </Reveal>
    </div>
  </section>
);

const CaseStudies = () => (
  <section className="bg-black px-4 md:px-8 py-16 md:py-24 relative overflow-hidden">
    <LightBars className="opacity-60" />
    <div className="max-w-7xl mx-auto relative z-10">
      <Reveal>
        <Kicker light>SELECTED CASE STUDIES</Kicker>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        {CASE_STUDIES.map((cs) => (
          <Reveal key={cs.number}>
            <a href={cs.url} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="border-4 border-white bg-black shadow-[8px_8px_0_0_#facc15] group-hover:shadow-[12px_12px_0_0_#facc15] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all">
                <img
                  src={cs.image}
                  alt={cs.title}
                  loading="lazy"
                  className="w-full border-b-4 border-white block"
                />
                <div className="p-6">
                  <p className="font-mono text-brand-yellow text-xs tracking-widest mb-3">CASE STUDY {cs.number}</p>
                  <h3 className="font-display text-white text-xl md:text-2xl leading-tight">{cs.title}</h3>
                  <p className="font-mono text-gray-400 text-xs tracking-widest mt-3">{cs.subtitle}</p>
                  <p className="font-mono font-bold text-brand-yellow text-sm mt-5 group-hover:underline underline-offset-4">
                    READ THE CODE →
                  </p>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const OpenSource = () => (
  <section id="oss" className="bg-brand-blue px-4 md:px-8 py-16 md:py-24">
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <Kicker>THINGS I SHIP</Kicker>
        <h2 className="font-display text-3xl md:text-5xl text-black mt-4">
          OPEN SOURCE, <span className="bg-white px-2 border-4 border-black shadow-[6px_6px_0_0_#000] inline-block">IN THE WILD.</span>
        </h2>
        <p className="font-body text-black text-lg max-w-2xl mt-6">
          Not tutorial projects — tools with stars, users, and an npm install command.
          Built between jobs because the problem annoyed me enough.
        </p>
      </Reveal>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {OPEN_SOURCE.map((project, i) => (
          <Reveal key={project.name} delay={i * 100}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
              <Box className="bg-white h-full flex flex-col group-hover:shadow-[12px_12px_0_0_#000] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all">
                <img
                  src={project.image}
                  alt={project.name}
                  loading="lazy"
                  className="w-full border-b-4 border-black block"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-body font-bold text-xl text-black">{project.name}</h3>
                    <span className="font-mono text-xs bg-black text-brand-yellow px-2 py-1">★ {project.stars}</span>
                  </div>
                  <p className="font-body font-semibold text-sm text-black mt-3">{project.tagline}</p>
                  <p className="font-body text-sm text-gray-700 mt-2 leading-relaxed flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] border border-gray-400 text-gray-600 px-2 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-mono font-bold text-sm text-black mt-4 group-hover:underline underline-offset-4">VISIT →</p>
                </div>
              </Box>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Work = () => (
  <section id="work" className="bg-sky-100 px-4 md:px-8 py-16 md:py-24 border-y-4 border-black">
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <Kicker>SELECTED WORK</Kicker>
        <h2 className="font-display text-3xl md:text-5xl text-black mt-4">
          I FIND WHAT'S COSTING YOU — AND I CUT IT.
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {CLIENT_WORK.map((work, i) => (
          <Reveal key={work.name} delay={(i % 2) * 100}>
            <a href={work.url} target="_blank" rel="noopener noreferrer" className="group block h-full">
              <Box className="bg-white h-full flex flex-col p-6 group-hover:shadow-[12px_12px_0_0_#000] group-hover:-translate-x-1 group-hover:-translate-y-1 transition-all">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-body font-bold text-lg md:text-xl text-black leading-tight">{work.name}</h3>
                  <span className={`font-mono text-[10px] px-2 py-1 border-2 border-black shrink-0 ${work.roleType === 'BE' ? 'bg-black text-white' : work.roleType === 'CTO' ? 'bg-brand-yellow text-black' : 'bg-white text-black'}`}>
                    {work.roleType}
                  </span>
                </div>
                <p className="font-mono text-xs text-gray-600 tracking-wide mt-2">{work.role}</p>
                <p className="font-body text-sm text-gray-800 mt-3 leading-relaxed flex-grow">{work.description}</p>
                {work.results && (
                  <p className="font-mono text-xs text-black bg-brand-yellow/80 border-2 border-black px-3 py-2 mt-4">
                    {work.results}
                  </p>
                )}
                <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t-2 border-black/20">
                  <div className="flex flex-wrap gap-2">
                    {work.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[10px] font-bold text-gray-600">{tag}</span>
                    ))}
                  </div>
                  <span className="font-mono text-[10px] font-bold text-gray-500">{work.duration}</span>
                </div>
                <p className="font-mono font-bold text-sm text-black mt-4 group-hover:underline underline-offset-4">VISIT SITE →</p>
              </Box>
            </a>
          </Reveal>
        ))}
      </div>
      <Reveal delay={100}>
        <div className="text-center mt-10">
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-black text-sm underline underline-offset-4 hover:bg-black hover:text-white px-2 py-1 transition-colors">
            MORE WORK ON LINKEDIN →
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

const Experience = () => (
  <section id="experience" className="bg-brand-blue px-4 md:px-8 py-16 md:py-24">
    <div className="max-w-5xl mx-auto">
      <Reveal>
        <Kicker>THE PAPER TRAIL</Kicker>
        <h2 className="font-display text-3xl md:text-5xl text-black mt-4">EXPERIENCE.</h2>
      </Reveal>
      <Reveal delay={100}>
        <Box className="bg-white mt-10">
          {EXPERIENCE.map((job, i) => (
            <div
              key={i}
              className={`grid sm:grid-cols-[1fr_auto] gap-1 sm:gap-6 px-6 py-5 ${i !== EXPERIENCE.length - 1 ? 'border-b-2 border-dashed border-black/30' : ''}`}
            >
              <div>
                <h3 className="font-body font-bold text-base md:text-lg text-black">{job.title}</h3>
                <p className="font-mono text-xs text-gray-600 mt-1 tracking-wide">
                  {job.company} · {job.type}{job.location ? ` · ${job.location}` : ''}
                </p>
              </div>
              <p className="font-mono text-xs text-gray-700 sm:text-right self-center whitespace-nowrap">{job.date}</p>
            </div>
          ))}
        </Box>
      </Reveal>
      <Reveal delay={150}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <Box key={category} className="bg-white p-5" shadow={6}>
              <h3 className="font-mono font-bold text-xs tracking-widest text-black border-b-2 border-black pb-2">{category.toUpperCase()}</h3>
              <ul className="mt-3 space-y-2">
                {skills.map((skill) => (
                  <li key={skill} className="font-body text-sm text-gray-800 flex items-center gap-2">
                    <TechIcon name={skill} size="w-4 h-4" />{skill}
                  </li>
                ))}
              </ul>
            </Box>
          ))}
        </div>
      </Reveal>
      <Reveal delay={200}>
        <Box className="bg-black text-white mt-10 p-6" shadow={8}>
          <p className="font-mono font-bold text-xs tracking-widest text-brand-yellow">EDUCATION & CERTIFICATIONS</p>
          <p className="font-mono text-xs md:text-sm text-white mt-3">{EDUCATION}</p>
          <ul className="mt-3 grid md:grid-cols-2 gap-x-8 gap-y-1.5">
            {CERTIFICATIONS.map((cert) => (
              <li key={cert} className="font-body text-sm text-gray-300 flex items-start gap-2">
                <span className="text-brand-yellow text-xs mt-1">◆</span>{cert}
              </li>
            ))}
          </ul>
        </Box>
      </Reveal>
    </div>
  </section>
);

const HowIWork = () => (
  <section className="bg-black px-4 md:px-8 py-16 md:py-24">
    <div className="max-w-7xl mx-auto">
      <Reveal>
        <Kicker light>HOW I WORK</Kicker>
        <h2 className="font-display text-3xl md:text-5xl text-white mt-4">
          WHAT WORKING WITH ME <span className="bg-brand-yellow text-black px-2 inline-block">LOOKS LIKE.</span>
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 mt-12">
        {PRINCIPLES.map((principle, i) => (
          <Reveal key={principle.number} delay={(i % 2) * 100}>
            <div>
              <p className="font-display text-2xl text-brand-yellow border-b-4 border-brand-yellow inline-block pb-1">{principle.number}</p>
              <h3 className="font-display text-xl md:text-2xl text-white mt-4">{principle.title}</h3>
              <p className="font-body text-gray-300 mt-3 leading-relaxed max-w-md">{principle.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="bg-brand-blue px-4 md:px-8 py-20 md:py-32">
    <div className="max-w-5xl mx-auto">
      <Reveal>
        <Box className="bg-white p-8 md:p-14 text-center" shadow={12}>
          <Kicker>LET'S TALK</Kicker>
          <h2 className="font-display text-3xl md:text-6xl text-black mt-6 leading-tight">
            HAVE SOMETHING THAT
            <br />
            NEEDS TO <span className="bg-brand-yellow px-2 border-4 border-black inline-block">SHIP?</span>
          </h2>
          <p className="font-body text-lg text-gray-700 max-w-xl mx-auto mt-6">
            No pitch deck — just your problem and whether I'm the right person for it.
            I read everything myself.
          </p>
          <div className="mt-10">
            <ArrowCTA href={LINKS.email} className="text-lg px-10 py-4">EMAIL ME →</ArrowCTA>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 font-mono text-sm">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-gray-600 underline underline-offset-4 hover:text-black">GITHUB</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 underline underline-offset-4 hover:text-black">LINKEDIN</a>
          </div>
          <p className="font-mono text-xs text-gray-500 mt-6">{LINKS.emailText}</p>
        </Box>
      </Reveal>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-black border-t-4 border-black px-4 md:px-8 py-6">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
      <p className="font-mono text-xs text-gray-400">© 2026 ODUWOLE EYINOJUOLUWA. BUILT, NOT GENERATED.</p>
      <div className="flex items-center gap-5 font-mono text-xs font-bold">
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-yellow transition-colors">GITHUB</a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-yellow transition-colors">LINKEDIN</a>
        <a href={LINKS.email} className="text-white hover:text-brand-yellow transition-colors">EMAIL</a>
      </div>
    </div>
  </footer>
);

const App = () => (
  <div className="bg-brand-blue min-h-screen">
    <Header />
    <main>
      <Hero />
      <Marquee />
      <Proof />
      <HireMe />
      <CaseStudies />
      <div className="bg-brand-blue">
        <Connector />
      </div>
      <OpenSource />
      <Work />
      <div className="bg-brand-blue">
        <Connector />
      </div>
      <Experience />
      <HowIWork />
      <Contact />
      <div className="bg-brand-blue -mt-8">
        <GlowColumns />
      </div>
    </main>
    <Footer />
  </div>
);

export default App;
