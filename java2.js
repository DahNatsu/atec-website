const track = document.getElementsByClassName("image-track")[0];

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  //         // Round the nextPercentage value to the nearest multiple of the width of a single image
  // const imageWidth = track.getElementsByClassName("image")[0].offsetWidth;
  // const snappedNextPercentage = Math.round(nextPercentage / imageWidth) * imageWidth;

  // const handleOnUp = () => {
  //   // Calculate the width of one image in pixels
  //   const imageWidth = track.getElementsByClassName("image")[0].offsetWidth;
    
  //   // Round down the current percentage value to the nearest multiple of the image width
  //   const snappedPercentage = Math.floor(track.dataset.percentage / imageWidth) * imageWidth;
    
  //   track.dataset.mouseDownAt = "0";  
  //   track.dataset.prevPercentage = snappedPercentage;
    
  //   // Animate the track to the snapped percentage value
  //   track.animate({
  //     transform: `translate(${snappedPercentage}%, -50%)`
  //   }, { duration: 1200, fill: "forwards" });
    
  //   for(const image of track.getElementsByClassName("image")) {
  //     image.animate({
  //       objectPosition: `${100 + snappedPercentage}% center`
  //     }, { duration: 1200, fill: "forwards" });
  //   }
  // }


  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + nextPercentage}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

  // check if the next percentage is beyond the minimum or maximum allowed value
  // if (nextPercentage > 0) {
  //   track.dataset.percentage = 0;
  // } else if (nextPercentage < -100) {
  //   track.dataset.percentage = -100;
  // } else {
  //   track.dataset.percentage = nextPercentage;
  // }
  
  // track.animate({
  //   transform: `translate(${track.dataset.percentage}%, -50%)`
  // }, { duration: 1200, fill: "forwards" });
  
  // for(const image of track.getElementsByClassName("image")) {
  //   image.animate({
  //     objectPosition: `${100 + track.dataset.percentage}% center`
  //   }, { duration: 1200, fill: "forwards" });
  // }




/* -- Had to add extra lines for touch events -- */

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);