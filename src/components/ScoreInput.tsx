import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Trophy, X } from "lucide-react";

interface ScoreInputProps {
  pointsToWin: number;
  onScoreSubmit: (team1Score: number, team2Score: number) => void;
  team1Players: string[];
  team2Players: string[];
}

export function ScoreInput({
  pointsToWin,
  onScoreSubmit,
  team1Players,
  team2Players,
}: ScoreInputProps) {
  const [selectedWinner, setSelectedWinner] = useState<1 | 2 | null>(null);

  const handleTeamClick = (team: 1 | 2) => {
    setSelectedWinner(team);
  };

  const handleScoreClick = (score: number) => {
    if (selectedWinner) {
      const loserScore = score;
      const team1Score = selectedWinner === 1 ? pointsToWin : loserScore;
      const team2Score = selectedWinner === 2 ? pointsToWin : loserScore;

      onScoreSubmit(team1Score, team2Score);

      // Reset
      setSelectedWinner(null);
    }
  };

  const handleCancel = () => {
    setSelectedWinner(null);
  };

  // Score options from 0 to pointsToWin - 1
  const scoreOptions = Array.from({ length: pointsToWin }, (_, i) => i);

  return (
    <div className="space-y-4">
      {!selectedWinner ? (
        <div className="grid grid-cols-2 gap-4">
          {/* Team 1 */}
          <button
            onClick={() => handleTeamClick(1)}
            className="p-6 rounded-lg border-2 border-slate-700 bg-slate-900 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all group"
          >
            <div className="text-white font-semibold mb-2 flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              Team 1
            </div>
            <div className="space-y-1">
              {team1Players.map((player, idx) => (
                <div key={idx} className="text-sm text-gray-400">
                  {player}
                </div>
              ))}
            </div>
          </button>

          {/* Team 2 */}
          <button
            onClick={() => handleTeamClick(2)}
            className="p-6 rounded-lg border-2 border-slate-700 bg-slate-900 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all group"
          >
            <div className="text-white font-semibold mb-2 flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              Team 2
            </div>
            <div className="space-y-1">
              {team2Players.map((player, idx) => (
                <div key={idx} className="text-sm text-gray-400">
                  {player}
                </div>
              ))}
            </div>
          </button>
        </div>
      ) : (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-semibold">
                  Team {selectedWinner} vant {pointsToWin} poeng
                </span>
              </div>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-3">
              <div className="text-sm text-gray-400 mb-2">
                Velg motstanderens score:
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {scoreOptions.map((score) => (
                <button
                  key={score}
                  onClick={() => handleScoreClick(score)}
                  className="aspect-square rounded-lg border-2 border-slate-700 bg-slate-900 hover:border-cyan-500 hover:bg-cyan-500/10 transition-all text-white font-semibold text-lg"
                >
                  {score}
                </button>
              ))}
            </div>

            <div className="mt-4 text-xs text-gray-500 text-center">
              Trykk på motstanderens score for å registrere kampen
            </div>
          </CardContent>
        </Card>
      )}

      <div className="text-xs text-gray-500 text-center">
        {!selectedWinner
          ? "Trykk på laget som vant kampen"
          : `Team ${selectedWinner === 1 ? 2 : 1} får den scoren du velger`}
      </div>
    </div>
  );
}
