const fs = require('fs');

const data = JSON.parse(fs.readFileSync('words_data.json', 'utf8'));
const startersJson = JSON.stringify(data.starters);
const wordsJoined = data.wordsJoined;

// 주요 사자성어 데이터 (단어 및 대표 의미)
const IDIOM_LIST = [
  ['가인박명', '아름다운 사람은 대개 운명이 기박함'],
  ['각골난망', '은혜를 뼈에 새겨 잊지 아니함'],
  ['감언이설', '남의 비위에 맞도록 꾸며 대는 달콤한 말'],
  ['고진감래', '고생 끝에 즐거움이 옴'],
  ['골육상잔', '가까운 혈육끼리 서로 해치고 싸움'],
  ['공명정대', '마음이 공평하고 행동이 떳떳함'],
  ['구사일생', '죽을 고비에서 겨우 살아남'],
  ['군계일학', '평범한 사람들 가운데 뛰어난 한 사람'],
  ['권선징악', '착한 일을 권하고 악한 일을 징벌함'],
  ['금상첨화', '좋은 일 위에 더 좋은 일이 더해짐'],
  ['금의환향', '성공하여 고향으로 자랑스럽게 돌아옴'],
  ['난형난제', '누구를 형이라 아우라 하기 어려울 정도로 우열을 가리기 힘듦'],
  ['남녀노소', '남자와 여자, 늙은이와 젊은이 모두'],
  ['내유외강', '속은 부드럽고 겉은 굳셈'],
  ['노심초사', '몹시 마음을 쓰며 애를 태움'],
  ['다다익선', '많으면 많을수록 더욱 좋음'],
  ['대기만성', '큰 그릇은 늦게 이루어지듯 크게 될 사람은 늦게 성공함'],
  ['동고동락', '괴로움과 즐거움을 함께함'],
  ['동문서답', '묻는 말에 전혀 엉뚱한 대답을 함'],
  ['두문불출', '집에만 있고 바깥출입을 하지 아니함'],
  ['마이동풍', '남의 말을 귀담아듣지 않고 흘려버림'],
  ['막역지우', '허물이 없이 아주 친한 친구'],
  ['명실상부', '이름과 실상이 서로 꼭 맞음'],
  ['무용지물', '아무짝에도 쓸모없는 물건이나 사람'],
  ['문전성시', '찾아오는 사람이 많아 집 앞이 시장처럼 붐빔'],
  ['배은망덕', '은혜를 잊고 도리어 배신함'],
  ['백년해로', '부부가 되어 평생을 함께 늙음'],
  ['백발백중', '계획한 일이 다 들어맞음'],
  ['백전백승', '싸울 때마다 언제나 이김'],
  ['부창부수', '남편이 부르고 아내가 따름, 부부 화합'],
  ['사필귀정', '모든 일은 반드시 바른길로 돌아감'],
  ['살신성인', '목숨을 바쳐 어진 뜻을 이룸'],
  ['삼고초려', '인재를 얻기 위해 정성을 다해 찾아감'],
  ['새옹지마', '인생의 길흉화복은 예측하기 어려움'],
  ['설상가상', '어려운 일에 또 어려운 일이 겹침'],
  ['수수방관', '팔짱을 끼고 바라만 봄'],
  ['순망치한', '입술이 없으면 이가 시리듯 밀접한 관계'],
  ['심기일전', '마음가짐을 바로잡고 새롭게 출발함'],
  ['십시일반', '여럿이 힘을 합쳐 한 사람을 도움'],
  ['아전인수', '자기에게 유리하게만 행동함'],
  ['안하무인', '방자하여 사람을 깔봄'],
  ['약육강식', '약한 자가 강한 자에게 먹힘'],
  ['양두구육', '겉과 속이 서로 다름'],
  ['어부지리', '둘이 다투는 틈에 제삼자가 이득을 봄'],
  ['역지사지', '처지를 바꾸어 다른 사람의 입장에서 생각함'],
  ['온고지신', '옛것을 익혀 새로운 지식을 앎'],
  ['용두사미', '시작은 거창하나 끝이 흐지부지함'],
  ['우공이산', '끈기 있게 노력하면 결국 큰일을 이룸'],
  ['우유부단', '어물어물 결단을 내리지 못함'],
  ['유비무환', '준비가 있으면 걱정이 없음'],
  ['이심전심', '말하지 않아도 마음이 통함'],
  ['일거양득', '한 가지 일로 두 가지 이득을 얻음'],
  ['일석이조', '돌 하나로 두 마리 새를 잡음, 일거양득'],
  ['일취월장', '날마다 눈부시게 발전함'],
  ['자가당착', '자신의 언행이 앞뒤가 맞지 않고 모순됨'],
  ['자수성가', '스스로 힘으로 큰일을 이룸'],
  ['작심삼일', '결심한 마음이 사흘을 가지 못함'],
  ['전화위복', '재앙이 바뀌어 오히려 복이 됨'],
  ['조삼모사', '눈앞의 차이에만 현혹되어 결과가 같음을 모름'],
  ['주경야독', '낮에는 일하고 밤에는 글을 읽음'],
  ['죽마고우', '어릴 때부터 같이 놀던 친한 벗'],
  ['중구난방', '여러 사람의 말이 제각각 분분함'],
  ['진퇴양난', '나아갈 수도 물러설 수도 없는 난처한 처지'],
  ['천생연분', '하늘이 맺어 준 깊은 인연'],
  ['청출어람', '제자가 스승보다 더 뛰어남'],
  ['초지일관', '처음 품은 뜻을 끝까지 밀고 나감'],
  ['칠전팔기', '일곱 번 넘어져도 여덟 번 일어남'],
  ['타산지석', '남의 잘못도 교훈으로 삼음'],
  ['토사구팽', '쓸모가 없어지면 가차 없이 버림'],
  ['파죽지세', '거침없이 맹렬하게 내달림'],
  ['풍전등화', '바람 앞의 등불처럼 매우 위태로운 처지'],
  ['학수고대', '학처럼 목을 길게 빼고 간절히 기다림'],
  ['호형호제', '친형제처럼 사이좋게 지냄'],
  ['화룡점정', '가장 중요한 마지막 마무리를 함']
];

