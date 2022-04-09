//db연동이 안되어있으므로 일단 마감된 시간을 임의로 정했습니다.
const reservedDate = [
  "2022-04-20 14:00",
  "2022-04-20 15:00",
  "2022-04-21 14:00",
];

flatpickr("#date", {
  enableTime: true,
  minuteIncrement: 60,
  minTime: "09:00",
  maxTime: "21:00",
  onChange: function (selectedDates, dateStr, instance) {
    if (reservedDate.includes(dateStr)) {
      alert(dateStr + "은 이미 예약된 시간입니다!");
    }
  },
});
