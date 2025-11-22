import { createFileRoute, Link } from "@tanstack/react-router";
import { trpc } from "../../lib/trpc";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Trophy, Plus, Users, Calendar } from "lucide-react";

export const Route = createFileRoute("/tournaments/")({
  component: TournamentsPage,
});

function TournamentsPage() {
  const { data: tournaments, isLoading } = trpc.tournaments.list.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-white text-center">Laster turneringer...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold text-white">Turneringer</h1>
          </div>
          <Link to="/tournaments/new">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Ny Turnering
            </Button>
          </Link>
        </div>

        {tournaments && tournaments.length === 0 ? (
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-12 text-center">
              <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                Ingen turneringer enda
              </h3>
              <p className="text-gray-400 mb-6">
                Kom i gang ved å opprette din første turnering!
              </p>
              <Link to="/tournaments/new">
                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Opprett Turnering
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments?.map((tournament) => (
              <Link
                key={tournament.id}
                to="/tournaments/$tournamentId"
                params={{ tournamentId: tournament.id }}
              >
                <Card className="bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span>{tournament.name}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          tournament.status === "DRAFT"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : tournament.status === "IN_PROGRESS"
                              ? "bg-green-500/20 text-green-400"
                              : "bg-slate-500/20 text-slate-400"
                        }`}
                      >
                        {tournament.status}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4" />
                        <span className="text-sm">{tournament.type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">
                          {tournament.numberOfPlayers} spillere
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(tournament.createdAt).toLocaleDateString(
                            "nb-NO"
                          )}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
