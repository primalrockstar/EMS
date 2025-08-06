#!/usr/bin/env python3
"""
Local Chapter Integration Script
Integrates your complete emt-chapters-final.json into the workspace
"""

import json
import os
from pathlib import Path

def integrate_chapters_file(chapters_content):
    """
    Integrate the provided chapters content into the workspace
    
    Args:
        chapters_content: The JSON content from emt-chapters-final.json
    """
    
    try:
        # Parse the JSON content
        if isinstance(chapters_content, str):
            chapters_data = json.loads(chapters_content)
        else:
            chapters_data = chapters_content
        
        print(f"📚 Processing chapters data...")
        print(f"📊 Data type: {type(chapters_data)}")
        
        # Handle different possible structures
        if isinstance(chapters_data, list):
            chapters = chapters_data
            print(f"✅ Found {len(chapters)} chapters in list format")
        elif isinstance(chapters_data, dict):
            if 'chapters' in chapters_data:
                chapters = chapters_data['chapters']
                print(f"✅ Found {len(chapters)} chapters in 'chapters' key")
            elif 'data' in chapters_data:
                chapters = chapters_data['data']
                print(f"✅ Found {len(chapters)} chapters in 'data' key")
            else:
                # Assume the dict itself contains chapter data
                chapters = [chapters_data]
                print(f"✅ Treating single object as chapter data")
        
        # Validate chapter structure
        valid_chapters = []
        for i, chapter in enumerate(chapters):
            if isinstance(chapter, dict) and ('chapterNumber' in chapter or 'number' in chapter or 'id' in chapter):
                valid_chapters.append(chapter)
            else:
                print(f"⚠️ Skipping invalid chapter at index {i}: {type(chapter)}")
        
        print(f"✅ Validated {len(valid_chapters)} valid chapters")
        
        # Save the original complete file
        with open('emt-chapters-final.json', 'w', encoding='utf-8') as f:
            json.dump(chapters_data, f, indent=2, ensure_ascii=False)
        print(f"✅ Saved complete file: emt-chapters-final.json")
        
        # Convert to study notes format
        study_notes = convert_to_study_notes_format(valid_chapters)
        
        # Save as study notes JSON
        with open('study_notes_data_complete.json', 'w', encoding='utf-8') as f:
            json.dump(study_notes, f, indent=2, ensure_ascii=False)
        print(f"✅ Saved study notes format: study_notes_data_complete.json")
        
        # Generate markdown
        markdown_content = generate_complete_markdown(study_notes)
        with open('COMPLETE_EMS_STUDY_NOTES.md', 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        print(f"✅ Generated markdown: COMPLETE_EMS_STUDY_NOTES.md")
        
        # Update the application seed file
        create_complete_seed_file(study_notes)
        print(f"✅ Created application seed file")
        
        # Generate summary
        generate_integration_summary(study_notes)
        
        return study_notes
        
    except json.JSONDecodeError as e:
        print(f"❌ JSON parsing error: {e}")
        print("Please ensure the content is valid JSON format")
        return None
    except Exception as e:
        print(f"❌ Integration error: {e}")
        return None

def convert_to_study_notes_format(chapters):
    """Convert chapters to standardized study notes format"""
    
    study_notes = []
    
    for chapter in chapters:
        # Handle different possible field names
        chapter_num = (chapter.get('chapterNumber') or 
                      chapter.get('number') or 
                      chapter.get('id') or 
                      chapter.get('chapter'))
        
        title = (chapter.get('title') or 
                chapter.get('name') or 
                f"Chapter {chapter_num}")
        
        content = (chapter.get('content') or 
                  chapter.get('description') or 
                  chapter.get('text') or 
                  "")
        
        # Handle different array field names
        key_points = (chapter.get('keyPoints') or 
                     chapter.get('key_points') or 
                     chapter.get('points') or 
                     chapter.get('highlights') or 
                     [])
        
        objectives = (chapter.get('objectives') or 
                     chapter.get('learningObjectives') or 
                     chapter.get('learning_objectives') or 
                     chapter.get('goals') or 
                     [])
        
        tags = (chapter.get('tags') or 
               chapter.get('categories') or 
               chapter.get('keywords') or 
               [])
        
        # Ensure chapter number is valid
        if chapter_num and isinstance(chapter_num, (int, str)):
            try:
                chapter_num = int(chapter_num)
                
                note = {
                    'chapterNumber': chapter_num,
                    'title': str(title),
                    'content': str(content),
                    'keyPoints': key_points if isinstance(key_points, list) else [],
                    'objectives': objectives if isinstance(objectives, list) else [],
                    'tags': tags if isinstance(tags, list) else [],
                    'bookTitle': 'Emergency Care and Transportation of the Sick and Injured 12th Edition',
                    'isCompleted': False
                }
                
                study_notes.append(note)
                
            except (ValueError, TypeError):
                print(f"⚠️ Skipping chapter with invalid number: {chapter_num}")
    
    # Sort by chapter number
    study_notes.sort(key=lambda x: x['chapterNumber'])
    
    return study_notes

def generate_complete_markdown(study_notes):
    """Generate comprehensive markdown from all study notes"""
    
    markdown = """# COMPLETE EMS STUDY NOTES
## Emergency Care and Transportation of the Sick and Injured 12th Edition

*Your complete study notes from D:EMSLEARN*

---

"""
    
    # Group chapters by sections
    sections = {
        "Foundation (1-6)": [n for n in study_notes if 1 <= n['chapterNumber'] <= 6],
        "Basic Skills & Life Span (7-14)": [n for n in study_notes if 7 <= n['chapterNumber'] <= 14],
        "Medical Emergencies (15-24)": [n for n in study_notes if 15 <= n['chapterNumber'] <= 24],
        "Trauma (25-33)": [n for n in study_notes if 25 <= n['chapterNumber'] <= 33],
        "Special Populations (34-36)": [n for n in study_notes if 34 <= n['chapterNumber'] <= 36],
        "Operations (37-39)": [n for n in study_notes if 37 <= n['chapterNumber'] <= 39],
        "Advanced Topics (40-41)": [n for n in study_notes if 40 <= n['chapterNumber'] <= 41]
    }
    
    for section_name, section_chapters in sections.items():
        if section_chapters:
            markdown += f"\n## {section_name}\n\n"
            
            for note in section_chapters:
                markdown += f"### Chapter {note['chapterNumber']}: {note['title']}\n\n"
                
                if note['content']:
                    markdown += f"**Content:**\n{note['content']}\n\n"
                
                if note['keyPoints']:
                    markdown += "**Key Points:**\n"
                    for point in note['keyPoints']:
                        markdown += f"- {point}\n"
                    markdown += "\n"
                
                if note['objectives']:
                    markdown += "**Learning Objectives:**\n"
                    for obj in note['objectives']:
                        markdown += f"- {obj}\n"
                    markdown += "\n"
                
                if note['tags']:
                    markdown += f"**Tags:** {', '.join(note['tags'])}\n\n"
                
                markdown += "---\n\n"
    
    # Add summary
    chapters_list = [n['chapterNumber'] for n in study_notes]
    markdown += f"""
## Summary

- **Total Chapters:** {len(study_notes)}
- **Chapter Range:** {min(chapters_list) if chapters_list else 'N/A'}-{max(chapters_list) if chapters_list else 'N/A'}
- **Source:** D:EMSLEARN\\public\\emt-chapters-final.json
- **Integration Date:** Current
- **Status:** Complete Integration ✅

---

*Your complete EMS study notes are now integrated and ready for use!*
"""
    
    return markdown

def create_complete_seed_file(study_notes):
    """Create the complete seed file for the application"""
    
    seed_content = '''import { db } from './db';
import { studyNotes } from '../shared/schema';

export async function seedCompleteStudyNotes() {
  console.log("Seeding complete study notes from emt-chapters-final.json...");
  
  const completeStudyNotes = [
'''
    
    for note in study_notes:
        content = note['content'].replace('`', '\\`').replace('${', '\\${')
        title = note['title'].replace("'", "\\'")
        
        seed_content += f'''    {{
      chapterNumber: {note['chapterNumber']},
      title: '{title}',
      content: `{content}`,
      bookTitle: "Emergency Care and Transportation of the Sick and Injured 12th Edition",
      tags: {json.dumps(note.get('tags', []))},
      keyPoints: {json.dumps(note.get('keyPoints', []))},
      objectives: {json.dumps(note.get('objectives', []))},
      isCompleted: false
    }},
'''
    
    seed_content += '''  ];

  try {
    console.log("Clearing existing study notes...");
    await db.delete(studyNotes);
    
    console.log(`Inserting ${completeStudyNotes.length} complete study notes...`);
    for (const note of completeStudyNotes) {
      await db.insert(studyNotes).values(note);
    }
    
    console.log("✅ Complete study notes seeding finished!");
    console.log(`📚 Successfully inserted ${completeStudyNotes.length} chapters`);
    
    return { success: true, count: completeStudyNotes.length };
  } catch (error) {
    console.error("❌ Error seeding complete study notes:", error);
    throw error;
  }
}

export { completeStudyNotes };
'''
    
    with open('server/seed-complete-study-notes.ts', 'w', encoding='utf-8') as f:
        f.write(seed_content)

def generate_integration_summary(study_notes):
    """Generate a summary of the integration"""
    
    chapters_by_number = sorted([n['chapterNumber'] for n in study_notes])
    missing_chapters = []
    
    # Check for missing chapters 1-41
    for i in range(1, 42):
        if i not in chapters_by_number:
            missing_chapters.append(i)
    
    summary = f"""# Integration Summary

## ✅ COMPLETE INTEGRATION SUCCESSFUL!

Your emt-chapters-final.json has been successfully integrated into the workspace.

### 📊 Statistics:
- **Total Chapters Integrated:** {len(study_notes)}
- **Chapters Available:** {', '.join(map(str, chapters_by_number[:10]))}{'...' if len(chapters_by_number) > 10 else ''}
- **Coverage:** {len(study_notes)}/41 chapters ({(len(study_notes)/41)*100:.1f}%)

### 📁 Files Created:
1. `emt-chapters-final.json` - Original file backup
2. `study_notes_data_complete.json` - Structured study notes data  
3. `COMPLETE_EMS_STUDY_NOTES.md` - Formatted markdown version
4. `server/seed-complete-study-notes.ts` - Application integration file

### 🚀 Next Steps:
1. **Start the application:** `npm run dev`
2. **Update the startup script** to use the new seed file
3. **Access your complete study notes** in the application

### ⚠️ Missing Chapters:
{f"Chapters {', '.join(map(str, missing_chapters))}" if missing_chapters else "All chapters present! 🎉"}

---

Your study notes are now fully integrated and ready to use!
"""
    
    with open('INTEGRATION_COMPLETE_SUMMARY.md', 'w') as f:
        f.write(summary)
    
    print("\n" + "="*60)
    print("🎉 INTEGRATION COMPLETE!")
    print(f"📚 Integrated {len(study_notes)} chapters")
    print(f"📁 Created {4} files")
    print("📖 See INTEGRATION_COMPLETE_SUMMARY.md for details")
    print("="*60)

# Instructions for user
def show_instructions():
    """Show instructions for providing the JSON content"""
    
    instructions = """
# 📋 Ready to Integrate Your Study Notes!

I'm ready to integrate your `emt-chapters-final.json` file. Please provide the content using one of these methods:

## Method 1: Copy & Paste (Recommended)
1. Open your file: `D:\\EMSLEARN\\public\\emt-chapters-final.json`
2. Select all content (Ctrl+A)
3. Copy (Ctrl+C)  
4. Paste the content in your next message

## Method 2: PowerShell Command
Run this in PowerShell and share the output:
```powershell
Get-Content "D:\\EMSLEARN\\public\\emt-chapters-final.json" | Out-String
```

## Method 3: Partial Content
If the file is very large, share just a few chapters first to test the integration.

## What I'll Do:
✅ Parse and validate your JSON content
✅ Convert to standardized study notes format  
✅ Create application-ready seed files
✅ Generate markdown documentation
✅ Integrate into the EMS application build

Ready when you are! Just paste your JSON content in the next message.
"""
    
    print(instructions)
    
    with open('INTEGRATION_INSTRUCTIONS.md', 'w') as f:
        f.write(instructions)

if __name__ == "__main__":
    show_instructions()