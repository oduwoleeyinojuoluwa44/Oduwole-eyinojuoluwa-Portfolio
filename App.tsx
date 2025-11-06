import React from 'react';
import { ABOUT_CARDS, PROJECTS, EXPERTISE, CONTACT_LINKS } from './constants';
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

  const interactiveClasses = 'transition-all duration-300 ease-in-out hover:!rotate-0 hover:scale-[1.03] hover:shadow-[12px_12px_0_0_#000] z-10 hover:z-20';

  return (
    <Component
      className={`relative border-4 border-black shadow-[8px_8px_0_0_#000] ${interactiveClasses} ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
      {...props}
    >
      {children}
      {sticker && (
        <div className={`absolute w-8 h-8 border-2 border-black ${sticker.color} ${stickerPositions[sticker.position]} rotate-12`}></div>
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
  };
  return icons[name] || null;
};

const Section = ({ id, children, className = '' }: { id: string; children?: React.ReactNode; className?: string; }) => (
    <section id={id} className={`min-h-screen w-full p-4 md:p-8 lg:p-16 flex flex-col items-center justify-center relative overflow-hidden ${className}`}>
      {children}
    </section>
);

const Cloud = ({ className = '' }) => (
    <div className={`absolute w-32 h-16 bg-white border-4 border-black ${className}`}>
        <div className="absolute -top-4 left-8 w-16 h-8 bg-white border-4 border-black"></div>
    </div>
);

const Character = () => (
    <div className="absolute left-8 bottom-16 md:left-16 w-24 h-32 hidden lg:block">
        {/* Head */}
        <div className="absolute top-0 left-2 w-20 h-20 bg-green-500 border-4 border-black">
            {/* Eyes */}
            <div className="absolute top-4 left-4 w-4 h-4 bg-black"></div>
            <div className="absolute top-4 right-4 w-4 h-4 bg-black"></div>
        </div>
        {/* Hat */}
        <div className="absolute -top-6 left-0 w-12 h-6 bg-yellow-400 border-4 border-black"></div>
        <div className="absolute -top-10 left-2 w-8 h-4 bg-green-500 border-4 border-black"></div>
    </div>
);

const App = () => {
  return (
    <div className="text-black text-sm md:text-base leading-tight">
      <Section id="hero" className="bg-sky-500">
          <Cloud className="top-16 left-1/4 opacity-80" />
          <Cloud className="top-32 right-1/4" />
          <Cloud className="bottom-48 left-1/3 opacity-60" />
          <Character />
          <div className="relative z-10 text-center space-y-8">
              <PixelBox as="h1" className="bg-white p-4 md:p-6 text-2xl md:text-4xl lg:text-5xl inline-block" rotation={-2}>
                Oduwole Eyinojuoluwa
              </PixelBox>
              <PixelBox className="bg-yellow-400 p-3 md:p-4 text-lg md:text-xl max-w-xl mx-auto" rotation={1}>
                Building scalable systems & robust APIs
              </PixelBox>
          </div>
          <div className="absolute bottom-8 text-center w-full text-2xl animate-bounce">
              <span>≡</span>
          </div>
      </Section>
      
      <Section id="about" className="bg-sky-400">
        <PixelBox className="bg-orange-500 p-4 mb-8 text-white" rotation={-2} sticker={{color: 'bg-pink-400', position: 'top-right'}}>
            <h2 className="text-xl md:text-3xl">Crafting Backend Solutions</h2>
        </PixelBox>
        <PixelBox className="bg-white p-4 mb-12" rotation={1}>
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
      
      <Section id="projects" className="bg-teal-400 space-y-16">
          {PROJECTS.map((project: Project, index) => (
              <div key={index} className="max-w-5xl w-full">
                  <PixelBox as="h3" className="bg-green-700 text-white p-4 text-xl md:text-2xl z-10" rotation={-1} sticker={{color: 'bg-red-400', position: 'top-right'}}>
                      {project.name}
                  </PixelBox>
                  <PixelBox className="bg-white p-6 -mt-2" rotation={1}>
                      <p>{project.description}</p>
                  </PixelBox>
                  {project.image && 
                    <PixelBox className="relative overflow-hidden group cursor-pointer -mt-2" rotation={-1}>
                        <img src={project.image} alt={project.name} className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-75 transition-all duration-300 flex flex-col items-center justify-center p-4">
                            <div className="flex flex-wrap gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
                                {project.stack.map(tech => (
                                    <PixelBox key={tech} className="bg-gray-700 text-white p-2 text-xs">
                                        {tech}
                                    </PixelBox>
                                ))}
                            </div>
                        </div>
                    </PixelBox>
                  }
              </div>
          ))}
      </Section>
      
      <Section id="expertise" className="bg-teal-500">
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
                              <PixelBox key={skill} className="bg-white p-2 text-xs">
                                  {skill}
                              </PixelBox>
                          ))}
                      </div>
                  </PixelBox>
              ))}
          </div>
      </Section>
      
      <Section id="contact" className="bg-green-600">
        <PixelBox className="bg-pink-500 p-4 mb-8 text-white" rotation={-2} sticker={{color: 'bg-yellow-300', position: 'bottom-right'}}>
            <h2 className="text-xl md:text-3xl">Let's Build Together!</h2>
        </PixelBox>
        <PixelBox className="bg-white p-4 mb-12" rotation={1}>
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
            <PixelBox className="bg-black text-white p-2 text-xs">
                © 2025 Backend Dev Portfolio
            </PixelBox>
        </div>
      </Section>

      <div className="fixed bottom-4 right-4 z-50">
          <PixelBox className="bg-black text-white w-12 h-12 flex items-center justify-center text-2xl cursor-pointer hover:bg-gray-700">
              ?
          </PixelBox>
      </div>

    </div>
  );
};

export default App;
