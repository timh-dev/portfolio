import solarGraphBody     from '@/blog/solar-graph-math.md?raw';
import shippingMlBody    from '@/blog/shipping-ml-production.md?raw';
import geospatialBody    from '@/blog/geospatial-interfaces.md?raw';
import saasBody          from '@/blog/saas-to-operational.md?raw';
import modularGridWriteup from '@/projects/modular-grid-page.md?raw';

export type ProjectAsset = {
  title:       string;
  description: string;
  format:      'image' | 'video' | 'diagram';
  src?:        string;
  diagramId?:  'current-state' | 'future-state' | 'langhome-architecture' | 'langhome-future';
  align?:      'left' | 'right' | 'center';
  sideNote?:   string;
  bodyBelow?:  string;
};

export type ProjectSection = {
  title:       string;
  description: string;
  paragraphs:  readonly string[];
  assets?:     readonly ProjectAsset[];
  status?:     string;
};

// ── Config ───────────────────────────────────────────────────────────────────

export type Layout      = 'centered' | 'split' | 'poster';
export type Availability = 'open' | 'freelance' | 'employed' | '';

export const config = {
  name:         import.meta.env.VITE_DISPLAY_NAME  || 'Your Name',
  initials:     import.meta.env.VITE_INITIALS      || 'YN',
  email:        import.meta.env.VITE_EMAIL         || 'you@example.com',
  role:         import.meta.env.VITE_ROLE          || 'Full-Stack · ML Engineer',
  location:     import.meta.env.VITE_LOCATION      || 'United States',
  layout:      (import.meta.env.VITE_LAYOUT        || 'poster') as Layout,
  heroSketch:   import.meta.env.VITE_HERO_SKETCH,
  availability:(import.meta.env.VITE_AVAILABILITY  || '') as Availability,
  links: {
    github:   import.meta.env.VITE_GITHUB_URL   || '',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || '',
    twitter:  import.meta.env.VITE_TWITTER_URL  || '',
  },
};

// ── Intro ────────────────────────────────────────────────────────────────────

export const intro =
  'I build production software end-to-end — frontend interfaces, backend services, ' +
  'data pipelines, and cloud infrastructure. Most recently across wildfire operations ' +
  'and financial services. Outside of code, I\'m usually somewhere with a camera ' +
  'and too much elevation gain.';

// ── Experience ───────────────────────────────────────────────────────────────

export type ExperienceItem = {
  date:     string;
  role:     string;
  company:  string;
  desc:     string;
  bullets?: string[];
};

export const experience: ExperienceItem[] = [
  {
    date:    'Oct 2023\n— Present',
    role:    'Lead Full-Stack Developer',
    company: 'Logic20/20',
    desc:    'Cloud-native wildfire operations software — real-time dashboards, geospatial planning tools, and AWS infrastructure.',
    bullets: [
      'React 18, TypeScript, Python monorepo serving two production apps.',
      '13 Lambda microservices for live asset monitoring and weather streaming.',
      'Layered caching and observability through the 2024/2025 wildfire season.',
    ],
  },
  {
    date:    'Aug 2022\n— Oct 2023',
    role:    'Developer / ML Engineer',
    company: 'Logic20/20',
    desc:    'End-to-end ML and data systems for utility wildfire risk modeling.',
    bullets: [
      'Five production ML models on SageMaker: XGBoost, logistic regression.',
      '277+ model dbt project on Athena/Iceberg integrating weather, GIS, satellite.',
      'Hourly scoring flows with Glue, Step Functions, SageMaker Pipelines.',
    ],
  },
  {
    date:    'Jun 2018\n— Aug 2022',
    role:    'Software Engineer',
    company: 'ProManage LLC',
    desc:    'Multi-tenant retirement planning SaaS with financial computation workflows.',
    bullets: [
      'Laravel, Vue 3, MySQL — multi-tenant subdomains and large SPA surface.',
      'Async PHP-to-Matlab financial modeling via Redis queues.',
    ],
  },
];

// ── Projects ─────────────────────────────────────────────────────────────────

export type Project = {
  tag:         string;
  title:       string;
  slug:        string;
  description: string;
  stack:       string[];
  liveUrl?:    string;
  codeUrl?:    string;
  writeup?:    string;
  subtitle?:   string;
  status?:     string;
  intro?:      string;
  sections?:   readonly ProjectSection[];
};

