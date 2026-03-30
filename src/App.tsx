import {
  BriefcaseBusiness,
  Github,
  Linkedin,
  Mail,
  NotebookPen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { caseStudies, experience, intro, navItems, writing } from "@/data/site";

const socialIcons = {
  Email: Mail,
  LinkedIn: Linkedin,
  GitHub: Github,
} as const;

const studyVisuals = [
  {
    frame:
      "bg-[radial-gradient(circle_at_78%_26%,rgba(255,255,255,0.86),transparent_12%),radial-gradient(circle_at_86%_56%,rgba(211,221,255,0.32),transparent_18%),linear-gradient(180deg,#2a2a2a_0%,#4f4f4f_6%,#0b0d16_18%,#070812_100%)]",
    screen:
      "bg-[radial-gradient(circle_at_72%_42%,rgba(244,247,255,0.92),transparent_12%),radial-gradient(circle_at_84%_56%,rgba(188,201,235,0.34),transparent_16%),linear-gradient(135deg,#03050e_0%,#0b1021_42%,#1d2847_72%,#0e1224_100%)]",
  },
  {
    frame:
      "bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.4),transparent_20%),linear-gradient(180deg,#c9c5be_0%,#9e9486_24%,#ece7df_100%)]",
    screen:
      "bg-[radial-gradient(circle_at_20%_22%,rgba(255,214,153,0.28),transparent_16%),linear-gradient(135deg,#151b24_0%,#263448_46%,#67798b_100%)]",
  },
  {
    frame:
      "bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.28),transparent_22%),linear-gradient(180deg,#b8b8b8_0%,#8d8d8d_16%,#d8d3cc_100%)]",
    screen:
      "bg-[radial-gradient(circle_at_76%_22%,rgba(255,255,255,0.22),transparent_14%),linear-gradient(135deg,#241913_0%,#563c2f_54%,#9b7859_100%)]",
  },
] as const;

function App() {
  return (
    <div className="min-h-screen bg-[#f3f4f1] text-[#20242c]">
      <div className="mx-auto max-w-[33rem] px-6 pb-24 pt-6 sm:max-w-[38rem] sm:px-8 lg:max-w-[40rem]">
        <header className="mb-14 flex items-center justify-between">
          <a
            className="text-[1.65rem] font-semibold leading-none tracking-[-0.08em] text-black"
            href="#home"
          >
            TH
          </a>
          <nav className="hidden items-center gap-1 rounded-full bg-[#f1f0ec] p-1 sm:flex">
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
            <h2 className="text-[1.9rem] font-medium tracking-[-0.03em]">
              Case Studies
            </h2>
            <div className="space-y-14">
              {caseStudies.map((study, index) => (
                <article key={study.title} className="space-y-5">
                  <div
                    className={`overflow-hidden rounded-[1.65rem] p-4 shadow-[0_12px_32px_rgba(0,0,0,0.05)] ${studyVisuals[index].frame}`}
                  >
                    <div
                      className={`relative h-[16rem] overflow-hidden rounded-[1.2rem] border border-white/10 ${studyVisuals[index].screen} sm:h-[19rem]`}
                    >
                      <div className="absolute inset-x-0 top-0 h-12 border-b border-white/10 bg-black/15" />
                      <div className="absolute left-5 top-4 h-2.5 w-2.5 rounded-full bg-white/60" />
                      <div className="absolute left-1/2 top-4 h-6 w-44 -translate-x-1/2 rounded-full border border-white/10 bg-black/20" />
                      <div className="absolute right-5 top-3.5 rounded-full border border-white/10 bg-black/25 px-4 py-1.5 text-[0.65rem] text-white/90">
                        View project
                      </div>

                      <div className="absolute left-8 top-20 max-w-[14rem] text-white">
                        <div className="mb-5 inline-flex rounded-full border border-white/15 bg-black/20 px-3 py-1 text-[0.62rem] font-medium text-white/85">
                          Selected case study
                        </div>
                        <h3 className="text-[1.75rem] font-bold leading-[1.02] tracking-[-0.04em]">
                          {index === 0
                            ? "Operational software for wildfire response"
                            : index === 1
                              ? "ML systems for utility risk scoring"
                              : "Retirement planning SaaS platform"}
                        </h3>
                        <p className="mt-3 text-[0.82rem] leading-5 text-white/75">
                          Product, platform, and infrastructure working together
                          in a single system.
                        </p>
                      </div>

                      <div className="absolute bottom-6 left-8 rounded-full border border-white/15 bg-black/20 px-4 py-2 text-[0.72rem] text-white">
                        Read more
                      </div>

                      <div className="absolute bottom-0 right-0 h-[88%] w-[48%] rounded-tl-[7rem] bg-[radial-gradient(circle_at_45%_24%,rgba(255,255,255,0.85),rgba(255,255,255,0.15)_20%,transparent_44%),radial-gradient(circle_at_62%_54%,rgba(255,255,255,0.4),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.02))] opacity-90" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-[1.42rem] font-medium tracking-[-0.03em] text-[#242832]">
                      {study.title}
                    </h3>
                    <p className="text-[0.98rem] leading-[1.65] text-[#68707d]">
                      {study.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
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
