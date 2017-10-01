Библиотека "Вложенные окна"

		ОПИСАНИЕ
Эта библиотека позволяет создавать окна внутри контейнера, изменять их размер, сворачивать, заворачивать во весь контейнер. При подключении создается глобальный объект subWindowsCreator, с помощью методов которого можно управлять вложенными окнами.
		
		ПОДКЛЮЧЕНИЕ
Для подключения библиотеки нужно подключить subWindows.css в head и subWindows.js  либо в head либо в конце body, но перед использованием в скриптах. 

		ФУНКЦИИ
subWindowsCreator.config - устанавливает параметры библиотеки, принимает 2 параметра  имя_параметра и значение_параметра 
	Параметры и их значения по умолчанию:
     counter			 0 			- счётчик созданных окон
     subWindowsContainer_name	'subWindowsContainer'	- id контейнера
     subWindow_name		'subWindow' 		- id вложенного окна + counter
     height_container_labels	'40px'			- высота строки меток окон
     startSubWindowWidth	'600px'			- начальная ширина вложенного окна
     startSubWindowHeight	'300px'			- начальная высота вложенного окна
     title_min_height		'25px'			- высотв заголовка окна
     startPositionX		'10%'			- начальное расположение верхнего левого угла вложенного окна по горизонтали
     startPositionY		'10%'			- начальное расположение верхнего левого угла вложенного окна по вертикали
     save_localstorage		true			- сохранять ли  расположение окон в localstorage

     Пример использования: subWindowsCreator.config('save_localstorage',false);


subWindowsCreator.createSubWindow - создаёт новое окно в контейнере, принимает 2 параметра заголовок и контент

subWindowsCreator.setContent - устанавливает для окна контент, принимае 2 параметра окно и контет

subWindowsCreator.getSubWindowsList - возвращает массив описаний окон, без параметров
	структура объекта описания окна:
	 w={
        	id: <id_окна>,
       		title: <заголовок>,
        	content: <контент>,
       		positionX: <расположение верхнего левого угла по горизонтали>,
        	positionY: <расположение верхнего левого угла по вертикали>,
        	width: <шиина>,
        	height: <высота>,
        	expland: <признак развёрнутого окна>,
        	collapse: <признак свёрнутого окна>
      	    };


subWindowsCreator.saveSubWindowsList - сохранить в localstorage

subWindowsCreator.loadSubWindowsList -загрузить окна, если без параметров - из localstorage, если передан массив состояний - на основании указанного массива.

subWindowsCreator.clearSubWindowsContainer - удаляет все окна из контейнера и из массива.


