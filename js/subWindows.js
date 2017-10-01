(function(window, undefined) {
    'use strict'; 
    var VERSION = '1.0';
    /*                  Private section
     ***************************************************/

     // Параметры по умолчанию
    var settings = {
     counter: 0,
     subWindowsContainer_name:'subWindowsContainer',
     subWindow_name:'subWindow',
     height_container_labels: '40px',
     startSubWindowWidth: '600px',
     startSubWindowHeight: '300px',
     title_min_height: '25px',
     startPositionX: '10%',
     startPositionY: '10%',
     save_localstorage:true

 }
    var counter=0,
        listWindows=[],
        move= false,
        resize= false,
        startX,
        startY, 
        startWidth, 
        startHeight, 
        resizeWindow, 
        resizeDirection='';

    var container=document.getElementById(settings.subWindowsContainer_name);

    // добавляем строку для меток
    var newContainerLabels=document.createElement('div');

    newContainerLabels.classList.add('container_labels');
    newContainerLabels.id='container_labels';
    newContainerLabels.style.height=settings.height_container_labels;
    newContainerLabels.style.bottom='-'+settings.height_container_labels;
    container.appendChild(newContainerLabels);

    container.addEventListener('click',function(e){
        var target=e.target;
      while(target!=this)
      {
          //закрыть окно
          if(target.classList.contains('subWindow_button_close')){ 
            closeWindow(target.parentNode.parentNode);
            return;
          }
          //развернуть окно/ вернуть размер окна
          if(target.classList.contains('subWindow_button_expland')){
            explandWindow(target.parentNode.parentNode); 
            setSizeContentSubWindow(target.parentNode.parentNode); 
            return;      
          }
          //свернуть окно
          if(target.classList.contains('subWindow_button_collapse')){
            collapseWindow(target.parentNode.parentNode); 
            return;       
          }
          // развернуть свёрнутое окно
          if(target.classList.contains('subWindow_label')){
            collapseWindow(document.getElementById(target.id.replace('label_','')));
            return; 
          }
          target = target.parentNode;
        }

    });
 
    function closeWindow(subWindow){
        container.removeChild(subWindow);
        // удаляем элемент массива
        var numDel;
        for (var i=0;i<listWindows.length;i++){
            if(listWindows[i].id==subWindow.id) {
                numDel=i;
            }
        } 
        listWindows.splice(numDel,1);

        // удаляем метку
        document.getElementById('container_labels').removeChild(document.getElementById('label_'+subWindow.id));
    };

    function explandWindow(subWindow){        
        for (var i=0;i<listWindows.length;i++){
            if(listWindows[i].id==subWindow.id) {
                if (listWindows[i].expland==false){
                    listWindows[i].expland=true;
                    subWindow.style='left: 0; top: 0; width: 100%; height: 100%';
                } else {
                    listWindows[i].expland=false;
                    subWindow.style='left: '+listWindows[i].positionX+'; top: '+listWindows[i].positionY+'; width: '+
                                 listWindows[i].width+'; height: '+listWindows[i].height+';';
                }
                // окно на передний план
                setFrontWindow(subWindow);

            }
        } 
    };

    function collapseWindow(subWindow){
        for (var i=0;i<listWindows.length;i++){
            if(listWindows[i].id==subWindow.id) {
                if (listWindows[i].collapse==false){
                    listWindows[i].collapse=true;
                    subWindow.style='display:none;';                    
                    document.getElementById('label_'+subWindow.id).classList.add('collapse');
                } else {
                    listWindows[i].collapse=false;
                    if (listWindows[i].expland){
                        subWindow.style='display:block;left: 0; top: 0; width: 100%; height:100%';
                    } else  {
                        subWindow.style='display:block;left: '+listWindows[i].positionX+'; top: '+listWindows[i].positionY+'; width: '+
                        listWindows[i].width+'; height: '+listWindows[i].height+';';
                    }                   
                    document.getElementById('label_'+subWindow.id).classList.remove('collapse');
                }
                // окно на передний план
                setFrontWindow(subWindow);
            }
        } 
    };

    function createSubWindow(title,content){
      var w={
        id: newID(),
        title: title,
        content: content,
        positionX: settings.startPositionX,
        positionY: settings.startPositionY,
        width: settings.startSubWindowWidth,
        height: settings.startSubWindowHeight,
        expland: false,
        collapse: false
      };
      //создали новое окно
      loadSubWindow(w);
    }; 

    function loadSubWindow(listWindows_item){
       
      //создали новое окно
      var newWindow=document.createElement('div');
      newWindow.id=newID();
      newWindow.classList.add('subWindow'); 
      newWindow.style.left=listWindows_item.positionX;
      newWindow.style.top=listWindows_item.positionY;
      newWindow.style.width=listWindows_item.width;
      newWindow.style.height=listWindows_item.height;
      
      //заголовок
      var newWindowTitle=document.createElement('div');
      newWindowTitle.classList.add('subWindow_title');
      newWindowTitle.innerText=listWindows_item.title;
      newWindowTitle.style.minHeight = settings.title_min_height;
      newWindowTitle.style.padding = parseInt(settings.title_min_height)/5+'px';
      newWindowTitle.style.paddingLeft = settings.title_min_height;
      newWindow.appendChild(newWindowTitle);
      
      //контейнер для кнопок
      var newWindowButtons=document.createElement('div');
      newWindowButtons.classList.add('subWindow_buttons');
      newWindowButtons.style.padding=parseInt(settings.title_min_height)/5+'px';
      newWindow.appendChild(newWindowButtons);
      
      //размер кнопки
      var sizeButton=4*parseInt(settings.title_min_height)/5;

      //кнопка свернуть
      var newWindowButtonCollapse =document.createElement('div');
      newWindowButtonCollapse.classList.add('subWindow_button'); 
      newWindowButtonCollapse.classList.add('subWindow_button_collapse'); 
      newWindowButtonCollapse.style.width=sizeButton+'px';
      newWindowButtonCollapse.style.height=sizeButton+'px';
      newWindowButtonCollapse.style.marginRight=sizeButton/4+'px';
      newWindowButtonCollapse.innerHTML = '<svg width="'+sizeButton+'px" height="'+sizeButton+'px">'+  
                                          '<line x1="'+sizeButton/4+'" y1="'+3*sizeButton/4+'" x2="'+3*sizeButton/4+'" y2="'+3*sizeButton/4+'" stroke-width="2" stroke="rgb(0,0,0)">'+  
                                         '</svg>';
      newWindowButtons.appendChild(newWindowButtonCollapse );
      
      //кнопка развернуть
      var newWindowButtonExpand=document.createElement('div');
      newWindowButtonExpand.classList.add('subWindow_button'); 
      newWindowButtonExpand.classList.add('subWindow_button_expland'); 
      newWindowButtonExpand.style.width=sizeButton+'px';
      newWindowButtonExpand.style.height=sizeButton+'px';
      newWindowButtonExpand.style.marginRight=sizeButton/4+'px';
      newWindowButtonExpand.innerHTML = '<svg width="'+sizeButton+'px" height="'+sizeButton+'px">'+  
                                          '<polyline points="'+sizeButton/4+','+sizeButton/4+' '+3*sizeButton/4+','+sizeButton/4+' '+3*sizeButton/4+','+3*sizeButton/4+' '+sizeButton/4+','+3*sizeButton/4+' '+sizeButton/4+','+sizeButton/4+'" fill="rgba(249,249,249,0)" stroke-width="1" stroke="rgb(0,0,0)"/>'+
                                        '</svg>';
      newWindowButtons.appendChild(newWindowButtonExpand);
      
      //кнопка закрыть
      var newWindowButtonClose=document.createElement('div');
      newWindowButtonClose.classList.add('subWindow_button');  
      newWindowButtonClose.classList.add('subWindow_button_close'); 
      newWindowButtonClose.style.width=sizeButton+'px';
      newWindowButtonClose.style.height=sizeButton+'px';
      newWindowButtonClose.style.marginRight=sizeButton/4+'px';
      newWindowButtonClose.innerHTML = '<svg width="'+sizeButton+'px" height="'+sizeButton+'px">'+  
                                          '<line x1="'+sizeButton/4+'" y1="'+sizeButton/4+'" x2="'+3*sizeButton/4+'" y2="'+3*sizeButton/4+'" stroke-width="2" stroke="rgb(0,0,0)"/>'+  
                                          '<line x1="'+sizeButton/4+'" y1="'+3*sizeButton/4+'" x2="'+3*sizeButton/4+'" y2="'+sizeButton/4+'" stroke-width="2" stroke="rgb(0,0,0)"/>'+  
                                          '</svg>';
      newWindowButtons.appendChild(newWindowButtonClose);

      // content
      var newWindowContent=document.createElement('div');
      newWindowContent.classList.add('subWindow_content');  
      newWindowContent.style.width = '100%';
      newWindowContent.style.minHeight = parseInt(listWindows_item.height)-parseInt(7*parseInt(settings.title_min_height)/5)+'px';
      newWindowContent.style.bottom = 0;
      newWindowContent.style.marginTop=7*parseInt(settings.title_min_height)/5+'px';
      newWindowContent.innerHTML=listWindows_item.content;
      newWindowContent.setAttribute('draggable','false'); 
      newWindow.appendChild(newWindowContent);
      
      //метка окна
      var newWindowLabel = document.createElement('div');
      newWindowLabel.id='label_'+newWindow.id;
      newWindowLabel.classList.add('subWindow_label');
      newWindowLabel.innerText=listWindows_item.title;
      
      //добавляем метку
      document.getElementById("container_labels").appendChild(newWindowLabel);
      
      //добавляем окно
      container.appendChild(newWindow);
      
      //записываем в массив окон.
      setParametersWindow(newWindow,listWindows_item.title, listWindows_item.content);
      counter++;
      newWindowTitle.setAttribute('draggable','true'); 
      addListeners(newWindow);
      addListenersDND(newWindow);
    }; 
   

    function addListeners(target) {  
        target.addEventListener('click', function(e) {
           if(target.classList.contains('subWindows_title') || target.classList.contains('subWindow_content'))
            {
                // окно на передний план
                setFrontWindow(target.parentNode);
            }
            if(target.classList.contains('subWindow'))
            {
                // окно на передний план
               setFrontWindow(target);            

            }
        })
   
        target.addEventListener('mousemove', function(e) {  
              if (e.pageX>(this.offsetLeft+this.offsetWidth-5) && e.pageY>(this.offsetTop+this.offsetHeight-5)) {
                  this.style.cursor='nw-resize';
                  resizeDirection='nw';
              }
              else if(e.pageX>(this.offsetLeft+this.offsetWidth-5)){
                      this.style.cursor='w-resize';                
                      resizeDirection='w';
                      }
              else if(e.pageY>(this.offsetTop+this.offsetHeight-5)){
                               this.style.cursor='n-resize';
                               resizeDirection='n';
                      }
               else {
                  this.style.cursor='auto';
                  resizeDirection='';
              }
                                    
                 
        })
    }

    container.addEventListener('mousemove', function(e) {
        if(resize) {
            if(resizeDirection=='nw') {               
                var s = Math.max(220, Math.min(e.pageX,container.offsetLeft+container.offsetWidth) + startWidth-startX);  
                var n = Math.max(220, Math.min(e.pageY,container.offsetTop+container.offsetHeight) + startHeight-startY);                
                resizeWindow.style.width = s +'px';
                resizeWindow.style.height = n +'px';
            } 
            if(resizeDirection=='n') {              
                var n = Math.max(220, Math.min(e.pageY,container.offsetTop+container.offsetHeight) + startHeight-startY);
                resizeWindow.style.height = n +'px';
            }
            if(resizeDirection=='w')  {               
                var s = Math.max(220, Math.min(e.pageX,container.offsetLeft+container.offsetWidth) + startWidth-startX);                                
                resizeWindow.style.width=s+'px';
            }

            setSizeContentSubWindow(resizeWindow);
        }
    })   

    container.addEventListener('mousedown', function(e) {
      console.log(e.target);
console.log("resizeDirection=",resizeDirection);
        if(e.target.classList.contains('subWindow') || e.target.classList.contains('subWindow_content'))
            {
              if (resizeDirection!='') {
                var target=e.target;
                if(e.target.classList.contains('subWindow_content')){
                  var target=e.target.parentNode;
                }
                resizeWindowStart(target); 
                startX=e.pageX;
                startY=e.pageY;
                startWidth=target.clientWidth;
                startHeight=target.offsetHeight;
                resizeWindow=target;
            }
        }
    })

    container.addEventListener('mouseup', function(e) {
        resizeWindowEnd(resizeWindow);
        if(resizeWindow) {
            setParametersWindow(resizeWindow);
          }
        resizeWindow=null;
        resizeDirection='';  
    })

     //проставить всем окнам z-index:0;
    function windowszZindex0(){
        var tempList=document.querySelectorAll('.subWindow');
        for (var i=0;i<tempList.length;i++) {
            tempList[i].style.zIndex = 0;
        }
    }

    // вывести окно на передний план
    function setFrontWindow(subWindow){ 
        windowszZindex0();      
        // окно на передний план
        subWindow.style.zIndex = 10;   
    }
    
    //перетаскивание
    function addListenersDND(target) {       
        {           
            var shiftX, shiftY;

            target.addEventListener('dragstart', function(e) {
                if( !shiftY && e.pageY< target.offsetTop+60)
                {
                    this.style.opacity = '0.4';  
                    e.dataTransfer.effectAllowed='move';
                    e.dataTransfer.setData('Text',e.target);  
                    var coords=target.getBoundingClientRect();
                    shiftX = e.pageX - coords.left; 
                    shiftY = e.pageY - coords.top;
                }
            }); 
            target.addEventListener('dragend', function(e) {
              
                this.style.opacity = '1';
                target.style.left = e.pageX-shiftX + 'px';
                target.style.top = e.pageY-shiftY + 'px';
                console.log(e);
                if (parseInt(target.style.left)<0) {
                    target.style.left=0;
                }
                if (parseInt(target.style.top)<0) {
                    target.style.top=0;
                }
                if (parseInt(target.style.left)+target.offsetWidth>container.offsetWidth) {
                    target.style.left=(container.offsetWidth-target.offsetWidth)+'px';

                }
                if (parseInt(target.style.top)+target.offsetHeight>container.offsetHeight) {
                    target.style.top=(container.offsetHeight-target.offsetHeight)+'px';

                }
                setFrontWindow(this);                 
                setParametersWindow(this);
              
            });  
            target.addEventListener('dragenter', function(e) {
                e.preventDefault();
            })
          
            target.addEventListener('dragover', function(e) {
                e.preventDefault();
            })
        }
    }
   
    function resizeWindowStart(subWindow) {
        resize=true;   
        console.log('resize=true');
    }

    function resizeWindowEnd(subWindow) {
        resize=false;
        console.log('resize=false');
    }

    function setParametersWindow(subWindow,title,content){
        
        var w;
        for (var i=0;i<listWindows.length;i++){
            if(listWindows[i].id==subWindow.id) {
                w=listWindows[i];
                listWindows[i].title = title||listWindows[i].title;
                listWindows[i].content = content||listWindows[i].content;
                listWindows[i].positionX = subWindow.style.left;
                listWindows[i].positionY = subWindow.style.top;
                listWindows[i].width = subWindow.style.width;
                listWindows[i].height = subWindow.style.height;
                return listWindows[i];
            }
        }
        w={
        id: subWindow.id,
        title: title,
        content: content,
        positionX: subWindow.style.left,
        positionY: subWindow.style.top,
        width: subWindow.style.width,
        height: subWindow.style.height,
        expland: false,
        collapse: false
      };
      listWindows.push(w);
      if (settings.save_localstorage) {
        saveLocalstorage();
      }
      return w;
    }

    function saveLocalstorage() {
      localStorage.setItem('listSubWindows',JSON.stringify(listWindows));
    }

    function loadListSubWindows(saveListWindows) {
      var tempList=[];
      clearContainer();
      if (!saveListWindows && localStorage.getItem("listSubWindows")) {
        tempList = JSON.parse(localStorage.getItem("listSubWindows"));
      } else if(saveListWindows) {
        tempList = saveListWindows;
      }

        tempList.forEach(function(w){
          loadSubWindow(w);
        });
    }

    function clearContainer() {
      var listSubWindows=Array.from(document.querySelectorAll('.subWindow'));
      for( var i=0;i<listSubWindows.length;i++) {
          var label_window=document.getElementById('label_'+listSubWindows[i].id);

          container.removeChild(listSubWindows[i]);
          document.getElementById('container_labels').removeChild(label_window);
      };
      listWindows=[];
    }

    function newID(){
        return 'subWindow'+counter;
    }

    function setSizeContentSubWindow(subWindow) {
      
      var elems= subWindow.childNodes;

      elems.forEach(function(elem){
        if(elem.classList.contains('subWindow_content')){
          elem.style.minHeight=parseInt(subWindow.offsetHeight) -parseInt(7*parseInt(settings.title_min_height)/5)+'px';

        }
      })
    }

    function setContentSubWindow(subWindow,content) {
        var elems= resizeWindow.childNodes;
                elems.forEach(function(elem){
                  if(elem.classList.contains('subWindow_content')){
                    elem.innerHTML=content;
                  }
                })
    }

    /*                  Public section
     ***************************************************/

     //Наш глобальный объект
    var subWindowsCreator = {};

    /**
     * Функция настройки параметров
     *
     * @param {String|Object} param Имя параметра или объект с параметрами
     * @param value Устанавливаемое значение
     */

    subWindowsCreator.config = function (param, value) {
        // Проверим наличие аргументов
        var argLength = arguments.length;
        if (!argLength) {
            throw new TypeError('Missing required parameters');
        }
        // Является ли первый аргумент объектом
        if ( typeof(param) == 'Object' ) {
            for (var p in param) {
                if (param.hasOwnProperty(p) && settings.hasOwnProperty(p)) {
                    settings[p] = param[p];
                }
            }
        } else if (argLength > 1) {
            if (settings.hasOwnProperty(param)) {
                settings[param] = value;
            }
        } else {
            throw new TypeError('Missing second parameter');
        }
        return subWindowsCreator; 
    };

  	subWindowsCreator.createSubWindow = function (title,content) {
  		return createSubWindow(title,content);
  	};


    subWindowsCreator.setContent = function (subWindow,content) {
      return setContentSubWindow(subWindow,content);
    };

    subWindowsCreator.getSubWindowsList = function() {
      return listWindows;
    };

    subWindowsCreator.saveSubWindowsList = function(){
      saveLocalstorage();
    };

    subWindowsCreator.loadSubWindowsList = function(saveList){
      loadListSubWindows(saveList);
    };

    subWindowsCreator.clearSubWindowsContainer = function(){
      clearContainer();
    }

	   
    window.subWindowsCreator=subWindowsCreator;
    
    
})(window);