#!/usr/bin/env python3
import re
import yaml
import os
from datetime import datetime

# 入力と出力のファイルパス
URL_LIST_FILE = "url-list.txt"
VIDEOS_DATA_FILE = "_data/videos.yml"

def parse_url_list():
    """url-list.txtからURLとメタデータを解析"""
    videos = []
    
    try:
        with open(URL_LIST_FILE, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        for line in lines:
            line = line.strip()
            if not line or line.startswith("#"):
                continue
                
            # 日付とURLを分離
            parts = line.split(" ", 1)
            if len(parts) < 2:
                continue
                
            date_str, url = parts
            
            # YouTubeの動画IDを抽出
            video_id = extract_youtube_id(url)
            if not video_id:
                continue
                
            # 仮のタイトル（本来はYouTube APIを使用して取得するべき）
            title = f"YouTube動画 ({date_str})"
            
            # 埋め込み用URLを生成
            embed_url = f"https://www.youtube.com/embed/{video_id}"
            
            # 日付をパース（YYYY-MMフォーマットから完全な日付に変換）
            try:
                date_obj = datetime.strptime(date_str, "%Y-%m")
                date_iso = date_obj.replace(day=1).isoformat()
            except ValueError:
                date_iso = datetime.now().isoformat()
            
            video = {
                "title": title,
                "embed_url": embed_url,
                "date": date_iso
            }
            
            videos.append(video)
    
    except Exception as e:
        print(f"Error parsing URL list: {e}")
    
    # 新しい日付順にソート
    videos.sort(key=lambda x: x["date"], reverse=True)
    
    return videos

def extract_youtube_id(url):
    """YouTubeのURLから動画IDを抽出"""
    # 標準的なYouTube URL
    match = re.search(r'(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)', url)
    if match:
        return match.group(1)
    return None

def save_to_yaml(videos):
    """動画情報をYAMLファイルに保存"""
    try:
        # ディレクトリが存在しない場合は作成
        os.makedirs(os.path.dirname(VIDEOS_DATA_FILE), exist_ok=True)
        
        with open(VIDEOS_DATA_FILE, 'w', encoding='utf-8') as f:
            yaml.dump(videos, f, allow_unicode=True, default_flow_style=False)
        
        print(f"Saved {len(videos)} videos to {VIDEOS_DATA_FILE}")
    
    except Exception as e:
        print(f"Error saving videos to YAML: {e}")

if __name__ == "__main__":
    videos = parse_url_list()
    if videos:
        save_to_yaml(videos)
