export default class Forms {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = { 
            loading: 'Loading...',
            success: 'Thank you! We will contact you soon!',
            failure: 'Something went wrong...',
        };
    }

    async postData(url, data) { 
        let res = await fetch(url, { 
            method: 'POST',
            body: data,
        });
        return await res.text(); 
    }

    clearInputs () {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkMailInputs () {
        const mailInputs = document.querySelectorAll('[type="email"]');
        mailInputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^a-z @ 0-9 \.]/ig, ''); 
            });
        }); 
    }

    initMask() {
        let setCursorPosition = (pos, elem) => { 
            elem.focus(); 
            
            if (elem.setSelectionRange) { 
               elem.setSelectionRange(pos, pos); 
            } else if (elem.createTextRange) { 
                let range = elem.createTextRange(); 
      
                range.collapse(true); 
                range.moveEnd('character', pos); 
                range.moveStart('character', pos); 
                range.select(); 
            }
        };
      
        function createMask(event) {
            let matrix = `+1 (___) ___-____`, 
                i = 0, 
                def = matrix.replace(/\D/g, ''), 
                val = this.value.replace(/\D/g, ''); 
            
            if (def.length >= val.length) {
                val = def; 
            }

            this.value = matrix.replace(/./g, function(a) {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
               
            if (event.type === 'blur') { 
                if (this.value.length == 2) { 
                    this.value = ''; 
                }
            } else { 
                setCursorPosition(this.value.length, this);
            }
        }
            
        let inputs = document.querySelectorAll('[name="phone"');
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('keypress', createMask); 
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        }); 
    }

    init() {
        this.initMask();
        this.checkMailInputs();

        this.forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                form.parentNode.appendChild(statusMessage);
                statusMessage.style.cssText =`
                    color: #9ec73d;
                    font-size: 30px;
                    font-weight: 900;
                `;
                statusMessage.textContent = this.message.loading;
        
                form.classList.add('animated', 'fadeOutUp'); 
                setTimeout(() => {
                    form.style.display = 'none'; 
                }, 400);
    
                const formData = new FormData(form);

                this.postData('assets/question.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = this.message.success; 
                })
                .catch(() => {
                    statusMessage.textContent = this.message.failure; 
                })
                .finally(() => {
                    this.clearInputs();
                    setTimeout(() => {
                        statusMessage.remove(); 
                        form.style.display = 'block'; 
                        form.classList.remove('fadeOutUp');
                        form.classList.remove('fadeInUp');
                    }, 5000);
                });
            });
        });
    }
}