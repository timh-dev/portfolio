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
  src?: string;
  diagramId?: "current-state" | "future-state";
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
    intro:
      "Altvia is a personal engineering project that combines the product ambitions of a consumer endurance platform with the system design expectations of a real data-intensive application. It ingests workout data from Apple Health exports, processes routes and sessions through a layered Python backend, enriches activities with weather and terrain context, applies machine learning for effort scoring and intensity prediction, and renders everything through a map-first React frontend. This write-up walks through the full system: why each technology was chosen, how the frontend delivers a polished analytical experience, how the backend is structured for reuse across HTTP and batch contexts, how Dagster orchestrates multi-stage data pipelines, how ML models produce a unified intensity framework, and where the architecture would evolve under production-scale constraints.",
    sections: [
      {
        title: "Platform & Stack Decisions",
        description:
          "Every technology in the stack was chosen to solve a specific problem rather than to follow convention. This section explains the reasoning behind each major choice and why alternatives were rejected.",
        paragraphs: [
          "The frontend is built with React 18, TypeScript, and Vite. React was the natural choice for a map-heavy, interaction-dense interface where component composition and fine-grained re-rendering matter. TypeScript provides the contract enforcement that keeps a growing frontend codebase navigable, especially when the data shapes flowing from the backend are complex and nested. Vite was chosen over Create React App and Webpack because it delivers sub-second hot module replacement during development and produces clean, tree-shaken production builds without configuration overhead. For a project where iteration speed on the UI directly affects how quickly product ideas can be validated, the developer experience gap between Vite and alternatives is meaningful.",
          "Tailwind CSS handles the design system layer. The decision to use Tailwind over a component library like Material UI or Chakra was deliberate: Altvia's visual identity is custom, with a dark cartographic palette, layered panels, and information-dense layouts that would fight against opinionated component libraries. Tailwind's utility-first approach lets the interface evolve without accumulating CSS specificity battles or override layers. Zustand manages application state because it provides a minimal, hook-based store without the boilerplate of Redux or the implicit re-render behavior of React Context at scale. For a single-developer project where state complexity is moderate but growing, Zustand hits the right balance between simplicity and capability.",
          "The backend uses FastAPI, which was chosen specifically because Altvia is a Python-first system. The data pipeline, ML models, geospatial processing, and ingestion parsers are all Python. Using a Python web framework means the API layer, background jobs, and analytical code all share the same runtime, the same type system, and the same package ecosystem. FastAPI's async support, automatic OpenAPI documentation, and Pydantic validation make it competitive with Node.js alternatives for API development speed while keeping the entire backend in one language. Django and Flask were considered but rejected: Django's ORM and admin conventions would have added weight without benefit for a spatial-first data model, and Flask's lack of async support and type-driven validation would have required more manual plumbing.",
          "PostgreSQL 16 with PostGIS 3.4 handles all persistent storage. This is arguably the most consequential infrastructure decision in the stack. PostGIS transforms PostgreSQL from a relational database into a geospatial-native storage engine that can index route geometries, compute spatial relationships, and support location-aware queries without requiring a separate GIS system. Every activity in Altvia has a route geometry, and the ability to store, query, and analyze those geometries alongside relational activity data in the same transactional store is what makes the architecture clean at this scale. A document store like MongoDB would have required a separate spatial index, and a pure relational database without PostGIS would have pushed geospatial logic into application code where it does not belong.",
          "Dagster provides orchestration, and this choice over Airflow was intentional. Dagster's asset-based programming model treats pipeline outputs as first-class objects with lineage, partitioning, and observability built in. Airflow's task-based DAG model is more mature but optimizes for scheduling rather than data asset management. For a project where the pipeline is fundamentally about transforming raw health exports into enriched, scored, and clustered activity records, Dagster's mental model aligns more naturally with the domain. Dagster also runs in-process during development, which eliminates the operational overhead of a separate scheduler and worker infrastructure during early iteration. MLflow handles experiment tracking and model artifact storage, providing a lightweight but sufficient foundation for comparing training runs, persisting model binaries, and eventually promoting models through a registry workflow.",
          "MapLibre GL renders the map layer on the frontend. It was chosen over Mapbox GL because it is fully open-source with no token-based pricing, which matters for a personal project that may be deployed publicly. MapLibre uses the same vector tile specification and styling language as Mapbox, so the ecosystem of basemap providers, tile servers, and styling tools remains available. CartoDB's Voyager basemap provides the visual foundation, offering a clean, muted cartographic style that works well as a backdrop for colored route overlays and data-driven styling.",
        ],
      },
      {
        title: "Frontend Product Experience",
        description:
          "The frontend is designed as a guided analytical environment where movement data is presented through map-first visualization, interactive route exploration, and planning tools that bridge athletic context with geospatial depth.",
        paragraphs: [
          "The map page is the core product surface. It renders all ingested activities as route geometries on a MapLibre GL canvas with a CartoDB Voyager basemap, and supports multiple visualization modes that color routes by different dimensions: pace, elevation gain, heart rate, and recency. Each mode transforms the same underlying route data into a different analytical lens, letting a user shift from understanding where they trained to understanding how they trained. The pace mode uses a green-to-red gradient that maps speed onto the route polyline, making it immediately visible where a runner slowed down on a climb or accelerated on a descent. The elevation mode highlights vertical gain with a blue-to-orange scale. The heart rate mode renders physiological intensity. The recency mode fades older activities to reveal training patterns over time.",
          "Route interaction goes beyond static rendering. Selecting an activity opens a detail panel with an elevation profile chart, session metrics, and the ability to play back the activity as an animated point moving along the route geometry. This playback feature is not cosmetic: it connects temporal workout data to spatial position, which is the fundamental relationship that makes endurance data meaningful. The elevation profile is rendered as a synchronized chart that highlights the current position during playback, creating a dual-view experience where the map and the chart reinforce each other.",
          "The planner page extends the map into a forward-looking tool. Users can sketch planned routes directly on the map, and the system will generate elevation profiles and estimated metrics for the planned activity. A planned swim view, for example, shows a route drawn across an open water course with distance markers and estimated duration based on the user's historical pace data. This planning capability turns Altvia from a retrospective analysis tool into a prospective training assistant, which is a meaningful product distinction.",
          "The landing and login pages establish the product's visual identity before a user reaches the analytical surfaces. The landing page uses the same dark cartographic palette as the map views, with layered panels and a hero composition that previews the map experience. The login page maintains visual continuity while handling authentication flows. These pages matter for the case study because they demonstrate that Altvia is designed as a complete product experience, not just a data visualization prototype.",
          "The 3D terrain views add a distinctive visual capability. Both hiking and running activities can be rendered in a three-dimensional perspective that drapes the route over terrain elevation data, creating a visceral representation of the landscape a workout traversed. This is technically implemented through MapLibre's terrain and hillshade layers combined with exaggerated elevation rendering, and it transforms flat route data into something that communicates physical experience in a way two-dimensional maps cannot.",
        ],
        assets: [
          {
            title: "Hiking activity with default visualization",
            description:
              "The primary map view showing a hiking route rendered on the CartoDB Voyager basemap with the activity detail panel open.",
            format: "image",
            src: "/images/altvia/hiking1.png",
            align: "center",
          },
          {
            title: "Cycling route visualization",
            description:
              "A cycling activity rendered on the map surface, demonstrating how different activity types are presented with appropriate metrics and route styling.",
            format: "image",
            src: "/images/altvia/cycling.png",
            align: "left",
            sideNote:
              "Cycling routes tend to cover more ground with smoother elevation profiles, and the visualization adapts to highlight speed variation rather than climbing intensity.",
          },
          {
            title: "Pace-colored route overlay",
            description:
              "The pace visualization mode applies a green-to-red gradient along the route polyline, making speed variation immediately visible across the full activity.",
            format: "image",
            src: "/images/altvia/hiking-pace.png",
            align: "right",
            sideNote:
              "Pace coloring is the most immediately useful analytical mode because it answers the question every endurance athlete asks: where did I slow down and why?",
          },
          {
            title: "Elevation gain visualization",
            description:
              "The elevation visualization mode highlights vertical gain across the route with a blue-to-orange color scale.",
            format: "image",
            src: "/images/altvia/hiking-elevation.png",
            align: "left",
            sideNote:
              "Elevation-colored routes reveal terrain structure that flat distance metrics obscure. Steep climbs become visually prominent even on short route segments.",
          },
          {
            title: "Heart rate intensity overlay",
            description:
              "The heart rate visualization mode renders physiological intensity along the route, connecting effort to terrain.",
            format: "image",
            src: "/images/altvia/hiking-hr.png",
            align: "right",
            sideNote:
              "Heart rate coloring bridges the gap between what the terrain demanded and how the body responded, which is the foundation of the effort scoring system.",
          },
          {
            title: "Planned swim route",
            description:
              "The planner view showing a manually sketched open-water swim route with distance markers and estimated duration.",
            format: "image",
            src: "/images/altvia/planned-swim.png",
            align: "center",
            bodyBelow:
              "The planning capability extends Altvia beyond retrospective analysis into prospective training support. Planned activities generate estimated metrics based on historical performance data, creating a feedback loop between past workouts and future intentions.",
          },
          {
            title: "Landing page",
            description:
              "The product landing page establishing Altvia's visual identity with the dark cartographic palette and layered panel composition.",
            format: "image",
            src: "/images/altvia/landing_page.jpeg",
            align: "left",
            sideNote:
              "The landing page previews the analytical experience before authentication, setting expectations for the depth of the product behind the login.",
          },
          {
            title: "3D terrain running view",
            description:
              "A running activity rendered in three-dimensional perspective, draping the route over terrain elevation data with exaggerated vertical scale.",
            format: "image",
            src: "/images/altvia/running-3d.jpeg",
            align: "center",
            bodyBelow:
              "3D terrain rendering transforms flat route data into a representation that communicates the physical experience of a workout. The exaggerated elevation makes climbs and descents viscerally legible in a way that two-dimensional maps and elevation charts cannot achieve independently.",
          },
        ],
      },
      {
        title: "Backend Architecture & API Design",
        description:
          "The backend is structured as a layered Python system where thin FastAPI routers delegate to a shared service layer that supports both HTTP requests and batch orchestration jobs, with PostGIS handling all geospatial storage natively.",
        paragraphs: [
          "The backend architecture follows a deliberate layering strategy: FastAPI routers handle HTTP transport concerns like validation, serialization, and response shaping, but they contain no business logic. All domain operations live in a service layer that can be called by routers, Dagster jobs, CLI scripts, or any future execution context without duplication. Below the services, a repository layer manages database access through SQLAlchemy models with PostGIS geometry columns. This shape is not novel, but it is remarkably uncommon in personal projects and early-stage products, where the temptation to put logic directly in route handlers creates systems that cannot be reused outside of HTTP contexts.",
          "The API surface currently exposes 15+ endpoints organized around activity management, health data import, route analysis, planning, and system operations. The activity endpoints support listing with pagination, filtering by type and date range, and individual activity retrieval with full route geometry and session metrics. The import endpoints handle Apple Health XML file upload, parse submission, and import job status tracking. Route analysis endpoints provide elevation profiles, pace breakdowns, and visualization data for the frontend's multi-mode map rendering. The planning endpoints support route creation, distance calculation, and estimated metric generation for planned activities.",
          "A key architectural pattern is deferred column loading for geometry data. Activity route geometries can be large, especially for long endurance sessions with high GPS sample rates. Loading full geometry data on every activity list request would be wasteful, so the repository layer uses SQLAlchemy's deferred loading to exclude geometry columns from default queries and only hydrate them when explicitly requested, such as when rendering a single activity's route on the map. This pattern keeps list views fast while preserving access to full spatial data when needed.",
          "External API integration follows a multi-provider fallback strategy for route operations. When the system needs to compute route distances, elevation profiles, or routing suggestions, it attempts Valhalla first as the primary open-source routing engine, falls back to OSRM if Valhalla is unavailable, and degrades gracefully to manual calculation from raw GPS coordinates as a last resort. This layered approach means the application never fails completely due to an external service outage, which is important for a system that processes historical data where route enrichment is not time-critical and can be retried.",
          "PostGIS geometry handling is a first-class concern throughout the backend. Route data is stored as PostGIS geometry types with appropriate spatial reference systems, and the repository layer handles coordinate transformation, geometry simplification for preview rendering, and bounding box queries for map viewport filtering. The decision to treat geospatial data as a database-native type rather than serializing coordinates as JSON arrays means the system can leverage PostGIS's spatial indexing, geometric operations, and query optimization rather than reimplementing those capabilities in Python application code.",
        ],
        assets: [
          {
            title: "Current-state architecture",
            description:
              "The current Altvia architecture: React frontend, FastAPI backend, PostgreSQL/PostGIS data layer, Dagster orchestration, and MLflow for experiment tracking. The API is thin and business logic is reusable across product requests and background jobs.",
            format: "diagram",
            diagramId: "current-state",
            align: "center",
            bodyBelow:
              "This architecture keeps the system compact while maintaining clean boundaries between transport, domain logic, data access, and orchestration. The same service layer is callable from both HTTP endpoints and Dagster jobs, which is the key design property that prevents logic duplication as the system grows.",
          },
          {
            title: "Dagster orchestration UI",
            description:
              "The Dagster asset graph showing the pipeline topology from ingestion through enrichment, scoring, and clustering.",
            format: "image",
            src: "/images/altvia/dagster.png",
            align: "center",
            bodyBelow:
              "Dagster's asset graph provides observability into pipeline execution without requiring custom monitoring infrastructure. Each node represents a materialized data asset with lineage tracking, partition awareness, and execution history.",
          },
        ],
      },
      {
        title: "Data Engineering & Orchestration",
        description:
          "Dagster manages a multi-stage asset pipeline that transforms raw Apple Health exports into enriched, scored, and clustered activity records through a sequence of well-defined data transformations.",
        paragraphs: [
          "The data engineering story begins with Apple Health import, which is a deceptively complex ingestion problem. Apple Health exports are large XML files containing heterogeneous health records: workouts, heart rate samples, route GPS coordinates, step counts, and dozens of other record types interleaved without consistent ordering. The ingestion pipeline must parse this XML efficiently, extract workout records with their associated route and heart rate data, normalize units and timestamps across different device sources, validate data completeness, and persist the results into PostgreSQL with proper PostGIS geometry types. This single workflow exercises file handling, streaming XML parsing, data validation, coordinate system transformation, and transactional database writes, which makes it a strong foundation for a data engineering case study.",
          "Dagster orchestrates this pipeline as a sequence of asset materializations rather than a traditional task DAG. The distinction matters. In Airflow's model, you define tasks that run in order. In Dagster's model, you define data assets that depend on other data assets, and the framework resolves execution order, tracks lineage, manages partitions, and provides observability over the materialized state of each asset. For Altvia, this means the pipeline is expressed as: raw Apple Health import → parsed workout records → normalized activities → persisted activity records → weather-enriched activities → effort-scored activities → clustered activities → intensity predictions. Each node in this chain is an independently materializable, observable, and testable data asset.",
          "The weather enrichment stage demonstrates how the pipeline adds analytical value beyond what the raw data contains. After activities are persisted with their timestamps and route geometries, the pipeline queries Open-Meteo's historical weather API to retrieve temperature, humidity, wind speed, and precipitation data for each activity's location and time window. This weather context is cached to avoid redundant API calls during reprocessing, and it feeds into the effort scoring model as a feature that captures environmental conditions that affect workout difficulty. A hot, humid run at sea level produces different physiological stress than the same pace in cool, dry conditions, and the weather enrichment makes that distinction quantifiable.",
          "Batch processing patterns are designed around Dagster's partition and job system. The pipeline defines 7 pre-configured jobs that cover different operational needs: full import from a new Apple Health export, incremental import for new activities only, weather backfill for activities missing environmental data, effort score recalculation when the scoring formula is updated, cluster reassignment when new activities shift the clustering boundaries, intensity model retraining when sufficient new labeled data accumulates, and a full pipeline run that executes all stages end-to-end. This job organization means the system can be operated with targeted, efficient runs rather than always-on full pipeline execution.",
          "The choice of Dagster over Airflow was motivated by three factors beyond the asset-based programming model. First, Dagster runs in-process during development, which means the pipeline can be tested and iterated on without deploying a separate scheduler, worker, and metadata database. Second, Dagster's type system and I/O managers provide structured interfaces between pipeline stages rather than relying on XCom-style implicit data passing. Third, Dagster's built-in development UI provides immediate visibility into asset status, execution history, and pipeline topology without requiring external monitoring infrastructure. For a single-developer project where operational overhead directly competes with feature development time, these developer experience advantages are decisive.",
        ],
        assets: [
          {
            title: "Dagster pipeline view",
            description:
              "The Dagster webserver showing the asset pipeline topology and execution state across ingestion, enrichment, and ML stages.",
            format: "image",
            src: "/images/altvia/dagster.png",
            align: "center",
            bodyBelow:
              "The asset graph makes pipeline dependencies visually explicit. Each node shows its materialization status, execution time, and upstream lineage, which turns pipeline debugging from log-spelunking into visual inspection.",
          },
        ],
      },
      {
        title: "Machine Learning Systems",
        description:
          "Three distinct ML approaches operate on a unified 0-100 intensity scale: a deterministic effort score from exercise physiology, unsupervised clustering that groups activities into relative intensity tiers, and a supervised model that predicts effort for planned workouts.",
        paragraphs: [
          "The ML system in Altvia is organized around a single conceptual question with three different analytical angles: how hard was a workout, how does it compare to other workouts, and how hard will a planned workout be? Each angle requires a fundamentally different modeling approach, and the system's value comes from combining all three into a unified intensity framework that maps onto a shared 0-100 scale. This unified scale is what makes the results actionable: a user can compare an effort score of 72 from a completed hike against a predicted intensity of 68 for a planned run, even though the underlying computations are entirely different.",
          "The Effort Score uses a deterministic TRIMP (Training Impulse) formula grounded in exercise physiology research. TRIMP calculates a single number that represents the total physiological load of a workout by integrating heart rate data over time, weighted by intensity zones. The formula accounts for duration, average heart rate relative to resting and maximum heart rate, and an exponential weighting factor that makes high-intensity minutes count disproportionately more than low-intensity minutes. This is not a machine learning model in the predictive sense: it is a validated physiological formula that produces repeatable, interpretable results. The advantage of using TRIMP as the base effort metric is that it captures actual physiological cost rather than proxy metrics like distance or pace, which can be misleading across different terrain, weather, and activity types.",
          "Workout Clustering uses unsupervised KMeans to group activities into 6 intensity tiers per activity type. The clustering operates on a feature space that includes duration, distance, elevation gain, average pace, and effort score, and it learns natural groupings within each activity type independently. A hiking cluster analysis might separate short flat walks from moderate half-day hikes from strenuous alpine scrambles, while a running cluster analysis would find different natural groupings based on that sport's intensity distribution. The clustering result for each activity is a relative intensity tier, where tier 1 represents the easiest cluster and tier 6 represents the hardest, mapped onto the 0-100 scale. This provides a within-distribution comparison that the absolute TRIMP score cannot: an effort score of 45 might be moderate for running but extremely high for swimming, and clustering captures that sport-specific context.",
          "The Intensity Predictor uses a supervised HistGradientBoostingRegressor to forecast effort for planned activities that do not yet have heart rate data. The model is trained on completed activities where the actual effort score is known, using features that are available before a workout happens: planned distance, estimated elevation gain, activity type, time of day, and historical performance trends. The prediction includes confidence intervals derived from the model's prediction distribution, which lets the UI communicate both the expected effort and the uncertainty around that prediction. A planned route through familiar terrain with many similar historical activities will produce a tight confidence interval, while a novel route or activity type will show wider bands, honestly reflecting the model's uncertainty.",
          "MLflow manages the experiment tracking and model artifact lifecycle. Every training run logs hyperparameters, evaluation metrics, feature importances, and the serialized model artifact. Models are persisted with joblib for efficient loading during inference. The current workflow tracks experiments locally through MLflow's file-based backend, but the architecture supports promotion to a model registry with stage-based lifecycle management when the system matures. This ML section is explicitly marked as expandable because the model evaluation narrative, including detailed error analysis, cross-validation results, and feature behavior visualization, will deepen as more training data accumulates and the notebook-driven analysis work progresses.",
        ],
        status: "Work in progress",
        assets: [
          {
            title: "Cluster assignments by distance and duration",
            description:
              "Scatter plot showing how KMeans assigns activities to intensity tiers based on distance and duration features, with cluster boundaries visible.",
            format: "image",
            src: "/images/altvia/Cluster Assignments Distance vs Duration.png",
            align: "left",
            sideNote:
              "The distance vs. duration view reveals the natural groupings that the clustering algorithm discovers. Short, quick activities cluster separately from long endurance sessions, with intermediate tiers capturing the gradations between them.",
          },
          {
            title: "Cluster assignments by pace and elevation",
            description:
              "Scatter plot showing cluster assignments in the pace vs. elevation gain feature space, highlighting how terrain difficulty creates distinct intensity groupings.",
            format: "image",
            src: "/images/altvia/Cluster Assignments Pace vs Elevation Gain.png",
            align: "right",
            sideNote:
              "The pace vs. elevation view captures a different dimension of intensity. Activities with similar pace but different elevation gain separate into distinct clusters, reflecting the additional physiological cost of climbing.",
          },
        ],
      },
      {
        title: "Future Architecture",
        description:
          "This section architects the features and infrastructure changes that would be required to evolve Altvia from a local-first product into a production-scale platform, including authentication, route intelligence, social features, and storage tiering.",
        paragraphs: [
          "Authentication is the most immediate gap between the current system and a deployable product. The planned implementation uses JWT tokens for stateless API authentication, with OAuth integration for Strava and Apple Health APIs that would enable direct activity sync without manual file export. Session management would use short-lived access tokens with refresh token rotation, and role-based access control would support the distinction between free and premium feature tiers. The authentication layer would sit in front of FastAPI as middleware, validating tokens and injecting user context into the request pipeline without requiring changes to the service layer beneath it.",
          "Route similarity is an analytically rich feature that leverages PostGIS's spatial query capabilities. The core idea is to answer whether a user has worked out on similar routes before, which enables training pattern analysis, personal record tracking on specific courses, and progressive overload recommendations. The implementation would use PostGIS spatial distance functions like ST_HausdorffDistance and ST_FrechetDistance to compute geometric similarity between route geometries, with corridor-based matching that identifies routes sharing significant overlap even if they differ at the start or end. This is a computationally expensive operation that would need to be pre-computed and cached, but it transforms the route data from isolated tracks into a connected graph of related training experiences.",
          "Social features would extend Altvia from a personal analytics tool into a community platform. The planned design includes a friend workouts feed showing recent activity from connected users, shared route collections that let groups maintain lists of favorite courses, leaderboards for specific route segments, and privacy controls that give users granular control over what activity data is visible to others. These features are architecturally significant because they introduce multi-user read patterns, fan-out writes for feed generation, and privacy-aware query filtering that affect database schema design, caching strategy, and API authorization logic.",
          "The scaling path from local-first to production-ready follows a clear progression. Ingestion would shift from synchronous file upload to event-driven processing where uploads are accepted quickly and heavy parsing moves into background workers consuming from a message queue. Storage would tier into hot, warm, and cold layers: recent activity data and summary geometries in PostgreSQL for fast access, historical route archives in object storage, and analytical aggregates in a warehouse for reporting and model training. The ML pipeline would move from in-process Dagster execution to isolated training jobs with managed compute, and model serving would split between batch pre-computation for common predictions and selective online inference for high-value real-time interactions. Managed infrastructure would replace Docker Compose: hosted PostgreSQL with PostGIS, managed message queues, container orchestration for the API and workers, and separated environments for development, staging, and production.",
        ],
        assets: [
          {
            title: "Current-state architecture",
            description:
              "The current Altvia architecture: React frontend, FastAPI backend, PostgreSQL/PostGIS, Dagster orchestration, and MLflow tracking.",
            format: "diagram",
            diagramId: "current-state",
            align: "center",
            bodyBelow:
              "The current architecture is intentionally compact. A React frontend, FastAPI backend, PostgreSQL/PostGIS data layer, Dagster orchestration, and MLflow for experiment tracking. The design keeps the API thin and the business logic reusable across product requests and background jobs.",
          },
          {
            title: "Future-state architecture",
            description:
              "The production-scale architecture with event-driven ingestion, storage tiering, service decomposition, and an ML platform.",
            format: "diagram",
            diagramId: "future-state",
            align: "center",
            bodyBelow:
              "If Altvia were pushed toward Strava-scale usage, the architecture would need to become event-driven and storage-tiered. Uploads would be accepted quickly, heavy enrichments would move into queues and workers, route data would split across hot geospatial stores and cold object storage, and ML would rely more on batch and cached inference than universal real-time scoring.",
          },
        ],
      },
    ] as const satisfies readonly ProjectSection[],
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
