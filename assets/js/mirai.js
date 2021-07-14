


class Vec2{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
// jquery get border height was not working for some reason
// $('#nav-logo').outerHeight(true);
function getAbsoluteHeight(el) {
  // Get the DOM Node if you pass in a string
  el = (typeof el === 'string') ? document.querySelector(el) : el; 

  var styles = window.getComputedStyle(el);
  var margin = parseFloat(styles['marginTop']) +
               parseFloat(styles['marginBottom']);

  return Math.ceil(el.offsetHeight + margin);
}

const navMiraiContainer = document.querySelector('#nav-logo');
const navMiraiCanvas = document.createElement('canvas');
navMiraiCanvas.style.setProperty('vertical-align', 'bottom');//solve the vertical gap issue

width = navMiraiContainer.clientWidth;
oldHeight = navMiraiContainer.height;
height = getAbsoluteHeight(navMiraiContainer.parentElement) + 7;

canvasPadding = new Vec2( width * .05, 0 );
width -= canvasPadding.x *2;
height -= canvasPadding.y *2;




// navMiraiCanvas.setAttribute('width', 500);
// navMiraiCanvas.setAttribute('height', 500);
navMiraiCanvas.setAttribute('width', width);
navMiraiCanvas.setAttribute('height', height);
navMiraiContainer.appendChild(navMiraiCanvas);






console.log(navMiraiContainer);
// navMiraiCanvas.setAttribute('width', aWidth);
// navMiraiCanvas.setAttribute('height', aHeight);




ctx = navMiraiCanvas.getContext('2d');
class Mirai{
    constructor(ctx, width, height){
        this.width = width;
        this.height = height;
        this.ctx = ctx;
        this.teeth = 7;
        this.teethGap = this.width * .05;
        this.cheekSize = new Vec2( this.width * .1, this.height * .1);//half of remaining per cheek
        this.teethSize = new Vec2( (((this.width - this.teethGap * (this.teeth + 1)) ) /10.0), this.height * .1);

        this.color = '#d122e3';
        this.canvasBottomLeft = new Vec2(0, height);
        this.canvasBottomRight = new Vec2(width, height);
    }

    draw(){
        console.log(this.width, this.height);
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.canvasBottomLeft.x, 
                            this.canvasBottomLeft.y - this.cheekSize.y, 
                            this.cheekSize.x ,this.cheekSize.y);
        this.ctx.fillRect(this.canvasBottomRight.x - this.cheekSize.x, 
                            this.canvasBottomLeft.y - this.cheekSize.y, 
                            this.cheekSize.x ,this.cheekSize.y);
        let teethOriginX = this.canvasBottomLeft.x + this.cheekSize.x + this.teethGap;
        console.log(teethOriginX);

        let teethOriginY = this.height - this.cheekSize.y*.75;

        for (let i = 0; i < 7; i++) {
            this.ctx.fillRect(teethOriginX, teethOriginY, this.teethSize.x, this.teethSize.y);
            teethOriginX += this.teethGap + this.teethSize.x;

        }
    }
}

class Eye{

    constructor(ctx, origin, width, height){
        this.origin = origin;
        this.ctx = ctx;
        this.eyeSize = new Vec2(width * .15, height* .3);
        this.strokeSize = .05 * width;
        this.color = '#d122e3';
    }

    draw(){
        this.ctx.fillStyle = this.color;
        let cornerGap = new Vec2(this.strokeSize, this.strokeSize); 
        let lineOrigin = new Vec2(this.origin.x + cornerGap.x, 0);
        let lineSize = new Vec2(this.eyeSize.x  - ,this.strokeSize)
    }

}

var mirai = new Mirai(navMiraiCanvas.getContext('2d'), width, height);
  

mirai.draw();