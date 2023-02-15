export default class Download {
    constructor(trigger) {
        this.btns = document.querySelectorAll(trigger);
        this.path = 'assets/img/mainbg.jpg'; 
    }
    
    downloadItem(path) {
        const link = document.createElement('a'); 
        
        link.setAttribute('href', path); 
        link.setAttribute('download', 'our_picture'); 

        link.style.display = 'none'; 
        document.body.appendChild(link); 

        link.click(); 

        document.body.removeChild(link); 
    }

    init() {
        this.btns.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', (e) => {
                e.stopPropagation(); 
                this.downloadItem(this.path); 
            });
        });
    }
}