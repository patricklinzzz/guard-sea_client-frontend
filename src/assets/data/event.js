//列表頁圖片
import clean from '@/assets/images/event/list/clean.jpg'
import seminar from '@/assets/images/event/list/seminar.png'
import live from '@/assets/images/event/list/live.jpg'
import yoga from '@/assets/images/event/list/yoga.jpg'
import vr from '@/assets/images/event/list/vr.jpg'
import night from '@/assets/images/event/list/night.jpg'
import food from '@/assets/images/event/list/food.jpg'
import sound from '@/assets/images/event/list/sound.jpg'
import sand from '@/assets/images/event/list/sand.png'
import discuss from '@/assets/images/event/list/discuss.png'
import port from '@/assets/images/event/list/port.jpg'
import art from '@/assets/images/event/list/art.jpg'
import rubbish from '@/assets/images/event/list/rubbish.jpg'
import ocean from '@/assets/images/event/list/ocean.jpg'
import quizz from '@/assets/images/event/list/quizz.jpg'
import restoration from '@/assets/images/event/list/restoration.jpg'

//詳情頁圖片
import cleanBanner from '@/assets/images/event/detail/cleanBanner.jpg'
import seminarBanner from '@/assets/images/event/detail/seminarBanner.jpg';
import liveBanner from '@/assets/images/event/detail/liveBanner.jpg';
import yogaBanner from '@/assets/images/event/detail/yogaBanner.jpg';
import vrBanner from '@/assets/images/event/detail/vrBanner.jpg';
import nightBanner from '@/assets/images/event/detail/nightBanner.jpg';
import foodBanner from '@/assets/images/event/detail/foodBanner.jpg';
import soundBanner from '@/assets/images/event/detail/soundBanner.jpg';
import sandBanner from '@/assets/images/event/detail/sandBanner.jpg';
import discussBanner from '@/assets/images/event/detail/discussBanner.jpg';
import portBanner from '@/assets/images/event/detail/portBanner.jpg';
import artBanner from '@/assets/images/event/detail/artBanner.jpg';
import rubbishBanner from '@/assets/images/event/detail/rubbishBanner.jpg';
import oceanBanner from '@/assets/images/event/detail/oceanBanner.jpg';
import quizzBanner from '@/assets/images/event/detail/quizzBanner.jpg';
import restorationBanner from '@/assets/images/event/detail/restorationBanner.jpg';

