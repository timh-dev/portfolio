export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#experience" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Writing", href: "#writing" },
] as const;

export const intro = {
  name: "Tim Holmes",
  role: "Lead Full-Stack Developer · ML Engineer · Geospatial Systems Builder",
  summary: [
    "I'm Tim Holmes, a software engineer focused on full-stack product development, cloud systems, and applied machine learning. I have 8+ years of experience building production applications with React, TypeScript, Python, and AWS across wildfire operations and financial services.",
    "I've built end-to-end products that span frontend interfaces, backend services, data pipelines, and infrastructure. My recent work has centered on geospatial tools, operational dashboards, and ML-powered decision systems that need to perform reliably under real-world pressure.",
    "Currently, I'm looking for new tech roles and selective freelance work. I am especially interested in projects where product thinking, strong engineering execution, and modern frontend development need to come together cleanly.",
  ],
  location: "Based in the United States, working remotely",
  cta: {
    label: "Get in touch",
    href: "mailto:tim@gmail.com",
  },
  links: [
    { label: "GitHub", href: "https://github.com/timh-dev" },
  ],
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

export const caseStudies = [
  {
    title: "Wildfire Operations Platform",
    subtitle: "Real-time monitoring and decision support for utility operations",
    description:
      "A cloud-based dashboard and planning suite for wildfire operations, combining live weather, forecast layers, map intelligence, and asset monitoring into a tool used for operational response and planning.",
    impact: [
      "React, TypeScript, MapLibre GL, Deck.gl, FastAPI, AWS Lambda",
      "WebSocket and REST APIs for live operational updates",
      "Terraform-managed cloud infrastructure across multiple environments",
    ],
  },
  {
    title: "Utility Risk Modeling Pipeline",
    subtitle: "Machine learning and data engineering for hourly risk scoring",
    description:
      "A production ML and data platform for scoring wildfire-related utility risk across large service territories, using distributed AWS services, feature engineering pipelines, and analytical marts for both daily operations and long-term planning.",
    impact: [
      "SageMaker Pipelines, Glue, Athena, Iceberg, dbt, Step Functions",
      "Five deployed ML models with automated orchestration",
      "Daily and hourly outputs for operational and planning decisions",
    ],
  },
  {
    title: "Vision Web Retirement SaaS",
    subtitle: "Multi-tenant product engineering in regulated financial services",
    description:
      "A multi-tenant retirement planning SaaS platform that combined modern SPA UX, complex financial computation, external integrations, and audit-friendly data design for regulated financial workflows.",
    impact: [
      "Laravel, Vue 3, MySQL, Redis, Docker, GitHub Actions",
      "Parallel API integrations with external providers",
      "Immutable history across financial assumption models",
    ],
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
  email: "tim@gmail.com",
};
