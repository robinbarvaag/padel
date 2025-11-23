import { createFileRoute } from "@tanstack/react-router";
import { trpc } from "../../lib/trpc";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { User, UserPlus, Mail, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/players/")({
  component: PlayersPage,
});

function PlayersPage() {
  const { data: players, isLoading } = trpc.players.list.useQuery();
  const createPlayer = trpc.players.create.useMutation();
  const utils = trpc.useUtils();

  const [newPlayerName, setNewPlayerName] = useState("");
  const [newPlayerEmail, setNewPlayerEmail] = useState("");

  const handleCreatePlayer = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createPlayer.mutateAsync({
        name: newPlayerName,
        email: newPlayerEmail || undefined,
      });

      // Refresh the list
      utils.players.list.invalidate();

      // Clear form
      setNewPlayerName("");
      setNewPlayerEmail("");
    } catch (error) {
      console.error("Failed to create player:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-white text-center">Laster spillere...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <User className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold text-white">Spillere</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create player form */}
          <Card className="bg-slate-800/50 border-slate-700 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-cyan-400" />
                Legg til spiller
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreatePlayer} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="playerName" className="text-gray-300">
                    Brukernavn
                  </Label>
                  <Input
                    id="playerName"
                    value={newPlayerName}
                    onChange={(e) => setNewPlayerName(e.target.value)}
                    placeholder="F.eks. 'OleN'"
                    className="bg-slate-900 border-slate-700 text-white"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Må være unikt. Kan claimes senere av brukere.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="playerEmail" className="text-gray-300">
                    E-post (valgfritt)
                  </Label>
                  <Input
                    id="playerEmail"
                    type="email"
                    value={newPlayerEmail}
                    onChange={(e) => setNewPlayerEmail(e.target.value)}
                    placeholder="ole@example.com"
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                  <p className="text-xs text-gray-500">
                    For å invitere spilleren til å claime profilen.
                  </p>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                  disabled={createPlayer.isPending}
                >
                  {createPlayer.isPending ? "Oppretter..." : "Legg til spiller"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Players list */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Alle spillere ({players?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {players && players.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Ingen spillere enda. Legg til din første spiller!</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {players?.map((player) => (
                      <div
                        key={player.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-600 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                            {player.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-white font-semibold flex items-center gap-2">
                              {player.name}
                              {!player.isPlaceholder && (
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                              )}
                            </div>
                            <div className="text-sm text-gray-400 flex items-center gap-2">
                              {player.email && (
                                <>
                                  <Mail className="w-3 h-3" />
                                  {player.email}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-xs text-gray-500">ELO</div>
                            <div className="text-lg font-bold text-cyan-400">
                              {player.elo}
                            </div>
                          </div>
                          {player.isPlaceholder && (
                            <div className="text-xs px-2 py-1 rounded bg-yellow-500/20 text-yellow-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              Placeholder
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