export const events_all = [
    {
        id: 1,
        title: '淨灘活動：用雙手還給海洋純淨',
        img: clean,
        bannerImage: cleanBanner,
        category: '實體行動',
        date: '2025.11.28', //列表
        dateTime: '2025.11.28(六) 09:00 - 12:00', //詳情頁
        location: '福隆海水浴場',
        mapUrl: 'https://maps.app.goo.gl/b29jWkTu8wz2UwXv8',
        status: '報名中',
        speaker: '海洋志工協會',
        introductionHtml: `
            <p>本次淨灘活動旨在提高大眾對海洋塑膠污染的意識，並透過實際行動共同維護海岸線的清潔。我們將提供所有必要的工具和指導，讓參與者能安全有效地進行淨灘工作。</p>
            <p>活動結束後，將有海洋保育專家進行簡短分享，講解淨灘的重要性以及如何從日常生活中減少塑膠使用。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>集合與報到：福隆海水浴場入口</p></li>
                <li><p>淨灘工具發放與安全說明</p></li>
                <li><p>分組進行淨灘</p></li>
                <li><p>垃圾分類與稱重記錄</p></li>
                <li><p>海洋保育講座與心得分享</p></li>
                <li><p>活動結束與歸還工具</p></li>
            </ul>
        `,
        deadline: '2025 年 11 月 23 日',
        registrationSpots: '名額：限100人，額滿為止',
    },
    {
        id: 2,
        title: '教育講座：深度認識海洋',
        img: seminar,
        bannerImage: seminarBanner,
        category: '教育推廣',
        date: '2025.11.20',
        dateTime: '2025.11.20(四) 10:00 - 13:00',
        location: '台北市立圖書館',
        mapUrl: 'https://maps.app.goo.gl/jy9esvEEdabhGKgH6',
        status: '報名中',
        speaker: '陳博士 (海洋生物研究權威)',
        introductionHtml: `
            <p>珊瑚礁被譽為「海洋的熱帶雨林」，是許多海洋生物賴以生存的家園。然而，在氣候變遷和海洋暖化的雙重壓力下，全球珊瑚礁正經歷嚴重的白化和死亡。</p>
            <p>本次「海洋的呼喚」系列講座，特別邀請到海洋生物研究權威陳博士，將深入淺出地講解氣候變遷對珊瑚礁生態的影響，分享最新的研究成果，並探討我們能如何透過行動，為這些美麗而脆弱的海洋寶藏爭取一線生機。無論您是海洋愛好者、學生，或只是對環境議題感到好奇，都歡迎您來一同聆聽，共同為海洋的未來思考。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>珊瑚礁生態系的重要性</p></li>
                <li><p>氣候變遷與海洋暖化對珊瑚的影響</p></li>
                <li><p>珊瑚白化現象與復育挑戰</p></li>
                <li><p>個人與社會在珊瑚保育中的角色</p></li>
            </ul>
        `,
        deadline: '2025 年 11 月 15 日',
        registrationSpots: '名額：限200人，額滿為止',
    },
    { 
        id: 3,
        title: '海底漫遊live：水下攝影即時導覽',
        img: live,
        bannerImage: liveBanner,
        category: '線上參與',
        date: '2025.11.13',
        dateTime: '2025.11.13(四) 20:00 - 21:00',
        location: '線上直播',
        status: '報名中',
        speaker: '水下攝影師 李老師',
        introductionHtml: `
            <p>透過高畫質水下攝影直播，帶您穿越湛藍的海洋深處，一窺色彩斑斕的珊瑚礁與豐富的海洋生物。</p>
            <p>攝影師將即時解說海洋生態，並回答觀眾提問，讓您身臨其境感受海洋的奧秘。</p>
        `,
        contentHtml: `
            <ol>
                <li><p>暖場與設備介紹</p></li>
                <li><p>水下攝影直播與即時導覽</p></li>
                <li><p>海洋生物問答時間</p></li>
                <li><p>結語與下次預告</p></li>
            </ol>
        `,
        deadline: '2025 年 1 月 08 日',
        registrationSpots: '名額：150人，額滿為止 (活動前一周將發送直播連結，時間到點擊連結即可參加)',
    },
    { 
        id: 4, 
        title: '海上瑜珈&日出冥想', 
        img: yoga, 
        bannerImage: yogaBanner,
        category: '實體行動',
        date: '2025.11.08',
        dateTime: '2025.11.08(六) 05:30 - 07:00',
        location: '基隆外木山海岸',
        mapUrl: 'https://maps.app.goo.gl/KMebapXy2kshtfxU6',
        status: '報名中',
        speaker: '瑜珈導師 Sophia',
        introductionHtml: `
            <p>在海風輕拂下，迎接日出，透過瑜珈和冥想與海洋連結。這是一場身心靈的淨化之旅，讓您感受大自然的能量。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>集合地點與時間</p></li>
                <li><p>日出冥想與暖身</p></li>
                <li><p>海上瑜珈課程（適合所有程度）</p></li>
                <li><p>放鬆與分享</p></li>
            </ul>
        `,
        deadline: '2025 年 11 月 03 日',
        registrationSpots: '名額：限30人，額滿為止',
    },
    { 
        id: 5, 
        title: '深海奇遇：3D', 
        img: vr, 
        bannerImage: vrBanner,
        category: '教育推廣',
        date: '2025.11.01',
        dateTime: '2025.11.01(六) 14:00 - 16:00',
        location: '國立海洋科技博物館 IMAX 影廳',
        mapUrl: 'https://maps.app.goo.gl/86V2dUEKCh1zqRsY7',
        status: '報名中',
        speaker: '無',
        introductionHtml: `
            <p>跟隨《深海奇遇》3D電影，沉浸於令人驚嘆的海洋世界。影片採用最先進的3D技術，帶您穿越繽紛的珊瑚礁，邂逅巨型鯨鯊，感受深海的神秘與壯麗。這不僅是一場視覺盛宴，更是一次對海洋生命的深刻探索。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>電影放映：全長90分鐘，無中場休息。</p></li>
                <li><p>觀影須知：影片包含部分快速移動場景，請注意個人身體狀況。</p></li>
                <li><p>入場方式：憑票入場，建議提前30分鐘抵達。</p></li>
                <li><p>散場說明：影片結束後請依序離場，尊重其他觀眾權益。</p></li>
            </ul>
        `,
        deadline: '10 月 25 日',
        registrationSpots: '名額：影廳座位有限，請盡早購票。',
    },
    { 
        id: 6, 
        title: '夜間潮間帶探索活動', 
        img: night, 
        bannerImage: nightBanner,
        category: '實體行動',
        date: '2025.10.30',
        dateTime: '2025.10.30(四) 19:00 - 21:00',
        location: '基隆外木山海岸',
        mapUrl: 'https://maps.app.goo.gl/KMebapXy2kshtfxU6',
        status: '報名中',
        speaker: '潮間帶導覽員 阿明',
        introductionHtml: `
            <p>夜晚的潮間帶有著與白天截然不同的生命力。跟隨專業導覽員，手持手電筒，一同探索夜間潮間帶的神秘生物與現象，感受海洋的另一面。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>夜間潮間帶生態簡介</p></li>
                <li><p>導覽裝備發放（手電筒、觀察箱）</p></li>
                <li><p>潮間帶生物觀察與解說</p></li>
                <li><p>夜間攝影技巧分享</p></li>
            </ul>
        `,
        deadline: '2025 年 10 月 25 日',
        registrationSpots: '名額：限20人，額滿為止',
    },
    { 
        id: 7, 
        title: '餐桌上的海洋：永續漁業探索', 
        img: food,
        bannerImage: foodBanner,
        category: '教育推廣',
        date: '2025.10.21',
        dateTime: '2025.10.21(二) 14:00 - 16:00',
        location: '國立臺灣大學漁業科學所',
        mapUrl: 'https://maps.app.goo.gl/nD25XbvTGqTpzTkM7',
        status: '報名中',
        speaker: '林教授 (永續漁業研究員)',
        introductionHtml: `
            <p>我們的餐桌與海洋健康息息相關。本次講座將深入探討永續漁業的概念與實踐，了解如何選擇對海洋友善的海鮮，以及作為消費者我們能扮演的角色。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>全球漁業資源現況</p></li>
                <li><p>什麼是永續漁業？</p></li>
                <li><p>海鮮選擇指南與認證標章</p></li>
                <li><p>案例分享與問答</p></li>
            </ul>
        `,
        deadline: '2025 年 10 月 16 日',
        registrationSpots: '名額：限80人，額滿為止',
    },
    { 
        id: 8, 
        title: '海的聲音：鯨豚聲音導聽工作坊', 
        img: sound, 
        bannerImage: soundBanner,
        category: '線上參與',
        date: '2025.10.17',
        dateTime: '2025.10.17(五) 19:30 - 21:00',
        location: '線上直播',
        status: '報名中',
        speaker: '聲音生態學家 張博士',
        introductionHtml: `
            <p>鯨豚是海洋中的歌者。本工作坊將引導您聆聽來自深海的聲音，學習如何辨識不同鯨豚的鳴叫，並了解聲音在海洋生態中的重要性與面臨的威脅。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>海洋聲音的基礎知識</p></li>
                <li><p>聆聽不同鯨豚種類的聲音樣本</p></li>
                <li><p>海洋噪音污染對鯨豚的影響</p></li>
                <li><p>Q&A 與交流</p></li>
            </ul>
        `,
        deadline: '2025 年 10 月 12 日',
        registrationSpots: '名額：150人，額滿為止 (活動前一周將發送直播連結，時間到點擊連結即可參加)',
    },
    { 
        id: 9, 
        title: '微塑膠在哪裡？沙灘採樣與顯微觀察體驗', 
        img: sand, 
        bannerImage: sandBanner,
        category: '實體行動',
        date: '2025.10.11',
        dateTime: '2025.10.11(六) 10:00 - 14:00',
        location: '金山沙灘',
        mapUrl: 'https://maps.app.goo.gl/EUwDr8dDJCheF1hJA',
        status: '報名中',
        speaker: '環境教育工作者 謝老師',
        introductionHtml: `
            <p>微塑膠是看不見的環境殺手。透過沙灘採樣和顯微觀察，親手發現微塑膠的存在，了解它們如何影響海洋生態，並學習如何在生活中減少塑膠足跡。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>微塑膠簡介與危害</p></li>
                <li><p>沙灘採樣實作</p></li>
                <li><p>顯微鏡觀察微塑膠</p></li>
                <li><p>討論與分享會</p></li>
            </ul>
        `,
        deadline: '2025 年 10 月 06 日',
        registrationSpots: '名額：限25人，額滿為止',
    },
    { 
        id: 10, 
        title: '打造你的海洋行動提案', 
        img: discuss, 
        bannerImage: discussBanner,
        category: '實體行動',
        date: '2025.10.01',
        dateTime: '2025.10.01(三) 13:00 - 17:00',
        location: '臺北創新中心',
        mapUrl: 'https://maps.app.goo.gl/ngXLbauoEgNWgtBp7',
        status: '報名中',
        speaker: '社會企業顧問 李經理',
        introductionHtml: `
            <p>你是否對海洋保育充滿熱情，卻不知道如何開始？本工作坊將引導您發想、規劃並實踐屬於您的海洋行動提案，從零到一打造改變的力量。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>海洋議題分析與案例分享</p></li>
                <li><p>行動提案發想與工具介紹</p></li>
                <li><p>提案撰寫與分組討論</p></li>
                <li><p>成果發表與回饋</p></li>
            </ul>
        `,
        deadline: '2025 年 9 月 25 日',
        registrationSpots: '名額：限40人，額滿為止',
    },
    { 
        id: 11, 
        title: '環保漁港導覽與清港行動', 
        img: port, 
        bannerImage: portBanner,
        category: '實體行動',
        date: '2025.09.21',
        dateTime: '2025.09.21(日) 09:00 - 16:00',
        location: '蘇澳漁港',
        mapUrl: 'https://maps.app.goo.gl/D7i4Wg8rGtUNaHPA9',
        status: '報名中',
        speaker: '漁業署代表',
        introductionHtml: `
            <p>深入漁港，了解漁業運作的同時，也一同參與港區的清潔行動。透過導覽與實作，認識海洋垃圾對漁業的影響，並學習如何共同維護海洋環境。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>漁港文化與漁業現況導覽</p></li>
                <li><p>海洋垃圾種類與來源介紹</p></li>
                <li><p>清港工具發放與安全說明</p></li>
                <li><p>港區清潔行動</p></li>
                <li><p>漁民與志工交流會</p></li>
            </ul>
        `,
        deadline: '2025 年 09 月 16 日',
        registrationSpots: '名額：限50人，額滿為止',
    },
    { 
        id: 12, 
        title: '海洋藝術創作工作坊', 
        img: art, 
        bannerImage: artBanner,
        category: '教育推廣',
        date: '2025.09.01',
        dateTime: '2025.09.01(一) 13:00 - 17:00',
        location: '基隆海洋廣場',
        mapUrl: 'https://maps.app.goo.gl/4Kbr5adE5L6xNGqY9',
        status: '報名中',
        speaker: '藝術家 小海',
        introductionHtml: `
            <p>以海洋為靈感，利用回收材料或天然素材，創作出獨一無二的海洋藝術品。在創作中感受海洋之美，並傳達海洋保育的訊息。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>海洋藝術風格介紹</p></li>
                <li><p>材料選擇與工具使用</p></li>
                <li><p>藝術創作實作指導</p></li>
                <li><p>作品分享與交流</p></li>
            </ul>
        `,
        deadline: '2025 年 08 月 26 日',
        registrationSpots: '名額：限30人，額滿為止',
    },
    { 
        id: 13, 
        title: '無塑海灘：社區淨灘與廢棄物記錄工作坊', 
        img: rubbish, 
        bannerImage: rubbishBanner,
        category: '實體行動',
        date: '2025.08.13',
        dateTime: '2025.08.13(日) 09:00 - 13:00',
        location: '新北市中角灣',
        mapUrl: 'https://maps.app.goo.gl/sUmi1t7wTduFdHjH9',
        status: '報名中',
        speaker: '環保志工隊長 阿力',
        introductionHtml: `
            <p>不僅是淨灘，更是透過廢棄物記錄，了解塑膠垃圾的來源與種類，從數據中發現問題，並倡議社區共同建立無塑生活模式。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>淨灘行動與廢棄物分類</p></li>
                <li><p>廢棄物數據記錄與分析</p></li>
                <li><p>無塑生活推廣與分享</p></li>
                <li><p>社區參與討論</p></li>
            </ul>
        `,
        deadline: '2025 年 08 月 08 日',
        registrationSpots: '名額：限60人，額滿為止',
    },
    { 
        id: 14, 
        title: '線上海洋講座：解謎深海', 
        img: ocean, 
        category: '線上參與',
        bannerImage: oceanBanner,
        date: '2025.08.07',
        dateTime: '2025.08.07(一) 20:00 - 21:30',
        location: '線上參與',
        status: '報名中',
        speaker: '海洋地質學家 楊教授',
        introductionHtml: `
            <p>深海是地球上最神秘的區域，充滿了未知的生命與奇特的地貌。本講座將帶您深入探索深海的奧秘，揭開那些超乎想像的自然奇觀。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>深海環境的特殊性</p></li>
                <li><p>深海生物的生存策略</p></li>
                <li><p>深海探測技術與發現</p></li>
                <li><p>深海資源與保育挑戰</p></li>
            </ul>
        `,
        deadline: '2025 年 08 月 02 日',
        registrationSpots: '名額：150人，額滿為止 (活動前一周將發送直播連結，時間到點擊連結即可參加)',
    },
    { 
        id: 15, 
        title: '海洋知識線上問答賽', 
        img: quizz, 
        bannerImage: quizzBanner,
        category: '線上參與',
        date: '2025.07.26',
        dateTime: '2025.07.26(日) 14:00 - 15:00',
        location: '線上直播',
        status: '已結束',
        speaker: '小魚',
        introductionHtml: `
            <p>想測試你對海洋的了解嗎？快來參加線上問答賽，挑戰你的海洋知識！贏家還有機會獲得神秘好禮喔！</p>
        `,
        contentHtml: `
            <ul>
                <li><p> Kahoot 平台使用說明</p></li>
                <li><p>海洋知識問答環節（多題型）</p></li>
                <li><p>即時排名與頒獎</p></li>
            </ul>
        `,
        deadline: '2025 年 07 月 21 日',
        registrationSpots: '名額：20人，已結束',
    },
    { 
        id: 16, 
        title: '珊瑚復育志工體驗營', 
        img: restoration, 
        bannerImage: restorationBanner,
        category: '實體行動',
        date: '2025.07.12',
        dateTime: '2025.07.12(六) 08:30 - 17:00',
        location: '小琉球潛水基地',
        mapUrl: 'https://maps.app.goo.gl/cKVWqqB9Lq46KEc76',
        status: '已結束',
        speaker: '珊瑚復育團隊',
        introductionHtml: `
            <p>親身參與珊瑚復育工作，學習珊瑚的生長、移植與維護技術。這不僅是一場體驗，更是為海洋生態盡一份心力的機會。</p>
        `,
        contentHtml: `
            <ul>
                <li><p>珊瑚礁生態與復育簡介</p></li>
                <li><p>潛水裝備與安全說明</p></li>
                <li><p>水下珊瑚苗圃清潔與維護</p></li>
                <li><p>珊瑚移植示範與實作</p></li>
                <li><p>心得分享與交流</p></li>
            </ul>
        `,
        deadline: '2025 年 07 月 07 日',
        registrationSpots: '名額：限15人，已結束',
    }
]