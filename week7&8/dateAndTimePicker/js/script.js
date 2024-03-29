const toggler = document.querySelector('#toggle')
const input = document.querySelector('#date-picker')
const dateInput = document.querySelector('.date-picker')
const dateCard = document.querySelector('.date-card')
const clickable = document.querySelector('.clickable')
const monthDropdown = document.querySelector('#months')
const yearDropdown = document.querySelector('#year')
const rightArrow = document.querySelector('.fa-caret-right')
const leftArrow = document.querySelector('.fa-caret-left')
const datesContainer = document.querySelector('.dates')
const title = document.querySelector('.title')
const submitBtn = document.querySelector('.submit-btn')
const error = document.querySelector('.error')
const utcDateSelector = document.querySelector('.utc-date')
const secondCol = document.querySelector('.second-col')
const box = document.querySelector('.box')

function dateHandler() {
    Array.from(datesContainer.children).forEach(e => {
        e.classList.remove('active')
    })
    this.classList.add('active')
    console.log('d');
    dateInput.value = `${this.innerText}/${monthDropdown.value}/${yearDropdown.value}`
    clickable.dispatchEvent(new Event('click'))
}

// let count = 0;
function dateAndTimeHandler() {
    Array.from(datesContainer.children).forEach(e => {
        e.classList.remove('active')
    })
    // Array.from(box.children).forEach(e => {
    //     e.style.backgroundColor = ''
    //     e.style.color = '#000'
    // })
    this.classList.add('active')
    // count++
    console.log('dt');
    const dateAndTimePickerInput = document.querySelector('.dateAndTime-picker')
    dateAndTimePickerInput.value = `${this.innerText}/${monthDropdown.value}/${yearDropdown.value} 00:00`;
    Array.from(box.children).forEach(e => e.classList.remove('active'))
    box.firstElementChild.classList.add('active')
    // if (count === 1) {
    // console.log(count);

    // }
}
Array.from(box.children).forEach(e => {
    e.addEventListener('click', function () {
        box.firstElementChild.classList.remove('active')
        const dateAndTimePickerInput = document.querySelector('.dateAndTime-picker')
        console.log(dateAndTimePickerInput.value === '')
        if (!dateAndTimePickerInput.value) {
            dateAndTimePickerInput.value = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()} 00:00`
        }

        Array.from(box.children).forEach(e => {
            e.classList.remove('active')
        })
        this.classList.add('active')

        const array = dateAndTimePickerInput.value.split(' ')
        array[1] = this.innerText;
        dateAndTimePickerInput.value = array[0] + ' ' + array[1]
        // dateAndTimePickerInput.value = dateAndTimePickerInput.value.replace(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,this.innerText)
        clickable.dispatchEvent(new Event('click'))
    })
})

function calDays(year = new Date().getFullYear(), mm = (new Date().getMonth() + 1), dd = 1) {
    console.log(year,mm,dd);
    Array.from(datesContainer.childNodes).forEach(e => {
        e.remove()
    });
    Array.from(box.children).forEach(e => e.classList.remove('active'))
    box.firstElementChild.classList.add('active')
    yearDropdown.value = year;
    monthDropdown.selectedIndex = mm - 1;
    let day = null;
    if (mm > 12) {
        throw "month cannot be greater than 12";
    }
    if ((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0)) {
        year_type = "leap"
        var daysInMm = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        var monthOdd = [0, 3, 4, 7, 9, 12, 14, 17, 20, 22, 25, 27, 30]
    }
    else {
        year_type = "non leap"
        var daysInMm = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        var monthOdd = [0, 3, 3, 6, 8, 11, 13, 16, 19, 21, 24, 26, 29]
    }
    if (dd > daysInMm[mm - 1]) {
        var err = "day cannot be greater than " + daysInMm[mm - 1] + "."
        throw err
    }
    var centuryOdd = [0, 5, 3, 1]

    var y = (year - 1) % 400;
    var y1 = y % 100;
    var y2 = Math.floor(y / 100);
    var y3 = Math.floor((y1) / 4);
    var yearodd = (y3 * 2) + ((y1) - y3) + dd + monthOdd[mm - 1] + centuryOdd[y2]
    // console.log(daysInMm[mm - 1]);
    switch (yearodd % 7) {
        case 0:
            day = 0;
            break;
        case 1:
            day = 1;
            break;
        case 2:
            day = 2;
            break;
        case 3:
            day = 3;
            break;
        case 4:
            day = 4;
            break;
        case 5:
            day = 5;
            break;
        case 6:
            day = 6;
            break;
    }
    let currentDate = ''
    for (let i = 1; i <= daysInMm[mm - 1]; i++) {
        const button = document.createElement('button')
        button.innerText = i < 9 ? '0' + i : i;
        if (button.innerText == new Date().getDate() &&
            mm == (new Date().getMonth() + 1) &&
            year == new Date().getFullYear()) {
            button.classList.add('active');
            currentDate = `${button.innerText}/${mm}/${year}`
        }
        else if (button.innerText == 1 && (mm != (new Date().getMonth() + 1) ||
            year != new Date().getFullYear())) {
            button.classList.add('active');
            currentDate = `${button.innerText}/${mm}/${year}`
        }
        if (document.querySelector('.date-picker')) {
            button.addEventListener('click', dateHandler)
            input.value = currentDate;
        } else {
            button.addEventListener('click', dateAndTimeHandler);
            input.value = `${currentDate} 00:00`
        }
        datesContainer.appendChild(button)
    }
    datesContainer.firstElementChild.style.gridColumnStart = day + 1;
}

for (let i = 1970; i <= 2030; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    yearDropdown.appendChild(option);
}

calDays()

toggler.addEventListener('click', function () {
    const datePicker = toggler.classList.toggle('date-picker-btn');
    const dateAndTimePicker = toggler.classList.toggle('dateAndTime-picker-btn');
    const datePickerInput = input.classList.toggle('date-picker');
    const dateAndTimePickerInput = input.classList.toggle('dateAndTime-picker');
    toggler.innerText = dateAndTimePicker ? 'Date and Time picker' : 'Date picker'
    title.innerText = dateAndTimePicker ? 'Date picker' : 'Date and Time picker'
    input.value = ''
    utcDateSelector.innerText = ''
    error.innerText = ''
    secondCol.style.display = dateAndTimePicker ? 'none' : 'grid';
    calDays(yearDropdown.value, monthDropdown.value)
})

submitBtn.addEventListener('click', (e) => {
    let validInput = null;
    let timeArray = [];
    let array = [];
    let timepicker = false;

    if (document.querySelector('.date-picker')) {
        validInput = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0]?[1-9]|[1][0-2])[/]([0-9]{4})$/.test(input.value);
        array = validInput ? input.value.split('/') : [];
    } else if (document.querySelector('.dateAndTime-picker')) {
        timepicker = true;
        validInput = /^(3[01]|[12][0-9]|0[1-9])\/(1[0-2]|0[1-9])\/[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/.test(input.value)
        let [date, time] = validInput ? input.value.split(' ') : [null, null]
        array = date ? date.split('/') : [];
        timeArray = time ? time.split(':') : [];
        // console.log(validInput);
    }
    // console.log(validInput);
    // console.log(array);
    // console.log(array.length);
    // console.log(timeArray);
    if (validInput) {
        error.style.display = 'none'
        if (array[0] > 31 || array[1] > 12 || array[2] > 2030 || array[2] < 1970 ||
            timeArray[0] > 23 || timeArray[0] < 0 || timeArray[1] > 59 || timeArray[1] < 0) {
            utcDateSelector.innerText = ''
            error.innerText = 'invalid date! out of range!'
            error.style.display = 'block'
        } else {
            error.style.display = 'none'
            const utcDate = new Date(Date.UTC(array[2], array[1] - 1, array[0], timeArray[0] | 0, timeArray[1] | 0))
            // console.log(utcDate.toUTCString());
            utcDateSelector.innerText = utcDate.toUTCString()
            utcDateSelector.style.display = 'block'
        }
    } else {
        utcDateSelector.innerText = ''
        error.innerText = timepicker ?
            'Please enter valid date!(dd/mm/yyyy hh:mm)' :
            'Please enter valid date!(dd/mm/yyyy)';
        error.style.display = 'block'
    }
})

dateInput.addEventListener('focus', (e) => {
    dateCard.style.display = 'grid'
    // error.style.display = 'none'
    utcDateSelector.innerText = ''
})

clickable.addEventListener('click', () => {
    if (dateCard.style.display === 'grid') {
        dateCard.style.display = 'none'
    }
})

leftArrow.addEventListener('click', (e) => {
    if (monthDropdown.selectedIndex == 0 && yearDropdown.value != 1970) {
        monthDropdown.selectedIndex = 11
        yearDropdown.selectedIndex -= 1
        monthDropdown.dispatchEvent(new Event('change'))
        yearDropdown.dispatchEvent(new Event('change'))
    } else if (monthDropdown.selectedIndex == 0 && yearDropdown.value == 1970) {
        // monthDropdown.selectedIndex -= 1
    } else {
        monthDropdown.selectedIndex -= 1
        monthDropdown.dispatchEvent(new Event('change'))
    }
})

rightArrow.addEventListener('click', (e) => {
    if (monthDropdown.selectedIndex == 11 && yearDropdown.value != 2030) {
        monthDropdown.selectedIndex = 0
        yearDropdown.selectedIndex += 1
        monthDropdown.dispatchEvent(new Event('change'))
        yearDropdown.dispatchEvent(new Event('change'))
    } else if (monthDropdown.selectedIndex == 11 && yearDropdown.value == 2030) {
        // monthDropdown.selectedIndex -= 1
    } else {
        monthDropdown.selectedIndex += 1
        monthDropdown.dispatchEvent(new Event('change'))
    }
})

yearDropdown.addEventListener('change', (e) => {
    calDays(yearDropdown.value, monthDropdown.value)
})

monthDropdown.addEventListener('change', (e) => {
    calDays(yearDropdown.value, monthDropdown.value)
})

input.addEventListener('keyup', (e) => {
    if (Array.from(input.classList).find(val => val == 'date-picker') &&
        /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[/]([0]?[1-9]|[1][0-2])[/]([0-9]{4})$/.test(input.value)) {
        clickable.dispatchEvent(new Event('click'))
        error.style.display = 'none'
        submitBtn.disabled = false;
    } else if (Array.from(input.classList).find(val => val == 'dateAndTime-picker' &&
        /^(3[01]|[12][0-9]|0[1-9])\/(1[0-2]|0[1-9])\/[0-9]{4} (2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/.test(input.value))) {
        clickable.dispatchEvent(new Event('click'))
        error.style.display = 'none'
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
        error.style.display = 'block'
        error.innerText = 'invalid date format!'
    }
})