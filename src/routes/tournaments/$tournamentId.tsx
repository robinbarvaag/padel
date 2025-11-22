import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../../lib/trpc";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Trophy, Users, Target, Grid3x3 } from "lucide-react";

export const Route = createFileRoute("/tournaments/$tournamentId")({
  component: TournamentDetailPage,
});

function TournamentDetailPage() {
  const { tournamentId } = Route.useParams();
  const { data: tournament, isLoading } = trpc.tournaments.getById.useQuery({
    id: tournamentId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-white text-center">Laster turnering...</div>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-white text-center">Turnering ikke funnet</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold text-white">{tournament.name}</h1>
          <span
            className={`text-sm px-3 py-1 rounded ${
              tournament.status === "DRAFT"
                ? "bg-yellow-500/20 text-yellow-400"
                : tournament.status === "IN_PROGRESS"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-slate-500/20 text-slate-400"
            }`}
          >
            {tournament.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {tournament.type}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Spillere
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {tournament.numberOfPlayers}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Poeng til seier
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {tournament.pointsToWin}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                <Grid3x3 className="w-4 h-4" />
                Baner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {tournament.numberOfCourts}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Neste steg</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Legg til spillere for å starte turneringen...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
