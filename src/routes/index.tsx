import { createFileRoute, Link } from "@tanstack/react-router";
import { Trophy, Users, Target, Zap, TrendingUp, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const features = [
    {
      icon: <Trophy className="w-12 h-12 text-cyan-400" />,
      title: "Americano & Mexicano",
      description:
        "Støtte for begge turneringsformater med fleksible regler og innstillinger.",
    },
    {
      icon: <Users className="w-12 h-12 text-cyan-400" />,
      title: "Smart spillerhåndtering",
      description:
        "Opprett placeholder-spillere som kan claimes senere. Ingen pålogging nødvendig for å starte.",
    },
    {
      icon: <Target className="w-12 h-12 text-cyan-400" />,
      title: "Enkel score-registrering",
      description:
        "Klikk på vinneren, velg motstanderens score - ferdig! Optimalisert UX for rask registrering.",
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-cyan-400" />,
      title: "ELO ranking system",
      description:
        "Automatisk ELO-beregning basert på kampresultater. Se din progresjon over tid.",
    },
    {
      icon: <Zap className="w-12 h-12 text-cyan-400" />,
      title: "Realtime oppdateringer",
      description:
        "Se hvem som registrerer scores i sanntid. Perfekt for turnering-koordinering.",
    },
    {
      icon: <Calendar className="w-12 h-12 text-cyan-400" />,
      title: "Turnering-administrasjon",
      description:
        "Full kontroll over baner, runder, og spillere. Enkel oversikt over pågående kamper.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-6 mb-6">
            <Trophy className="w-24 h-24 md:w-32 md:h-32 text-cyan-400" />
            <h1 className="text-6xl md:text-7xl font-black text-white [letter-spacing:-0.08em]">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                PADEL
              </span>
            </h1>
          </div>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
            Turnering & ELO tracking for Padel
          </p>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Enkel administrasjon av Americano og Mexicano turneringer med
            automatisk ELO-beregning, realtime oppdateringer, og optimalisert
            UX.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/tournaments/new">
              <Button className="px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-cyan-500/50">
                <Trophy className="w-5 h-5 mr-2" />
                Ny Turnering
              </Button>
            </Link>
            <Link to="/tournaments">
              <Button
                variant="outline"
                className="px-8 py-3 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-semibold rounded-lg transition-colors"
              >
                Se Turneringer
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Bygt med moderne teknologi
        </h2>
        <p className="text-gray-400 mb-6">
          TanStack Router, tRPC, Drizzle ORM, Bun, og Biome
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {["Vite", "React 19", "TypeScript", "TailwindCSS", "PostgreSQL"].map(
            (tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-gray-300 text-sm"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </section>
    </div>
  );
}
