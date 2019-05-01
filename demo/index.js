/* eslint-disable no-underscore-dangle */
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
    const data = json.map((d) => {
      const flatData = {
        name: d.lawyer.name,
        address: d.lawyer.address && d.lawyer.address.jibun,
        company: d.lawyer.company,
        username: d.username,
        email: d.email,
        virtualPhone: d.lawyer.virtualPhone,
        officePhone: d.lawyer.officePhone,
        createdAt: d.createdAt,
        agreementKin: d.lawyer.agreement && d.lawyer.agreement.kin,
        naverId: d.lawyer.naverId,
        role: d.role,
        activation: d.lawyer.flag.activation,
        isSendSchedule: d.lawyer.isSendSchedule,
        advice: d.lawyer.advice,
        phoneFee: d.lawyer.adviceFee.phone,
        visitingFee: d.lawyer.adviceFee.visiting,
        percentage: d.lawyer.writeRate.percentage,
        photoOriginal: d.lawyer.photoOriginal,
        newbie: d.lawyer.flag.newbie,
        profileEdit: d.lawyer._id
      };
      return flatData;
    });
    const columns = [
      {
        title: 'No',
        field: 'gg-origin-index',
        width: 60,
        value: (v) => v || 0
      },
      {
        title: '이름',
        field: 'name',
        width: 60
      },
      {
        title: '주소',
        field: 'address'
      },
      {
        title: '사무소명',
        field: 'company'
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
        field: 'virtualPhone',
        width: 120
      },
      {
        title: '사무소번호',
        field: 'officePhone',
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
        field: 'agreementKin',
        width: 65,
        value: (v) => (!!v).toString().toUpperCase()
      },
      {
        title: '네이버ID',
        field: 'naverId',
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
        field: 'activation',
        width: 65,
        value: (v) => (!!v).toString().toUpperCase()
      },
      {
        title: 'SMS전송',
        field: 'isSendSchedule',
        width: 65,
        value: (v) => (!!v).toString().toUpperCase()
      },
      {
        title: '유료상담',
        field: 'advice',
        width: 65,
        value: (v) => (!!v).toString().toUpperCase()
      },
      {
        title: '전화상담',
        field: 'phoneFee',
        width: 60,
        value: (v) => v || 0
      },
      {
        title: '방문상담',
        field: 'visitingFee',
        width: 60,
        value: (v) => v || 0
      },
      {
        title: '작성률',
        field: 'percentage',
        width: 60,
        value: (v) => `${v}%`
      },
      {
        title: '사진',
        field: 'photoOriginal',
        width: 65,
        value: (v) => {
          const hasPicture = v.indexOf('uploads/') !== -1;
          return (!!hasPicture).toString().toUpperCase();
        }
      },
      {
        title: '신규소개',
        field: 'newbie',
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
        field: 'profileEdit',
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
