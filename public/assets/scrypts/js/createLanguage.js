async function createLanguage() {
    const languagesListElement =  document.querySelector('.languages__list')
    const languageForm = document.querySelector('.language__form')
    languageForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        console.log(languageForm.file_name.files[0]);
        const formData = new FormData()

        formData.append("language_name", languageForm.language_name.value)
        formData.append("status", languageForm.status.value)
        formData.append("file", languageForm.file_name.files[0])

        const option = {
            method: 'POST',
            body: formData
        }

        let response = await fetch('/admin/languages', option)
        response = await response.json();
        console.log(response);
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