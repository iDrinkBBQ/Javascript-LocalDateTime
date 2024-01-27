// noinspection DuplicatedCode,JSUnusedGlobalSymbols

class LocalDateTime {
  day;
  month;
  year;
  minute;
  second;
  hour;

  /**
   * The constructor allows for 3 accepted formats:
   * MM/DD/YYYY, HH:mm:SS PD (Equivalent to Date.toLocaleString()),
   * YYYY-MM-DDTHH:mm:SSZ (Equivalent to Date.toISOString(), Z can be excluded), or
   * MM/DD/YYYY (Typical user/datepicker input, also Date.toLocaleDateString()).
  */
  constructor(dateString) {
    let dateStringIso;

    //iso8601 format
    if (dateString.includes("T")){
      dateStringIso = dateString.replace("Z", "");
    }
    //locale format
    else {
      dateStringIso = this._parseLocaleString(dateString);
    }

    const dateStringParts = dateStringIso.split("T");
    const dateParts = dateStringParts[0].split("-");
    const timeParts = dateStringParts[1].split(":");
    timeParts[2] = timeParts[2].substring(0, 2);

    //minimum year is 1700. to enforce this, throw error on creation.
    if (dateParts[0] < 1700){
      throw new Error("InvalidArgumentError: Value for field \"Year\" must be at least 1700.")
    }
    this.year = Number.parseFloat(dateParts[0]);

    this.month = Number.parseFloat(dateParts[1]);
    this.day = Number.parseFloat(dateParts[2]);

    this.hour = Number.parseFloat(timeParts[0]);
    this.minute = Number.parseFloat(timeParts[1]);
    this.second = Number.parseFloat(timeParts[2]);
  }

  /**
   * Returns a LocalDateTime object with the values
   * of Date.toLocaleString().
   */
  static now(){
    const now = new Date();
    return new LocalDateTime(now.toLocaleString());
  }

  /**
   * Returns a LocalDateTime object with the values
   * of Date.toISOString().
   */
  static nowIso() {
    const now = new Date();
    return new LocalDateTime(now.toISOString());
  }

  /**
   * Returns a string representation of the instance
   * using the ISO8601 format (YYYY-MM-DDTHH:mm:SS)
   */
  toString (){
    const month = this._formatValue(this.month);
    const day = this._formatValue(this.day);
    const hour = this._formatValue(this.hour);
    const minute = this._formatValue(this.minute);
    const second = this._formatValue(this.second);
    return this.year.toString().concat("-")
      .concat(month)
      .concat("-")
      .concat(day)
      .concat("T")
      .concat(hour)
      .concat(":")
      .concat(minute)
      .concat(":")
      .concat(second);
  }

  /**
   * Returns a string in the format of YYYY-MM-DD.
   * Functionally equivalent to LocalDateTime.toLocalDate()
   */
  getHTMLDate() {
    const year = this.year.toString();
    const month = this._formatValue(this.month);
    const day = this._formatValue(this.day);
    return year.concat("-").concat(month).concat("-").concat(day);
  }

