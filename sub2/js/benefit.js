// DOM 요소 가져오기
const tabs = document.querySelectorAll('.tab'); // 모든 탭
const benefitBoxes = document.querySelectorAll('.benefit_box'); // 모든 benefit_box

// 초기화: 첫 번째 탭 활성화
function initTabs() {
    tabs.forEach((tab, index) => {
        const gradientColor = tab.getAttribute('data-color-gradient'); // 탭의 data-color-gradient 값

        // 첫 번째 탭과 박스 활성화
        if (index === 0) {
            tab.classList.add('active', 'neon');
            // tab.style.background = gradientColor; // 초기 배경 색상 설정
            benefitBoxes[index].style.display = 'block';

            // 첫 번째 탭의 그라데이션 색상으로 img_box 초기화
            const imgBox = benefitBoxes[index].querySelector('.benefit_left .img_box');
            imgBox.style.setProperty('--img-box-gradient', gradientColor);
        } else {
            tab.style.background = ''; // 초기 배경 제거
            benefitBoxes[index].style.display = 'none';
        }
    });

    // 첫 번째 탭 데이터 로드
    updateSecondUl(0);
}

// 탭 클릭 이벤트 핸들러
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        const gradientColor = tab.getAttribute('data-color-gradient'); // 클릭된 탭의 data-color-gradient 값

        // 모든 탭의 on 클래스 제거 및 배경 초기화
        tabs.forEach(t => {
            t.classList.remove('active', 'neon');
            // t.style.background = ''; // 배경 색상 초기화
        });

        // 클릭된 탭에 on 클래스 추가 및 배경 그라데이션 적용
        tab.classList.add('active', 'neon');
        // tab.style.background = gradientColor;

        // 모든 benefit_box 숨기기
        benefitBoxes.forEach(box => {
            box.style.display = 'none';
            box.classList.remove('fade-in');
        });

        // 클릭된 탭에 해당하는 benefit_box 표시
        const currentBox = benefitBoxes[index];
        currentBox.style.display = 'block';

        // 클릭된 탭의 그라데이션 색상으로 .img_box::before 색상 변경
        const imgBox = currentBox.querySelector('.benefit_left .img_box');
        imgBox.style.setProperty('--img-box-gradient', gradientColor);

        // 애니메이션 효과 추가
        setTimeout(() => {
            currentBox.classList.add('fade-in');
        }, 50);

        // 해당 탭의 두 번째 ul에 데이터 적용
        updateSecondUl(index);
    });
});

