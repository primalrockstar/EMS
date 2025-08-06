
-- Check if study_notes table exists and create if needed
CREATE TABLE IF NOT EXISTS study_notes (
    id SERIAL PRIMARY KEY,
    chapter_number INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    book_title VARCHAR(255) DEFAULT 'Emergency Care and Transportation of the Sick and Injured 12th Edition',
    tags TEXT[], -- Array of tags
    key_points TEXT[], -- Array of key points
    objectives TEXT[], -- Array of learning objectives
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_study_notes_chapter ON study_notes(chapter_number);
CREATE INDEX IF NOT EXISTS idx_study_notes_completed ON study_notes(is_completed);
