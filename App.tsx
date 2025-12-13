import React, { useState, useEffect } from 'react';
import { ABOUT_CARDS, PROJECTS, EXPERTISE, CONTACT_LINKS, EXPERIENCE } from './constants';
import { Project } from './types';

// Helper component for the 8-bit style boxes
const PixelBox = ({
  children,
  className = '',
  as = 'div',
  rotation = 0,
  sticker,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  rotation?: number;
  sticker?: { color: string; position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' };
  [key: string]: any;
}) => {
  const Component = as;
  
  const stickerPositions = {
    'top-right': 'top-0 right-0 -mt-3 -mr-3',
    'top-left': 'top-0 left-0 -mt-3 -ml-3',
    'bottom-right': 'bottom-0 right-0 -mb-3 -mr-3',
    'bottom-left': 'bottom-0 left-0 -mb-3 -ml-3',
  };

  const interactiveClasses = 'transition-all duration-300 ease-in-out hover:!rotate-0 hover:scale-[1.01] hover:shadow-[12px_12px_0_0_#000] dark:hover:shadow-[12px_12px_0_0_#facc15] z-10 hover:z-20';

  return (
    <Component
      className={`relative border-4 border-black dark:border-white shadow-[8px_8px_0_0_#000] dark:shadow-[8px_8px_0_0_#facc15] ${interactiveClasses} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      {...props}
    >
      {children}
      {sticker && (
        <div className={`absolute w-8 h-8 border-2 border-black dark:border-white ${sticker.color} ${stickerPositions[sticker.position]} rotate-12`}></div>
      )}
    </Component>
  );
};

// SVG Icons
const Icon = ({ name, className = '' }) => {
  const icons = {
    system: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>
      </svg>
    ),
    data: (
       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path><path d="M5 12H3v-1a2 2 0 0 1 2-2h1"></path>
      </svg>
    ),
    performance: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
    github: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.034c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    linkedin: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    email: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
      </svg>
    ),
    moon: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    ),
    sun: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    ),
    pencil: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
      </svg>
    ),
    plus: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
      </svg>
    ),
    diamond: (
       <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M6 3h12l4 6-10 13L2 9z"></path>
       </svg>
    ),
    // Project Stack Icons
    nodejs: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7.33V16.67L12 22L22 16.67V7.33L12 2ZM10.23 15.54L7.5 13.13V10.2L10.23 7.79L12.96 9.54V13.8L10.23 15.54Z" /></svg>,
    postgresql: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1 15H9v-5H7v5H5V9h6v8zm5 0h-2v-2.26c0-1.31-.6-1.95-1.8-1.95c-.82 0-1.2.4-1.2 1.1V17h-2V9h2v1.23c.5-.89 1.42-1.23 2.3-1.23c1.93 0 3.7 1.13 3.7 3.74V17z"/></svg>,
    redis: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v10l9 5l9-5V7l-9-5zm-1.04 15.68h-2.1V9.78h2.1v7.9zM17.13 13c0 1.81-1.32 2.92-3.32 2.92c-1.89 0-3.23-1.04-3.23-2.75V9.78h2.1v3.2c0 .8.41 1.25 1.13 1.25c.78 0 1.16-.48 1.16-1.3V9.78h2.13v3.22z"/></svg>,
    kubernetes: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-3.5-9.5L12 9.29l3.5 3.21l-3.5 3.21l-3.5-3.21z"/></svg>,
    rabbitmq: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm2 14h-4v-2h4v2zm0-4h-4v-2h4v2zm-2-4c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1z"/></svg>,
    python: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9v-2h2v2zm4 4h-2v-2h2v2zm0-4h-2v-2h2v2z"/></svg>,
    apachekafka: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5l10-5V7L12 2zM8 16H6v-5h2v5zm4 0h-2v-5h2v5zm4 0h-2v-5h2v5z"/></svg>,
    mongodb: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1.5 14h-3v-2.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5V16h-2v-1.5c0-.28-.22-.5-.5-.5s-.5.22-.5.5V16zm5-4.5c-1.38 0-2.5-1.12-2.5-2.5S14.12 7 15.5 7s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>,
    docker: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.49 2.94 8.29 6.96 9.53V10H6v-3h2.96V4.5c0-2.97 1.81-4.6 4.54-4.6c1.28 0 2.38.09 2.69.14V3h-1.6c-1.44 0-1.72.68-1.72 1.68V7h3.33l-.43 3H14.8v11.53c4.02-1.24 6.96-5.04 6.96-9.53z"/></svg>,
    grafana: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5l10-5V7L12 2zm-2 14H8v-4h2v4zm4 0h-2v-7h2v7zm4 0h-2V8h2v8z"/></svg>,
    go: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 14.5c-2.49 0-4.5-2.01-4.5-4.5S7.51 7.5 10 7.5c1.18 0 2.24.46 3 1.22V6h3v7.5c0 2.49-2.01 4.5-4.5 4.5z"/></svg>,
    mysql: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 14h-2v-4H6v4H4V8h6v8zm8-2.5c0 1.38-1.12 2.5-2.5 2.5S13 14.88 13 13.5s1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5z"/></svg>,
    nginx: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-4-4v-2h4v6zm4 0V9h4v2l-4 4z"/></svg>,
    aws: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1.5 14h-3L12 5.5l4.5 10.5h-3L12 13l-1.5 3z"/></svg>,
    terraform: <svg className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7v10l10 5l10-5V7L12 2zM9 16.5V11l-4 2.5v3L9 16.5zM15 16.5l4-2.5v-3L15 11v5.5zM13.5 9.5L12 8.5l-1.5 1V7h3v2.5z"/></svg>,
  };
  return icons[name] || null;
};

const Section = ({ id, children, className = '' }: { id: string; children?: React.ReactNode; className?: string; }) => (
    <section id={id} className={`min-h-screen w-full p-4 md:p-8 lg:p-16 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${className}`}>
      {children}
    </section>
);

const Cloud = ({ className = '' }) => (
    <div className={`absolute w-32 h-16 bg-white border-4 border-black dark:bg-gray-700 dark:border-white ${className}`}>
        <div className="absolute -top-4 left-8 w-16 h-8 bg-white border-4 border-black dark:bg-gray-700 dark:border-white"></div>
    </div>
);

const Character = () => (
    <div className="absolute left-8 bottom-16 md:left-16 w-24 h-32 hidden lg:block">
        {/* Head */}
        <div className="absolute top-0 left-2 w-20 h-20 bg-green-500 border-4 border-black dark:border-white">
            {/* Eyes */}
            <div className="absolute top-4 left-4 w-4 h-4 bg-black dark:bg-white"></div>
            <div className="absolute top-4 right-4 w-4 h-4 bg-black dark:bg-white"></div>
        </div>
        {/* Hat */}
        <div className="absolute -top-6 left-0 w-12 h-6 bg-yellow-400 border-4 border-black dark:border-white"></div>
        <div className="absolute -top-10 left-2 w-8 h-4 bg-green-500 border-4 border-black dark:border-white"></div>
    </div>
);

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="text-black dark:text-white text-sm md:text-base leading-tight">
      <Section id="hero" className="bg-sky-500 dark:bg-gray-900">
          <Cloud className="top-16 left-1/4 opacity-80" />
          <Cloud className="top-32 right-1/4" />
          <Cloud className="bottom-48 left-1/3 opacity-60" />
          <Character />
          <div className="relative z-10 text-center space-y-8">
              <PixelBox as="h1" className="bg-white dark:bg-gray-800 p-4 md:p-6 text-2xl md:text-4xl lg:text-5xl inline-block" rotation={-2}>
                Oduwole Eyinojuoluwa
              </PixelBox>
              <PixelBox className="bg-yellow-400 dark:bg-yellow-500 text-black p-3 md:p-4 text-lg md:text-xl max-w-xl mx-auto" rotation={1}>
                Building scalable systems & robust APIs
              </PixelBox>
          </div>
          <div className="absolute bottom-8 text-center w-full text-2xl animate-bounce">
              <span>≡</span>
          </div>
      </Section>
      
      <Section id="about" className="bg-sky-400 dark:bg-gray-800">
        <PixelBox className="bg-orange-500 p-4 mb-8 text-white" rotation={-2} sticker={{color: 'bg-pink-400', position: 'top-right'}}>
            <h2 className="text-xl md:text-3xl">Crafting Backend Solutions</h2>
        </PixelBox>
        <PixelBox className="bg-white dark:bg-gray-700 p-4 mb-12" rotation={1}>
            <p className="text-base md:text-lg">5+ years building robust backend systems</p>
        </PixelBox>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl w-full">
            {ABOUT_CARDS.map((card, index) => (
                <PixelBox 
                  key={card.title} 
                  className={`${card.color} p-6 text-white text-center flex flex-col items-center group`}
                  rotation={index === 1 ? 1 : -2}
                  sticker={index === 2 ? { color: 'bg-purple-400', position: 'bottom-left' } : undefined}
                >
                    <Icon name={card.icon} className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6" />
                    <h3 className="text-lg md:text-xl mb-2">{card.title}</h3>
                    <p className="text-sm md:text-base">{card.text}</p>
                </PixelBox>
            ))}
        </div>
      </Section>

      <Section id="experience" className="bg-indigo-400 dark:bg-indigo-900">
        <PixelBox className="bg-white dark:bg-gray-800 p-4 md:p-8 max-w-4xl w-full" rotation={-1} sticker={{color: 'bg-yellow-400', position: 'top-right'}}>
          <div className="flex justify-between items-center mb-6 md:mb-8 border-b-4 border-black dark:border-white pb-4">
            <h2 className="text-xl md:text-3xl font-bold">Experience</h2>
            <div className="flex gap-4 opacity-50">
                <Icon name="plus" className="w-6 h-6" />
                <Icon name="pencil" className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            {EXPERIENCE.map((job, index) => (
              <div key={index} className="flex gap-4 relative">
                  {/* Timeline Line */}
                  {index !== EXPERIENCE.length - 1 && (
                      <div className="absolute left-[1.35rem] top-14 bottom-0 w-1 bg-gray-300 dark:bg-gray-600 -z-10" />
                  )}
                  
                  {/* Logo Placeholder */}
                  <div className={`w-12 h-12 flex-shrink-0 ${job.logoColor} border-2 border-black dark:border-white flex items-center justify-center text-white font-bold text-xs p-1 text-center leading-none shadow-[4px_4px_0_0_#000000] dark:shadow-[4px_4px_0_0_#ffffff]`}>
                      {job.logoText}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8 border-b-2 border-dashed border-gray-300 dark:border-gray-600 last:border-0 last:pb-0">
                      <h3 className="text-base md:text-lg font-bold">{job.title}</h3>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {job.company} · {job.type}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-2">
                        {job.date} {job.location && `· ${job.location}`}
                      </p>
                      
                      {job.description && (
                        <p className="text-sm mt-2 mb-2 leading-relaxed opacity-90">{job.description}</p>
                      )}
                      
                      {job.skills && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <Icon name="diamond" className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{job.skills.join(', ')}</span>
                        </div>
                      )}
                  </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-4 text-center border-t-4 border-black dark:border-white">
            <a href="https://www.linkedin.com/in/oduwole-eyinojuoluwa-taofeek-teo-54544b290/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:underline">
              Show all experiences on LinkedIn <span>→</span>
            </a>
          </div>
        </PixelBox>
      </Section>
      
      <Section id="projects" className="bg-teal-400 dark:bg-teal-900 space-y-16">
          {PROJECTS.map((project: Project, index) => (
              <div key={index} className="max-w-5xl w-full">
                  <PixelBox as="h3" className="bg-green-700 text-white p-4 text-xl md:text-2xl z-10" rotation={-1} sticker={{color: 'bg-red-400', position: 'top-right'}}>
                      {project.name}
                  </PixelBox>
                  <PixelBox className="bg-white dark:bg-gray-800 p-6 -mt-2" rotation={1}>
                      <p className="mb-6">{project.description}</p>
                      <div className="border-t-4 border-black dark:border-white border-dashed my-4"></div>
                      <div className="flex flex-wrap gap-3">
                          {project.stack.map(tech => (
                              <div key={tech} className="bg-gray-100 dark:bg-gray-700 border-2 border-black dark:border-gray-500 p-2 flex items-center gap-2 transition-transform hover:scale-110 hover:-rotate-3">
                                  <Icon name={tech.toLowerCase().replace(/\s/g, '').replace('.', '')} className="w-5 h-5" />
                                  <span className="text-xs font-semibold">{tech}</span>
                              </div>
                          ))}
                      </div>
                  </PixelBox>
              </div>
          ))}
            <a href="https://github.com/oduwoleeyinojuoluwa44?tab=repositories" target="_blank" rel="noopener noreferrer" className="block">
                <PixelBox className="bg-gray-800 dark:bg-sky-500 text-white dark:text-black p-4 text-center text-lg" rotation={-1}>
                    <div className="flex items-center justify-center gap-4">
                        <Icon name="github" className="w-8 h-8" />
                        <span>See More Projects</span>
                    </div>
                </PixelBox>
            </a>
      </Section>
      
      <Section id="expertise" className="bg-teal-500 dark:bg-teal-800">
          <PixelBox className="bg-sky-500 p-4 mb-12 text-white" rotation={2} sticker={{color: 'bg-pink-400', position: 'top-left'}}>
              <h2 className="text-xl md:text-3xl">Technical Expertise</h2>
          </PixelBox>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12 max-w-6xl w-full">
              {Object.entries(EXPERTISE).map(([category, data], index) => (
                  <PixelBox 
                    key={category} 
                    className={`${data.color} p-6`}
                    rotation={index % 2 === 0 ? 1 : -2}
                    sticker={index === 1 ? {color: 'bg-yellow-300', position: 'top-right'} : {color: 'bg-orange-400', position: 'bottom-left'}}
                  >
                      <h3 className="text-white text-lg md:text-xl mb-4">{category}</h3>
                      <div className="flex flex-wrap gap-2">
                          {data.skills.map(skill => (
                              <PixelBox key={skill} className="bg-white dark:bg-gray-300 text-black p-2 text-xs">
                                  {skill}
                              </PixelBox>
                          ))}
                      </div>
                  </PixelBox>
              ))}
          </div>
      </Section>
      
      <Section id="contact" className="bg-green-600 dark:bg-green-900">
        <PixelBox className="bg-pink-500 p-4 mb-8 text-white" rotation={-2} sticker={{color: 'bg-yellow-300', position: 'bottom-right'}}>
            <h2 className="text-xl md:text-3xl">Let's Build Together!</h2>
        </PixelBox>
        <PixelBox className="bg-white dark:bg-gray-700 p-4 mb-12" rotation={1}>
            <p className="text-base md:text-lg">Always interested in new projects & opportunities</p>
        </PixelBox>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl w-full">
            {CONTACT_LINKS.map((link, index) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="group block">
                  <PixelBox 
                    className={`${link.color} p-6 text-white text-center flex flex-col items-center h-full justify-center`}
                    rotation={index === 1 ? 2 : -1}
                    sticker={index === 0 ? { color: 'bg-yellow-300', position: 'bottom-left' } : undefined}
                  >
                      <Icon name={link.icon} className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-125" />
                      <h3 className="text-lg md:text-xl">{link.name}</h3>
                      {link.text && <p className="text-xs break-all">{link.text}</p>}
                  </PixelBox>
                </a>
            ))}
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <PixelBox className="bg-black dark:bg-white dark:text-black text-white p-2 text-xs">
                © 2025 Oduwole Eyinojuoluwa
            </PixelBox>
        </div>
      </Section>

      <div className="fixed bottom-4 right-4 z-50">
          <PixelBox 
            className="bg-black text-white w-12 h-12 flex items-center justify-center text-2xl cursor-pointer hover:bg-gray-700 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-300"
            onClick={toggleDarkMode}
            rotation={0}
          >
              {isDarkMode ? <Icon name="sun" className="w-6 h-6" /> : <Icon name="moon" className="w-6 h-6" />}
          </PixelBox>
      </div>

    </div>
  );
};

export default App;