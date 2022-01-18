// Select subject
const languageSelect = document.querySelectorAll('.language__select')
const subjectSelect = document.querySelectorAll('.subject__select')

languageSelect.forEach(select =>{
  select.addEventListener('change', async (e) => {
    let response = await fetch('/admin/tutorials/'+ select.value, { 
        method: 'GET',
    })

    response = await response.json()

    console.log(response);

    let subject = ""
    response.subject.forEach(item => {
        subject = subject + `<option value=${item["subjects.subject_id"]}>${item["subjects.subject_name"]} </option>`
    })

    subjectSelect.forEach(item => {
      item.innerHTML = subject
    })
})
})

// Create tutorial

const tutorialFormElement = document.querySelector('.tutorial__form')

tutorialFormElement.addEventListener('submit', async (e) => {
    e.preventDefault()
    const option = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            tutorial_name: tutorialFormElement.tutorial_name.value,
            language_id: tutorialFormElement.language_id.value,
            tutorial_content: tinyMCE.activeEditor.getContent(),
            subject_id: tutorialFormElement.subject_id.value
        })
    }
    
    let response = await fetch('/admin/tutorials', option)
    response = await response.json();

    if (!response.ok) {
        const errorElement = document.querySelector('.error')
        let error = `   <div class="rounded-md bg-red-50 p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" x-description="Heroicon name: solid/x-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">
            ${response.message}
            </h3>
          </div>
        </div>
      </div>`
      errorElement.innerHTML = error
    }else{
        window.location.reload();
    }
})