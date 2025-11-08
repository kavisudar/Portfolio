"use client";
import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Code, Database, Globe, Cpu, Layers, Network, Server, Terminal, Coffee, Utensils, Moon, Sun } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  repoUrl?: string;
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number;
  category: string;
}



const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});

 const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

useEffect(() => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = savedTheme ? savedTheme === "dark" : prefersDark;
    setIsDarkMode(theme);
  }
}, []);
  const [showThankYou, setShowThankYou] = useState(false);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const projects: Project[] = [
    {
      id: 1,
      title: "Console-Based Banking Application",
      description: "A secure console application that handles user registration, login, and banking operations using Java and SQL with password security through hashing and salting.",
      image: "/api/placeholder/400/250",
      technologies: ["Java", "SQL", "Hashing + Salt"],
      repoUrl: "https://github.com/kavisudar/Bank"
    },
    {
      id: 2,
      title: "Chatting Application",
      description: "A web-based chat system built using JSP that allows real-time messaging between users.",
      image: "/api/placeholder/400/250",
      technologies: ["JSP", "Java"],
      repoUrl: "https://github.com/kavisudar/ChatApp"
    },
    {
      id: 3,
      title: "Table Booking and Food Ordering System",
      description: "A responsive frontend web app for restaurant table booking and food ordering, designed with React for dynamic UI updates.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "HTML", "CSS", "JavaScript"],
      repoUrl: "https://github.com/kavisudar/SmartDine"
    }
  ];

  const skills: Skill[] = [
    { name: "Java", icon: <Coffee className="w-6 h-6" />, level: 90, category: "backend" },
    { name: "HTML", icon: <Code className="w-6 h-6" />, level: 95, category: "frontend" },
    { name: "CSS", icon: <Layers className="w-6 h-6" />, level: 90, category: "frontend" },
    { name: "JavaScript", icon: <Globe className="w-6 h-6" />, level: 85, category: "frontend" },
    { name: "React", icon: <Cpu className="w-6 h-6" />, level: 80, category: "frontend" },
    { name: "Networking", icon: <Network className="w-6 h-6" />, level: 50, category: "infrastructure" },
    { name: "SQL", icon: <Database className="w-6 h-6" />, level: 60, category: "backend" },
    { name: "Linux", icon: <Terminal className="w-6 h-6" />, level: 50, category: "infrastructure" }
  ];

  const navigation = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowThankYou(true);
  };

  const openGoogleForm = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSf9Q9L8lVzQ2YqL9Q8xQ7lHqYlQ8xQ7lHqYlQ8xQ7lHqYlQ8/viewform', '_blank');
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-black/30 backdrop-blur-md shadow-lg z-50 border-b border-gray-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Kavisudar</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 ${
                    activeSection === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center space-x-4 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-700" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-2 border-t border-gray-200 dark:border-white/10">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-white/5 ${
                    activeSection === item.id ? 'text-blue-600 dark:text-blue-400 bg-gray-100 dark:bg-white/5' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>
      {/* Home Section */}
      <section 
        id="home" 
        className={`min-h-screen flex items-center justify-center px-4 pt-16 transition-all duration-1000 ${
          isVisible['home'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Kavisudar M ,                              A Full Stack Developer</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            A passionate software developer who loves building both frontend applications and backend systems, 
            with a keen interest in full-stack development and secure, scalable applications.
          </p>
          <button 
            onClick={() => scrollToSection('projects')}
            className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View My Projects
          </button>
        </div>
      </section>
      {/* About Section */}
      <section
        id="about"
        className={`py-20 px-4 transition-all duration-1000 ${
          isVisible['about'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          fontSize: "16px",
          fontWeight: "400",
          color: "rgb(255, 255, 255)",
          textAlign: "start",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderRadius: "0px",
          marginTop: "0px",
          marginRight: "0px",
          marginBottom: "0px",
          marginLeft: "0px",
          paddingTop: "90px",
          paddingRight: "16px",
          paddingBottom: "80px",
          paddingLeft: "16px"
        }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
              style={{
                fontWeight: "bold"
              }}>I’m a passionate software developer who loves solving problems and building practical applications. With skills in Java, JavaScript, React, SQL, and Linux, I enjoy creating efficient, user-focused solutions that make a real difference.</p>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section 
        id="projects" 
        className={`py-20 px-4 bg-gray-50 dark:bg-black/20 transition-all duration-1000 ${
          isVisible['projects'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className="bg-white dark:bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border border-gray-200 dark:border-white/20"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="h-40 bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-500/20 dark:to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                  {project.title.includes("Banking") && <Database className="w-16 h-16 text-blue-600 dark:text-blue-400" />}
                  {project.title.includes("Chatting") && <Terminal className="w-16 h-16 text-green-600 dark:text-green-400" />}
                  {project.title.includes("Table Booking") && <Utensils className="w-16 h-16 text-orange-600 dark:text-orange-400" />}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-red-600 dark:bg-linear-to-r dark:from-blue-500/20 dark:to-purple-500/20 text-blue-700 dark:text-blue-300 text-base font-bold rounded-full border border-blue-400 dark:border-blue-400/30">
                      
                      {tech}
                    </span>
                  ))}
                </div>
                {project.repoUrl && (
                  <a 
                    href={project.repoUrl}
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm transition-colors"
                  >
                    View Code →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Skills Section */}
      <section 
        id="skills" 
        className={`py-20 px-4 transition-all duration-1000 ${
          isVisible['skills'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-white/20 transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-white/20"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-linear-to-r dark:from-blue-500/20 dark:to-purple-500/20 rounded-lg text-blue-600 dark:text-blue-400 mr-4">
                    {skill.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{skill.category}</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-linear-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: isVisible['skills'] ? `${skill.level}%` : '0%' }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{skill.level}% Proficiency</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section 
        id="contact" 
        className={`py-20 px-4 bg-gray-50 dark:bg-black/20 transition-all duration-1000 ${
          isVisible['contact'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Open to collaborations, opportunities, and great conversations about tech</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Let’s connect and create something amazing together!
              I’m always open to new ideas, collaborations, and opportunities to grow as a developer</p>
              <div className="space-y-4">
                <a 
                  href="https://github.com/kavisudar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="w-5 h-5 mr-3" />
                  github.com/kavisudar
                </a>
                <a 
                  href="https://www.linkedin.com/in/kavisudar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="w-5 h-5 mr-3" />
                  linkedin.com/in/kavisudar
                </a>
                <a 
                  href="mailto:kavisudar.be14@gmail.com"
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  kavisudar.be14@gmail.com
                </a>
              </div>
            </div>
            <div>
              {!showThankYou ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Thank You for Getting in Touch!</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      I appreciate your message and interest in connecting with me. I'll get back to you as soon as possible!
                    </p>
                  </div>
                  <button
                    onClick={openGoogleForm}
                    className="w-full px-6 py-3 bg-linear-to-r from-green-600 to-teal-600 dark:from-green-500 dark:to-teal-500 text-white rounded-lg hover:from-green-700 hover:to-teal-700 dark:hover:from-green-600 dark:hover:to-teal-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Open Full Form (Google Forms)</span>
                  </button>
                  <button
                    onClick={() => setShowThankYou(false)}
                    className="w-full mt-3 px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-black/40 backdrop-blur-md text-gray-900 dark:text-white py-8 px-4 border-t border-gray-200 dark:border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="mb-4 text-gray-600 dark:text-gray-400">© 2025 Developed By Kavisudar. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/kavisudar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/kavisudar/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:kavisudar.be14@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;