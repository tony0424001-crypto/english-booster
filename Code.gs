// =============================================
// English Booster - Google Apps Script API
// 
// 使用方式：
// 1. 開啟你的 Google Sheets
// 2. 擴充功能 → Apps Script
// 3. 把這整個檔案的內容貼進編輯器
// 4. 儲存 → 部署 → 新增部署作業
// 5. 類型：網頁應用程式
//    執行身分：我
//    存取權：任何人
// 6. 複製網址 貼到 English Booster 的設定中
// =============================================

const SHEET_NAME = 'Wordbook';

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  const action = e.parameter.action || (e.postData ? JSON.parse(e.postData.contents).action : null);
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1,1,1,4).setValues([['word','meaning','pos','saved']]);
    sheet.getRange(1,1,1,4).setFontWeight('bold');
  }

  let result;
  try {
    if (action === 'getAll') {
      result = getAllWords(sheet);
    } else if (action === 'add') {
      const data = e.postData ? JSON.parse(e.postData.contents) : e.parameter;
      result = addWord(sheet, data);
    } else if (action === 'delete') {
      const data = e.postData ? JSON.parse(e.postData.contents) : e.parameter;
      result = deleteWord(sheet, data.word);
    } else if (action === 'sync') {
      const data = JSON.parse(e.postData.contents);
      result = syncAll(sheet, data.words);
    } else {
      result = { status: 'error', message: 'Unknown action' };
    }
  } catch(err) {
    result = { status: 'error', message: err.toString() };
  }

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

function getAllWords(sheet) {
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { status: 'ok', words: [] };
  const headers = data[0];
  const words = data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
  return { status: 'ok', words };
}

function addWord(sheet, data) {
  const existing = sheet.getDataRange().getValues();
  const words = existing.slice(1).map(r => r[0]);
  if (words.includes(data.word)) return { status: 'exists' };
  sheet.appendRow([
    data.word,
    data.meaning || '',
    data.pos || '',
    data.saved || new Date().toLocaleDateString('zh-TW')
  ]);
  return { status: 'ok' };
}

function deleteWord(sheet, word) {
  const data = sheet.getDataRange().getValues();
  for (let i = data.length - 1; i >= 1; i--) {
    if (data[i][0] === word) {
      sheet.deleteRow(i + 1);
      return { status: 'ok' };
    }
  }
  return { status: 'notfound' };
}

function syncAll(sheet, words) {
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) sheet.deleteRows(2, lastRow - 1);
  if (words && words.length > 0) {
    const rows = words.map(w => [
      w.word || '',
      w.meaning || w.detail || '',
      w.pos || '',
      w.saved || ''
    ]);
    sheet.getRange(2, 1, rows.length, 4).setValues(rows);
  }
  return { status: 'ok', count: words ? words.length : 0 };
}
