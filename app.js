const currentTime = document.querySelector(".current-time");
const range = { 'hour': [1, 12], 'minute': [0, 59], 'second': [0, 59] }
const alarmList = document.querySelector('.alarm-lists');
const alarmAdd = document.querySelector('.alarm-add');
let alarms = [];


// initializing the alarm list, initially there won't be any alarms on the list so it won't display the list;
const display = () => {
    if (alarms.length == 0) {
        alarmList.style.display = 'none';
    } else {
        alarmList.style.display = 'block';
    }
}
display();
/* 

-- fillOptions(key) --> takes in key, whose values will be either [hour, minute, second] in string
-- This function will fill and remove the options like 1,2,3,4 ... 12 in case of hour and 1,2,3,...59 in case of minutes and seconds

*/
function fillOptions(key) {
    var obj = document.querySelector(`.${key}-select`);
    for (let i = range[key][0]; i <= range[key][1]; i++) {
        let li = document.createElement('li');
        li.setAttribute('data-value', key);
        li.innerHTML = `${i < 10 ? '0' + i : i}`;
        obj.append(li);
    }
}
fillOptions('hour');
fillOptions('minute');
fillOptions('second');


/* 

updateValue(element) --> this will be used to update the hour, minute and second
parameters which are defined inside the "input-btn" class

*/
const updateValue = (obj) => {
    if (obj.dataset.value == 'meridiem') {
        const target = document.querySelector('.meridiem');
        if (target.innerText == 'PM') {
            target.innerText = 'AM';
        } else {
            target.innerText = 'PM';
        }
        return;
    }
    const target = document.querySelector(`.${obj.dataset.value}-place`)
    target.innerText = obj.innerText;
}

/*

ringAlarm() ---> this function will keep checking whether the current timer is equal to one of the alarms that
we have added in the list and if it is, it will run an alert msg

*/

const ringAlarm = () => {
    setInterval(()=>{
        const time = currentTime.innerText;
        console.log(time);
        for(let item of alarms) {
            if (time.trim() == item.children[0].innerText.trim()) {
                alert(`Ring Ring Ring -- ${currentTime.innerText} has triggered ......`)
                break;
            }
        }
    }, 1000)
}
ringAlarm();



/* 

startTimer() -- this is used to display the real timer and then based on which the alarm
system is implemented

*/
function startTimer() {
    setInterval(() => {
        const time = new Date();
        var h = time.getHours();
        var m = time.getMinutes();
        var s = time.getSeconds();

        var meridiem = 'PM';
        // formating the timezone like 12:00:00 AM to 12:00:00 PM
        if (h > 12) {
            h = h - 12;
        } else if (h < 12) {
            h = h == 0 ? 12 : h;
            meridiem = 'AM';
        }
        // this '0' + x , is used to show 0 before a single integer hour, minute or second
        h = h <= 9 ? '0' + h : h;
        m = m <= 9 ? '0' + m : m;
        s = s <= 9 ? '0' + s : s;

        // console.log(`${h}:${m}:${s} ${meridiem}`)
        currentTime.innerText = `${h}:${m}:${s} ${meridiem}`

        // this for loop will check if the timer is matching with one of the alarms, if yes, it will alert
        // for (let item of alarms) {
        //     if (currentTime.innerText.trim() == item.children[0].innerText.trim()) {
        //         alert(`Ring Ring Ring -- ${currentTime.innerText} has triggered ......`)
        //         break;
        //     }
        // }  
    }, 0)

}
startTimer()



/*

addAlarm() --> this function will add an alarm and will display and hide the alarms list  section based on the 
count of alarms that it has currently, which we are keeping track with alarms variable

*/

const addAlarm = () => {
    const li = document.createElement('li');
    const hour = document.querySelector(`.hour-place`)
    const minute = document.querySelector(`.minute-place`)
    const second = document.querySelector(`.second-place`)
    const meridiem = document.querySelector(`.meridiem`)
    let word = `${hour.innerText}:${minute.innerText}:${second.innerText} ${meridiem.innerText}`
    let id = Math.random();
    li.innerHTML = `<span>${word}</span> <button class="btn" data-value="delete" data-id=${id}>X</button>`
    li.setAttribute('data-id', id);
    alarmAdd.append(li);
    alarms.push(li);
    display();
}


/* 

deleteAlarm(element) --> this function will delete the alarm from the alarm list by checking the id of the element
that matches with id of that list element

*/

const deleteAlarm = (obj) => {
    var temp = '';
    for (let item of alarms) {
        if (obj.dataset.id === item.dataset.id) {
            temp = item;
            break;
        }
    }
    if (temp == '') {
        console.log('cannot find the element');
        return;
    }
    alarms = alarms.filter((item) => item.dataset.id != temp.dataset.id);
    temp.remove();
    display();
}


/*
Event Delegation concept is implemented
*/
const clickHandler = (e) => {
    if (e.target.dataset.value == 'hour' || e.target.dataset.value == 'minute' || e.target.dataset.value == 'second' || e.target.dataset.value == 'meridiem') {
        updateValue(e.target);
    } else if (e.target.dataset.value == 'add-alarm') {
        addAlarm()
    } else if (e.target.dataset.value == 'delete') {
        deleteAlarm(e.target);
    }
}
document.addEventListener('click', clickHandler)