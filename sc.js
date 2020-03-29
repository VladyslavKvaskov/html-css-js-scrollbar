const sc_scrollbar = document.querySelector('.vk-scrollbar');
const sc_thumb = document.querySelector('.vk-scrollbar-thumb');
const sc_track = document.querySelector('.vk-scrollbar-track');
const sc_up = document.querySelector('.vk-scrollbar-up');
const sc_down = document.querySelector('.vk-scrollbar-down');
const sc_thumb_up = document.querySelector('.vk-scrollbar-thumb .up');
const sc_thumb_down = document.querySelector('.vk-scrollbar-thumb .down');
const thumb_height = 36;
let canDrag = false;
let prevScrollTop = 0;
let loaded = false;
window.onscroll = () => {
  if(loaded){
    check_positionScrollThumb();
  }
  else{
    check_positionScrollThumb_Load();
  }
}
sc_thumb.onmousedown = (e) => {
  canDrag = true;
  sc_thumb.classList.add('dragged');
  document.body.classList.add('body-dragged');
}
sc_thumb.ontransitionend = () => {
  document.documentElement.classList.remove('body-smooth-scroll');
  document.body.classList.remove('body-smooth-scroll');
}
window.onmouseup = () => {
  canDrag = false;
  if(sc_thumb.classList.contains('dragged')){
    sc_thumb_up.classList.remove('animate');
    sc_thumb_down.classList.remove('animate');
  }
  sc_thumb.classList.remove('dragged');
  document.body.classList.remove('body-dragged');
}
let percent = 0;
let elementBounds;
window.onmousemove = (e) => {
  if(canDrag){
    e.preventDefault();
    document.documentElement.classList.remove('body-smooth-scroll');
    document.body.classList.remove('body-smooth-scroll');
    moveScrollbarThumbToCursorPosition(e);
  }
}
sc_track.onmousedown = (e) =>{
  if(e.target != sc_thumb){
    document.documentElement.classList.add('body-smooth-scroll');
    document.body.classList.add('body-smooth-scroll');
    setTimeout(()=>{moveScrollbarThumbToCursorPosition(e);},50);
  }
}
window.onload = () => {
  checkScreenForScroll();
}
window.onresize = () =>{
  checkScreenForScroll();
}
sc_up.onclick = () => {
  document.body.scrollTop = 0;
}
sc_down.onclick = () => {
  document.body.scrollTop = (document.documentElement.scrollHeight - window.innerHeight);
}
sc_thumb_up.ontransitionend = () => {
  sc_thumb_up.classList.remove('animate');
}
sc_thumb_down.ontransitionend = () => {
  sc_thumb_down.classList.remove('animate');
}

function moveScrollbarThumbToCursorPosition(e){
  elementBounds = sc_track.getBoundingClientRect();
  percent = ((e.clientY - elementBounds.top) / elementBounds.height) * 100;
  if (percent < 0) {
    percent = 0;
  } else if (percent > 100){
    percent = 100;
  }
  document.body.scrollTop = (document.documentElement.scrollHeight - window.innerHeight) * (percent / 100);
}
function checkScreenForScroll(){
  if(document.documentElement.scrollHeight - window.innerHeight < 1){
    sc_scrollbar.hidden = true;
  }
  else{
    sc_scrollbar.hidden = false;
  }
}
function check_positionScrollThumb(){
  const scrolltop = (document.body.scrollTop + document.documentElement.scrollTop);
  const scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  const offsetPX = (scrollpercent / 100) * thumb_height;

  if(scrolltop < prevScrollTop){
    sc_thumb_down.classList.remove('animate');
    sc_thumb_up.classList.add('animate');
  }
  else{
    sc_thumb_up.classList.remove('animate');
    sc_thumb_down.classList.add('animate');
  }
  prevScrollTop = scrolltop;
  sc_thumb.style.top = `calc(${scrollpercent}% - ${offsetPX}px)`;
}
function check_positionScrollThumb_Load(){
  loaded = true;
  const scrolltop = (document.body.scrollTop + document.documentElement.scrollTop);
  const scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - window.innerHeight) * 100;
  const offsetPX = (scrollpercent / 100) * thumb_height;
  prevScrollTop = scrolltop;
  sc_thumb.style.top = `calc(${scrollpercent}% - ${offsetPX}px)`;
}