  //comparisons
  /**
   * @param compareString - Use LocalDateTime.toString() or any valid LocalDateTime format.
   * Returns true if the specified LocalDateTime is equal to the
   * instance of LocalDateTime calling this function.
   */
  isEqual(compareString) {
    let isEqual = true;
    const compareDate = new LocalDateTime(compareString);

    if (compareDate.year !== this.year){
      isEqual = false;
    }

    if (compareDate.month !== this.month){
      isEqual = false;
    }

    if (compareDate.day !== this.day){
      isEqual = false;
    }

    if (compareDate.hour !== this.hour){
      isEqual = false;
    }

    if (compareDate.minute !== this.minute){
      isEqual = false;
    }

    if (compareDate.second !== this.second){
      isEqual = false;
    }

    return isEqual;
  }
  /**
   * @param compareString - Use LocalDateTime.toString() or any valid LocalDateTime format.
   * Returns true if the instance of LocalDateTime calling this function is
   * before the specified LocalDateTime.
   */
  isBefore(compareString){
    let isBefore = false;
    const compareDate = new LocalDateTime(compareString.toString());

    if (this.year !== compareDate.year){
      if (this.year < compareDate.year) {
        isBefore = true;
      }
    }
    else {
      if (this.month !== compareDate.month) {
        if (this.month < compareDate.month) {
          isBefore = true;
        }
      }
      else {
        if (this.day !== compareDate.day) {
          if (this.day < compareDate.day) {
            isBefore = true;
          }
        }
        else{
          if (this.hour !== compareDate.hour) {
            if (this.hour < compareDate.hour) {
              isBefore = true;
            }
          }
          else {
            if (this.minute !== compareDate.minute) {
              if (this.minute < compareDate.minute){
                isBefore = true;
              }
            }
            else {
              if (this.second !== compareDate.second) {
                if (this.second < compareDate.second) {
                  isBefore = true;
                }
              }
            }
          }
        }
      }
    }

    return isBefore;
  }
  /**
   * @param compareString - Use LocalDateTime.toString() or any valid LocalDateTime format.
   * Returns true if the instance of LocalDateTime calling this function is
   * after the specified LocalDateTime.
   */
  isAfter(compareString){
    let isAfter = false;
    const compareDate = new LocalDateTime(compareString.toString());

    if (this.year !== compareDate.year){
      if (this.year > compareDate.year) {
        isAfter = true;
      }
    }
    else {
      if (this.month !== compareDate.month) {
        if (this.month > compareDate.month) {
          isAfter = true;
        }
      }
      else {
        if (this.day !== compareDate.day) {
          if (this.day > compareDate.day) {
            isAfter = true;
          }
        }
        else{
          if (this.hour !== compareDate.hour) {
            if (this.hour > compareDate.hour) {
              isAfter = true;
            }
          }
          else {
            if (this.minute !== compareDate.minute) {
              if (this.minute > compareDate.minute) {
                isAfter = true;
              }
            }
            else {
              if (this.second !== compareDate.second) {
                if (this.second > compareDate.second) {
                  isAfter = true;
                }
              }
            }
          }
        }
      }
    }

    return isAfter;
  }
  /**
   * @param compareString - Use LocalDateTime.toString() or any valid LocalDateTime format.
   * Returns a string detailing how much time (years, days, hours, minutes, seconds) is
   * between the instance of LocalDateTime and the specified LocalDateTime, if valid.
   * Instance must be before entered LocalDateTime, else returns false.
   */
  until(compareString){
    if (this.isBefore(compareString)){
      const compareDate = new LocalDateTime(compareString);
      const thisDate = new Date(this.toString());
      const enteredDate = new Date(compareDate.toString());
      const timeDiff = Math.abs(enteredDate - thisDate);

      const seconds = Math.floor(timeDiff / 1000) % 60;
      const minutes = Math.floor(timeDiff / (1000 * 60)) % 60;
      const hours = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;
      let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));

      let timeString = '';
      if (years > 0) {
        if (years === 1){
          timeString += years + " year, ";
        }
        else {
          timeString += years + " years, ";
        }
        days -= 365 * years;
      }
      if (days > 0) {
        if(days === 1){
          timeString += days + " day, ";
        }
        else{
          timeString += days + " days, ";
        }
      }
      if (hours > 0 /*|| days > 0*/) {
        if(hours === 1){
          timeString += hours + " hours ";
        }
        else{
          timeString += hours + " hours, ";
        }
      }
      if (minutes > 0 /*|| hours > 0 || days > 0*/) {
        if(minutes === 1){
          timeString += minutes + " minute, ";
        }
        else{
          timeString += minutes + " minutes, ";
        }
      }
      if (seconds === 1){
        timeString += seconds + " second";
      }
      timeString += seconds + " seconds";

