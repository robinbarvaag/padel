import { publicProcedure, router } from "./init";
import { db } from "../../db";
import * as schema from "../../db/schema";
import { z } from "zod";
import { eq, desc } from "drizzle-orm";

const createTournamentSchema = z.object({
  name: z.string().min(1),
  type: z.enum(["AMERICANO", "MEXICANO"]),
  pointsToWin: z.number().min(11).max(50).default(21),
  numberOfCourts: z.number().min(1).default(1),
  numberOfPlayers: z.number().min(4),
  playAllMatches: z.boolean().default(true),
  rules: z.string().optional(),
});

const createPlayerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
});

const updateScoreSchema = z.object({
  matchId: z.string().uuid(),
  team1Score: z.number().min(0),
  team2Score: z.number().min(0),
});

export const appRouter = router({
  // Health check
  hello: publicProcedure.query(() => {
    return "Hello from tRPC!";
  }),

  // Tournament procedures
  tournaments: router({
    create: publicProcedure
      .input(createTournamentSchema)
      .mutation(async ({ input, ctx }) => {
        // TODO: Get userId from ctx.session when auth is properly set up
        const userId = "temp-user-id"; // Replace with actual auth

        const [tournament] = await db
          .insert(schema.tournament)
          .values({
            ...input,
            createdById: userId,
          })
          .returning();

        return tournament;
      }),

    list: publicProcedure.query(async () => {
      const tournaments = await db
        .select()
        .from(schema.tournament)
        .orderBy(desc(schema.tournament.createdAt));

      return tournaments;
    }),

    getById: publicProcedure
      .input(z.object({ id: z.string().uuid() }))
      .query(async ({ input }) => {
        const [tournament] = await db
          .select()
          .from(schema.tournament)
          .where(eq(schema.tournament.id, input.id));

        return tournament;
      }),
  }),

  // Player procedures
  players: router({
    create: publicProcedure
      .input(createPlayerSchema)
      .mutation(async ({ input, ctx }) => {
        // TODO: Get userId from ctx.session
        const createdById = "temp-user-id";

        const [player] = await db
          .insert(schema.player)
          .values({
            name: input.name,
            email: input.email,
            createdById,
            isPlaceholder: true, // Always start as placeholder
          })
          .returning();

        return player;
      }),

    list: publicProcedure.query(async () => {
      const players = await db
        .select()
        .from(schema.player)
        .orderBy(desc(schema.player.elo));

      return players;
    }),

    search: publicProcedure
      .input(z.object({ query: z.string() }))
      .query(async ({ input }) => {
        const players = await db
          .select()
          .from(schema.player)
          .where(eq(schema.player.name, input.query))
          .limit(10);

        return players;
      }),
  }),

  // Match procedures
  matches: router({
    updateScore: publicProcedure
      .input(updateScoreSchema)
      .mutation(async ({ input, ctx }) => {
        // TODO: Get userId from ctx.session
        const userId = "temp-user-id";

        const [match] = await db
          .update(schema.match)
          .set({
            team1Score: input.team1Score,
            team2Score: input.team2Score,
            lastUpdatedBy: userId,
            completedAt: new Date(),
            updatedAt: new Date(),
          })
          .where(eq(schema.match.id, input.matchId))
          .returning();

        // TODO: Update ELO ratings here
        // TODO: Emit real-time update event

        return match;
      }),
  }),
});

export type AppRouter = typeof appRouter;
