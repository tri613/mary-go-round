/*======================================
    slide-it v1.0.0
    Simple image slider with pure Javascript, no dependency needed.
    @Create 20160719
    @Author Trina Lu
  ======================================*/

(function(){

    var options,wrapper,slider,slideOffset,showNum;

    var slideit = function(_wrapper_selector,_slideWidth,_showNum,_options){
        _options = _options || {margin:0,slideAll:false};
        _options.margin = _options.margin || 0;
        _options.slideAll = _options.slideAll || false;
        options = _options;
        showNum = _showNum;

        wrapper = document.querySelector(_wrapper_selector),
        slides = wrapper.querySelectorAll('.slide'),
        slider = wrapper.querySelector('.slider');

        var viewport = wrapper.querySelector('.slider_view'),
            arrows = wrapper.querySelectorAll('.arrow');

        var init = function(){
            var handler;
            //set style for elements
            for(var i=0;i<slides.length;i++){
                slides[i].style.width = _slideWidth + 'px';
                slides[i].style.margin = "0 " + options.margin + 'px';
                slides[i].addEventListener('touchstart',function(e){
                    var startX = e.changedTouches[0].clientX;
                    var self = this;
                    self.addEventListener('touchmove',function(e){
                        self.addEventListener('touchend',function(e){
                            var endX = e.changedTouches[0].clientX;
                            var d = (startX > endX) ? -1 : 1;
                            handler(d);
                        });
                    });
                });
            }

            slideOffset = _slideWidth+(options.margin*2);
            viewport.style.width = slideOffset*_showNum + 'px';
            setTimeout(function(){
                wrapper.style.height = slides[0].offsetHeight + 'px';
                handler = doslide();
            },300);

            //add listner
            for(var i=0;i<arrows.length;i++){
                arrows[i].addEventListener('click',function(e){
                    var d = this.classList.contains('pre') ? -1 : 1;
                    handler(d);
                });
            }
        }();

    };

    var doslide = function(){
        var offset = (options.slideAll) ? slideOffset*showNum*-1 : slideOffset * -1,
            len = (options.slideAll) ? Math.ceil(slider.offsetWidth / offset * -1) : Math.ceil(slider.offsetWidth / offset * -1) - showNum + 1,
            group = 0;


        return function(d){
            group += d;
            if(group >= len){ group = 0;}
            if(group < 0){group = len-1;}
            var t = offset*group;

            slider.style.transform = 'translateX('+t+'px)';
            slider.style.webkitTransform = 'translateX('+t+'px)';
        };
    };

    window.slideit = slideit;

}());