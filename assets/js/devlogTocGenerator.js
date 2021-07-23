let prevAnchor = null;
// $('.blog__SideNav__List__Item').each(
//     (index, el)=> {
//         var $el = $(el);
//          var sticky = new Waypoint.Sticky({
//             element:  el,
//             stuckClass: 'AnchorStuck',
//             handler: (dir) => {
//                 console.log( $el + " " + prevAnchor);
//                 if(prevAnchor){
//                     prevAnchor.removeClass('AnchorStuck');
//                 }
//                 prevAnchor = $el;
              
//             }
//           }); 
//     }
// )

$('.blog__SideNav__List').each(
    (index, el)=> {
        var sticky = new Waypoint.Sticky({
            element:  el
          }); 
    }
)

let navHeaders = $('.blog__SideNav__List__Item');
let cur =0;
let headers = $(".blog__Body").find(":header").each((index, el)=> {
    let i =cur;
    let navHeader = navHeaders[i];
    cur++;   
    console.log(el);
     var sticky = new Waypoint.Sticky({
        element:el,
        stuckClass: '',
        handler: (dir) => {
            console.log( el);
            $(navHeader).addClass('AnchorStuck');
            if(prevAnchor){
                $(prevAnchor).removeClass('AnchorStuck');
            }
            prevAnchor = navHeader;
        }
      }); 
}
)


function handleWaypointReached(dir){
    
}
