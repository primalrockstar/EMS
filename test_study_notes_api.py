#!/usr/bin/env python3
"""
Test script for study notes API endpoints
"""

import requests
import json

BASE_URL = "http://localhost:3000/api"

def test_study_notes_endpoints():
    """Test all study notes API endpoints"""
    
    print("🧪 Testing Study Notes API Endpoints...")
    
    try:
        # Test GET all study notes
        response = requests.get(f"{BASE_URL}/study-notes")
        if response.status_code == 200:
            notes = response.json()
            print(f"✅ GET /study-notes: Found {len(notes)} notes")
            
            if notes:
                # Test GET specific note
                first_note_id = notes[0].get('id')
                if first_note_id:
                    response = requests.get(f"{BASE_URL}/study-notes/{first_note_id}")
                    if response.status_code == 200:
                        print(f"✅ GET /study-notes/{first_note_id}: Success")
                    else:
                        print(f"❌ GET /study-notes/{first_note_id}: Failed")
            
            # Show chapter distribution
            chapters = [note.get('chapterNumber') for note in notes if note.get('chapterNumber')]
            if chapters:
                print(f"📚 Chapters available: {min(chapters)}-{max(chapters)} ({len(chapters)} total)")
        else:
            print(f"❌ GET /study-notes: Failed with status {response.status_code}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Make sure the application is running on port 3000")
    except Exception as e:
        print(f"❌ Error testing API: {e}")

if __name__ == "__main__":
    test_study_notes_endpoints()
