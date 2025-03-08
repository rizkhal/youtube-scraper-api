-- Create table for YouTube Shorts
CREATE TABLE
    shorts (
        id UUID DEFAULT gen_random_uuid () PRIMARY KEY,
        channel TEXT NOT NULL,
        video_id TEXT UNIQUE NOT NULL,
        url TEXT NOT NULL,
        thumbnail TEXT,
        created_at TIMESTAMP DEFAULT now ()
    );

-- Add an index for faster queries
CREATE INDEX idx_youtube_shorts_video_id ON shorts (video_id);

CREATE INDEX idx_youtube_shorts_channel ON shorts (channel);