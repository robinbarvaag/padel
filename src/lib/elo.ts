/**
 * ELO Rating Calculation Utilities
 * Standard ELO system adapted for Padel doubles
 */

export interface PlayerElo {
  playerId: string;
  currentElo: number;
}

export interface TeamElo {
  player1: PlayerElo;
  player2: PlayerElo;
}

export interface MatchResult {
  team1: TeamElo;
  team2: TeamElo;
  team1Score: number;
  team2Score: number;
}

export interface EloUpdate {
  playerId: string;
  oldElo: number;
  newElo: number;
  change: number;
}

/**
 * K-factor determines how much ratings change per match
 * Higher K = more volatile ratings
 */
const K_FACTOR = 32;

/**
 * Calculate expected score for a player/team
 * Formula: E = 1 / (1 + 10^((opponent_rating - player_rating) / 400))
 */
function getExpectedScore(
  playerRating: number,
  opponentRating: number
): number {
  return 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
}

/**
 * Calculate average ELO for a team
 */
function getTeamAverageElo(team: TeamElo): number {
  return (team.player1.currentElo + team.player2.currentElo) / 2;
}

/**
 * Calculate performance multiplier based on score difference
 * Winning by a large margin should award more ELO
 */
function getScoreMultiplier(winnerScore: number, loserScore: number): number {
  const scoreDiff = winnerScore - loserScore;

  // Base multiplier is 1.0
  // Add 0.05 for each point difference (max 1.5x)
  return Math.min(1 + scoreDiff * 0.05, 1.5);
}

/**
 * Calculate new ELO ratings for all players in a match
 */
export function calculateEloChanges(match: MatchResult): EloUpdate[] {
  const team1AvgElo = getTeamAverageElo(match.team1);
  const team2AvgElo = getTeamAverageElo(match.team2);

  // Determine winner
  const team1Won = match.team1Score > match.team2Score;
  const team1ActualScore = team1Won ? 1 : 0;
  const team2ActualScore = team1Won ? 0 : 1;

  // Calculate expected scores
  const team1Expected = getExpectedScore(team1AvgElo, team2AvgElo);
  const team2Expected = getExpectedScore(team2AvgElo, team1AvgElo);

  // Calculate score multiplier (for dominant wins)
  const scoreMultiplier = team1Won
    ? getScoreMultiplier(match.team1Score, match.team2Score)
    : getScoreMultiplier(match.team2Score, match.team1Score);

  // Calculate ELO changes for each team
  const team1Change = Math.round(
    K_FACTOR * scoreMultiplier * (team1ActualScore - team1Expected)
  );
  const team2Change = Math.round(
    K_FACTOR * scoreMultiplier * (team2ActualScore - team2Expected)
  );

  // Apply changes to all players
  const updates: EloUpdate[] = [
    {
      playerId: match.team1.player1.playerId,
      oldElo: match.team1.player1.currentElo,
      newElo: match.team1.player1.currentElo + team1Change,
      change: team1Change,
    },
    {
      playerId: match.team1.player2.playerId,
      oldElo: match.team1.player2.currentElo,
      newElo: match.team1.player2.currentElo + team1Change,
      change: team1Change,
    },
    {
      playerId: match.team2.player1.playerId,
      oldElo: match.team2.player1.currentElo,
      newElo: match.team2.player1.currentElo + team2Change,
      change: team2Change,
    },
    {
      playerId: match.team2.player2.playerId,
      oldElo: match.team2.player2.currentElo,
      newElo: match.team2.player2.currentElo + team2Change,
      change: team2Change,
    },
  ];

  return updates;
}

/**
 * Get ELO rating tier/label
 */
export function getEloTier(elo: number): string {
  if (elo >= 2000) return "Grandmaster";
  if (elo >= 1800) return "Master";
  if (elo >= 1600) return "Expert";
  if (elo >= 1400) return "Advanced";
  if (elo >= 1200) return "Intermediate";
  if (elo >= 1000) return "Beginner";
  return "Novice";
}

/**
 * Format ELO change for display
 */
export function formatEloChange(change: number): string {
  return change > 0 ? `+${change}` : `${change}`;
}
