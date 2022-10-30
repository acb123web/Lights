setTimeout(function(){
  var lights_count = 10,
  wire_color = '#0325a16b',
  glow_size = 3,
  twinkle = false,
  rotation_max = 35,
  target_elements = document.querySelectorAll('.addLights'),
  colors = ['Blue','red','gold','orangered','ForestGreen','DarkViolet','HotPink'],
  l_width = 100 / lights_count;


  target_elements.forEach(function(elm){
    var elm_loc = elm.getBoundingClientRect(),
    elm_h = Math.floor(elm_loc.height / (elm_loc.width / lights_count))

    /**horizontal lights */
 for(var i=0; i<elm_h; i++){
  var l = document.createElement('div');
  l.className = 'light_box';
  l.style.width = elm_loc.height / elm_h + 'px';
  l.style.height = elm_loc.width + 'px';
  l.style.position = 'absolute';
  l.style.left = 0;
  l.style.top = 100 / elm_h * i + '%';
  var rot = Math.random() < .5 ? -Math.random()*rotation_max : Math.random()*rotation_max;

  l.innerHTML = 
  `<div class="light" style='--color:${colors[i%colors.length]};transform:rotate(${rot}deg);'></div> 
  <div class="light" style='--color:${colors[(i+2)%colors.length]};transform:rotate(${rot}deg);'></div>`;

  if(twinkle){
    l.classList.add('twinkle');
    l.style.setProperty('--delay', i / 3 - 1 + 's');
  }
  l.style.transformOrigin = '0 0';
  var width_px =  elm_loc.width/(lights_count);
  l.style.transform = `translateX(${(lights_count)*(width_px)}px) rotate(90deg)`;
  elm.appendChild(l);
}

/**Vertical lights */
for(var i=0; i<lights_count; i++){
    var l = document.createElement('div');
    l.className = 'light_box';
    l.style.width = l_width + '%';
    l.style.position = 'absolute';
    l.style.left = l_width * i + '%';
    l.style.top = '0';
    l.style.bottom = '0';
    var rot = Math.random() < .5 ? -Math.random()*rotation_max : Math.random()*rotation_max;
  
    l.innerHTML = 
    `<div class="light" style='--color:${colors[i%colors.length]};transform:rotate(${rot}deg);'></div> 
    <div class="light" style='--color:${colors[(i+2)%colors.length]};transform:rotate(${rot}deg);'></div>`;
  
    if(twinkle){
      l.classList.add('twinkle');
      l.style.setProperty('--delay', i / 3 - 1 + 's');
    }
    elm.appendChild(l);
  }
  })

  document.body.innerHTML += `
  <style>
  .twinkle .light::after{
    animation:twinkle 1s linear var(--delay) infinite;
  }
  @keyframes twinkle{
    50%{box-shadow: 0 0 0 transparent; }
  }

  .light_box{
    pointer-events:none;
  }
  .light{
    width:15%;
    max-width:15px;
    aspect-ratio:1/1;
    background:${wire_color};
    position:absolute;
    left:40%;
    border-radius:25%;
    --color:gold;
  }
  .light:nth-child(1){
    top:99.5%;
    transform-origin:50% 0%;
  }
  .light:nth-child(2){
    bottom:99.5%;
    transform-origin:50% 100%;
  }

  .light::after{
    content:' ';
    width:150%;
    aspect-ratio:1/2;
    background:radial-gradient(rgba(255,255,255,.5), transparent), var(--color);
    font-size:${glow_size}px;
    box-shadow:0 0 3em 1em var(--color);
    position:absolute;
    left:-25%;
}
.light:nth-child(1)::after{
    top:80%;
    border-radius:100% / 60% 60% 125% 125%;
}
.light:nth-child(2)::after{
    bottom:80%;
    border-radius:100% / 125% 125% 60% 60%;
}
.addLights{
    position:relative;
    border:2px solid ${wire_color};
}
  </style>
  `

},1000);