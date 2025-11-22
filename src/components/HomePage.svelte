<script>
  import { onMount } from 'svelte';
  import { _, locale } from 'svelte-i18n';
  import '../lib/i18n.js';

  let scrollY = 0;
  let visibleSections = new Set();

  onMount(() => {
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id);
            visibleSections = visibleSections;
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  });

  function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
</script>

<svelte:window bind:scrollY />

<div class="landing-page">
  <!-- Navigation -->
  <nav class="nav" class:scrolled={scrollY > 50}>
    <div class="nav-container">
      <div class="nav-logo">Alan Kersaudy</div>
      <div class="nav-links">
        <button on:click={() => scrollToSection('services')}>Services</button>
        <button on:click={() => scrollToSection('portfolio')}>Portfolio</button>
        <button on:click={() => scrollToSection('labs')}>Labs</button>
        <button on:click={() => scrollToSection('about')}>About</button>
        <button on:click={() => scrollToSection('contact')}>Contact</button>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <section id="hero" class="hero">
    <div class="hero-background">
      <!-- Add your background image here -->
      <div
        class="hero-bg-image"
        style="background-image: url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920');"
      ></div>
      <div class="hero-overlay"></div>
    </div>

    <div class="hero-particles">
      {#each Array(20) as _, i}
        <div
          class="particle"
          style="left: {Math.random() * 100}%; top: {Math.random() *
            100}%; animation-delay: {Math.random() *
            3}s; animation-duration: {2 + Math.random() * 3}s;"
        ></div>
      {/each}
    </div>

    <div class="hero-content">
      <h1 class="hero-title">
        <span class="title-line-1"
          >{$_('hero.title1', {
            default: 'AI and Languages Specialist,',
          })}</span
        >
        <br />
        <span class="title-line-2"
          >{$_('hero.title2', { default: 'Educator and Consultant' })}</span
        >
      </h1>

      <p class="hero-subtitle">
        {$_('hero.subtitle', {
          default:
            'AI strategy, applied language technologies, and production-grade systems for organizations and learners.',
        })}
      </p>

      <div class="hero-cta">
        <button class="cta-primary" on:click={() => scrollToSection('contact')}>
          {$_('hero.cta_primary', { default: 'Work with me' })}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
            ></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </button>
        <button
          class="cta-secondary"
          on:click={() => scrollToSection('portfolio')}
        >
          {$_('hero.cta_secondary', { default: 'View my projects' })}
        </button>
      </div>

      <button
        class="scroll-indicator"
        on:click={() => scrollToSection('services')}
        aria-label="Scroll to services section"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  </section>

  <!-- Services Section -->
  <section
    id="services"
    class="services"
    class:visible={visibleSections.has('services')}
  >
    <div class="container">
      <div class="section-header">
        <h2>{$_('services.title', { default: 'Services' })}</h2>
        <div class="section-divider"></div>
      </div>

      <div class="services-grid">
        <!-- Service Block 1 -->
        <div class="service-card text-cyan-400">
          <div class="service-icon icon-cyan">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3>
            {$_('services.advisory.title', {
              default: 'AI Advisory for Leadership',
            })}
          </h3>
          <ul class="space-y-3">
            <li>
              <span
                >{$_('services.advisory.item1', {
                  default: 'Strategic guidance for C-suite and managers',
                })}</span
              >
            </li>
            <li>
              <span
                >{$_('services.advisory.item2', {
                  default: 'AI governance, policy, and risk management',
                })}</span
              >
            </li>
            <li>
              <span
                >{$_('services.advisory.item3', {
                  default: 'AI adoption roadmaps and capability assessments',
                })}</span
              >
            </li>
          </ul>
        </div>

        <!-- Service Block 2 -->
        <div class="service-card text-blue-400">
          <div class="service-icon icon-blue">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
          <h3>
            {$_('services.technical.title', {
              default: 'Technical Implementation',
            })}
          </h3>
          <ul class="space-y-3">
            <li>
              <span
                >{$_('services.technical.item1', {
                  default:
                    'Web, Machine Learning, RAG pipelines, LLM workflows, CI/CD, automation',
                })}</span
              >
            </li>
            <li>
              <span
                >{$_('services.technical.item2', {
                  default: 'SaaS solutions and custom software development',
                })}</span
              >
            </li>
            <li>
              <span
                >{$_('services.technical.item3', {
                  default:
                    'Booth end-to-end architectures and integration with existing systems',
                })}</span
              >
            </li>
          </ul>
        </div>

        <!-- Service Block 3 -->
        <div class="service-card text-purple-400">
          <div class="service-icon icon-purple">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path
                d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
              ></path>
            </svg>
          </div>
          <h3>
            {$_('services.learning.title', {
              default: 'Learning & Pedagogical Design',
            })}
          </h3>
          <ul class="space-y-3">
            <li>
              <span
                >{$_('services.learning.item1', {
                  default: 'Training programs for teams and educators',
                })}</span
              >
            </li>
            <li>
              <span
                >{$_('services.learning.item2', {
                  default:
                    'Educational technology integration and AIEd tools integration',
                })}</span
              >
            </li>
            <li>
              <span
                >{$_('services.learning.item3', {
                  default:
                    'Knowledge modeling, KPIs definition and impact measurement',
                })}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Portfolio Section -->
  <section
    id="portfolio"
    class="portfolio"
    class:visible={visibleSections.has('portfolio')}
  >
    <div class="container">
      <div class="section-header">
        <h2>{$_('portfolio.title', { default: 'Selected Work' })}</h2>
        <p class="section-subtitle">
          {$_('portfolio.subtitle', {
            default: 'AI, software engineering, and learning systems',
          })}
        </p>
        <div class="section-divider"></div>
      </div>

      <div class="portfolio-list">
        <!-- Project 1 -->
        <div class="project-card">
          <div class="project-image">
            <img
              src="assets/fluens.png"
              alt="AI-driven Language Acquisition Platform"
            />
          </div>
          <div class="project-content">
            <h3>
              {$_('portfolio.project1.title', {
                default: 'Educational Platform',
              })}
            </h3>
            <p class="project-subtitle">
              <a href="https://fluens.co" target="_blank">Fluens.co</a>
            </p>
            <p class="project-description">
              {$_('portfolio.project1.description', {
                default:
                  'Following the creation of Eienn.bzh, my MVP project for a Breton language acquisition platform, I created Fluens.co. The SaaS (Software as a Service) platform was designed to help organizations to create, manage and distribute language learning content effectively and at scale. Key features included: a content management system (CMS), a user-friendly interface for both content creators and learners, analytics and a complex payment integration with Stripe to handle subscriptions and transactions securely. Stack: Vue (+ Radix Vue), Firebase (+ node.js).',
              })}
            </p>
            <div class="project-tags">
              <span>B2B2C</span>
              <span>SaaS</span>
              <span>end-to-end</span>
              <span>Pedagogical Content Creation</span>
            </div>
          </div>
        </div>

        <!-- Project 2 -->
        <div class="project-card">
          <div class="project-image">
            <img
              src="assets/leksis.png"
              style="height: fit-content;"
              alt="AI-driven Language Acquisition Platform"
            />
          </div>
          <div class="project-content">
            <h3>
              {$_('portfolio.project2.title', {
                default: 'Adaptive Vocabulary System',
              })}
            </h3>
            <p class="project-subtitle">
              <a href="https://leksis.bzh" target="_blank">Leksis.bzh</a>
            </p>
            <p class="project-description">
              {$_('portfolio.project2.description', {
                default:
                  "Started as my Master's thesis project, Leksis is an adaptive vocabulary learning system that leverages machine learning and deep learning techniques to quickly evaluate language learners's vocabulary level efficiently. Key techniques and algorithms included: a recommendation engine (based on the Elo rating system's logistic model), LSTM cells (PyTorch) to model the phonotactics property of the words in a language and data scrapping and cleaning to prepare the data sets. Stack: PyTorch (on Jupyter notebooks for the data preparation), for the app proper: Firebase (+ TS for the functions) and Vue3 + TS.",
              })}
            </p>
            <div class="project-tags">
              <span>Machine and Deep Learning</span>
              <span>AIEd</span>
              <span>Algorithm Design</span>
              <span>NLP</span>
              <span>Psycholinguistics (Cognitive Science)</span>
            </div>
          </div>
        </div>

        <!-- Project 3 -->
        <!-- <div class="project-card">
          <div class="project-image">
            <div class="project-placeholder">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </div>
          </div>
          <div class="project-content">
            <h3>
              {$_('portfolio.project3.title', {
                default: 'AI Implementation Projects',
              })}
            </h3>
            <p class="project-subtitle">
              {$_('portfolio.project3.subtitle', {
                default: 'Web Development + AI Integration',
              })}
            </p>
            <p class="project-description">
              {$_('portfolio.project3.description', {
                default: '[Add relevant projects here]',
              })}
            </p>
            <div class="project-tags">
              <span>RAG</span>
              <span>API Integration</span>
              <span>Full Stack</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </section>

  <!-- Language Technology Labs -->
  <section id="labs" class="labs" class:visible={visibleSections.has('labs')}>
    <div class="container">
      <div class="section-header">
        <h2>{$_('labs.title', { default: 'Language Technology Labs' })}</h2>
        <p class="section-subtitle">
          {$_('labs.subtitle', {
            default:
              'Research, experimentation and contribution to open source projects with minority languages to explore complex NLP challenges in low-resource contexts.',
          })}
        </p>
        <div class="section-divider divider-purple"></div>
      </div>

      <div class="labs-content">
        <div class="labs-grid">
          <button
            class="labs-item"
            on:click={() =>
              window.open('https://huggingface.co/Oktogazh', '_blank')}
          >
            <div class="labs-emoji">🤗</div>
            <h4>Hugging Face</h4>
            <p>
              {$_('labs.item1.description', {
                default: 'Check out my models and datasets on Hugging Face.',
              })}
            </p>
          </button>
          <button
            class="labs-item"
            on:click={() =>
              window.open('https://github.com/Oktogazh/languagetool', '_blank')}
          >
            <div class="flex align-middle justify-center labs-emoji">
              <img
                src="https://avatars.githubusercontent.com/u/5187764?s=200&v=4"
                alt="LanguageTool Logo"
                style="background-color: blanchedalmond;"
                class="rounded labs-emoji self-center"
                width="50"
                height="50"
              />
            </div>
            <h4>LanguageTool (Java)</h4>
            <p>
              {$_('labs.item2.description', {
                default:
                  'My fork of the famous open-source spelling and grammar checker LanguageTool. Currently working on adding support for Welsh.',
              })}
            </p>
          </button>
          <button
            class="labs-item"
            on:click={() =>
              window.open('posts/techiaith-2#2-models-evaluation', '_blank')}
          >
            <div class="labs-emoji">🔬</div>
            <h4>
              {$_('labs.item3.title', { default: 'Automated Translation' })}
            </h4>
            <p>
              {$_('labs.item3.description', {
                default:
                  'Fine-tuning and evaluating a translation model (French-Breton) with a newly collected dataset.',
              })}
            </p>
          </button>
        </div>
        <div class="labs-link">
          <a href="blog">
            {$_('labs.link', {
              default: 'Read technical notes in my blog',
            })}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
              ></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section
    id="about"
    class="about"
    class:visible={visibleSections.has('about')}
  >
    <div class="container">
      <div class="section-header">
        <h2>{$_('about.title', { default: 'About' })}</h2>
        <div class="section-divider"></div>
      </div>

      <div class="about-content">
        <div class="about-image">
          <div class="portrait-placeholder">
            <img
              src="assets/gibli-lanig.png"
              alt="AI generated Alan Kersaudy Portrait with Gibli style"
            />
          </div>
        </div>

        <div class="about-text">
          <p class="about-bio">
            {$_('about.bio', {
              default:
                'I work at the intersection of AI, linguistics, pedagogy, and programming. My work spans executive AI advisory, applied AI engineering, and the development of intelligent learning systems. I combine technical expertise with a deep understanding of cognitive processes and language structure.',
            })}
          </p>

          <div class="about-highlights">
            <div class="highlight-item">
              <span class="highlight-check">✓</span>
              <span
                >{$_('about.highlight1', {
                  default: 'Independent AI consultant',
                })}</span
              >
            </div>
            <div class="highlight-item">
              <span class="highlight-check">✓</span>
              <span
                >{$_('about.highlight2', {
                  default: 'NLP and small-language R&D',
                })}</span
              >
            </div>
            <div class="highlight-item">
              <span class="highlight-check">✓</span>
              <span
                >{$_('about.highlight3', {
                  default: 'Creator of Fluens and Leksis',
                })}</span
              >
            </div>
            <div class="highlight-item">
              <span class="highlight-check">✓</span>
              <span
                >{$_('about.highlight4', {
                  default: 'Web developer and educator',
                })}</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section
    id="contact"
    class="contact"
    class:visible={visibleSections.has('contact')}
  >
    <div class="container-small">
      <div class="section-header">
        <h2>{$_('contact.title', { default: 'Get in Touch' })}</h2>
        <p class="section-subtitle">
          {$_('contact.subtitle', {
            default:
              'For consulting, collaboration, or speaking engagements, reach out here.',
          })}
        </p>
        <div class="section-divider"></div>
      </div>

      <div class="contact-form-wrapper">
        <div class="contact-form">
          <div class="form-group">
            <label for="name"
              >{$_('contact.form.name', { default: 'Name' })}</label
            >
            <input
              type="text"
              id="name"
              placeholder={$_('contact.form.name_placeholder', {
                default: 'Your name',
              })}
            />
          </div>

          <div class="form-group">
            <label for="email"
              >{$_('contact.form.email', { default: 'Email' })}</label
            >
            <input
              type="email"
              id="email"
              placeholder={$_('contact.form.email_placeholder', {
                default: 'your.email@example.com',
              })}
            />
          </div>

          <div class="form-group">
            <label for="message"
              >{$_('contact.form.message', { default: 'Message' })}</label
            >
            <textarea
              id="message"
              rows="6"
              placeholder={$_('contact.form.message_placeholder', {
                default: 'Tell me about your project...',
              })}
            ></textarea>
          </div>

          <button class="submit-button">
            {$_('contact.form.submit', { default: 'Send Message' })}
          </button>
        </div>

        <div class="contact-info">
          <a href="mailto:your.email@example.com" class="contact-link">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
              ></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>your.email@example.com</span>
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
              ></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p>
        {$_('footer.copyright', {
          default: '© 2024 Alan. All rights reserved.',
        })}
      </p>
    </div>
  </footer>
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .landing-page {
    min-height: 100vh;
    background: #020617;
    color: #f1f5f9;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
  }

  /* Navigation */
  .nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 50;
    transition: all 0.3s ease;
  }

  .nav.scrolled {
    background: rgba(2, 6, 23, 0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #1e293b;
  }

  .nav-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 1rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .nav-logo {
    font-size: 1.25rem;
    font-weight: 700;
    background: linear-gradient(to right, #22d3ee, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-links {
    display: none;
    gap: 2rem;
  }

  .nav-links button {
    background: none;
    border: none;
    color: #cbd5e1;
    cursor: pointer;
    font-size: 1rem;
    transition: color 0.3s;
    text-transform: capitalize;
  }

  .nav-links button:hover {
    color: #22d3ee;
  }

  @media (min-width: 768px) {
    .nav-links {
      display: flex;
    }
  }

  /* Hero Section */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    opacity: 1;
  }

  .hero-background {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom right, #0f172a, #020617, #1e3a8a);
  }

  .hero-bg-image {
    position: absolute;
    inset: 0;
    opacity: 0.99;
    background-size: cover;
    background-position: center;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      #020617,
      rgba(2, 6, 23, 0.5),
      transparent
    );
  }

  .hero-particles {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: rgba(34, 211, 238, 0.3);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.6;
      transform: scale(1.2);
    }
  }

  .hero-content {
    position: relative;
    z-index: 10;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    text-align: center;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-title {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;
  }

  .title-line-1 {
    background: linear-gradient(to right, #ffffff, #ccfbf1, #bfdbfe);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .title-line-2 {
    background: linear-gradient(to right, #bfdbfe, #67e8f9, #22d3ee);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (min-width: 768px) {
    .hero-title {
      font-size: 4.5rem;
    }
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: #cbd5e1;
    margin-bottom: 3rem;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.6;
  }

  @media (min-width: 768px) {
    .hero-subtitle {
      font-size: 1.5rem;
    }
  }

  .hero-cta {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  @media (min-width: 640px) {
    .hero-cta {
      flex-direction: row;
    }
  }

  .cta-primary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: linear-gradient(to right, #06b6d4, #3b82f6);
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(34, 211, 238, 0.25);
    transition: all 0.3s;
  }

  .cta-primary:hover {
    box-shadow: 0 15px 35px rgba(34, 211, 238, 0.4);
    transform: scale(1.05);
  }

  .cta-primary svg {
    transition: transform 0.3s;
  }

  .cta-primary:hover svg {
    transform: translateX(4px);
  }

  .cta-secondary {
    padding: 1rem 2rem;
    border: 2px solid #475569;
    background: transparent;
    border-radius: 0.5rem;
    font-weight: 600;
    color: #e2e8f0;
    cursor: pointer;
    transition: all 0.3s;
  }

  .cta-secondary:hover {
    border-color: #22d3ee;
    color: #22d3ee;
  }

  .scroll-indicator {
    position: absolute;
    bottom: -5rem;
    left: 50%;
    transform: translateX(-50%);
    background: none;
    border: none;
    color: #22d3ee;
    cursor: pointer;
    animation: bounce 2s infinite;
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateX(-50%) translateY(0);
    }
    50% {
      transform: translateX(-50%) translateY(-10px);
    }
  }

  /* Common Section Styles */
  section {
    padding: 6rem 0;
    opacity: 0;
    transition: opacity 1s;
  }

  section.visible {
    opacity: 1;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .container-small {
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 1.5rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #22d3ee, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @media (min-width: 768px) {
    .section-header h2 {
      font-size: 3rem;
    }
  }

  .section-subtitle {
    font-size: 1.25rem;
    color: #94a3b8;
    margin-top: 0.5rem;
  }

  .section-divider {
    width: 5rem;
    height: 4px;
    background: linear-gradient(to right, #22d3ee, #3b82f6);
    margin: 1rem auto 0;
  }

  .divider-purple {
    background: linear-gradient(to right, #a855f7, #ec4899);
  }

  /* Services Section */
  .services {
    background: #0f172a;
  }

  .services-grid {
    display: grid;
    gap: 2rem;
  }

  @media (min-width: 768px) {
    .services-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .service-card {
    background: rgba(30, 41, 59, 0.5);
    backdrop-filter: blur(12px);
    border-radius: 1rem;
    padding: 2rem;
    border: 1px solid #334155;
    transition: all 0.3s;
  }

  .service-card:hover {
    border-color: rgba(34, 211, 238, 0.5);
    transform: scale(1.05);
  }

  .service-icon {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
    transition: transform 0.3s;
  }

  .service-card:hover .service-icon {
    transform: rotate(6deg);
  }

  .icon-cyan {
    background: linear-gradient(to bottom right, #06b6d4, #3b82f6);
  }

  .icon-blue {
    background: linear-gradient(to bottom right, #3b82f6, #8b5cf6);
  }

  .icon-purple {
    background: linear-gradient(to bottom right, #8b5cf6, #ec4899);
  }

  .service-icon svg {
    color: white;
  }

  .service-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .service-card ul {
    list-style: disc inside;
    gap: 0.75rem;
    padding-left: 1rem; /* Add some left padding */
  }

  .service-card li {
    line-height: 1.5;
  }

  .service-card li span {
    color: #cbd5e1;
  }

  .service-card li span:first-child {
    margin-top: 0.25rem;
  }

  /* Portfolio Section */
  .portfolio {
    background: #020617;
  }

  .portfolio-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .project-card {
    background: rgba(30, 41, 59, 0.3);
    backdrop-filter: blur(12px);
    border-radius: 1rem;
    padding: 2rem;
    border: 1px solid #334155;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .project-card {
      flex-direction: row;
    }
  }

  .project-card:hover {
    border-color: rgba(34, 211, 238, 0.5);
  }

  .project-image {
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    .project-image {
      width: 33.333%;
    }
  }

  .project-placeholder {
    aspect-ratio: 16 / 9;
    background: #1e293b;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      to bottom right,
      rgba(6, 182, 212, 0.2),
      rgba(59, 130, 246, 0.2)
    );
  }

  .project-placeholder svg {
    color: rgba(34, 211, 238, 0.5);
  }

  .project-content {
    flex: 1;
  }

  .project-card h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #22d3ee;
    transition: color 0.3s;
  }

  .project-card:hover h3 {
    color: #67e8f9;
  }

  .project-subtitle {
    color: #94a3b8;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .project-description {
    color: #cbd5e1;
    margin-bottom: 1rem;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .project-tags span {
    padding: 0.375rem 0.75rem;
    background: rgba(51, 65, 85, 0.5);
    color: #67e8f9;
    border-radius: 9999px;
    font-size: 0.875rem;
    border: 1px solid #475569;
  }

  /* Labs Section */
  .labs {
    background: #0f172a;
  }

  .labs-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(168, 85, 247, 0.1);
    border: 1px solid rgba(168, 85, 247, 0.3);
    border-radius: 9999px;
    margin-bottom: 1rem;
  }

  .labs-badge svg {
    color: #a855f7;
  }

  .labs-badge span {
    color: #a855f7;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .labs-content {
    max-width: 1024px;
    margin: 0 auto;
  }

  .labs-content > div:first-child {
    background: rgba(30, 41, 59, 0.3);
    backdrop-filter: blur(12px);
    border-radius: 1rem;
    padding: 2rem;
    border: 1px solid #334155;
  }

  .labs-grid {
    display: grid;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  @media (min-width: 768px) {
    .labs-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .labs-item {
    text-align: center;
    padding: 1.5rem;
    background: rgba(30, 41, 59, 0.5);
    border-radius: 0.75rem;
    border: none;
    color: inherit;
    font: inherit;
    cursor: pointer;
    width: 100%;
  }

  .labs-emoji {
    font-size: 3rem;
    margin-bottom: 0.5rem;
  }

  .labs-item h4 {
    font-weight: 600;
    color: #a855f7;
    margin-bottom: 0.5rem;
  }

  .labs-item p {
    font-size: 0.875rem;
    color: #94a3b8;
  }

  .labs-link {
    text-align: center;
  }

  .labs-link a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #a855f7;
    text-decoration: none;
    transition: color 0.3s;
  }

  .labs-link a:hover {
    color: #c084fc;
  }

  /* About Section */
  .about {
    background: #020617;
  }

  .about-content {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
  }

  @media (min-width: 768px) {
    .about-content {
      flex-direction: row;
    }
  }

  .about-image {
    flex-shrink: 0;
  }

  @media (min-width: 768px) {
    .about-image {
      width: 33.333%;
    }
  }

  .portrait-placeholder {
    aspect-ratio: 1 / 1;
    border-radius: 1rem;
    overflow: hidden;
    background: #1e293b;
    border: 1px solid #334155;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      to bottom right,
      rgba(6, 182, 212, 0.2),
      rgba(59, 130, 246, 0.2)
    );
  }

  .about-text {
    flex: 1;
  }

  .about-bio {
    font-size: 1.25rem;
    color: #cbd5e1;
    line-height: 1.6;
    margin-bottom: 2rem;
  }

  .about-highlights {
    display: grid;
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .about-highlights {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .highlight-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(30, 41, 59, 0.3);
    border-radius: 0.5rem;
    border: 1px solid #334155;
  }

  .highlight-check {
    color: #22d3ee;
    margin-top: 0.25rem;
  }

  .highlight-item span:last-child {
    color: #cbd5e1;
  }

  /* Contact Section */
  .contact {
    background: #0f172a;
  }

  .contact-form-wrapper {
    background: rgba(30, 41, 59, 0.3);
    backdrop-filter: blur(12px);
    border-radius: 1rem;
    padding: 2rem;
    border: 1px solid #334155;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #cbd5e1;
  }

  .form-group input,
  .form-group textarea {
    padding: 0.75rem 1rem;
    background: #1e293b;
    border: 1px solid #475569;
    border-radius: 0.5rem;
    color: #f1f5f9;
    font-size: 1rem;
    transition: all 0.3s;
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #22d3ee;
    box-shadow: 0 0 0 3px rgba(34, 211, 238, 0.2);
  }

  .form-group textarea {
    resize: none;
  }

  .submit-button {
    width: 100%;
    padding: 1rem;
    background: linear-gradient(to right, #06b6d4, #3b82f6);
    border: none;
    border-radius: 0.5rem;
    font-weight: 600;
    color: white;
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(34, 211, 238, 0.25);
    transition: all 0.3s;
  }

  .submit-button:hover {
    box-shadow: 0 15px 35px rgba(34, 211, 238, 0.4);
    transform: scale(1.02);
  }

  .contact-info {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #334155;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
  }

  @media (min-width: 640px) {
    .contact-info {
      flex-direction: row;
    }
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #cbd5e1;
    text-decoration: none;
    transition: color 0.3s;
    justify-content: center;
  }

  .contact-link:hover {
    color: #22d3ee;
  }

  /* Footer */
  .footer {
    padding: 2rem 0;
    background: #020617;
    border-top: 1px solid #1e293b;
  }

  .footer p {
    text-align: center;
    color: #94a3b8;
  }
</style>
