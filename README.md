# YouTube Video Scraper API

This API scrapes YouTube videos from specified channels, stores them in Supabase, and provides endpoints to retrieve video data.

## Base URL

```
http://localhost:3000
```

## Endpoints

### 1. Health Check

#### **`GET /`**

Returns a simple response to indicate that the API is running.

**Response:**

```json
"Ok"
```

---

### 2. Get All Videos

#### **`GET /api/videos`**

Fetches all stored videos from Supabase.

**Response:**

```json
{
  "success": true,
  "videos": [
    {
      "channel": "@AdiHidayatOfficial",
      "video_id": "KKU4slX5gwM",
      "url": "https://www.youtube.com/watch?v=KKU4slX5gwM",
      "created_at": "2024-03-08T12:00:00.000Z"
    }
  ]
}
```

---

### 3. Get Videos by Channel

#### **`GET /api/videos/:channel`**

Fetches all videos for a specific YouTube channel.

**URL Parameters:**

- `channel` (string) - The YouTube channel handle (e.g., `@AdiHidayatOfficial`).

**Example Request:**

```sh
curl "http://localhost:3000/api/videos/@AdiHidayatOfficial"
```

**Response:**

```json
{
  "success": true,
  "videos": [
    {
      "channel": "@AdiHidayatOfficial",
      "video_id": "KKU4slX5gwM",
      "url": "https://www.youtube.com/watch?v=KKU4slX5gwM",
      "created_at": "2024-03-08T12:00:00.000Z"
    }
  ]
}
```

---

### 4. Run Scraper Manually

#### **`GET /api/schedule`**

Triggers the YouTube scraper to fetch new videos and store them in Supabase.

**Response:**

```json
{
  "success": true,
  "message": "Scraper ran successfully!",
  "videos": [
    {
      "channel": "@AdiHidayatOfficial",
      "video_id": "NEW_VIDEO_ID",
      "url": "https://www.youtube.com/watch?v=NEW_VIDEO_ID",
      "created_at": "2024-03-09T12:00:00.000Z"
    }
  ]
}
```

---

## Environment Variables

Ensure the following environment variables are set:

```env
PORT=3000
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
YOUTUBE_CHANNELS='["@AdiHidayatOfficial", "@AnotherChannel"]'
```

---

## Deployment

This API is designed to be deployed on **Vercel**. Ensure your environment variables are configured in the **Vercel Dashboard**.

---

## Scheduled Execution

To automatically run the scraper, set up a **cron job** using a scheduler service (e.g., GitHub Actions, Vercel Cron Jobs, or a third-party API monitoring tool like UptimeRobot).

**Example Cron Job (Every 6 hours):**

```
0 */6 * * * curl -X GET http://localhost:3000/api/schedule
```

---

## License

MIT License
