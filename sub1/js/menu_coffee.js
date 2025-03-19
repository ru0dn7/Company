$(function () {

    $.ajax({
        url: './js/menu.json',
        dataType: 'json',
        success: function (data) {
            var useData = data.menu_coffee; // event.json의 모든 상품 배열

            function dataPrint(arr) {
                if (arr.length === 0) { // 검색 결과가 없을 때
                    $('.menu_wrap').html(`<div class="menu_box none"><p>"${$('#keyword').val()}"에 대한 검색 결과가 없습니다.</p></div>`);
                    $('.cnt_total').text(`총 0건`);
                    return;
                }

                let txt = `<ul class="menu_box">`;

                arr.forEach((item, i) => { // 검색된 배열에 맞는 index 사용
                    const $event_tit = item.event_tit;
                    const $writer = item.writer;
                    const $Image = item.Image;
                    const $menu_kr = item.menu_kr;
                    const $menu_eng = item.menu_eng;

                    // "hit" 및 "best" 체크
                    const hitClass = item.hit ? "hit" : "";
                    const bestClass = item.best ? "best" : "";

                    txt += `
            <li data-index="${i}" class="${hitClass} ${bestClass}"> <!-- index는 필터링된 데이터 기준 -->
                <a href="#">
                    <img src="${$Image}" alt="${$event_tit}">
                    <dl>
                        <dt>${$menu_kr}</dt>
                        <dd>${$menu_eng}</dd>
                    </dl>
                </a>
                ${item.hit ? '<span class="badge hit">HIT</span>' : ''}
                ${item.best ? '<span class="badge best">BEST</span>' : ''}
            </li>`;
                });

                txt += `</ul>`;

                $('.menu_wrap').html(txt); // class가 event_wrap인 곳에 출력
                $('.cnt_total').text(`총 ${arr.length}건`);
            }


            // 초기 실행, 함수 호출
            dataPrint(useData);

            $('.btn_search').click(function (e) { // 검색 버튼을 클릭하면
                e.preventDefault();

                // 입력값 확인
                if ($('#keyword').val().trim() === '') {
                    alert('검색어를 입력해주세요.');
                    return;
                }

                // 필터링된 데이터 생성
                const newArray = useData.filter(element => element.menu_kr.includes($('#keyword').val()));

                // 필터링된 데이터로 리스트 출력
                dataPrint(newArray);

                // 필터링된 데이터를 팝업에 연결
                $('.menu_box').data('filteredData', newArray);
            });

            $('.btn_all').click(function (e) { // 전체 보기
                e.preventDefault();
                dataPrint(useData);
                $('#keyword').val(''); // 입력 필드 초기화

                // 전체 데이터로 팝업에 연결
                $('.menu_box').data('filteredData', useData);
            });

            // 팝업 동작
            $(document).on('click', '.menu_box li', function (e) {
                e.preventDefault();

                // 현재 필터링된 데이터를 가져옴
                const filteredData = $('.menu_box').data('filteredData') || useData;

                // 클릭한 li의 data-index 값을 가져옴
                let index = $(this).data('index');
                const showPopup = () => {
                    const selectedEvent = filteredData[index]; // 필터링된 데이터 기준으로 팝업 표시

                    // 팝업 내용 생성
                    const popupContent = `
            <div class="popup_overlay">
                <div class="popup">
                    <button class="popup_close"><i class="fa-solid fa-xmark"></i></button>
                    <div class="popup_content">
                        <button class="popup_prev"><i class="fa-solid fa-arrow-left"></i></button>
                        <div class="popup_main">
                            <strong>${selectedEvent.menu_kr}</strong>
                            <span>${selectedEvent.menu_eng}</span>
                            <img src="${selectedEvent.Image}" alt="${selectedEvent.menu_kr}">
                            <p>${selectedEvent.info}</p>
                        </div>
                        <button class="popup_next"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        `;

                    // 기존 팝업 제거하고 새 팝업 표시
                    $('.popup_overlay').remove();
                    $('body').append(popupContent);
                };

                // 초기 팝업 표시
                showPopup();

                // 이전 버튼
                $(document).on('click', '.popup_prev', function () {
                    index = (index > 0) ? index - 1 : filteredData.length - 1; // 첫 번째 항목에서 이전 버튼 클릭 시 마지막으로 이동
                    showPopup();
                });

                // 다음 버튼
                $(document).on('click', '.popup_next', function () {
                    index = (index < filteredData.length - 1) ? index + 1 : 0; // 마지막 항목에서 다음 버튼 클릭 시 처음으로 이동
                    showPopup();
                });
            });

            // 팝업 닫기 - 닫기 버튼
            $(document).on('click', '.popup_close', function () {
                $('.popup_overlay').remove(); // 팝업 제거
            });

            // 팝업 닫기 - 배경 클릭
            $(document).on('click', '.popup_overlay', function (e) {
                if (!$(e.target).closest('.popup').length) {
                    // 클릭한 대상이 팝업 내부가 아닐 경우에만 닫기
                    $('.popup_overlay').remove();
                }
            });

            // 초기 데이터로 팝업 연결 설정
            $('.menu_box').data('filteredData', useData);
        }
    });

    // input에 입력 후 Enter키로 동작하기
    $('#keyword').on('keypress', function (e) {
        if (e.which === 13) { // Enter키의 keycode 13
            e.preventDefault(); // 기본 Enter 동작 방지

            // 입력값 확인
            if ($('#keyword').val().trim() === '') {
                alert('검색어를 입력해주세요.');
                return;
            }

            $('.btn_search').trigger('click'); // a 태그의 클릭 이벤트 트리거
        }
    });
});