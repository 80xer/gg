const columns = [
  {
    title: 'ID',
    name: 'id',
    width: 40
  },
  {
    title: '도시',
    name: 'city',
    width: 80,
    filter: true
  },
  {
    title: '이름',
    name: 'name',
    width: 80,
    filter: true
  },
  {
    title: '성별',
    name: 'gender',
    width: 60,
    filter: true
  },
  {
    title: '취미',
    name: 'hobby'
  },
  {
    title: '별명',
    name: 'nickName'
  },
  {
    title: '전화번호',
    name: 'phone'
  }
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createData = () => {
  const len = 100;
  const data = [];
  const cities = [
    '서울',
    '인천',
    '평택',
    '수원',
    '부산',
    '포항',
    '울산',
    '부천',
    '속초',
    '영월',
    '오산',
    '통영',
    '제주',
    '서귀포'
  ];
  const lastName = ['김', '이', '박', '최', '오', '정', '송', '권', '정', '한', '유'];
  const firstName1 = [
    '강',
    '유',
    '조',
    '수',
    '선',
    '홍',
    '동',
    '민',
    '유',
    '우',
    '철',
    '기',
    '본',
    '재',
    '시',
    '기',
    '주',
    '회',
    '지',
    '여'
  ];
  const firstName2 = [
    '은',
    '대',
    '훈',
    '연',
    '규',
    '정',
    '성',
    '환',
    '자',
    '봉',
    '미',
    '진',
    '형',
    '쁨',
    '철',
    '준',
    '미',
    '섭',
    '현'
  ];
  const gender = ['남', '여'];
  const hobbies = [
    '독서',
    '영화감상',
    '음악감상',
    '게임',
    '수영',
    '축구',
    '야구시청',
    '여행',
    '음주',
    '가무',
    '헬스',
    '다이어트',
    '달리기'
  ];

  const nick1 = [
    '즐거운',
    '화난',
    '이상한',
    '기쁜',
    '목마른',
    '배부른',
    '뚱뚱한',
    '멍때리는',
    '성격급한',
    '차가운',
    '따뜻한',
    '커피광',
    '게임폐인',
    '영화광',
    '고지식한',
    '재미없는',
    '갑갑한',
    '답답한',
    '바보같은',
    '똘똘한',
    '천재적인',
    '짱',
    '짱나는',
    '짜치는'
  ];

  const nick2 = [
    '아저씨',
    '아재',
    '오빠',
    '오라버니',
    '아지매',
    '아줌마',
    '누나',
    '검사',
    '변호사',
    '변태',
    '아이언맨',
    '놈',
    '녀석',
    '청년',
    '학생',
    '막대기',
    '비디오',
    '담배',
    '목소리',
    '눈빛',
    '신발',
    '가방',
    '티셔츠',
    '바지',
    '반바지',
    '청바지',
    '주방장',
    '프로그래머',
    '디자이너',
    '기획자',
    'CEO'
  ];

  function createName() {
    const ln = lastName[getRandomInt(0, lastName.length - 1)];
    const fn1 = firstName1[getRandomInt(0, firstName1.length - 1)];
    const fn2 = firstName2[getRandomInt(0, firstName2.length - 1)];
    return ln + fn1 + fn2;
  }

  function createNickName() {
    const n1 = nick1[getRandomInt(0, nick1.length - 1)];
    const n2 = nick2[getRandomInt(0, nick2.length - 1)];
    return `${n1} ${n2}`;
  }

  function createPhoneNumber() {
    const n1 = getRandomInt(0, 9);
    const n2 = getRandomInt(0, 9);
    const n3 = getRandomInt(0, 9);
    const n4 = getRandomInt(0, 9);
    const n5 = getRandomInt(0, 9);
    const n6 = getRandomInt(0, 9);
    const n7 = getRandomInt(0, 9);
    const n8 = getRandomInt(0, 9);

    return `010-${n1}${n2}${n3}${n4}-${n5}${n6}${n7}${n8}`;
  }

  for (let i = 0; i < len; i += 1) {
    data.push({
      id: i + 1,
      city: cities[getRandomInt(0, cities.length - 1)],
      name: createName(),
      nickName: createNickName(),
      gender: gender[getRandomInt(0, gender.length - 1)],
      hobby: hobbies[getRandomInt(0, hobbies.length - 1)],
      phone: createPhoneNumber()
    });
  }
  return data;
};
const data = createData();

const props = {
  columns,
  data
};
export default props;
