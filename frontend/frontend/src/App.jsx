import { useState, useEffect, useRef } from "react";

// ── MOCK DATA ──────────────────────────────────────────────────────────────────
const CONSULTANTS = [
  { id: 1, name: "Dr. Sarah Chen", role: "Cloud Architecture", avatar: "SC", exp: "14 yrs", rating: 4.9, slots: ["09:00","10:00","14:00","16:00"], timezone: "UTC-5", tags:["AWS","Azure","GCP"] },
  { id: 2, name: "Marcus Okafor", role: "Cybersecurity", avatar: "MO", exp: "11 yrs", rating: 4.8, slots: ["08:00","11:00","13:00","15:00"], timezone: "UTC+1", tags:["PenTest","SIEM","Zero Trust"] },
  { id: 3, name: "Priya Nair", role: "AI & ML Strategy", avatar: "PN", exp: "9 yrs", rating: 5.0, slots: ["10:00","12:00","14:00","17:00"], timezone: "UTC+5:30", tags:["LLMs","MLOps","DataEng"] },
  { id: 4, name: "James Whitfield", role: "Digital Transformation", avatar: "JW", exp: "16 yrs", rating: 4.7, slots: ["09:00","11:00","13:00","15:00"], timezone: "UTC+0", tags:["ERP","SAP","Change Mgmt"] },
  { id: 5, name: "Yuki Tanaka", role: "DevOps & SRE", avatar: "YT", exp: "8 yrs", rating: 4.9, slots: ["08:00","10:00","12:00","16:00"], timezone: "UTC+9", tags:["Kubernetes","Terraform","CI/CD"] },
  { id: 6, name: "Elena Volkov", role: "Enterprise Architecture", avatar: "EV", exp: "13 yrs", rating: 4.8, slots: ["09:00","11:00","14:00","17:00"], timezone: "UTC+3", tags:["TOGAF","Microservices","SOA"] },
];

const SERVICES = [
  { icon: "☁", title: "Cloud Strategy", desc: "Migration planning, cost optimization, multi-cloud architecture design for global enterprises." },
  { icon: "🔒", title: "Security Audit", desc: "Comprehensive vulnerability assessment, compliance checks, and zero-trust implementation." },
  { icon: "🤖", title: "AI Integration", desc: "End-to-end AI roadmap, model selection, MLOps pipelines and intelligent automation." },
  { icon: "⚡", title: "Digital Transformation", desc: "Business process reengineering, legacy modernization, and change management." },
  { icon: "🔧", title: "DevOps Consulting", desc: "CI/CD pipelines, infrastructure as code, reliability engineering and SLA optimization." },
  { icon: "📊", title: "Data Architecture", desc: "Data lake design, real-time analytics, governance frameworks and BI strategy." },
];

const STATS = [
  { value: "2,400+", label: "Clients Worldwide" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "47", label: "Countries Served" },
  { value: "15k+", label: "Projects Delivered" },
];

