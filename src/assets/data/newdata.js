// 品牌動態brand
import assistant1 from '@/assets/images/new/brandimg/assistant1.jpg'
import assistant2 from '@/assets/images/new/brandimg/assistant2.jpg'
import photographer1 from '@/assets/images/new/brandimg/photographer1.jpg'
import photographer2 from '@/assets/images/new/brandimg/photographer2.jpg'
import turtleintowild1 from '@/assets/images/new/brandimg/turtleintowild1.jpg'
import turtleintowild2 from '@/assets/images/new/brandimg/turtleintowild2.jpg'
import volunteer1 from '@/assets/images/new/brandimg/volunteer1.jpg'
import volunteer2 from '@/assets/images/new/brandimg/volunteer2.jpg'

// 優惠情報discount
import deliveryfee1 from '@/assets/images/new/discountimg/deliveryfee1.jpg'
import deliveryfee2 from '@/assets/images/new/discountimg/deliveryfee2.jpg'
import discountcoupon1 from '@/assets/images/new/discountimg/discountcoupon1.jpg'
import discountcoupon2 from '@/assets/images/new/discountimg/discountcoupon2.jpg'
import memberjoin1 from '@/assets/images/new/discountimg/memberjoin1.jpg'
import memberjoin2 from '@/assets/images/new/discountimg/memberjoin2.jpg'
import oceandate681 from '@/assets/images/new/discountimg/oceandate681.jpg'
import oceandate682 from '@/assets/images/new/discountimg/oceandate682.jpg'

// 活動花絮discount

import cleanbeach1 from '@/assets/images/new/eventimg/cleanbeach1.jpg'
import cleanbeach2 from '@/assets/images/new/eventimg/cleanbeach2.jpg'
import foreignoceankids1 from '@/assets/images/new/eventimg/foreignoceankids1.jpg'
import foreignoceankids2 from '@/assets/images/new/eventimg/foreignoceankids2.jpg'
import guardcoral1 from '@/assets/images/new/eventimg/guardcoral1.jpg'
import guardcoral2 from '@/assets/images/new/eventimg/guardcoral2.jpg'
import guardturtles1 from '@/assets/images/new/eventimg/guardturtles1.jpg'
import guardturtles2 from '@/assets/images/new/eventimg/guardturtles2.jpg'
import huadongoceankids1 from '@/assets/images/new/eventimg/huadongoceankids1.jpg'
import huadongoceankids2 from '@/assets/images/new/eventimg/huadongoceankids2.jpg'
import northcoast1 from '@/assets/images/new/eventimg/northcoast1.jpg'
import northcoast2 from '@/assets/images/new/eventimg/northcoast2.jpg'

