const searchInputElement = document.querySelector('.header__section__search__input')
const headerSectionElement = document.querySelector('.header__section__search')
const data = []
async function getTutorials(){
    let response = await fetch('/api/tutorials', {
        method: 'GET',
    })
    response = await response.json()

    response.tutorials.forEach(item => {
        data.push(item)
    })
}
getTutorials()

function convertToSlug(Text) {
    return Text.toLowerCase()
               .replace(/ /g, '-')
               .replace(/[^\w-]+/g, '');
}


searchInputElement.addEventListener('input', (e) => {
    let inputDropdownElement = document.createElement('div')
    inputDropdownElement.classList.add('input__dropdown')
    searchInputElement.style = "border-radius: 30px 30px 0 0"
    data.forEach(item => {

        if(item.tutorial_name.toLowerCase().includes(searchInputElement.value.toLowerCase())){
            const inputDropdownItemElement = document.createElement('div')
            inputDropdownItemElement.classList.add('input__dropdown__item')
            const inputDropdownItemLinkElement = document.createElement('a')
            inputDropdownItemLinkElement.textContent = item.tutorial_name
            inputDropdownItemLinkElement.href = `/${item["language.language_slug"]}/${item.tutorial_slug}`
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
