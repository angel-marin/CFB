CFB = function(import_parameters){
    that = this;
    window.cfb_last_trigger = null;
    this.cfb_trigger = null;
    this.cfb_group = null;
    this.cfb_list = null;
    this.buttons = [];
    this.events = {};
    this.events.buttons = {};
    this.parameters = {
        trigger:{
            color: import_parameters.trigger_color || '#2D4C9C',
            opened: import_parameters.trigger_opened_image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURQAAAP///////////////////////////////////////88h6/kAAAAKdFJOUwAQ0DDvoD7ub5BHySmCAAAAUUlEQVQI102NQRLAIAjEFmlR+f+DSxVcuTDJDAQ6BTU6gOmthD5ukFYi8I1VIrHEwS2MuIRfCJh7Z/a/7cyuV8zm5yMqlILdLQZDITRa7IjiAwQSAhYg4LG4AAAAAElFTkSuQmCC',
            closed: import_parameters.trigger_closed_image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAbCAMAAAAu7K2VAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAqUExURQAAAP///////////////////////////////////////////////////4a7yi8AAAANdFJOUwDJQBCA8FiX4HAgsDDhfihXAAABAklEQVQoz31SWwLDIAgTUNQq97/uwEetnRtfBUMCKc6N4AggkgDy5U5xxSArgOkNoGgPoXiNCPad8EVh1VjvBk6a+41DEWXXZ5XNjxxeLRZVi0sLVeQwfxBQgZ4UCXTYMYtUx50+nEiUxqZBAWs/TNKi1cXkXDpDyCDYtwdJJwjbSgbRSXm3YJIk62yuZ1MK9Quij2yrSLOkBgkvnmZ4W1z6wKhgePwB8lYg6x0s3e5EntHCw6gT9NPI0yfYDgYXYnhfHs9S2tlhGqmf/6N1ms6w/24q0yW9xadtixVoHPa8aMQ8LnNT2a9ctjieCfFggeXJz8AG4r+YPnX9j1FZr9N8AHvVDsPiMr6cAAAAAElFTkSuQmCC',
            size: import_parameters.trigger_size || '35%'
        },
        size: import_parameters.size || '50px',
        top: import_parameters.top || 'auto',
        left: import_parameters.left || 'auto',
        bottom: import_parameters.bottom || '25px',
        right: import_parameters.right || '25px',
        show_desktop: import_parameters.show_desktop || false,
        desktop_width: import_parameters.desktop_width || '992',
        direction: import_parameters.direction || 'top'
    };
    var scale_position = this.parameters.size.replace("px", "");
    scale_position = parseInt(scale_position.trim());

    if(import_parameters.hasOwnProperty('buttons')){
        for(var i = 0; i < import_parameters.buttons.length; i++){
            this.buttons.push({
                name: import_parameters.buttons[i].name || '#btn'+(i+1),
                image: import_parameters.buttons[i].image || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
                color: import_parameters.buttons[i].color || '#ffffff',
                trigger: import_parameters.buttons[i].trigger || function(){}
            });
        }
    }
    this.contact_floating_buttons_open = function(){
        if(that.cfb_group){
            if(!that.cfb_group.classList.contains('cfb_open')){
                if(!that.cfb_group.classList.contains('toggle_transition')){
                    for(var i = 0; i < that.cfb_list.children.length; i++){
                        that.cfb_list.children[i].style.transition = ".2s ." + (((i+1)*2) + 1) + "s";
                        that.cfb_list.children[i].style[that.parameters.direction] = "-" + ((scale_position+5)*(i+1)) + "px";
                    }
                    that.cfb_group.classList.remove('cfb_close');
                    that.cfb_group.classList.add('cfb_open');
                    that.cfb_group.classList.add('toggle_transition');
                    that.cfb_trigger.classList.remove('cfb_trigger_closed');
                    that.cfb_trigger.classList.add('cfb_trigger_opened');
                    that.cfb_trigger.children[0].classList.remove('cfb-icon-closed');
                    that.cfb_trigger.children[0].classList.add('cfb-icon-opened');
                    setTimeout(function(){
                        that.cfb_group.classList.remove('toggle_transition');
                        that.cfb_group.dispatchEvent(that.events.cfb_opened);
                    }, (that.cfb_list.children.length*200)+200);
                }
            }
        }
    }
    this.contact_floating_buttons_close = function(){
        if(that.cfb_group){
            if(that.cfb_group.classList.contains('cfb_open')){
                if(!that.cfb_group.classList.contains('toggle_transition')){
                    for(var i = 0; i < that.cfb_list.children.length; i++){
                        that.cfb_list.children[i].style.transition = ".2s ." + (((that.cfb_list.children.length - i - 1)*2) + 1) + "s";
                        that.cfb_list.children[i].style[that.parameters.direction] = "0px";
                    }
                    that.cfb_group.classList.remove('cfb_open');
                    that.cfb_group.classList.add('cfb_close');
                    that.cfb_group.classList.add('toggle_transition');
                    that.cfb_trigger.classList.remove('cfb_trigger_opened');
                    that.cfb_trigger.classList.add('cfb_trigger_closed');
                    setTimeout(function(){
                        that.cfb_trigger.children[0].classList.remove('cfb-icon-opened');
                        that.cfb_trigger.children[0].classList.add('cfb-icon-closed');
                        that.cfb_group.classList.remove('toggle_transition');
                        that.cfb_group.dispatchEvent(that.events.cfb_closed);
                    }, (that.cfb_list.children.length*200)+100);
                }
            }
        }
    }

    this.contact_floating_buttons_create_css = function(){
        var styleEl = document.createElement('style');
        styleEl.innerHTML = ".cfb-icon{width:100%;height:100%;display:inline-block;background-size:50%;background-position:center;background-repeat:no-repeat;vertical-align:baseline}.cfb-icon.cfb-icon-closed{background-image:url("+that.parameters.trigger.closed+")}.cfb-icon.cfb-icon-opened{background-image:url("+that.parameters.trigger.opened+");background-size:"+that.parameters.trigger.size+";}.cfb-btn{width:"+that.parameters.size+";height:"+that.parameters.size+";line-height:"+that.parameters.size+";overflow:hidden;padding: 0 0 0 0;display:inline-block;border:none;font-size:18px;color:#fff;text-align:center;position:relative;-webkit-transition:.3s;-o-transition:.3s;transition:.3s;border-radius:50%;cursor:pointer;-webkit-box-shadow:0 2px 5px 0 rgba(0,0,0,.11);box-shadow:0 2px 5px 0 rgba(0,0,0,.11)}.cfb-btn:hover{text-decoration:none;-webkit-box-shadow:0 5px 10px rgba(0,0,0,.15),0 4px 15px rgba(0,0,0,.13);box-shadow:0 5px 10px rgba(0,0,0,.15),0 4px 15px rgba(0,0,0,.13)}.cfb-btn:active,.cfb-btn:focus{outline:0}.cfb-color-trigger{background:"+that.parameters.trigger.color+"}#cfb-group{position:fixed;-webkit-transition:.3s;-o-transition:.3s;transition:.3s;z-index:9999;bottom:"+that.parameters.bottom+";right:"+that.parameters.right+"}#cfb-group.cfb_open #cfb-trigger i{-webkit-transition:.9s;-o-transition:.9s;transition:.9s;-webkit-transform:rotate(720deg);-ms-transform:rotate(720deg);transform:rotate(720deg)}#cfb-group #cfb-trigger{z-index:15;float:left}#cfb-group #cfb-list{position:absolute;right:0;width:100%;height:100%;-webkit-transition:.3s;-o-transition:.3s;transition:.3s}#cfb-group #cfb-list li{display:inline-block}#cfb-group #cfb-list .cfb-btn{position:absolute;right:0;top:0;opacity:0;}#cfb-group.cfb_open #cfb-list .cfb-btn{opacity:1;-webkit-transform:scale(.9,.9);-ms-transform:scale(.9,.9);transform:scale(.9,.9)}";

        if(!that.parameters.show_desktop){
            styleEl.innerHTML += "@media screen and (min-width: "+that.parameters.desktop_width+"px){#cfb-group{display:none !important;}}";
        }
        document.head.appendChild(styleEl);
    }

    this.contact_floating_buttons_create_html = function(){
        var cfb_group = document.createElement("div");
        cfb_group.id = "cfb-group";
        cfb_group.className = "cfb_close";

        var cfb_trigger = document.createElement("button");
        cfb_trigger.id = "cfb-trigger";
        cfb_trigger.className = "cfb-btn cfb-color-trigger cfb_trigger_closed";
        cfb_trigger.setAttribute("aria-label", 'Open contact floating buttons');

        var cfb_trigger_btn = document.createElement("i");
        cfb_trigger_btn.className = "cfb-icon cfb-icon-closed";
        cfb_trigger.appendChild(cfb_trigger_btn);

        var cfb_list = document.createElement("div");
        cfb_list.id = "cfb-list";

        for(var i = 0; i < that.buttons.length; i++){
            (function(i) {
                var span = document.createElement("span");
                span.className = "cfb-btn cfb-launcher";
                span.id = that.buttons[i].name;
                span.style[that.parameters.direction] = "0px";
                span.style.backgroundColor = that.buttons[i].color || '#ffffff';
                span.onclick = that.buttons[i].trigger;
                var btn = document.createElement("i");
                btn.className = "cfb-icon";
                btn.style.backgroundImage = "url("+that.buttons[i].image+")";
                span.appendChild(btn);
                cfb_list.appendChild(span);
                that.events.buttons[that.buttons[i].name] = new CustomEvent('cfb:trigger:'+that.buttons[i].name);
                span.addEventListener("click", function(){
                    window.cfb_last_trigger = that.buttons[i].name;
                    that.cfb_group.dispatchEvent(that.events.buttons[that.buttons[i].name]);
                }, false);
            }(i));
        }

        cfb_group.appendChild(cfb_trigger);
        cfb_group.appendChild(cfb_list);
        document.body.appendChild(cfb_group);
    }

    this.create_events_ie9_polyfill = function(){
        if(typeof window.CustomEvent === "function") return false;
        window.CustomEvent = function(event, params){
            params = params || { bubbles: false, cancelable: false, detail: null };
            var evt = document.createEvent( 'CustomEvent' );
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
    }
    this.create_events = function(){
        that.create_events_ie9_polyfill();
        that.events.cfb_loaded = new CustomEvent('cfb:loaded');
        that.events.cfb_open = new CustomEvent('cfb:open');
        that.events.cfb_close = new CustomEvent('cfb:close');
        that.events.cfb_opened = new CustomEvent('cfb:opened');
        that.events.cfb_closed = new CustomEvent('cfb:closed');
    }

    this.contact_floating_buttons_init = function(){
        that.create_events();
        that.contact_floating_buttons_create_css();
        that.contact_floating_buttons_create_html();

        that.cfb_trigger = document.getElementById('cfb-trigger');
        that.cfb_group = document.getElementById('cfb-group');
        that.cfb_list = document.getElementById('cfb-list');
        that.cfb_trigger.addEventListener("click", function(){
            if(that.cfb_group.classList.contains('cfb_open')){
                that.contact_floating_buttons_close();
                that.cfb_group.dispatchEvent(that.events.cfb_close);
            }else{
                that.contact_floating_buttons_open();
                that.cfb_group.dispatchEvent(that.events.cfb_open);
            }
        });
        that.cfb_trigger.addEventListener("mouseenter", function(){
            if(!that.cfb_group.classList.contains('cfb_open')){
                that.contact_floating_buttons_open();
                that.cfb_group.dispatchEvent(that.events.cfb_open);
            }
        });
        document.dispatchEvent(that.events.cfb_loaded);
    }
    this.contact_floating_buttons_init();
    return this;
};

CFB.Button = function(parameters){
    if(parameters.preset){
        switch(parameters.preset){
            case 'whatsapp':
                    parameters.name = parameters.name || 'whatsapp',
                    parameters.color = parameters.color || '#4DC247',
                    parameters.trigger = parameters.trigger || function(){},
                    parameters.image = parameters.image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURQAAAP///////////////////////////////////////////////////////6FIq5sAAAAOdFJOUwDZffBAIBAwsKBhwFCQTUTEAAAAAQZJREFUKM9lUtEChCAIE0Ulvfb/n3uApl7HQ2mTuS1CeOpzdwK6tBzeFRNWyS9ctQd0RS1b4T6wpvvOc5ONRMqBJT7OFlGah1OXLxEXcI0VIf0JVPTjOgHj5FhOZhrECd1cwl/bNdD8WZ17vFcRJIR79Ju7+JMKEEIfuqzztBPY9jQa4hL/SDJwspWEVH5QA56rVJi8wEVryjzR2odhv1OWP00ltaypUx2BZ1NStvpRxiVmMR/+mAZY12c5ZfKVQOx3+N/Ib4dT++PwD6zaX6aM+u7TROqMv4caZQebrzU26od8LKnZh9oE0+n8HbbdY4u0hsISuXVevMOPxT1ReY8/c2Q+Z+0L0BYNBDcZs+AAAAAASUVORK5CYII='
                break;
            case 'call':
                    parameters.name = parameters.name || 'call',
                    parameters.color = parameters.color || '#DF0024',
                    parameters.trigger = parameters.trigger || function(){},
                    parameters.image = parameters.image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAbCAMAAABY1h8eAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAtUExURQAAAP///////////////////////////////////////////////////////6FIq5sAAAAOdFJOUwBd1vAwmhAgwEBwgLBvoJujhwAAAPdJREFUKM99kgeOxDAIRTEY3DL//scdXNI2mUVyZPHgUxyiwzJnDUbvVjMD2Ar9sqCCLb2AOJymkPCEG8AfD4iMtvuMMSNjUy/ajCzv1HoXh07JkNhFpqcBO62xY/GSnjEaYBxUwKGX9NyE3CGW9U4ag42iiJGinFDmamq/FCiZbHdZVqMA9kW6jsLGdIsl7p1WVIp+gh//dItzkF6NPbUf1166eY3pnuqRCvfn0UO3up5NhmbzgA1rp4dw8gFaodQSpeExGbPE90eMVxr/Bs2O8fGrXl7hTrko8JPiXNeNyn808gXKo+l2JutzpKTyk83/Nmc9fusvTnYNd7bNkk8AAAAASUVORK5CYII='
                break;
            case 'email':
                    parameters.name = parameters.name || 'email',
                    parameters.color = parameters.color || '#853288',
                    parameters.trigger = parameters.trigger || function(){},
                    parameters.image = parameters.image || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAUCAMAAABGQsb1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAqUExURf///////////////////////////////////wAAAP///////////////3TOwFAAAAANdFJOU0AT8DDA1ppggABQsHCYECjmAAAAn0lEQVQoz32S2xbFEAxEc6FSmv//3eNOlTMvYW1MDOD0KHKATAdoGYEA7R6iD6DqMGzgdYsaqINVD15aqBp0b3Py2a7Q2MCrtzattC0u6kc1Wo1qP200qMr95Oo6nGhAj56UGLmbdCpxBzFLjGcEUGlsyqQiIDoFUGi8gV1TpEY/YWgysYWOG8xK5gZo/wjZ3MBqqVNkDJ6Of8My/BP/AI0jFxG6sm/SAAAAAElFTkSuQmCC'
                break;
        }
    }
    return parameters;
}
