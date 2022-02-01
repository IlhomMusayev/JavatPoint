const modalElement = document.querySelector('#modal1')

const editBtns = document.querySelectorAll('.edit_btn')

const tutorial_name = document.querySelector('.tutorial_name_input')
const tutorial_content = document.querySelector('.tutorial_content_update')

editBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        modalElement.style.display = 'block'
        const tutorial_id = document.querySelector('.update_tutorial_id_input')
        const tutorial_name_table = btn.parentNode.parentNode.parentNode.querySelector('.tutorial_name').textContent
        const tutorial_content_table = btn.parentNode.parentNode.parentNode.querySelector('.tutorial_content').textContent

        tutorial_name.value = tutorial_name_table
        tinymce.get("myTextarea1").setContent(tutorial_content_table)
        tutorial_id.value = btn.dataset.id
        
        
        const tutorialUpdateFormElement = document.querySelector('.tutorial__update__form')
        tutorialUpdateFormElement.addEventListener('submit', async (e) => {
            e.preventDefault()
            let response = await fetch('/admin/tutorials', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body:  JSON.stringify( {
                    tutorial_name: tutorialUpdateFormElement.tutorial_name.value,
                    subject_id: tutorialUpdateFormElement.subject_id.value,
                    language_id: tutorialUpdateFormElement.language_id.value,
                    tutorial_id: tutorialUpdateFormElement.tutorial_id.value,
                    tutorial_content: tinymce.get("myTextarea1").getContent()
                })
            })

            response = await response.json();
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
                window.location.reload();
            }
        })


    })
})
function closeEditModal(){
    modalElement.style.display = 'none'
}



const deleteModalElement = document.querySelector('.delete_modal')

const deleteSubjectBtnElements = document.querySelectorAll('.delete_btn')

deleteSubjectBtnElements.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const subjectInput = document.querySelector('.tutorial_id_input_delete')
        deleteModalElement.style.display = "block"
        subjectInput.value = btn.dataset.id
    })
})


function closeDeleteModal(){
    deleteModalElement.style.display = "none"
}