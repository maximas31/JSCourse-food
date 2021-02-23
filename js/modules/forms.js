function forms() {
       //POST Forms

       const forms = document.querySelectorAll('form');

       const message = {
           loading: '/food/img/form/spinner.svg',
           succes: 'Succes! pe curand',
           failed: 'Ceva nu a mers corect'
       };
   
       forms.forEach(item => {
           bindPostData(item);
       });
   
       const postData = async (url, data) => {
           const res = await fetch(url, {
               method: "POST",
               headers: {
                   'Content-type': 'application/json'
               },
               body: data
           });
   
           return await res.json();
       };
   
       function bindPostData(form) {
           form.addEventListener('submit', (e) => {
               e.preventDefault();
   
               const statusMessage = document.createElement('img');
               statusMessage.src = message.loading;
               statusMessage.style.cssText = `
                   display:block;
                   margin: 0 auto;
               `;
               form.insertAdjacentElement('afterend', statusMessage);
   
               const formData = new FormData(form);
   
               const json = JSON.stringify(Object.fromEntries(formData.entries()));
   
               const obj = {
                   a: 23,
                   b: 50
               };
   
               console.log(Object.entries(obj));
   
               postData('http://localhost:3000/requests', json)
                   .then(data => {
                       console.log(data);
                       showThanksModal(message.succes);
                       statusMessage.remove();
                   }).catch(() => {
                       showThanksModal(message.failed);
                   }).finally(() => {
                       form.reset();
                   });
           });
       }
   
       // Modal Succes 
   
       function showThanksModal(message) {
           const prevModalDialog = document.querySelector('.modal__dialog');
   
           prevModalDialog.classList.add('hide');
           openModal();
   
           const thanksModal = document.createElement('div');
           thanksModal.classList.add('modal__dialog');
           thanksModal.innerHTML = `
               <div class="modal__content">
                   <div class="modal__close" data-close>×</div>
                   <div class="modal__title">${message}</div>
               </div>
           `;
   
           document.querySelector(".modal").append(thanksModal);
           setTimeout(() => {
               thanksModal.remove();
               prevModalDialog.classList.add('show');
               prevModalDialog.classList.remove('hide');
               closeModal();
           }, 4000);
       }
}

export default forms;