// benefit 데이터 (탭별 데이터 설정)
const benefitData = [
    // Family Club 데이터
    [
        {
            imgsrc: `./images/content02/benefit02.png`,
            text: `
                <li>· 퍼플멤버스에 등록된 카드로 구매하실 경우에만 쿠폰적용 혜택을 받으실 수 있습니다.</li>
                <li>· 바리스타가 직접 제조한 음료에만 사용 가능합니다. (빙수, 병음료, MD, 사이드 메뉴 제외)</li>
                <li>· (S)사이즈 음료에만 사용 가능하며, (R)사이즈가 최소일 시 (R)사이즈가 적용됩니다.</li>
            `,
        },
        {
            imgsrc: `./images/content02/benefit03.png`,
            text: `
                <li>· 바리스타가 직접 제조한 메뉴에 한해 샷, 휘핑크림, 소스 혜택이 제공됩니다.
                <br>(단, 사이즈업은 불가)</li>
            `,
        },
        {
            imgsrc: `./images/content02/benefit01.png`,
            text: `
                <li>· 바리스타가 직접 제조한 메뉴에 한해 SIZE UP 혜택을 드립니다.</li>
                <li>· 최고 사이즈 HOT=Regular, ICED= Large (단, 아이스는 6종에 한함)</li>
            `,
        },
    ],
    // Gold Club 데이터
    [
        {
            imgsrc: `./images/content02/benefit02.png`,
            text: `
                <li>· 퍼플멤버스에 등록된 카드로 구매하실 경우에만 쿠폰적용 혜택을 받으실 수 있습니다.</li>
                <li>· 바리스타가 직접 제조한 음료에만 사용 가능합니다. (빙수, 병음료, MD, 사이드 메뉴 제외)</li>
                <li>· (S)사이즈 음료에만 사용 가능하며, (R)사이즈가 최소일 시 (R)사이즈가 적용됩니다.</li>
            `,
        },
        {
            imgsrc: `./images/content02/benefit04.png`,
            text: `
                <li>· 허니버터브래드 6종 중 택1 가능합니다.
                <br>(오리진, 파마산, 라즈베리크림, 초콜릿, 애플시나몬, 피넛버터 중 택1 가능)</li>
            `,
        },
        {
            imgsrc: `./images/content02/benefit01.png`,
            text: `
                <li>· 최고 사이즈 HOT=Regular, ICED= Large
                <br>(단, 아이스는 6종에 한함)</li>
            `,
        },
    ],
    // Purpler Club 데이터
    [
        {
            imgsrc: `./images/content02/benefit06.png`,
            text: `
                <li>· 발급 기준일 이후 등급업이 되면 혜택을 받을 수 없습니다.</li>
                <li>· 생일 이후 가입된 고객과 탈퇴 후 재가입한 회원에게는 발급되지 않습니다.</li>
                <li>· 최초 충전 이후에만 사용가능하며, 카드 미 충전시 사용 불가합니다.<br>(최초 충전 5,000원부터 가능)</li>
            `,
        },
        {
            imgsrc: `./images/content02/benefit03.png`,
            text: `
                <li>· 바리스타가 직접 제조한 메뉴에 한해 샷, 휘핑크림, 소스 혜택 제공됩니다.<br>(단, 사이즈업은 불가)</li>
                <li>· 쿠폰으로 발급되지 않으며, 주문시 매장 바리스타에게 직접 요청하여 혜택을 받을 수 있습니다.</li>
            `,
        },
        {
            imgsrc: `./images/content02/benefit05.png`,
            text: `
                <li>· 바리스타가 직접 제조한 음료에만 사용 가능합니다. (빙수, 병음료, MD, 사이드 메뉴 제외)</li>
                <li>· (S)사이즈 음료에만 사용 가능하며, (R)사이즈가 최소일 시 (R)사이즈가 적용됩니다.</li>
                <li>· 해당월 1일 발급되며, 1일 이후 등급업이 되면 익월부터 혜택이 적용됩니다.</li>
                <li>· 쿠폰 유효기간은 월별로 일수가 다르므로 해당 월에 따라 유효기간이 달라질 수 있습니다.</li>
            `,
        },
        {
            imgsrc: `./images/content02/benefit02.png`,
            text: `
                <li>· HOT/ ICED 선택 가능합니다.</li>
                <li>· 해당월 1일 발급되며, 1일 이후 등급업이 되면 익월부터 혜택이 적용됩니다.</li>
                <li>· 쿠폰 유효기간은 월별로 일수가 다르므로 해당 월에 따라 유효기간이 달라질 수 있습니다.</li>
            `,
        },
    ],
];

// 각 탭의 두 번째 ul 데이터 갱신
function updateSecondUl(tabIndex) {
    const benefitBox = benefitBoxes[tabIndex]; // 현재 탭의 benefit_box
    const imgBox = benefitBox.querySelector('.img_box img'); // 이미지 요소
    const secondUl = benefitBox.querySelector('ul:last-child'); // 두 번째 ul

    // 해당 탭의 데이터 가져오기
    const benefits = benefitData[tabIndex];

    // 이벤트 위임으로 li 클릭 동작 설정
    benefitBox.addEventListener('click', (event) => {
        const li = event.target.closest('li'); // 클릭된 li
        if (!li) return; // li가 아니면 반환

        const liElements = benefitBox.querySelectorAll('ul:first-child > li'); // 첫 번째 ul의 li

        // 클릭된 li의 인덱스 확인
        const index = Array.from(liElements).indexOf(li);
        if (index === -1) return; // 유효하지 않은 클릭

        // 모든 li의 on 클래스 제거
        liElements.forEach(el => el.classList.remove('on'));

        // 클릭된 li에 on 클래스 추가
        li.classList.add('on');

        // 이미지 및 두 번째 ul 업데이트
        imgBox.classList.add('fade-out');
        secondUl.classList.add('fade-out');

        setTimeout(() => {
            imgBox.src = benefits[index].imgsrc; // 이미지 업데이트
            secondUl.innerHTML = benefits[index].text; // 내용 업데이트

            imgBox.classList.remove('fade-out');
            secondUl.classList.remove('fade-out');
        }, 300);
    });

    // 초기 상태: 첫 번째 데이터 적용
    const firstLi = benefitBox.querySelector('ul:first-child > li:first-child');
    if (firstLi) firstLi.click();
}

// 초기 설정 호출
initTabs();