import { useEffect, useState } from "react";

type Page = "home" | "work" | "about" | "hq-redesign";

const A = "/assets";

function routeFromPath(): Page {
  const route = location.pathname.split("/").filter(Boolean).join("/");
  return (
    ["work", "about", "hq-redesign"].includes(route) ? route : "home"
  ) as Page;
}

function go(page: Page) {
  const path = page === "home" ? "/" : `/${page}`;
  history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function Arrow({ outward = false }: { outward?: boolean }) {
  return (
    <img
      className="arrow"
      src={`${A}/home/arrow-${outward ? "outward" : "forward"}.png`}
      alt=""
    />
  );
}

function Header({ active }: { active: Page }) {
  return (
    <header className="nav" aria-label="Main navigation">
      <button data-ds-text="Body/Large/Semibold"
        className={active === "home" ? "active" : ""}
        onClick={() => go("home")}
      >
        Hi,
      </button>
      <button data-ds-text="Body/Large/Semibold"
        className={
          active === "work" || active === "hq-redesign" ? "active" : ""
        }
        onClick={() => go("work")}
      >
        Work
      </button>
      <button data-ds-text="Body/Large/Semibold"
        className={active === "about" ? "active" : ""}
        onClick={() => go("about")}
      >
        About
      </button>
      <div className="nav-fill" />
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-location">
        <img
          className="footer-skyline"
          src={`${A}/home/reading-skyline.svg`}
          alt="Reading skyline"
        />
        <span data-ds-text="Body/Small/Regular">Based in Reading, UK</span>
      </div>
      <a data-ds-text="Body/Large/Semibold" href="mailto:denys.zag@gmail.com">Email</a>
      <a data-ds-text="Body/Large/Semibold"
        href="https://www.linkedin.com/in/denyszagorodny/"
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn <Arrow outward />
      </a>
    </footer>
  );
}

function Shell({
  page,
  children,
  long = false,
}: {
  page: Page;
  children: React.ReactNode;
  long?: boolean;
}) {
  return (
    <main className={`page-frame ${long ? "page-frame--long" : ""}`}>
      <div className="page-border">
        <Header active={page} />
        {children}
        <Footer />
      </div>
    </main>
  );
}

function ProjectMeta() {
  return (
    <div className="project-meta">
      <div>
        <span data-ds-text="Body/Small/SEMIBOLD">2026</span>
        <h3 data-ds-text="Heading/H3/Bold">HQ Enterprise Product Redesign</h3>
      </div>
      <p data-ds-text="Body/Default/Regular">
        Improving wayfinding and scalability in a complex security platform.
      </p>
    </div>
  );
}

function ProjectVisual() {
  return (
    <div className="dot-field">
      <div className="image-card">
        <img src={`${A}/home/project.png`} alt="HQ product booking interface" />
      </div>
    </div>
  );
}

function Home() {
  return (
    <Shell page="home">
      <div className="home-grid">
        <section className="intro">
          <div>
            <h2 data-ds-text="Heading/Intro/Semibold">Hi, I’m Denys</h2>
            <h1 data-ds-text="Heading/H1/Bold">Product Designer with 7 years of experience</h1>
          </div>
          <p data-ds-text="Body/Large/Regular">
            Designing complex B2B and enterprise products,
            <br /> from end-to-end user experiences to scalable design systems
          </p>
        </section>
        <section className="featured">
          <div data-ds-text="Body/Small/SEMIBOLD" className="eyebrow">Latest project</div>
          <ProjectMeta />
          <ProjectVisual />
          <button data-ds-text="Body/Large/Semibold" className="case-link" onClick={() => go("hq-redesign")}>
            View case study <Arrow />
          </button>
        </section>
      </div>
    </Shell>
  );
}

function Work() {
  return (
    <Shell page="work">
      <div className="work-grid">
        <article className="work-card muted-project work-card--empty">
          <div className="project-meta">
            <div>
              <span data-ds-text="Body/Small/SEMIBOLD">2026</span>
              <h3 data-ds-text="Heading/H3/Bold">HQ Design System</h3>
            </div>
            <p data-ds-text="Body/Default/Regular">
              Creating scalable UI foundations for a growing product platform.
            </p>
          </div>
          <div className="coming">
            <p data-ds-text="Body/Default/Regular" className="body-small">Coming soon...</p>
          </div>
        </article>
        <article className="work-card work-card--with-image">
          <ProjectMeta />
          <ProjectVisual />
          <button data-ds-text="Body/Large/Semibold" className="case-link" onClick={() => go("hq-redesign")}>
            View case study <Arrow />
          </button>
        </article>
      </div>
    </Shell>
  );
}

const experience = [
  "Fintech (3 years)",
  "API security (4 years)",
  "Enterprise SaaS",
  "B2B platforms",
];
const skills = [
  "End-to-End product design",
  "Information architecture",
  "Design systems",
  "Complex workflows",
];

function About() {
  return (
    <Shell page="about">
      <div className="about-grid">
        <section className="about-copy">
          <div className="about-text">
            <h2 data-ds-text="Heading/H3/Bold">
              For the past 7 years, I&apos;ve been designing complex B2B
              products in fintech and API security.
            </h2>
            <p data-ds-text="Body/Large/Regular">
              I turn complex workflows, technical requirements, and large
              information spaces into clear, efficient user experiences. My work
              spans product design, information architecture, and scalable UI
              foundations, helping teams build intuitive products that can grow.
            </p>
          </div>
          <div className="about-lists">
            <InfoList heading="Experience" items={experience} />
            <InfoList heading="Skills" items={skills} />
          </div>
        </section>
        <section className="about-visual">
          <div className="about-portrait-block dot-field">
            <div className="about-image-crop">
              <img
                src={`${A}/shared/portrait.svg`}
                alt="Illustrated portrait of Denys"
              />
            </div>
            <p data-ds-text="Body/Large/Italic" className="about-caption">
            Outside of product design, I enjoy exploring interior design and
            Japanese culture, drawing inspiration from their emphasis on
            balance, attention to detail, and simplicity.
            </p>
          </div>
          <a data-ds-text="Body/Large/Semibold"
            className="about-cv"
            href={`${A}/about/denys-zagorodny-cv.pdf`}
            download
          >
            Download CV
          </a>
        </section>
      </div>
    </Shell>
  );
}

function InfoList({ heading, items }: { heading: string; items: string[] }) {
  return (
    <div className="info-list">
      <h3 data-ds-text="Body/Small/SEMIBOLD">{heading}</h3>
      {items.map((item) => (
        <p data-ds-text="Body/Default/Regular" className="body-small" key={item}>
          {item}
        </p>
      ))}
    </div>
  );
}

const personas = [
  [
    "Self-booker",
    "“I need to quickly arrange and manage transportation for myself.”",
  ],
  [
    "Assistant",
    "“I need to arrange and manage transportation for other employee.”",
  ],
  [
    "Travel Manager",
    "“I need to efficiently arrange and manage transportation for multiple people.”",
  ],
  [
    "Administrator",
    "“I need to configure the platform, users, permissions, and transportation settings for my organization.”",
  ],
];

const areas = [
  ["New Booking", "Create a ground transportation booking"],
  ["Manage Bookings", "Manage upcoming and past rides"],
  ["Manage Employees", "Manage passenger profiles and preferences"],
  ["Admin Settings", "Configure administrative functionality"],
  ["Search Receipts", "Find receipts for completed rides"],
];

const newIA = [
  "Booking",
  "Rides",
  "User Management",
  "Insights",
  "Admin Settings",
];

function CaseStudy() {
  return (
    <Shell page="hq-redesign" long>
      <article className="case-study">
        <section className="case-hero">
          <div data-ds-text="Body/Small/SEMIBOLD" className="breadcrumbs">
            <button data-ds-text="Body/Small/SEMIBOLD" onClick={() => go("work")}>Work</button> / HQ Enterprise
            Product Redesign
          </div>
          <h1 data-ds-text="Heading/H1/Bold">
            HQ Enterprise
            <br />
            Product Redesign
          </h1>
          <p data-ds-text="Body/Large/Regular">
            Simplifying a complex ground transportation
            <br /> management platform.
          </p>
        </section>

        <section className="split lead-section">
          <div>
            <h2 data-ds-text="Heading/H2/Bold">About Project</h2>
            <p data-ds-text="Body/Large/Regular">
              HQ is a complex enterprise ground transportation platform serving
              employees, travel bookers, administrators, and corporate mobility
              teams.
            </p>
          </div>
          <div>
            <p data-ds-text="Body/Large/Regular">
              The redesign explores how the product could be reorganized to
              simplify complex workflows, reduce duplication, improve
              discoverability, and create a scalable foundation for future
              growth.
            </p>
          </div>
        </section>
        <section className="project-details split">
          <div className="detail-grid">
            <InfoList
              heading="Team"
              items={["Product manager", "Engineers", "Product designer (me)"]}
            />
            <InfoList
              heading="Scope"
              items={[
                "Product information architecture",
                "Booking workflows experience",
                "",
              ]}
            />
          </div>
          <div className="dot-field detail-image">
            <img
              src={`${A}/case-study/project-context.png`}
              alt="HQ ground transport interface"
            />
          </div>
        </section>

        <section className="split challenge">
          <div>
            <h2 data-ds-text="Heading/H2/Bold">The Challenge</h2>
            <p data-ds-text="Body/Large/Regular">
              As HQ expanded, related features became scattered across the
              product, increasing navigation complexity and making core
              workflows harder to understand.
            </p>
          </div>
          <div>
            <p data-ds-text="Body/Large/Regular">
              The challenge was to simplify the experience without redesigning
              the entire platform, focusing on the information architecture and
              the primary booking workflow.
            </p>
          </div>
        </section>

        <section className="understanding">
          <div className="section-intro">
            <h2 data-ds-text="Heading/H2/Bold">Understanding the Product</h2>
            <p data-ds-text="Body/Large/Regular">
              Before redesigning HQ, I reviewed the existing product to
              understand what each area was for, who used it, what actions it
              supported, and how it connected to other parts of the system.
            </p>
          </div>
          <Band title="Personas" />
          <CardGrid items={personas} cols="four" />
          <Band title="Main Product Areas" />
          <CardGrid items={areas} cols="five" />
        </section>

        <section className="problems">
          <div className="section-intro">
            <h2 data-ds-text="Heading/H2/Bold">The Problems</h2>
          </div>
          <div className="problem-grid">
            <InfoList
              heading="Navigation"
              items={[
                "Features organised around pages, not tasks",
                "Related tools spread across the product",
                "Competing primary and supporting actions",
              ]}
            />
            <InfoList
              heading="Booking"
              items={[
                "Ambiguous roles and labels",
                "Closely related decisions split across steps",
                "Secondary content adds complexity",
              ]}
            />
            <InfoList
              heading="Scalability"
              items={[
                "Duplicate administrative areas",
                "Inconsistent terminology",
                "Limited room for future growth",
              ]}
            />
          </div>
        </section>

        <section className="ia">
          <div className="split">
            <div>
              <h2 data-ds-text="Heading/H2/Bold">Rethinking the Information Architecture</h2>
              <p data-ds-text="Body/Large/Regular">
                The existing navigation had grown around individual features
                rather than clear user tasks. Related functionality was spread
                across multiple areas, while supporting and administrative tools
                competed with core workflows at the same navigation level.
              </p>
            </div>
            <InfoList
              heading="Principles behind the new structure"
              items={[
                "Group functionality by user task, not by individual feature",
                "Keep primary navigation focused on main workflows",
                "Place supporting functionality close to where it is used",
                "Consolidate overlapping employee and administration controls",
                "Use clearer, more predictable terminology",
              ]}
            />
          </div>
          <Band title="Old Information Architecture" />
          <div className="old-ia-scroll dot-field">
            <img
              src={`${A}/case-study/old-information-architecture.png`}
              alt="Old HQ information architecture"
            />
          </div>
          <Band title="Proposed Information Architecture" />
          <IAList items={newIA} />
        </section>

        <section className="booking">
          <div className="section-intro">
            <h2 data-ds-text="Heading/H2/Bold">Redesigning the Booking Experience</h2>
            <p data-ds-text="Body/Large/Regular">
              New Booking is HQ’s primary workflow, but the existing experience
              separates closely related decisions across multiple steps and
              exposes users to booking rules that are not always easy to
              understand.
            </p>
          </div>
          <div className="comparison">
            <Compare
              label="Before"
              title="Passenger Info"
              image="booking-before.png"
              items={[
                "The step name does not represent all content",
                "Passenger, booker and authorising employee relationships are difficult to understand",
                "Secondary content creates unnecessary complexity",
                "The large map occupies space before it becomes useful",
              ]}
            />
            <Compare
              label="After"
              title="Ride Details"
              image="booking-after.png"
              items={[
                "Name reflects the content and package scenario",
                "Clear separation between passenger, booker and authorising employee",
                "Secondary content is placed inside a collapsible card",
                "The map is removed from this step",
              ]}
            />
          </div>
        </section>

        <section className="final-design">
          <div className="section-intro">
            <h2 data-ds-text="Heading/H2/Bold">Final Design</h2>
          </div>
          <div className="final-grid">
            {[
              "final-01.png",
              "final-02.png",
              "final-03.png",
              "final-04.png",
            ].map((name, i) => (
              <figure key={name}>
                <img
                  src={`${A}/case-study/${name}`}
                  alt={`HQ final design screen ${i + 1}`}
                />
              </figure>
            ))}
          </div>
        </section>

        <section className="split outcome">
          <div>
            <h2 data-ds-text="Heading/H2/Bold">Outcome</h2>
            <p data-ds-text="Body/Large/Regular">
              I reorganised HQ into five main areas centred on user tasks and
              redesigned the booking experience. Related tools now sit together,
              while Ride Details separates passenger, booker, and authorising
              employee information and keeps secondary content collapsed.
            </p>
          </div>
          <div className="validation-note">
            <p data-ds-text="Body/Large/Regular">
              These outcomes describe design changes; their impact on usability
              remains to be validated.
            </p>
          </div>
        </section>
        <section className="split reflection">
          <div>
            <h3 data-ds-text="Heading/H3/Bold">What I learned</h3>
            <p data-ds-text="Body/Large/Regular">
              Understanding the relationships between people, permissions, and
              tasks was essential to simplifying HQ. The product audit helped me
              identify where clearer grouping, terminology, and information
              hierarchy could address complexity.
            </p>
          </div>
          <div>
            <h3 data-ds-text="Heading/H3/Bold">What I would validate next</h3>
            <p data-ds-text="Body/Large/Regular">
              I would test whether users can find receipts, manage users, and
              complete bookings for themselves and others. I would track task
              completion, navigation errors, and confusion around booking roles
              to assess whether the proposed changes improve usability.
            </p>
          </div>
        </section>
      </article>
    </Shell>
  );
}

function Band({ title }: { title: string }) {
  return <div data-ds-text="Body/Small/SEMIBOLD" className="eyebrow band">{title}</div>;
}
function CardGrid({ items, cols }: { items: string[][]; cols: string }) {
  return (
    <div className={`card-grid ${cols}`}>
      {items.map(([title, body]) => (
        <div key={title}>
          <h3 data-ds-text="Heading/H3/Bold">{title}</h3>
          <p data-ds-text="Body/Default/Regular">{body}</p>
        </div>
      ))}
    </div>
  );
}
function IAList({ items, old = false }: { items: string[]; old?: boolean }) {
  return (
    <div className={`ia-list dot-field ${old ? "old" : ""}`}>
      {items.map((item, i) => (
        <div key={item}>
          <strong data-ds-text="Body/Default/SemiBold">{item}</strong>
          <span data-ds-text="Body/Default/Regular">
            {old
              ? [
                  "Passenger · Date and Location · Summary",
                  "Upcoming Rides · Ride History · Favorites",
                  "Coverage Map",
                  "Manage Employees · Book-on-behalf",
                  "Search Receipts",
                  "Outstanding Charges",
                ][i]
              : [
                  "Book a Ride · Favorites · Coverage Map",
                  "Upcoming Rides · Ride History · Receipts",
                  "Manage Users · Blocked Users",
                  "Ride Analytics · Reports",
                  "Notifications · Car Lines · Integrations",
                ][i]}
          </span>
        </div>
      ))}
    </div>
  );
}
function Compare({
  label,
  title,
  image,
  items,
}: {
  label: string;
  title: string;
  image: string;
  items: string[];
}) {
  return (
    <article>
      <div className="compare-title">
        <span data-ds-text="Body/Small/SEMIBOLD">{label}</span>
        <strong data-ds-text="Body/Small/SEMIBOLD">{title}</strong>
      </div>
      <div className="compare-image dot-field">
        <img src={`${A}/case-study/${image}`} alt={`${label}: ${title}`} />
      </div>
      <InfoList
        heading={label === "Before" ? "Problems" : "Key UX decisions"}
        items={items}
      />
    </article>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>(routeFromPath());
  useEffect(() => {
    const update = () => setPage(routeFromPath());
    addEventListener("popstate", update);
    return () => removeEventListener("popstate", update);
  }, []);
  if (page === "work") return <Work />;
  if (page === "about") return <About />;
  if (page === "hq-redesign") return <CaseStudy />;
  return <Home />;
}
