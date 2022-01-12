const searchInputElement = document.querySelector('.header__section__search__input')
const headerSectionElement = document.querySelector('.header__section__search')
const data = [
    'Html',
    'Html tag',
    'Html links',
    'Html header',
    'Html',
    'Css',
    'Js',
    'Js 1',
    'Js 2',
    'JavaScript',
    'Php'
]

searchInputElement.addEventListener('input', (e) => {
    let inputDropdownElement = document.createElement('div')
    inputDropdownElement.classList.add('input__dropdown')
    searchInputElement.style = "border-radius: 30px 30px 0 0"
    data.forEach(item => {

        if(item.toLowerCase().includes(searchInputElement.value.toLowerCase())){
            const inputDropdownItemElement = document.createElement('div')
            inputDropdownItemElement.classList.add('input__dropdown__item')
            const inputDropdownItemLinkElement = document.createElement('a')
            inputDropdownItemLinkElement.textContent = item
            inputDropdownItemLinkElement.href = item
            inputDropdownItemElement.appendChild(inputDropdownItemLinkElement)
            inputDropdownElement.appendChild(inputDropdownItemElement)
            headerSectionElement.appendChild(inputDropdownElement)
        }
    })
    if(e.target.value.length === 0){
        inputDropdownElement = document.querySelectorAll(".input__dropdown")
        inputDropdownElement.forEach(item => {
            item.remove()
        })
        searchInputElement.style = "border-radius: 30px"
    }
})