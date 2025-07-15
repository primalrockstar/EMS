// server/database-storage.ts

import { db } from './db'
import {
  protocols,
  medications,
  learning_modules,
  study_notes,
  nremt_questions,
  nremt_exam_sessions
} from './schema'

// ✅ Safe type definitions
export type ProtocolRecord = {
  id: number
  title: string
  updatedAt: Date
}

export type MedicationRecord = {
  id: number
  name: string
  updatedAt: Date
}

export type ModuleRecord = {
  id: number
  title: string
  createdAt: Date
}

export type NoteRecord = {
  id: number
  text: string
  updatedAt: Date
}

export type QuestionRecord = {
  id: number
  question: string
  updatedAt: Date
}

export type SessionRecord = {
  id: number
  userId: number
  createdAt: Date
}

// 🚀 Refactored class
export class DatabaseStorage {
  async getProtocols(): Promise<ProtocolRecord[]> {
    const results = await db.select().from(protocols)
    return results.map(row => ({
      id: row.id,
      title: row.title,
      updatedAt: row.updatedAt
    }))
  }

  async getMedications(): Promise<MedicationRecord[]> {
    const results = await db.select().from(medications)
    return results.map(row => ({
      id: row.id,
      name: row.name,
      updatedAt: row.updatedAt
    }))
  }

  async getModules(): Promise<ModuleRecord[]> {
    const results = await db.select().from(learning_modules)
    return results.map(row => ({
      id: row.id,
      title: row.title,
      createdAt: row.createdAt
    }))
  }

  async getStudyNotes(): Promise<NoteRecord[]> {
    const results = await db.select().from(study_notes)
    return results.map(row => ({
      id: row.id,
      text: row.text,
      updatedAt: row.updatedAt
    }))
  }

  async getQuestions(): Promise<QuestionRecord[]> {
    const results = await db.select().from(nremt_questions)
    return results.map(row => ({
      id: row.id,
      question: row.question,
      updatedAt: row.updatedAt
    }))
  }

  async getExamSessions(): Promise<SessionRecord[]> {
    const results = await db.select().from(nremt_exam_sessions)
    return results.map(row => ({
      id: row.id,
      userId: row.userId,
      createdAt: row.createdAt
    }))
  }
}
