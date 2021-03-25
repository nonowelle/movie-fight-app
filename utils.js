//DEBOUNCE FUNCTION TO REUSE OUR DEBOUCE WITH OTHER FUNCTIONS THAN ONINPUT IN THE FUTURE
//it returns a function 
const debounce = (func, delay = 1000) => {
    let timeOutId;
    return (...args) => {
        if (timeOutId) {
            clearTimeout(timeOutId)
        }
        timeOutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};