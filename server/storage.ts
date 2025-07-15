import {
  users,
  protocols,
  medications,
  calculatorResults,
  learningModules,
  studyNotes,
  flashcards,
  nremtQuestions,
  nremtExamSessions,
  type User,
  type InsertUser,
  type Protocol,
  type InsertProtocol,
  type Medication,
  type InsertMedication,
  type CalculatorResult,
  type InsertCalculatorResult,
  type LearningModule,
  type InsertLearningModule,
  type StudyNote,
  type InsertStudyNote,
  type Flashcard,
  type InsertFlashcard,
  type NremtQuestion,
  type InsertNremtQuestion,
  type NremtExamSession,
  type InsertNremtExamSession,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, ilike, desc, sql } from "drizzle-orm";

// Helper function to check if database operations are available
function isDatabaseAvailable(): boolean {
  return db !== null && process.env.DATABASE_URL !== undefined;
}

// Helper function to handle database operations safely
async function safeDatabaseOperation<T>(
  operation: () => Promise<T>,
  fallback: T,
  operationName: string
): Promise<T> {
  if (!isDatabaseAvailable()) {
    console.warn(`Database operation "${operationName}" skipped - no database connection available`);
    return fallback;
  }
  
  try {
    return await operation();
  } catch (error) {
    console.error(`Database operation "${operationName}" failed:`, error);
    throw error;
  }
}

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Protocol operations
  getProtocols(userId?: number, category?: string, state?: string): Promise<Protocol[]>;
  getProtocol(id: number): Promise<Protocol | undefined>;
  createProtocol(protocol: InsertProtocol): Promise<Protocol>;
  updateProtocol(id: number, updates: Partial<Protocol>): Promise<Protocol>;
  deleteProtocol(id: number): Promise<void>;
  
  // Medication operations
  getMedications(search?: string, category?: string, scope?: string): Promise<Medication[]>;
  getMedication(id: number): Promise<Medication | undefined>;
  createMedication(medication: InsertMedication): Promise<Medication>;
  
  // Calculator operations
  getCalculatorResults(userId: number, type?: string): Promise<CalculatorResult[]>;
  saveCalculatorResult(result: InsertCalculatorResult): Promise<CalculatorResult>;
  
  // Learning module operations
  getLearningModules(moduleNumber?: number): Promise<LearningModule[]>;
  getLearningModule(id: number): Promise<LearningModule | undefined>;
  createLearningModule(module: InsertLearningModule): Promise<LearningModule>;
  
  // Study notes operations
  getStudyNotes(chapterNumber?: number): Promise<StudyNote[]>;
  getStudyNote(id: number): Promise<StudyNote | undefined>;
  createStudyNote(note: InsertStudyNote): Promise<StudyNote>;
  updateStudyNote(id: number, updates: Partial<StudyNote>): Promise<StudyNote>;
  deleteStudyNote(id: number): Promise<void>;
  
  // Flashcard operations
  getFlashcards(chapterNumber?: number): Promise<Flashcard[]>;
  getFlashcard(id: number): Promise<Flashcard | undefined>;
  createFlashcard(flashcard: InsertFlashcard): Promise<Flashcard>;
  updateFlashcard(id: number, updates: Partial<Flashcard>): Promise<Flashcard>;
  deleteFlashcard(id: number): Promise<void>;
  
  // NREMT operations
  getNremtQuestions(scope?: string, contentArea?: string, difficulty?: string): Promise<NremtQuestion[]>;
  getNremtQuestion(id: number): Promise<NremtQuestion | undefined>;
  createNremtQuestion(question: InsertNremtQuestion): Promise<NremtQuestion>;
  
  // NREMT exam session operations
  getNremtExamSessions(userId?: number): Promise<NremtExamSession[]>;
  createNremtExamSession(session: InsertNremtExamSession): Promise<NremtExamSession>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return safeDatabaseOperation(
      async () => {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user;
      },
      undefined,
      'getUser'
    );
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return safeDatabaseOperation(
      async () => {
        const [user] = await db.select().from(users).where(eq(users.username, username));
        return user;
      },
      undefined,
      'getUserByUsername'
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return safeDatabaseOperation(
      async () => {
        const [user] = await db.insert(users).values(insertUser).returning();
        return user;
      },
      {} as User,
      'createUser'
    );
  }

  // Protocol operations
  async getProtocols(userId?: number, category?: string, state?: string): Promise<Protocol[]> {
    return safeDatabaseOperation(
      async () => {
        let query = db.select().from(protocols);
        
        const conditions = [];
        if (userId) conditions.push(eq(protocols.userId, userId));
        if (category) conditions.push(eq(protocols.category, category));
        if (state) conditions.push(eq(protocols.state, state));
        
        if (conditions.length > 0) {
          query = query.where(and(...conditions));
        }
        
        return await query.orderBy(desc(protocols.updatedAt));
      },
      [],
      'getProtocols'
    );
  }

  async getProtocol(id: number): Promise<Protocol | undefined> {
    const [protocol] = await db.select().from(protocols).where(eq(protocols.id, id));
    return protocol;
  }

  async createProtocol(protocol: InsertProtocol): Promise<Protocol> {
    const [newProtocol] = await db.insert(protocols).values(protocol).returning();
    return newProtocol;
  }

  async updateProtocol(id: number, updates: Partial<Protocol>): Promise<Protocol> {
    const [protocol] = await db
      .update(protocols)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(protocols.id, id))
      .returning();
    return protocol;
  }

  async deleteProtocol(id: number): Promise<void> {
    await db.delete(protocols).where(eq(protocols.id, id));
  }

  // Medication operations
  async getMedications(search?: string, category?: string, scope?: string): Promise<Medication[]> {
    let query = db.select().from(medications);
    
    const conditions = [];
    
    if (search) {
      conditions.push(
        or(
          ilike(medications.name, `%${search}%`),
          sql`array_to_string(${medications.indications}, ',') ILIKE ${`%${search}%`}`
        )
      );
    }
    
    if (category) {
      conditions.push(eq(medications.category, category));
    }
    
    if (scope) {
      conditions.push(eq(medications.scope, scope));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    
    return await query.orderBy(medications.name);
  }

  async getMedication(id: number): Promise<Medication | undefined> {
    const [medication] = await db.select().from(medications).where(eq(medications.id, id));
    return medication;
  }

  async createMedication(medication: InsertMedication): Promise<Medication> {
    const [newMedication] = await db.insert(medications).values(medication).returning();
    return newMedication;
  }

  // Calculator operations
  async getCalculatorResults(userId: number, type?: string): Promise<CalculatorResult[]> {
    const conditions = [eq(calculatorResults.userId, userId)];
    if (type) {
      conditions.push(eq(calculatorResults.calculatorType, type));
    }
    
    return await db.select().from(calculatorResults)
      .where(and(...conditions))
      .orderBy(desc(calculatorResults.createdAt));
  }

  async saveCalculatorResult(result: InsertCalculatorResult): Promise<CalculatorResult> {
    const [newResult] = await db.insert(calculatorResults).values(result).returning();
    return newResult;
  }

  // Learning module operations
  async getLearningModules(moduleNumber?: number): Promise<LearningModule[]> {
    let query = db.select().from(learningModules);
    
    if (moduleNumber) {
      query = query.where(eq(learningModules.moduleNumber, moduleNumber));
    }
    
    return await query.orderBy(learningModules.moduleNumber, learningModules.chapter);
  }

  async getLearningModule(id: number): Promise<LearningModule | undefined> {
    const [module] = await db.select().from(learningModules).where(eq(learningModules.id, id));
    return module;
  }

  async createLearningModule(module: InsertLearningModule): Promise<LearningModule> {
    const [newModule] = await db.insert(learningModules).values(module).returning();
    return newModule;
  }

  // Study notes operations
  async getStudyNotes(chapterNumber?: number): Promise<StudyNote[]> {
    let query = db.select().from(studyNotes);
    
    if (chapterNumber) {
      query = query.where(eq(studyNotes.chapterNumber, chapterNumber));
    }
    
    return await query.orderBy(studyNotes.chapterNumber);
  }

  async getStudyNote(id: number): Promise<StudyNote | undefined> {
    const [note] = await db.select().from(studyNotes).where(eq(studyNotes.id, id));
    return note;
  }

  async createStudyNote(note: InsertStudyNote): Promise<StudyNote> {
    const [newNote] = await db.insert(studyNotes).values(note).returning();
    return newNote;
  }

  async updateStudyNote(id: number, updates: Partial<StudyNote>): Promise<StudyNote> {
    const [updatedNote] = await db.update(studyNotes).set(updates).where(eq(studyNotes.id, id)).returning();
    return updatedNote;
  }

  async deleteStudyNote(id: number): Promise<void> {
    await db.delete(studyNotes).where(eq(studyNotes.id, id));
  }

  // Flashcard operations
  async getFlashcards(chapterNumber?: number): Promise<Flashcard[]> {
    if (chapterNumber) {
      return await db.select().from(flashcards).where(eq(flashcards.chapterNumber, chapterNumber));
    }
    return await db.select().from(flashcards);
  }

  async getFlashcard(id: number): Promise<Flashcard | undefined> {
    const [flashcard] = await db.select().from(flashcards).where(eq(flashcards.id, id));
    return flashcard;
  }

  async createFlashcard(flashcard: InsertFlashcard): Promise<Flashcard> {
    const [newFlashcard] = await db.insert(flashcards).values(flashcard).returning();
    return newFlashcard;
  }

  async updateFlashcard(id: number, updates: Partial<Flashcard>): Promise<Flashcard> {
    const [updatedFlashcard] = await db.update(flashcards)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(flashcards.id, id))
      .returning();
    return updatedFlashcard;
  }

  async deleteFlashcard(id: number): Promise<void> {
    await db.delete(flashcards).where(eq(flashcards.id, id));
  }
  
  // NREMT operations
  async getNremtQuestions(scope?: string, contentArea?: string, difficulty?: string): Promise<NremtQuestion[]> {
    let query = db.select().from(nremtQuestions);
    
    if (scope) {
      query = query.where(eq(nremtQuestions.scope, scope));
    }
    if (contentArea) {
      query = query.where(eq(nremtQuestions.contentArea, contentArea));
    }
    if (difficulty) {
      query = query.where(eq(nremtQuestions.difficulty, difficulty));
    }
    
    return query.orderBy(sql`RANDOM()`);
  }

  async getNremtQuestion(id: number): Promise<NremtQuestion | undefined> {
    const [question] = await db.select().from(nremtQuestions).where(eq(nremtQuestions.id, id));
    return question;
  }

  async createNremtQuestion(question: InsertNremtQuestion): Promise<NremtQuestion> {
    const [newQuestion] = await db.insert(nremtQuestions).values(question).returning();
    return newQuestion;
  }
  
  // NREMT exam session operations
  async getNremtExamSessions(userId?: number): Promise<NremtExamSession[]> {
    let query = db.select().from(nremtExamSessions);
    
    if (userId) {
      query = query.where(eq(nremtExamSessions.userId, userId));
    }
    
    return query.orderBy(desc(nremtExamSessions.createdAt));
  }

  async createNremtExamSession(session: InsertNremtExamSession): Promise<NremtExamSession> {
    const [newSession] = await db.insert(nremtExamSessions).values(session).returning();
    return newSession;
  }
}

export const storage = new DatabaseStorage();
