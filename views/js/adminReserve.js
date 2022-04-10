// 초기 default 값 전체조회
function getAllData() {
    $.ajax({
        type: 'GET',
        url: '/admin/check/calender',
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
                <th scope="col">완료</th>
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
                  <input name="date" id="date_select1" class="date_select1" placeholder="2022-04-10">
                  <span> ~ </span>
                  <input name="date" id="date_select2" class="date_select2" placeholder="2022-04-10">
                </div>
                <onclick="searchDate()" button type="button" class="date_wrap_btn" id="date_wrap_btn">조회</button>
              </div>
            </div>
            <div class="totalCnt" id="totalCnt">
          </div>
            `
            jQuery(".main_wrap").html(temp_html)

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
            <onclick="searchCar()" button type="button" class="car_wrap_btn" id="car_wrap_btn">조회</button>
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
        url: `/admin/check/calender/?startDate=${startDate}&endDate=${endDate}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
            
        },
        success: function(response) {
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
                <th scope="col">완료</th>
                </tr>
                `
                $('#showBox').append(temp_html);
            }
            const totalCnt = document.getElementById('totalCnt');
            totalCnt.innerText = `해당 날짜의 전체 예약 건수: ${reservedList.toalReservedList}건`


        }
    })
}

// 차량조회에서 조회버튼 누를 시
function searchCar() {
    const targetCarNumber = $('.car_select').val()
    $.ajax({
        type:'GET',
        url: `/admin/check/?targetCarNumber=${carNum}`,
        headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {

        },
        success: function(response) {
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
                <th scope="col">완료</th>
                </tr>
                `
                $('#showBox').append(temp_html);
            }
            const totalCnt = document.getElementById('totalCnt');
            totalCnt.innerText = `해당 차량의 전체 예약 건수: ${reservedList.toalReservedList}건`

        }
    })
}