export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  tags: string[];
  impactMetric: string;
  accentColor: string;
  palette: 'emerald' | 'cyan' | 'violet' | 'amber' | 'rose';
  overview: string;
  challenge: string;
  solution: string;
  architectureDetails: string[];
  metrics: { label: string; value: string; desc: string }[];
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  livePreviewType:
    | 'realtime-cursor'
    | 'video-streaming'
    | 'gym-analytics'
    | 'realtime-chat'
    | 'gitbroski-cli';
}

export interface Skill {
  name: string;
  category: 'Languages' | 'Backend & Architecture' | 'Databases & ORM' | 'DevOps & Cloud Infrastructure' | 'Testing & Observability';
  accentColor: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  achievements: string[];
  technologies?: string[];
}

export const RESUME_DATA = {
  name: 'SAKSHAM',
  role: 'Full-Stack Software Engineer',
  specialization: 'Distributed Systems, High-Scale Microservices & Platform Infrastructure',
  location: 'Fazilka, Punjab, India',
  email: 'saksham.gupta1411@gmail.com',
  github: 'https://github.com/Saksham1411',
  linkedin: 'https://linkedin.com/in/saksham1411',
  portfolio: 'https://saksham-portfolio.dev',

  education: {
    degree: 'Bachelor of Engineering in Computer Science Engineering',
    institution: 'Chitkara University, Punjab, India',
    graduationYear: '2025',
    cgpa: '9.70 / 10.0',
    honors: 'Top Academic Performer in CSE Cohort',
  },
  summary:
    'Result-driven Full-Stack Software Engineer with over 2 years of professional experience specializing in distributed systems, microservices architecture, and high-performance backend infrastructure. Proven track record of enhancing developer productivity and platform reliability by architecting reusable frameworks, implementing fine-grained authorization (RBAC), and migrating legacy subsystems. Adept at optimizing system latency, managing containerized deployments via Kubernetes, and driving technical excellence across cross-functional engineering teams.',

  stats: [
    { label: 'Daily Logs Handled', value: '1M+' },
    { label: 'Latency Optimization', value: '35%' },
    { label: 'Internal Devs on MCP Gateway', value: '50+' },
    { label: 'Academic CGPA', value: '9.70' },
    { label: 'Production Microservices', value: '8+' },
    { label: 'Automated Test Suites', value: '120+' },
  ],

  proofItems: [
    '2+ Years of Professional Engineering Experience',
    'Fine-Grained RBAC for Model Context Protocol (MCP)',
    '1M+ Daily Operational Logs via Centralized Audit Service',
    '35% API Latency Reduction via Distributed Query Optimization',
    'Standardized Reusable ORM Framework across Legacy Stores',
    'Zero-Downtime Microservices Migration & Kubernetes Deployments',
    '30+ Open Source Repositories on GitHub',
    '9.70 / 10.0 CGPA from Chitkara University',
  ],

  principles: [
    {
      id: '01',
      title: 'I design for fault-tolerant architecture before writing a line of code.',
      body: 'High-scale systems fail at the seams. I dissect decoupling, failure boundaries, database read/write bottlenecks, and idempotency guarantees before committing to implementation details.',
      highlight: 'Architecture First',
    },
    {
      id: '02',
      title: 'Observability and auditability are non-negotiable primitives.',
      body: 'If a distributed event cannot be traced end-to-end, it cannot be trusted. From structuring 1M+ daily audit logs to defining distributed telemetry, transparent observability prevents outages before users notice.',
      highlight: 'Deep Observability',
    },
    {
      id: '03',
      title: 'Developer velocity compounds through shared, ergonomic frameworks.',
      body: 'Building bespoke glue code slows teams down. By engineering reusable ORM abstractions, shared design systems, and automated test runners, I multiply engineering output across dozens of developers.',
      highlight: 'Reusable Abstractions',
    },
    {
      id: '04',
      title: 'Performance is engineered at the query and protocol level.',
      body: 'Achieving sub-100ms distributed response times requires understanding SQL query execution plans, memory allocations in Node runtimes, Redis caching tiers, and network serialization overhead.',
      highlight: 'Sub-Millisecond Mindset',
    },
  ],

  skillsList: [
    // Languages
    { name: 'JavaScript', category: 'Languages', accentColor: '#FACC15' },
    { name: 'TypeScript', category: 'Languages', accentColor: '#38BDF8' },
    { name: 'Python', category: 'Languages', accentColor: '#EAB308' },
    { name: 'Java', category: 'Languages', accentColor: '#F97316' },
    { name: 'Go (Golang)', category: 'Languages', accentColor: '#06B6D4' },
    { name: 'HTML, CSS', category: 'Languages', accentColor: '#EC4899' },

    // Backend & Architecture
    { name: 'Node.js', category: 'Backend & Architecture', accentColor: '#10B981' },
    { name: 'Express.js', category: 'Backend & Architecture', accentColor: '#10B981' },
    { name: 'REST APIs', category: 'Backend & Architecture', accentColor: '#38BDF8' },
    { name: 'Microservices', category: 'Backend & Architecture', accentColor: '#10B981' },
    { name: 'Model Context Protocol (MCP)', category: 'Backend & Architecture', accentColor: '#10B981' },
    { name: 'Distributed Systems', category: 'Backend & Architecture', accentColor: '#8B5CF6' },

    // Databases & ORM
    { name: 'PostgreSQL', category: 'Databases & ORM', accentColor: '#3B82F6' },
    { name: 'MySQL', category: 'Databases & ORM', accentColor: '#0284C7' },
    { name: 'MongoDB', category: 'Databases & ORM', accentColor: '#22C55E' },
    { name: 'Redis', category: 'Databases & ORM', accentColor: '#EF4444' },
    { name: 'Sequelize ORM', category: 'Databases & ORM', accentColor: '#38BDF8' },

    // DevOps & Cloud Infrastructure
    { name: 'Docker', category: 'DevOps & Cloud Infrastructure', accentColor: '#0284C7' },
    { name: 'Kubernetes', category: 'DevOps & Cloud Infrastructure', accentColor: '#8B5CF6' },
    { name: 'GitLab CI/CD', category: 'DevOps & Cloud Infrastructure', accentColor: '#EA580C' },
    { name: 'Git', category: 'DevOps & Cloud Infrastructure', accentColor: '#F43F5E' },
    { name: 'AWS', category: 'DevOps & Cloud Infrastructure', accentColor: '#F97316' },
    { name: 'Linux', category: 'DevOps & Cloud Infrastructure', accentColor: '#EAB308' },

    // Testing & Observability
    { name: 'Jest', category: 'Testing & Observability', accentColor: '#22C55E' },
    { name: 'Cypress', category: 'Testing & Observability', accentColor: '#10B981' },
    { name: 'Apache Superset', category: 'Testing & Observability', accentColor: '#06B6D4' },
    { name: 'Okta (AuthN/AuthZ)', category: 'Testing & Observability', accentColor: '#F43F5E' },
  ] as Skill[],

  experiences: [
    {
      company: 'Nielsen',
      role: 'Member of Technical Staff 1',
      location: 'Gurugram, India',
      period: 'Jul 2025 – Present',
      isCurrent: true,
      achievements: [
        'Architected and deployed a fine-grained Role-Based Access Control (RBAC) mechanism for Model Context Protocol (MCP) primitives, securing role-based authorization of tools, prompts, and resources across the core MCP gateway for 50+ internal developers.',
        'Engineered and scaled a centralized enterprise Audit Service to track critical platform events across multiple decoupled microservices, capturing over 1M+ operational logs daily to enhance system observability.',
        'Designed high-throughput backend APIs and internal administrative features—including bulk data operations, comparison workflows, active dashboards, and file upload pipelines—improving data processing speeds by 25%.',
        'Developed a reusable ORM framework that standardized database access layers and automated environment provisioning, reducing technical debt and accelerating migration timelines by 30% for legacy data stores.',
        'Optimized distributed system latency by 35% by refactoring complex SQL structures, implementing advanced pagination techniques, and eliminating redundant database queries to enhance overall API responsiveness.',
        'Collaborated on a shared enterprise Design System, building 15+ reusable UI components that accelerated cross-application development velocity and established front-end maintainability standards.',
      ],
      technologies: [
        'Model Context Protocol (MCP)',
        'Node.js',
        'TypeScript',
        'Express.js',
        'PostgreSQL',
        'Sequelize ORM',
        'Redis',
        'Kubernetes',
        'Docker',
        'Okta RBAC',
        'Jest',
        'Cypress',
        'GitLab CI/CD',
        'Apache Superset',
      ],
    },
    {
      company: 'Nielsen',
      role: 'Software Engineer Intern',
      location: 'Gurugram, India',
      period: 'Jul 2024 – Jul 2025',
      isCurrent: false,
      achievements: [
        'Led the zero-downtime migration of 8+ Node.js microservices to the latest LTS version, which reduced memory consumption, saved 15% in infrastructure resource utilization, and achieved a 60% boost in computing performance while aligning systems with modern security standards.',
        'Conceptualized and built a specialized Debug Tab feature to streamline internal user access management troubleshooting, reducing manual verification workflows and support response times by 40%.',
        'Authored 120+ comprehensive test suites utilizing Jest and Cypress to establish 85%+ test coverage, ensuring robust deployments and eliminating critical regressions within production microservices.',
        'Identified backend performance bottlenecks by conducting rigorous load tests on Node.js and React.js services, implementing targeted code optimizations to maintain low latency under peak user loads.',
      ],
      technologies: ['Node.js', 'React.js', 'Jest', 'Cypress', 'LTS Migration', 'Docker'],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: 'realtime-cursor-sync',
      title: 'Realtime-Cursor: Multi-User Collaboration Engine',
      subtitle: 'Low-Latency WebSocket State Broadcast & Multi-Cursor Sync',
      tagline: 'Google Docs-style collaborative editor engine broadcasting remote carets and text edits over WebSockets.',
      tags: ['WebSockets', 'Real-Time Sync', 'Node.js', 'TypeScript', 'DOM Caret API'],
      impactMetric: 'Sub-20ms Caret Broadcast',
      accentColor: '#10B981',
      palette: 'emerald',
      overview:
        'A Google Docs-style collaborative document editing system that synchronizes multi-user inline text carets, remote selection ranges, and real-time keystrokes over WebSockets.',
      challenge:
        'Tracking dynamic text cursor positions in multi-line rich text as other users insert and delete content requires calculating character index offsets and updating remote caret coordinates without cursor jumping or selection desynchronization.',
      solution:
        'Implemented relative character-index offset mapping with position transforms, throttled WebSocket cursor broadcast packets, and smooth visual caret name-tags.',
      architectureDetails: [
        'Relative character offset caret tracking adapting automatically to remote insertions and deletions',
        'Multi-color user presence pills and floating inline caret name badges (e.g. Alex, Sara)',
        'WebSocket event broadcasting with delta-compressed cursor packets (< 40 bytes per update)',
        'Room-scoped document channels supporting concurrent multi-editor writing sessions',
      ],
      metrics: [
        { label: 'Caret Sync Latency', value: '< 18ms', desc: 'Real-time peer cursor broadcast turnaround' },
        { label: 'Caret Pos Accuracy', value: '100%', desc: 'Relative character offset alignment' },
        { label: 'Packet Overhead', value: '< 40 Bytes', desc: 'Lightweight delta broadcast payloads' },
      ],
      technologies: ['JavaScript', 'WebSockets', 'Node.js', 'DOM Caret API', 'Collaborative Text Sync'],
      githubUrl: 'https://github.com/Saksham1411/Realtime-Cursor',
      livePreviewType: 'realtime-cursor',
    },
    {
      id: 'video-streaming-pipeline',
      title: 'Real-Time HLS Video Streaming Pipeline',
      subtitle: 'On-Demand FFmpeg Transcoding & Adaptive HLS.js Delivery',
      tagline: 'Full-stack platform transcoding remote video URLs on the fly into adaptive HLS (.m3u8) chunks for instant playback.',
      tags: ['HLS Streaming', 'FFmpeg Transcoding', 'Node.js', 'React & TypeScript', 'HLS.js'],
      impactMetric: 'Zero Buffer Playback',
      accentColor: '#38BDF8',
      palette: 'cyan',
      overview:
        'A full-stack video streaming platform built with Node.js, Express, FFmpeg, React, TypeScript, and HLS.js. Enables on-demand, real-time transcoding of remote video URLs (MP4, MKV, AVI) into adaptive HTTP Live Streaming (HLS) segments for instant browser playback without requiring full video downloads or buffering.',
      challenge:
        'Traditional progressive downloading of multi-gigabyte video files causes severe network overhead, slow initial start times, format incompatibilities (e.g. MKV/AVI in browsers), and disk/memory exhaustion during continuous streaming.',
      solution:
        'Engineered a live just-in-time FFmpeg transcoding pipeline that slices incoming video streams into 6-second MPEG-TS chunks with dynamic .m3u8 playlist indexing and sliding-window segment rotation (delete_segments) to prevent disk bloat.',
      architectureDetails: [
        'On-demand stream initialization pulling remote video URLs and spawning background FFmpeg transcoding workers',
        '6-second MPEG-TS segment chunking indexed by dynamic HLS master playlist (.m3u8)',
        'Sliding-window storage rotation (delete_segments) preserving disk space by retaining only active chunks',
        'Process tree lifecycle manager terminating previous transcode jobs to reclaim CPU and memory',
        'Frontend React player leveraging HLS.js with automatic fallback to native Safari HLS',
      ],
      metrics: [
        { label: 'Initial Playback Start', value: '< 2.4s', desc: 'Starts immediately on first 6s segment generation' },
        { label: 'Disk Footprint', value: 'Sliding Window', desc: 'Auto-purges older .ts chunks to prevent disk bloat' },
        { label: 'Format Compatibility', value: 'Universal', desc: 'Transcodes MKV, AVI & MP4 on the fly for all browsers' },
      ],
      technologies: ['Node.js', 'Express.js', 'FFmpeg Engine', 'React.js', 'TypeScript', 'HLS.js', 'MPEG-TS'],
      githubUrl: 'https://github.com/Saksham1411/video-streaming',
      livePreviewType: 'video-streaming',
    },
    {
      id: 'gym-progress-tracker',
      title: 'Gym Progress Tracker: Full-Stack Analytics SaaS',
      subtitle: 'Volume Progression & Progressive Overload Engine',
      tagline: 'Interactive strength progression platform with automated 1RM calculations and analytics.',
      tags: ['TypeScript', 'React', 'Analytics', 'Vercel Deployment', 'State Architecture'],
      impactMetric: 'Full-Stack Deployed SaaS',
      accentColor: '#A78BFA',
      palette: 'violet',
      overview:
        'A comprehensive fitness tracking web application built with TypeScript and modern React, offering interactive telemetry, workout volume distribution, and dynamic progression charting.',
      challenge:
        'Managing relational workout data with multiple exercise sets, weight units, RPE (Rate of Perceived Exertion), and real-time graphs required a deterministic state management architecture.',
      solution:
        'Developed typed state models with optimistic UI updates, responsive SVG telemetry charts, local cache persistence, and automated progressive overload calculations.',
      architectureDetails: [
        'End-to-end type safety using TypeScript interfaces for workouts, sets, and telemetry metrics',
        'Custom progression algorithms calculating estimated 1RM (One Rep Max) across historical data',
        'Optimistic updates and local storage synchronization ensuring zero lag during workouts',
        'Production CI/CD deployment on Vercel with responsive mobile-first UI',
      ],
      metrics: [
        { label: 'Production Uptime', value: '99.9%', desc: 'Hosted & active on Vercel infrastructure' },
        { label: 'UI Response Time', value: '< 16ms', desc: 'Optimistic UI state updates' },
        { label: 'TypeScript Coverage', value: '100%', desc: 'Zero runtime type errors across models' },
      ],
      technologies: ['TypeScript', 'React.js', 'Modern CSS', 'Vercel', 'Analytics Engine'],
      githubUrl: 'https://github.com/Saksham1411/gym-progress-tracker',
      liveUrl: 'https://gym-progress-tracker-sigma.vercel.app',
      livePreviewType: 'gym-analytics',
    },
    {
      id: 'realtime-chat-platform',
      title: 'Chating-App: Real-Time WebSocket Messaging Platform',
      subtitle: 'Bi-Directional WebSocket State Dispatch & Room-Scoped Broadcasting',
      tagline: 'Low-latency real-time chat platform with multi-room isolation, live typing presence, and instant broadcast.',
      tags: ['WebSockets', 'Real-Time State', 'Node.js', 'Vercel', 'Event Architecture'],
      impactMetric: 'Sub-15ms Message Broadcast',
      accentColor: '#FBBF24',
      palette: 'amber',
      overview:
        'A high-concurrency real-time messaging application engineered with WebSockets and Node.js. Delivers instant multi-room messaging, active presence tracking, typing indicators, and reliable connection recovery.',
      challenge:
        'Managing concurrent active socket connections across dynamic room channels without race conditions, dropped packets, or memory leaks on connection disconnect.',
      solution:
        'Designed a room-scoped pub/sub dispatch engine with WebSocket heartbeat ping/pong handlers, automatic client reconnection, and structured JSON event schemas.',
      architectureDetails: [
        'Bi-directional WebSocket event channels for real-time broadcast and receipt acknowledgments',
        'Ephemeral typing indicator telemetry broadcasting debounced status to room participants',
        'Automated socket heartbeat and graceful disconnection cleanup preventing server resource leaks',
        'Production deployed on Vercel with responsive mobile-friendly interface',
      ],
      metrics: [
        { label: 'Message Dispatch Latency', value: '< 15ms', desc: 'Turnaround for peer socket broadcasts' },
        { label: 'Connection Reliability', value: '99.9%', desc: 'Automatic socket heartbeat & reconnect' },
        { label: 'Active Deployment', value: 'Live', desc: 'Hosted & running live on Vercel' },
      ],
      technologies: ['JavaScript', 'WebSockets', 'Node.js', 'Express.js', 'Vercel'],
      githubUrl: 'https://github.com/Saksham1411/Chating-App',
      liveUrl: 'https://chating-app-two.vercel.app',
      livePreviewType: 'realtime-chat',
    },
    {
      id: 'gitbroski-cli',
      title: 'Git-Broski: Developer Workflow & Git Automation CLI',
      subtitle: 'Single-Command Terminal Automation & Remote Git Dispatch Tool in Go',
      tagline: 'A high-speed Go CLI utility automating repetitive Git workflows, repository browser jumping, and .gitignore generation.',
      tags: ['Go CLI Tool', 'Git Automation', 'Developer Productivity', 'Go 1.22', 'Terminal Utility'],
      impactMetric: 'Single-Command Git Velocity',
      accentColor: '#10B981',
      palette: 'emerald',
      overview:
        'A developer productivity CLI tool written in Go that simplifies everyday Git operations into lightning-fast single terminal commands — such as jumping directly from the local terminal to the remote repository URL and automatically generating language-specific .gitignore files.',
      challenge:
        'Context switching between local terminal branches, browser tabs, and manually copy-pasting .gitignore boilerplate disrupts developer flow and adds unnecessary friction.',
      solution:
        'Engineered a lightweight Go binary (gitbroski) that parses local .git/config metadata, executes OS-level browser triggers (gitbroski open), and fetches standardized template configurations on the fly.',
      architectureDetails: [
        'Fast compiled Go 1.22 binary offering instant startup with sub-millisecond execution time',
        'Automatic local .git metadata parsing to extract active remote origins (GitHub/GitLab)',
        'Built-in template generator creating verified .gitignore configurations for Python and other stacks',
        'Cross-platform global CLI distribution support via standard symlink / PATH installation',
      ],
      metrics: [
        { label: 'Execution Speed', value: '< 5ms', desc: 'Instant binary CLI execution' },
        { label: 'Go Tooling', value: 'Go 1.22+', desc: 'Modern idiomatic Go build' },
        { label: 'Developer Flow', value: 'Zero Friction', desc: 'Direct terminal-to-browser jumping' },
      ],
      technologies: ['Go (Golang)', 'Go 1.22', 'Git Internals', 'CLI Automation', 'Cross-Platform Tools'],
      githubUrl: 'https://github.com/gitbroskie/gitbroski',
      livePreviewType: 'gitbroski-cli',
    },
  ] as ProjectData[],
};
