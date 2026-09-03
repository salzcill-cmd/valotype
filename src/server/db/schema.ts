import { relations } from "drizzle-orm"
import {
  boolean,
  index,
  integer,
  pgTable,
  real,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core"

/* ============================================================
   ValoType Database Schema — prd.md §46 / TODO.md 0.8
   ============================================================ */

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: text("email").notNull().unique(),
    username: text("username").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    avatarUrl: text("avatar_url"),
    isPremium: boolean("is_premium").notNull().default(false),
    premiumExpiresAt: timestamp("premium_expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index("users_email_idx").on(table.email)],
)

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull().default("Pemula"),
    bestWpm: integer("best_wpm").notNull().default(0),
    bestAccuracy: integer("best_accuracy").notNull().default(0),
    bestScore: integer("best_score").notNull().default(0),
    totalSessions: integer("total_sessions").notNull().default(0),
    totalTypedChars: integer("total_typed_chars").notNull().default(0),
    currentStreak: integer("current_streak").notNull().default(0),
    longestStreak: integer("longest_streak").notNull().default(0),
    lastActiveAt: timestamp("last_active_at", { withTimezone: true }),
    currentLevel: integer("current_level").notNull().default(1),
    currentXp: integer("current_xp").notNull().default(0),
    totalXp: integer("total_xp").notNull().default(0),
    currentRank: text("current_rank").notNull().default("iron"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    uniqueIndex("profiles_user_id_idx").on(table.userId),
    index("profiles_rank_idx").on(table.currentRank),
    index("profiles_level_idx").on(table.currentLevel),
  ],
)

export const typingSessions = pgTable(
  "typing_sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    guestToken: text("guest_token"),
    challengeId: text("challenge_id").notNull(),
    gameMode: text("game_mode").notNull().default("free"),
    expectedText: text("expected_text").notNull(),
    typedText: text("typed_text").notNull(),
    errorCount: integer("error_count").notNull().default(0),
    accuracy: real("accuracy").notNull().default(0),
    wpm: integer("wpm").notNull().default(0),
    rawWpm: integer("raw_wpm").notNull().default(0),
    score: integer("score").notNull().default(0),
    maxCombo: integer("max_combo").notNull().default(0),
    durationMs: integer("duration_ms").notNull().default(0),
    isVerified: boolean("is_verified").notNull().default(false),
    isPractice: boolean("is_practice").notNull().default(false),
    difficulty: text("difficulty").notNull().default("1"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    index("typing_sessions_user_created_idx").on(table.userId, table.createdAt),
    index("typing_sessions_score_idx").on(table.score),
    index("typing_sessions_challenge_idx").on(table.challengeId),
  ],
)

export const achievements = pgTable("achievements", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  iconEmoji: text("icon_emoji").notNull(),
  xpReward: integer("xp_reward").notNull().default(0),
  rarity: text("rarity").notNull().default("common"),
})

export const dailyChallengeCompletions = pgTable(
  "daily_challenge_completions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    /** Tanggal tantangan, format YYYY-MM-DD (UTC, paritas prd.md §18). */
    date: text("date").notNull(),
    score: integer("score").notNull().default(0),
    wpm: integer("wpm").notNull().default(0),
    accuracy: real("accuracy").notNull().default(0),
    xpEarned: integer("xp_earned").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("daily_comp_user_date_idx").on(table.userId, table.date)],
)

export const userAchievements = pgTable(
  "user_achievements",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    achievementId: text("achievement_id")
      .notNull()
      .references(() => achievements.id, { onDelete: "cascade" }),
    unlockedAt: timestamp("unlocked_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("user_achievements_user_achv_idx").on(table.userId, table.achievementId)],
)

/* --- Relations --- */
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, { fields: [users.id], references: [profiles.userId] }),
  sessions: many(typingSessions),
  achievements: many(userAchievements),
}))

export const profilesRelations = relations(profiles, ({ one }) => ({
  user: one(users, { fields: [profiles.userId], references: [users.id] }),
}))

export const typingSessionsRelations = relations(typingSessions, ({ one }) => ({
  user: one(users, { fields: [typingSessions.userId], references: [users.id] }),
}))

export const dailyChallengeCompletionsRelations = relations(
  dailyChallengeCompletions,
  ({ one }) => ({
    user: one(users, { fields: [dailyChallengeCompletions.userId], references: [users.id] }),
  }),
)

export const achievementsRelations = relations(achievements, ({ many }) => ({
  userAchievements: many(userAchievements),
}))

export const userAchievementsRelations = relations(userAchievements, ({ one }) => ({
  user: one(users, { fields: [userAchievements.userId], references: [users.id] }),
  achievement: one(achievements, {
    fields: [userAchievements.achievementId],
    references: [achievements.id],
  }),
}))

/* --- Types --- */
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
export type TypingSession = typeof typingSessions.$inferSelect
export type NewTypingSession = typeof typingSessions.$inferInsert
export type Achievement = typeof achievements.$inferSelect
export type NewAchievement = typeof achievements.$inferInsert
export type UserAchievement = typeof userAchievements.$inferSelect
export type NewUserAchievement = typeof userAchievements.$inferInsert
export type DailyCompletion = typeof dailyChallengeCompletions.$inferSelect
export type NewDailyCompletion = typeof dailyChallengeCompletions.$inferInsert
