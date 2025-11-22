import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";

export const tournamentTypeEnum = pgEnum("tournament_type", [
  "AMERICANO",
  "MEXICANO",
]);
export const tournamentStatusEnum = pgEnum("tournament_status", [
  "DRAFT",
  "IN_PROGRESS",
  "COMPLETED",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

export const player = pgTable("player", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(), // Unique usernames
  email: text("email"), // Optional, for inviting/claiming
  userId: text("userId").references(() => user.id), // Linked if claimed
  createdById: text("createdById").references(() => user.id), // Who created this player (if not self-registered)
  isPlaceholder: boolean("isPlaceholder").default(true).notNull(), // True until claimed
  claimRequestedBy: text("claimRequestedBy").references(() => user.id), // Pending claim
  elo: integer("elo").default(1200).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const tournament = pgTable("tournament", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  type: tournamentTypeEnum("type").notNull(),
  status: tournamentStatusEnum("status").default("DRAFT").notNull(),

  // Settings
  pointsToWin: integer("pointsToWin").default(21).notNull(), // Default 21 for Americano
  numberOfCourts: integer("numberOfCourts").default(1).notNull(),
  numberOfPlayers: integer("numberOfPlayers").notNull(),
  playAllMatches: boolean("playAllMatches").default(true).notNull(), // Mexicano style

  // Rules (JSON for flexibility)
  rules: text("rules"), // Store custom rules as JSON

  createdById: text("createdById")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const tournamentParticipant = pgTable(
  "tournament_participant",
  {
    tournamentId: uuid("tournamentId")
      .notNull()
      .references(() => tournament.id),
    playerId: uuid("playerId")
      .notNull()
      .references(() => player.id),
    points: integer("points").default(0).notNull(),
    joinedAt: timestamp("joinedAt").notNull().defaultNow(),
  },
  (t) => []
);

export const match = pgTable("match", {
  id: uuid("id").primaryKey().defaultRandom(),
  tournamentId: uuid("tournamentId")
    .notNull()
    .references(() => tournament.id),
  round: integer("round").notNull(),
  court: integer("court"), // Which court (bane)
  team1Score: integer("team1Score"),
  team2Score: integer("team2Score"),
  completedAt: timestamp("completedAt"),
  lastUpdatedBy: text("lastUpdatedBy").references(() => user.id), // Track who updated
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const matchParticipant = pgTable("match_participant", {
  matchId: uuid("matchId")
    .notNull()
    .references(() => match.id),
  playerId: uuid("playerId")
    .notNull()
    .references(() => player.id),
  team: integer("team").notNull(), // 1 or 2
});
