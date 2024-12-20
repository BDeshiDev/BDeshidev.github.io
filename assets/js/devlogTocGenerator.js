

let prevAnchor = null;

$('.blog__SideNav__List').each(
    (index, el)=> {
        var sticky = new Waypoint.Sticky({
            element:  el,
            // wrapper: false,
          }); 
    }
);
// 
let navHeaders = $('.blog__SideNav__List__Item');
let cur =0;

const headers = $(".blog__Body").find(":header");
let activeNavHeaders = [];

if(headers.length > 0){
    var firstHeader = headers[0];
    var lastHeader = headers[headers.length -1];
    headers.each((index, el)=> {
        let i =cur;
        let navHeader = navHeaders[i];
        cur++;   
        
        //this line was changed last session
        $(el).addClass('anchor');

        var sticky = new Waypoint.Inview({
            element: el,
            enter: function(direction) {
                // console.log('Entered triggered with direction ' + direction);

                if(direction =='down'){
                    $(navHeader).addClass('AnchorStuck');
                    if(prevAnchor){
                        $(prevAnchor).removeClass('AnchorStuck');
                    }
                    prevAnchor = navHeader;
    
                    activeNavHeaders[activeNavHeaders.length] = navHeader;
                }
            },
            exited: function(direction) {
                // console.log( $(el).text() + 'Exit triggered with direction ' + direction);

                if(direction == 'up'){
                    if(activeNavHeaders.length > 1){
                        $(activeNavHeaders.pop()).removeClass('AnchorStuck');
                        prevAnchor = activeNavHeaders[activeNavHeaders.length -1];
                        $(prevAnchor).addClass('AnchorStuck');
                    }
                }
            }
        }); 
    }
    );
}
class SimpleToggleMenu{
    constructor(openButton, openTarget){
        this.openButton = openButton;
        this.openTarget = openTarget;
        this.ogText = openButton.textContent.trim();
        this.isMenuToggled = false;
        this.openButton.addEventListener('click', () => {
            if(this.isMenuToggled){
                $(this.openTarget).removeClass('open');
                this.openButton.innerText = this.ogText;
            }else{
                this.openButton.innerText = 'X';
                $(this.openTarget).addClass('open');
                
            }
            this.isMenuToggled = !this.isMenuToggled;
        })
    }
}
let openButton = document.querySelector('#topicToggleButton');
let openTarget = $('.blog__Topic')
                    .add('.blog__Topic__Container')
                    .add('#topicToggleButton');

if(openButton && openTarget){
    var topicToggleMenu = new SimpleToggleMenu(openButton, openTarget);
}


openButton = document.querySelector('#sideNavToggleButton');
openTarget = $('.blog__SideNav')
                    .add('.blog__SideNav__Container')
                    .add('#sideNavToggleButton');

if(openButton && openTarget && headers.length > 0){
    var topicToggleMenu = new SimpleToggleMenu(openButton, openTarget);
}