      return timeString;
    }
    else {
      return false;
    }
  }

  /**
   * Returns the explicit number value of the year field of the LocalDateTime instance.
   */
  getYear() {
    return this.year;
  }

  //getting month
  /**
   * Returns the explicit number value of the month field of the LocalDateTime instance.
   */
  getMonthValue(){
    return this.month;
  }
  /**
   * Returns string representation of the month of the LocalDateTime instance.
   */
  getMonth(){
    let month = "";

    switch (this.month){
      case "01":
        month = "January";
        break;
      case "02":
        month = "February";
        break;
      case "03":
        month = "March";
        break;
      case "04":
        month = "April";
        break;
      case "05":
        month = "May";
        break;
      case "06":
        month = "June";
        break;
      case "07":
        month = "July";
        break;
      case "08":
        month = "August";
        break;
      case "09":
        month = "September";
        break;
      case "10":
        month = "October";
        break;
      case "11":
        month = "November";
        break;
      case "12":
        month = "December";
        break;
    }

    return month;
  }

  //getting day
  /**
   * Returns the explicit number value of the day field of the LocalDateTime instance.
   */
  getDayOfMonth(){
    return this.day;
  }
  /**
   * Returns a string representation of the day of the week of the
   * LocalDateTime instance.
   */
  //years older than 1700 not supported
  getDayOfWeek(){
    const year = this.year.toString();
    const month = this.month;
    const day = this.day;
    const yearStart = Number.parseFloat(year.substring(0, 2));
    const yearEnd = Number.parseFloat(year.substring(2));
    const yearCode = ((yearEnd + Math.floor(yearEnd / 4)) % 7);

    let monthCode = 0;
    switch (month) {
      case 2:
      case 3:
      case 11:
        monthCode = 3;
        break;
      case 4:
      case 7:
        monthCode = 6;
        break;
      case 5:
        monthCode = 1;
        break;
      case 6:
        monthCode = 4;
        break;
      case 8:
        monthCode = 2;
        break;
      case 9:
      case 12:
        monthCode = 5;
        break;
    }

    let centuryCode = 0;
    if (yearStart < 17){
      throw new Error("InvalidArgumentError: Value for field \"Year\" must be at least 1700.")
    }
    else {
      switch (yearStart % 4){
        case 0:
          centuryCode = 6;
          break;
        case 1:
          centuryCode = 4;
          break;
        case 2:
          centuryCode = 2;
          break;
      }
    }

    let leapCode = 0;
    if (this.isLeap() && (month === 1 || month === 2)){
      leapCode = 1;
    }

    const dayNumber = (yearCode + monthCode + centuryCode + day - leapCode) % 7;
    let dayString = "";
    switch (dayNumber){
      case 0:
        dayString = "Sunday";
        break;
      case 1:
        dayString = "Monday";
        break;
      case 2:
        dayString = "Tuesday";
        break;
      case 3:
        dayString = "Wednesday";
        break;
      case 4:
        dayString = "Thursday";
        break;
      case 5:
        dayString = "Friday";
        break;
      case 6:
        dayString = "Saturday";
        break;
    }

    return dayString;
  }
  /**
   * Returns a number value representing the number of the year of the
   * LocalDateTime instance.
   */
  getDayOfYear(){
    const day = this.day;
    const month = this.month;

    let dayOfYear = day;

    for (let x = 1; x < month; x++){
      dayOfYear += this._getDaysInMonth(x, this.year);
    }

    return dayOfYear;
  }

  //getting time
  /**
   * Returns the explicit number value of the hour field of the LocalDateTime instance.
   */
  getHour() {
    return this.hour;
  }
  /**
   * Returns the explicit number value of the minute field of the LocalDateTime instance.
   */
  getMinute() {
    return this.minute;
  }
  /**
   * Returns the explicit number value of the second field of the LocalDateTime instance.
   */
  getSecond() {
    return this.second;
  }
  /**
   * Returns a 12H string representation of the time of the LocalDateTime instance
   * in HH:mm:SS PP format.
   */
  get12HourTime() {
    let hour = this.hour;
    let period = " AM";
    if (hour > 12) {
      period = " PM";
      hour -= 12;
    }
    else if (hour === 0){
      hour += 12;
    }

    const minute = this._formatValue(this.minute);
    const second = this._formatValue(this.second);
    return hour.toString().concat(":").concat(minute).concat(":").concat(second).concat(period);
  }
  /**
   * Returns a 24H string representation of the time of the LocalDateTime instance
   * in HH:mm:SS format. The value returned from this function works for HTML time pickers.
   */
  get24HourTime() {
    const hour = this._formatValue(this.hour);
    const minute = this._formatValue(this.minute);
    const second = this._formatValue(this.second);
    return hour.concat(":").concat(minute).concat(":").concat(second);
  }

  //plus functions
  /**
   * Returns a copy of the LocalDateTime instance with a value added to the year value.
   */
  plusYears(addValue) {
    let yearValue = this.year;
    yearValue += addValue;

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(this.month)
      .concat("-")
      .concat(this.day)
      .concat("T")
      .concat(this.hour)
      .concat(":")
      .concat(this.minute)
      .concat(":")
      .concat(this.second);

    return new LocalDateTime(newDateString);
  }
  /**
   * Returns a copy of the LocalDateTime instance with a value added to the month value.
   */
  plusMonths(addValue) {
    let yearValue = this.year;
    let monthValue = this.month;
    monthValue += addValue;
    if (monthValue > 12){
      yearValue += Math.floor(monthValue / 12);
      monthValue = monthValue % 12;
    }

    const monthString = this._formatValue(monthValue);

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(monthString)
      .concat("-")
      .concat(this.day)
      .concat("T")
      .concat(this.hour)
      .concat(":")
      .concat(this.minute)
      .concat(":")
      .concat(this.second);

    return new LocalDateTime(newDateString);
  }
  /**
   * Returns a copy of the LocalDateTime instance with a value added to the day value.
   */
  plusDays(addValue) {
    let yearValue = this.year;
    let dayValue = this.day;
    let monthValue = this.month;
    dayValue += addValue;

    let daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    while(dayValue > daysInMonth) {
      dayValue -= daysInMonth;
      monthValue++;

      if (monthValue > 12){
        yearValue++;
        monthValue -= 12;
      }

      daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    }

    const monthString = this._formatValue(monthValue);
    const dayString = this._formatValue(dayValue);

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(monthString)
      .concat("-")
      .concat(dayString)
      .concat("T")
      .concat(this.hour)
      .concat(":")
      .concat(this.minute)
      .concat(":")
      .concat(this.second);

    return new LocalDateTime(newDateString);
  }
  /**
   * Returns a copy of the LocalDateTime instance with the value adjusted by the
   * number of weeks added.
   */
  plusWeeks(weeks) {
    let yearValue = this.year;
    let dayValue = this.day;
    let monthValue = this.month;
    dayValue += weeks * 7;

    let daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    while (dayValue > daysInMonth){
      dayValue -= daysInMonth;
      monthValue++;
      if (monthValue > 12){
        yearValue++;
        monthValue -= 12;
      }
      daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    }

    const monthString = this._formatValue(monthValue);
    const dayString = this._formatValue(dayValue);

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(monthString)
      .concat("-")
      .concat(dayString)
      .concat("T")
      .concat(this.hour)
      .concat(":")
      .concat(this.minute)
      .concat(":")
      .concat(this.second);

    return new LocalDateTime(newDateString);
  }
  /**
   * Returns a copy of the LocalDateTime instance with a value added to the hour value.
   */
  plusHours(addValue) {
    let yearValue = this.year;
    let dayValue = this.day;
    let monthValue = this.month;
    let hourValue = this.hour;
    hourValue += addValue;

    if (hourValue > 23){
      dayValue += Math.floor(hourValue / 24);
      hourValue = hourValue % 24;
    }

    let daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    while(dayValue > daysInMonth) {
      dayValue -= daysInMonth;
      monthValue++;

      if (monthValue > 12){
        yearValue++;
        monthValue -= 12;
      }

      daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    }

    const monthString = this._formatValue(monthValue);
    const dayString = this._formatValue(dayValue);
    const hourString = this._formatValue(hourValue);

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(monthString)
      .concat("-")
      .concat(dayString)
      .concat("T")
      .concat(hourString)
      .concat(":")
      .concat(this.minute)
      .concat(":")
      .concat(this.second);

    return new LocalDateTime(newDateString);
  }
  /**
   * Returns a copy of the LocalDateTime instance with a value added to the minute value.
   */
  plusMinutes(addValue) {
    let yearValue = this.year;
    let dayValue = this.day;
    let monthValue = this.month;
    let hourValue = this.hour;
    let minuteValue = this.minute;
    minuteValue += addValue;

    if (minuteValue > 60) {
      hourValue += Math.floor(minuteValue / 60);
      minuteValue = minuteValue % 60;
    }

    if (hourValue > 23){
      dayValue += Math.floor(hourValue / 24);
      hourValue = hourValue % 24;
    }

    let daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    while(dayValue > daysInMonth) {
      dayValue -= daysInMonth;
      monthValue++;

      if (monthValue > 12){
        yearValue++;
        monthValue -= 12;
      }

      daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    }

    const monthString = this._formatValue(monthValue);
    const dayString = this._formatValue(dayValue);
    const hourString = this._formatValue(hourValue);
    const minuteString = this._formatValue(minuteValue);

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(monthString)
      .concat("-")
      .concat(dayString)
      .concat("T")
      .concat(hourString)
      .concat(":")
      .concat(minuteString)
      .concat(":")
      .concat(this.second);

    return new LocalDateTime(newDateString);
  }
  /**
   * Returns a copy of the LocalDateTime instance with a value added to the second value.
   */
  plusSeconds(addValue) {
    let yearValue = this.year;
    let dayValue = this.day;
    let monthValue = this.month;
    let hourValue = this.hour;
    let minuteValue = this.minute;
    let secondValue = this.second;
    secondValue += addValue;

    if (secondValue > 60) {
      minuteValue += Math.floor(secondValue / 60);
      secondValue = secondValue % 60;
    }

    if (minuteValue > 60) {
      hourValue += Math.floor(minuteValue / 60);
      minuteValue = minuteValue % 60;
    }

    if (hourValue > 23){
      dayValue += Math.floor(hourValue / 24);
      hourValue = hourValue % 24;
    }

    let daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    while(dayValue > daysInMonth) {
      dayValue -= daysInMonth;
      monthValue++;

      if (monthValue > 12){
        yearValue++;
        monthValue -= 12;
      }

      daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    }

    const monthString = this._formatValue(monthValue);
    const dayString = this._formatValue(dayValue);
    const hourString = this._formatValue(hourValue);
    const minuteString = this._formatValue(minuteValue);
    const secondString = this._formatValue(secondValue);

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(monthString)
      .concat("-")
      .concat(dayString)
      .concat("T")
      .concat(hourString)
      .concat(":")
      .concat(minuteString)
      .concat(":")
      .concat(secondString);

    return new LocalDateTime(newDateString);
  }

  //minus functions
  /**
   * Returns a copy of the LocalDateTime instance with a value subtracted from the year value.
   */
  minusYears(subtractValue) {
    let yearValue = this.year;
    yearValue -= subtractValue;

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(this.month)
      .concat("-")
      .concat(this.day)
      .concat("T")
      .concat(this.hour)
      .concat(":")
      .concat(this.minute)
      .concat(":")
      .concat(this.second);

    return new LocalDateTime(newDateString);
  }
  /**
   * Returns a copy of the LocalDateTime instance with a value subtracted from the month value.
   */
  minusMonths(subtractValue) {
    let yearValue = this.year;
    let monthValue = this.month;
    monthValue -= subtractValue;

    while (monthValue < 1){
      yearValue--;
      monthValue += 12;
    }

    const monthString = this._formatValue(monthValue);

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(monthString)
      .concat("-")
      .concat(this.day)
      .concat("T")
      .concat(this.hour)
      .concat(":")
      .concat(this.minute)
      .concat(":")
      .concat(this.second);

    return new LocalDateTime(newDateString);
  }
  /**
   * Returns a copy of the LocalDateTime instance with a value subtracted from the day value.
   */
  minusDays(subtractValue) {
    let yearValue = this.year;
    let dayValue = this.day;
    let monthValue = this.month;
    dayValue -= subtractValue;

    let daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    while (dayValue < 1){
      monthValue--;
      dayValue += daysInMonth;

      if (monthValue < 1){
        yearValue--;
        monthValue += 12;
      }

      daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    }

    const monthString = this._formatValue(monthValue);
    const dayString = this._formatValue(dayValue);

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(monthString)
      .concat("-")
      .concat(dayString)
      .concat("T")
      .concat(this.hour)
      .concat(":")
      .concat(this.minute)
      .concat(":")
      .concat(this.second);

    return new LocalDateTime(newDateString);
  }
  /**
   * Returns a copy of the LocalDateTime instance with the value adjusted by the
   * number of weeks subtracted.
   */
  minusWeeks(weeks) {
    let yearValue = this.year;
    let dayValue = this.day;
    let monthValue = this.month;
    dayValue -= weeks * 7;

    let daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    while (dayValue < 1){
      monthValue--;
      dayValue += daysInMonth;

      if (monthValue < 1){
        yearValue--;
        monthValue += 12;
      }

      daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    }
  }
  /**
   * Returns a copy of the LocalDateTime instance with a value subtracted from the hour value.
   */
  minusHours(subtractValue) {
    let yearValue = this.year;
    let dayValue = this.day;
    let monthValue = this.month;
    let hourValue = this.hour;
    hourValue -= subtractValue;

    while (hourValue < 0){
      dayValue--;
      hourValue += 24;
    }

    let daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    while (dayValue < 1){
      monthValue--;
      dayValue += daysInMonth;

      if (monthValue < 1){
        yearValue--;
        monthValue += 12;
      }

      daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    }

    const monthString = this._formatValue(monthValue);
    const dayString = this._formatValue(dayValue);
    const hourString = this._formatValue(hourValue);

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(monthString)
      .concat("-")
      .concat(dayString)
      .concat("T")
      .concat(hourString)
      .concat(":")
      .concat(this.minute)
      .concat(":")
      .concat(this.second);

    return new LocalDateTime(newDateString);
  }
  /**
   * Returns a copy of the LocalDateTime instance with a value subtracted from the minute value.
   */
  minusMinutes(subtractValue) {
    let yearValue = this.year;
    let dayValue = this.day;
    let monthValue = this.month;
    let hourValue = this.hour;
    let minuteValue = this.minute;
    minuteValue -= subtractValue;

    while (minuteValue < 0) {
      hourValue--;
      minuteValue += 60;
    }

    while (hourValue < 0){
      dayValue--;
      hourValue += 24;
    }

    let daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    while (dayValue < 1){
      monthValue--;
      dayValue += daysInMonth;

      if (monthValue < 1){
        yearValue--;
        monthValue += 12;
      }

      daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    }

    const monthString = this._formatValue(monthValue);
    const dayString = this._formatValue(dayValue);
    const hourString = this._formatValue(hourValue);
    const minuteString = this._formatValue(minuteValue);

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(monthString)
      .concat("-")
      .concat(dayString)
      .concat("T")
      .concat(hourString)
      .concat(":")
      .concat(minuteString)
      .concat(":")
      .concat(this.second);

    return new LocalDateTime(newDateString);
  }
  /**
   * Returns a copy of the LocalDateTime instance with a value subtracted from the second value.
   */
  minusSeconds(subtractValue) {
    let yearValue = this.year;
    let dayValue = this.day;
    let monthValue = this.month;
    let hourValue = this.hour;
    let minuteValue = this.minute;
    let secondValue = this.second;
    secondValue -= subtractValue;

    while (secondValue < 0) {
      minuteValue--;
      secondValue += 60;
    }

    while (minuteValue < 0) {
      hourValue--;
      minuteValue += 60;
    }

    while (hourValue < 0){
      dayValue--;
      hourValue += 24;
    }

    let daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    while (dayValue < 1){
      monthValue--;
      dayValue += daysInMonth;

      if (monthValue < 1){
        yearValue--;
        monthValue += 12;
      }

      daysInMonth = this._getDaysInMonth(monthValue, yearValue);
    }

    const monthString = this._formatValue(monthValue);
    const dayString = this._formatValue(dayValue);
    const hourString = this._formatValue(hourValue);
    const minuteString = this._formatValue(minuteValue);
    const secondString = this._formatValue(secondValue);

    const newDateString = yearValue.toString()
      .concat("-")
      .concat(monthString)
      .concat("-")
      .concat(dayString)
      .concat("T")
      .concat(hourString)
      .concat(":")
      .concat(minuteString)
      .concat(":")
      .concat(secondString);

    return new LocalDateTime(newDateString);
  }

  //with functions
  /**
   * Returns a copy of the LocalDateTime instance with the year field altered
   * to the input value, if valid. Else, returns false.
   */
  withYear(adjustment){
    const newDate = this;
    if (adjustment >= 1700){
      newDate.year = adjustment;
      return newDate;
    }
    else {
      return false;
    }
  }
  /**
   * Returns a copy of the LocalDateTime instance with the month field altered
   * to the input value, if valid. Else, returns false.
   */
  withMonth(adjustment){
    const newDate = this;
    if (adjustment > 0 && adjustment < 13){
      newDate.month = adjustment;
      return newDate;
    }
    else {
      return false;
    }
  }
  /**
   * Returns a copy of the LocalDateTime instance with the day field altered
   * to the input value, if valid. Else, returns false.
   */
  withDayOfMonth(adjustment){
    const newDate = this;
    const daysInMonth = this._getDaysInMonth(newDate.month, newDate.year);
    if (adjustment > 0 && adjustment <= daysInMonth){
      newDate.day = adjustment;
      return newDate;
    }
    else {
      return false;
    }
  }
  /**
   * Returns a copy of the LocalDateTime instance with the input day of the
   * year value, if valid. Else, returns false.
   */
  withDayOfYear(adjustment){
    const newDate = this;
    let isValid = true;

    if (newDate.isLeap()){
      if (adjustment < 1 || adjustment > 366){
        isValid = false;
      }
    }
    else{
      if (adjustment < 1 || adjustment > 365){
        isValid = false;
      }
    }

    if (isValid){
      let month = 1;
      const year = newDate.year;
      let dayValue = adjustment;
      let daysInMonth = this._getDaysInMonth(month, year);
      let dayMonthCount = 0;
      while (dayMonthCount < (dayValue - daysInMonth)){
        dayMonthCount += daysInMonth;
        month++;
        daysInMonth = this._getDaysInMonth(month, year);
      }
      dayValue -= dayMonthCount;

      newDate.month = month;
      newDate.day = dayValue;
      return newDate;
    }
    else {
      return false;
    }
  }
  /**
   * Returns a copy of the LocalDateTime instance with the hour field altered
   * to the input value, if valid. Else, returns false.
   */
  withHour(adjustment){
    const newDate = this;
    if (adjustment >= 0 && adjustment < 24){
      newDate.hour = adjustment;
      return newDate;
    }
    else {
      return false;
    }
  }
  /**
   * Returns a copy of the LocalDateTime instance with the minute field altered
   * to the input value, if valid. Else, returns false.
   */
  withMinute(adjustment){
    const newDate = this;
    if (adjustment >= 0 && adjustment < 60){
      newDate.minute = adjustment;
      return newDate;
    }
    else {
      return false;
    }
  }
  /**
   * Returns a copy of the LocalDateTime instance with the second field altered
   * to the input value, if valid. Else, returns false.
   */
  withSecond(adjustment){
    const newDate = this;
    if (adjustment >= 0 && adjustment < 60){
      newDate.second = adjustment;
      return newDate;
    }
    else {
      return false;
    }
  }

  //misc custom functions
  /**
   * Returns true if the year of the LocalDateTime instance is a leap year.
   */
  isLeap() {
    let isLeap = false;
    const yearNumber = this.year;
    if ((yearNumber % 4) === 0) {
      if (yearNumber % 100 !== 0 || yearNumber % 400 === 0) {
        isLeap = true;
      }
    }
    return isLeap;
  }

  /**
   * Returns true if the year entered is a leap year.
   */
  static isLeap(year) {
    let isLeap = false;
    if ((year % 4) === 0) {
      if (year % 100 !== 0 || year % 400 === 0) {
        isLeap = true;
      }
    }
    return isLeap;
  }

  //"private" functions
  _parseLocaleString(localeString){
    if (localeString.includes(", ")) {
      let dateSubstring = localeString.split(", ")[0];
      let timeSubstring = localeString.split(", ")[1];

      const dateParts = dateSubstring.split("/");
      if (dateParts[0].length === 1) {
        dateParts[0] = "0".concat(dateParts[0]);
      }
      if (dateParts[1].length === 1){
        dateParts[1] = "0".concat(dateParts[1]);
      }
      const formattedDate = dateParts[2].concat("-").concat(dateParts[0]).concat("-").concat(dateParts[1]);

      const isPM = timeSubstring.includes("PM");
      timeSubstring = timeSubstring.substring(0, timeSubstring.length - 3);
      const timeParts = timeSubstring.split(":");
      if (timeParts[0].length === 1) {
        timeParts[0] = "0".concat(timeParts[0]);
      }
      if (timeParts[1].length === 1) {
        timeParts[0] = "0".concat(timeParts[0]);
      }

      if (isPM) {
        if (timeParts[0] !== "12") {
          let hour = Number.parseFloat(timeParts[0]);
          hour += 12;
          timeParts[0] = hour.toString();
        }
      } else {
        if (timeParts[0] === "12") {
          timeParts[0] = "00";
        }
      }
      const formattedTime = "T".concat(timeParts[0]).concat(":").concat(timeParts[1]).concat(":").concat(timeParts[2]);

      return formattedDate.concat(formattedTime);
    }
    else {
      const dateParts = localeString.split("/");
      if (dateParts[0].length === 1) {
        dateParts[0] = "0".concat(dateParts[0]);
      }
      if (dateParts[1].length === 1){
        dateParts[1] = "0".concat(dateParts[1]);
      }

      if (dateParts[2].length !== 4){
        throw new Error("Length of year value provided does not match the required length of 4 digits.")
      }

      const formattedDate = dateParts[2].concat("-").concat(dateParts[0]).concat("-").concat(dateParts[1]);

      return formattedDate.concat("T00:00:00");
    }
  }

  _getDaysInMonth(monthValue, year){
    let daysInMonth = 0;
    switch (monthValue){
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        daysInMonth = 31;
        break;
      case 4:
      case 6:
      case 9:
      case 11:
        daysInMonth = 30;
        break;
      case 2:
        if (LocalDateTime.isLeap(year)){
          daysInMonth = 29;
        }
        else{
          daysInMonth = 28;
        }
        break;
    }
    return daysInMonth;
  }

  /**
   * Use this only if the value needs a 0 added to the front.
   */
  _formatValue(input){
    let value = input.toString();

    if (value.length < 2) {
      value = "0".concat(value);
    }

    return value;
  }
}
