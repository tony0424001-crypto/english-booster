# English Booster 📚
多益英文學習工具 - GitHub Pages + Google Sheets 同步版

## 快速開始

### 一、部署到 GitHub Pages

1. 登入 [GitHub](https://github.com)
2. 右上角 **+** → **New repository**
3. Repository name 填 `english-booster`（或任何名字）
4. 選 **Public**，按 **Create repository**
5. 點 **uploading an existing file**，把 `English_Booster.html` 拖進去
   - **重要**：把檔名改成 `index.html` 再上傳
6. 按 **Commit changes**
7. 進 **Settings → Pages**
8. Source 選 **Deploy from a branch**，Branch 選 **main**，按 Save
9. 等約 1 分鐘，你的網址就是：
   `https://你的帳號.github.io/english-booster/`

---

### 二、設定 Google Sheets 同步（選用）

#### 建立 Apps Script

1. 開啟 [Google Sheets](https://sheets.google.com) 建立新試算表
2. 點選單 **擴充功能 → Apps Script**
3. 把 `Code.gs` 的全部內容貼進編輯器，覆蓋原本的內容
4. 按 💾 存檔
5. 點 **部署 → 新增部署作業**
6. 設定如下：
   - 類型：**網頁應用程式**
   - 執行身分：**我**
   - 誰可以存取：**任何人**
7. 按 **部署**，授權後複製 **網頁應用程式網址**

#### 連接到 English Booster

1. 開啟你的 English Booster 網頁
2. 畫面底部會出現「設定同步」按鈕
3. 點擊後照步驟說明，貼入剛才的 Apps Script 網址
4. 之後新增的單字會自動同步到 Google Sheets！

---

## 功能清單

| 功能 | 說明 |
|------|------|
| 📷 截圖解析 | 上傳截圖，AI 自動解析英文單字、意思、三態、整句翻譯 |
| 📝 考古題 | 6大主題 × 3難度 × 3題型，附解析與朗讀 |
| 🎮 單字遊戲 | 連連看、填空、拼字、閃卡、打地鼠、聽音選字 |
| 📖 單字本 | 儲存單字，支援搜尋、匯出、雲端同步 |
| 🌅 每日一句 | 每次開啟顯示例句，可逐字查詢 |
| ✏️ 寫作批改 | AI 批改文法，給分並說明錯誤 |
| 📊 學習統計 | 追蹤答題數、答對率、各主題分佈 |

## 注意事項

- 截圖解析、寫作批改功能需要 Anthropic API（在 Claude.ai 中使用時自動支援）
- 其他功能完全離線可用
- 單字本預設存在瀏覽器本機；設定 Google Sheets 後自動雲端同步
