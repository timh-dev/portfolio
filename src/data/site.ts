const displayName = import.meta.env.VITE_DISPLAY_NAME || "Your Name";
const initials = import.meta.env.VITE_INITIALS || "YN";
const email = import.meta.env.VITE_EMAIL || "you@example.com";
const githubUrl =
  import.meta.env.VITE_GITHUB_URL || "https://github.com/your-handle";
const role =
  import.meta.env.VITE_ROLE ||
  "Lead Full-Stack Developer · ML Engineer · Geospatial Systems Builder";

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#experience" },
  { label: "Projects", href: "#case-studies" },
  { label: "Writing", href: "#writing" },
] as const;

export const intro = {
  name: displayName,
  initials,
  role,
  summary: [
    `I'm ${displayName}, a software engineer focused on full-stack product development, cloud systems, and applied machine learning. I have 8+ years of experience building production applications with React, TypeScript, Python, and AWS across wildfire operations and financial services.`,
    "I've built end-to-end products that span frontend interfaces, backend services, data pipelines, and infrastructure. My recent work has centered on geospatial tools, operational dashboards, and ML-powered decision systems that need to perform reliably under real-world pressure.",
    "Currently, I'm looking for new tech roles and selective freelance work. I am especially interested in projects where product thinking, strong engineering execution, and modern frontend development need to come together cleanly.",
  ],
  location: "Based in the United States, working remotely",
  cta: {
    label: "Get in touch",
    href: `mailto:${email}`,
  },
  links: [{ label: "GitHub", href: githubUrl }],
};

export const highlights = [
  "React + TypeScript",
  "Python + FastAPI",
  "AWS + Terraform",
  "ML + MLOps",
  "Geospatial Analytics",
];

export const experience = [
  {
    company: "Logic20/20",
    title: "Lead Full-Stack Developer",
    period: "Oct 2023 - Present",
    description:
      "Leading the engineering of cloud-native wildfire operations software across real-time dashboards, geospatial planning tools, shared UI systems, and AWS infrastructure.",
    bullets: [
      "Built and maintained two production applications in a pnpm monorepo using React 18, TypeScript, Python, and a shared component library.",
      "Architected 13 Lambda-based microservices for live asset monitoring, forecasting, weather streaming, map delivery, and RBAC with Cognito and SAML SSO.",
      "Improved responsiveness with layered caching, observability, load testing, and on-call support through the 2024/2025 California wildfire season.",
    ],
  },
  {
    company: "Logic20/20",
    title: "Developer / ML Engineer",
    period: "Aug 2022 - Oct 2023",
    description:
      "Designed end-to-end ML and data systems for utility wildfire risk modeling, spanning feature engineering, model training, scoring pipelines, and analytical marts.",
    bullets: [
      "Deployed five production ML models on SageMaker using XGBoost, logistic regression, and custom scikit-learn transformers.",
      "Built a 277+ model dbt project on Athena/Iceberg integrating weather, GIS, satellite, and fire simulation inputs.",
      "Orchestrated hourly scoring flows with Glue, Step Functions, and SageMaker Pipelines across operational and planning use cases.",
    ],
  },
  {
    company: "ProManage LLC",
    title: "Software Engineer",
    period: "Jun 2018 - Aug 2022",
    description:
      "Developed a multi-tenant retirement planning SaaS platform and supporting integrations, financial computation workflows, and secure application infrastructure.",
    bullets: [
      "Architected Vision Web with Laravel, Vue 3, MySQL, tenant-aware subdomains, and a large SPA component surface.",
      "Implemented asynchronous PHP-to-Matlab financial modeling workflows backed by Redis queues and cached results.",
      "Delivered security hardening, compliance-oriented immutable history, Dockerized development, and GitHub Actions deployments to AWS.",
    ],
  },
] as const;

export type ProjectAsset = {
  title: string;
  description: string;
  format: "image" | "video" | "diagram";
  align?: "left" | "right" | "center";
  sideNote?: string;
  bodyBelow?: string;
};

export type ProjectSection = {
  title: string;
  description: string;
  paragraphs: readonly string[];
  assets?: readonly ProjectAsset[];
  status?: string;
};

export type ProjectTab = {
  id: "backend" | "frontend";
  label: string;
  intro: string;
  sections: readonly ProjectSection[];
};

