import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { Trophy, ArrowLeft } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/tournaments/new")({
  component: NewTournamentPage,
});

function NewTournamentPage() {
  const navigate = useNavigate();
  const createTournament = trpc.tournaments.create.useMutation();

  const [formData, setFormData] = useState({
    name: "",
    type: "AMERICANO" as "AMERICANO" | "MEXICANO",
    pointsToWin: 21,
    numberOfCourts: 1,
    numberOfPlayers: 8,
    playAllMatches: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const tournament = await createTournament.mutateAsync(formData);
      navigate({
        to: "/tournaments/$tournamentId",
        params: { tournamentId: tournament.id },
      });
    } catch (error) {
      console.error("Failed to create tournament:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-3xl mx-auto">
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white mb-6"
          onClick={() => navigate({ to: "/tournaments" })}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Tilbake
        </Button>

        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold text-white">Ny Turnering</h1>
        </div>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Turneringsdetaljer</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Turneringsnavn
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="F.eks. 'Sommerturneringen 2025'"
                  className="bg-slate-900 border-slate-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Type</Label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, type: "AMERICANO" })
                    }
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.type === "AMERICANO"
                        ? "border-cyan-500 bg-cyan-500/10 text-white"
                        : "border-slate-700 bg-slate-900 text-gray-400 hover:border-slate-600"
                    }`}
                  >
                    <div className="font-semibold mb-1">Americano</div>
                    <div className="text-xs opacity-80">
                      Fast partner, bytter motstandere
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, type: "MEXICANO" })
                    }
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.type === "MEXICANO"
                        ? "border-cyan-500 bg-cyan-500/10 text-white"
                        : "border-slate-700 bg-slate-900 text-gray-400 hover:border-slate-600"
                    }`}
                  >
                    <div className="font-semibold mb-1">Mexicano</div>
                    <div className="text-xs opacity-80">
                      Bytter både partner og motstandere
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pointsToWin" className="text-gray-300">
                    Poeng til seier
                  </Label>
                  <Input
                    id="pointsToWin"
                    type="number"
                    min={11}
                    max={50}
                    value={formData.pointsToWin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pointsToWin: parseInt(e.target.value),
                      })
                    }
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numberOfCourts" className="text-gray-300">
                    Antall baner
                  </Label>
                  <Input
                    id="numberOfCourts"
                    type="number"
                    min={1}
                    value={formData.numberOfCourts}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        numberOfCourts: parseInt(e.target.value),
                      })
                    }
                    className="bg-slate-900 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfPlayers" className="text-gray-300">
                  Antall spillere
                </Label>
                <Input
                  id="numberOfPlayers"
                  type="number"
                  min={4}
                  step={4}
                  value={formData.numberOfPlayers}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      numberOfPlayers: parseInt(e.target.value),
                    })
                  }
                  className="bg-slate-900 border-slate-700 text-white"
                />
                <p className="text-xs text-gray-500">
                  Må være delelig med 4 (4 spillere per kamp)
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white"
                disabled={createTournament.isPending}
              >
                {createTournament.isPending
                  ? "Oppretter..."
                  : "Opprett Turnering"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
