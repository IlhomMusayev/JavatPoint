const languageSelect = document.querySelector('.language__select')
const subjectSelect = document.querySelector('.subject__select')

languageSelect.addEventListener('change', async (e) => {
    console.log(languageSelect.value);

    let response = await fetch('/admin/tutorials/'+ languageSelect.value, { 
        method: 'POST',
    })

    response = await response.json()

    console.log(response.subject);
    let subject = ""
    response.subject.forEach(item => {
        subject = subject + `<option value=${item["subjects.subject_id"]}>${item["subjects.subject_name"]} </option>`
    })

    subjectSelect.innerHTML = subject

})