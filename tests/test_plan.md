# Test Plan: AI Media Tracker

## 1. Scope
Testing the integration between AppSheet (Frontend) and Google Gemini (Backend) for the accuracy of release dates and genre tagging.

## 2. Test Strategy
* **Unit Testing:** Validate `gemini_integration.js` returns valid JSON format.
* **Integration Testing:** Verify AppSheet successfully triggers the script on "Row Add".
* **UAT (User Acceptance Testing):** Verify the "Calendar View" correctly maps the dates returned by AI.

## 3. Test Cases (Sample)
| ID | Test Case | Pre-Condition | Expected Result | Pass/Fail |
| :--- | :--- | :--- | :--- | :--- |
| TC-01 | Add New Movie Title | App is open | Metadata fields auto-populate within 5s | |
| TC-02 | Invalid Title Input | App is open | AI returns "Movie Not Found" error | |
| TC-03 | Date Format Check | Movie added | Date appears as YYYY-MM-DD | |