export const projects: Project[] = [
  {
    tag:         'Open Source',
    title:       'Modular Grid Page',
    slug:        'modular-grid-page',
    description: 'A themeable, configurable browser homepage built with React and Canvas. Features a solar graph, WebGL image shaders, weather, bookmarks, and a command palette.',
    stack:       ['React', 'Canvas', 'WebGL', 'Vite'],
    liveUrl:     'https://box-start-page.vercel.app/',
    codeUrl:     `${config.links.github}/startup-page`,
    writeup:     modularGridWriteup,
  },
  {
    tag:         'Full Stack',
    title:       'Wildfire Ops Platform',
    slug:        'wildfire-ops',
    description: 'Real-time operational wildfire dashboard. Live asset monitoring, geospatial planning, weather streaming, and forecasting across a pnpm monorepo.',
    stack:       ['React', 'TypeScript', 'MapLibre', 'Lambda'],
  },
  {
    tag:         'ML Engineering',
    title:       'Utility Risk Modeling',
    slug:        'utility-risk-modeling',
    description: 'End-to-end pipeline for utility wildfire risk — XGBoost training, hourly production scoring via SageMaker Pipelines, and 277+ model dbt project on Athena/Iceberg.',
    stack:       ['Python', 'SageMaker', 'dbt', 'Athena'],
  },
  {
    tag:         'Infrastructure',
    title:       'Retirement Planning SaaS',
    slug:        'retirement-saas',
    description: 'Multi-tenant retirement planning platform with financial computation engine, third-party integrations, immutable audit history, and compliance-oriented data design.',
    stack:       ['Laravel', 'Vue 3', 'MySQL', 'Redis'],
  },
  {
    tag:         'Full Stack · ML · Data',
    title:       'Altvia',
    slug:        'altvia',
    subtitle:    'Geospatial endurance intelligence platform',
    description: 'A full-stack product for activity ingestion, route-aware analysis, and endurance performance intelligence built across frontend product design, backend services, geospatial tooling, data workflows, and ML foundations.',
    status:      'Work in progress',
    stack:       ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'PostGIS', 'Dagster', 'MLflow', 'MapLibre'],
    intro:       'Altvia is a personal engineering project that combines the product ambitions of a consumer endurance platform with the system design expectations of a real data-intensive application. It ingests workout data from Apple Health exports, processes routes and sessions through a layered Python backend, enriches activities with weather and terrain context, applies machine learning for effort scoring and intensity prediction, and renders everything through a map-first React frontend. This write-up walks through the full system: why each technology was chosen, how the frontend delivers a polished analytical experience, how the backend is structured for reuse across HTTP and batch contexts, how Dagster orchestrates multi-stage data pipelines, how ML models produce a unified intensity framework, and where the architecture would evolve under production-scale constraints.',
    sections: [
      {
        title:       'Platform & Stack Decisions',
        description: 'Every technology in the stack was chosen to solve a specific problem rather than to follow convention. This section explains the reasoning behind each major choice and why alternatives were rejected.',
        paragraphs: [
          'The frontend is built with React 18, TypeScript, and Vite. React was the natural choice for a map-heavy, interaction-dense interface where component composition and fine-grained re-rendering matter. TypeScript provides the contract enforcement that keeps a growing frontend codebase navigable, especially when the data shapes flowing from the backend are complex and nested. Vite was chosen over Create React App and Webpack because it delivers sub-second hot module replacement during development and produces clean, tree-shaken production builds without configuration overhead. For a project where iteration speed on the UI directly affects how quickly product ideas can be validated, the developer experience gap between Vite and alternatives is meaningful.',
          'Tailwind CSS handles the design system layer. The decision to use Tailwind over a component library like Material UI or Chakra was deliberate: Altvia\'s visual identity is custom, with a dark cartographic palette, layered panels, and information-dense layouts that would fight against opinionated component libraries. Tailwind\'s utility-first approach lets the interface evolve without accumulating CSS specificity battles or override layers. Zustand manages application state because it provides a minimal, hook-based store without the boilerplate of Redux or the implicit re-render behavior of React Context at scale. For a single-developer project where state complexity is moderate but growing, Zustand hits the right balance between simplicity and capability.',
          'The backend uses FastAPI, which was chosen specifically because Altvia is a Python-first system. The data pipeline, ML models, geospatial processing, and ingestion parsers are all Python. Using a Python web framework means the API layer, background jobs, and analytical code all share the same runtime, the same type system, and the same package ecosystem. FastAPI\'s async support, automatic OpenAPI documentation, and Pydantic validation make it competitive with Node.js alternatives for API development speed while keeping the entire backend in one language.',
          'PostgreSQL 16 with PostGIS 3.4 handles all persistent storage. PostGIS transforms PostgreSQL from a relational database into a geospatial-native storage engine that can index route geometries, compute spatial relationships, and support location-aware queries without requiring a separate GIS system. Every activity in Altvia has a route geometry, and the ability to store, query, and analyze those geometries alongside relational activity data in the same transactional store is what makes the architecture clean at this scale.',
          'Dagster provides orchestration, and this choice over Airflow was intentional. Dagster\'s asset-based programming model treats pipeline outputs as first-class objects with lineage, partitioning, and observability built in. Airflow\'s task-based DAG model is more mature but optimizes for scheduling rather than data asset management. For a project where the pipeline is fundamentally about transforming raw health exports into enriched, scored, and clustered activity records, Dagster\'s mental model aligns more naturally with the domain.',
        ],
      },
      {
        title:       'Frontend Product Experience',
        description: 'The frontend is designed as a guided analytical environment where movement data is presented through map-first visualization, interactive route exploration, and planning tools that bridge athletic context with geospatial depth.',
        paragraphs: [
          'The map page is the core product surface. It renders all ingested activities as route geometries on a MapLibre GL canvas with a CartoDB Voyager basemap, and supports multiple visualization modes that color routes by different dimensions: pace, elevation gain, heart rate, and recency. Each mode transforms the same underlying route data into a different analytical lens, letting a user shift from understanding where they trained to understanding how they trained.',
          'Route interaction goes beyond static rendering. Selecting an activity opens a detail panel with an elevation profile chart, session metrics, and the ability to play back the activity as an animated point moving along the route geometry. The elevation profile is rendered as a synchronized chart that highlights the current position during playback, creating a dual-view experience where the map and the chart reinforce each other.',
          'The planner page extends the map into a forward-looking tool. Users can sketch planned routes directly on the map, and the system will generate elevation profiles and estimated metrics for the planned activity. This planning capability turns Altvia from a retrospective analysis tool into a prospective training assistant, which is a meaningful product distinction.',
          'The 3D terrain views add a distinctive visual capability. Both hiking and running activities can be rendered in a three-dimensional perspective that drapes the route over terrain elevation data, creating a visceral representation of the landscape a workout traversed. This is technically implemented through MapLibre\'s terrain and hillshade layers combined with exaggerated elevation rendering.',
        ],
        assets: [
          { title: 'Hiking activity with default visualization', description: 'The primary map view showing a hiking route rendered on the CartoDB Voyager basemap with the activity detail panel open.', format: 'image', src: '/images/altvia/hiking1.png', align: 'center' },
          { title: 'Cycling route visualization', description: 'A cycling activity rendered on the map surface, demonstrating how different activity types are presented with appropriate metrics and route styling.', format: 'image', src: '/images/altvia/cycling.png', align: 'left', sideNote: 'Cycling routes tend to cover more ground with smoother elevation profiles, and the visualization adapts to highlight speed variation rather than climbing intensity.' },
          { title: 'Pace-colored route overlay', description: 'The pace visualization mode applies a green-to-red gradient along the route polyline, making speed variation immediately visible across the full activity.', format: 'image', src: '/images/altvia/hiking-pace.png', align: 'right', sideNote: 'Pace coloring is the most immediately useful analytical mode because it answers the question every endurance athlete asks: where did I slow down and why?' },
          { title: 'Elevation gain visualization', description: 'The elevation visualization mode highlights vertical gain across the route with a blue-to-orange color scale.', format: 'image', src: '/images/altvia/hiking-elevation.png', align: 'left', sideNote: 'Elevation-colored routes reveal terrain structure that flat distance metrics obscure. Steep climbs become visually prominent even on short route segments.' },
          { title: 'Heart rate intensity overlay', description: 'The heart rate visualization mode renders physiological intensity along the route, connecting effort to terrain.', format: 'image', src: '/images/altvia/hiking-hr.png', align: 'right', sideNote: 'Heart rate coloring bridges the gap between what the terrain demanded and how the body responded, which is the foundation of the effort scoring system.' },
          { title: 'Planned swim route', description: 'The planner view showing a manually sketched open-water swim route with distance markers and estimated duration.', format: 'image', src: '/images/altvia/planned-swim.png', align: 'center', bodyBelow: 'The planning capability extends Altvia beyond retrospective analysis into prospective training support. Planned activities generate estimated metrics based on historical performance data, creating a feedback loop between past workouts and future intentions.' },
          { title: 'Landing page', description: 'The product landing page establishing Altvia\'s visual identity with the dark cartographic palette and layered panel composition.', format: 'image', src: '/images/altvia/landing_page.jpeg', align: 'left', sideNote: 'The landing page previews the analytical experience before authentication, setting expectations for the depth of the product behind the login.' },
          { title: '3D terrain running view', description: 'A running activity rendered in three-dimensional perspective, draping the route over terrain elevation data with exaggerated vertical scale.', format: 'image', src: '/images/altvia/running-3d.jpeg', align: 'center', bodyBelow: '3D terrain rendering transforms flat route data into a representation that communicates the physical experience of a workout. The exaggerated elevation makes climbs and descents viscerally legible in a way that two-dimensional maps and elevation charts cannot achieve independently.' },
        ],
      },
      {
        title:       'Backend Architecture & API Design',
        description: 'The backend is structured as a layered Python system where thin FastAPI routers delegate to a shared service layer that supports both HTTP requests and batch orchestration jobs, with PostGIS handling all geospatial storage natively.',
        paragraphs: [
          'The backend architecture follows a deliberate layering strategy: FastAPI routers handle HTTP transport concerns like validation, serialization, and response shaping, but they contain no business logic. All domain operations live in a service layer that can be called by routers, Dagster jobs, CLI scripts, or any future execution context without duplication. Below the services, a repository layer manages database access through SQLAlchemy models with PostGIS geometry columns.',
          'The API surface currently exposes 15+ endpoints organized around activity management, health data import, route analysis, planning, and system operations. The activity endpoints support listing with pagination, filtering by type and date range, and individual activity retrieval with full route geometry and session metrics.',
          'A key architectural pattern is deferred column loading for geometry data. Activity route geometries can be large, especially for long endurance sessions with high GPS sample rates. Loading full geometry data on every activity list request would be wasteful, so the repository layer uses SQLAlchemy\'s deferred loading to exclude geometry columns from default queries and only hydrate them when explicitly requested.',
          'External API integration follows a multi-provider fallback strategy for route operations. When the system needs to compute route distances, elevation profiles, or routing suggestions, it attempts Valhalla first as the primary open-source routing engine, falls back to OSRM if Valhalla is unavailable, and degrades gracefully to manual calculation from raw GPS coordinates as a last resort.',
        ],
        assets: [
          { title: 'Current-state architecture', description: 'The current Altvia architecture: React frontend, FastAPI backend, PostgreSQL/PostGIS data layer, Dagster orchestration, and MLflow for experiment tracking.', format: 'diagram', diagramId: 'current-state', align: 'center', bodyBelow: 'This architecture keeps the system compact while maintaining clean boundaries between transport, domain logic, data access, and orchestration. The same service layer is callable from both HTTP endpoints and Dagster jobs, which is the key design property that prevents logic duplication as the system grows.' },
          { title: 'Dagster orchestration UI', description: 'The Dagster asset graph showing the pipeline topology from ingestion through enrichment, scoring, and clustering.', format: 'image', src: '/images/altvia/dagster.png', align: 'center', bodyBelow: 'Dagster\'s asset graph provides observability into pipeline execution without requiring custom monitoring infrastructure. Each node represents a materialized data asset with lineage tracking, partition awareness, and execution history.' },
        ],
      },
      {
        title:       'Data Engineering & Orchestration',
        description: 'Dagster manages a multi-stage asset pipeline that transforms raw Apple Health exports into enriched, scored, and clustered activity records through a sequence of well-defined data transformations.',
        paragraphs: [
          'The data engineering story begins with Apple Health import, which is a deceptively complex ingestion problem. Apple Health exports are large XML files containing heterogeneous health records: workouts, heart rate samples, route GPS coordinates, step counts, and dozens of other record types interleaved without consistent ordering. The ingestion pipeline must parse this XML efficiently, extract workout records with their associated route and heart rate data, normalize units and timestamps across different device sources, validate data completeness, and persist the results into PostgreSQL with proper PostGIS geometry types.',
          'Dagster orchestrates this pipeline as a sequence of asset materializations rather than a traditional task DAG. The distinction matters. In Airflow\'s model, you define tasks that run in order. In Dagster\'s model, you define data assets that depend on other data assets, and the framework resolves execution order, tracks lineage, manages partitions, and provides observability over the materialized state of each asset.',
          'The weather enrichment stage demonstrates how the pipeline adds analytical value beyond what the raw data contains. After activities are persisted with their timestamps and route geometries, the pipeline queries Open-Meteo\'s historical weather API to retrieve temperature, humidity, wind speed, and precipitation data for each activity\'s location and time window. This weather context feeds into the effort scoring model as a feature that captures environmental conditions that affect workout difficulty.',
          'Batch processing patterns are designed around Dagster\'s partition and job system. The pipeline defines 7 pre-configured jobs that cover different operational needs: full import from a new Apple Health export, incremental import for new activities only, weather backfill for activities missing environmental data, effort score recalculation when the scoring formula is updated, and cluster reassignment when new activities shift the clustering boundaries.',
        ],
        assets: [
          { title: 'Dagster pipeline view', description: 'The Dagster webserver showing the asset pipeline topology and execution state across ingestion, enrichment, and ML stages.', format: 'image', src: '/images/altvia/dagster.png', align: 'center', bodyBelow: 'The asset graph makes pipeline dependencies visually explicit. Each node shows its materialization status, execution time, and upstream lineage, which turns pipeline debugging from log-spelunking into visual inspection.' },
        ],
      },
      {
        title:       'Machine Learning Systems',
        description: 'Three distinct ML approaches operate on a unified 0-100 intensity scale: a deterministic effort score from exercise physiology, unsupervised clustering that groups activities into relative intensity tiers, and a supervised model that predicts effort for planned workouts.',
        status:      'Work in progress',
        paragraphs: [
          'The ML system in Altvia is organized around a single conceptual question with three different analytical angles: how hard was a workout, how does it compare to other workouts, and how hard will a planned workout be? Each angle requires a fundamentally different modeling approach, and the system\'s value comes from combining all three into a unified intensity framework that maps onto a shared 0-100 scale.',
          'The Effort Score uses a deterministic TRIMP (Training Impulse) formula grounded in exercise physiology research. TRIMP calculates a single number that represents the total physiological load of a workout by integrating heart rate data over time, weighted by intensity zones. This is not a machine learning model in the predictive sense: it is a validated physiological formula that produces repeatable, interpretable results.',
          'Workout Clustering uses unsupervised KMeans to group activities into 6 intensity tiers per activity type. The clustering operates on a feature space that includes duration, distance, elevation gain, average pace, and effort score, and it learns natural groupings within each activity type independently.',
          'The Intensity Predictor uses a supervised HistGradientBoostingRegressor to forecast effort for planned activities that do not yet have heart rate data. The model is trained on completed activities where the actual effort score is known, using features that are available before a workout happens: planned distance, estimated elevation gain, activity type, time of day, and historical performance trends.',
        ],
        assets: [
          { title: 'Cluster assignments by distance and duration', description: 'Scatter plot showing how KMeans assigns activities to intensity tiers based on distance and duration features, with cluster boundaries visible.', format: 'image', src: '/images/altvia/Cluster Assignments Distance vs Duration.png', align: 'left', sideNote: 'The distance vs. duration view reveals the natural groupings that the clustering algorithm discovers. Short, quick activities cluster separately from long endurance sessions, with intermediate tiers capturing the gradations between them.' },
          { title: 'Cluster assignments by pace and elevation', description: 'Scatter plot showing cluster assignments in the pace vs. elevation gain feature space, highlighting how terrain difficulty creates distinct intensity groupings.', format: 'image', src: '/images/altvia/Cluster Assignments Pace vs Elevation Gain.png', align: 'right', sideNote: 'The pace vs. elevation view captures a different dimension of intensity. Activities with similar pace but different elevation gain separate into distinct clusters, reflecting the additional physiological cost of climbing.' },
        ],
      },
      {
        title:       'Future Architecture',
        description: 'This section architects the features and infrastructure changes that would be required to evolve Altvia from a local-first product into a production-scale platform.',
        paragraphs: [
          'Authentication is the most immediate gap between the current system and a deployable product. The planned implementation uses JWT tokens for stateless API authentication, with OAuth integration for Strava and Apple Health APIs that would enable direct activity sync without manual file export.',
          'Route similarity is an analytically rich feature that leverages PostGIS\'s spatial query capabilities. The core idea is to answer whether a user has worked out on similar routes before, which enables training pattern analysis, personal record tracking on specific courses, and progressive overload recommendations.',
          'The scaling path from local-first to production-ready follows a clear progression. Ingestion would shift from synchronous file upload to event-driven processing where uploads are accepted quickly and heavy parsing moves into background workers consuming from a message queue. Storage would tier into hot, warm, and cold layers: recent activity data and summary geometries in PostgreSQL for fast access, historical route archives in object storage, and analytical aggregates in a warehouse for reporting and model training.',
        ],
        assets: [
          { title: 'Future-state architecture', description: 'The production-scale architecture with event-driven ingestion, storage tiering, service decomposition, and an ML platform.', format: 'diagram', diagramId: 'future-state', align: 'center', bodyBelow: 'If Altvia were pushed toward production-scale usage, the architecture would need to become event-driven and storage-tiered. Uploads would be accepted quickly, heavy enrichments would move into queues and workers, route data would split across hot geospatial stores and cold object storage, and ML would rely more on batch and cached inference than universal real-time scoring.' },
        ],
      },
    ] as const,
  },
  {
    tag:         'AI · Python',
    title:       'LangHome',
    slug:        'langhome',
    subtitle:    'AI-powered smart home lighting agent',
    description: 'A Python agent that interprets natural language scene requests, reasons about available smart home devices and their capabilities, and generates structured lighting configurations executed through the Home Assistant API.',
    status:      'Work in progress',
    stack:       ['Python', 'Google Gemini', 'Ollama', 'LangChain', 'Gradio', 'Home Assistant'],
    intro:       'LangHome is a personal project that connects large language models to real smart home hardware. The idea is straightforward: describe the mood or scene you want in plain language, and the agent figures out which lights to set, what colors and brightness levels to use, and how to respect the specific capabilities of each device in the network. The system currently supports Philips Hue and WiZ smart bulbs through the Home Assistant API, with Google Gemini and local Ollama models as interchangeable LLM backends. A Gradio-based chat interface provides a plan-review-apply workflow with streaming scene generation, visual previews, and persistent scene history.',
    sections: [
      {
        title:       'Stack & Design Decisions',
        description: 'The stack is built around a Python-first agent architecture with swappable LLM providers, a lightweight web UI, and direct integration with a production home automation platform.',
        paragraphs: [
          'Python was the natural language for this project because the entire value chain is Python-native. The LLM client libraries for both Google Gemini and Ollama are Python-first, LangChain\'s tool abstraction layer is a Python framework, and the Home Assistant REST API is straightforward to consume with the requests library. Using Python throughout means the agent logic, tool definitions, device integration, and UI all share one runtime with no serialization boundaries or cross-language interop.',
          'The dual-provider LLM architecture supports both Google Gemini and local Ollama models through a shared interface. Both providers implement the same generate_json and generate_json_stream methods, which means the agent layer does not know or care which model is producing the scene plan. This design was motivated by practical concerns: Gemini offers fast, high-quality responses through a cloud API, while Ollama enables local inference with models like Qwen on personal hardware without sending home device data to external services.',
          'Gradio was chosen over a React or Next.js frontend because the UI requirements are conversational rather than spatial. The core interaction is a chat interface where a user describes a scene, reviews the generated plan, and applies it. Gradio\'s streaming support, built-in chat components, and Python-native event handling make it possible to build this entire workflow in a single Python file without a separate build step.',
          'Home Assistant was selected as the device integration layer rather than direct Hue or WiZ APIs because it provides a unified abstraction over heterogeneous smart home devices. The Philips Hue bulbs and WiZ smart lights use different protocols and have different capability profiles, but Home Assistant normalizes them into a consistent entity model with standardized state attributes and service calls.',
          'LangChain Core provides the tool wrapper framework through its @tool decorator, which transforms Python functions into structured tool definitions that an LLM can reason about. LangChain was chosen specifically for its tool abstraction rather than its full agent framework because the agent orchestration in LangHome is custom.',
        ],
      },
      {
        title:       'Agent Architecture & LLM Integration',
        description: 'The LightingAgent orchestrates scene planning by constructing capability-aware prompts, managing scene memory, and producing structured JSON output through streaming LLM inference.',
        paragraphs: [
          'The LightingAgent class is the core orchestration component. It takes a natural language scene request, enriches it with the current state of all available lights and their capabilities, includes the most recent scene for continuity, and sends the full payload to the selected LLM with a system prompt that constrains output to valid JSON. The agent produces a structured scene specification that includes entity IDs, brightness levels, colors, and color temperature values for each light — separating planning from execution so the user can review before anything changes.',
          'The system prompt is the most carefully designed component in the stack. It instructs the LLM to behave as a lighting scene planner that outputs only valid JSON, never attempts to control devices directly, and respects the specific capabilities of each light. By constraining the LLM\'s output format in the system prompt, the agent can parse responses deterministically without fuzzy extraction or retry logic.',
          'The capability-aware payload is what makes the agent\'s scene plans physically valid. Before sending a request to the LLM, the agent fetches the current state of every light from Home Assistant and normalizes each device into a capability model that includes supported color modes, brightness support, minimum and maximum kelvin ranges, and whether the device is a group. This means the model will not assign an RGB color to a bulb that only supports color temperature.',
          'Scene memory provides conversational continuity. The SceneMemory class persists generated scenes to a JSON file and maintains an in-memory cache of the most recent 50 scenes. When the agent constructs a new LLM request, it includes the last generated scene in the payload, which lets the user make incremental requests like \'make it warmer\' or \'turn off the bedroom light\' without restating the entire scene.',
          'Streaming is implemented through generator-based inference. Both providers support generate_json_stream, which yields partial JSON chunks as the LLM generates tokens. The Gradio UI consumes this generator to display real-time scene generation progress, giving the user immediate visual feedback while the model is still producing the full plan.',
        ],
        assets: [
          { title: 'LangHome architecture', description: 'The agent architecture: user input flows through the LightingAgent, which enriches the request with device capabilities and scene memory before sending to the LLM. The structured plan is reviewed in the UI and executed through the Home Assistant API.', format: 'diagram', diagramId: 'langhome-architecture', align: 'center', bodyBelow: 'The architecture separates planning from execution. The LLM never touches devices directly: it produces a structured plan that the user can review, modify, or reject before anything changes in the physical environment.' },
        ],
      },
      {
        title:       'Home Assistant Integration & Device Control',
        description: 'The HomeAssistantClient normalizes heterogeneous smart home devices into a unified capability model and executes scenes through the Home Assistant REST API with format-aware color conversion.',
        paragraphs: [
          'The HomeAssistantClient class handles all communication with the Home Assistant instance. It fetches entity states through the REST API, normalizes light attributes into a structured capability model, and executes scenes by translating the agent\'s plan into Home Assistant service calls. The client authenticates using long-lived access tokens and communicates over HTTP.',
          'Device capability normalization is the most important function in the integration layer. Home Assistant exposes light attributes in a raw format that varies by manufacturer and protocol: Hue bulbs report supported_color_modes as an array that might contain \'xy\' and \'color_temp\', WiZ bulbs might report \'rgb\' and \'color_temp\'. The HomeAssistantClient normalizes all of this into a consistent model exposing boolean flags for brightness, color, and color temperature support.',
          'Color format conversion handles the translation between how the LLM specifies colors and how Home Assistant expects them. The LLM can output colors as hex strings, XY coordinate arrays, or named colors. The execution layer converts each format into the appropriate Home Assistant service call parameter, and brightness values are clamped to the 0-100 range.',
          'Scene execution is sequential and fault-tolerant. When the user applies a scene, the client iterates through the actions array and sends a POST request to the Home Assistant light.turn_on service for each light. Sequential execution was chosen over parallel requests because Home Assistant\'s Zigbee and WiFi bridges have limited concurrent command capacity.',
        ],
      },
      {
        title:       'User Experience & Gradio Interface',
        description: 'The Gradio web interface provides a conversational plan-review-apply workflow with streaming scene generation, visual color previews, and a scene history browser.',
        paragraphs: [
          'The Gradio interface is organized as a three-column layout: the chat panel on the left, scene history in the center, and a visual scene preview on the right. The chat panel is the primary interaction surface where the user types scene descriptions and receives streaming responses from the agent.',
          'The plan-review-apply workflow is the core interaction pattern. When a user submits a scene description, the agent generates a plan and streams it into the chat. At this point, nothing has changed in the physical environment. The user can read the plan, see the visual preview with color swatches, and decide whether to apply it by clicking the Apply Scene button.',
          'The scene preview renderer is a custom HTML component that provides visual feedback for the generated plan. Each light in the scene is displayed as a row with the device\'s friendly name, a brightness bar rendered as a percentage-filled gradient, and a color swatch showing the assigned color. This visual rendering matters because raw JSON scene plans are hard to evaluate at a glance.',
          'Provider and model selection are exposed as UI controls that allow switching between Gemini and Ollama at runtime. Scene history persistence survives application restarts through the SceneMemory class\'s JSON file storage.',
        ],
      },
      {
        title:       'Future Capabilities',
        description: 'The agent architecture is designed to expand beyond lighting into a general-purpose home automation platform with additional tool types, knowledge-augmented scene generation, and deeper device integration.',
        paragraphs: [
          'The most immediate expansion is adding new tool types beyond lighting control. Climate control is a natural next step: a set_thermostat tool that accepts temperature targets, mode selection, and zone targeting would let the agent coordinate lighting and climate in a single scene request like \'set up the living room for a cozy movie night\'.',
          'Scene knowledge augmentation through retrieval-augmented generation (RAG) would give the agent a structured memory of what works well. A RAG system would index successful scenes with their prompts, user feedback, and contextual metadata and retrieve relevant examples when generating new scenes.',
          'A Model Context Protocol (MCP) server interface would expose LangHome\'s capabilities to external AI agents and tools. A user working in an AI coding assistant could say \'set my office lights to focus mode\' and the assistant would invoke LangHome\'s MCP endpoint to plan and execute the scene.',
          'Voice interface integration would make the agent accessible without a screen. A voice frontend using Whisper for speech-to-text, feeding into the same LightingAgent, and using text-to-speech for confirmation would create a hands-free experience.',
        ],
        assets: [
          { title: 'Future LangHome architecture', description: 'The expanded architecture with additional tool types, RAG-powered scene knowledge, MCP server interface, automation rules, and voice input.', format: 'diagram', diagramId: 'langhome-future', align: 'center', bodyBelow: 'The future architecture maintains the same agent core but expands the tool surface, adds knowledge retrieval, and opens the system to external consumers through MCP.' },
        ],
      },
    ] as const,
  },
];

