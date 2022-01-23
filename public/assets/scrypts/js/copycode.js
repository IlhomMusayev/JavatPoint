const codeElements = document.querySelectorAll('pre')

codeElements.forEach(codeItem => {
    const copyBtnElement = document.createElement('button')
    const alertElement = document.createElement('div')

    copyBtnElement.classList.add("copy_btn")
    alertElement.classList.add('copy_alert')

    copyBtnElement.innerHTML = "<i class='fas fa-clipboard'></i>"
    alertElement.innerHTML = "Nusxa olindi"

    codeItem.appendChild(copyBtnElement)
    codeItem.appendChild(alertElement)

    copyBtnElement.addEventListener('click', (e) => {
        navigator.clipboard.writeText(e.target.parentNode.parentNode.parentNode.textContent);
        alertElement.style.display = "block"
        
        setTimeout(() => {
            alertElement.style.display = "none"
        }, 3000)
    })
})
