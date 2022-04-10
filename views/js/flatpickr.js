//db연동이 안되어있으므로 일단 마감된 시간을 임의로 정했습니다.
// const reservedDate = [
//   "2022-04-20 14:00", // cnt 5 : 5 
//   "2022-04-20 15:00",
//   "2022-04-20 16:00",
// ];

let reservedDate = []

function getTime(getType){
  console.log('check time', getType)
  
    $.ajax({
        type: "GET",
        url: "http://3.37.129.143"+"/reservation/count/" + getType,
        data: {},
        success: function (response) {
          console.log('check time', response)
          // console.log(response.dateAndTime)
          reservedDate.push(response.dateAndTime)
          console.log('reservedDate',reservedDate)
        },
        error: function (error) {
            alert(error.responseJSON.errorMessage);
        },
    });
}

flatpickr("#date", {
  enableTime: true,
  minuteIncrement: 60,
  minTime: "09:00",
  maxTime: "21:00",
  onChange: function (selectedDates, dateStr, instance) {
    
    // let time = JSON.parse(dateStr)
    if (reservedDate.includes(dateStr)) {
      console.log(dateStr + "은 이미 예약된 시간입니다!")
      alert(dateStr + "은 이미 예약된 시간입니다!");
    }
  },
});
