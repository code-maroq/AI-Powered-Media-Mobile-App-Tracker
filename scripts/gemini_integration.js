/**
 * AI-Powered Media Tracker - Production Script
 * Model: Gemini 2.0 Flash (Confirmed via cURL)
 */

const API_KEY = 'My_API_KEY'; 
const MODEL_ID = 'gemini-2.0-flash'; 

/**
 * 1. AUTO-FILL METADATA
 */
function autoFillMediaMetadata() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const sheetName = sheet.getName();
  
  if (!sheetName.includes("Library")) return;

  const activeCell = sheet.getActiveCell();
  const row = activeCell.getRow();
  const title = activeCell.getValue();

  if (activeCell.getColumn() !== 2 || row === 1 || !title) return;

  const prompt = `Act as a movie database. For "${title}", return strictly valid JSON:
  {"summary": "2 sentences", "genre": "Primary", "cast": "Top 3", "date": "YYYY-MM-DD", "lang": "Language", "country": "Country"}. 
  Return ONLY JSON. No backticks.`;

  try {
    const response = callGeminiAPI(prompt);
    const data = JSON.parse(response);

    sheet.getRange(row, 4).setValue(data.summary);   // Column D
    sheet.getRange(row, 5).setValue(data.genre);     // Column E
    sheet.getRange(row, 7).setValue(data.cast);      // Column G
    sheet.getRange(row, 9).setValue(data.date);      // Column I
    sheet.getRange(row, 14).setValue(data.lang);     // Column N
    sheet.getRange(row, 15).setValue(data.country);  // Column O
  } catch (e) {
    Logger.log(`AutoFill Error: ${e.message}`);
  }
}

/**
 * 2. MOVIE RECOMMENDATIONS
 */
function fetchMovieRecommendations() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const recSheet = ss.getSheetByName("Movie_Recommendations");
  if (!recSheet) return;
  
  const prompt = `Recommend 5 movies similar to "Blade Runner". Return strictly a JSON array: 
  [{"title": "...", "summary": "...", "genre": "...", "cast": "...", "date": "YYYY-MM-DD", "year": 2025}].
  Return ONLY JSON.`;

  try {
    const response = callGeminiAPI(prompt);
    const recommendations = JSON.parse(response);
    let nextRow = recSheet.getLastRow() + 1;

    recommendations.forEach(item => {
      recSheet.getRange(nextRow, 2).setValue(item.title);   // Col B
      recSheet.getRange(nextRow, 3).setValue(item.summary); // Col C
      recSheet.getRange(nextRow, 4).setValue(item.genre);   // Col D
      recSheet.getRange(nextRow, 6).setValue(item.cast);    // Col F
      recSheet.getRange(nextRow, 7).setValue(item.date);    // Col G
      recSheet.getRange(nextRow, 8).setValue("Selected");  // Col H
      recSheet.getRange(nextRow, 10).setValue(item.year);   // Col J
      nextRow++;
    });
  } catch (e) {
    Logger.log("Movie Rec Error: " + e.message);
  }
}

/**
 * 3. TV SERIES RECOMMENDATIONS
 */
function fetchTVRecommendations() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const recSheet = ss.getSheetByName("TV_Series_Recommendations");
  if (!recSheet) return;
  
  const prompt = `Recommend 5 TV Series similar to "The Boys". Return strictly a JSON array: 
  [{"title": "...", "summary": "...", "genre": "...", "cast": "...", "date": "YYYY-MM-DD"}].
  Return ONLY JSON.`;

  try {
    const response = callGeminiAPI(prompt);
    const recommendations = JSON.parse(response);
    let nextRow = recSheet.getLastRow() + 1;

    recommendations.forEach(item => {
      recSheet.getRange(nextRow, 2).setValue(item.title);   // Col B
      recSheet.getRange(nextRow, 3).setValue("TV Series");  // Col C
      recSheet.getRange(nextRow, 4).setValue(item.summary); // Col D
      recSheet.getRange(nextRow, 5).setValue(item.genre);   // Col E
      recSheet.getRange(nextRow, 7).setValue(item.cast);    // Col G
      recSheet.getRange(nextRow, 9).setValue(item.date);    // Col I
      recSheet.getRange(nextRow, 10).setValue("Selected"); // Col J
      nextRow++;
    });
  } catch (e) {
    Logger.log("TV Rec Error: " + e.message);
  }
}

/**
 * CORE API CALLER (Matches your confirmed cURL structure)
 */
function callGeminiAPI(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY}`;
  
  const payload = {
    "contents": [{ "parts": [{ "text": prompt }] }],
    "generationConfig": { "temperature": 0.1 }
  };

  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true 
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseText = response.getContentText();
  const result = JSON.parse(responseText);
  
  if (result.error) {
    throw new Error(`API Error: ${result.error.message}`);
  }

  if (result.candidates && result.candidates[0].content) {
    let text = result.candidates[0].content.parts[0].text;
    return text.replace(/```json/g, "").replace(/```/g, "").trim();
  } else {
    throw new Error("No response from AI.");
  }
}