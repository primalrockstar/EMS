import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").unique(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  tier: text("tier").notNull().default("basic"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const protocols = pgTable("protocols", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  state: text("state"),
  ageGroup: text("age_group").default("adult_pediatric"),
  content: text("content").notNull(),
  description: text("description"),
  scope: text("scope"),
  filePath: text("file_path"),
  fileType: text("file_type"),
  isOffline: boolean("is_offline").default(false),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const medications = pgTable("medications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  scope: text("scope").notNull(),
  indications: text("indications").array(),
  contraindications: text("contraindications").array(),
  adultDose: text("adult_dose"),
  pediatricDose: text("pediatric_dose"),
  route: text("route"),
  category: text("category"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const calculatorResults = pgTable("calculator_results", {
  id: serial("id").primaryKey(),
  calculatorType: text("calculator_type").notNull(),
  inputs: jsonb("inputs").notNull(),
  result: jsonb("result").notNull(),
  userId: integer("user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const learningModules = pgTable("learning_modules", {
  id: serial("id").primaryKey(),
  moduleNumber: integer("module_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  content: jsonb("content").notNull(),
  tags: text("tags").array(),
  chapter: integer("chapter"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const studyNotes = pgTable("study_notes", {
  id: serial("id").primaryKey(),
  chapterNumber: integer("chapter_number").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  bookTitle: text("book_title").default("Emergency Care and Transportation of the Sick and Injured 12th Edition"),
  tags: text("tags").array(),
  keyPoints: text("key_points").array(),
  objectives: text("objectives").array(),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const flashcards = pgTable("flashcards", {
  id: serial("id").primaryKey(),
  chapterNumber: integer("chapter_number").notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  difficulty: text("difficulty").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array(),
  timesCorrect: integer("times_correct").default(0),
  timesIncorrect: integer("times_incorrect").default(0),
  lastReviewed: timestamp("last_reviewed"),
  nextReview: timestamp("next_review"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const nremtQuestions = pgTable("nremt_questions", {
  id: serial("id").primaryKey(),
  scope: text("scope").notNull(),
  contentArea: text("content_area").notNull(),
  questionType: text("question_type").notNull(),
  questionText: text("question_text").notNull(),
  scenario: text("scenario"),
  options: text("options").array().notNull(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  protocolReference: text("protocol_reference"),
  calculatorLink: text("calculator_link"),
  difficulty: text("difficulty").notNull(),
  tags: text("tags").array(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const nremtExamSessions = pgTable("nremt_exam_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  scope: text("scope").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  correctAnswers: integer("correct_answers").notNull(),
  timeSpent: integer("time_spent"),
  isPassed: boolean("is_passed").default(false),
  sessionData: jsonb("session_data"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  protocols: many(protocols),
  calculatorResults: many(calculatorResults),
}));

export const protocolsRelations = relations(protocols, ({ one }) => ({
  user: one(users, {
    fields: [protocols.userId],
    references: [users.id],
  }),
}));

export const calculatorResultsRelations = relations(calculatorResults, ({ one }) => ({
  user: one(users, {
    fields: [calculatorResults.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertProtocolSchema = createInsertSchema(protocols).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertMedicationSchema = createInsertSchema(medications).omit({
  id: true,
  createdAt: true,
});

export const insertCalculatorResultSchema = createInsertSchema(calculatorResults).omit({
  id: true,
  createdAt: true,
});

export const insertLearningModuleSchema = createInsertSchema(learningModules).omit({
  id: true,
  createdAt: true,
});

export const insertStudyNotesSchema = createInsertSchema(studyNotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFlashcardSchema = createInsertSchema(flashcards).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNremtQuestionSchema = createInsertSchema(nremtQuestions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertNremtExamSessionSchema = createInsertSchema(nremtExamSessions).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Protocol = typeof protocols.$inferSelect;
export type InsertProtocol = z.infer<typeof insertProtocolSchema>;
export type Medication = typeof medications.$inferSelect;
export type InsertMedication = z.infer<typeof insertMedicationSchema>;
export type CalculatorResult = typeof calculatorResults.$inferSelect;
export type InsertCalculatorResult = z.infer<typeof insertCalculatorResultSchema>;
export type LearningModule = typeof learningModules.$inferSelect;
export type InsertLearningModule = z.infer<typeof insertLearningModuleSchema>;
export type StudyNote = typeof studyNotes.$inferSelect;
export type InsertStudyNote = z.infer<typeof insertStudyNotesSchema>;
export type Flashcard = typeof flashcards.$inferSelect;
export type InsertFlashcard = z.infer<typeof insertFlashcardSchema>;
export type NremtQuestion = typeof nremtQuestions.$inferSelect;
export type InsertNremtQuestion = z.infer<typeof insertNremtQuestionSchema>;
export type NremtExamSession = typeof nremtExamSessions.$inferSelect;
export type InsertNremtExamSession = z.infer<typeof insertNremtExamSessionSchema>;
