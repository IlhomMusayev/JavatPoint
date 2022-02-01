const modalElement = document.querySelector('#modal1')

const editBtns = document.querySelectorAll('.edit_btn')

const subject_name = document.querySelector('.subject_name_input')

editBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        modalElement.style.display = 'block'
         (btn.dataset.id);
        const subject_id = document.querySelector('.update_subject_id_input')
        const subject_name_table = btn.parentNode.parentNode.parentNode.querySelector('.subject_name').textContent
        subject_name.value = subject_name_table
        subject_id.value = btn.dataset.id
        
        
        const subjectUpdateFormElement = document.querySelector('.subejct__update__form')
        subjectUpdateFormElement.addEventListener('submit', async (e) => {
            e.preventDefault()
            let response = await fetch('/admin/subject', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json'},
                body:  JSON.stringify( {
                    subject_name: subjectUpdateFormElement.subject_name.value,
                    language_id: subjectUpdateFormElement.language_id.value,
                    subject_id: subjectUpdateFormElement.subject_id.value
                })
            })

            response = await response.json();
             (response);
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
                 ("salom");
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
        const subjectInput = document.querySelector('.subject_id_input_delete')
        deleteModalElement.style.display = "block"
        subjectInput.value = btn.dataset.id
    })
})


function closeDeleteModal(){
    deleteModalElement.style.display = "none"
}