import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Trophy,
  Users,
  Target,
  Zap,
  TrendingUp,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Americano & Mexicano",
      description:
        "Støtte for begge turneringsformater med fleksible regler og innstillinger.",
      badge: "Turneringer",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Smart spillerhåndtering",
      description:
        "Opprett placeholder-spillere som kan claimes senere. Ingen pålogging nødvendig for å starte.",
      badge: "Spillere",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Enkel score-registrering",
      description:
        "Klikk på vinneren, velg motstanderens score - ferdig! Optimalisert UX for rask registrering.",
      badge: "UX",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "ELO ranking system",
      description:
        "Automatisk ELO-beregning basert på kampresultater. Se din progresjon over tid.",
      badge: "Ranking",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Realtime oppdateringer",
      description:
        "Se hvem som registrerer scores i sanntid. Perfekt for turnering-koordinering.",
      badge: "Live",
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Turnering-administrasjon",
      description:
        "Full kontroll over baner, runder, og spillere. Enkel oversikt over pågående kamper.",
      badge: "Admin",
    },
  ];

  const techStack = [
    "Vite",
    "React 19",
    "TypeScript",
    "TailwindCSS",
    "PostgreSQL",
    "tRPC",
    "TanStack Router",
    "Drizzle ORM",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 animate-pulse"></div>
        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl animate-pulse"></div>
                <Trophy className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-primary animate-pulse" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    PADEL
                  </span>
                </h1>
                <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-primary animate-pulse" />
              </div>
            </div>

            <Badge variant="secondary" className="mb-6 text-sm">
              Turnering & ELO Tracking System
            </Badge>

            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
              Enkel administrasjon av Americano og Mexicano turneringer med
              <span className="text-primary font-semibold">
                {" "}
                automatisk ELO-beregning
              </span>
              , realtime oppdateringer, og optimalisert UX.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/tournaments/new">
                <Button size="lg" className="group relative overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Ny Turnering
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </Button>
              </Link>
              <Link to="/tournaments">
                <Button variant="outline" size="lg" className="group">
                  Se Turneringer
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Funksjoner
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Alt du trenger for Padel turneringer
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Moderne verktøy designet for å gjøre turneringsadministrasjon
              enkel og effektiv
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      {feature.icon}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-4">
            Teknologi
          </Badge>
          <h2 className="text-3xl font-bold mb-4">
            Bygt med moderne teknologi
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rask, pålitelig og skalerbar teknologistack for best ytelse
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
