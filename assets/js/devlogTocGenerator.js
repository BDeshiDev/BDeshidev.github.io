let prevAnchor = null;

$('.blog__SideNav__List').each(
    (index, el)=> {
        var sticky = new Waypoint.Sticky({
            element:  el
          }); 
    }
)

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
        if(firstHeader != null){
            
        }
        console.log(el);
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