export const caseStudies = [
  {
    slug: "altvia",
    title: "Altvia",
    subtitle: "Geospatial endurance intelligence platform",
    description:
      "A full-stack product for activity ingestion, route-aware analysis, and endurance performance intelligence built across frontend product design, backend services, geospatial tooling, data workflows, and ML foundations.",
    status: "Work in progress",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "FastAPI",
      "PostgreSQL",
      "PostGIS",
      "Dagster",
      "MLflow",
      "Docker Compose",
    ],
    summaryPoints: [
      "Apple Health ingestion and normalization as the first product workflow",
      "Backend-first architecture with reusable services for API routes and orchestration",
      "Frontend product shell for overview, sessions, paths, planning, and analysis",
    ],
    tabs: [
      {
        id: "backend",
        label: "Backend",
        intro:
          "Altvia’s backend is the system backbone: ingestion, APIs, spatial processing, orchestration, model workflows, and the operational foundation required to scale the product cleanly.",
        sections: [
          {
            title: "API Design",
            description:
              "The API layer is intentionally thin. FastAPI handles validation and response shaping while domain logic lives in service and repository layers so the same logic can support HTTP requests, jobs, and future workers.",
            paragraphs: [
              "The current API surface covers health checks, activity listing, and Apple Health import submission, but the important point is not the endpoint count. The important point is that the API layer is intentionally treated as a transport boundary rather than the place where product logic accumulates.",
              "Requests flow through routers into services and repositories, with clear handoff points into ingestion parsers and ML-related capabilities. That shape matters because it lets the same logic support HTTP requests today, orchestration jobs tomorrow, and more specialized background workflows later without rewriting the core domain layer.",
              "From a product engineering perspective, this makes the system easier to evolve. The contract exposed to the frontend can grow while the backend stays organized around reusable business operations rather than route-specific code paths.",
            ],
            assets: [
              {
                title: "API architecture diagram",
                description:
                  "Show the request flow from client to router, services, repositories, ingestion, and ML.",
                format: "diagram",
                align: "right",
                sideNote:
                  "This should be the first technical visual in the article because it orients the reader immediately around backend boundaries.",
              },
              {
                title: "Endpoint reference screenshot",
                description:
                  "Capture the OpenAPI or Swagger view once the richer endpoint surface is ready.",
                format: "image",
                align: "center",
                bodyBelow:
                  "Use this after the architecture diagram so the write-up moves from abstract system design into concrete API surface area.",
              },
            ],
          },
          {
            title: "Infrastructure And Runtime",
            description:
              "The project is designed as a local-first product stack with service boundaries that map well to a more production-grade deployment later.",
            paragraphs: [
              "The runtime environment is set up as a local-first multi-service stack. Docker Compose brings together the FastAPI backend, PostgreSQL with PostGIS, MLflow, Dagster webserver, and the Dagster daemon, which gives the project a realistic operational backbone even during early product development.",
              "That matters because geospatial and ML-heavy products tend to break down when the local setup is too simplified. Here, spatial storage is already handled as a first-class concern through PostGIS, and orchestration plus model lifecycle tooling are part of the environment from the beginning instead of being deferred as a later infrastructure rewrite.",
              "The result is a development setup that moves quickly without collapsing architecture boundaries. It is still optimized for iteration, but it already suggests a clean path toward cloud deployment, managed services, and more isolated runtime responsibilities when the product needs to scale.",
            ],
            assets: [
              {
                title: "Service topology diagram",
                description:
                  "Map the containers and their responsibilities, including backend, database, orchestration, and MLflow.",
                format: "diagram",
                align: "left",
                sideNote:
                  "The goal here is to show that the local stack already mirrors real production concerns: storage, orchestration, API serving, and model lifecycle tooling.",
              },
              {
                title: "Local stack walkthrough",
                description:
                  "A short video showing boot, service health, and the moving parts of the development environment.",
                format: "video",
                align: "center",
              },
            ],
          },
          {
            title: "Machine Learning",
            description:
              "ML is a major product differentiator here, but the strongest story is the system design around the models, not just the models themselves.",
            paragraphs: [
              "Machine learning is one of the core reasons Altvia is interesting as a product. The stack already includes MLflow as the foundation for experiment tracking and future model registry workflows, which means the project is being framed around repeatable model development rather than one-off experiments.",
              "The repository structure also treats ML as part of the backend system, not as an isolated notebook folder. Feature engineering, training, persistence, and inference all have a place in the codebase, which is the right signal for a product that wants to turn analysis into a durable capability.",
              "The most important next step is the analysis story itself. The model evaluation narrative, confidence framing, and registry progression should become a visible part of the case study, and that section should stay explicitly marked as work in progress until the supporting artifacts are ready.",
            ],
            status: "Work in progress",
            assets: [
              {
                title: "MLflow registry screenshot",
                description:
                  "Show experiments, runs, candidate models, and the path toward model version promotion.",
                format: "image",
                align: "right",
                sideNote:
                  "This should emphasize the operational side of ML rather than only the notebook side: tracked runs, candidate versions, and promotion readiness.",
              },
              {
                title: "Model evaluation notebook export",
                description:
                  "Include charts for error bands, feature behavior, or confidence interval analysis once available.",
                format: "image",
                align: "left",
              },
              {
                title: "ML proof-of-concept demo",
                description:
                  "A video walking through prediction inputs, outputs, and what decisions the model is intended to support.",
                format: "video",
                align: "center",
                bodyBelow:
                  "This is also where the model analysis story can deepen later with confidence intervals, comparative results, and clear explanation of what the model should and should not be trusted to do.",
              },
            ],
          },
          {
            title: "Data Engineering Pipelines",
            description:
              "The ingestion story is what turns Altvia from a UI shell into a durable intelligence platform.",
            paragraphs: [
              "The data engineering story starts with Apple Health ingestion, which is a strong first use case because it forces the product to deal with file handling, validation, parsing, normalization, and persistence as part of one end-to-end workflow.",
              "Dagster provides the orchestration layer that turns those backend capabilities into repeatable pipelines. That creates room for imports, enrichments, backfills, and eventual ML workflows to exist inside a consistent operational model rather than as scattered scripts.",
              "What makes this especially solid is the reuse of the same service layer across request-driven flows and batch-style processing. That keeps the ingestion pipeline tied to the actual product domain instead of allowing two separate systems to drift apart over time.",
            ],
            assets: [
              {
                title: "Ingestion pipeline diagram",
                description:
                  "Visualize upload, raw import handling, parsing, normalization, persistence, and downstream enrichments.",
                format: "diagram",
                align: "right",
                sideNote:
                  "This image should clarify how a single user import fans out into parsing, normalization, persistence, and enrichment stages.",
              },
              {
                title: "Import lifecycle screenshots",
                description:
                  "Capture the import request flow and any future import job detail UI or admin views.",
                format: "image",
                align: "left",
              },
            ],
          },
          {
            title: "Current State And Scaling Path",
            description:
              "This is one of the most important sections because it proves the difference between what already exists, what is intentionally scoped for V1, and how the platform can grow without a rewrite.",
            paragraphs: [
              "Today, Altvia already has the core shape of a real platform. The local stack is in place, the API shell exists, the initial models and ingestion entry points are defined, orchestration has been introduced, and the frontend is already connected enough to validate system health and product direction.",
              "The near-term work is about depth rather than reinvention. End-to-end parsing, more complete activity normalization, background import execution, stronger schema evolution, and richer route or session analysis all build naturally on the existing architecture.",
              "The scaling path is also clear. Raw imports and artifacts can move into object storage, ingestion can shift to worker-driven execution, Postgres can become managed infrastructure, and ML training can be isolated into more specialized jobs. That is exactly the kind of progression you want in a system that is expected to mature rather than be rewritten.",
            ],
            assets: [
              {
                title: "Roadmap slide",
                description:
                  "Summarize what exists now, the next milestone, and the production-scale evolution path.",
                format: "diagram",
                align: "center",
              },
            ],
          },
        ],
      },
      {
        id: "frontend",
        label: "Frontend",
        intro:
          "The frontend side of Altvia should be presented as product design plus product engineering: how the interface frames movement data, how state is organized, and how the app turns backend capabilities into a coherent user experience.",
        sections: [
          {
            title: "Product Design And Experience",
            description:
              "The frontend should communicate that Altvia is not just a dashboard, but a guided analysis environment for training, terrain, and movement intelligence.",
            paragraphs: [
              "The frontend should be framed as a guided product experience for movement intelligence rather than a generic metrics dashboard. The product shell is meant to support overview, sessions, paths, planning, and analysis flows that build on each other.",
              "That means the interface has to help a reader understand both the product ambition and the interaction model. A good write-up should show how visual hierarchy leads a user from broad summaries into route-level and session-level detail without the interface feeling overloaded.",
              "The strongest frontend story is the combination of atmosphere and clarity. Geospatial surfaces, layered panels, and focused information density can make the product feel premium while still reading as a serious analysis tool.",
            ],
            assets: [
              {
                title: "Hero product screenshot",
                description:
                  "Capture the main dashboard or landing product shell with the strongest visual composition.",
                format: "image",
                align: "left",
                sideNote:
                  "Use the most visually confident screen here, ideally one that shows both the map surface and surrounding product context.",
              },
              {
                title: "Narrated frontend walkthrough",
                description:
                  "A short video moving through the main product flow from overview into route or session analysis.",
                format: "video",
                align: "center",
              },
            ],
          },
          {
            title: "Design Engineering And UI System",
            description:
              "This section should frame the frontend as intentional design engineering, not just component assembly.",
            paragraphs: [
              "From a design engineering standpoint, the frontend stack uses React, TypeScript, Vite, Tailwind CSS, and shadcn-style primitives to move quickly without giving up control over visual consistency.",
              "The interesting part is not simply the tool choice. It is how the interface system supports spacing rhythm, token-driven styling, reusable surfaces, and geospatial presentation without slipping into a generic dashboard aesthetic.",
              "That balance between product polish and analytical legibility is where the frontend becomes more than implementation. It becomes a meaningful part of how the product is understood and trusted.",
            ],
            assets: [
              {
                title: "UI system collage",
                description:
                  "Show cards, filters, map surfaces, chart styling, and any reusable tokens or components.",
                format: "image",
                align: "right",
              },
            ],
          },
          {
            title: "Frontend Architecture And State",
            description:
              "Recruiters should be able to see how the app is structured technically, not just visually.",
            paragraphs: [
              "The frontend architecture should be explained in terms of boundaries. Zustand manages app-level state, while route-level screens and reusable components keep concerns separated enough for the product to grow without becoming one monolithic page.",
              "This matters because the application is not a single-screen experience. It needs to support overview, planner, sessions, and map-heavy workflows while keeping server-backed data, loading states, and derived UI state coherent.",
              "A strong technical write-up should connect those ideas clearly: how data is fetched, how UI state is derived, how interactions propagate across the app, and how spatial views stay synchronized with backend responses.",
            ],
            assets: [
              {
                title: "Frontend state diagram",
                description:
                  "Map route screens, shared store responsibilities, and server interaction boundaries.",
                format: "diagram",
                align: "left",
                sideNote:
                  "This is the place to show how product routes, shared state, and API integrations stay organized as the app grows.",
              },
            ],
          },
          {
            title: "Backend Integration",
            description:
              "This section connects the frontend story back to the backend so the project reads as a real product system.",
            paragraphs: [
              "The backend integration layer is what turns the frontend from a visual shell into a real product client. A typed API boundary gives the interface a stable way to communicate with backend services while keeping fetch logic and response shapes consistent.",
              "Even in the current state, health checks, import submission, and activity-related flows show how backend capabilities are translated into user actions and product states. That is where product engineering becomes visible rather than abstract.",
              "As the platform grows, this integration layer becomes even more important because it is the hinge between user experience, ingestion workflows, route analysis, and eventually ML-backed insights.",
            ],
            assets: [
              {
                title: "Import flow screenshots",
                description:
                  "Capture the frontend states for upload, success, processing, and eventual results.",
                format: "image",
                align: "right",
                bodyBelow:
                  "If this becomes a long explanation, continue the narrative below the image rather than trying to force all the copy into a short side panel.",
              },
            ],
          },
        ],
      },
    ] as const satisfies readonly ProjectTab[],
  },
] as const;

export const writing = [
  {
    title: "How I Think About Shipping ML Systems in Production",
    type: "Essay idea",
    description:
      "A practical piece on where ML projects fail in production: feature drift, orchestration complexity, weak monitoring, and mismatched user expectations.",
  },
  {
    title: "Designing Geospatial Interfaces for High-Stakes Decisions",
    type: "Case study draft",
    description:
      "Lessons from building map-heavy tools for wildfire operations, including layer prioritization, progressive disclosure, and performance tradeoffs.",
  },
  {
    title: "From SaaS CRUD to Operational Platforms",
    type: "Article idea",
    description:
      "A comparison of product architecture choices when software moves from standard business workflows into real-time operational environments.",
  },
] as const;

export const connect = {
  title: "Let's Connect",
  description:
    "I'm interested in senior engineering roles, product-focused platform work, and consulting engagements where strong frontend execution needs to connect cleanly with backend, data, or ML systems.",
  email,
};
