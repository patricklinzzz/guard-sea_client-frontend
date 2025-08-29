# GuardSea - 海洋保育專題網站
![image](https://tibamef2e.com/cjd101/g1/image/CJD101_G1_GuardSea_%E6%B5%B7%E5%A0%B1.png)
* [專案正式上線網址](https://tibamef2e.com/cjd101/g1/)

## 專案簡介
隨著海洋污染、過度捕撈與棲地破壞的加劇，許多海洋動物正面臨生存危機。**GuardSea** 誕生的目的，不僅是展現海洋的美麗，更希望揭示背後的隱憂。我們藉由沉浸式的互動體驗與資訊傳遞，讓使用者意識到保育的重要性，並激發更多人採取實際行動。

---


## 專案架構

|  資料夾名稱 | 說明 | GitHub 連結  |
| -------- | -------------- | ----- |
| g1       | 專案資料夾     |   |
| - front  | 前台內容        | [前台](https://github.com/patricklinzzz/guard-sea_client-frontend)  |
| - admin   | 後台內容        | [後台](https://github.com/patricklinzzz/guard-sea_admin-frontend)  |
| - api    | PHP 內容       | [API](https://github.com/patricklinzzz/guard-sea_api)  |

---


## 專案功能

### 前台功能
| 前台頁面 | 詳細功能描述 |
|---|---|
| **首頁** | 提供 Banner 影片區塊與生物地圖、污染數據視覺動畫、珊瑚礁白化危機比例互動功能，並提供最新消息與商品專區連結。 |
| **教育** | 包含海洋生物圖鑑與互動小遊戲測驗，測驗達標可獲得優惠券。 |
| **商店** | 支援商品分類查詢、規格選擇、加入購物車與購買結帳流程。 |
| **活動** | 提供活動依分類查詢、詳細資訊查看與線上報名功能。 |
| **最新消息** | 使用者可查看文章，並透過分類瀏覽不同主題，包含優惠訊息與活動花絮。 |
| **關於我們** | 介紹專案的核心理念、宗旨與團隊成員，並加入動畫效果。 |
| **會員** | 提供個人化服務，可查詢訂單紀錄、管理優惠券，並支援上傳與編輯個人照片。 |
| **購物車** | 支援新增或修改商品，並提供購買結帳流程與訂單/優惠券查詢。 |

### 後台功能
| 後台頁面 | 詳細功能描述 |
|---|---|
| **管理員設定** | 管理後台帳號、登入權限與基本資料。 |
| **教育測驗管理** | 新增/修改測驗題目與答案，管理測驗結果與優惠券發放。 |
| **商店** | 支援商品新增/修改/上下架、分類維護、圖片上傳與綠界金流串接。 |
| **活動管理** | 支援活動新增/修改、分類/狀態設定、報名名單管理與優惠券發放，並可連結至 GoogleMap。 |
| **最新消息管理** | 支援公告與文章的新增/編輯/刪除/隱藏/顯示，以及分類與排序調整。 |
| **會員管理** | 包含會員資料維護、訂單/活動/優惠券查詢與帳號狀態管理。 |

---

## 技術架構
### 前端
* **框架/函式庫：** Vue.js
* **狀態管理：** Pinia
* **樣式語言：** Sass (SCSS)
* **基礎技術：** HTML, CSS, JavaScript
* **UI 套件：** Element Plus

### 後端
* **後端語言：** PHP
* **資料庫：** MySQL

### 開發工具與套件
* **打包工具：** Vite
* **非同步請求：** Axios
* **動畫效果：** GSAP
* **內容編輯器：** CKEditor 5
* **地圖 API：** Leaflet
* **使用者體驗套件：** SweetAlert2 (彈出視窗), Swiper (輪播圖), img-comparison-slider (圖片比較滑桿)
* **程式碼格式化：** Prettier
---

## 如何開始 
1.  **環境需求：** Node.js、npm 或 yarn。
2.  **安裝：**
    ```bash
    git clone [您的專案網址]
    cd guardsea
    npm install
    ```
3.  **執行：**
    ```bash
    npm run dev
    ```
    專案將在 `http://localhost` 啟動。

---

## 貢獻者
- [@patricklinzzz](https://github.com/patricklinzzz)
- [@AliangWu1125](https://github.com/AliangWu1125)
- [@WesternKirbs](https://github.com/WesternKirbs)
- [@Joey6301](https://github.com/Joey6301)
- [@Wen-31d067](https://github.com/Wen-31d067)
- [@Syuan1996](https://github.com/Syuan1996)
- [@yuan00914](https://github.com/yuan00914)


## 其他資訊
* [專案簡報](https://drive.google.com/file/d/1w1zNs4lvM6B7zQIHcoyCElCuLqNuSxUG/view?usp=drive_link)
* [專案 Demo 影片]()
* [專案系統文件](https://drive.google.com/file/d/1rvo7drQUMKD2wj50Yqv6jEZP0Ie3D6Hu/view?usp=drive_link)