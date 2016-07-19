/*======================================
    slide-it v1.0.0
    Simple image slider with pure Javascript, no dependency needed.
    @Create 20160719
    @Author Trina Lu
  ======================================*/

(function(){

    var slideit = function(_wrapper,_slideWidth,_showNum,_options){
        _options = _options || {margin:0,slideAll:false};
        _options.margin = _options.margin || 0;
        _options.slideAll = _options.slideAll || false;
        
        var wrapper = document.querySelector(_wrapper),
            slides = wrapper.querySelectorAll('.slide'),
            slider = wrapper.querySelector('.slider'),
            viewport = wrapper.querySelector('.slider_view'),
            arrows = wrapper.querySelectorAll('.arrow'),
            slideOffset;

        var init = function(){
            //set style for elements
            for(var i=0;i<slides.length;i++){
                slides[i].style.width = _slideWidth + 'px';
                slides[i].style.margin = "0 " + _options.margin + 'px';
            }
            slideOffset = _slideWidth+(_options.margin*2);
            viewport.style.width = slideOffset*_showNum + 'px';
            setTimeout(function(){
                wrapper.style.height = slides[0].offsetHeight + 'px';
            },300);

            //add listner
            for(var i=0;i<arrows.length;i++){
                arrows[i].addEventListener('click',onSlide);
            }
        }();

        var group = 0;
        function onSlide(e){
            var d = this.classList.contains('pre') ? -1 : 1, 
                offset = (_options.slideAll) ? slideOffset*_showNum*-1 : slideOffset * -1,
                len = (_options.slideAll) ? Math.ceil(slider.offsetWidth / offset * -1) : Math.ceil(slider.offsetWidth / offset * -1) - _showNum + 1;
            
            group += d;
            if(group >= len){ group = 0;}
            if(group < 0){group = len-1;}
            var t = offset*group;

            slider.style.transform = 'translateX('+t+'px)';
            slider.style.webkitTransform = 'translateX('+t+'px)';
        }
    };

    window.slide = slide;

}());