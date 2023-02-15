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
    async postData(url, data) { //асинхронная ф-я - async
        let res = await fetch(url, { //асинхронная операция await, чтобы JS дождался выполнения операции, т.к. ответ от сервера может идти долго
            method: 'POST',
            body: data,
        });
        return await res.text(); //возврат текстовых данных(в данном случае, тоже ждем окончания операции (await)
    };

    clearInputs () {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkMailInputs () {
        const mailInputs = document.querySelectorAll('[type="email"]');
        mailInputs.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^a-z @ 0-9 \.]/ig, ''); //при введении не цифр вводится пустая строка
            });
        }); 
    };

    initMask() {
        //Ф-я установки позиция курсора
        let setCursorPosition = (pos, elem) => { //в pos будет кол-во символов //elem -this - объект с которым мы будем работать
            elem.focus(); //вручную ставим focus на элементе
            
            if (elem.setSelectionRange) { 
               elem.setSelectionRange(pos, pos); 
            } else if (elem.createTextRange) { //Ниже пойдет ручной полифилл для старых браузеров IE
                let range = elem.createTextRange(); // создание диапазона, кот-й нужно выделить
                //с помощью метода createTextRange создается Объект TextRange
      
                range.collapse(true); //Метод collapse объединяет граничные точки диапазона, т.е. первое с последней позицией
                range.moveEnd('character', pos); //указываем коду где будет конечная точка выделения. character - символ
                range.moveStart('character', pos); //указываем коду где будет конечная точка выделения (в итоге будет одно и то же место)
                range.select(); //установка курсора и выделение того значения которое сформировалось при помощи 2-х предыдущих параметров(move)
            }
        };
      
        function createMask(event) {
            let matrix = `+1 (___) ___-____`, //матрица для создания
                i = 0, //итератор
                def = matrix.replace(/\D/g, ''), //значение статичное на основе матрицы - default (получаем все НЕцифры)
                val = this.value.replace(/\D/g, ''); //значение динамичное на основании что ввел пользователь
            
            if (def.length >= val.length) {
                val = def; // если пользователь вдруг удаляет семерку и плюс, то у него не получится
            }
            this.value = matrix.replace(/./g, function(a) {//перебор символов в матрице и возврат в зависимости от определенных условий // a - тех. аргумент
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
            ///[_\d]/ - диапазон поиска цифр и подчеркиваний
            //Метод regexp.test(str) ищет совпадение и возвращает true/false, в зависимости от того, находит ли он его.
            //val.charAt(i++) - метод charAt() возвращает символ по заданному индексу внутри строки
      
            // Отработка события blur/focus
            if (event.type === 'blur') { //если пользователь нажал вне инпута 
                if (this.value.length == 2) { // если в инпуте 2 символа
                    this.value = ''; // то очистим инпут
                }
                } else { // если focus
                    setCursorPosition(this.value.length, this);//то срабатывает эта ф-я //this.value.length - кол-во символов
                }
            }
            // событие focus вызывается в момент фокусировки, а blur – когда элемент теряет фокус.
        
        let inputs = document.querySelectorAll('[name="phone"');
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('keypress', createMask); //обработчик keypress, который срабатывает от нажатия на клавишу и ещё до того, как был введён какой-то символ, перемещает курсор перед кодом страны
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
        
                form.classList.add('animated', 'fadeOutUp'); //форма станет прозрачной
                setTimeout(() => {
                    form.style.display = 'none'; //потом еще и исчезнет
                }, 400);
    
                const formData = new FormData(form);
                this.postData('assets/question.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = this.message.success; //плашка об успешности
                })
                .catch(() => {
                    statusMessage.textContent = this.message.failure; //плашка о неудаче   
                })
                .finally(() => {
                    this.clearInputs();
                    setTimeout(() => {
                        statusMessage.remove(); //удаляем сообщение через 5 сек
                        form.style.display = 'block'; //появление формы обратно 
                        form.classList.remove('fadeOutUp');
                        form.classList.remove('fadeInUp');
                    }, 5000);
                });
            });
        });
            
    }
}