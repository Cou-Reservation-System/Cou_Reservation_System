// 초기 default 값 전체조회
function getAllData() {

    $.ajax({
        type: 'GET',
        url: 'http://3.37.129.143/admin/check/calendar',
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {

        },
        success: function (response) {
            const temp_html = `<div class="choice_wrap">
            <div id="center_wrap">
              <div id="center">
                <span id="center_text">센터</span>
              </div>
              <div name="center_select" id="center_select" >여주 쿠팡
            </div>
            </div>
            `
            $('.main_wrap').append(temp_html);

            const reservedList = response.reservedList;
            for (reservation of reservedList) {
                const date = reservation.DateAndTime.split(' ')[0];
                const time = reservation.DateAndTime.split(' ')[1];
                const carNumber = reservation.carNumber;
                const carType = reservation.carType;
                const departure = reservation.departure;
                const phoneNumber = reservation.phoneNumber;
                const amountPallet = reservation.amountPallet;

                const temp_html = `<tr>
                <th scope="col">${date}</th>
                <th scope="col">${time}</th>
                <th scope="col">${carNumber}</th>
                <th scope="col">${carType}</th>
                <th scope="col">${departure}</th>
                <th scope="col">${phoneNumber}</th>
                <th scope="col">${amountPallet}</th>
                <th scope="col"><div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                </label>
              </div>
              </th>
                </tr>
                `
                $('#showBox').append(temp_html);
            }

        }
        
    })
}

// 날짜 조회 버튼 누를 시
function getDate() {
            const temp_html = `
            <div class="choice_wrap">
            <div id="center_wrap">
            <div id="center">
                <span id="center_text">센터</span>
             </div>
             <div name="center_select" id="center_select" >여주 쿠팡
             </div>
             </div>
            <div id="date_wrap">
              <div id="show_date">
                <span id="choiceDate">날짜 입력</span>
              </div>
              <div id="dates">
                <div id="dates_input">
                  <input name="date" type="text" id="date_select1" class="date_select1" placeholder="2022-04-10">
                  <span> ~ </span>
                  <input name="date" type="text" id="date_select2" class="date_select2" placeholder="2022-04-10">
                </div>
                <button type="button" class="date_wrap_btn" id="date_wrap_btn" onclick="searchDate()">조회</button>
              </div>
            </div>
            <div class="totalCnt" id="totalCnt">
          </div>
            `
            jQuery(".main_wrap").html(temp_html)

            $(function() {
                //input을 datepicker로 선언
                $("#date_select1, #date_select2").datepicker({
                dateFormat: 'yy-mm-dd' //달력 날짜 형태
                ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
                ,showMonthAfterYear:true // 월- 년 순서가아닌 년도 - 월 순서
                ,changeYear: true //option값 년 선택 가능
                ,changeMonth: true //option값 월 선택 가능
                ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시
                ,buttonImage: "http://jqueryui.com/resources/demos/datepicker/images/calendar.gif" //버튼 이미지 경로
                ,buttonImageOnly: true //버튼 이미지만 깔끔하게 보이게함
                ,buttonText: "선택" //버튼 호버 텍스트
                ,yearSuffix: "년" //달력의 년도 부분 뒤 텍스트
                ,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 텍스트
                ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip
                ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 텍스트
                ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 Tooltip
                ,minDate: "-5Y" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
                ,maxDate: "+5y" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)
                });
          
                //초기값을 오늘 날짜로 설정해줘야 합니다.
                $('#date_wrap').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
                });

            $('#showBox').empty()

            

}

// 차량 조회 버튼 누를 시
function getCar() {

        const temp_html = `
        <div class="choice_wrap">
        <div id="center_wrap">
        <div id="center">
            <span id="center_text">센터</span>
         </div>
         <div name="center_select" id="center_select" >여주 쿠팡
         </div>
         </div>
        <div id="car_wrap">
          <div id="show_car">
            <span id="choiceCar">차량번호 입력</span>
          </div>
          <div id="cars">
            <div id="car_input">
              <input name="car" id="car_select" class="car_select" placeholder="11쿠 1234">
            </div>
            <button type="button" class="car_wrap_btn" id="car_wrap_btn" onclick="searchCar()">조회</button>
          </div>
        </div> 
        `

        jQuery(".main_wrap").html(temp_html)

        $('#showBox').empty()
}


// 날짜조회에서 조회 버튼 누를 시
function searchDate() {

    const startDate = $('.date_select1').val()
    const endDate = $('.date_select2').val()
    $.ajax({
        type: 'GET',
        url: `/admin/check/calendar/date?startDate=${startDate}&endDate=${endDate}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
            
        },
        success: function(response) {
            const reservedList = response.reservedList;
            console.log(reservedList);
            console.log('response:', response);
            for (reservation of reservedList) {
                const date = reservation.DateAndTime.split(' ')[0];
                const time = reservation.DateAndTime.split(' ')[1];
                const carNumber = reservation.carNumber;
                const carType = reservation.carType;
                const departure = reservation.departure;
                const phoneNumber = reservation.phoneNumber;
                const amountPallet = reservation.amountPallet;

                const temp_html = `<tr>
                <th scope="col">${date}</th>
                <th scope="col">${time}</th>
                <th scope="col">${carNumber}</th>
                <th scope="col">${carType}</th>
                <th scope="col">${departure}</th>
                <th scope="col">${phoneNumber}</th>
                <th scope="col">${amountPallet}</th>
                <th scope="col"><div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                  완료
                </label>
              </div>
              </th>
                </tr>
                `
                $('#showBox').append(temp_html);
            }
            const totalCnt = document.getElementById('totalCnt');
            totalCnt.innerText = `해당 날짜의 전체 예약 건수: ${response.totalReservedList}건`


        }
    })
}

// 차량조회에서 조회버튼 누를 시
function searchCar() {
    const targetCarNumber = $('.car_select').val()
    console.log(targetCarNumber)
    $.ajax({
        type:'GET',
        url: `/admin/check?targetCarNumber=${targetCarNumber}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {

        },
        success: function(response) {
            const reservedList = response.reservedList;
            console.log(reservedList)
            for (reservation of reservedList) {
                const date = reservation.DateAndTime.split(' ')[0];
                const time = reservation.DateAndTime.split(' ')[1];
                const carNumber = reservation.carNumber;
                const carType = reservation.carType;
                const departure = reservation.departure;
                const phoneNumber = reservation.phoneNumber;
                const amountPallet = reservation.amountPallet;

                const temp_html = `<tr>
                <th scope="col">${date}</th>
                <th scope="col">${time}</th>
                <th scope="col">${carNumber}</th>
                <th scope="col">${carType}</th>
                <th scope="col">${departure}</th>
                <th scope="col">${phoneNumber}</th>
                <th scope="col">${amountPallet}</th>
                <th scope="col">완료</th>
                </tr>
                `
                $('#showBox').append(temp_html);
            }
            const totalCnt = document.getElementById('totalCnt');
            totalCnt.innerText = `해당 차량의 전체 예약 건수: ${response.totalReservedList}건`

        }
    })
}