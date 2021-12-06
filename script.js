function initPage() {
    const currentHour = parseInt(moment().format("kk"));
    const currentDayEl = document.getElementById("currentDay");
    currentDayEl.innerHTML = moment().format("dddd, MMMM Do YYYY");

    const emptyPlan = [
        {
            "time": 9,
            "note": ""
        },
        {
            "time": 10,
            "note": ""
        },
        {
            "time": 11,
            "note": ""
        },
        {
            "time": 12,
            "note": ""
        },
        {
            "time": 13,
            "note": ""
        },
        {
            "time": 14,
            "note": ""
        },
        {
            "time": 15,
            "note": ""
        },
        {
            "time": 16,
            "note": ""
        },
        {
            "time": 17,
            "note": ""
        }
    ];

    const dayPlan = JSON.parse(localStorage.getItem("plan")) || emptyPlan;
    const timeblockContainer = document.getElementById("timeblock-container");
    timeblockContainer.innerHTML = "";

    for (let i=0; i<dayPlan.length; i++) {
        let hourString;
        const hour = 9 + i;
        if (hour<12) {
            hourString = `${hour} AM`;
        } else if (hour === 12) {
            hourString = `${hour} PM`;
        } else {
            hourString = `${hour - 12} PM`
        }
        const timeBlock = document.createElement("div");
        timeBlock.setAttribute("class", "row input-group time-block");
        timeblockContainer.append(timeBlock);

        const timeContainer = document.createElement("div");
        timeContainer.setAttribute("class", "input-group-prepend");
        timeBlock.append(timeContainer);

        const timeSpan = document.createElement("span");
        timeSpan.setAttribute("class", "input-group-text hour");
        timeSpan.innerHTML = hourString;
        timeContainer.append(timeSpan);

        const noteEl = document.createElement("input");
        noteEl.setAttribute("type", "text");
        if (hour < currentHour) {
            noteEl.setAttribute("class", "form-control description past");
        } else if (hour === currentHour) {
            noteEl.setAttribute("class", "form-control description present");
        } else {
            noteEl.setAttribute("class", "form-control description future");
        }
        noteEl.setAttribute("placeholder", dayPlan[i].note);
        timeBlock.append(noteEl);

        const saveContainer = document.createElement("div");
        saveContainer.setAttribute("class", "input-group-append");
        timeBlock.append(saveContainer);

        const saveSpan = document.createElement("span");
        saveSpan.setAttribute("class", "saveBtn");
        saveContainer.append(saveSpan);

        const saveIcon = document.createElement("i");
        saveIcon.setAttribute("class", "fas fa-save");
        // Save button saves note entered by user to local storage
        saveIcon.addEventListener("click", () => {
            dayPlan[i].note = noteEl.value;
            localStorage.setItem("plan", JSON.stringify(dayPlan));
        });
        saveSpan.append(saveIcon);
    }
}

initPage();