// 다빈도 명사 대표 뜻 사전 (샘플 및 대표 명사)
const SAMPLE_DEFINITIONS = [
  ['사과', '사과나무의 열매. 새콤달콤한 맛이 나는 과일.'],
  ['바나나', '열대 식물의 열매. 껍질이 노랗고 부드러운 과일.'],
  ['기차', '레일 위를 달리는 승객과 화물 수송용 차량.'],
  ['기러기', '겨울에 날아오는 철새의 일종.'],
  ['토마토', '붉은색의 영양가 높은 채소 열매.'],
  ['스위스', '알프스산맥에 위치한 유럽의 중립국.'],
  ['오디오', '소리를 재생하거나 녹음하는 음향 기기.'],
  ['하늘', '지표면 위로 펼쳐진 넓고 푸른 공간.'],
  ['바다', '지구 표면의 대부분을 덮고 있는 거대한 짠물.'],
  ['구름', '공기 중의 수증기가 엉겨 하늘에 떠 있는 것.'],
  ['친구', '오래 두고 가깝게 사귄 벗.'],
  ['학교', '학생을 모아 일정한 교육을 실시하는 교육 기관.'],
  ['학생', '학교에서 학문을 배우는 사람.'],
  ['선생님', '학생을 가르치고 인도하는 사람.'],
  ['피아노', '건반을 눌러 해머로 줄을 쳐 소리를 내는 악기.'],
  ['음악', '소리를 재료로 하여 감정을 표현하는 시간 예술.'],
  ['컴퓨터', '데이터를 입력받아 처리하는 전자 계산 장치.'],
  ['비행기', '날개와 엔진을 갖추고 공중을 날아다니는 항공기.'],
  ['자동차', '원동기를 장치하여 바퀴를 굴려 가는 차량.'],
  ['호랑이', '고양잇과의 사나운 맹수.'],
  ['사자', '동물의 왕이라 불리는 고양잇과 맹수.'],
  ['강아지', '개의 새끼 또는 귀엽게 이르는 말.'],
  ['고양이', '사람과 친숙한 털이 부드러운 애완동물.'],
  ['토끼', '귀가 길고 꼬리가 짧은 귀여운 초식동물.'],
  ['사탕', '설탕을 주원료로 하여 굳혀 만든 달콤한 과자.'],
  ['과자', '곡물 가루를 반죽하여 기름에 튀기거나 구운 간식.'],
  ['자전거', '두 바퀴를 발로 페달을 밟아 움직이는 탈것.'],
  ['거울', '빛을 반사하여 사물의 모습을 비추어 보는 도구.'],
  ['울타리', '풀이나 나무, 철조망 등으로 둘러막은 경계.'],
  ['리본', '선물이나 머리를 장식하는 비단 띠.'],
  ['본관', '성씨가 처음 시작된 고향 또는 중심 건물.'],
  ['관람', '영화나 연극, 미술품 등을 구경함.'],
  ['람보', '용감하고 강인한 전사를 비유적으로 이르는 말.'],
  ['보물', '매우 귀중하고 가치 있는 물건.'],
  ['물고기', '물속에서 아가미로 숨을 쉬며 사는 척추동물.'],
  ['우주', '모든 물질과 공간, 천체를 포함하는 총체.'],
  ['지구', '인류가 살고 있는 태양계의 행성.'],
  ['사랑', '어떤 대상을 몹시 아끼고 귀중히 여기는 마음.'],
  ['행복', '생활에서 기쁨과 만족을 느껴 흐뭇한 상태.'],
  ['희망', '앞일에 대하여 거는 기대와 바람.']
];

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>끝말잇기 배틀 (HP 서바이벌 1:1~6인)</title>
  <style>
    :root {
      --p1-color: #2563EB; --p1-light: #EFF6FF; --p1-border: #93C5FD;
      --p2-color: #E11D48; --p2-light: #FFF1F2; --p2-border: #FDA4AF;
      --p3-color: #059669; --p3-light: #ECFDF5; --p3-border: #6EE7B7;
      --p4-color: #D97706; --p4-light: #FFFBEB; --p4-border: #FCD34D;
      --p5-color: #7C3AED; --p5-light: #F5F3FF; --p5-border: #C4B5FD;
      --p6-color: #0891B2; --p6-light: #ECFEFF; --p6-border: #67E8F9;

      --bg-gradient: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
      --app-bg: #FFFFFF;
      --card-bg: rgba(255, 255, 255, 0.95);
      --text-main: #0F172A;
      --text-muted: #64748B;
      --radius-sm: 10px;
      --radius-md: 16px;
      --radius-lg: 24px;
      --radius-full: 9999px;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
      background: var(--bg-gradient);
      color: var(--text-main);
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      min-height: 100dvh;
      overflow: hidden;
    }

    #app-container {
      width: 100%;
      max-width: 450px;
      height: 100vh;
      height: 100dvh;
      background: var(--app-bg);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      position: relative;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    @media (min-width: 480px) {
      #app-container {
        height: 94vh;
        max-height: 870px;
        border-radius: 32px;
        border: 4px solid #334155;
      }
    }

    .screen {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      background: #F8FAFC;
      transition: opacity 0.25s ease, transform 0.25s ease;
    }

    .screen.hidden {
      opacity: 0;
      pointer-events: none;
      transform: scale(0.98);
      display: none !important;
    }

    /* 1. 시작 설정 화면 */
    #setup-screen {
      overflow-y: auto;
      padding: 20px 16px 32px 16px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      background: linear-gradient(180deg, #F8FAFC 0%, #EEF2F6 100%);
    }

    .setup-header {
      text-align: center;
      padding: 4px 0;
    }

    .game-logo {
      font-size: 2.5rem;
      margin-bottom: 2px;
      animation: float 2.5s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    .setup-title {
      font-size: 1.6rem;
      font-weight: 900;
      color: #0F172A;
      letter-spacing: -0.5px;
    }

    .setup-desc {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 3px;
      font-weight: 700;
    }

    .setup-card {
      background: var(--card-bg);
      border-radius: var(--radius-md);
      padding: 14px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      border: 1px solid #E2E8F0;
    }

    .card-label {
      font-size: 0.8rem;
      font-weight: 800;
      color: #475569;
      text-transform: uppercase;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .chip-group {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding-bottom: 2px;
    }

    .chip-btn {
      flex: 1;
      min-width: 44px;
      height: 36px;
      border-radius: var(--radius-sm);
      border: 1.5px solid #E2E8F0;
      background: #FFFFFF;
      font-size: 0.82rem;
      font-weight: 800;
      color: #475569;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }

    .chip-btn.active {
      background: #0F172A;
      color: #FFFFFF;
      border-color: #0F172A;
    }

    .custom-input-box {
      width: 58px;
      height: 36px;
      border-radius: var(--radius-sm);
      border: 1.5px solid #CBD5E1;
      text-align: center;
      font-size: 0.85rem;
      font-weight: 800;
      outline: none;
      user-select: text;
    }

    #players-setup-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .player-setup-box {
      border-radius: var(--radius-sm);
      padding: 10px;
      border: 2px solid transparent;
      transition: all 0.2s;
    }

    .player-input-row {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }

    .current-avatar-preview {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.6rem;
      box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      flex-shrink: 0;
    }

    .nickname-input {
      flex: 1;
      height: 38px;
      border-radius: var(--radius-sm);
      border: 1.5px solid #CBD5E1;
      padding: 0 12px;
      font-size: 0.92rem;
      font-weight: 700;
      outline: none;
      background: #FFFFFF;
      color: var(--text-main);
      user-select: text;
    }

    .avatar-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 5px;
      padding-top: 2px;
    }

    .avatar-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.15s;
    }

    .avatar-btn.selected {
      border: 2px solid #0F172A;
      background: #FEF08A;
      transform: scale(1.1);
    }

    .start-btn {
      width: 100%;
      height: 52px;
      border-radius: var(--radius-md);
      background: linear-gradient(135deg, #10B981 0%, #059669 100%);
      color: #FFFFFF;
      font-size: 1.15rem;
      font-weight: 900;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 4px;
      transition: transform 0.15s, box-shadow 0.15s;
    }

    .start-btn:active {
      transform: scale(0.98);
      box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
    }

    /* 2. 게임 메인 화면 (상단 완전 고정 레이아웃) */
    #game-screen {
      background: #F8FAFC;
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    /* 상단 고정 헤더 바 */
    .game-top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      background: #FFFFFF;
      border-bottom: 1px solid #F1F5F9;
      flex-shrink: 0;
      z-index: 50;
    }

    .top-round-badge {
      font-size: 0.8rem;
      font-weight: 800;
      color: #0F172A;
      background: #F1F5F9;
      padding: 4px 10px;
      border-radius: var(--radius-full);
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .icon-btn {
      background: none;
      border: none;
      font-size: 1.25rem;
      padding: 6px;
      cursor: pointer;
      border-radius: 50%;
      color: #64748B;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
    }

    /* 상단 고정 플레이어 스코어보드 (스크롤 절대 안 밀림!) */
    .scoreboard-wrapper {
      background: #FFFFFF;
      padding: 6px 10px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      position: sticky;
      top: 0;
      z-index: 45;
      flex-shrink: 0;
      overflow-x: auto;
      border-bottom: 1px solid #E2E8F0;
    }

    .scoreboard {
      display: flex;
      gap: 6px;
      min-width: 100%;
    }

    .player-card {
      flex: 1;
      min-width: 76px;
      max-width: 135px;
      border-radius: var(--radius-sm);
      padding: 6px 4px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      position: relative;
      transition: all 0.25s ease;
      border: 2px solid transparent;
      opacity: 0.65;
      transform: scale(0.96);
      background: #F1F5F9;
    }

    .player-card.active-turn {
      opacity: 1;
      transform: scale(1.02);
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
    }

    .player-card.dead {
      opacity: 0.35 !important;
      filter: grayscale(1);
      transform: scale(0.92) !important;
      border-color: #94A3B8 !important;
      background: #E2E8F0 !important;
    }

    .turn-badge {
      position: absolute;
      top: -7px;
      font-size: 0.58rem;
      font-weight: 900;
      padding: 1px 6px;
      border-radius: var(--radius-full);
      color: #FFFFFF;
      letter-spacing: 0.3px;
      display: none;
      animation: bounce 1s infinite;
      white-space: nowrap;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    .player-card.active-turn .turn-badge {
      display: block;
    }

    .card-avatar {
      font-size: 1.55rem;
      line-height: 1.1;
      margin-bottom: 2px;
    }

    .card-nickname {
      font-size: 0.75rem;
      font-weight: 800;
      color: #0F172A;
      max-width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hp-gauge-container {
      width: 90%;
      height: 7px;
      background: #CBD5E1;
      border-radius: 999px;
      overflow: hidden;
      margin: 4px 0 2px 0;
      border: 1px solid rgba(0,0,0,0.08);
    }

    .hp-gauge-fill {
      height: 100%;
      width: 100%;
      background: #10B981;
      transition: width 0.3s ease, background 0.3s;
    }

    .hp-text-label {
      font-size: 0.65rem;
      font-weight: 900;
      color: #0F172A;
      line-height: 1;
    }

    .card-stats-row {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 3px;
      font-size: 0.62rem;
      font-weight: 800;
    }

    .score-pill {
      background: #FEF08A;
      color: #854D0E;
      padding: 1px 4px;
      border-radius: var(--radius-full);
    }

    .chance-pill {
      background: #E0E7FF;
      color: #3730A3;
      padding: 1px 4px;
      border-radius: var(--radius-full);
    }

    .floating-damage {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.25rem;
      font-weight: 900;
      color: #EF4444;
      text-shadow: 0 2px 6px rgba(0,0,0,0.3);
      pointer-events: none;
      z-index: 50;
      animation: floatDamage 0.9s ease-out forwards;
      white-space: nowrap;
    }

    @keyframes floatDamage {
      0% { opacity: 1; transform: translate(-50%, 0) scale(1.2); }
      50% { opacity: 1; transform: translate(-50%, -20px) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -36px) scale(0.8); }
    }

    .timer-container {
      width: 100%;
      height: 5px;
      background: #E2E8F0;
      position: relative;
      overflow: hidden;
      flex-shrink: 0;
      z-index: 40;
    }

    .timer-bar {
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, #10B981, #F59E0B);
      transition: width 0.1s linear, background 0.3s;
    }

    .timer-bar.danger {
      background: #EF4444;
      animation: pulse-danger 0.5s infinite alternate;
    }

    @keyframes pulse-danger {
      0% { opacity: 0.7; }
      100% { opacity: 1; }
    }

    /* 단어 릴레이 대화 뷰 (오직 이 영역만 스크롤!) */
    .word-log-container {
      flex: 1;
      overflow-y: auto;
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      scroll-behavior: smooth;
    }

    .word-item {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      max-width: 90%;
      animation: fadeInUp 0.2s ease-out;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .word-item.system {
      align-self: center;
      max-width: 95%;
      text-align: center;
      margin: 2px 0 4px 0;
    }

    .word-item-avatar {
      font-size: 1.3rem;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #FFFFFF;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .word-bubble {
      padding: 7px 12px;
      border-radius: var(--radius-md);
      position: relative;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
      background: #FFFFFF;
    }

    .word-item.system .word-bubble {
      background: #FEF3C7;
      border: 1px solid #FDE68A;
      color: #92400E;
      font-size: 0.82rem;
      font-weight: 700;
      border-radius: var(--radius-full);
      padding: 5px 14px;
    }

    .bubble-author {
      font-size: 0.65rem;
      font-weight: 800;
      color: var(--text-muted);
      margin-bottom: 1px;
    }

    .bubble-text {
      font-size: 1.15rem;
      font-weight: 900;
      letter-spacing: 0.5px;
    }

    .bubble-tail-char {
      display: inline-block;
      padding: 1px 4px;
      border-radius: 4px;
      background: rgba(0,0,0,0.06);
      margin-left: 2px;
      font-size: 1.15rem;
      font-weight: 900;
    }

    /* 단어 대표 뜻 풀이 표시 */
    .bubble-meaning {
      font-size: 0.72rem;
      font-weight: 600;
      color: #475569;
      background: rgba(0, 0, 0, 0.04);
      padding: 4px 8px;
      border-radius: 6px;
      margin-top: 4px;
      line-height: 1.35;
      word-break: keep-all;
    }

    .duum-badge {
      display: inline-block;
      font-size: 0.65rem;
      font-weight: 800;
      background: #DBEAFE;
      color: #1E40AF;
      padding: 1px 6px;
      border-radius: var(--radius-full);
      margin-top: 3px;
    }

    .combo-badge {
      display: inline-block;
      font-size: 0.68rem;
      font-weight: 900;
      background: #FEF08A;
      color: #854D0E;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      margin-top: 3px;
      border: 1px solid #FACC15;
      animation: pulse-combo 0.6s infinite alternate;
    }

    .idiom-badge {
      display: inline-block;
      font-size: 0.68rem;
      font-weight: 900;
      background: #E0E7FF;
      color: #3730A3;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      margin-top: 3px;
      border: 1px solid #C7D2FE;
    }

    @keyframes pulse-combo {
      0% { transform: scale(1); }
      100% { transform: scale(1.06); }
    }

    .killer-badge {
      display: inline-block;
      font-size: 0.68rem;
      font-weight: 900;
      background: #FEE2E2;
      color: #DC2626;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      margin-top: 3px;
      animation: pulse-danger 0.6s infinite alternate;
    }

    /* 현재 이어갈 글자 전광판 (상단 고정) */
    .target-char-banner {
      background: #FFFFFF;
      padding: 8px 12px;
      border-top: 1px solid #E2E8F0;
      border-bottom: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      z-index: 35;
    }

    .target-char-left {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .target-char-badge {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: #0F172A;
      color: #FEF08A;
      font-size: 1.45rem;
      font-weight: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      animation: pulse-badge 1.8s infinite;
    }

    @keyframes pulse-badge {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.06); }
    }

    .target-char-info {
      display: flex;
      flex-direction: column;
    }

    .target-char-label {
      font-size: 0.7rem;
      font-weight: 700;
      color: var(--text-muted);
    }

    .target-duum-hint {
      font-size: 0.74rem;
      font-weight: 800;
      color: #2563EB;
      margin-top: 1px;
    }

    .timer-countdown-text {
      font-size: 1.05rem;
      font-weight: 900;
      color: #0F172A;
      background: #F1F5F9;
      padding: 4px 10px;
      border-radius: var(--radius-sm);
    }

    .timer-countdown-text.danger {
      color: #EF4444;
      background: #FEE2E2;
    }

    /* 하단 입력 독 */
    .input-dock {
      padding: 8px 12px 12px 12px;
      background: #FFFFFF;
      display: flex;
      flex-direction: column;
      gap: 8px;
      box-shadow: 0 -4px 12px rgba(0,0,0,0.03);
      flex-shrink: 0;
      z-index: 40;
    }

    .dock-actions-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }

    .hint-btn {
      height: 36px;
      padding: 0 12px;
      border-radius: var(--radius-full);
      background: #FEF3C7;
      border: 1px solid #FCD34D;
      color: #92400E;
      font-size: 0.8rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .hint-btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .hint-btn:active:not(:disabled) {
      transform: scale(0.96);
    }

    .reset-word-btn {
      height: 36px;
      padding: 0 12px;
      border-radius: var(--radius-full);
      background: #FEE2E2;
      border: 1px solid #FCA5A5;
      color: #B91C1C;
      font-size: 0.78rem;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      transition: all 0.15s;
    }

    .reset-word-btn:active {
      transform: scale(0.96);
    }

    .surrender-btn {
      height: 36px;
      padding: 0 8px;
      border-radius: var(--radius-full);
      background: #F1F5F9;
      border: 1px solid #CBD5E1;
      color: #64748B;
      font-size: 0.76rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 2px;
      cursor: pointer;
    }

    .input-form-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .word-input {
      flex: 1;
      height: 48px;
      border-radius: var(--radius-md);
      border: 2px solid #E2E8F0;
      padding: 0 14px;
      font-size: 1.15rem;
      font-weight: 800;
      outline: none;
      background: #F8FAFC;
      color: #0F172A;
      user-select: text;
      transition: border-color 0.15s;
    }

    .word-input:focus {
      border-color: #2563EB;
      background: #FFFFFF;
    }

    .submit-btn {
      width: 76px;
      height: 48px;
      border-radius: var(--radius-md);
      background: #0F172A;
      color: #FFFFFF;
      font-size: 1.05rem;
      font-weight: 900;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.1s, background 0.15s;
      flex-shrink: 0;
    }

    .submit-btn:active {
      transform: scale(0.95);
      background: #1E293B;
    }

    /* 패스앤플레이 전환 오버레이 */
    #pass-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.94);
      backdrop-filter: blur(8px);
      z-index: 100;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      text-align: center;
      color: #FFFFFF;
      cursor: pointer;
      animation: fadeIn 0.2s ease-out;
    }

    #pass-overlay.hidden {
      display: none !important;
    }

    .pass-phone-icon {
      font-size: 4rem;
      margin-bottom: 12px;
      animation: phone-wiggle 1s ease-in-out infinite;
    }

    @keyframes phone-wiggle {
      0%, 100% { transform: rotate(0deg) scale(1); }
      25% { transform: rotate(-14deg) scale(1.06); }
      75% { transform: rotate(14deg) scale(1.06); }
    }

    .pass-title {
      font-size: 1.6rem;
      font-weight: 900;
      margin-bottom: 6px;
      letter-spacing: -0.5px;
    }

    .pass-next-player {
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(255, 255, 255, 0.15);
      padding: 10px 22px;
      border-radius: var(--radius-full);
      margin: 16px 0;
      border: 1px solid rgba(255,255,255,0.25);
    }

    .pass-avatar {
      font-size: 2.3rem;
    }

    .pass-nickname {
      font-size: 1.35rem;
      font-weight: 900;
    }

    .pass-target-char {
      font-size: 1.05rem;
      color: #CBD5E1;
      margin-bottom: 22px;
    }

    .pass-target-char strong {
      color: #FEF08A;
      font-size: 1.5rem;
      padding: 2px 8px;
      background: rgba(0,0,0,0.3);
      border-radius: 8px;
    }

    .pass-progress-container {
      width: 190px;
      height: 6px;
      background: rgba(255,255,255,0.2);
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 12px;
    }

    .pass-progress-bar {
      height: 100%;
      width: 100%;
      background: #10B981;
      transition: width 1.2s linear;
    }

    .pass-tap-notice {
      font-size: 0.82rem;
      color: #94A3B8;
      font-weight: 600;
    }

    .screen-combo-flash {
      animation: comboFlashAnim 0.6s ease-out;
    }

    @keyframes comboFlashAnim {
      0% { box-shadow: inset 0 0 80px rgba(234, 179, 8, 0.9); }
      100% { box-shadow: inset 0 0 0 rgba(234, 179, 8, 0); }
    }

    #killer-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(185, 28, 28, 0.95);
      backdrop-filter: blur(8px);
      z-index: 105;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      text-align: center;
      color: #FFFFFF;
      animation: fadeIn 0.2s ease-out;
    }

    #killer-overlay.hidden {
      display: none !important;
    }

    .killer-icon {
      font-size: 4.5rem;
      animation: pulse-danger 0.5s infinite alternate;
    }

    .killer-title {
      font-size: 1.8rem;
      font-weight: 900;
      color: #FEF08A;
      margin: 10px 0 6px 0;
    }

    .killer-desc {
      font-size: 1rem;
      line-height: 1.5;
      max-width: 320px;
      color: #FEE2E2;
      margin-bottom: 20px;
    }

    /* 사자성어 상대 지목 타깃 선택 모달 */
    .target-player-btn-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 14px 0;
    }

    .target-player-btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      border-radius: var(--radius-md);
      background: #F8FAFC;
      border: 1.5px solid #CBD5E1;
      font-size: 0.95rem;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.15s;
    }

    .target-player-btn:active {
      transform: scale(0.98);
      background: #FEF2F2;
      border-color: #EF4444;
    }

    /* 토스트 알림 */
    #toast-msg {
      position: absolute;
      top: 60px;
      left: 50%;
      transform: translateX(-50%) translateY(-20px);
      background: #0F172A;
      color: #FFFFFF;
      padding: 9px 18px;
      border-radius: var(--radius-full);
      font-size: 0.82rem;
      font-weight: 800;
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
      z-index: 120;
      opacity: 0;
      pointer-events: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
    }

    #toast-msg.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    #toast-msg.error { background: #EF4444; }
    #toast-msg.info { background: #2563EB; }
    #toast-msg.success { background: #10B981; }
    #toast-msg.combo { background: #D97706; }
    #toast-msg.idiom { background: #4F46E5; }

    .shake {
      animation: shake-anim 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    }

    @keyframes shake-anim {
      10%, 90% { transform: translate3d(-3px, 0, 0); }
      20%, 80% { transform: translate3d(5px, 0, 0); }
      30%, 50%, 70% { transform: translate3d(-6px, 0, 0); }
      40%, 60% { transform: translate3d(6px, 0, 0); }
    }

    .modal-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      z-index: 110;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      animation: fadeIn 0.2s ease-out;
    }

    .modal-overlay.hidden {
      display: none !important;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-card {
      width: 100%;
      max-width: 360px;
      background: #FFFFFF;
      border-radius: var(--radius-lg);
      padding: 22px 18px;
      box-shadow: 0 20px 30px rgba(0,0,0,0.2);
      text-align: center;
      position: relative;
      animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      max-height: 90vh;
      overflow-y: auto;
    }

    @keyframes scaleUp {
      from { transform: scale(0.9); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }

    .modal-icon {
      font-size: 3rem;
      margin-bottom: 6px;
    }

    .modal-title {
      font-size: 1.35rem;
      font-weight: 900;
      color: #0F172A;
      margin-bottom: 6px;
    }

    .modal-desc {
      font-size: 0.9rem;
      color: #64748B;
      margin-bottom: 16px;
      line-height: 1.45;
    }

    .modal-btn-row {
      display: flex;
      gap: 10px;
    }

    .modal-btn {
      flex: 1;
      height: 46px;
      border-radius: var(--radius-md);
      font-size: 0.95rem;
      font-weight: 800;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.15s;
    }

    .modal-btn.primary {
      background: #0F172A;
      color: #FFFFFF;
    }

    .modal-btn.secondary {
      background: #F1F5F9;
      color: #475569;
    }

    .modal-btn:active {
      transform: scale(0.97);
    }

    #confetti-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 115;
    }

    .leaderboard-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 16px;
      text-align: left;
    }

    .leaderboard-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 12px;
      border-radius: var(--radius-sm);
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
    }

    .leaderboard-item.rank-1 {
      background: #FEF9C3;
      border-color: #FDE047;
      font-weight: 900;
    }

    .lb-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .lb-rank {
      font-size: 0.9rem;
      font-weight: 900;
      width: 20px;
    }

    .lb-avatar {
      font-size: 1.4rem;
    }

    .lb-name {
      font-size: 0.85rem;
      font-weight: 800;
      color: #0F172A;
    }

    .lb-score {
      font-size: 0.95rem;
      font-weight: 900;
      color: #2563EB;
    }

    .rules-list {
      text-align: left;
      font-size: 0.82rem;
      color: #334155;
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: #F8FAFC;
      padding: 12px;
      border-radius: var(--radius-md);
      margin-bottom: 16px;
      max-height: 260px;
      overflow-y: auto;
      border: 1px solid #E2E8F0;
    }

    .rules-list li {
      margin-left: 16px;
      line-height: 1.4;
    }

    .rules-list strong {
      color: #0F172A;
    }
  </style>
