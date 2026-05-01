// =============================================
// バーコードスキャナー → Google スプレッドシート
// =============================================
// 送信先スプレッドシートID（固定）
const SPREADSHEET_ID = '1ZUH2zbQnTtnvYYYI5xtohjtDIfEWdmrNX9Hw3rUfLA0';
const SHEET_NAME = 'スキャンデータ'; // シート名（存在しない場合は自動作成）

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const barcodes = data.barcodes || [];
    const sentAt = data.sentAt ? new Date(data.sentAt) : new Date();

    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);

    // シートが存在しない場合は作成してヘッダーを追加
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['バーコード', '読取時刻', '送信日時']);
      sheet.getRange(1, 1, 1, 3).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    // データを追記
    barcodes.forEach(function(item) {
      sheet.appendRow([item.code, item.time, sentAt]);
    });

    // 列幅を自動調整
    sheet.autoResizeColumns(1, 3);

    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'ok',
        count: barcodes.length,
        message: barcodes.length + '件を記録しました'
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// CORSプリフライト対応（GET リクエスト）
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'バーコードスキャナー GAS稼働中' }))
    .setMimeType(ContentService.MimeType.JSON);
}
