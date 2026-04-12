import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Github,
  Image as ImageIcon,
  Linkedin,
  Mail,
  NotebookPen,
  Sparkles,
  Video,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProjectAsset, ProjectSection } from "@/data/site";
import { caseStudies, experience, intro, navItems, writing } from "@/data/site";

const socialIcons = {
  Email: Mail,
  LinkedIn: Linkedin,
  GitHub: Github,
} as const;

const PROJECT_PREFIX = "/projects/";

function getPathname() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function getProjectFromPath() {
  const pathname = getPathname();
  if (!pathname.startsWith(PROJECT_PREFIX)) {
    return null;
  }

  const slug = pathname.slice(PROJECT_PREFIX.length);
  return caseStudies.find((study) => study.slug === slug) ?? null;
}

function App() {
  const [pathname, setPathname] = useState(() => getPathname());
  const [activeSection, setActiveSection] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onLocationChange = () => {
      setPathname(getPathname());
    };

    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  const activeProject = useMemo(() => getProjectFromPath(), [pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  useEffect(() => {
    if (!activeProject) {
      return;
    }

    const ids = activeProject.sections.map(
      (_, index) => `section-${index + 1}`,
    );

    if (!ids.length) {
      return;
    }

    const onScroll = () => {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const nextProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollProgress(Math.min(1, Math.max(0, nextProgress)));

      const marker = window.innerHeight * 0.28;
      let nextActive = 1;

      ids.forEach((id, index) => {
        const element = document.getElementById(id);
        if (!element) {
          return;
        }

        const top = element.getBoundingClientRect().top;
        if (top <= marker) {
          nextActive = index + 1;
        }
      });

      setActiveSection(nextActive);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [activeProject, pathname]);

  const navigate = (nextPath: string) => {
    window.history.pushState({}, "", nextPath);
    setPathname(getPathname());
  };

  if (activeProject) {
    return (
      <ProjectArticlePage
        activeProject={activeProject}
        activeSection={activeSection}
        onBack={() => navigate("/#case-studies")}
        scrollProgress={scrollProgress}
      />
    );
  }

  return <HomePage onOpenProject={(slug) => navigate(`${PROJECT_PREFIX}${slug}`)} />;
}

function HomePage({ onOpenProject }: { onOpenProject: (slug: string) => void }) {
  const featuredProject = caseStudies[0];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f6f3eb_0%,#f3f4f1_28%,#eef1ec_100%)] text-[#20242c]">
      <div className="mx-auto max-w-[33rem] px-6 pb-24 pt-6 sm:max-w-[42rem] sm:px-8 lg:max-w-[54rem]">
        <header className="mb-14 flex items-center justify-between">
          <a
            className="text-[1.65rem] font-semibold leading-none tracking-[-0.08em] text-black"
            href="#home"
          >
            {intro.initials}
          </a>
          <nav className="hidden items-center gap-1 rounded-full border border-white/70 bg-[#f7f4ee]/90 p-1 shadow-[0_8px_30px_rgba(90,75,42,0.08)] backdrop-blur sm:flex">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                className={`rounded-full px-4 py-2 text-[0.95rem] font-semibold transition ${
                  index === 0
                    ? "bg-white text-black shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                    : "text-[#5f6672] hover:bg-white hover:text-black"
                }`}
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        <main className="space-y-20">
          <section id="home" className="space-y-6">
            <div className="space-y-1.5">
              <h1 className="text-[2.65rem] font-bold tracking-[-0.04em] text-[#22252d]">
                {intro.name}
              </h1>
              <p className="text-[1.02rem] text-[#667085]">{intro.role}</p>
            </div>

            <div className="space-y-6 text-[1.03rem] leading-[1.72] text-[#23262f]">
              <p>
                I&apos;m Tim Holmes, a software engineer focused on full-stack
                product development and applied machine learning. I currently
                build cloud-native systems for wildfire operations using{" "}
                <InlinePill icon={<BriefcaseBusiness className="h-3.5 w-3.5" />}>
                  Logic20/20
                </InlinePill>{" "}
                and have spent the last 8+ years working across React,
                TypeScript, Python, AWS, and data-heavy products.
              </p>

              <p>
                I&apos;ve built operational dashboards, geospatial analysis tools,
                ML pipelines, and multi-tenant SaaS platforms. My background
                spans both product engineering and platform work, which lets me
                move comfortably from UI and frontend architecture into backend
                services, infrastructure, and data workflows.
              </p>

              <p>
                Currently, I&apos;m looking for new tech roles and selective
                freelance work focused on modern product development, cloud
                systems, and technical problem-solving.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Button
                asChild
                className="h-11 rounded-full bg-black px-5 text-[0.96rem] font-medium text-white hover:bg-black/90"
              >
                <a href={intro.cta.href}>
                  <Mail className="h-4 w-4" />
                  Contact
                </a>
              </Button>
              <div className="flex items-center gap-4 text-[#6b7280]">
                {intro.links.map((link) => {
                  const Icon = socialIcons[link.label as keyof typeof socialIcons];

                  return (
                    <a
                      key={link.label}
                      className="transition hover:text-black"
                      href={link.href}
                      aria-label={link.label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          <section id="experience" className="space-y-9">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.03em]">
              Experience
            </h2>
            <div className="space-y-10">
              {experience.map((role) => (
                <article key={`${role.company}-${role.title}`} className="space-y-2">
                  <p className="text-[0.98rem] text-[#7b8492]">{role.period}</p>
                  <h3 className="text-[1.22rem] font-medium tracking-[-0.02em] text-[#22252d]">
                    {role.title} @ {role.company}
                  </h3>
                </article>
              ))}
            </div>
          </section>

          <section id="case-studies" className="space-y-10">
            <div className="space-y-3">
              <h2 className="text-[1.9rem] font-medium tracking-[-0.03em]">
                Projects
              </h2>
              <p className="max-w-[44rem] text-[0.98rem] leading-[1.7] text-[#68707d]">
                Each card opens into a dedicated write-up. The article page is
                where the architecture, product thinking, and media live.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenProject(featuredProject.slug)}
              className="group block w-full overflow-hidden rounded-[2rem] border border-[#d8ddd3] bg-[#fbfaf6] text-left shadow-[0_24px_70px_rgba(49,54,44,0.08)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(49,54,44,0.12)]"
            >
              <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative overflow-hidden border-b border-[#e4e8df] bg-[radial-gradient(circle_at_18%_22%,rgba(246,221,172,0.58),transparent_22%),radial-gradient(circle_at_84%_24%,rgba(205,225,255,0.78),transparent_20%),linear-gradient(135deg,#0c1a29_0%,#11253c_34%,#1d4f63_64%,#d4a15f_100%)] p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0))]" />
                  <div className="relative space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusChip>{featuredProject.status}</StatusChip>
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/86">
                        Geospatial intelligence
                      </span>
                    </div>

                    <div className="max-w-[29rem] space-y-4 text-white">
                      <div className="space-y-2">
                        <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-white/70">
                          Featured project
                        </p>
                        <h3 className="text-[2.4rem] font-bold leading-[0.98] tracking-[-0.05em]">
                          {featuredProject.title}
                        </h3>
                        <p className="text-[1rem] text-white/78">
                          {featuredProject.subtitle}
                        </p>
                      </div>

                      <p className="text-[0.97rem] leading-[1.7] text-white/82">
                        {featuredProject.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-[0.9rem] font-semibold text-white">
                      <span>Open case study</span>
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>

                <div className="bg-[linear-gradient(180deg,#f8f4ea_0%,#f3efe5_100%)] p-6 sm:p-8">
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[#7a6b53]">
                        Technical stack
                      </p>
                      <p className="text-[0.96rem] leading-[1.65] text-[#5d615c]">
                        Product UI, backend APIs, data pipelines, geospatial
                        modeling, and ML infrastructure in one system.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {featuredProject.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#dccfb7] bg-white/80 px-3 py-1.5 text-[0.82rem] font-medium text-[#473b28]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {caseStudies.slice(1).map((project) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => onOpenProject(project.slug)}
                className="group block w-full overflow-hidden rounded-[2rem] border border-[#d8ddd3] bg-[#fbfaf6] text-left shadow-[0_16px_50px_rgba(49,54,44,0.06)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(49,54,44,0.1)]"
              >
                <div className="p-6 sm:p-8">
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusChip>{project.status}</StatusChip>
                    </div>

                    <div className="max-w-[38rem] space-y-3">
                      <h3 className="text-[1.8rem] font-bold leading-[1] tracking-[-0.04em] text-[#17212b]">
                        {project.title}
                      </h3>
                      <p className="text-[1rem] text-[#667085]">
                        {project.subtitle}
                      </p>
                      <p className="text-[0.96rem] leading-[1.7] text-[#5d615c]">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-[#dccfb7] bg-white/80 px-3 py-1.5 text-[0.82rem] font-medium text-[#473b28]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 text-[0.9rem] font-semibold text-[#1f2937]">
                      <span>Open case study</span>
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </section>

          <section id="writing" className="space-y-9">
            <h2 className="text-[1.9rem] font-medium tracking-[-0.03em]">
              Writing
            </h2>
            <div className="space-y-8">
              {writing.map((entry) => (
                <article key={entry.title} className="space-y-2">
                  <div className="flex items-center gap-2 text-[#7b8492]">
                    <NotebookPen className="h-4 w-4" />
                    <span className="text-[0.8rem] font-medium">{entry.type}</span>
                  </div>
                  <h3 className="text-[1.22rem] font-medium tracking-[-0.02em] text-[#22252d]">
                    {entry.title}
                  </h3>
                  <p className="text-[0.96rem] leading-[1.7] text-[#68707d]">
                    {entry.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function ProjectArticlePage({
  activeProject,
  activeSection,
  onBack,
  scrollProgress,
}: {
  activeProject: (typeof caseStudies)[number];
  activeSection: number;
  onBack: () => void;
  scrollProgress: number;
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4f0e5_0%,#f8f6f1_22%,#fbfbf8_100%)] text-[#1f2937]">
      <div className="mx-auto max-w-[88rem] px-6 py-8 sm:px-8 lg:px-10">
        <div className="mb-10 flex items-center justify-between">
          <div />
          <StatusChip>{activeProject.status}</StatusChip>
        </div>

        <article className="relative xl:pl-72">
          <aside className="hidden xl:block">
            <div className="fixed left-8 top-8 z-20 w-52">
              <div className="space-y-8">
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-2 rounded-full border border-[#ddd6c6] bg-white/92 px-4 py-2 text-[0.9rem] font-medium text-[#334155] shadow-[0_6px_20px_rgba(15,23,42,0.05)] backdrop-blur transition hover:border-[#cdbf9e] hover:text-black"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to projects
                </button>

                <div className="h-px w-36 bg-[#ded7c8]" />

                <div className="space-y-3">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#8a7652]">
                    Reading progress
                  </p>
                  <div className="relative h-40 w-[2px] bg-[#e6dfd0]">
                    <div
                      className="absolute left-0 top-0 w-full bg-[#1f2937] transition-[height] duration-300"
                      style={{ height: `${Math.max(6, scrollProgress * 100)}%` }}
                    />
                  </div>
                  <p className="text-[0.9rem] text-[#667085]">
                    {Math.round(scrollProgress * 100)}% through
                  </p>
                </div>

                <div className="h-px w-36 bg-[#ded7c8]" />

                <div className="space-y-3">
                  <p className="text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-[#8a7652]">
                    In this article
                  </p>
                  <div className="space-y-4">
                    {activeProject.sections.map((section, index) => {
                      const isActive = activeSection === index + 1;

                      return (
                        <a
                          key={section.title}
                          href={`#section-${index + 1}`}
                          className="group flex items-start gap-3"
                        >
                          <span
                            className={`mt-1 block h-2.5 w-2.5 rounded-full transition ${
                              isActive ? "bg-[#1f2937]" : "bg-[#d7cfbe]"
                            }`}
                          />
                          <span
                            className={`text-[0.92rem] leading-[1.45] transition ${
                              isActive
                                ? "text-[#1f2937]"
                                : "text-[#6b7280] group-hover:text-[#1f2937]"
                            }`}
                          >
                            {section.title}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none fixed bottom-0 left-[15.5rem] top-0 w-px bg-[linear-gradient(180deg,rgba(222,215,200,0),rgba(222,215,200,0.95)_12%,rgba(222,215,200,0.95)_88%,rgba(222,215,200,0))]" />
          </aside>

          <div className="min-w-0">
            <header className="pb-12">
              <div className="mb-8 max-w-[44rem] space-y-4">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#8a7652]">
                  Project case study
                </p>
                <h1 className="text-[2.9rem] font-bold leading-[0.92] tracking-[-0.06em] text-[#17212b] sm:text-[4rem]">
                  {activeProject.title}
                </h1>
                <p className="text-[1.14rem] leading-[1.8] text-[#435163]">
                  {activeProject.subtitle}
                </p>
              </div>

              <div className="max-w-[42rem] space-y-5">
                <p className="text-[1.08rem] leading-[1.95] text-[#3f4a5a]">
                  {activeProject.description}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {activeProject.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#ddd0b7] bg-[#fbf7ef] px-3 py-1.5 text-[0.82rem] font-medium text-[#56452b]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </header>

            <div className="mb-14 max-w-[44rem]">
              <p className="mb-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[#8a7652]">
                Abstract
              </p>
              <p className="text-[1.04rem] leading-[1.95] text-[#324152]">
                {activeProject.intro}
              </p>
            </div>

            <div className="space-y-20">
              {activeProject.sections.map((section, index) => (
                <ArticleSection
                  key={section.title}
                  index={index + 1}
                  section={section}
                />
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

function ArticleSection({
  index,
  section,
}: {
  index: number;
  section: ProjectSection;
}) {
  return (
    <section
      id={`section-${index}`}
      className="scroll-mt-24"
    >
      <div className="max-w-[44rem] space-y-7">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-[#8a7652]">
              Section {index}
            </p>
            {section.status ? <StatusChip subtle>{section.status}</StatusChip> : null}
          </div>
          <h2 className="text-[2rem] font-semibold tracking-[-0.04em] text-[#17212b]">
            {section.title}
          </h2>
          <p className="text-[1.03rem] leading-[1.9] text-[#435163]">
            {section.description}
          </p>
        </div>

        <div className="space-y-6">
          {section.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[1.02rem] leading-[1.95] text-[#4b5968]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {section.assets?.length ? (
        <div className="mt-10 space-y-12">
          {section.assets.map((asset) => (
            <MediaPlacement key={asset.title} asset={asset} />
          ))}
        </div>
      ) : null}
    </section>
  );
}

function MediaPlacement({ asset }: { asset: ProjectAsset }) {
  const align = asset.align ?? "center";
  const isCenter = align === "center";
  const isLeft = align === "left";
  const isRight = align === "right";

  return (
    <div className="space-y-5">
      {isCenter ? (
        <div className="mx-auto max-w-[62rem]">
          <AssetPlaceholder asset={asset} />
        </div>
      ) : null}

      {isLeft ? (
        <div className="mx-auto max-w-[68rem] lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(20rem,0.72fr)] lg:items-start lg:gap-12">
          <div className="min-w-0 lg:-ml-[14%]">
            <AssetPlaceholder asset={asset} />
          </div>
          <div className="min-w-0 lg:pt-10">
            <MediaText asset={asset} />
          </div>
        </div>
      ) : null}

      {isRight ? (
        <div className="mx-auto max-w-[68rem] lg:grid lg:grid-cols-[minmax(20rem,0.72fr)_minmax(0,1.08fr)] lg:items-start lg:gap-12">
          <div className="min-w-0 lg:pt-10">
            <MediaText asset={asset} />
          </div>
          <div className="min-w-0 lg:-mr-[14%]">
            <AssetPlaceholder asset={asset} />
          </div>
        </div>
      ) : null}

      {asset.bodyBelow ? (
        <div className="mx-auto max-w-[44rem]">
          <p className="text-[0.98rem] leading-[1.85] text-[#586576]">
            {asset.bodyBelow}
          </p>
        </div>
      ) : null}
    </div>
  );
}

function MediaText({ asset }: { asset: ProjectAsset }) {
  return (
    <div className="mx-auto mt-4 max-w-[24rem] space-y-2 lg:mt-0">
      <p className="text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-[#8a7652]">
        Media note
      </p>
      <p className="text-[0.98rem] leading-[1.8] text-[#4b5968]">
        {asset.sideNote ?? asset.description}
      </p>
    </div>
  );
}

function AssetPlaceholder({ asset }: { asset: ProjectAsset }) {
  if (asset.format === "diagram" && asset.diagramId) {
    return <ArchitectureDiagram diagramId={asset.diagramId} />;
  }

  if (asset.src) {
    const resolvedSrc = asset.src.startsWith("/")
      ? `${import.meta.env.BASE_URL}${asset.src.slice(1)}`
      : asset.src;

    return (
      <div className="overflow-hidden rounded-[1.75rem] bg-[#f8f4ea] shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <img
          src={resolvedSrc}
          alt={asset.title}
          className="w-full rounded-[1.75rem]"
          loading="lazy"
        />
      </div>
    );
  }

  const Icon =
    asset.format === "video"
      ? Video
      : asset.format === "image"
        ? ImageIcon
        : Sparkles;

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-[linear-gradient(180deg,#f8f4ea_0%,#f2f5ef_100%)] px-5 py-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:px-6 sm:py-6">
      <div className="mb-8 aspect-[16/10] w-full rounded-[1.35rem] border border-white/70 bg-[radial-gradient(circle_at_18%_24%,rgba(246,221,172,0.46),transparent_20%),radial-gradient(circle_at_82%_26%,rgba(201,220,255,0.8),transparent_18%),linear-gradient(135deg,#122338_0%,#21415f_48%,#3e6a6f_74%,#d5a15d_100%)]" />
      <div className="flex items-start gap-3">
        <div className="rounded-full bg-white/82 p-2 text-[#7b6947] shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <Icon className="h-4 w-4" />
        </div>
        <div className="space-y-1">
          <p className="text-[0.9rem] font-semibold text-[#1f2937]">{asset.title}</p>
          <p className="text-[0.85rem] leading-[1.55] text-[#667085]">
            {asset.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ArchitectureDiagram({
  diagramId,
}: {
  diagramId: "current-state" | "future-state" | "langhome-architecture" | "langhome-future";
}) {
  if (diagramId === "current-state") {
    return <CurrentStateDiagram />;
  }
  if (diagramId === "langhome-architecture") {
    return <LangHomeArchitectureDiagram />;
  }
  if (diagramId === "langhome-future") {
    return <LangHomeFutureDiagram />;
  }
  return <FutureStateDiagram />;
}

function DiagramBox({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-[#ddd0b7] bg-white px-3 py-2 text-center text-[0.78rem] font-medium text-[#1f2937] shadow-[0_2px_8px_rgba(15,23,42,0.04)] ${className}`}
    >
      {children}
    </div>
  );
}

function DiagramLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#8a7652]">
      {children}
    </p>
  );
}

function DiagramArrow({ direction = "down" }: { direction?: "down" | "right" }) {
  if (direction === "right") {
    return (
      <div className="flex items-center justify-center px-1">
        <div className="h-px w-6 bg-[#c4b898]" />
        <div className="h-0 w-0 border-l-[5px] border-l-[#c4b898] border-y-[3px] border-y-transparent" />
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center py-1">
      <div className="h-4 w-px bg-[#c4b898]" />
      <div className="h-0 w-0 border-t-[5px] border-t-[#c4b898] border-x-[3px] border-x-transparent" />
    </div>
  );
}

function CurrentStateDiagram() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-[linear-gradient(180deg,#f8f4ea_0%,#f2f5ef_100%)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-white/82 p-2 text-[#7b6947] shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <Sparkles className="h-4 w-4" />
        </div>
        <p className="text-[0.9rem] font-semibold text-[#1f2937]">Current-State Architecture</p>
      </div>

      <div className="space-y-1">
        <DiagramLabel>Client</DiagramLabel>
        <DiagramBox className="bg-[#fbf7ef]">React + TypeScript + Vite</DiagramBox>

        <DiagramArrow />

        <DiagramLabel>Application Runtime</DiagramLabel>
        <div className="rounded-xl border border-[#e3dccd] bg-[#faf8f3] p-4 space-y-3">
          <DiagramBox>FastAPI Routers</DiagramBox>
          <DiagramArrow />
          <DiagramBox>Services Layer</DiagramBox>
          <DiagramArrow />
          <div className="grid grid-cols-3 gap-2">
            <DiagramBox>Repositories + ORM</DiagramBox>
            <DiagramBox>Ingestion Parser</DiagramBox>
            <DiagramBox>Geospatial Utils</DiagramBox>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-1">
          <div>
            <DiagramArrow />
            <DiagramLabel>Data</DiagramLabel>
            <DiagramBox className="bg-[#eef0eb]">PostgreSQL + PostGIS</DiagramBox>
          </div>
          <div>
            <DiagramArrow />
            <DiagramLabel>Platform</DiagramLabel>
            <div className="space-y-2">
              <DiagramBox className="bg-[#eef0eb]">Dagster Assets + Jobs</DiagramBox>
              <DiagramBox className="bg-[#eef0eb]">MLflow Tracking</DiagramBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FutureStateDiagram() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-[linear-gradient(180deg,#f8f4ea_0%,#f2f5ef_100%)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-white/82 p-2 text-[#7b6947] shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <Sparkles className="h-4 w-4" />
        </div>
        <p className="text-[0.9rem] font-semibold text-[#1f2937]">Future-State Architecture</p>
      </div>

      <div className="space-y-1">
        <DiagramLabel>Clients</DiagramLabel>
        <div className="grid grid-cols-3 gap-2">
          <DiagramBox className="bg-[#fbf7ef]">Web App</DiagramBox>
          <DiagramBox className="bg-[#fbf7ef]">Mobile Apps</DiagramBox>
          <DiagramBox className="bg-[#fbf7ef]">Partner Integrations</DiagramBox>
        </div>

        <DiagramArrow />

        <DiagramLabel>Edge + Access</DiagramLabel>
        <div className="rounded-xl border border-[#e3dccd] bg-[#faf8f3] p-4">
          <div className="grid grid-cols-4 gap-2">
            <DiagramBox>CDN + Edge Cache</DiagramBox>
            <DiagramBox>WAF / Rate Limiting</DiagramBox>
            <DiagramBox>API Gateway / BFF</DiagramBox>
            <DiagramBox>Auth + Identity</DiagramBox>
          </div>
        </div>

        <DiagramArrow />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <DiagramLabel>Core Product Services</DiagramLabel>
            <div className="rounded-xl border border-[#e3dccd] bg-[#faf8f3] p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <DiagramBox>Activity Service</DiagramBox>
                <DiagramBox>Profile Service</DiagramBox>
                <DiagramBox>Route + Geo Service</DiagramBox>
                <DiagramBox>Analytics Service</DiagramBox>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <DiagramLabel>Ingestion + Events</DiagramLabel>
            <div className="rounded-xl border border-[#e3dccd] bg-[#faf8f3] p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <DiagramBox>Upload Service</DiagramBox>
                <DiagramBox>Event Bus</DiagramBox>
                <DiagramBox>Async Workers</DiagramBox>
                <DiagramBox>Stream Enrichment</DiagramBox>
              </div>
            </div>
          </div>
        </div>

        <DiagramArrow />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <DiagramLabel>Data Plane</DiagramLabel>
            <div className="rounded-xl border border-[#e3dccd] bg-[#eef0eb] p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <DiagramBox className="bg-white">OLTP Store</DiagramBox>
                <DiagramBox className="bg-white">Geo Index</DiagramBox>
                <DiagramBox className="bg-white">Object Storage</DiagramBox>
                <DiagramBox className="bg-white">Lakehouse</DiagramBox>
                <DiagramBox className="bg-white">Cache Layer</DiagramBox>
                <DiagramBox className="bg-white">Search Index</DiagramBox>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <DiagramLabel>ML Platform</DiagramLabel>
            <div className="rounded-xl border border-[#e3dccd] bg-[#eef0eb] p-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <DiagramBox className="bg-white">Feature Pipelines</DiagramBox>
                <DiagramBox className="bg-white">Training Jobs</DiagramBox>
                <DiagramBox className="bg-white">Model Registry</DiagramBox>
                <DiagramBox className="bg-white">Batch Inference</DiagramBox>
              </div>
              <DiagramBox className="bg-white">Online Inference Service</DiagramBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LangHomeArchitectureDiagram() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-[linear-gradient(180deg,#f8f4ea_0%,#f2f5ef_100%)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-white/82 p-2 text-[#7b6947] shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <Sparkles className="h-4 w-4" />
        </div>
        <p className="text-[0.9rem] font-semibold text-[#1f2937]">LangHome Architecture</p>
      </div>

      <div className="space-y-1">
        <DiagramLabel>User Input</DiagramLabel>
        <div className="grid grid-cols-2 gap-2">
          <DiagramBox className="bg-[#fbf7ef]">Gradio Chat UI</DiagramBox>
          <DiagramBox className="bg-[#fbf7ef]">CLI Interface</DiagramBox>
        </div>

        <DiagramArrow />

        <DiagramLabel>Agent Layer</DiagramLabel>
        <div className="rounded-xl border border-[#e3dccd] bg-[#faf8f3] p-4 space-y-3">
          <DiagramBox>LightingAgent</DiagramBox>
          <DiagramArrow />
          <div className="grid grid-cols-3 gap-2">
            <DiagramBox>System Prompt</DiagramBox>
            <DiagramBox>Scene Memory</DiagramBox>
            <DiagramBox>Capability Payload</DiagramBox>
          </div>
        </div>

        <DiagramArrow />

        <DiagramLabel>LLM Providers</DiagramLabel>
        <div className="grid grid-cols-2 gap-2">
          <DiagramBox className="bg-[#eef0eb]">Google Gemini API</DiagramBox>
          <DiagramBox className="bg-[#eef0eb]">Ollama (Local)</DiagramBox>
        </div>

        <DiagramArrow />

        <DiagramLabel>Structured Scene Plan (JSON)</DiagramLabel>
        <DiagramBox>Scene Name + Actions Array</DiagramBox>

        <DiagramArrow />

        <div className="grid grid-cols-2 gap-4 mt-1">
          <div>
            <DiagramLabel>Execution</DiagramLabel>
            <div className="space-y-2">
              <DiagramBox className="bg-[#eef0eb]">Home Assistant REST API</DiagramBox>
              <DiagramBox className="bg-[#eef0eb]">Color Format Conversion</DiagramBox>
            </div>
          </div>
          <div>
            <DiagramLabel>Devices</DiagramLabel>
            <div className="space-y-2">
              <DiagramBox className="bg-[#eef0eb]">Philips Hue (XY + CT)</DiagramBox>
              <DiagramBox className="bg-[#eef0eb]">WiZ RGBWW (RGB + CT)</DiagramBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LangHomeFutureDiagram() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] bg-[linear-gradient(180deg,#f8f4ea_0%,#f2f5ef_100%)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-8">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-white/82 p-2 text-[#7b6947] shadow-[0_8px_20px_rgba(15,23,42,0.06)]">
          <Sparkles className="h-4 w-4" />
        </div>
        <p className="text-[0.9rem] font-semibold text-[#1f2937]">Future LangHome Architecture</p>
      </div>

      <div className="space-y-1">
        <DiagramLabel>Input Sources</DiagramLabel>
        <div className="grid grid-cols-3 gap-2">
          <DiagramBox className="bg-[#fbf7ef]">Chat UI</DiagramBox>
          <DiagramBox className="bg-[#fbf7ef]">Voice (Whisper)</DiagramBox>
          <DiagramBox className="bg-[#fbf7ef]">MCP Server</DiagramBox>
        </div>

        <DiagramArrow />

        <DiagramLabel>Agent Core</DiagramLabel>
        <div className="rounded-xl border border-[#e3dccd] bg-[#faf8f3] p-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <DiagramBox>LightingAgent</DiagramBox>
            <DiagramBox>Scene Memory + RAG</DiagramBox>
          </div>
          <DiagramArrow />
          <DiagramBox>Multi-Provider LLM (Gemini / Ollama / Claude)</DiagramBox>
        </div>

        <DiagramArrow />

        <DiagramLabel>Tool Surface</DiagramLabel>
        <div className="rounded-xl border border-[#e3dccd] bg-[#faf8f3] p-4">
          <div className="grid grid-cols-4 gap-2">
            <DiagramBox>Lighting</DiagramBox>
            <DiagramBox>Climate</DiagramBox>
            <DiagramBox>Media</DiagramBox>
            <DiagramBox>Automation</DiagramBox>
          </div>
        </div>

        <DiagramArrow />

        <DiagramLabel>Execution Layer</DiagramLabel>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="rounded-xl border border-[#e3dccd] bg-[#eef0eb] p-3 space-y-2">
              <DiagramBox className="bg-white">Home Assistant API</DiagramBox>
              <DiagramBox className="bg-white">Event Bus + Triggers</DiagramBox>
            </div>
          </div>
          <div className="space-y-1">
            <div className="rounded-xl border border-[#e3dccd] bg-[#eef0eb] p-3 space-y-2">
              <DiagramBox className="bg-white">Hue / WiZ / Z-Wave</DiagramBox>
              <DiagramBox className="bg-white">Thermostats / Speakers</DiagramBox>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusChip({
  children,
  subtle = false,
}: {
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] ${
        subtle
          ? "border border-[#ddd7c8] bg-[#f5f1e8] text-[#866c38]"
          : "border border-[#f4d5a6] bg-[#f6e2bf] text-[#6d4d16]"
      }`}
    >
      {children}
    </span>
  );
}

function InlinePill({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <span className="inline-flex translate-y-[-0.02rem] items-center gap-1.5 rounded-full border border-[#ece8df] bg-white px-2.5 py-1 text-[0.95rem] text-[#20242c] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      {icon}
      <span>{children}</span>
    </span>
  );
}

export default App;
