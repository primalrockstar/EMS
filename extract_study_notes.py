#!/usr/bin/env python3
"""
Study Notes Recovery Script
Extracts all study notes from EMS Learning Platform seed files
"""

import re
import json
from pathlib import Path

def extract_study_notes_from_file(file_path):
    """Extract study note objects from a TypeScript seed file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find all study note objects using regex
        # Look for objects with chapterNumber, title, content, etc.
        pattern = r'\{\s*chapterNumber:\s*(\d+),\s*title:\s*["\']([^"\']+)["\'],\s*content:\s*["`\']([^`"\']+)["`\'],[^}]+\}'
        
        notes = []
        
        # More sophisticated parsing - split by chapter objects
        # Look for patterns like: { chapterNumber: X, title: "...", content: "..." ... }
        chapter_pattern = r'\{\s*chapterNumber:\s*(\d+),'
        matches = list(re.finditer(chapter_pattern, content))
        
        for i, match in enumerate(matches):
            start_pos = match.start()
            # Find the end of this object (next object start or end of array)
            if i + 1 < len(matches):
                end_pos = matches[i + 1].start()
            else:
                # Find the end of the array or file
                end_pos = content.rfind(']')
                if end_pos == -1:
                    end_pos = len(content)
            
            # Extract the object text
            obj_text = content[start_pos:end_pos]
            
            # Clean up the object (remove trailing comma and closing brace if needed)
            obj_text = obj_text.rstrip().rstrip(',').rstrip()
            if not obj_text.endswith('}'):
                brace_pos = obj_text.rfind('}')
                if brace_pos != -1:
                    obj_text = obj_text[:brace_pos + 1]
            
            # Extract key information
            chapter_num = int(match.group(1))
            
            # Extract title
            title_match = re.search(r'title:\s*["\']([^"\']+)["\']', obj_text)
            title = title_match.group(1) if title_match else f"Chapter {chapter_num}"
            
            # Extract content (handle multiline strings)
            content_match = re.search(r'content:\s*["`\']([^`"\']*(?:\n[^`"\']*)*)["`\']', obj_text, re.DOTALL)
            content_text = content_match.group(1) if content_match else ""
            
            # Extract key points
            key_points = []
            key_points_match = re.search(r'keyPoints:\s*\[(.*?)\]', obj_text, re.DOTALL)
            if key_points_match:
                points_text = key_points_match.group(1)
                # Extract individual points
                point_matches = re.findall(r'["\']([^"\']+)["\']', points_text)
                key_points = point_matches
            
            # Extract objectives
            objectives = []
            objectives_match = re.search(r'(?:objectives|learningObjectives):\s*\[(.*?)\]', obj_text, re.DOTALL)
            if objectives_match:
                obj_text_content = objectives_match.group(1)
                obj_matches = re.findall(r'["\']([^"\']+)["\']', obj_text_content)
                objectives = obj_matches
            
            # Extract tags
            tags = []
            tags_match = re.search(r'tags:\s*\[(.*?)\]', obj_text, re.DOTALL)
            if tags_match:
                tags_text = tags_match.group(1)
                tag_matches = re.findall(r'["\']([^"\']+)["\']', tags_text)
                tags = tag_matches
            
            note = {
                'chapterNumber': chapter_num,
                'title': title,
                'content': content_text.strip(),
                'keyPoints': key_points,
                'objectives': objectives,
                'tags': tags
            }
            notes.append(note)
        
        return notes
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return []

def generate_markdown_notes(notes):
    """Generate a comprehensive markdown file from study notes"""
    
    # Sort notes by chapter number
    notes.sort(key=lambda x: x['chapterNumber'])
    
    markdown = """# RECOVERED EMS STUDY NOTES
## Emergency Care and Transportation of the Sick and Injured 12th Edition

*Complete recovery of your study notes from D:EMSLEARN*

---

"""
    
    current_section = None
    
    for note in notes:
        chapter_num = note['chapterNumber']
        
        # Determine section based on chapter number
        if chapter_num <= 6:
            section = "Foundation Chapters (1-6)"
        elif chapter_num <= 14:
            section = "Basic Skills & Life Span (7-14)"
        elif chapter_num <= 24:
            section = "Medical Emergencies (15-24)"
        elif chapter_num <= 33:
            section = "Trauma (25-33)"
        elif chapter_num <= 36:
            section = "Special Populations (34-36)"
        elif chapter_num <= 39:
            section = "Operations (37-39)"
        else:
            section = "Advanced Topics (40-41)"
        
        # Add section header if this is a new section
        if section != current_section:
            markdown += f"\n## {section}\n\n"
            current_section = section
        
        # Add chapter content
        markdown += f"### Chapter {chapter_num}: {note['title']}\n\n"
        
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
    
    # Add recovery information
    markdown += f"""
## Recovery Information

- **Source:** EMS Learning Platform
- **Original Location:** D:EMSLEARN
- **Recovery Date:** {Path().cwd()}
- **Format:** Emergency Care and Transportation of the Sick and Injured 12th Edition
- **Chapters Recovered:** {len(notes)} chapters
- **Chapter Range:** {min(n['chapterNumber'] for n in notes)}-{max(n['chapterNumber'] for n in notes)}

---

*This file contains your complete recovered study notes. You can continue to edit and modify these notes as needed for your EMS studies.*
"""
    
    return markdown

def main():
    """Main function to extract and recover all study notes"""
    
    # Find all seed files that might contain study notes
    seed_files = [
        'server/seed-missing-chapters.ts',
        'server/seed-remaining-chapters.ts',
        # Add other files if they contain study notes
    ]
    
    all_notes = []
    
    print("Starting study notes recovery...")
    
    for file_path in seed_files:
        if Path(file_path).exists():
            print(f"Processing {file_path}...")
            notes = extract_study_notes_from_file(file_path)
            all_notes.extend(notes)
            print(f"  Found {len(notes)} chapters")
        else:
            print(f"File not found: {file_path}")
    
    if all_notes:
        print(f"\nTotal chapters recovered: {len(all_notes)}")
        
        # Generate markdown file
        markdown_content = generate_markdown_notes(all_notes)
        
        # Write to output file
        output_file = 'COMPLETE_STUDY_NOTES_RECOVERY.md'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(markdown_content)
        
        print(f"Study notes recovered and saved to: {output_file}")
        
        # Also save as JSON for structured data
        json_file = 'study_notes_data.json'
        with open(json_file, 'w', encoding='utf-8') as f:
            json.dump(all_notes, f, indent=2, ensure_ascii=False)
        
        print(f"Structured data saved to: {json_file}")
        
        # Print summary
        chapters = [n['chapterNumber'] for n in all_notes]
        print(f"\nRecovered chapters: {sorted(chapters)}")
        
        # Check for missing chapters
        all_chapters = set(range(1, 42))  # Chapters 1-41
        recovered_chapters = set(chapters)
        missing_chapters = sorted(all_chapters - recovered_chapters)
        
        if missing_chapters:
            print(f"Missing chapters: {missing_chapters}")
        else:
            print("All chapters recovered successfully!")
    
    else:
        print("No study notes found in the seed files.")

if __name__ == "__main__":
    main()