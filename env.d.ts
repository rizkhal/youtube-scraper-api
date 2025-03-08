/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
    YOUTUBE_CHANNELS: string;
  }
}
