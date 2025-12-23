# Product Requirements Document (PRD)
## Project: AI-Powered Media Tracker
**Author:** Moyo Hicks
**Version:** 1.0
**Status:** In Development

---

## 1. Executive Summary
The **AI-Powered Media Tracker** is a mobile application designed to automate the tracking of movie and TV series releases. It leverages **Google Gemini AI** to eliminate manual data entry, providing users with a centralised, automated calendar for theatrical and digital releases. The app solves "release fatigue" by offering personalised AI recommendations based on the user's viewing history.

## 2. Problem Statement
**The Challenge:**
Avid movie and TV series enthusiasts struggle to keep track of release dates across multiple streaming platforms and theatrical windows.
* **Manual Effort:** Users currently maintain static spreadsheets (Excel/CSV), notes, and manually research release dates for new seasons.
* **Fragmented Data:** There is no single source of truth for "My Watchlist" that combines current status (Running/Ended) with future release dates.
* **Discovery Issue:** Finding new content often relies on scattered social media recommendations rather than data-driven suggestions.

**The Solution:**
An automated system that allows users to input a simple title (e.g., "The Terminal List"), whereby an AI agent automatically fetches metadata (Genre, Cast, Release Date) and schedules it into a personal calendar.

## 3. User Persona
**"The Power Watcher" (Primary Persona)**
* **Profile:** A tech-savvy individual who treats media consumption seriously.
* **Interests:** Action, Military, Sci-Fi, Thriller, Fantasy.
* **Pain Point:** Wasting time checking IMDB/Rotten Tomatoes every month to update a manual spreadsheet.
* **Goal:** A "Set it and forget it" system where the calendar updates itself.

## 4. Functional Requirements

### 4.1. Core Features
| Feature ID | Feature Name | Description | Priority |
| :--- | :--- | :--- | :--- |
| **F-001** | **Quick Add (AI)** | User inputs a title; AI fetches Release Date, Genre, Cast, and Status. | **P0 (Critical)** |
| **F-002** | **Unified Calendar** | A calendar view displaying release dates by Week and Month. | **P0** |
| **F-003** | **Status Tracking** | Users can tag items as *Following* and *Watched*. | **P1** |
| **F-004** | **Monthly Auto-Refresh** | A scheduled background script checks for release date changes/announcements once a month. | **P1** |
| **F-005** | **Smart Recommendations** | AI analyses "Watched" history to suggest new titles from IMDB Top 100. | **P2** |

### 4.2. Data Structure (Schema)
*Based on existing datasets:*
* **Title:** String (Primary Key)
* **Genre/Sub-Genre:** EnumList (Action, Sci-Fi, Military)
* **Release Type:** Enum (Theatrical, Digital, TV Season)
* **Dates:** Release Date (Date), Release Year (Number)
* **Metadata:** Cast (Text), Country (Text), Total Seasons (Number)

## 5. User Stories
* **US-1:** As a **user**, I want to enter a movie title and have the release date auto-fill, so that I don't have to search Google for it.
* **US-2:** As a **user**, I want to view a "Release Calendar" for the current month, so I can plan my viewing schedule.
* **US-3:** As a **user**, I want to receive a notification when a "Following" series announces a new season date, so I never miss a premiere.
* **US-4:** As a **fan of action movies**, I want the app to recommend highly rated titles I haven't seen, so I can expand my library.

## 6. Technical Architecture
* **Frontend:** AppSheet (Mobile UI, Calendar Views, Dashboard).
* **Backend Database:** Google Sheets (Stores "Library" and "Recommendation" data).
* **Intelligence Layer:** Google Apps Script + **Gemini 3 Flash API**.
    * *Script Trigger:* `onEdit` (for new rows) and Time-driven (monthly).
* **External Data:** IMDB/TMDB data (via Gemini knowledge or API integration).

## 7. Success Metrics (KPIs)
* **Data Integrity:** 95% accuracy in release dates fetched by AI.
* **Time Savings:** Reduction of the user's monthly list-updating time from 1 hour to <5 minutes.
* **Engagement:** Frequency of "Watched" status updates per week.

## 8. Future Roadmap
* **v1.1:** Integration with Letterboxd API for syncing ratings.
* **v1.2:** "Where to Watch" feature (Deep links to Netflix/Prime/AppleTV).
