// DOM 요소 가져오기
const testRight = document.querySelector('.benefit_right'); // test_right 컨테이너
const liElements = testRight.querySelectorAll('ul:first-child > li'); // 첫 번째 ul의 li들
const secondUl = testRight.querySelector('ul:last-child'); // 두 번째 ul
const imgBox = document.querySelector('.img_box img'); // 이미지 요소

// benefit 데이터
const benefit = [
    {
        imgsrc: './images/content01/benefit01.png',
        text: `
                <li>· 최고 사이즈 HOT=Regular, ICED= Large (단, 아이스는 6종에 한함)</li>
            `,
    },
    {
        imgsrc: './images/content01/benefit02.png',
        text: `
                <li>· 1만원 충전 2회는 제공되지 않습니다.</li>
                <li>· HOT/ ICED 선택 가능합니다.</li>
                <li>· 퍼플멤버스에 등록된 카드로 구매하실 경우에만 쿠폰적용 혜택을 받으실 수 있습니다.</li>
            `,
    },
    {
        imgsrc: './images/content01/benefit03.png',
        text: `
                <li>· 1만원 충전 3회는 제공되지 않습니다.</li>
                <li>· 바리스타가 직접 제조한 음료에만 사용 가능합니다. (빙수, 병음료, MD, 사이드 메뉴 제외)</li>
                <li>· (S)사이즈 음료에만 사용 가능하며, (R)사이즈가 최소일 시 (R)사이즈가 적용됩니다.</li>
                <li>· 퍼플멤버스에 등록된 카드로 구매하실 경우에만 쿠폰적용 혜택을 받으실 수 있습니다.</li>
            `,
    },
    {
        imgsrc: './images/content01/benefit04.png',
        text: `
                <li>· 제조음료 1잔당 스탬프 1개가 적립됩니다. (빙수, 병음료, MD, 사이드 메뉴 제외)</li>
                <li>· HOT/ ICED 선택 가능합니다.</li>
                <li>· 스탬프 10개 적립 시, 보유한 바코드를 매장에 제시한 후 무료음료 혜택을 받으실 수 있습니다.</li>
            `,
    },
];

// 클릭 이벤트 핸들러 추가
liElements.forEach((li, index) => {
    li.addEventListener('click', () => {
        // 모든 li에서 on 클래스 제거
        liElements.forEach(el => el.classList.remove('on'));
        
        // 클릭된 li에 on 클래스 추가
        li.classList.add('on');

        // 이미지 교체 애니메이션
        imgBox.classList.add('fade-out');
        setTimeout(() => {
            imgBox.src = benefit[index].imgsrc;
            imgBox.classList.remove('fade-out');
        }, 300);

        // 두 번째 ul의 내용 변경 애니메이션
        secondUl.classList.add('fade-out');
        setTimeout(() => {
            secondUl.innerHTML = benefit[index].text;
            secondUl.classList.remove('fade-out');
        }, 300);
    });
});
