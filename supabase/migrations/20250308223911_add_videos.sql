-- Create table for YouTube Videos
CREATE TABLE
    videos (
        id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
        channel TEXT NOT NULL,
        video_id TEXT UNIQUE NOT NULL,
        url TEXT NOT NULL,
        thumbnail TEXT,
        created_at TIMESTAMP DEFAULT now ()
    );

-- Add an index for faster queries
CREATE INDEX idx_youtube_videos_video_id ON videos (video_id);

CREATE INDEX idx_youtube_videos_channel ON videos (channel);