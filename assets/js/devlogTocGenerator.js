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

var firstHeader = null;
const headers = $(".blog__Body").find(":header");

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
            entered: function(direction) {
                // console.log('Entered triggered with direction ' + direction);
                $(navHeader).addClass('AnchorStuck');
                if(prevAnchor){
                    $(prevAnchor).removeClass('AnchorStuck');
                }
                prevAnchor = navHeader;
            },
            exit: function(direction) {
                // console.log('Exit triggered with direction ' + direction);

                if(el == lastHeader && direction == 'down'){
                    console.log(direction );
                    return;
                }


                if(el == firstHeader && direction == 'up'){
                    console.log(direction );
                    return;
                }

                // console.log('unstick')
                if(el){
                    $(el).removeClass('AnchorStuck');
                }
                if(prevAnchor == el){
                    prevAnchor = null;
                }
            }
        }); 
    }
    );
}

function handleWaypointReached(dir){
    
}
