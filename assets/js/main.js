(function(){
  var $=function(s,c){return (c||document).querySelector(s)}, $$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  $('#yr').textContent=new Date().getFullYear();

  /* nav */
  var nav=$('#nav'), top=$('#top-btn');
  function onScroll(){var y=window.scrollY;nav.classList.toggle('scrolled',y>40);top.classList.toggle('show',y>900)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  $('#burger').addEventListener('click',function(){var o=nav.classList.toggle('open');this.setAttribute('aria-expanded',o)});
  $$('#menu a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open')})});
  var secs=$$('main section[id]').filter(function(s){return $('#menu a[href="#'+s.id+'"]')});
  var spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){$$('#menu a').forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){spy.observe(s)});

  /* reveal */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
  $$('.rv').forEach(function(el,i){el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});

  /* counter */
  var cn=$('[data-count]');
  if(cn&&!reduce){var target=+cn.dataset.count;var co=new IntersectionObserver(function(es){if(es[0].isIntersecting){var t0=performance.now();(function f(t){var p=Math.min((t-t0)/1600,1);cn.textContent=Math.round(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0);co.disconnect()}});co.observe(cn)}

  /* tabs */
  $$('.tab').forEach(function(t){t.addEventListener('click',function(){
    $$('.tab').forEach(function(x){x.setAttribute('aria-selected',x===t)});
    $$('.panel').forEach(function(p){p.classList.toggle('show',p.id===t.dataset.p)});
  })});

  /* disclosure documents */
  var documents={
    'society-register':['https://srinakshatraschool.com/wp-content/uploads/2026/09/SOCIETY-register--scaled.jpg'],
    'parent-teacher-association':['https://srinakshatraschool.com/wp-content/uploads/2026/09/PARENT-TEACHER-ASSOCIATION-PDF-scaled.jpg'],
    'affiliation-order':['https://srinakshatraschool.com/wp-content/uploads/2026/09/CBSE-CONFIRM-LETTER-images-0-scaled.jpg','https://srinakshatraschool.com/wp-content/uploads/2026/09/CBSE-CONFIRM-LETTER-images-1-scaled.jpg'],
    'fire-certificate':['https://srinakshatraschool.com/wp-content/uploads/2026/09/Fire-Certificate-2025-images-0-scaled.jpg','https://srinakshatraschool.com/wp-content/uploads/2026/09/Fire-Certificate-2025-images-1-scaled.jpg'],
    'safe-drinking-water':['https://srinakshatraschool.com/wp-content/uploads/2026/09/Safe-Drinking-Water-scaled.jpg'],
    'build-up-area-certificate':['https://srinakshatraschool.com/wp-content/uploads/2026/09/build-up-area-certificate-aug-scaled.jpg'],
    'sanitary-certificate':['https://srinakshatraschool.com/wp-content/uploads/2026/09/sanitary-certificate--scaled.jpg'],
    'academic-calendar':['https://srinakshatraschool.com/wp-content/uploads/2026/09/academic-calender-images-0-scaled.jpg','https://srinakshatraschool.com/wp-content/uploads/2026/09/academic-calender-images-1-scaled.jpg'],
    'certificate-of-land':['https://srinakshatraschool.com/wp-content/uploads/2026/09/Land-Certificate--scaled.jpg'],
    'recognition-certificate':['https://srinakshatraschool.com/wp-content/uploads/2026/09/RECOGNITION-CERTIFICATE-1-to-10-th-images-0-scaled.jpg','https://srinakshatraschool.com/wp-content/uploads/2026/09/RECOGNITION-CERTIFICATE-1-to-10-th-images-1-scaled.jpg'],
    'fee-structure':['https://srinakshatraschool.com/wp-content/uploads/2026/09/Fee-Structure.jpeg'],
    'class-x-result':['https://srinakshatraschool.com/wp-content/uploads/2026/09/RESULT-scaled-e1788898217830.jpg'],
    'building-safety-certificate':['https://srinakshatraschool.com/wp-content/uploads/2026/09/Screenshot-2026-09-09-004125.png']
  };
  var docViewer=$('#doc-viewer'),docPages=$('#doc-pages'),docTitle=$('#doc-title'),docBack=$('#doc-back');
  var docZoomReset=$('#doc-zoom-reset'),docZoomOut=$('#doc-zoom-out'),docZoomIn=$('#doc-zoom-in'),docZoom=1;
  var docImage=document.createElement('img'),docPageControls=$('#doc-page-controls'),docPageCount=$('#doc-page-count');
  var docPagePrev=$('#doc-page-prev'),docPageNext=$('#doc-page-next'),currentDocImages=[],currentDocPage=0;
  var docMessage=document.createElement('p');
  docPages.appendChild(docImage);
  docPages.appendChild(docMessage);
  var disclosureLinks=$$('#disclosures a[data-document]');
  function applyDocZoom(){
    var style=window.getComputedStyle(docPages);
    var availableWidth=docPages.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight);
    var availableHeight=docPages.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom);
    if(docImage.naturalWidth&&docImage.naturalHeight&&availableWidth>0&&availableHeight>0){
      var scale=Math.min(availableWidth/docImage.naturalWidth,availableHeight/docImage.naturalHeight)*docZoom;
      docImage.style.width=Math.round(docImage.naturalWidth*scale)+'px';
      docImage.style.height=Math.round(docImage.naturalHeight*scale)+'px';
    }
    docZoomReset.textContent=docZoom===1?'Fit':Math.round(docZoom*100)+'%';
  }
  function showDocPage(index){
    currentDocPage=(index+currentDocImages.length)%currentDocImages.length;
    docImage.alt=docTitle.textContent+' - page '+(currentDocPage+1);
    docImage.style.width='auto';
    docImage.style.height='auto';
    docImage.onload=applyDocZoom;
    docImage.onerror=function(){
      docImage.hidden=true;
      docMessage.hidden=false;
      docMessage.textContent='Unable to load this document page. Please try again later.';
    };
    docImage.hidden=false;
    docMessage.hidden=true;
    docImage.src=currentDocImages[currentDocPage];
    docPageCount.textContent=(currentDocPage+1)+' / '+currentDocImages.length;
    docPages.scrollTop=0;
    docPages.scrollLeft=0;
    if(docImage.complete)applyDocZoom();
  }
  function closeDocument(){
    docViewer.hidden=true;
    document.body.classList.remove('document-open');
    history.replaceState(null,'','#disclosures');
    $('#disclosures').scrollIntoView();
  }
  disclosureLinks.forEach(function(link){link.addEventListener('click',function(e){
    e.preventDefault();
    var key=link.dataset.document,images=documents[key];
    docZoom=1;
    docTitle.textContent=link.textContent.trim();
    if(!images){
      currentDocImages=[];
      docPageControls.hidden=true;
      docImage.hidden=true;
      docMessage.hidden=false;
      docMessage.textContent='This document is not available right now.';
    }
    else{
      currentDocImages=images;
      docPageControls.hidden=images.length<2;
      showDocPage(0);
    }
    docViewer.hidden=false;
    docPages.scrollTop=0;
    applyDocZoom();
    document.body.classList.add('document-open');
    docBack.focus();
  })});
  docPagePrev.addEventListener('click',function(){showDocPage(currentDocPage-1)});
  docPageNext.addEventListener('click',function(){showDocPage(currentDocPage+1)});
  docZoomOut.addEventListener('click',function(){docZoom=Math.max(.5,docZoom-.25);applyDocZoom()});
  docZoomIn.addEventListener('click',function(){docZoom=Math.min(2.5,docZoom+.25);applyDocZoom()});
  docZoomReset.addEventListener('click',function(){docZoom=1;applyDocZoom()});
  window.addEventListener('resize',function(){if(!docViewer.hidden)applyDocZoom()});
  docBack.addEventListener('click',closeDocument);
  document.addEventListener('keydown',function(e){if(!docViewer.hidden&&e.key==='Escape')closeDocument()});

  /* lightbox */
  var items=$$('#masonry button'), lb=$('#lb'), cur=0;
  function show(i){cur=(i+items.length)%items.length;var im=$('img',items[cur]);$('#lbimg').src=im.src;$('#lbimg').alt=im.alt;$('#lbcap').textContent=items[cur].dataset.cap}
  items.forEach(function(b,i){b.addEventListener('click',function(){show(i);lb.classList.add('open')})});
  $('.x',lb).onclick=function(){lb.classList.remove('open')};
  $('.p',lb).onclick=function(){show(cur-1)};$('.n',lb).onclick=function(){show(cur+1)};
  lb.addEventListener('click',function(e){if(e.target===lb)lb.classList.remove('open')});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('open'))return;if(e.key==='Escape')lb.classList.remove('open');if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});

  /* enquiry -> WhatsApp */
  $('#enq').addEventListener('submit',function(e){e.preventDefault();var f=e.target;
    var m='Hello, I would like to enquire about admission at Sri Nakshatra School.%0AParent: '+encodeURIComponent(f.name.value)+'%0APhone: '+encodeURIComponent(f.phone.value)+'%0AClass: '+encodeURIComponent(f.cls.value)+(f.msg.value?'%0AMessage: '+encodeURIComponent(f.msg.value):'');
    window.open('https://wa.me/919339999334?text='+m,'_blank','noopener')});

  /* starfield with a drawing constellation (a nod to "Nakshatra") */
  var cv=$('#stars'),ctx=cv.getContext('2d'),W,H,stars=[],dpr=Math.min(window.devicePixelRatio||1,2);
  var cons=[[.70,.22],[.76,.30],[.83,.27],[.88,.36],[.82,.45],[.90,.52]];
  function size(){W=cv.clientWidth;H=cv.clientHeight;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    stars=[];var n=Math.round(W*H/9000);for(var i=0;i<n;i++)stars.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.3+.2,p:Math.random()*6.28,s:Math.random()*.02+.005})}
  size();window.addEventListener('resize',size);
  var start=performance.now();
  function draw(t){
    ctx.clearRect(0,0,W,H);
    stars.forEach(function(s){var a=reduce?.6:.35+.65*Math.abs(Math.sin(s.p+t*s.s*.06));ctx.fillStyle='rgba(190,150,50,'+a+')';ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,6.28);ctx.fill()});
    if(W>1020){
      var prog=reduce?1:Math.min(Math.max((t-start-1500)/4500,0),1)*(cons.length-1);
      ctx.strokeStyle='rgba(168,121,28,.65)';ctx.lineWidth=1;ctx.beginPath();
      for(var i=0;i<cons.length-1;i++){
        var seg=Math.min(Math.max(prog-i,0),1);if(seg<=0)break;
        var a=cons[i],b=cons[i+1];ctx.moveTo(a[0]*W,a[1]*H);ctx.lineTo((a[0]+(b[0]-a[0])*seg)*W,(a[1]+(b[1]-a[1])*seg)*H)}
      ctx.stroke();
      cons.forEach(function(c,i){if(prog>=i-.01){var x=c[0]*W,y=c[1]*H,g=ctx.createRadialGradient(x,y,0,x,y,16);g.addColorStop(0,'rgba(201,162,75,.8)');g.addColorStop(1,'rgba(201,162,75,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,16,0,6.28);ctx.fill();ctx.fillStyle='#a8791c';ctx.beginPath();ctx.arc(x,y,2.4,0,6.28);ctx.fill()}});
    }
    if(!reduce)requestAnimationFrame(draw)
  }
  requestAnimationFrame(draw);
})();
