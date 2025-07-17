// server/database-storage.ts
import { db } from './db';
import { protocols, medications, learning_modules, study_notes, nremt_questions, nremt_exam_sessions } from './schema';
// 🚀 Refactored class
export class DatabaseStorage {
    async getProtocols() {
        const results = await db.select().from(protocols);
        return results.map(row => ({
            id: row.id,
            title: row.title,
            updatedAt: row.updatedAt
        }));
    }
    async getMedications() {
        const results = await db.select().from(medications);
        return results.map(row => ({
            id: row.id,
            name: row.name,
            updatedAt: row.updatedAt
        }));
    }
    async getModules() {
        const results = await db.select().from(learning_modules);
        return results.map(row => ({
            id: row.id,
            title: row.title,
            createdAt: row.createdAt
        }));
    }
    async getStudyNotes() {
        const results = await db.select().from(study_notes);
        return results.map(row => ({
            id: row.id,
            text: row.text,
            updatedAt: row.updatedAt
        }));
    }
    async getQuestions() {
        const results = await db.select().from(nremt_questions);
        return results.map(row => ({
            id: row.id,
            question: row.question,
            updatedAt: row.updatedAt
        }));
    }
    async getExamSessions() {
        const results = await db.select().from(nremt_exam_sessions);
        return results.map(row => ({
            id: row.id,
            userId: row.userId,
            createdAt: row.createdAt
        }));
    }
}