// ── STORAGE (simulated backend) ────────────────────────────────────────────────
const store = {
  bookings: [],
  addBooking(b) { this.bookings.unshift({ ...b, id: Date.now(), status: "Confirmed" }); },
};

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home"); // home | book | dashboard | confirm
  const [booking, setBooking] = useState({ step: 1, consultant: null, date: "", slot: "", name: "", email: "", company: "", topic: "" });
  const [allBookings, setAllBookings] = useState([]);
  const [navOpen, setNavOpen] = useState(false);
  const [adminView, setAdminView] = useState(false);

  const confirmBooking = () => {
    const full = { ...booking, consultant: booking.consultant.name, role: booking.consultant.role };
    store.addBooking(full);
    setAllBookings([...store.bookings]);
    setPage("confirm");
  };

  const goHome = () => { setPage("home"); setBooking({ step:1, consultant:null, date:"", slot:"", name:"", email:"", company:"", topic:"" }); };
  const goBook = () => { setPage("book"); setBooking(b => ({ ...b, step: 1 })); };

  return (
    <div style={css.root}>
      <style>{GLOBAL_CSS}</style>

      {/* NAV */}
      <nav style={css.nav}>
        <div style={css.navInner}>
          <span style={css.logo} onClick={goHome}>NEXUS<span style={css.logoAccent}>IT</span></span>
          <div style={css.navLinks}>
            <button style={css.navLink} onClick={goHome}>Home</button>
            <button style={css.navLink} onClick={() => { setPage("home"); setTimeout(()=>document.getElementById("services")?.scrollIntoView({behavior:"smooth"}),100); }}>Services</button>
            <button style={css.navLink} onClick={() => { setPage("home"); setTimeout(()=>document.getElementById("team")?.scrollIntoView({behavior:"smooth"}),100); }}>Experts</button>
            <button style={css.navLink} onClick={() => { setPage("dashboard"); setAllBookings([...store.bookings]); }}>My Bookings</button>
            <button style={css.ctaSmall} onClick={goBook}>Book Now</button>
          </div>
        </div>
      </nav>

      {/* PAGES */}
      {page === "home" && <HomePage onBook={goBook} />}
      {page === "book" && <BookingPage booking={booking} setBooking={setBooking} onConfirm={confirmBooking} onBack={goHome} />}
      {page === "confirm" && <ConfirmPage booking={booking} onHome={goHome} onDash={() => { setPage("dashboard"); setAllBookings([...store.bookings]); }} />}
      {page === "dashboard" && <DashboardPage bookings={allBookings} onBook={goBook} onHome={goHome} />}
    </div>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ onBook }) {
  return (
    <div>
      {/* HERO */}
      <section style={css.hero}>
        <div style={css.heroGrid}>
          <div style={css.heroBg} />
          <div style={css.heroContent} className="fade-in">
            <div style={css.heroBadge}>🌐 Trusted by 47 countries worldwide</div>
            <h1 style={css.heroTitle}>World-Class IT<br/><span style={css.heroAccent}>Consultation</span><br/>At Your Fingertips</h1>
            <p style={css.heroSub}>Connect with senior technology experts for strategic guidance in Cloud, Security, AI, and Digital Transformation. Global reach. Real results.</p>
            <div style={css.heroActions}>
              <button style={css.ctaPrimary} onClick={onBook} className="btn-glow">Book a Consultation →</button>
              <button style={css.ctaGhost} onClick={() => document.getElementById("services")?.scrollIntoView({behavior:"smooth"})}>Explore Services</button>
            </div>
          </div>
          <div style={css.heroVisual} className="fade-in-slow">
            <div style={css.glowOrb} />
            <div style={css.heroCard}>
              <div style={css.heroCardTop}>
                <div style={css.onlineDot} /> Live Expert Available
              </div>
              <div style={css.heroCardName}>Dr. Sarah Chen</div>
              <div style={css.heroCardRole}>Cloud Architecture Specialist</div>
              <div style={css.heroCardStat}><span>⭐ 4.9</span><span>14 yrs exp</span><span>UTC-5</span></div>
              <button style={css.heroCardBtn} onClick={onBook}>Schedule Now</button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div style={css.statsRow}>
          {STATS.map(s => (
            <div key={s.label} style={css.statItem}>
              <div style={css.statValue}>{s.value}</div>
              <div style={css.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={css.section}>
        <div style={css.sectionHeader}>
          <div style={css.pill}>Our Expertise</div>
          <h2 style={css.sectionTitle}>Comprehensive IT Services</h2>
          <p style={css.sectionSub}>Specialized consulting across every dimension of modern enterprise technology.</p>
        </div>
        <div style={css.servicesGrid}>
          {SERVICES.map((s, i) => (
            <div key={i} style={css.serviceCard} className="card-hover">
              <div style={css.serviceIcon}>{s.icon}</div>
              <h3 style={css.serviceTitle}>{s.title}</h3>
              <p style={css.serviceDesc}>{s.desc}</p>
              <button style={css.serviceLink} onClick={onBook}>Book Expert →</button>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" style={{ ...css.section, background: "rgba(255,255,255,0.01)" }}>
        <div style={css.sectionHeader}>
          <div style={css.pill}>Meet the Experts</div>
          <h2 style={css.sectionTitle}>Senior Consultants</h2>
          <p style={css.sectionSub}>Industry veterans ready to accelerate your technology journey.</p>
        </div>
        <div style={css.teamGrid}>
          {CONSULTANTS.map(c => (
            <div key={c.id} style={css.teamCard} className="card-hover">
              <div style={css.teamAvatar}>{c.avatar}</div>
              <div style={css.teamName}>{c.name}</div>
              <div style={css.teamRole}>{c.role}</div>
              <div style={css.teamMeta}>
                <span>⭐ {c.rating}</span>
                <span>💼 {c.exp}</span>
                <span>🕐 {c.timezone}</span>
              </div>
              <div style={css.tagRow}>{c.tags.map(t => <span key={t} style={css.tag}>{t}</span>)}</div>
              <button style={css.teamBtn} onClick={onBook}>Book Session</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={css.ctaBanner}>
        <div style={css.ctaBannerGlow} />
        <h2 style={css.ctaBannerTitle}>Ready to Transform Your Business?</h2>
        <p style={css.ctaBannerSub}>Schedule a free 30-minute discovery call with a senior consultant today.</p>
        <button style={css.ctaPrimary} onClick={onBook} className="btn-glow">Book Free Consultation →</button>
      </section>

      {/* FOOTER */}
      <footer style={css.footer}>
        <span style={css.logo}>NEXUS<span style={css.logoAccent}>IT</span></span>
        <span style={{ color: "#555", fontSize: 13 }}>© 2025 NexusIT Consulting · Serving 47 countries · Privacy · Terms</span>
      </footer>
    </div>
  );
}

// ── BOOKING PAGE ──────────────────────────────────────────────────────────────
function BookingPage({ booking, setBooking, onConfirm, onBack }) {
  const set = (k, v) => setBooking(b => ({ ...b, [k]: v }));
  const next = () => setBooking(b => ({ ...b, step: b.step + 1 }));
  const prev = () => setBooking(b => ({ ...b, step: b.step - 1 }));

  const today = new Date().toISOString().split("T")[0];
  const steps = ["Choose Expert", "Pick Date & Time", "Your Details", "Confirm"];

  return (
    <div style={css.bookPage}>
      {/* Step indicator */}
      <div style={css.stepBar}>
        {steps.map((s, i) => (
          <div key={i} style={css.stepItem}>
            <div style={{ ...css.stepDot, ...(booking.step > i+1 ? css.stepDone : booking.step === i+1 ? css.stepActive : {}) }}>
              {booking.step > i+1 ? "✓" : i+1}
            </div>
            <span style={{ ...css.stepLabel, ...(booking.step === i+1 ? { color: "#c9a84c" } : {}) }}>{s}</span>
          </div>
        ))}
      </div>

      <div style={css.bookCard}>
        {/* STEP 1 – Choose Consultant */}
        {booking.step === 1 && (
          <div className="fade-in">
            <h2 style={css.bookTitle}>Choose Your Expert</h2>
            <p style={css.bookSub}>Select a senior consultant that matches your needs.</p>
            <div style={css.consultantGrid}>
              {CONSULTANTS.map(c => (
                <div key={c.id} style={{ ...css.consultantCard, ...(booking.consultant?.id === c.id ? css.consultantSelected : {}) }}
                  onClick={() => set("consultant", c)} className="card-hover">
                  <div style={css.cAvatar}>{c.avatar}</div>
                  <div style={css.cName}>{c.name}</div>
                  <div style={css.cRole}>{c.role}</div>
                  <div style={css.cMeta}><span>⭐{c.rating}</span><span>{c.exp}</span></div>
                  <div style={css.tagRow}>{c.tags.map(t => <span key={t} style={css.tag}>{t}</span>)}</div>
                </div>
              ))}
            </div>
            <div style={css.bookActions}>
              <button style={css.btnSecondary} onClick={onBack}>← Back</button>
              <button style={css.ctaPrimary} disabled={!booking.consultant} onClick={next}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 2 – Date & Time */}
        {booking.step === 2 && (
          <div className="fade-in">
            <h2 style={css.bookTitle}>Select Date & Time</h2>
            <p style={css.bookSub}>All times shown in your local timezone. Session: 60 minutes.</p>
            <div style={css.fieldGroup}>
              <label style={css.label}>Preferred Date</label>
              <input type="date" min={today} value={booking.date} onChange={e => set("date", e.target.value)} style={css.input} />
            </div>
            {booking.date && (
              <div className="fade-in">
                <label style={css.label}>Available Slots ({booking.consultant?.timezone})</label>
                <div style={css.slotGrid}>
                  {booking.consultant?.slots.map(s => (
                    <button key={s} style={{ ...css.slot, ...(booking.slot === s ? css.slotActive : {}) }} onClick={() => set("slot", s)}>{s}</button>
                  ))}
                </div>
              </div>
            )}
            <div style={css.bookActions}>
              <button style={css.btnSecondary} onClick={prev}>← Back</button>
              <button style={css.ctaPrimary} disabled={!booking.date || !booking.slot} onClick={next}>Continue →</button>
            </div>
          </div>
        )}

        {/* STEP 3 – Details */}
        {booking.step === 3 && (
          <div className="fade-in">
            <h2 style={css.bookTitle}>Your Details</h2>
            <p style={css.bookSub}>Help your consultant prepare for a productive session.</p>
            <div style={css.formGrid}>
              <div style={css.fieldGroup}>
                <label style={css.label}>Full Name *</label>
                <input placeholder="John Smith" value={booking.name} onChange={e=>set("name",e.target.value)} style={css.input} />
              </div>
              <div style={css.fieldGroup}>
                <label style={css.label}>Email Address *</label>
                <input type="email" placeholder="john@company.com" value={booking.email} onChange={e=>set("email",e.target.value)} style={css.input} />
              </div>
              <div style={css.fieldGroup}>
                <label style={css.label}>Company Name</label>
                <input placeholder="Acme Corp" value={booking.company} onChange={e=>set("company",e.target.value)} style={css.input} />
              </div>
              <div style={css.fieldGroup}>
                <label style={css.label}>Country</label>
                <input placeholder="United States" style={css.input} />
              </div>
              <div style={{ ...css.fieldGroup, gridColumn: "1/-1" }}>
                <label style={css.label}>Consultation Topic *</label>
                <textarea placeholder="Briefly describe what you'd like to discuss..." value={booking.topic} onChange={e=>set("topic",e.target.value)} style={{ ...css.input, height: 90, resize: "vertical" }} />
              </div>
            </div>
            <div style={css.bookActions}>
              <button style={css.btnSecondary} onClick={prev}>← Back</button>
              <button style={css.ctaPrimary} disabled={!booking.name || !booking.email || !booking.topic} onClick={next}>Review →</button>
            </div>
          </div>
        )}

        {/* STEP 4 – Confirm */}
        {booking.step === 4 && (
          <div className="fade-in">
            <h2 style={css.bookTitle}>Review & Confirm</h2>
            <div style={css.summaryCard}>
              <div style={css.summaryRow}><span style={css.summaryKey}>Consultant</span><span style={css.summaryVal}>{booking.consultant?.name}</span></div>
              <div style={css.summaryRow}><span style={css.summaryKey}>Specialty</span><span style={css.summaryVal}>{booking.consultant?.role}</span></div>
              <div style={css.summaryRow}><span style={css.summaryKey}>Date</span><span style={css.summaryVal}>{booking.date}</span></div>
              <div style={css.summaryRow}><span style={css.summaryKey}>Time</span><span style={css.summaryVal}>{booking.slot} ({booking.consultant?.timezone})</span></div>
              <div style={css.summaryRow}><span style={css.summaryKey}>Name</span><span style={css.summaryVal}>{booking.name}</span></div>
              <div style={css.summaryRow}><span style={css.summaryKey}>Email</span><span style={css.summaryVal}>{booking.email}</span></div>
              <div style={css.summaryRow}><span style={css.summaryKey}>Topic</span><span style={css.summaryVal}>{booking.topic}</span></div>
              <div style={{ ...css.summaryRow, marginTop: 12, paddingTop: 12, borderTop: "1px solid #2a2a2a" }}>
                <span style={css.summaryKey}>Duration</span><span style={{ ...css.summaryVal, color: "#c9a84c" }}>60 mins · FREE Discovery Call</span>
              </div>
            </div>
            <div style={css.bookActions}>
              <button style={css.btnSecondary} onClick={prev}>← Edit</button>
              <button style={css.ctaPrimary} onClick={onConfirm} className="btn-glow">Confirm Booking ✓</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── CONFIRM PAGE ──────────────────────────────────────────────────────────────
function ConfirmPage({ booking, onHome, onDash }) {
  return (
    <div style={css.confirmPage}>
      <div style={css.confirmCard} className="fade-in">
        <div style={css.confirmIcon}>✅</div>
        <h2 style={css.confirmTitle}>Booking Confirmed!</h2>
        <p style={css.confirmSub}>A confirmation email has been sent to <strong style={{ color: "#c9a84c" }}>{booking.email}</strong></p>
        <div style={css.summaryCard}>
          <div style={css.summaryRow}><span style={css.summaryKey}>Consultant</span><span style={css.summaryVal}>{booking.consultant?.name}</span></div>
          <div style={css.summaryRow}><span style={css.summaryKey}>Date & Time</span><span style={css.summaryVal}>{booking.date} at {booking.slot}</span></div>
          <div style={css.summaryRow}><span style={css.summaryKey}>Format</span><span style={css.summaryVal}>Video Call (link will be emailed)</span></div>
          <div style={css.summaryRow}><span style={css.summaryKey}>Ref ID</span><span style={{ ...css.summaryVal, color: "#c9a84c" }}>NIT-{Date.now().toString().slice(-6)}</span></div>
        </div>
        <div style={css.bookActions}>
          <button style={css.btnSecondary} onClick={onHome}>← Home</button>
          <button style={css.ctaPrimary} onClick={onDash}>View My Bookings →</button>
        </div>
      </div>
    </div>
  );
}

// ── DASHBOARD PAGE ────────────────────────────────────────────────────────────
function DashboardPage({ bookings, onBook, onHome }) {
  return (
    <div style={css.dashPage}>
      <div style={css.dashHeader}>
        <div>
          <h2 style={css.dashTitle}>My Bookings</h2>
          <p style={{ color: "#666", margin: 0, fontSize: 14 }}>{bookings.length} consultation{bookings.length !== 1 ? "s" : ""} scheduled</p>
        </div>
        <button style={css.ctaPrimary} onClick={onBook}>+ New Booking</button>
      </div>

      {bookings.length === 0 ? (
        <div style={css.emptyState}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📅</div>
          <h3 style={{ color: "#888", margin: "0 0 8px" }}>No bookings yet</h3>
          <p style={{ color: "#555", margin: "0 0 24px" }}>Schedule your first consultation with a senior expert.</p>
          <button style={css.ctaPrimary} onClick={onBook}>Book a Consultation →</button>
        </div>
      ) : (
        <div style={css.bookingList}>
          {bookings.map(b => (
            <div key={b.id} style={css.bookingItem} className="card-hover">
              <div style={css.bAvatar}>{b.consultant?.substring(0,2)}</div>
              <div style={{ flex: 1 }}>
                <div style={css.bName}>{b.consultant}</div>
                <div style={css.bRole}>{b.role}</div>
                <div style={css.bMeta}>{b.date} · {b.slot} · {b.company || "Individual"}</div>
              </div>
              <div style={css.bStatus}>
                <span style={css.badge}>✓ {b.status}</span>
                <div style={{ fontSize: 12, color: "#555", marginTop: 4 }}>60 min</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── STYLES ────────────────────────────────────────────────────────────────────
const GOLD = "#c9a84c";
const DARK = "#0a0a0a";
const CARD = "#111111";
const BORDER = "#1e1e1e";

const css = {
  root: { fontFamily: "'Cormorant Garamond', 'Georgia', serif", background: DARK, color: "#e8e4dc", minHeight: "100vh", overflowX: "hidden" },
  nav: { position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}` },
  navInner: { maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 },
  logo: { fontSize: 22, fontWeight: 700, letterSpacing: 3, cursor: "pointer", color: "#e8e4dc" },
  logoAccent: { color: GOLD },
  navLinks: { display: "flex", alignItems: "center", gap: 8 },
  navLink: { background: "none", border: "none", color: "#999", cursor: "pointer", fontSize: 14, padding: "8px 12px", letterSpacing: 0.5, fontFamily: "inherit", transition: "color .2s" },
  ctaSmall: { background: GOLD, border: "none", color: "#000", padding: "8px 20px", borderRadius: 4, fontWeight: 700, cursor: "pointer", fontSize: 13, letterSpacing: 1, fontFamily: "inherit" },
  hero: { paddingTop: 0, background: `radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.07) 0%, transparent 60%), ${DARK}` },
  heroGrid: { maxWidth: 1200, margin: "0 auto", padding: "80px 24px 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" },
  heroBg: { position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" },
  heroContent: { position: "relative" },
  heroBadge: { display: "inline-block", background: "rgba(201,168,76,0.1)", border: `1px solid rgba(201,168,76,0.3)`, color: GOLD, padding: "6px 16px", borderRadius: 20, fontSize: 13, marginBottom: 24, letterSpacing: 0.5 },
  heroTitle: { fontSize: "clamp(36px,5vw,62px)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 20px", letterSpacing: -1 },
  heroAccent: { color: GOLD, fontStyle: "italic" },
  heroSub: { color: "#888", fontSize: 17, lineHeight: 1.7, margin: "0 0 32px", maxWidth: 480, fontFamily: "system-ui, sans-serif", fontWeight: 300 },
  heroActions: { display: "flex", gap: 16, flexWrap: "wrap" },
  ctaPrimary: { background: GOLD, border: "none", color: "#000", padding: "14px 28px", borderRadius: 4, fontWeight: 700, cursor: "pointer", fontSize: 15, letterSpacing: 0.5, fontFamily: "inherit", transition: "opacity .2s, transform .15s" },
  ctaGhost: { background: "transparent", border: `1px solid ${BORDER}`, color: "#aaa", padding: "14px 28px", borderRadius: 4, cursor: "pointer", fontSize: 15, fontFamily: "inherit", transition: "border-color .2s, color .2s" },
  heroVisual: { position: "relative", display: "flex", justifyContent: "center" },
  glowOrb: { position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" },
  heroCard: { position: "relative", background: CARD, border: `1px solid rgba(201,168,76,0.2)`, borderRadius: 12, padding: 28, width: 280, boxShadow: "0 24px 80px rgba(0,0,0,0.5)" },
  heroCardTop: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#4ade80", marginBottom: 20, fontFamily: "system-ui, sans-serif" },
  onlineDot: { width: 8, height: 8, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80" },
  heroCardName: { fontSize: 20, fontWeight: 600, marginBottom: 4 },
  heroCardRole: { color: GOLD, fontSize: 13, marginBottom: 16, fontFamily: "system-ui, sans-serif" },
  heroCardStat: { display: "flex", gap: 12, fontSize: 12, color: "#666", marginBottom: 20, fontFamily: "system-ui, sans-serif" },
  heroCardBtn: { width: "100%", background: GOLD, border: "none", color: "#000", padding: "10px", borderRadius: 6, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 14 },
  statsRow: { maxWidth: 1200, margin: "0 auto", padding: "40px 24px 60px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, borderTop: `1px solid ${BORDER}` },
  statItem: { textAlign: "center" },
  statValue: { fontSize: 36, fontWeight: 700, color: GOLD },
  statLabel: { color: "#666", fontSize: 13, fontFamily: "system-ui, sans-serif", marginTop: 4 },
  section: { maxWidth: 1200, margin: "0 auto", padding: "80px 24px" },
  sectionHeader: { textAlign: "center", marginBottom: 56 },
  pill: { display: "inline-block", background: "rgba(201,168,76,0.08)", border: `1px solid rgba(201,168,76,0.2)`, color: GOLD, padding: "5px 14px", borderRadius: 20, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, fontFamily: "system-ui, sans-serif" },
  sectionTitle: { fontSize: "clamp(28px,4vw,44px)", fontWeight: 700, margin: "0 0 12px" },
  sectionSub: { color: "#666", fontSize: 16, maxWidth: 500, margin: "0 auto", fontFamily: "system-ui, sans-serif" },
  servicesGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr))", gap: 24 },
  serviceCard: { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 32, transition: "border-color .3s, transform .3s" },
  serviceIcon: { fontSize: 32, marginBottom: 16 },
  serviceTitle: { fontSize: 20, fontWeight: 600, margin: "0 0 10px" },
  serviceDesc: { color: "#666", lineHeight: 1.6, fontSize: 14, fontFamily: "system-ui, sans-serif", margin: "0 0 20px" },
  serviceLink: { background: "none", border: "none", color: GOLD, cursor: "pointer", fontSize: 14, padding: 0, fontFamily: "inherit", letterSpacing: 0.5 },
  teamGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 24 },
  teamCard: { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 28, textAlign: "center", transition: "border-color .3s, transform .3s" },
  teamAvatar: { width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, #8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#000", margin: "0 auto 16px" },
  teamName: { fontSize: 18, fontWeight: 600, marginBottom: 4 },
  teamRole: { color: GOLD, fontSize: 13, marginBottom: 12, fontFamily: "system-ui, sans-serif" },
  teamMeta: { display: "flex", justifyContent: "center", gap: 12, fontSize: 12, color: "#666", marginBottom: 12, fontFamily: "system-ui, sans-serif" },
  tagRow: { display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginBottom: 16 },
  tag: { background: "rgba(201,168,76,0.08)", border: `1px solid rgba(201,168,76,0.2)`, color: GOLD, padding: "3px 10px", borderRadius: 12, fontSize: 11, fontFamily: "system-ui, sans-serif" },
  teamBtn: { background: "transparent", border: `1px solid ${BORDER}`, color: "#aaa", padding: "8px 20px", borderRadius: 4, cursor: "pointer", fontSize: 13, fontFamily: "inherit", width: "100%", transition: "background .2s, color .2s" },
  ctaBanner: { position: "relative", background: `linear-gradient(135deg, #111 0%, rgba(201,168,76,0.08) 100%)`, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: "80px 24px", textAlign: "center", overflow: "hidden" },
  ctaBannerGlow: { position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%)" },
  ctaBannerTitle: { position: "relative", fontSize: "clamp(28px,4vw,46px)", fontWeight: 700, margin: "0 0 12px" },
  ctaBannerSub: { position: "relative", color: "#666", fontSize: 16, margin: "0 0 32px", fontFamily: "system-ui, sans-serif" },
  footer: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 48px", borderTop: `1px solid ${BORDER}`, flexWrap: "wrap", gap: 16 },
  // BOOKING
  bookPage: { maxWidth: 900, margin: "0 auto", padding: "48px 24px" },
  stepBar: { display: "flex", justifyContent: "center", gap: 32, marginBottom: 48, flexWrap: "wrap" },
  stepItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  stepDot: { width: 36, height: 36, borderRadius: "50%", background: "#1a1a1a", border: `1px solid #333`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontFamily: "system-ui, sans-serif" },
  stepActive: { background: GOLD, border: `1px solid ${GOLD}`, color: "#000", fontWeight: 700 },
  stepDone: { background: "#1a3a1a", border: `1px solid #4ade80`, color: "#4ade80" },
  stepLabel: { fontSize: 12, color: "#555", fontFamily: "system-ui, sans-serif", letterSpacing: 0.5 },
  bookCard: { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "40px 48px" },
  bookTitle: { fontSize: 28, fontWeight: 700, margin: "0 0 8px" },
  bookSub: { color: "#666", fontSize: 14, margin: "0 0 32px", fontFamily: "system-ui, sans-serif" },
  consultantGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 16, marginBottom: 32 },
  consultantCard: { background: "#0d0d0d", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 20, cursor: "pointer", transition: "all .2s", textAlign: "center" },
  consultantSelected: { border: `1px solid ${GOLD}`, background: "rgba(201,168,76,0.04)" },
  cAvatar: { width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, #8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#000", margin: "0 auto 12px" },
  cName: { fontSize: 15, fontWeight: 600, marginBottom: 4 },
  cRole: { color: GOLD, fontSize: 12, marginBottom: 8, fontFamily: "system-ui, sans-serif" },
  cMeta: { display: "flex", justifyContent: "center", gap: 12, fontSize: 12, color: "#666", marginBottom: 10, fontFamily: "system-ui, sans-serif" },
  bookActions: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 32, paddingTop: 24, borderTop: `1px solid ${BORDER}` },
  btnSecondary: { background: "none", border: `1px solid ${BORDER}`, color: "#888", padding: "12px 24px", borderRadius: 4, cursor: "pointer", fontSize: 14, fontFamily: "inherit" },
  fieldGroup: { marginBottom: 20 },
  label: { display: "block", color: "#888", fontSize: 12, fontFamily: "system-ui, sans-serif", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 },
  input: { width: "100%", background: "#0d0d0d", border: `1px solid ${BORDER}`, color: "#e8e4dc", padding: "12px 16px", borderRadius: 6, fontSize: 15, fontFamily: "inherit", outline: "none", boxSizing: "border-box", transition: "border-color .2s" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 },
  slotGrid: { display: "flex", flexWrap: "wrap", gap: 12, marginTop: 8 },
  slot: { background: "#0d0d0d", border: `1px solid ${BORDER}`, color: "#aaa", padding: "10px 20px", borderRadius: 6, cursor: "pointer", fontSize: 15, fontFamily: "inherit", transition: "all .2s" },
  slotActive: { background: "rgba(201,168,76,0.1)", border: `1px solid ${GOLD}`, color: GOLD },
  summaryCard: { background: "#0d0d0d", border: `1px solid ${BORDER}`, borderRadius: 10, padding: 24, marginBottom: 24 },
  summaryRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid #151515` },
  summaryKey: { color: "#666", fontSize: 13, fontFamily: "system-ui, sans-serif" },
  summaryVal: { color: "#e8e4dc", fontSize: 14, fontFamily: "system-ui, sans-serif", textAlign: "right", maxWidth: "60%" },
  // CONFIRM
  confirmPage: { display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh", padding: 24 },
  confirmCard: { background: CARD, border: `1px solid rgba(74,222,128,0.2)`, borderRadius: 16, padding: "56px 48px", maxWidth: 560, width: "100%", textAlign: "center" },
  confirmIcon: { fontSize: 56, marginBottom: 20 },
  confirmTitle: { fontSize: 32, fontWeight: 700, margin: "0 0 12px" },
  confirmSub: { color: "#888", fontSize: 15, margin: "0 0 32px", fontFamily: "system-ui, sans-serif" },
  // DASHBOARD
  dashPage: { maxWidth: 900, margin: "0 auto", padding: "48px 24px" },
  dashHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40 },
  dashTitle: { fontSize: 32, fontWeight: 700, margin: "0 0 4px" },
  emptyState: { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "80px 32px", textAlign: "center" },
  bookingList: { display: "flex", flexDirection: "column", gap: 16 },
  bookingItem: { background: CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, display: "flex", alignItems: "center", gap: 20, transition: "border-color .2s" },
  bAvatar: { width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg, ${GOLD}, #8b6914)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#000", flexShrink: 0 },
  bName: { fontSize: 17, fontWeight: 600, marginBottom: 2 },
  bRole: { color: GOLD, fontSize: 13, marginBottom: 4, fontFamily: "system-ui, sans-serif" },
  bMeta: { color: "#666", fontSize: 13, fontFamily: "system-ui, sans-serif" },
  bStatus: { textAlign: "right", flexShrink: 0 },
  badge: { background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", color: "#4ade80", padding: "4px 12px", borderRadius: 12, fontSize: 12, fontFamily: "system-ui, sans-serif" },
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0a0a; }
  .fade-in { animation: fadeIn 0.5s ease forwards; }
  .fade-in-slow { animation: fadeIn 0.8s ease forwards; }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .card-hover:hover { border-color: rgba(201,168,76,0.4) !important; transform: translateY(-3px); }
  .btn-glow:hover { box-shadow: 0 0 24px rgba(201,168,76,0.4); }
  input:focus, textarea:focus { border-color: rgba(201,168,76,0.5) !important; }
  button:disabled { opacity: 0.4; cursor: not-allowed !important; }
  @media (max-width: 768px) {
    .heroGrid { grid-template-columns: 1fr !important; }
    .statsRow { grid-template-columns: repeat(2,1fr) !important; }
    .formGrid { grid-template-columns: 1fr !important; }
    .bookCard { padding: 24px 20px !important; }
  }
`;