// ── Blog ─────────────────────────────────────────────────────────────────────

export type BlogPost = {
  title:       string;
  slug:        string;
  category:    string;
  publishedAt: string;
  description: string;
  body:        string;
};

export const blog: BlogPost[] = [
  {
    title:       'How a Solar Graph Draws the Sun\'s Path',
    slug:        'solar-graph-math',
    category:    'Engineering',
    publishedAt: 'Apr 2026',
    description: 'The NOAA/Meeus equations behind the Canvas solar elevation curve: declination, equation of time, hour angle, twilight zero-crossings, and canvas coordinate mapping.',
    body:        solarGraphBody,
  },
  {
    title:       'Shipping ML Systems That Don\'t Break in Production',
    slug:        'shipping-ml-production',
    category:    'ML',
    publishedAt: '',
    description: 'Where ML projects actually fail: feature drift, orchestration complexity, weak monitoring, and mismatched expectations.',
    body:        shippingMlBody,
  },
  {
    title:       'Designing Geospatial Interfaces for High-Stakes Decisions',
    slug:        'geospatial-interfaces',
    category:    'Product',
    publishedAt: '',
    description: 'Lessons from building map-heavy tools for wildfire operations: layer prioritization, progressive disclosure, and performance tradeoffs.',
    body:        geospatialBody,
  },
  {
    title:       'From SaaS CRUD to Operational Platforms',
    slug:        'saas-to-operational',
    category:    'Engineering',
    publishedAt: '',
    description: 'How the architectural assumptions underneath a standard CRUD product break when software needs to support real-time decisions under pressure.',
    body:        saasBody,
  },
];
