import gg from '../src/gg.js';
import props from '../src/sampleProps';

const container = document.querySelector('#grid');

function paddy(num, padlen, padchar) {
  const padChar = typeof padchar !== 'undefined' ? padchar : '0';
  const pad = new Array(1 + padlen).join(padChar);
  return (pad + num).slice(-pad.length);
}

fetch('https://www.lawtalk.co.kr/api/user/lawyers')
  .then((res) => res.json())
  .then((json) => {
    const data = json;
    const columns = [
      {
        title: 'No',
        field: 'gg-origin-index',
        width: 60,
        value: (v) => v || 0
      },
      {
        title: '이름',
        field: 'lawyer.name',
        width: 60
      },
      {
        title: '주소',
        field: 'lawyer.address.jibun'
      },
      {
        title: '사무소명',
        field: 'lawyer.company'
      },
      {
        title: '아이디',
        field: 'username',
        width: 120
      },
      {
        title: '이메일주소',
        field: 'email'
      },
      {
        title: '050번호',
        field: 'lawyer.virtualPhone',
        width: 120
      },
      {
        title: '사무소번호',
        field: 'lawyer.officePhone',
        width: 120
      },
      {
        title: '가입일',
        field: 'createdAt',
        width: 140,
        value: (v) => {
          const dt = new Date(v);
          const year = dt.getFullYear();
          const month = paddy(dt.getMonth() + 1, 2);
          const date = paddy(dt.getDate(), 2);
          const hour = paddy(dt.getHours(), 2);
          const min = paddy(dt.getMinutes(), 2);
          const createdAt = `${year}-${month}-${date} ${hour}:${min}`;
          return createdAt;
        }
      },
      {
        title: '지식인',
        field: 'lawyer.agreement.kin',
        width: 65,
        value: (v) => (!!v).toString().toUpperCase()
      },
      {
        title: '네이버ID',
        field: 'lawyer.naverId',
        width: 100
      },
      {
        title: '가입승인',
        field: 'role',
        width: 65,
        value: (v) => (v === 'lawyer' ? '완료' : '대기')
      },
      {
        title: '계정활성',
        field: 'lawyer.flag.activation',
        width: 65,
        value: (v) => (!!v).toString().toUpperCase()
      },
      {
        title: 'SMS전송',
        field: 'lawyer.isSendSchedule',
        width: 65,
        value: (v) => (!!v).toString().toUpperCase()
      },
      {
        title: '유료상담',
        field: 'lawyer.flag.advice',
        width: 65,
        value: (v) => (!!v).toString().toUpperCase()
      },
      {
        title: '전화상담',
        field: 'lawyer.adviceFee.phone',
        width: 60,
        value: (v) => v || 0
      },
      {
        title: '방문상담',
        field: 'lawyer.adviceFee.visiting',
        width: 60,
        value: (v) => v || 0
      },
      {
        title: '작성률',
        field: 'lawyer.writeRate.percentage',
        width: 60,
        value: (v) => `${v}%`
      },
      {
        title: '사진',
        field: 'lawyer.photoOriginal',
        width: 65,
        value: (v) => {
          const hasPicture = v.indexOf('uploads/') !== -1;
          return (!!hasPicture).toString().toUpperCase();
        }
      },
      {
        title: '신규소개',
        field: 'lawyer.flag.newbie',
        width: 60,
        align: 'center',
        value: (v) => {
          if (v === true) {
            return 'ON';
          }
          if (v === false) {
            return 'OFF';
          }
          return '-';
        }
      },
      {
        title: '프로필수정',
        field: 'lawyer._id',
        width: 80,
        align: 'center',
        sortable: false,
        cellTemplate: (v) => `<a href="${v}" class="gotoProfileBtn">수정하기</a>`
      }
    ];
    const sGrid = gg({
      target: container,
      ...props,
      columns,
      data, // : data.slice(0, 100),
      height: 600
    });
    console.log('sGrid :', sGrid);
  });
