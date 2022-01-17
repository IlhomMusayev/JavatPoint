const modalElement = document.querySelector('#modal1')

const editBtns = document.querySelectorAll('.edit__btn')

const language_name = document.querySelector('.language_name_input')

editBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        modalElement.style.display = 'block'
        console.log(btn.dataset.id);
        const language_id = document.querySelector('.update_language_id_input')
        const language_name_table = btn.parentNode.parentNode.parentNode.querySelector('.language_name').textContent
        language_name.value = language_name_table
        language_id.value = btn.dataset.id
        
        
        const languageUpdateFormElement = document.querySelector('.language__update__form')
        languageUpdateFormElement.addEventListener('submit', async (e) => {
            console.log(languageUpdateFormElement.language_id.value);
            e.preventDefault()
            let response = await fetch('/admin/languages', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body:  JSON.stringify( {
                    language_name: languageUpdateFormElement.language_name.value,
                    status: languageUpdateFormElement.status.value,
                    language_id: languageUpdateFormElement.language_id.value
                })
            })

            response = await response.json();
            console.log(response);
            if (!response.ok) {
                const errorElement = document.querySelector('.error_update')
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
                console.log("salom");
                window.location.reload();
            }
        })


    })
})
function closeEditModal(){
    modalElement.style.display = 'none'
}



const deleteModalElement = document.querySelector('.delete_modal')

const deleteLanguageBtnElements = document.querySelectorAll('.delete_btn')

deleteLanguageBtnElements.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const languageInput = document.querySelector('.language_id_input_delete')
        deleteModalElement.style.display = "block"
        languageInput.value = btn.dataset.id
    })
})
