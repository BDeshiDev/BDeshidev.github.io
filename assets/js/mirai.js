const noSoundList = ['.', ',','?',' '];
const teethCount = 7;
const maxTeethScale = 10;
const teethTweenTime = 100;

class Vec2{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Mirai{
    constructor(container, width, height, containerBottomLeft, containerBottomRight){
        this.width = width;
        this.height = height;
        this.container = container;
        this.teethGap = this.width * .05;
        this.cheekSize = new Vec2( this.width * .1, this.height * .075);//half of remaining per cheek
        this.teethSize = new Vec2( (((this.width - 20- this.teethGap * (teethCount -1)) ) /10.0), this.height * .05);
        this.containerBottomLeft = containerBottomLeft;
        this.containerBottomRight = containerBottomRight;

        this.createTeeth();
        this.createEyes();
    }

    createTeeth(){
        let t = document.createElement('div');
        t.classList.add('mirai__Cheek');
        t.style.width = this.cheekSize.x+"px";
        t.style.height = this.cheekSize.y+"px";
        t.style.left = 10  +"px";
        t.style.bottom = 0;
        t.style.position = "absolute";

        this.container.appendChild(t);

        
        t = document.createElement('div');
        t.classList.add('mirai__Cheek');
        t.style.width = this.cheekSize.x+"px";
        t.style.height = this.cheekSize.y+"px";
        t.style.right = 10  +"px";
        t.style.bottom = 0;
        t.style.position = "absolute";

        this.container.appendChild(t);

        let teethOriginX = this.containerBottomLeft.x + 10 +this.cheekSize.x + this.teethGap;
        let teethOriginY = this.height - this.cheekSize.y*.5;
        
        this.teeth = [];
        for (let i = 0; i < teethCount; i++) {
            let t = document.createElement('div');
            t.classList.add('mirai__Teeth');
            t.style.width = this.teethSize.x+"px";
            t.style.height = this.teethSize.y+"px";
            t.style.left = teethOriginX  +"px";
            t.style.bottom = this.cheekSize.y * .25 + "px";
            t.style.position = "absolute";
            this.teeth[i] = t;
            this.container.appendChild(t);
            teethOriginX += this.teethGap + this.teethSize.x;
        }
        this.speechAnim = anime.timeline({
            duration: teethTweenTime,
            easing: 'easeOutQuad',
            // loop: true,
            // endDelay: 0
            autoplay: false,
        });
        let middle = this.teeth.length / 2.0;
        // console.log(middle + " " + (this.teeth.length / 2.0));
        for (let i = 0; i < this.teeth.length; i++) {
            let t =  (1.2 + (maxTeethScale -1.2) * (((i+1)  <= middle? (i+1) : (this.teeth.length -i)))/middle);
            // console.log(t);
            this.speechAnim.add({
                targets: this.teeth[i],
                scaleY: [
                    {value: t, duration: teethTweenTime *.75},
                    {value: 1, duration: teethTweenTime *.25}
                ],
            }, 0);
        }
        let that = this;
        let a = 9;
        var fufu = ()=> {
            setTimeout(() => {
                if(a > 0){
                    a--;
                    fufu();
                    that.speechAnim.restart();
                }
            }, 150);
        };
        fufu();
        console.log(this.speechAnim);

    }

    createEyes(){
        let eyes = this.container.querySelectorAll('.mirai__Eye');
        if(eyes.length >= 2){

            let e =new Eye(eyes[0]).eye;
            // let e = eyes[0]
            e.style.position = "absolute";
            e.setAttribute("width", (this.width * .15)+"px");
            e.setAttribute("height", (this.height* .4)+"px");
            e.style.width = (this.width * .15)+"px";
            e.style.height = (this.height* .4)+"px";
            e.style.top = (this.height* .1) + "px";
            e.style.left = (this.width * .15)+"px";

            e =new Eye(eyes[1]).eye;

            
            e = eyes[1];
            e.style.position = "absolute";
            e.style.width = (this.width * .15)+"px";
            e.style.height = (this.height* .4)+"px";
            e.style.top = (this.height* .1) + "px";
            e.style.fill = "green"; 
            e.style.right = (this.width * .15)+"px";

             
        }else{
            console.log("wrong number of eyes");
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
                endDelay: 500   
            }
        )
    }


    blink(){
        this.eyeBlinkAnim.restart();
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

const navMiraiContainer = document.querySelector('#nav-logo');

width = navMiraiContainer.clientWidth;
oldHeight = navMiraiContainer.height;
height = getAbsoluteHeight(navMiraiContainer.parentElement) + 7;

canvasPadding = new Vec2( width * .05, 0 );
width -= canvasPadding.x *2;
height -= canvasPadding.y *2;
containerBottomLeft = new Vec2(0, height);
containerBottomRight = new Vec2(width, height);



var mirai = new Mirai(navMiraiContainer, width, height, containerBottomLeft, containerBottomRight);

// let eye = container.querySelector('svg-test');