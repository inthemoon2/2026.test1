// 문항 표시용 데이터 (정답은 서버 Code.gs 에만 있습니다)
// 블록 종류: {p:'문장(HTML)'}, {code:[[줄 조각들]]}, {fig:'그림 이름'}, {out:'출력 텍스트'}, {tb:'키', label:'안내'}
// 줄 조각: 문자열 | {b:'키', rows:줄수} (입력 네모칸) | {c:'주석'}
(function () {
  var Q = [];
  function add(n, area, lvl, blocks) { Q.push({ n: n, area: area, lvl: lvl, blocks: blocks }); }

  window.AREA_NAMES = ['문제 정의 및 데이터 수집', '탐색적 데이터 분석', '데이터 전처리', '핵심 속성 추출'];
  var S = "'culmen_length_mm','culmen_depth_mm','flipper_length_mm','body_mass_g'";

  // ---------- 영역 1 ----------
  add(1, 0, 1, [
    { p: '데이터 프레임을 다루는 라이브러리를 불러오는 코드입니다. 네모칸에 <b>라이브러리 이름</b>을 쓰시오.' },
    { code: [['import ', { b: 'a' }, ' as pd']] }
  ]);
  add(2, 0, 2, [
    { p: '같은 폴더의 <code>penguins_size.csv</code> 파일을 읽어 데이터 프레임 <code>df</code>를 만든다. (pandas는 <code>pd</code>로 불러와 있다) <b>파일명을 제외한 부분</b>을 작성하시오.' },
    { code: [[{ b: 'a' }, "('penguins_size.csv')"]] }
  ]);
  add(3, 0, 2, [
    { p: '데이터 프레임 <code>df</code>의 <b>처음 5행</b>을 출력하는 코드를 쓰시오. 실행 결과는 아래와 같다.' },
    { fig: 'head' },
    { code: [[{ b: 'a' }]] }
  ]);

  // ---------- 영역 2 ----------
  add(4, 1, 2, [
    { p: '데이터 프레임 <code>df</code>의 <b>속성 이름, 값 개수(non-null), 자료형</b>을 한눈에 확인하는 코드를 쓰시오.' },
    { code: [[{ b: 'a' }]] }
  ]);
  add(5, 1, 3, [
    { p: '데이터의 개수, 평균, 표준편차, 최솟값, 사분위수, 최댓값을 <b>한 번에 요약</b>해서 보여주는 코드를 쓰시오. 실행 결과는 아래와 같다.' },
    { fig: 'describe' },
    { code: [[{ b: 'a' }]] }
  ]);
  add(6, 1, 4, [
    { p: '시각화 라이브러리를 아래와 같이 불러왔다. 펭귄 종(<code>species</code>)별 데이터 수를 아래 <b>막대그래프</b>로 그리는 코드를 쓰시오.' },
    { code: [['import seaborn as sns']] },
    { fig: 'bar' },
    { code: [[{ b: 'a' }]] }
  ]);

  // ---------- 영역 3 ----------
  add(7, 2, 3, [
    { p: '속성별로 NaN(비어 있는 값)의 개수를 확인한 결과는 아래와 같다. NaN이 있는 <b>행</b>을 삭제하고 그 결과를 다시 <code>df</code>에 저장하는 코드를 쓰시오. 삭제 후 <code>df.shape</code>의 결과는 <code>(334, 7)</code>이다.' },
    { out: 'species              0\nisland               0\nculmen_length_mm     2\nculmen_depth_mm      2\nflipper_length_mm    2\nbody_mass_g          2\nsex                 10' },
    { code: [[{ b: 'a' }]] }
  ]);
  add(8, 2, 4, [
    { p: '<code>sex</code> 속성의 <b>고유한 값의 종류</b>를 출력했더니 아래와 같은 결과가 나왔다.' },
    { out: "array(['MALE', 'FEMALE', '.'], dtype=object)" },
    { p: '(가) 고유한 값의 종류를 출력하는 코드를 완성하시오.' },
    { code: [["df['sex'].", { b: 'a' }]] },
    { p: '(나) 위 결과에서 <code>\'.\'</code>을 이상치라고 판단한 <b>이유</b>를 쓰시오.' },
    { tb: 'b', label: '이유를 문장으로 쓰세요.' }
  ]);
  add(9, 2, 4, [
    { p: '최소-최대 정규화 객체 <code>scaler</code>가 이미 만들어져 있다. 부리 길이·부리 깊이·날개 길이·체질량 4개 속성을 정규화하여 <b>같은 열에 다시 저장</b>한다. 등호(<code>=</code>) <b>오른쪽</b>을 쓰시오.' },
    { code: [["df[[" + S + "]] =", { b: 'a', rows: 3 }]] }
  ]);

  // ---------- 영역 4 ----------
  add(10, 3, 3, [
    { p: '시각화 라이브러리는 <code>sns</code>로 불러와 있다. 부리 길이(x: <code>culmen_length_mm</code>)와 부리 깊이(y: <code>culmen_depth_mm</code>)의 산점도를 그리되, <b>종(<code>species</code>)에 따라 점의 색을 구분</b>한다. 데이터는 <code>df</code>를 사용한다. 아래 그림이 실행 결과이다.' },
    { fig: 'scatterSpecies' },
    { code: [['sns.', { b: 'a' }, ", hue='species')"]] }
  ]);
  add(11, 3, 4, [
    { p: '부리 길이(x: <code>culmen_length_mm</code>)와 체질량(y: <code>body_mass_g</code>)의 산점도에 <b>회귀선을 함께</b> 그리고, 색은 <code>\'green\'</code>으로 한다. 데이터는 <code>df</code>를 사용한다. 아래 그림이 실행 결과이다.' },
    { fig: 'reg' },
    { code: [['sns.', { b: 'a' }, ", color='green')"]] }
  ]);
  add(12, 3, 4, [
    { p: '데이터 프레임의 수치형 속성 사이의 <b>상관계수를 계산하는 부분</b>을 쓰시오. 이 값을 숫자가 보이는 히트맵으로 그린 결과가 아래 그림이다.' },
    { fig: 'heat' },
    { code: [['sns.heatmap(', { b: 'a' }, ", annot=True, cmap='Greens')"]] }
  ]);

  window.QUESTIONS = Q;
})();
