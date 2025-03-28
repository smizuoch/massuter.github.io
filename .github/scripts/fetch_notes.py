#!/usr/bin/env python3
import os
import requests
import yaml
from datetime import datetime

# Note APIの情報（正しいユーザー名に修正）
NOTE_USERNAME = "massuter"  # 実際のNoteユーザー名
API_BASE_URL = "https://note.com/api/v2/creators"
API_ENDPOINT = f"{API_BASE_URL}/{NOTE_USERNAME}"
CONTENTS_ENDPOINT = f"{API_ENDPOINT}/contents?kind=note&page=1"

# データファイルのパス
DATA_FILE = "_data/notes.yml"

def fetch_notes():
    """Note APIから記事情報を取得"""
    try:
        print(f"Fetching notes from: {CONTENTS_ENDPOINT}")
        response = requests.get(CONTENTS_ENDPOINT)
        response.raise_for_status()
        
        data = response.json()
        notes = []
        
        # 返されたデータから必要な情報を抽出
        for item in data.get("data", {}).get("contents", []):
            note = {
                "title": item.get("name", ""),
                "url": f"https://note.com/{NOTE_USERNAME}/n/{item.get('key', '')}",
                "thumb": item.get("eyecatch", ""),
                "excerpt": item.get("body", "")[:100] + "...",  # 100文字で切り詰め
                "date": item.get("publishAt", datetime.now().isoformat())
            }
            notes.append(note)
        
        print(f"Found {len(notes)} notes")
        return notes
    except Exception as e:
        print(f"Error fetching notes: {e}")
        return []

def save_to_yaml(notes):
    """取得した記事情報をYAMLファイルに保存"""
    try:
        # ディレクトリがなければ作成
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            yaml.dump(notes, f, allow_unicode=True, default_flow_style=False)
        print(f"Saved {len(notes)} notes to {DATA_FILE}")
    except Exception as e:
        print(f"Error saving notes to YAML: {e}")

if __name__ == "__main__":
    notes = fetch_notes()
    if notes:
        save_to_yaml(notes)
