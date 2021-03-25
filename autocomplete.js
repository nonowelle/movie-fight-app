
//destructure the config object to extract the root element and the renderOption function and use them afterward
const createAutoComplete = ({ root, renderOption, onOptionSelect, inputValue, fetchData }) => {

    root.innerHTML = `
    <label><b>Search </b></label>
    <input class="input" />
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results"></div>
        </div>
    </div>
    `
    //Look inside of the root element to select what we need (instead of looking in the entire document)
    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');


    const onInput = async event => {
        const items = await fetchData(event.target.value);

        //check if theres no data for this movie and if so close the dropdown
        if (!items.length) {
            dropdown.classList.remove("is-active");
            return;
        }
        //erase any previous search results from the dropdown
        resultsWrapper.innerHTML = "";
        //Open the dropdown and add the html with new data
        dropdown.classList.add('is-active');
        for (let item of items) {
            const option = document.createElement('a');
            option.classList.add("dropdown-item");
            option.innerHTML = renderOption(item);
            //When we click on a item option, the menu closes and we update the input value with the exact title
            option.addEventListener('click', () => {
                dropdown.classList.remove("is-active");
                input.value = inputValue(item);
                //SECOND DATA FETCHING
                onOptionSelect(item);
            })
            resultsWrapper.appendChild(option)
        }
    };
    //The input event is triggered every time a user changes something on an input
    input.addEventListener('input', debounce(onInput, 500));

    document.addEventListener('click', event => {
        if (!root.contains(event.target)) {
            dropdown.classList.remove("is-active");
        }
    })

}