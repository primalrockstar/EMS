import { createServer } from "http";
import { storage } from "./storage";
import { insertProtocolSchema, insertCalculatorResultSchema, insertMedicationSchema, insertStudyNotesSchema, insertNremtQuestionSchema, insertNremtExamSessionSchema } from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
const upload = multer({ dest: "uploads/" });
export async function registerRoutes(app) {
    // Protocol routes
    app.get("/api/protocols", async (req, res) => {
        try {
            const { userId, category, state } = req.query;
            const protocols = await storage.getProtocols(userId ? parseInt(userId) : undefined, category, state);
            res.json(protocols);
        }
        catch (error) {
            console.error("Error fetching protocols:", error);
            res.status(500).json({ message: "Failed to fetch protocols" });
        }
    });
    app.get("/api/protocols/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const protocol = await storage.getProtocol(id);
            if (!protocol) {
                return res.status(404).json({ message: "Protocol not found" });
            }
            res.json(protocol);
        }
        catch (error) {
            console.error("Error fetching protocol:", error);
            res.status(500).json({ message: "Failed to fetch protocol" });
        }
    });
    app.post("/api/protocols", upload.single("file"), async (req, res) => {
        try {
            const protocolData = insertProtocolSchema.parse(req.body);
            if (req.file) {
                protocolData.filePath = req.file.path;
                protocolData.fileType = path.extname(req.file.originalname).slice(1);
            }
            const protocol = await storage.createProtocol(protocolData);
            res.json(protocol);
        }
        catch (error) {
            console.error("Error creating protocol:", error);
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid protocol data", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to create protocol" });
        }
    });
    app.put("/api/protocols/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const updates = req.body;
            const protocol = await storage.updateProtocol(id, updates);
            res.json(protocol);
        }
        catch (error) {
            console.error("Error updating protocol:", error);
            res.status(500).json({ message: "Failed to update protocol" });
        }
    });
    // Seeding endpoint
    app.post("/api/seed", async (req, res) => {
        try {
            const { seedEnhancedMedications } = await import("./seed-enhanced-medications.js");
            await seedEnhancedMedications();
            res.json({ message: "Enhanced medications seeded successfully" });
        }
        catch (error) {
            console.error("Error seeding enhanced medications:", error);
            res.status(500).json({ message: "Failed to seed enhanced medications" });
        }
    });
    app.delete("/api/protocols/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await storage.deleteProtocol(id);
            res.json({ message: "Protocol deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting protocol:", error);
            res.status(500).json({ message: "Failed to delete protocol" });
        }
    });
    // Medication routes
    app.get("/api/medications", async (req, res) => {
        try {
            const { search, category, scope } = req.query;
            const medications = await storage.getMedications(search, category, scope);
            res.json(medications);
        }
        catch (error) {
            console.error("Error fetching medications:", error);
            res.status(500).json({ message: "Failed to fetch medications" });
        }
    });
    app.get("/api/medications/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const medication = await storage.getMedication(id);
            if (!medication) {
                return res.status(404).json({ message: "Medication not found" });
            }
            res.json(medication);
        }
        catch (error) {
            console.error("Error fetching medication:", error);
            res.status(500).json({ message: "Failed to fetch medication" });
        }
    });
    app.post("/api/medications", async (req, res) => {
        try {
            const medicationData = insertMedicationSchema.parse(req.body);
            const medication = await storage.createMedication(medicationData);
            res.json(medication);
        }
        catch (error) {
            console.error("Error creating medication:", error);
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid medication data", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to create medication" });
        }
    });
    // Calculator routes
    app.get("/api/calculator-results", async (req, res) => {
        try {
            const { userId, type } = req.query;
            const defaultUserId = userId ? parseInt(userId) : 1;
            const results = await storage.getCalculatorResults(defaultUserId, type);
            res.json(results);
        }
        catch (error) {
            console.error("Error fetching calculator results:", error);
            res.status(500).json({ message: "Failed to fetch calculator results" });
        }
    });
    app.post("/api/calculator-results", async (req, res) => {
        try {
            const resultData = insertCalculatorResultSchema.parse(req.body);
            const result = await storage.saveCalculatorResult(resultData);
            res.json(result);
        }
        catch (error) {
            console.error("Error saving calculator result:", error);
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid calculator result data", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to save calculator result" });
        }
    });
    // Learning module routes
    app.get("/api/learning-modules", async (req, res) => {
        try {
            const { moduleNumber } = req.query;
            const modules = await storage.getLearningModules(moduleNumber ? parseInt(moduleNumber) : undefined);
            res.json(modules);
        }
        catch (error) {
            console.error("Error fetching learning modules:", error);
            res.status(500).json({ message: "Failed to fetch learning modules" });
        }
    });
    app.get("/api/learning-modules/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const module = await storage.getLearningModule(id);
            if (!module) {
                return res.status(404).json({ message: "Learning module not found" });
            }
            res.json(module);
        }
        catch (error) {
            console.error("Error fetching learning module:", error);
            res.status(500).json({ message: "Failed to fetch learning module" });
        }
    });
    // Study notes routes
    app.get("/api/study-notes", async (req, res) => {
        try {
            const { chapterNumber } = req.query;
            const notes = await storage.getStudyNotes(chapterNumber ? parseInt(chapterNumber) : undefined);
            res.json(notes);
        }
        catch (error) {
            console.error("Error fetching study notes:", error);
            res.status(500).json({ message: "Failed to fetch study notes" });
        }
    });
    app.get("/api/study-notes/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const note = await storage.getStudyNote(id);
            if (!note) {
                return res.status(404).json({ message: "Study note not found" });
            }
            res.json(note);
        }
        catch (error) {
            console.error("Error fetching study note:", error);
            res.status(500).json({ message: "Failed to fetch study note" });
        }
    });
    app.post("/api/study-notes", async (req, res) => {
        try {
            const noteData = insertStudyNotesSchema.parse(req.body);
            const note = await storage.createStudyNote(noteData);
            res.json(note);
        }
        catch (error) {
            console.error("Error creating study note:", error);
            if (error instanceof z.ZodError) {
                return res.status(400).json({ message: "Invalid study note data", errors: error.errors });
            }
            res.status(500).json({ message: "Failed to create study note" });
        }
    });
    app.put("/api/study-notes/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const updates = req.body;
            const note = await storage.updateStudyNote(id, updates);
            res.json(note);
        }
        catch (error) {
            console.error("Error updating study note:", error);
            res.status(500).json({ message: "Failed to update study note" });
        }
    });
    app.delete("/api/study-notes/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await storage.deleteStudyNote(id);
            res.json({ message: "Study note deleted successfully" });
        }
        catch (error) {
            console.error("Error deleting study note:", error);
            res.status(500).json({ message: "Failed to delete study note" });
        }
    });
    // Flashcard routes
    app.get("/api/flashcards", async (req, res) => {
        try {
            const chapterNumber = req.query.chapter ? parseInt(req.query.chapter) : undefined;
            const flashcards = await storage.getFlashcards(chapterNumber);
            res.json(flashcards);
        }
        catch (error) {
            console.error("Error fetching flashcards:", error);
            res.status(500).json({ message: "Failed to fetch flashcards" });
        }
    });
    app.get("/api/flashcards/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const flashcard = await storage.getFlashcard(id);
            if (!flashcard) {
                return res.status(404).json({ message: "Flashcard not found" });
            }
            res.json(flashcard);
        }
        catch (error) {
            console.error("Error fetching flashcard:", error);
            res.status(500).json({ message: "Failed to fetch flashcard" });
        }
    });
    app.post("/api/flashcards", async (req, res) => {
        try {
            const flashcard = await storage.createFlashcard(req.body);
            res.status(201).json(flashcard);
        }
        catch (error) {
            console.error("Error creating flashcard:", error);
            res.status(500).json({ message: "Failed to create flashcard" });
        }
    });
    app.put("/api/flashcards/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            const updatedFlashcard = await storage.updateFlashcard(id, req.body);
            res.json(updatedFlashcard);
        }
        catch (error) {
            console.error("Error updating flashcard:", error);
            res.status(500).json({ message: "Failed to update flashcard" });
        }
    });
    app.delete("/api/flashcards/:id", async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            await storage.deleteFlashcard(id);
            res.status(204).send();
        }
        catch (error) {
            console.error("Error deleting flashcard:", error);
            res.status(500).json({ message: "Failed to delete flashcard" });
        }
    });
    // NREMT Question routes
    app.get("/api/nremt-questions/:scope", async (req, res) => {
        try {
            const { scope } = req.params;
            const { contentArea, difficulty } = req.query;
            const questions = await storage.getNremtQuestions(scope, contentArea, difficulty);
            res.json(questions);
        }
        catch (error) {
            console.error("Error fetching NREMT questions:", error);
            res.status(500).json({ message: "Failed to fetch NREMT questions" });
        }
    });
    app.get("/api/nremt-questions", async (req, res) => {
        try {
            const { scope, contentArea, difficulty } = req.query;
            const questions = await storage.getNremtQuestions(scope, contentArea, difficulty);
            res.json(questions);
        }
        catch (error) {
            console.error("Error fetching NREMT questions:", error);
            res.status(500).json({ message: "Failed to fetch NREMT questions" });
        }
    });
    app.post("/api/nremt-questions", async (req, res) => {
        try {
            const questionData = insertNremtQuestionSchema.parse(req.body);
            const question = await storage.createNremtQuestion(questionData);
            res.json(question);
        }
        catch (error) {
            console.error("Error creating NREMT question:", error);
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: "Invalid question data", errors: error.errors });
            }
            else {
                res.status(500).json({ message: "Failed to create NREMT question" });
            }
        }
    });
    // NREMT Exam Session routes
    app.get("/api/nremt-sessions", async (req, res) => {
        try {
            const { userId } = req.query;
            const sessions = await storage.getNremtExamSessions(userId ? parseInt(userId) : undefined);
            res.json(sessions);
        }
        catch (error) {
            console.error("Error fetching NREMT sessions:", error);
            res.status(500).json({ message: "Failed to fetch NREMT sessions" });
        }
    });
    app.post("/api/nremt-sessions", async (req, res) => {
        try {
            const sessionData = insertNremtExamSessionSchema.parse(req.body);
            const session = await storage.createNremtExamSession(sessionData);
            res.json(session);
        }
        catch (error) {
            console.error("Error creating NREMT session:", error);
            if (error instanceof z.ZodError) {
                res.status(400).json({ message: "Invalid session data", errors: error.errors });
            }
            else {
                res.status(500).json({ message: "Failed to create NREMT session" });
            }
        }
    });
    // Dashboard stats
    app.get("/api/dashboard/stats", async (req, res) => {
        try {
            const { userId } = req.query;
            if (!userId) {
                return res.status(400).json({ message: "User ID is required" });
            }
            const userProtocols = await storage.getProtocols(parseInt(userId));
            const medications = await storage.getMedications();
            const studyNotes = await storage.getStudyNotes();
            const offlineProtocols = userProtocols.filter(p => p.isOffline);
            const stats = {
                myProtocols: userProtocols.length,
                medications: medications.length,
                studyNotes: studyNotes.length,
                calculators: 8, // Static count of available calculators
                offlineReady: offlineProtocols.length,
            };
            res.json(stats);
        }
        catch (error) {
            console.error("Error fetching dashboard stats:", error);
            res.status(500).json({ message: "Failed to fetch dashboard stats" });
        }
    });
    const httpServer = createServer(app);
    return httpServer;
}
