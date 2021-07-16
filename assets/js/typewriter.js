var perCharPrintDelay = 64;//ms
var perCharDeleteDelay = 24;//ms

class TypeWriter{
    constructor(el,  holdTime){
        this.el = el;
        this.fullText =  el.innerText || el.textContent;
        console.log(this.fullText);
        this.showCount = 0;
        if(holdTime)
            this.holdTime = holdTime;
    }

    typeText(){
        this.el.hidden = false;
        return new Promise((resolve)=> {
            if(this.showCount < (this.fullText.length)){
                this.showCount++;
                this.el.textContent = this.fullText.substring(0, this.showCount);
    
                setTimeout(() => {
                    return this.typeText();
                }, perCharPrintDelay);
            }else{
                if(this.holdTime){
                    console.log("hold " + this.holdTime);
                    setTimeout(() => {
                        resolve();
                    }, this.holdTime);
                }else{
                    console.log("resolve typed");
                    resolve();
                }
            }
        })
    }

    isTypeComplete(){return this.showCount >= this.fullText.length};
    isDeleteComplete() {return this.showCount <= 0;}

    deleteText(){
        return new Promise((resolve, reject)=> {
            if(this.showCount > 0){
                this.showCount--;
                this.el.textContent = this.fullText.substring(0, this.showCount);
    
                setTimeout(() => {
                   return this.deleteText();
                }, perCharDeleteDelay);
            }else{
            this.el.hidden = true;

                resolve();
            }
        })
        
    }
}

class TypeWriterGroup{
    constructor(){
        this.writers  = [];
        this.curWriterNo = 0;
    }
    reset(){
        
        for (let i = 0; i < this.writers  .length; i++) {//loop is bound to run
            if(promise){
                promise = promise.then(this.writers  [i].typeText());
            }else{
                promise = this.writers  .typeText();
            }
        }
    }
    typeText(){

                if(!this.isTypeComplete()){
                    var promise = this.writers[this.curWriterNo].typeText();
                    this.curWriterNo++;
                    return promise.then(this.typeText());
                }else{
                    resolve();
                }
            
        
    }
    

    isTypeComplete(){
        if(this.writers  .length <=0)
            return true;
        if(this.curWriterNo < (this.writers  .length)-1)
            return false;
        return this.curWriterNo >= this.writers  .length || this.writers  [this.curWriterNo].isTypeComplete();
    }
    isDeleteComplete(){
        if(this.writers  .length <=0)
            return true;
        if(this.curWriterNo > (this.writers  .length)-1)
            return false;
        return this.curWriterNo <0 || this.writers  [this.curWriterNo].isDeleteCompelte();
    }

    deleteText(){
        if(!this.isDeleteComplete()){
            var promise = null;
            for (let i = 0; i < this.writers  .length; i++) {//loop is bound to run
                if(promise){
                    promise = promise.then(this.writers  [i].deleteText());
                }else{
                    promise = this.writers  [i].deleteText();
                }
            }
            return promise;
        }else{
            Promise.resolve();
        }
    }
}




window.onload = function() {
    var elements = document.querySelectorAll('.typeWriterGroup');
    for (let i=0; i<elements.length; i++) {
        let children = elements[i].querySelectorAll('.typeWriter');
        var writerGroup = new TypeWriterGroup();
        for (let i = 0; i < children.length; i++) {

            let c = children[i];
            let waitTime =  c.getAttribute('hold-time');
            writerGroup.writers[i] = {target: c};
            if(waitTime){
                waitTime = JSON.parse(waitTime);
                writerGroup.writers[i] = new TypeWriter(c, waitTime);
            }else{
                writerGroup.writers[i] = new TypeWriter(c);
            }
        }
        console.log(i);
        writerGroup.typeText().then(()=> {console.log('donefgfgfg')});
        // writerGroup.writers[3].typeText().then(()=> {console.log('donefgfgfg')});

    }
    console.log("done" + elements.length);
    // INJECT CSS
    // document.body.appendChild(css);
};