const modalElement = document.querySelector('#modal1')

const editBtns = document.querySelectorAll('.edit__btn')

const language_id = document.querySelector('.update_language_id_input')
const language_name = document.querySelector('.language_name_input')

editBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        modalElement.style.display = 'block'
        const language_name_table = btn.parentNode.parentNode.parentNode.querySelector('.language_name').textContent
        console.log(language_name_table);
        language_name.value = language_name_table
    })
})
function closeEditModal(){
    modalElement.style.display = 'none'
}
