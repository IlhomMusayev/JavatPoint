async function createLanguage() {
     ('slaom');
    const subjectListElement =  document.querySelector('.languages__list')
    const subjectForm = document.querySelector('.subject__form')
    subjectForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const option = {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject_name: subjectForm.subject_name.value,
                language_id: subjectForm.language_id.value,
            })
        }

        let response = await fetch('/admin/subject', option)
        response = await response.json();
         (response);
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
}
createLanguage()