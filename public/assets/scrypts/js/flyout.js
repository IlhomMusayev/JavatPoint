const tutotrialsLinkElement = document.querySelector('.tutorials_link')
const flayoutMenuElement = document.querySelector('.flayout_menu')

tutotrialsLinkElement.addEventListener('mouseover', (e) => {
    flayoutMenuElement.style.display = "block"
})
flayoutMenuElement.addEventListener('mouseover', (e) => {
    flayoutMenuElement.style.display = "block"
})
tutotrialsLinkElement.addEventListener('mouseout', (e) => {
    flayoutMenuElement.style.display = "block"
})

flayoutMenuElement.addEventListener('mouseout', (e) => {
    flayoutMenuElement.style.display = "none"
})