export const newdata = [
  {
    news_id: 1,
    category_name: '品牌動態',
    publish_date: '2025.08.06',
    title: '我們在找你！海洋主題攝影師招募開跑',
    image_url: photographer1,
    content: `
      <p>你熱愛拍攝，也熱愛海？我們正在尋找具創意與熱情的攝影夥伴，一起紀錄海洋之美！無論是湛藍浪花、岸邊生態，還是保育行動現場，只要你擅長用鏡頭說故事，這就是你的舞台。</p>
      <img src="${photographer1}" alt="" />
      <p>本次招募將徵選多位攝影師，參與我們未來的活動紀錄與品牌視覺企劃。不限經驗，只要你有作品、有熱情，就有機會成為我們的「海洋視角創作者」。快來投稿，讓世界透過你的鏡頭，看見海洋的每一面！</p>
      <img src="${photographer2}" alt="" />
    `,
    status: 1,
  },
  {
    news_id: 2,
    category_name: '優惠情報',
    publish_date: '2025.08.04',
    title: '守護海洋！全館消費滿千享免運優惠',
    image_url: deliveryfee1,
    content: `
      <p>想入手你的海洋好物？現在就是最划算的時刻！即日起，只要單筆消費滿 1,000 元，我們幫你免運送到家，不用額外加價也能安心選購。從機能服飾、永續包款，到可愛實用的療癒小物，海洋風格一次擁有，日常生活更添永續意識。</p>
      <img src="${deliveryfee1}" alt="" />
      <p>每一份訂單，都是對海洋保育的實際支持。當你挑選產品的同時，也參與了我們守護藍色海洋的行動。不論是自用還是送禮，都能買得開心又環保。立即行動，一起用消費為海洋盡一份心，讓改變從日常開始！</p>
      <img src="${deliveryfee2}" alt="" />
    `,
    status: 1,
  },
  {
    news_id: 3,
    category_name: '活動花絮',
    publish_date: '2025.07.20',
    title: '北海岸淨灘破紀錄！一天清出1.2噸垃圾',
    image_url: northcoast1,
    content: `
      <p>超過300位民眾參與週末的北海岸河口淨灘行動，不僅撿拾了超過1.2噸的塑膠瓶、寶特瓶與漁具，也喚起更多人對水域生態的關注。活動由地方環保團體發起，並獲得多所學校及社區居民響應。</p>
      <img src="${northcoast1}" alt="" />
      <p>參與者表示，實際站上海灘、親手清理垃圾，讓他們更深刻感受到人類活動對海岸環境的影響。許多家庭也帶著孩子一同參與，希望從小建立起守護自然的意識。活動當天除了清理垃圾，也進行了簡易分類與紀錄，作為未來環境教育的參考。</p>
      <img src="${northcoast2}" alt="" />
    `,
    status: 0,
  },
  {
    news_id: 4,
    category_name: '品牌動態',
    publish_date: '2025.07.08',
    title: '加入我們，一起為海洋盡一份心－志工招募中！',
    image_url: volunteer1,
    content: `
      <p>我們正在尋找熱愛海洋、有行動力的你，加入我們的志工行列！不論你擅長拍攝紀錄、擁有活動帶領經驗，或只是想為海洋保育盡一份心，都歡迎加入。每場淨灘、講座或推廣行動，因有你參與而更有意義。</p>
      <img src="${volunteer1}" alt="" />
      <p>參與志工不只是一份付出，更是一趟學習與交流的旅程。我們提供完整培訓與志工證明，也將不定期舉辦專屬聚會與進修活動。即日起開放報名，讓我們一起在浪花中播下改變的種子，讓海洋更美好！</p>
      <img src="${volunteer2}" alt="減塑教學" />
    `,
    status: 1,
  },
  {
    news_id: 5,
    category_name: '優惠情報',
    publish_date: '2025.07.01',
    title: '全新會員制度上線，開啟你的海洋專屬回饋！',
    image_url: memberjoin1,
    content: `
      <p>我們推出全新會員制度，邀請你一起打造更友善的海洋日常，只要註冊加入會員，就能獲得一張 首購折價券，無門檻立即折抵，首次選購就能享有專屬優惠，讓你輕鬆擁有心儀的永續商品。</p>
      <img src="${memberjoin1}" alt="企業合作" />
      <p>你所挑選的不只是環保商品，而是對海洋保育的支持與回應。這份選擇，看似微小，卻能在一次次累積中，成為改變世界的力量。立即加入會員，讓我們在生活中攜手實踐永續，用日常行動守護藍色星球。</p>
      <img src="${memberjoin2}" alt="內訓課程花絮" />
    `,
    status: 1,
  },
  {
    news_id: 6,
    category_name: '活動花絮',
    publish_date: '2025.06.25',
    title: '國際海洋生態小小保育家講堂圓滿落幕！',
    image_url: foreignoceankids1,
    content: `
      <p>今年度的國際交流「小小保育家講堂」順利落幕，現場吸引超過 50 小朋友參與，一起走進海洋保育的奇妙世界！活動透過趣味故事講解、實體展示與互動問答，引導孩子們認識海洋生態、了解塑膠污染與海洋廢棄物對生物造成的影響。</p>
      <img src="${foreignoceankids1}" alt="珊瑚復育" />
      <p>透過專業講師生動的解說與實體道具體驗，小朋友們不只學習到海洋知識，更在活動中萌生對環境守護的責任感。我們期望透過這樣的教育推廣，讓下一代從小培養愛護海洋的意識，為藍色星球注入更多希望！</p>
      <img src="${foreignoceankids2}" alt="海域監測" />
    `,
    status: 1,
  },
  {
    news_id: 7,
    category_name: '品牌動態',
    publish_date: '2025.06.10',
    title: '誠徵海洋說書人：海洋教育講師助理！',
    image_url: assistant1,
    content: `
      <p>如果你擁有教育熱忱，關心海洋議題，並善於與孩子或大眾互動，我們正在尋找的就是你！本單位誠徵「海洋教育講師助理」，協助推動校園巡講、親子活動與生態體驗課程，將知識與行動力播撒到每個角落。</p>
      <img src="${assistant1}" alt="珊瑚白化" />
      <p>完整培訓，內容涵蓋海洋生態、減塑行動、漁網回收再利用等主題。無論你來自教育、環保或傳播背景，只要你願意開口、願意分享，歡迎投遞履歷，一起成為改變的起點，為海洋發聲。</p>
      <img src="${assistant2}" alt="監測儀器" />
    `,
    status: 1,
  },
  {
    news_id: 8,
    category_name: '優惠情報',
    publish_date: '2025.06.05',
    title: '世界海洋日限定!6月8日 全館不限金額免運！',
    image_url: oceandate681,
    content: `
      <p>來自多所學校的學生志工，在週末進行了海岸巡守行動，記錄海漂垃圾的分佈情況，並彙整成報告提供給地方政府與研究單位參考。</p>
      <img src="${oceandate681}" alt="學生志工" />
      <p>透過這樣的參與式調查，讓年輕世代更貼近海洋議題，也累積了寶貴的公民科學資料，對未來的政策制定極具參考價值。</p>
      <img src="${oceandate682}" alt="巡守行動" />
    `,
    status: 1,
  },
  {
    news_id: 9,
    category_name: '活動花絮',
    publish_date: '2025.06.01',
    title: '花東海洋保育講堂，陪孩子聽見大海聲音',
    image_url: huadongoceankids1,
    content: `
      <p>花東舉辦的「海洋小小保育家說故事體驗」活動，吸引許多小朋友共襄盛舉。現場透過繪本導讀、角色扮演與海洋遊戲，帶領孩子們走進海底世界，認識海洋生物的日常與面臨的困境。</p>
      <img src="${huadongoceankids1}" alt="講座現場" />
      <p>活動中也實際觸摸海廢實品、學習減塑技巧，讓孩子用自己的方式表達對海洋的關心。家長們表示，這樣寓教於樂的學習方式，不只啟發孩子的想像力，更種下了保育意識的種子。</p>
      <img src="${huadongoceankids2}" alt="講座互動" />
    `,
    status: 1,
  },

  {
    news_id: 10,
    category_name: '優惠情報',
    publish_date: '2025.05.30',
    title: '淨灘行動開跑！參加即可獲得商城折價券',
    image_url: discountcoupon1,
    content: `
      <p>我們誠摯邀請你參與即將展開的海岸淨灘行動，一起還海洋一片乾淨！不論你是首次參與，或是熱血回歸的海洋行動派，只要參與淨灘任務，即可獲得商城 折價券一張，回饋你的每一分行動力，讓海洋生態更美好。</p>
      <img src="${discountcoupon1}" alt="海洋回憶手環" />
      <p>這不僅是一場清潔行動，更是對環境友善價值的實踐。從淨灘到選購永續商品，你的每一步都在為海洋累積改變的力量。現在就報名參加淨灘活動，用行動守護海洋，還能輕鬆享有購物回饋！</p>
      <img src="${discountcoupon2}" alt="永續商品設計" />
    `,
    status: 1,
  },

  {
    news_id: 11,
    category_name: '品牌動態',
    publish_date: '2025.05.28',
    title: '回家吧，小海龜！成功野放 15 隻受傷綠蠵龜',
    image_url: turtleintowild1,
    content: `
      <p>在近期的救援與復健行動中，我們成功協助 15 隻受傷的綠蠵龜重返海洋，牠們原本因誤食塑膠、被漁網纏繞或遭遇外傷而失去行動力，經獸醫團隊與保育志工的細心照護後，終於回到屬於牠們的藍色家園。</p>
      <img src="${turtleintowild1}" alt="海底清網" />
      <p>這次野放行動也邀請在地學校與居民共同見證，讓保育不只是遠方的議題，而是生活中可以參與的實踐。我們將持續透過監測與追蹤，守護每一隻重獲自由的海龜，謝謝你們的支持，讓這場歸途變得可能。</p>
      <img src="${turtleintowild2}" alt="回收漁網" />
    `,
    status: 1,
  },
  {
    news_id: 12,
    category_name: '活動花絮',
    publish_date: '2025.05.20',
    title: '2025 世界環境日｜親子淨灘行動，一起守護海岸線',
    image_url: cleanbeach1,
    content: `
      <p>響應 2025 年世界環境日，最近於 6 月 5 日舉辦一場特別的「親子淨灘活動」，邀請大小朋友一起走進海岸，用行動守護我們所熱愛的自然環境透過闖關遊戲、與實際撿拾教學，讓孩子從小建立環保意識。</p>
      <img src="${cleanbeach1}" alt="海洋論壇" />
      <p>提供專業導覽、淨灘工具與紀念小禮，讓參與者不只收穫知識，更留下與家人共創的美好記憶。每一雙小手的參與，都是為地球帶來的一份希望在環境日這天，替海洋與未來種下改變的種子！</p>
      <img src="${cleanbeach2}" alt="論壇報名資訊" />
    `,
    status: 1,
  },
  {
    news_id: 13,
    category_name: '活動花絮',
    publish_date: '2025.05.08',
    title: '守護海龜專題講座：從沙灘到深海的生命旅程',
    image_url: guardturtles1,
    content: `
      <p>為了讓更多人了解海洋守護者—海龜的生存挑戰與保育行動，我們舉辦了專題講座「守護海龜的日常任務」，邀請專業講師深入分享海龜的習性、遷徙路線與面臨的生態危機。</p>
      <img src="${guardturtles1}" alt="聯名包款" />
      <p>透過生動的影像故事、擬真的模型展示與互動問答，帶領大小朋友一起認識這群古老又神秘的海洋生物。我們不只談海龜，更從日常生活出發，探討如何透過減塑、選擇永續產品等行動為牠們創造更友善的棲地。一起加入守護海洋生態的行列吧！</p>
      <img src="${guardturtles2}" alt="商品細節" />
    `,
    status: 1,
  },
  {
    news_id: 14,
    category_name: '媒體報導',
    publish_date: '2025.04.28',
    title: '潛入蔚藍-南部海岸一日護礁體驗',
    image_url: guardcoral1,
    content: `
      <p>走進陽光灑落的南部海岸，參與一場「潛水＋護礁」的深度體驗，用雙手守護海底的生命奇蹟。這不只是一趟旅程，而是與海洋最真實的連結。每一口氣息、每一次伸手，都是為這片蔚藍盡一份心力。</p>
      <img src="${guardcoral1}" alt="感謝支持" />
      <p>透過專業教練帶領，參與者潛入海中，親身接觸珊瑚礁生態，撿拾人為垃圾、記錄海底變化，為珊瑚打造更乾淨的生長環境。這一天，我們不只是看見海，而是成為海洋的守護者，收穫滿滿的一天。</p>
      <img src="${guardcoral2}" alt="計畫成果" />
    `,
    status: 1,
  },
]
