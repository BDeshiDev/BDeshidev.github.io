
var defaultPerCharPrintDelay = 64;//ms
var defaultperCharDeleteDelay = 24;//ms


async function sleepAsync (t) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), t)
    })
}

class TypeWriter{
    constructor(el, perCharPrintDelay, holdTime){
        this.el = el;
        this.fullText =  el.innerText || el.textContent;
        
        this.showCount = 0;
        if(holdTime)
            this.holdTime = holdTime;
        this.perCharPrintDelay = perCharPrintDelay? perCharPrintDelay: defaultPerCharPrintDelay;
        this.perCharDeleteDelay =  defaultperCharDeleteDelay;
        //default one is plenty fast
        // this.perCharDeleteDelay = perCharDeleteDelay? perCharDeleteDelay: defaultperCharDeleteDelay;
    }

    async typeText(){
        this.el.hidden = false;
        if(this.showCount < (this.fullText.length)){
            this.showCount++;
            this.el.textContent = this.fullText.substring(0, this.showCount);

            this.handleCharTyped(this.fullText[this.showCount - 1]);

            await sleepAsync(this.perCharPrintDelay);
            await this.typeText();

        }else{
            if(this.holdTime){
                await sleepAsync(this.holdTime);
            }else{
                
            }
        }   
    }

    handleCharTyped(c){
        if(this.charTypedCallBack)
            this.charTypedCallBack(c);
    }

    isTypeComplete(){return this.showCount >= this.fullText.length};
    isDeleteComplete() {return this.showCount <= 0;}
    async deleteText(){
        if(this.showCount > 0){
            this.showCount--;
            this.el.textContent = this.fullText.substring(0, this.showCount);
            
            await sleepAsync(this.perCharDeleteDelay);
            await this.deleteText();
        }else{
            this.el.hidden = true;
        }
    }
    reset(){
        this.el.hidden = true;
        this.el.textContent = '';
    }
}

class TypeWriterGroup{
    constructor(){
        this.writers  = [];
        this.curWriterNo = 0;
    }
    reset(){
        for (let i = 0; i < this.writers.length; i++) {//loop is bound to run
            this.writers[i].reset();
        }
    }
    async typeText(){
        for(this.curWriterNo = 0;  this.curWriterNo < this.writers.length; this.curWriterNo++){
            await this.writers[this.curWriterNo].typeText();
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

    async deleteText(){
        for(this.curWriterNo =  this.writers.length -1 ;  this.curWriterNo>= 0; this.curWriterNo--){
            await this.writers[this.curWriterNo].deleteText();
        }      
    }
}

const typeWriterGroups = [];

async function test(writerGroup){
    await writerGroup.typeText();
    await writerGroup.deleteText();
    console.log('done');
}

//call this with an optional callback
// not bothering with with a proper event system for now
function fetchAndCreateTypeWriters(charTypedCallBack){
    var elements = document.querySelectorAll('.typeWriterGroup');
    for (let i=0; i<elements.length; i++) {
        let children = elements[i].querySelectorAll('.typeWriter');
        var writerGroup = new TypeWriterGroup();
        typeWriterGroups[i] = writerGroup;
        for (let i = 0; i < children.length; i++) {

            let c = children[i];
            let waitTime =  c.getAttribute('hold-time');
            let charTypeTime =  c.getAttribute('char-type-time');
            writerGroup.writers[i] = {target: c};

            if(waitTime){
                waitTime = JSON.parse(waitTime);   
            }
            if(charTypeTime){
                charTypeTime = JSON.parse(charTypeTime);
            }
            writerGroup.writers[i] = new TypeWriter(c, charTypeTime, waitTime);
            writerGroup.writers[i].charTypedCallBack = charTypedCallBack;
        }
        // console.log(i);
        // test(writerGroup);
        writerGroup.typeText();
    }
};