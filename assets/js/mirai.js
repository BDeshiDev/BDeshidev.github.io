const noSoundList = ['.', ',','?',' '];
const teethCount = 7;
const maxTeethScale = 8;
const teethTweenTime = 100;
const minSpeechAnimRestartTime = 150;
const miraiAspect = 3;//~180/55 = ratio in header
//because javascript is an insane language that deserves it's own place in hell for not even handling callback contexts properly
function bindMethods(o, ...excludeMembers) {
    let p = o.constructor.prototype,
        exclude = new Set(excludeMembers);
    Object.getOwnPropertyNames(p)
        .concat(Object.getOwnPropertySymbols(p))
        .filter(n => p[n] instanceof Function && p[n] !== p.constructor && !exclude.has(n))
        .forEach(n => o[n] = o[n].bind(o));
}

class Vec2{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class CustomMiraiContainer{
    constructor(el, width, height){
        this.el = el;
        this.width = width;
        this.height =  height;
    }

    bottomLeft(){
        return new Vec2(0, height);
    }

    bottomRight(){
        return new Vec2(width, height);
    }
}

class Mirai{
    constructor(container, width, height, containerBottomLeft, containerBottomRight){
        this.width = width;
        this.height = height;
        this.container = container;

        this.containerBottomLeft = containerBottomLeft;
        this.containerBottomRight = containerBottomRight;

        this.createTeeth();
        this.createEyes();

        this.queuedChar = null;
        bindMethods(this);
    }

    createTeeth(){
        let t = document.createElement('div');
        //in %
        let teethGap = 5;
        let cheekSize = new Vec2(10, 7.5);//half of remaining per cheek
        let teethSize = new Vec2( (((100 - 5.56 * 5- teethGap * (teethCount -1)) ) /10.0), 5);

        console.log(teethSize);        
        
        t.classList.add('mirai__Cheek');
        t.style.width = cheekSize.x + "%";
        t.style.height = cheekSize.y +"%";
        t.style.left = "5.56%";
        t.style.bottom = 0;
        t.style.position = "absolute";

        this.container.appendChild(t);

        
        t = document.createElement('div');
        t.classList.add('mirai__Cheek');
        t.style.width = cheekSize.x + "%";
        t.style.height = cheekSize.y +"%";
        t.style.right = "5.56%";
        t.style.bottom = 0;
        t.style.position = "absolute";

        this.container.appendChild(t);

        let teethOriginX = this.containerBottomLeft.x + 5.56 +cheekSize.x + teethGap;
        let teethOriginY = this.height - cheekSize.y*.5;
        
        this.teeth = [];
        for (let i = 0; i < teethCount; i++) {
            let t = document.createElement('div');
            t.classList.add('mirai__Teeth');
            t.style.width = teethSize.x+"%";
            t.style.height = "5%";
            t.style.left = teethOriginX +"%";
            t.style.bottom =  cheekSize.y * .25 + "%";
            t.style.position = "absolute";
            this.teeth[i] = t;
            this.container.appendChild(t);
            teethOriginX += teethGap + teethSize.x;
        }
        this.speechAnim = anime.timeline({
            targets: this.teeth,
            easing: 'easeOutQuad'
        });

        this.speechAnim.add({

            scaleY: function(el, i, l) {
                let middle = l / 2.0;
                let t = ((1.2 + (maxTeethScale -1.2) * 
                        (((i+1)  <= middle? (i+1) : (l -i)))/middle)) *
                        anime.random(9, 10)/10.0;
                    return t; 
                },
            duration: teethTweenTime *.75,
            loop: true,
        });

        this.speechAnim.add({

            scaleY: 1,
            duration: teethTweenTime *.75,
            loop: true,
        });

    }

    doSpeechAnim(){
        this.speechAnim.restart();
        this.isSpeaking = true;
   
        setTimeout(() => { 
            if(this.queuedChar){
                this.queuedChar = null;
                this.doSpeechAnim();
            }else{
                this.isSpeaking = false;
            }
        }, minSpeechAnimRestartTime);
    }


    

    createEyes(){
        let eyes = this.container.querySelectorAll('.mirai__Eye');
        if(eyes.length >= 2){

            let e =new Eye(eyes[0]).eye;

            e.setAttribute("width", "15%");
            e.setAttribute("height", "4%");
            e.style.width = "15%";
            e.style.height= "40%";
            e.style.top =  "10%";
            e.style.left = "15%";

            e =new Eye(eyes[1]).eye;
            console.log(e);

            
            e = eyes[1];
         
            e.setAttribute("width", "15%");
            e.setAttribute("height", "4%");
            e.style.width = "15%";
            e.style.height= "40%";
            e.style.top =  "10%";
            e.style.right = "15%";
            
            e.style.fill = "green"; 

            console.log(e);
             
        }else{
            console.log("wrong number of eyes");
        }
    }
    handleCharTyped(c){
        if(noSoundList.includes(c)){
            return;
        }
        if(this.isSpeaking){
            this.queuedChar = c;
        }else{
            this.doSpeechAnim();
        }

    }
    
}


class Eye{

    constructor(eye){
        this.eye = eye;
        this.eyeBlinkAnim = anime(
            {
                targets: eye,
                scaleY: [
            
                    {value: 0,easing: 'easeOutQuad', duration: 120},
                    {value: 1.1,   easing: 'easeOutQuad', duration: 80},
                    {value: 1,   easing: 'easeOutQuad', duration: 50}   
                ],
                //scaling on x axis moves the element weirdlysometimes
                scaleX: [
                    {value: 1.1, easing: 'easeInQuad', delay: 60, duration: 60,},
                    {value: .8, easing: 'easeOutQuad',  duration: 80,},
                    {value: 1, easing: 'easeOutQuad',  duration: 50,},
                ],
            
                // autoplay: false,
                autoplay: true,
                loop: true,
                endDelay: 5000   
            }
        )
    }


    blink(){
        this.eyeBlinkAnim.restart();
    }

    enableBlink(){
        this.eyeBlinkAnim.loop = true;
    }

    disableBlink(){
        this.eyeBlinkAnim.loop = false;
    }

}
function getAbsoluteHeight(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

var mirais = [];

function handleCharTyped(c){
    for (let i = 0; i < mirais.length; i++) {
        mirais[i].handleCharTyped(c);
    }
}

function createMiraiInsideContainer(container){
    width = container.clientWidth;
    oldHeight = container.height;
    // height = getAbsoluteHeight(container.parentElement) + 7;
    height = getAbsoluteHeight(container.parentElement) +7 ;

    canvasPadding = new Vec2( width * .05, 0 );
    width -= canvasPadding.x *2;
    height -= canvasPadding.y *2;
    containerBottomLeft = new Vec2(0, height);
    containerBottomRight = new Vec2(width, height);

    return new Mirai(container, width, height, containerBottomLeft, containerBottomRight);
}

function fetchAndCreateMirais(){
    let targetContainers = document.querySelectorAll('.mirai');
    console.log(targetContainers.length);
    for (let i = 0; i < targetContainers.length; i++) {
        mirais[i] = createMiraiInsideContainer(targetContainers[i])
        
    }
}

window.onload = fetchAndCreateMirais();