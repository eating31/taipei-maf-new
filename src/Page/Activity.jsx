import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Context } from '../Contexts/Context';
import test from '../Image/test.jpg'
import test0 from '../Image/test0.png'

import AllActivity from '../Component/Activity/AllActivity';
import SingleActivity from '../Component/Activity/SingleActivity';
import Finder from '../API/Finder';

function Activity() {

  const { setIsLoading, singleActivityId, setSingleActivityId } = useContext(Context)
  const [allActivity, setAllActivity] = useState([])

  // call api
  const tempActivity = [{ "_id": 1, "code": "2024Test", "type": "路跑", "place": "總統府", "createdAt": "2024-01-18", "clicked": 0, "photo": [test, test0], "title": "新聞360》新聞360》新聞360》新聞360》新聞360》中共選後露真面目！專家曝「這理由」台海局勢惡化機率小", "description": "dshjkhjsdgv" },
  { "_id": 2, "code": "2024TestA", "type": "徵人", "place": "總統府", "createdAt": "2024-01-18", "clicked": 0, "photo": [test0], "title": "北京奪走諾魯 駐美代表俞大㵢：只會增加台灣人反感", "description": "〔中央社〕諾魯共和國日前宣布與台灣斷交並與中國建交，駐美代表俞大㵢表示，北京想要將台灣納為己有的目標不會達成，北京透過奪走台灣邦交國的做法，只會讓台灣人民感受更加負面前白宮國安會台灣、中國與蒙古事務主任簡以榮（Ivan Kanapathy）在回覆中央社郵件詢問對諾魯在大選後立即宣布與台灣斷交的看法時表示，樂見美國國務院就諾魯的決定發出聲明，相信這有助於阻止更多案例發生。" },
  { "_id": 3, "code": "2024TestB", "type": "路跑", "place": "信義路", "createdAt": "2024-01-18", "clicked": 0, "photo": [], "title": "繼中國降價後 特斯拉也在歐洲多國下調Model Y價格", "description": "綜合媒體報導，特斯拉週二（16日）晚間調降銷往包括德國、法國、挪威、荷蘭、丹麥等歐洲多國的Model Y汽車的價格。" },
  { "_id": 4, "code": "2023Test", "type": "世壯會", "place": "田徑場", "createdAt": "2024-01-18", "clicked": 0, "photo": [], "title": "城堡風再起！ 嘉義大埔美新增迪士尼風城堡", "description": "〔記者蔡宗勳／嘉義報導〕嘉義縣大林大埔美精密機械園區又被新城堡搶盡鋒頭，不讓歐風佐登妮絲城堡與希臘風蓋婭莊園專美於前，走迪士尼風的「歐樂沃築夢城堡」即將登場，這家巧克力觀光工廠是大林鄉親翰億董事長毛榮海投資打造，預料將再掀起一波城堡旅遊打卡熱潮。" },
  { "_id": 5, "code": "2023TestC", "type": "路跑", "place": "小巨蛋", "createdAt": "2024-01-18", "clicked": 0, "photo": [test0], "title": "在英國Herne Bay海邊吃炸魚薯條能有多浪漫？！在海邊也會遇見你不知道致命的危險！", "description": "英國炸魚是鱈魚，鱈魚在台灣會比較貴一點，但是這個是英國北部蘇格蘭那邊的鱈魚，價格大概839元台幣，兩個人吃很划算。" },
  { "_id": 6, "code": "2024TestT", "type": "路跑", "place": "總統府", "createdAt": "2024-01-18", "clicked": 0, "photo": [test], "title": "台南學測考生不到1萬人 明14:00~16:00開放看考場", "description": "〔記者洪瑞琴／台南報導〕大學入學考試中心學科能力測驗1月20日到22日舉行，台南一考區應考人數7854人、台南二考區則有1254名考生，共9108人。考場分別設在台南一中、台南二中、台南女中、家齊高中、長榮中學、新營高中，明（19）日下午2點到4點開放查看試場。" }]


  const finder = Finder();

  // 靜態網頁測試版
  useEffect(() => {
    if (process.env.REACT_APP_STATIC === 'true') {
      setAllActivity(tempActivity)
      setIsLoading(false)
    } else {
      finder.get('/activity',
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          }
        }
      ).then(data => {
        console.log(data.data)

        // 重新排序 釘選放最前面!
        const newArray = data.data.sort((a, b) => {
          if (a.is_pinned && !b.is_pinned) {
            return -1; // a 在 b 前面
          } else if (!a.is_pinned && b.is_pinned) {
            return 1; // b 在 a 前面
          } else {
            return 0; // 不改變順序
          }
        })
        setAllActivity(newArray)
      }).catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }, [])

  return (
    <div style={{ "minHeight": "75vh" }}>
      {/* 設定最小高度避免資料不足時footer往上跑 */}
      <Container >
        <div className='fs-3 py-4'>最新活動</div>
        <AllActivity allActivity={allActivity} />
        {/* { singleActivityId ===0 ? <AllActivity allActivity={allActivity} /> : <SingleActivity allActivity={allActivity} /> }
   */}
      </Container>

    </div>
  )
}

export default Activity