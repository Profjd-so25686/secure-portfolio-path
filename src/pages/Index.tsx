import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import CookieConsent from "@/components/portfolio/CookieConsent";
import { UnitCard } from "@/components/portfolio/UnitCard";
import { ArtefactDialog, Artefact } from "@/components/portfolio/ArtefactDialog";
import { ArtefactReviewDialog } from "@/components/portfolio/ArtefactReviewDialog";

const STORAGE_KEY = "security_risk_portfolio_v1";

const Index = () => {
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [dialogUnit, setDialogUnit] = useState<number | null>(null);
  const [reviewArtefact, setReviewArtefact] = useState<Artefact | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as any[];
        setArtefacts(parsed.map((a) => ({
          ...a,
          reviewed: a.reviewed ?? false,
          reviewedAt: a.reviewedAt,
        })));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(artefacts));
  }, [artefacts]);

  const artefactsByUnit = useMemo(() => {
    const map = new Map<number, Artefact[]>();
    for (let i = 1; i <= 12; i++) map.set(i, []);
    artefacts.forEach(a => map.get(a.unit)?.push(a));
    return map;
  }, [artefacts]);

  const onSaveArtefact = (a: Artefact) => {
    setArtefacts(prev => [a, ...prev]);
    setReviewArtefact(a);
  };

  const markReviewed = (id: string) => {
    setArtefacts(prev =>
      prev.map(item =>
        item.id === id ? { ...item, reviewed: true, reviewedAt: new Date().toISOString() } : item
      )
    );
    toast({ title: "Marked as reviewed", description: "You can reopen it from Recent Artefacts." });
    setReviewArtefact(null);
  };

  const recent = artefacts.slice(0, 5);

  return (
    <>
      <Helmet>
        <title>Security & Risk Management E-Portfolio</title>
        <meta name="description" content="Learning and development e-portfolio for the Security & Risk Management module. Upload artefacts for Units 1–12 with reflections." />
        <link rel="canonical" href="/" />
        <meta property="og:title" content="Security & Risk Management E-Portfolio" />
        <meta property="og:description" content="Showcase artefacts, contributions, evaluations, and reflections across Units 1–12." />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: 'Security & Risk Management E-Portfolio',
          description: 'Course e-portfolio featuring artefacts, collaboration notes, evaluations, and reflections for Units 1–12.'
        })}</script>
      </Helmet>

      <header className="container py-6 flex items-center justify-between">
        <a href="#" className="font-semibold tracking-tight">E‑Portfolio</a>
        <nav className="flex items-center gap-2">
          <Button variant="chip" asChild>
            <a href="#units">Units 1–12</a>
          </Button>
          <Button variant="hero" onClick={() => setDialogUnit(1)}>Add Artefact</Button>
        </nav>
      </header>

      <main>
        <section className="container pt-10 pb-16 hero-gradient">
          <p className="text-sm text-muted-foreground mb-4">[ 01 ] Cutting‑edge cybersecurity learning journey — document your development across the module.</p>
          <h1 className="glitch text-5xl sm:text-7xl font-bold leading-[0.95]" data-text="SECURITY E‑PORTFOLIO">
            SECURITY E‑PORTFOLIO
          </h1>
          <p className="mt-6 max-w-2xl text-muted-foreground">
            Capture designs, code, meeting notes, feedback, and reflections. Align submissions to grading criteria: knowledge, collaboration, criticality, and presentation.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {['Web','Mobile Apps','Servers','Cloud','API'].map(tag => (
              <Button key={tag} variant="chip">{tag}</Button>
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            <Button variant="hero" onClick={() => setDialogUnit(1)}>Start with Unit 1</Button>
            <Button variant="outline" asChild>
              <a href="#rubric">View Requirements</a>
            </Button>
          </div>
        </section>

        <section id="units" className="container py-10">
          <h2 className="text-2xl font-semibold">Units 1–12: Artefact Submission</h2>
          <p className="text-muted-foreground mt-1">Aim to showcase at least one artefact per unit.</p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 12 }, (_, i) => i + 1).map(unit => (
              <UnitCard key={unit} unitNumber={unit} artifactsCount={artefactsByUnit.get(unit)?.length ?? 0} onAddClick={setDialogUnit} />
            ))}
          </div>
        </section>

        <section className="container py-10" id="rubric">
          <h2 className="text-2xl font-semibold">Marking Focus & Guidance</h2>
          <ul className="mt-4 list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Application of Knowledge & Understanding — artefacts across units (10%).</li>
            <li>Collaboration — contributions, notes, and feedback (15%).</li>
            <li>Evaluation — compare Unit 11 final project vs. Unit 6 status document (5%).</li>
            <li>Critical Reflections — process, contributions, teamwork, and impact on development (40%).</li>
            <li>Structure & Presentation — clear, logical, uncluttered layout (10%).</li>
            <li>Academic Integrity — correct citations and references (10%).</li>
          </ul>
        </section>

        {recent.length > 0 && (
          <section className="container py-10">
            <h2 className="text-2xl font-semibold">Recent Artefacts</h2>
            <div className="mt-4 grid gap-3">
              {recent.map(a => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setReviewArtefact(a)}
                  className="text-left rounded-lg border p-4 hover:bg-muted/50 transition"
                  aria-label={`Review artefact ${a.title}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{a.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Unit {a.unit}</span>
                      <Badge variant={a.reviewed ? "outline" : "secondary"}>
                        {a.reviewed ? "Reviewed" : "New"}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{a.summary || a.type}</p>
                  {a.link && (
                    <span className="mt-2 inline-block text-sm underline">Has link</span>
                  )}
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <ArtefactDialog unit={dialogUnit} onClose={() => setDialogUnit(null)} onSave={onSaveArtefact} />
      <ArtefactReviewDialog
        artefact={reviewArtefact}
        onClose={() => setReviewArtefact(null)}
        onMarkReviewed={() => reviewArtefact && markReviewed(reviewArtefact.id)}
      />
      <CookieConsent />
    </>
  );
};

export default Index;