</head>
<body>

  <div id="app-container">
    <canvas id="confetti-canvas"></canvas>

    <!-- 상단 토스트 메시지 -->
    <div id="toast-msg">토스트 메시지</div>

    <!-- 1. 설정/시작 화면 -->
    <div id="setup-screen" class="screen">
      <div class="setup-header">
        <div class="game-logo">⚔️</div>
        <h1 class="setup-title">끝말잇기 배틀 HP</h1>
        <p class="setup-desc">HP 100 서바이벌 끝말잇기 대전 (2~6인)</p>
      </div>

      <!-- 플레이어 인원 수 선택 -->
      <div class="setup-card">
        <div class="card-label">👥 플레이어 인원 수 (2~6명)</div>
        <div class="chip-group" id="player-count-chips">
          <button type="button" class="chip-btn active" data-count="2">2명</button>
          <button type="button" class="chip-btn" data-count="3">3명</button>
          <button type="button" class="chip-btn" data-count="4">4명</button>
          <button type="button" class="chip-btn" data-count="5">5명</button>
          <button type="button" class="chip-btn" data-count="6">6명</button>
        </div>
      </div>

      <!-- 플레이어별 프로필 리스트 -->
      <div class="setup-card">
        <div class="card-label">🎨 플레이어 프로필 설정</div>
        <div id="players-setup-list"></div>
      </div>

      <!-- 총 라운드 수 설정 -->
      <div class="setup-card">
        <div class="card-label">🏆 총 라운드 수</div>
        <div class="chip-group" id="rounds-chip-group">
          <button type="button" class="chip-btn" data-rounds="1">1판</button>
          <button type="button" class="chip-btn active" data-rounds="3">3판</button>
          <button type="button" class="chip-btn" data-rounds="5">5판</button>
          <button type="button" class="chip-btn" data-rounds="7">7판</button>
          <input type="number" id="custom-rounds-input" class="custom-input-box" placeholder="직접" min="1" max="20">
        </div>
      </div>

      <!-- 찬스 횟수 설정 -->
      <div class="setup-card">
        <div class="card-label">💡 찬스(힌트) 횟수 (1인당)</div>
        <div class="chip-group" id="chances-chip-group">
          <button type="button" class="chip-btn" data-chances="0">0회</button>
          <button type="button" class="chip-btn" data-chances="1">1회</button>
          <button type="button" class="chip-btn active" data-chances="2">2회 (기본)</button>
          <button type="button" class="chip-btn" data-chances="3">3회</button>
          <button type="button" class="chip-btn" data-chances="5">5회</button>
        </div>
      </div>

      <!-- 턴 제한시간 설정 -->
      <div class="setup-card">
        <div class="card-label">⏱️ 턴 제한 시간 (5초마다 HP -5 차감)</div>
        <div class="chip-group" id="timer-chip-group">
          <button type="button" class="chip-btn" data-time="15">15초</button>
          <button type="button" class="chip-btn active" data-time="20">20초</button>
          <button type="button" class="chip-btn" data-time="30">30초</button>
          <button type="button" class="chip-btn" data-time="45">45초</button>
          <button type="button" class="chip-btn" data-time="60">60초</button>
        </div>
      </div>

      <button id="btn-start-game" class="start-btn">
        <span>게임 시작하기</span>
        <span>🚀</span>
      </button>

      <div style="text-align: center; margin-top: 4px;">
        <button type="button" id="btn-show-rules" style="background: none; border: none; font-size: 0.8rem; color: #64748B; text-decoration: underline; cursor: pointer;">
          📖 HP 배틀 룰 및 사자성어 공격 규칙 보기
        </button>
      </div>
    </div>

    <!-- 2. 게임 메인 화면 -->
    <div id="game-screen" class="screen hidden">
      <!-- 상단 고정 바 -->
      <div class="game-top-bar">
        <button id="btn-exit-to-setup" class="icon-btn" title="설정으로">⚙️</button>
        <div class="top-round-badge" id="display-round-badge">
          <span>라운드</span>
          <strong id="current-round-text">1 / 3</strong>
        </div>
        <button id="btn-toggle-sound" class="icon-btn" title="소리 토글">🔊</button>
      </div>

      <!-- 상단 고정 플레이어 HP 스코어보드 (스크롤 고정) -->
      <div class="scoreboard-wrapper">
        <div class="scoreboard" id="scoreboard-container"></div>
      </div>

      <!-- 타이머 프로그레스 바 -->
      <div class="timer-container">
        <div id="timer-bar" class="timer-bar"></div>
      </div>

      <!-- 단어 대화 릴레이 영역 (단어와 뜻 풀이 표시) -->
      <div class="word-log-container" id="word-log-container"></div>

      <!-- 현재 이어야 할 글자 전광판 (상단 고정) -->
      <div class="target-char-banner">
        <div class="target-char-left">
          <div class="target-char-badge" id="target-char-display">사</div>
          <div class="target-char-info">
            <span class="target-char-label">이어서 시작할 글자</span>
            <span class="target-duum-hint" id="target-duum-display"></span>
          </div>
        </div>
        <div class="timer-countdown-text" id="timer-text">20s</div>
      </div>

      <!-- 하단 입력 독 -->
      <div class="input-dock">
        <div class="dock-actions-row">
          <button id="btn-use-hint" class="hint-btn">
            <span>💡 찬스</span>
            <strong id="btn-hint-count">(2)</strong>
          </button>
          <button id="btn-reset-word" class="reset-word-btn" title="새 단어 요청 시 HP -50 차감">
            <span>🔄 새 단어 (-50 HP)</span>
          </button>
          <button id="btn-surrender" class="surrender-btn">
            <span>🏳️ 기권</span>
          </button>
        </div>

        <form id="word-form" class="input-form-row" onsubmit="return false;">
          <input type="text" id="word-input" class="word-input" placeholder="한글 단어 또는 사자성어 입력" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
          <button type="submit" id="btn-submit-word" class="submit-btn">제출</button>
        </form>
      </div>
    </div>

    <!-- 3. 패스앤플레이 전환 오버레이 -->
    <div id="pass-overlay" class="hidden">
      <div class="pass-phone-icon">📱</div>
      <h2 class="pass-title">스마트폰을 넘겨주세요!</h2>
      <div class="pass-next-player">
        <span class="pass-avatar" id="pass-next-avatar">🐱</span>
        <span class="pass-nickname" id="pass-next-name">플레이어 2</span>
      </div>
      <div class="pass-target-char">
        이어서 시작할 글자: <strong id="pass-target-char-val">과</strong>
      </div>
      <div class="pass-progress-container">
        <div id="pass-progress-bar" class="pass-progress-bar"></div>
      </div>
      <p class="pass-tap-notice">화면을 터치하면 바로 시작합니다</p>
    </div>

    <!-- 4. 한방단어 작렬 즉시 사망 알림 오버레이 -->
    <div id="killer-overlay" class="hidden">
      <div class="killer-icon">💥</div>
      <h2 class="killer-title">한방단어 작렬!</h2>
      <p class="killer-desc" id="killer-desc-text">
        이을 수 있는 단어가 사전에 전혀 없습니다!<br>
        다음 차례인 플레이어는 찬스를 쓸 틈도 없이 즉시 탈락(사망)했습니다! ☠️
      </p>
      <button type="button" id="btn-close-killer" class="modal-btn" style="background:#FFFFFF; color:#B91C1C; max-width:200px;">
        확인 ➔
      </button>
    </div>

    <!-- 5. 사자성어 공격 타깃 선택 모달 (규칙 3) -->
    <div id="idiom-target-modal" class="modal-overlay hidden">
      <div class="modal-card">
        <div class="modal-icon">📜</div>
        <h3 class="modal-title">사자성어 공격!</h3>
        <p class="modal-desc" id="idiom-target-desc">
          사자성어를 입력하여 <strong style="color:#4F46E5;">타깃 콤보 -10 HP</strong>가 발동했습니다!<br>
          공격할 상대 1명을 선택하세요:
        </p>
        <div class="target-player-btn-list" id="idiom-target-btn-list"></div>
      </div>
    </div>

    <!-- 6. 힌트 모달 -->
    <div id="hint-modal" class="modal-overlay hidden">
      <div class="modal-card">
        <div class="modal-icon">💡</div>
        <h3 class="modal-title">찬스 단어 추천</h3>
        <p class="modal-desc" id="hint-modal-desc">
          사전에서 이어갈 수 있는 단어를 찾았습니다!<br>
          추천 단어: <strong id="hint-suggested-word" style="font-size: 1.3rem; color: #2563EB;">사과</strong><br>
          <span id="hint-suggested-meaning" style="font-size:0.8rem; color:#64748B; display:inline-block; margin-top:6px;"></span>
        </p>
        <div class="modal-btn-row">
          <button type="button" id="btn-apply-hint" class="modal-btn primary">이 단어로 입력하기</button>
          <button type="button" id="btn-close-hint" class="modal-btn secondary">닫기</button>
        </div>
      </div>
    </div>

    <!-- 7. 라운드 종료 모달 -->
    <div id="round-modal" class="modal-overlay hidden">
      <div class="modal-card">
        <div class="modal-icon" id="round-modal-icon">🎉</div>
        <h3 class="modal-title" id="round-modal-title">1라운드 종료</h3>
        <p class="modal-desc" id="round-modal-desc">플레이어 1 승리!</p>
        
        <div class="leaderboard-list" id="round-leaderboard-list"></div>

        <button type="button" id="btn-next-round" class="modal-btn primary">
          다음 라운드 시작 ➔
        </button>
      </div>
    </div>

    <!-- 8. 최종 게임 종료 모달 -->
    <div id="gameover-modal" class="modal-overlay hidden">
      <div class="modal-card">
        <div class="modal-icon">🏆</div>
        <h3 class="modal-title">최종 우승 발표!</h3>
        <div id="final-winner-info" style="margin: 12px 0;">
          <div id="final-winner-avatar" style="font-size: 3.5rem;">🐶</div>
          <div id="final-winner-name" style="font-size: 1.4rem; font-weight: 900; margin-top: 4px; color: #0F172A;">플레이어 1</div>
          <div id="final-winner-score" style="font-size: 0.95rem; font-weight: 700; color: #2563EB; margin-top: 2px;">총 3승 달성!</div>
        </div>

        <div class="leaderboard-list" id="final-leaderboard-list"></div>

        <div class="modal-btn-row" style="margin-top: 14px;">
          <button type="button" id="btn-rematch" class="modal-btn primary">다시 대결 🔄</button>
          <button type="button" id="btn-go-setup" class="modal-btn secondary">새 설정 ⚙️</button>
        </div>
      </div>
    </div>

    <!-- 9. 규칙 설명 모달 -->
    <div id="rules-modal" class="modal-overlay hidden">
      <div class="modal-card">
        <div class="modal-icon">📖</div>
        <h3 class="modal-title">HP 배틀 게임 규칙</h3>
        <ul class="rules-list">
          <li><strong>💖 HP 100 시작</strong>: 각 라운드마다 모든 플레이어는 HP 100을 보유하며, 0이 되면 즉시 탈락합니다.</li>
          <li><strong>⏱️ 생각시간 5초마다 HP -5</strong>: 자신의 턴에 생각시간 5초를 쓸 때마다 <strong>HP -5</strong>가 깎입니다!</li>
          <li><strong>❌ 오답 입력 시 HP -20</strong>: 틀리게 기입하면 <strong>HP -20</strong>이 깎이며, <u>생각시간은 리셋되지 않고 유지된 채</u> 즉시 다시 입력해야 합니다.</li>
          <li><strong>🔄 새 단어 요청 시 HP -50</strong>: 연결할 단어를 모를 때 누르면 <strong>HP -50</strong>을 소모하고 AI가 새로운 첫 단어를 제공합니다.</li>
          <li><strong>⚡ 콤보 어택 (3글자 이상)</strong>:
            <strong>3글자 이상</strong>이면서 앞 글자와 뒷 글자가 동일한 단어(예: <strong>기러기, 토마토, 스위스, 오디오, 일요일</strong> 등) 제시 시 <strong>상대 전원에게 HP -20 콤보 타격</strong>! (2글자는 제외)
          </li>
          <li><strong>📜 사자성어 콤보 (-10 HP)</strong>:
            사자성어를 제시하면 <strong>살아있는 상대방 중 1명을 직접 선택하여 HP -10 타격</strong>!
          </li>
          <li><strong>💡 찬스 즉시 차감</strong>: 찬스는 누르는 순간 1회가 즉시 차감됩니다.</li>
          <li><strong>💥 한방단어 작렬</strong>: 이을 단어가 사전에 없는 단어 제시 시 다음 플레이어는 즉시 탈락합니다.</li>
        </ul>
        <button type="button" id="btn-close-rules" class="modal-btn primary">확인</button>
      </div>
    </div>

  </div>

  <script>
    /* ==========================================
       1. 한국어 단어 데이터베이스 및 사자성어/뜻 사전
       ========================================== */
    const STARTER_WORDS = ${startersJson};
    const WORDS_DATA_STRING = "${wordsJoined}";

    const IDIOM_DATA = ${JSON.stringify(IDIOM_LIST)};
    const SAMPLE_DEFS = ${JSON.stringify(SAMPLE_DEFINITIONS)};

    let WORD_SET = null;
    let WORDS_BY_FIRST_CHAR = null;
    let IDIOM_MAP = new Map();
    let DEFINITIONS_MAP = new Map();

    function initDictionary() {
      if (WORD_SET) return;
      WORD_SET = new Set(WORDS_DATA_STRING.split(','));

      // 사자성어 등록 및 단어 Set에 추가
      for (const [idiom, meaning] of IDIOM_DATA) {
        IDIOM_MAP.set(idiom, meaning);
        DEFINITIONS_MAP.set(idiom, meaning);
        WORD_SET.add(idiom);
      }

      // 샘플 대표 뜻 등록
      for (const [w, meaning] of SAMPLE_DEFS) {
        DEFINITIONS_MAP.set(w, meaning);
      }
      
      // 첫 글자별 색인 생성
      WORDS_BY_FIRST_CHAR = new Map();
      for (const word of WORD_SET) {
        const first = word[0];
        let list = WORDS_BY_FIRST_CHAR.get(first);
        if (!list) {
          list = [];
          WORDS_BY_FIRST_CHAR.set(first, list);
        }
        list.push(word);
      }
    }

    // 단어 뜻풀이 가져오기 함수 (규칙 5)
    function getWordMeaning(word) {
      if (DEFINITIONS_MAP.has(word)) {
        return DEFINITIONS_MAP.get(word);
      }
      if (IDIOM_MAP.has(word)) {
        return IDIOM_MAP.get(word);
      }
      // 내장 뜻이 없는 경우 기본 대표 명사 설명 제공
      return \`'\${word}' - 국어사전에 등재된 표준 명사 어휘.\`;
    }

    // 표준 두음법칙 변환 함수
    function getDuumVariants(char) {
      if (!char || char.length !== 1) return [char];
      const code = char.charCodeAt(0) - 0xAC00;
      if (code < 0 || code > 11171) return [char];

      const choseong = Math.floor(code / (21 * 28));
      const jungseong = Math.floor((code % (21 * 28)) / 28);
      const jongseong = code % 28;

      const isYOrIVowel = [2, 3, 6, 7, 12, 17, 20].includes(jungseong);
      const variants = new Set([char]);

      // 초성 'ㄹ'
      if (choseong === 5) {
        if (isYOrIVowel) {
          variants.add(String.fromCharCode(0xAC00 + (11 * 21 * 28) + (jungseong * 28) + jongseong));
          variants.add(String.fromCharCode(0xAC00 + (2 * 21 * 28) + (jungseong * 28) + jongseong));
        } else {
          variants.add(String.fromCharCode(0xAC00 + (2 * 21 * 28) + (jungseong * 28) + jongseong));
          variants.add(String.fromCharCode(0xAC00 + (11 * 21 * 28) + (jungseong * 28) + jongseong));
          if (char === '름') { variants.add('음'); variants.add('늠'); }
          if (char === '릉') { variants.add('응'); variants.add('능'); }
          if (char === '륵') { variants.add('윽'); variants.add('늑'); }
        }
      }

      // 초성 'ㄴ'
      if (choseong === 2 && isYOrIVowel) {
        variants.add(String.fromCharCode(0xAC00 + (11 * 21 * 28) + (jungseong * 28) + jongseong));
      }

      if (char === '륨') { variants.add('윰'); variants.add('늄'); variants.add('움'); }
      if (char === '늄') { variants.add('윰'); variants.add('움'); variants.add('륨'); }
      if (char === '릇') { variants.add('늣'); variants.add('읏'); }
      if (char === '녘') { variants.add('역'); }

      return Array.from(variants);
    }

    // 한방단어 판별
    function checkContinuable(word) {
      if (!word) return false;
      const lastChar = word[word.length - 1];
      const variants = getDuumVariants(lastChar);
      for (const c of variants) {
        const list = WORDS_BY_FIRST_CHAR.get(c);
        if (list) {
          for (const w of list) {
            if (!gameState.usedWords.has(w)) {
              return true;
            }
          }
        }
      }
      return false;
    }

    /* ==========================================
       2. Web Audio API 사운드 신디사이저
       ========================================== */
    class SoundEngine {
      constructor() {
        this.ctx = null;
        this.enabled = true;
      }

      init() {
        if (!this.ctx) {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            this.ctx = new AudioContext();
          }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      }

      playSuccess() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.35);
      }

      playDamage() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.setValueAtTime(120, now + 0.1);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }

      playCombo() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.08);
        osc.frequency.setValueAtTime(1760, now + 0.16);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.45);
      }

      playIdiom() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.setValueAtTime(987.77, now + 0.1);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.4);
      }

      playKiller() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.5);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.55);
      }

      playPass() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }

      playHint() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.setValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      }

      playVictory() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
          const now = this.ctx.currentTime + (i * 0.12);
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.25, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.45);
        });
      }
    }

    const sound = new SoundEngine();

    /* ==========================================
       3. Canvas Confetti 폭죽 효과
       ========================================== */
    class Confetti {
      constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animId = null;
        this.resize();
        window.addEventListener('resize', () => this.resize());
      }

      resize() {
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
      }

      start() {
        this.stop();
        this.resize();
        this.particles = [];
        const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#FEF08A', '#06B6D4'];
        for (let i = 0; i < 90; i++) {
          this.particles.push({
            x: this.canvas.width * (0.2 + Math.random() * 0.6),
            y: this.canvas.height * 0.4,
            vx: (Math.random() - 0.5) * 12,
            vy: (Math.random() - 1.2) * 14,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 12,
            opacity: 1
          });
        }
        this.loop();
      }

      loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let alive = false;
        for (const p of this.particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.35;
          p.vx *= 0.98;
          p.rotation += p.rotationSpeed;
          p.opacity -= 0.007;

          if (p.opacity > 0 && p.y < this.canvas.height + 20) {
            alive = true;
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate((p.rotation * Math.PI) / 180);
            this.ctx.globalAlpha = Math.max(0, p.opacity);
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            this.ctx.restore();
          }
        }
        if (alive) {
          this.animId = requestAnimationFrame(() => this.loop());
        } else {
          this.stop();
        }
      }

      stop() {
        if (this.animId) {
          cancelAnimationFrame(this.animId);
          this.animId = null;
        }
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }

    const confetti = new Confetti('confetti-canvas');

    /* ==========================================
       4. 게임 상태 관리 (Game State)
       ========================================== */
    const ALL_AVATARS = ['🐶', '🐱', '🐰', '🦊', '🐻', '🐼', '🐯', '🦁', '🐸', '🦄', '🐥', '🐧', '🐙', '🐵'];
    const PLAYER_THEMES = [
      { id: 1, color: '#2563EB', light: '#EFF6FF', border: '#93C5FD', defaultAvatar: '🐶' },
      { id: 2, color: '#E11D48', light: '#FFF1F2', border: '#FDA4AF', defaultAvatar: '🐱' },
      { id: 3, color: '#059669', light: '#ECFDF5', border: '#6EE7B7', defaultAvatar: '🐰' },
      { id: 4, color: '#D97706', light: '#FFFBEB', border: '#FCD34D', defaultAvatar: '🦊' },
      { id: 5, color: '#7C3AED', light: '#F5F3FF', border: '#C4B5FD', defaultAvatar: '🐻' },
      { id: 6, color: '#0891B2', light: '#ECFEFF', border: '#67E8F9', defaultAvatar: '🐼' }
    ];

    const gameState = {
      playerCount: 2,
      totalRounds: 3,
      maxChances: 2,
      timeLimit: 20,

      players: [],

      currentRound: 1,
      currentTurnIndex: 0,
      roundStarterIndex: 0,
      currentWord: '',
      targetChar: '',
      duumVariants: [],
      usedWords: new Set(),
      timerRemaining: 20,
      turnElapsedSeconds: 0, // 턴 경과 초 카운터 (5초마다 HP -5용)
      timerInterval: null,
      isRoundActive: false,
      turnPending: false
    };

    /* ==========================================
       5. UI 헬퍼 및 알림
       ========================================== */
    let toastTimeout = null;
    function showToast(text, type = 'info') {
      const toast = document.getElementById('toast-msg');
      toast.textContent = text;
      toast.className = 'show ' + type;
      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.className = '';
      }, 2300);
    }

    function triggerVibrate(pattern = [100, 50, 100]) {
      if (navigator.vibrate) {
        try { navigator.vibrate(pattern); } catch (e) {}
      }
    }

    function triggerShake(elementId = 'app-container') {
      const el = document.getElementById(elementId);
      if (!el) return;
      el.classList.remove('shake');
      void el.offsetWidth;
      el.classList.add('shake');
      setTimeout(() => el.classList.remove('shake'), 400);
    }

    function showFloatingDamage(playerIndex, amount) {
      const card = document.getElementById(\`card-player-\${playerIndex}\`);
      if (!card) return;
      const dmg = document.createElement('div');
      dmg.className = 'floating-damage';
      dmg.textContent = \`-\${amount}\`;
      card.appendChild(dmg);
      setTimeout(() => dmg.remove(), 950);
    }

    /* ==========================================
       6. 게임 라이프사이클 및 턴 로직
       ========================================== */
    function showScreen(screenId) {
      document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
      document.getElementById(screenId).classList.remove('hidden');
    }

    function renderPlayersSetup() {
      const container = document.getElementById('players-setup-list');
      container.innerHTML = '';

      for (let i = 0; i < gameState.playerCount; i++) {
        const theme = PLAYER_THEMES[i];
        const defaultName = \`플레이어 \${i + 1}\`;
        const defaultAvatar = theme.defaultAvatar;

        const box = document.createElement('div');
        box.className = 'player-setup-box';
        box.style.background = theme.light;
        box.style.borderColor = theme.border;

        box.innerHTML = \`
          <div class="player-input-row">
            <div id="p\${i}-avatar-preview" class="current-avatar-preview">\${defaultAvatar}</div>
            <input type="text" id="p\${i}-nickname" class="nickname-input" value="\${defaultName}" maxlength="8" placeholder="P\${i + 1} 닉네임">
          </div>
          <div id="p\${i}-avatar-grid" class="avatar-grid"></div>
        \`;
        container.appendChild(box);

        const grid = box.querySelector(\`#p\${i}-avatar-grid\`);
        const preview = box.querySelector(\`#p\${i}-avatar-preview\`);
        ALL_AVATARS.forEach(av => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'avatar-btn' + (av === defaultAvatar ? ' selected' : '');
          btn.textContent = av;
          btn.onclick = () => {
            grid.querySelectorAll('.avatar-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            preview.textContent = av;
          };
          grid.appendChild(btn);
        });
      }
    }

    function startNewGame() {
      initDictionary();
      sound.init();

      gameState.players = [];
      for (let i = 0; i < gameState.playerCount; i++) {
        const nameInput = document.getElementById(\`p\${i}-nickname\`);
        const preview = document.getElementById(\`p\${i}-avatar-preview\`);
        const name = (nameInput ? nameInput.value.trim() : '') || \`플레이어 \${i + 1}\`;
        const avatar = (preview ? preview.textContent : '') || PLAYER_THEMES[i].defaultAvatar;

        gameState.players.push({
          id: i + 1,
          name: name,
          avatar: avatar,
          score: 0,
          hp: 100,
          chances: gameState.maxChances,
          alive: true,
          theme: PLAYER_THEMES[i]
        });
      }

      const customRounds = parseInt(document.getElementById('custom-rounds-input').value, 10);
      if (!isNaN(customRounds) && customRounds >= 1 && customRounds <= 20) {
        gameState.totalRounds = customRounds;
      }

      gameState.currentRound = 1;
      gameState.roundStarterIndex = 0;

      buildScoreboardDOM();
      showScreen('game-screen');
      startRound(1);
    }

    function buildScoreboardDOM() {
      const container = document.getElementById('scoreboard-container');
      container.innerHTML = '';

      gameState.players.forEach((p, idx) => {
        const card = document.createElement('div');
        card.id = \`card-player-\${idx}\`;
        card.className = 'player-card';
        card.style.borderColor = p.theme.border;
        card.style.background = p.theme.light;

        card.innerHTML = \`
          <div class="turn-badge" style="background:\${p.theme.color}">MY TURN!</div>
          <div class="card-avatar">\${p.avatar}</div>
          <div class="card-nickname">\${p.name}</div>
          <div class="hp-gauge-container">
            <div id="hp-bar-\${idx}" class="hp-gauge-fill" style="width:100%"></div>
          </div>
          <div class="hp-text-label" id="hp-val-\${idx}">100/100</div>
          <div class="card-stats-row">
            <span class="score-pill">👑 <span id="disp-score-\${idx}">0</span></span>
            <span class="chance-pill">💡 <span id="disp-chance-\${idx}">\${p.chances}</span></span>
          </div>
        \`;
        container.appendChild(card);
      });
    }

    function startRound(roundNum) {
      gameState.currentRound = roundNum;
      gameState.isRoundActive = true;
      gameState.turnPending = false;
      gameState.usedWords.clear();

      gameState.players.forEach(p => {
        p.hp = 100;
        p.chances = gameState.maxChances;
        p.alive = true;
      });

      gameState.currentTurnIndex = gameState.roundStarterIndex % gameState.players.length;
      gameState.roundStarterIndex++;

      document.getElementById('word-log-container').innerHTML = '';

      let starterWord = '';
      for (let attempt = 0; attempt < 50; attempt++) {
        const candidate = STARTER_WORDS[Math.floor(Math.random() * STARTER_WORDS.length)];
        if (checkContinuable(candidate)) {
          starterWord = candidate;
          break;
        }
      }
      if (!starterWord) starterWord = '사과';

      gameState.usedWords.add(starterWord);
      gameState.currentWord = starterWord;

      appendSystemWordBubble(starterWord, getWordMeaning(starterWord));
      updateTargetChar(starterWord);
      updateScoreboardUI();
      startTurn();

      const curPlayer = gameState.players[gameState.currentTurnIndex];
      showToast(\`📢 \${roundNum}라운드 배틀 시작! (\${curPlayer.name} 턴)\`, 'info');
    }

    function updateTargetChar(word) {
      const lastChar = word[word.length - 1];
      gameState.targetChar = lastChar;
      gameState.duumVariants = getDuumVariants(lastChar);

      document.getElementById('target-char-display').textContent = lastChar;
      const duumDisplay = document.getElementById('target-duum-display');
      if (gameState.duumVariants.length > 1) {
        const others = gameState.duumVariants.filter(c => c !== lastChar);
        duumDisplay.textContent = \`💡 두음법칙: [\${others.join(', ')}] 가능\`;
      } else {
        duumDisplay.textContent = '';
      }
    }

    // 시스템 첫 제시어 말풍선 (뜻 풀이 포함)
    function appendSystemWordBubble(word, meaning) {
      const container = document.getElementById('word-log-container');
      const div = document.createElement('div');
      div.className = 'word-item system';
      div.innerHTML = \`
        <div class="word-bubble">
          🤖 AI 제시어: <strong>\${word}</strong> (끝 글자: '<strong>\${word[word.length - 1]}</strong>')
          <div class="bubble-meaning">📖 \${meaning}</div>
        </div>
      \`;
      container.appendChild(div);
      container.scrollTop = container.scrollHeight;
    }

    // 플레이어 단어 말풍선 (단어 대표 뜻 풀이 포함 - 규칙 5)
    function appendPlayerWordBubble(player, word, meaning, duumApplied, isCombo, isIdiom, isKiller) {
      const container = document.getElementById('word-log-container');
      const div = document.createElement('div');
      div.className = 'word-item';
      div.style.alignSelf = 'flex-start';

      let badgesHtml = '';
      if (duumApplied) {
        badgesHtml += \`<div class="duum-badge">두음법칙: \${duumApplied.from} ➔ \${duumApplied.to}</div>\`;
      }
      if (isCombo) {
        badgesHtml += \`<div class="combo-badge">⚡ 3글자+ 콤보어택! (전체 -20 HP)</div>\`;
      }
      if (isIdiom) {
        badgesHtml += \`<div class="idiom-badge">📜 사자성어 콤보! (타깃 -10 HP)</div>\`;
      }
      if (isKiller) {
        badgesHtml += \`<div class="killer-badge">💥 한방단어 작렬!</div>\`;
      }

      div.innerHTML = \`
        <div class="word-item-avatar">\${player.avatar}</div>
        <div class="word-bubble" style="border:1.5px solid \${player.theme.border}; background:\${player.theme.light}">
          <div class="bubble-author" style="color:\${player.theme.color}">\${player.name}</div>
          <div class="bubble-text" style="color:\${player.theme.color}">
            \${word.slice(0, -1)}<span class="bubble-tail-char">\${word[word.length - 1]}</span>
          </div>
          <div class="bubble-meaning">📖 \${meaning}</div>
          \${badgesHtml}
        </div>
      \`;
      container.appendChild(div);
      container.scrollTop = container.scrollHeight;
    }

    function getNextAliveIndex(fromIndex) {
      const total = gameState.players.length;
      for (let i = 1; i <= total; i++) {
        const nextIdx = (fromIndex + i) % total;
        if (gameState.players[nextIdx].alive) {
          return nextIdx;
        }
      }
      return -1;
    }

    function getAlivePlayers() {
      return gameState.players.filter(p => p.alive);
    }

    function startTurn() {
      if (!gameState.isRoundActive) return;
      gameState.turnPending = false;
      gameState.turnElapsedSeconds = 0; // 턴 시작 시 경과 시간 초기화

      updateScoreboardUI();
      resetTimer();

      const input = document.getElementById('word-input');
      input.value = '';
      input.focus();
    }

    function updateScoreboardUI() {
      document.getElementById('current-round-text').textContent = \`\${gameState.currentRound} / \${gameState.totalRounds}\`;

      gameState.players.forEach((p, idx) => {
        const card = document.getElementById(\`card-player-\${idx}\`);
        if (!card) return;

        document.getElementById(\`disp-score-\${idx}\`).textContent = p.score;
        document.getElementById(\`disp-chance-\${idx}\`).textContent = p.chances;

        const hpPercent = Math.max(0, p.hp);
        const hpBar = document.getElementById(\`hp-bar-\${idx}\`);
        const hpVal = document.getElementById(\`hp-val-\${idx}\`);
        if (hpBar) {
          hpBar.style.width = hpPercent + '%';
          if (hpPercent >= 60) hpBar.style.background = '#10B981';
          else if (hpPercent >= 30) hpBar.style.background = '#F59E0B';
          else hpBar.style.background = '#EF4444';
        }
        if (hpVal) {
          hpVal.textContent = \`\${Math.max(0, p.hp)}/100\`;
        }

        if (!p.alive) {
          card.className = 'player-card dead';
        } else if (idx === gameState.currentTurnIndex) {
          card.className = 'player-card active-turn';
          card.style.borderColor = p.theme.color;
          card.style.boxShadow = \`0 0 16px \${p.theme.color}44\`;
        } else {
          card.className = 'player-card';
          card.style.borderColor = p.theme.border;
          card.style.boxShadow = 'none';
        }
      });

      const curPlayer = gameState.players[gameState.currentTurnIndex];
      if (curPlayer) {
        document.getElementById('btn-hint-count').textContent = \`(\${curPlayer.chances})\`;
        document.getElementById('btn-use-hint').disabled = curPlayer.chances <= 0;
      }
    }

    /* 규칙 2: 생각시간 5초를 쓸 때마다 HP -5가 깎임 */
    function resetTimer() {
      if (gameState.timerInterval) clearInterval(gameState.timerInterval);

      gameState.timerRemaining = gameState.timeLimit;
      updateTimerDisplay();

      const startTime = Date.now();
      const totalDuration = gameState.timeLimit * 1000;
      let lastCheckedSecond = 0;

      gameState.timerInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const currentElapsedSec = Math.floor(elapsed / 1000);

        // 매 1초 경과 감지
        if (currentElapsedSec > lastCheckedSecond) {
          lastCheckedSecond = currentElapsedSec;
          gameState.turnElapsedSeconds++;

          // 규칙 2: 5초를 쓸 때마다 HP -5 깎임!
          if (gameState.turnElapsedSeconds > 0 && gameState.turnElapsedSeconds % 5 === 0) {
            const curPlayer = gameState.players[gameState.currentTurnIndex];
            curPlayer.hp -= 5;
            sound.playDamage();
            showFloatingDamage(gameState.currentTurnIndex, 5);
            updateScoreboardUI();

            if (curPlayer.hp <= 0) {
              curPlayer.hp = 0;
              curPlayer.alive = false;
              updateScoreboardUI();
              clearInterval(gameState.timerInterval);
              eliminatePlayer(curPlayer, \`⏱️ 생각시간 누적으로 HP 소진! (\${curPlayer.name} 탈락)\`);
              return;
            } else {
              showToast(\`⏱️ 생각시간 5초 경과! (HP -5, 남은 HP: \${curPlayer.hp})\`, 'error');
            }
          }
        }

        const remaining = Math.max(0, totalDuration - elapsed);
        gameState.timerRemaining = Math.ceil(remaining / 1000);

        const percent = Math.max(0, (remaining / totalDuration) * 100);
        const timerBar = document.getElementById('timer-bar');
        timerBar.style.width = percent + '%';

        updateTimerDisplay();

        if (remaining <= 0) {
          clearInterval(gameState.timerInterval);
          onTimeLimitExpired();
        }
      }, 100);
    }

    function updateTimerDisplay() {
      const textEl = document.getElementById('timer-text');
      const barEl = document.getElementById('timer-bar');
      textEl.textContent = \`\${gameState.timerRemaining}s\`;

      if (gameState.timerRemaining <= 5) {
        textEl.className = 'timer-countdown-text danger';
        barEl.className = 'timer-bar danger';
      } else {
        textEl.className = 'timer-countdown-text';
        barEl.className = 'timer-bar';
      }
    }

    // 전체 제한시간 만료 시
    function onTimeLimitExpired() {
      if (!gameState.isRoundActive || gameState.turnPending) return;

      const curPlayer = gameState.players[gameState.currentTurnIndex];
      curPlayer.hp -= 10;
      sound.playDamage();
      triggerVibrate([150, 50, 150]);
      triggerShake();
      showFloatingDamage(gameState.currentTurnIndex, 10);
      updateScoreboardUI();

      if (curPlayer.hp <= 0) {
        curPlayer.hp = 0;
        curPlayer.alive = false;
        updateScoreboardUI();
        eliminatePlayer(curPlayer, \`⏰ 제한시간 초과로 HP 소진! (\${curPlayer.name} 탈락)\`);
      } else {
        showToast(\`⏰ 턴 제한시간 만료! HP -10 (\${curPlayer.name} HP: \${curPlayer.hp})\`, 'error');
        resetTimer();
        document.getElementById('word-input').focus();
      }
    }

    /* 규칙 3: 단어를 틀리게 기입할 경우 -20이 깎임 (생각시간 유지) */
    function handleInvalidSubmission(reason) {
      sound.playDamage();
      triggerVibrate();
      triggerShake();

      const curPlayer = gameState.players[gameState.currentTurnIndex];
      curPlayer.hp -= 20;
      showFloatingDamage(gameState.currentTurnIndex, 20);
      updateScoreboardUI();

      if (curPlayer.hp <= 0) {
        curPlayer.hp = 0;
        curPlayer.alive = false;
        updateScoreboardUI();
        if (gameState.timerInterval) clearInterval(gameState.timerInterval);
        eliminatePlayer(curPlayer, \`❌ 오답으로 인한 HP 소진! (\${curPlayer.name} 탈락)\`);
      } else {
        showToast(\`\${reason} (HP -20, 남은 HP: \${curPlayer.hp})\`, 'error');
        // 생각시간은 리셋되지 않고 그대로 계속 흘러감!
        document.getElementById('word-input').value = '';
        document.getElementById('word-input').focus();
      }
    }

    /* 새 단어 요청 시 -50 HP */
    function requestNewWord() {
      if (!gameState.isRoundActive || gameState.turnPending) return;
      const curPlayer = gameState.players[gameState.currentTurnIndex];

      if (curPlayer.hp <= 50) {
        if (!confirm(\`현재 HP가 \${curPlayer.hp}입니다. 새 단어를 요청하면 50이 깎여 즉시 탈락합니다. 계속하시겠습니까?\`)) {
          return;
        }
      }

      curPlayer.hp -= 50;
      sound.playDamage();
      triggerVibrate([200, 100, 200]);
      triggerShake();
      showFloatingDamage(gameState.currentTurnIndex, 50);
      updateScoreboardUI();

      if (curPlayer.hp <= 0) {
        curPlayer.hp = 0;
        curPlayer.alive = false;
        updateScoreboardUI();
        if (gameState.timerInterval) clearInterval(gameState.timerInterval);
        eliminatePlayer(curPlayer, \`🔄 새 단어 요청으로 HP 소진! (\${curPlayer.name} 탈락)\`);
        return;
      }

      let newWord = '';
      for (let attempt = 0; attempt < 50; attempt++) {
        const candidate = STARTER_WORDS[Math.floor(Math.random() * STARTER_WORDS.length)];
        if (checkContinuable(candidate) && !gameState.usedWords.has(candidate)) {
          newWord = candidate;
          break;
        }
      }
      if (!newWord) newWord = '구름';

      gameState.usedWords.add(newWord);
      gameState.currentWord = newWord;

      appendSystemWordBubble(newWord, getWordMeaning(newWord));
      updateTargetChar(newWord);
      showToast(\`🔄 새 제시어 제공! (\${curPlayer.name} 남은 HP: \${curPlayer.hp})\`, 'info');

      resetTimer();
      document.getElementById('word-input').value = '';
      document.getElementById('word-input').focus();
    }

    /* 단어 검증 및 제출 */
    function submitWord(rawWord) {
      if (!gameState.isRoundActive || gameState.turnPending) return;

      const word = (rawWord || document.getElementById('word-input').value).trim();
      const curPlayer = gameState.players[gameState.currentTurnIndex];

      if (!/^[가-힣]{2,}$/.test(word)) {
        handleInvalidSubmission('두 글자 이상의 한글 단어만 입력 가능합니다!');
        return;
      }

      const firstChar = word[0];
      const isValidInitial = gameState.duumVariants.includes(firstChar);
      if (!isValidInitial) {
        const allowed = gameState.duumVariants.join(' 또는 ');
        handleInvalidSubmission(\`'\${allowed}'(으)로 시작해야 합니다!\`);
        return;
      }

      if (gameState.usedWords.has(word)) {
        handleInvalidSubmission(\`'\${word}'은(는) 이미 사용된 단어입니다!\`);
        return;
      }

      if (!WORD_SET.has(word)) {
        handleInvalidSubmission(\`'\${word}'은(는) 국어사전에 없는 단어입니다!\`);
        return;
      }

      if (gameState.timerInterval) clearInterval(gameState.timerInterval);
      gameState.turnPending = true;
      gameState.usedWords.add(word);
      gameState.currentWord = word;

      let duumApplied = null;
      if (firstChar !== gameState.targetChar) {
        duumApplied = { from: gameState.targetChar, to: firstChar };
      }

      const meaning = getWordMeaning(word);

      // 규칙 1: 앞글자 끝글자 같은 콤보의 경우 3글자 이상 단어부터 적용! (예: 기러기, 토마토 등)
      const isCombo = (word.length >= 3 && word[0] === word[word.length - 1]);
      if (isCombo) {
        sound.playCombo();
        triggerVibrate([100, 50, 100, 50, 200]);
        document.getElementById('app-container').classList.add('screen-combo-flash');
        setTimeout(() => document.getElementById('app-container').classList.remove('screen-combo-flash'), 650);

        showToast(\`⚡ 3글자+ 콤보어택! '\${word}'! 상대 전체 HP -20! ⚡\`, 'combo');

        gameState.players.forEach((p, idx) => {
          if (idx !== gameState.currentTurnIndex && p.alive) {
            p.hp -= 20;
            showFloatingDamage(idx, 20);
            if (p.hp <= 0) {
              p.hp = 0;
              p.alive = false;
            }
          }
        });
        updateScoreboardUI();

        const alive = getAlivePlayers();
        if (alive.length <= 1) {
          appendPlayerWordBubble(curPlayer, word, meaning, duumApplied, true, false, false);
          endRound(alive[0], \`⚡ 3글자 콤보 어택으로 상대 전원 격파!\`);
          return;
        }
      }

      // 규칙 3: 사자성어를 쓸 경우 콤보 -10을 상대방 중에 1명을 선택하여 사용
      const isIdiom = (word.length === 4 && (IDIOM_MAP.has(word) || DEFINITIONS_MAP.has(word)));
      if (isIdiom) {
        sound.playIdiom();
        showToast(\`📜 사자성어 발동! '\${word}'! (상대 1명에게 -10 HP 타격)\`, 'idiom');

        const opponents = gameState.players.map((p, idx) => ({ player: p, index: idx })).filter(item => item.index !== gameState.currentTurnIndex && item.player.alive);

        if (opponents.length === 1) {
          // 상대방이 1명뿐인 경우 즉시 타격
          const target = opponents[0].player;
          target.hp -= 10;
          showFloatingDamage(opponents[0].index, 10);
          if (target.hp <= 0) {
            target.hp = 0;
            target.alive = false;
          }
          updateScoreboardUI();

          const alive = getAlivePlayers();
          if (alive.length <= 1) {
            appendPlayerWordBubble(curPlayer, word, meaning, duumApplied, isCombo, true, false);
            endRound(alive[0], \`📜 사자성어 공격으로 상대 격파!\`);
            return;
          }
          proceedAfterWord(curPlayer, word, meaning, duumApplied, isCombo, true);
        } else if (opponents.length > 1) {
          // 상대방이 2명 이상인 경우 타깃 선택 모달 표시!
          appendPlayerWordBubble(curPlayer, word, meaning, duumApplied, isCombo, true, false);
          showIdiomTargetModal(opponents, () => {
            const alive = getAlivePlayers();
            if (alive.length <= 1) {
              endRound(alive[0], \`📜 사자성어 공격으로 상대 격파!\`);
            } else {
              proceedAfterWord(curPlayer, word, meaning, duumApplied, isCombo, true);
            }
          });
          return;
        }
      } else {
        proceedAfterWord(curPlayer, word, meaning, duumApplied, isCombo, false);
      }
    }

    // 사자성어 상대 1명 지목 모달 표시
    function showIdiomTargetModal(opponents, onTargetSelected) {
      const modal = document.getElementById('idiom-target-modal');
      const listContainer = document.getElementById('idiom-target-btn-list');
      listContainer.innerHTML = '';

      opponents.forEach(item => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'target-player-btn';
        btn.innerHTML = \`
          <span>\${item.player.avatar} \${item.player.name}</span>
          <span style="color:#EF4444; font-size:0.85rem;">HP \${item.player.hp} ➔ \${Math.max(0, item.player.hp - 10)}</span>
        \`;
        btn.onclick = () => {
          modal.classList.add('hidden');
          item.player.hp -= 10;
          showFloatingDamage(item.index, 10);
          sound.playDamage();
          if (item.player.hp <= 0) {
            item.player.hp = 0;
            item.player.alive = false;
          }
          updateScoreboardUI();
          showToast(\`🎯 \${item.player.name}님에게 사자성어 -10 HP 타격!\`, 'idiom');
          onTargetSelected();
        };
        listContainer.appendChild(btn);
      });

      modal.classList.remove('hidden');
    }

    function proceedAfterWord(curPlayer, word, meaning, duumApplied, isCombo, isIdiom) {
      // 한방단어 판별
      const isContinuable = checkContinuable(word);

      if (!isContinuable) {
        sound.playKiller();
        triggerVibrate([300, 100, 400]);
        triggerShake();

        appendPlayerWordBubble(curPlayer, word, meaning, duumApplied, isCombo, isIdiom, true);

        const victimIndex = getNextAliveIndex(gameState.currentTurnIndex);
        const victim = gameState.players[victimIndex];
        victim.hp = 0;
        victim.alive = false;
        showFloatingDamage(victimIndex, 'DEAD');
        updateScoreboardUI();

        const killerOverlay = document.getElementById('killer-overlay');
        document.getElementById('killer-desc-text').innerHTML = \`
          <strong>\${curPlayer.name}</strong>님이 한방단어 <strong>'\${word}'</strong>을(를) 던졌습니다!<br><br>
          뒤에 이을 단어가 사전에 전혀 없어, 다음 차례인 <strong>\${victim.name}</strong>님은 <strong>찬스를 쓸 틈도 없이 즉시 탈락(HP 0)</strong>했습니다! ☠️
        \`;
        killerOverlay.classList.remove('hidden');

        document.getElementById('btn-close-killer').onclick = () => {
          killerOverlay.classList.add('hidden');

          const alive = getAlivePlayers();
          if (alive.length <= 1) {
            endRound(alive[0], \`💥 한방단어로 마지막 생존자 결정!\`);
          } else {
            let newStarter = '';
            for (let attempt = 0; attempt < 50; attempt++) {
              const candidate = STARTER_WORDS[Math.floor(Math.random() * STARTER_WORDS.length)];
              if (checkContinuable(candidate) && !gameState.usedWords.has(candidate)) {
                newStarter = candidate;
                break;
              }
            }
            if (!newStarter) newStarter = '바다';

            gameState.usedWords.add(newStarter);
            gameState.currentWord = newStarter;

            appendSystemWordBubble(newStarter, getWordMeaning(newStarter));
            updateTargetChar(newStarter);

            const nextTurn = getNextAliveIndex(victimIndex);
            gameState.currentTurnIndex = nextTurn;
            triggerPassAndPlay(nextTurn, gameState.players[nextTurn]);
          }
        };
        return;
      }

      if (!isCombo && !isIdiom) sound.playSuccess();
      if (!isIdiom) {
        appendPlayerWordBubble(curPlayer, word, meaning, duumApplied, isCombo, isIdiom, false);
      }
      updateTargetChar(word);

      document.getElementById('word-input').value = '';

      const nextTurn = getNextAliveIndex(gameState.currentTurnIndex);
      const nextPlayer = gameState.players[nextTurn];
      triggerPassAndPlay(nextTurn, nextPlayer);
    }

    function eliminatePlayer(player, reason) {
      showToast(reason, 'error');

      const alive = getAlivePlayers();
      if (alive.length <= 1) {
        endRound(alive[0], reason);
      } else {
        const nextTurn = getNextAliveIndex(gameState.currentTurnIndex);
        gameState.currentTurnIndex = nextTurn;
        triggerPassAndPlay(nextTurn, gameState.players[nextTurn]);
      }
    }

    let passTimeout = null;

    function triggerPassAndPlay(nextTurn, nextPlayer) {
      sound.playPass();
      const overlay = document.getElementById('pass-overlay');
      document.getElementById('pass-next-avatar').textContent = nextPlayer.avatar;
      document.getElementById('pass-next-name').textContent = nextPlayer.name;
      document.getElementById('pass-target-char-val').textContent = gameState.targetChar;

      const pbar = document.getElementById('pass-progress-bar');
      pbar.style.transition = 'none';
      pbar.style.width = '100%';
      void pbar.offsetWidth;
      pbar.style.transition = 'width 1.2s linear';
      pbar.style.width = '0%';

      overlay.classList.remove('hidden');

      const finalizePass = () => {
        if (!overlay.classList.contains('hidden')) {
          overlay.classList.add('hidden');
          gameState.currentTurnIndex = nextTurn;
          startTurn();
        }
      };

      if (passTimeout) clearTimeout(passTimeout);
      passTimeout = setTimeout(finalizePass, 1250);

      overlay.onclick = () => {
        if (passTimeout) clearTimeout(passTimeout);
        finalizePass();
      };
    }

    /* 규칙 6: 찬스를 누르는 순간 즉시 찬스 횟수가 차감됨! */
    function useHint() {
      if (!gameState.isRoundActive || gameState.turnPending) return;
      const curPlayer = gameState.players[gameState.currentTurnIndex];
      if (curPlayer.chances <= 0) {
        showToast('남은 찬스가 없습니다!', 'error');
        return;
      }

      // 찬스를 누르는 순간 찬스 횟수 1회 즉시 차감! (규칙 6)
      curPlayer.chances -= 1;
      updateScoreboardUI();

      const possibleChars = gameState.duumVariants;
      let candidateWords = [];

      for (const char of possibleChars) {
        const list = WORDS_BY_FIRST_CHAR.get(char);
        if (list) {
          for (const w of list) {
            if (!gameState.usedWords.has(w)) {
              candidateWords.push(w);
            }
          }
        }
      }

      if (candidateWords.length === 0) {
        sound.playFail();
        triggerVibrate([300, 100, 300]);
        if (gameState.timerInterval) clearInterval(gameState.timerInterval);
        curPlayer.hp = 0;
        curPlayer.alive = false;
        updateScoreboardUI();
        eliminatePlayer(curPlayer, \`⚠️ 더 이상 이을 수 있는 단어가 사전에 없습니다! (\${curPlayer.name} 탈락)\`);
        return;
      }

      sound.playHint();
      const shortCandidates = candidateWords.filter(w => w.length <= 3);
      const pool = shortCandidates.length > 0 ? shortCandidates : candidateWords;
      const suggested = pool[Math.floor(Math.random() * pool.length)];

      document.getElementById('hint-suggested-word').textContent = suggested;
      document.getElementById('hint-suggested-meaning').textContent = '뜻: ' + getWordMeaning(suggested);
      const modal = document.getElementById('hint-modal');
      modal.classList.remove('hidden');

      const btnApply = document.getElementById('btn-apply-hint');
      btnApply.onclick = () => {
        modal.classList.add('hidden');
        document.getElementById('word-input').value = suggested;
        submitWord(suggested);
      };
    }

    /* 라운드 종료 및 승자 처리 */
    function endRound(winner, reason) {
      gameState.isRoundActive = false;
      gameState.turnPending = false;
      if (gameState.timerInterval) clearInterval(gameState.timerInterval);

      if (winner) {
        winner.score += 1;
      }

      updateScoreboardUI();

      const modal = document.getElementById('round-modal');
      document.getElementById('round-modal-title').textContent = \`\${gameState.currentRound}라운드 결과\`;
      document.getElementById('round-modal-desc').innerHTML = \`\${reason}<br><strong style="color:#10B981; font-size:1.15rem;">🎉 \${winner ? winner.name : '무승부'} 라운드 승리!</strong>\`;

      renderLeaderboard('round-leaderboard-list');

      const winTarget = Math.ceil(gameState.totalRounds / 2);
      const maxScore = Math.max(...gameState.players.map(p => p.score));
      const hasDefinitiveWinner = maxScore >= winTarget || gameState.currentRound >= gameState.totalRounds;

      const nextBtn = document.getElementById('btn-next-round');
      if (hasDefinitiveWinner) {
        nextBtn.textContent = '최종 결과 발표 🏆';
        nextBtn.onclick = () => {
          modal.classList.add('hidden');
          showGameOver();
        };
      } else {
        nextBtn.textContent = \`\${gameState.currentRound + 1}라운드 시작 ➔\`;
        nextBtn.onclick = () => {
          modal.classList.add('hidden');
          startRound(gameState.currentRound + 1);
        };
      }

      modal.classList.remove('hidden');
    }

    function renderLeaderboard(containerId) {
      const container = document.getElementById(containerId);
      container.innerHTML = '';

      const sorted = [...gameState.players].sort((a, b) => b.score - a.score);
      sorted.forEach((p, idx) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item' + (idx === 0 ? ' rank-1' : '');
        item.innerHTML = \`
          <div class="lb-left">
            <span class="lb-rank">\${idx + 1}위</span>
            <span class="lb-avatar">\${p.avatar}</span>
            <span class="lb-name">\${p.name}</span>
          </div>
          <span class="lb-score">\${p.score}승 (HP: \${p.hp})</span>
        \`;
        container.appendChild(item);
      });
    }

    function showGameOver() {
      sound.playVictory();
      confetti.start();

      const sorted = [...gameState.players].sort((a, b) => b.score - a.score);
      const topWinner = sorted[0];

      document.getElementById('final-winner-avatar').textContent = topWinner.avatar;
      document.getElementById('final-winner-name').textContent = topWinner.name;
      document.getElementById('final-winner-score').textContent = \`총 \${topWinner.score}승으로 최종 우승!\`;

      renderLeaderboard('final-leaderboard-list');

      const modal = document.getElementById('gameover-modal');
      modal.classList.remove('hidden');
    }

    /* ==========================================
       7. 이벤트 바인딩 및 초기화
       ========================================== */
    window.addEventListener('DOMContentLoaded', () => {
      function setupChipGroup(groupId, onChange) {
        const group = document.getElementById(groupId);
        group.querySelectorAll('.chip-btn').forEach(btn => {
          btn.onclick = () => {
            group.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            onChange(btn);
          };
        });
      }

      setupChipGroup('player-count-chips', btn => {
        gameState.playerCount = parseInt(btn.dataset.count, 10);
        renderPlayersSetup();
      });

      renderPlayersSetup();

      setupChipGroup('rounds-chip-group', btn => {
        document.getElementById('custom-rounds-input').value = '';
        gameState.totalRounds = parseInt(btn.dataset.rounds, 10);
      });

      document.getElementById('custom-rounds-input').addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 1) {
          document.getElementById('rounds-chip-group').querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
          gameState.totalRounds = Math.min(val, 20);
        }
      });

      setupChipGroup('chances-chip-group', btn => {
        gameState.maxChances = parseInt(btn.dataset.chances, 10);
      });

      setupChipGroup('timer-chip-group', btn => {
        gameState.timeLimit = parseInt(btn.dataset.time, 10);
      });

      document.getElementById('btn-start-game').onclick = startNewGame;

      document.getElementById('btn-show-rules').onclick = () => {
        document.getElementById('rules-modal').classList.remove('hidden');
      };
      document.getElementById('btn-close-rules').onclick = () => {
        document.getElementById('rules-modal').classList.add('hidden');
      };

      document.getElementById('btn-close-hint').onclick = () => {
        document.getElementById('hint-modal').classList.add('hidden');
      };

      document.getElementById('btn-exit-to-setup').onclick = () => {
        if (confirm('현재 게임을 중단하고 설정 화면으로 돌아가시겠습니까?')) {
          if (gameState.timerInterval) clearInterval(gameState.timerInterval);
          gameState.isRoundActive = false;
          showScreen('setup-screen');
        }
      };

      const soundBtn = document.getElementById('btn-toggle-sound');
      soundBtn.onclick = () => {
        sound.enabled = !sound.enabled;
        soundBtn.textContent = sound.enabled ? '🔊' : '🔇';
        showToast(sound.enabled ? '효과음 켜짐' : '효과음 꺼짐', 'info');
      };

      document.getElementById('word-form').onsubmit = (e) => {
        e.preventDefault();
        submitWord();
      };

      document.getElementById('btn-use-hint').onclick = useHint;

      document.getElementById('btn-reset-word').onclick = requestNewWord;

      document.getElementById('btn-surrender').onclick = () => {
        if (!gameState.isRoundActive || gameState.turnPending) return;
        const curPlayer = gameState.players[gameState.currentTurnIndex];
        if (confirm(\`\${curPlayer.name}님, 이번 라운드를 기권하시겠습니까?\`)) {
          sound.playDamage();
          curPlayer.hp = 0;
          curPlayer.alive = false;
          updateScoreboardUI();
          eliminatePlayer(curPlayer, \`🏳️ \${curPlayer.name}님의 기권 탈락!\`);
        }
      };

      document.getElementById('btn-rematch').onclick = () => {
        confetti.stop();
        document.getElementById('gameover-modal').classList.add('hidden');
        gameState.players.forEach(p => p.score = 0);
        gameState.currentRound = 1;
        gameState.roundStarterIndex = 0;
        startRound(1);
      };

      document.getElementById('btn-go-setup').onclick = () => {
        confetti.stop();
        document.getElementById('gameover-modal').classList.add('hidden');
        showScreen('setup-screen');
      };

      const wordInput = document.getElementById('word-input');
      wordInput.addEventListener('input', (e) => {
        const filtered = e.target.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, '');
        if (e.target.value !== filtered) {
          e.target.value = filtered;
        }
      });
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html upgraded with idioms, definitions, 3-char combo, 5s -5HP, fixed topbar, and instant hint deduction! Size:', fs.statSync('index.html').size, 'bytes');
