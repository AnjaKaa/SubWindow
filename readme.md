���������� "��������� ����"

		��������
��� ���������� ��������� ��������� ���� ������ ����������, �������� �� ������, �����������, ������������ �� ���� ���������. ��� ����������� ��������� ���������� ������ subWindowsCreator, � ������� ������� �������� ����� ��������� ���������� ������.
		
		�����������
��� ����������� ���������� ����� ���������� subWindows.css � head � subWindows.js  ���� � head ���� � ����� body, �� ����� �������������� � ��������. 

		�������
subWindowsCreator.config - ������������� ��������� ����������, ��������� 2 ���������  ���_��������� � ��������_��������� 
	��������� � �� �������� �� ���������:
     counter			 0 			- ������� ��������� ����
     subWindowsContainer_name	'subWindowsContainer'	- id ����������
     subWindow_name		'subWindow' 		- id ���������� ���� + counter
     height_container_labels	'40px'			- ������ ������ ����� ����
     startSubWindowWidth	'600px'			- ��������� ������ ���������� ����
     startSubWindowHeight	'300px'			- ��������� ������ ���������� ����
     title_min_height		'25px'			- ������ ��������� ����
     startPositionX		'10%'			- ��������� ������������ �������� ������ ���� ���������� ���� �� �����������
     startPositionY		'10%'			- ��������� ������������ �������� ������ ���� ���������� ���� �� ���������
     save_localstorage		true			- ��������� ��  ������������ ���� � localstorage

     ������ �������������: subWindowsCreator.config('save_localstorage',false);


subWindowsCreator.createSubWindow - ������ ����� ���� � ����������, ��������� 2 ��������� ��������� � �������

subWindowsCreator.setContent - ������������� ��� ���� �������, �������� 2 ��������� ���� � ������

subWindowsCreator.getSubWindowsList - ���������� ������ �������� ����, ��� ����������
	��������� ������� �������� ����:
	 w={
        	id: <id_����>,
       		title: <���������>,
        	content: <�������>,
       		positionX: <������������ �������� ������ ���� �� �����������>,
        	positionY: <������������ �������� ������ ���� �� ���������>,
        	width: <�����>,
        	height: <������>,
        	expland: <������� ����������� ����>,
        	collapse: <������� ��������� ����>
      	    };


subWindowsCreator.saveSubWindowsList - ��������� � localstorage

subWindowsCreator.loadSubWindowsList -��������� ����, ���� ��� ���������� - �� localstorage, ���� ������� ������ ��������� - �� ��������� ���������� �������.

subWindowsCreator.clearSubWindowsContainer - ������� ��� ���� �� ���������� � �� �������.


