function initPage() {
    // Get the current hour of the day
    const currentHour = parseInt(moment().format("kk"));
    // Update the page with the current date
    const currentDayEl = document.getElementById("currentDay");
    currentDayEl.innerHTML = moment().format("dddd, MMMM Do YYYY");
}