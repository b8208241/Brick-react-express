function drag(ev) {
    //target the <a> tag which wrapping the "brick"<div>
	ev.dataTransfer.setData("a_brick", ev.target.parentElement.id);
}

function dragleave_handler(ev) {
    ev.preventDefault();
	if (ev.target.classList.contains("dragover")){
    ev.target.classList.remove("dragover");
	};
	if(ev.target.classList.contains('cell_Temp')){
		var row = ev.target.parentElement;
		row.removeChild(ev.target.previousSibling);
		row.removeChild(ev.target);
	}
}

function dragover_handler(ev) {
    ev.preventDefault();
    if (ev.target.classList.contains("placeholder")){
		var row = ev.target.parentElement;
		var newCell = document.createElement('div');
		var newPlaceholder = document.createElement('div');
		newCell.className = 'cell_Temp';
		newPlaceholder.className = 'placeholder';
		row.insertBefore(newCell, ev.target);
		row.insertBefore(newPlaceholder, newCell);
    }
	else if (ev.target.classList.contains("cell-default")){
        ev.target.classList.add("dragover");
	}
}

function drop(ev) {
    ev.preventDefault();ev.stopPropagation();
	var cell = document.createElement('div')
	var brick = document.getElementById(ev.dataTransfer.getData("a_brick"));
	var source_cell = brick.parentElement;
	var source_row = source_cell.parentElement;
	var row = ev.target.parentElement;
	//put the data into a new cell
	cell.classList.add('cell');
	cell.appendChild(brick);
	//replace the target when dropping
	if (ev.target.classList.contains("cell-default") || ev.target.classList.contains('cell_Temp')) {
		$(ev.target).replaceWith(cell);
	}
	// add a blank brick into the source cell
	if(source_cell.classList.contains('cell')){
		// rearrange the original row
		if (3 < source_row.getElementsByClassName("cell").length + source_row.getElementsByClassName("cell-default").length){
		var blank = document.createElement("div");
		source_cell.appendChild(blank);
		blank.classList.add("brickOriginal-Blank");
		}
	}else if (source_cell.classList.contains('row_Temp_ListItem')){
		//modified style
		brick.getElementsByClassName('brickOriginal')[0].style.width = '100%';
	 	brick.getElementsByClassName('brickOriginal')[0].style.height = '100%';
		//delete the empty list element
		source_cell.remove();
	}
	//source cell transfer to default one and link to colorbox effect
	source_cell.className = 'cell-default';
	set_Colorbox_celldefault(source_cell);
}

function drop_toTemp(ev){
	 ev.preventDefault();ev.stopPropagation();
	 var brick = document.getElementById(ev.dataTransfer.getData("a_brick"));
	 var source_cell = brick.parentElement;
	 var source_row = source_cell.parentElement;
	 //check source, forbidden temp row to temp row
	 if(source_cell.classList.contains('row_Temp_ListItem')){
		 return false;
	 }else if(source_cell.classList.contains('cell')){
		//create a new list element and append the drag data
		var li = document.createElement('li');
		li.classList.add('row_Temp_ListItem');
		li.appendChild(brick);
		//lock width and height
		brick.getElementsByClassName('brickOriginal')[0].style.width = '280px';
		brick.getElementsByClassName('brickOriginal')[0].style.height = '128px';
		//add brick into the temp row
		document.getElementsByClassName('row_Temp_List')[0].insertBefore(li, document.getElementsByClassName('row_Temp_List')[0].childNodes[0]);
		//manage source row
	 	if (3 < source_row.getElementsByClassName("cell").length + source_row.getElementsByClassName("cell-default").length){
			var blank = document.createElement("div");
			source_cell.appendChild(blank);
			blank.classList.add("brickOriginal-Blank");
	 	}
		source_cell.className = 'cell-default';
		set_Colorbox_celldefault(source_cell);
	 }
}

function add_Title(event){
	var html = event.clipboardData.getData('text/html');
	document.getElementById('pasteHtml').innerHTML = html;
	var string = document.getElementById('pasteHtml').value;
	var stringUppercase = string.toUpperCase();
	var positionStart = stringUppercase.search(/<title>/i);
	var positionEnd = stringUppercase.search('</TITLE>');
	var title = string.slice(positionStart+7,positionEnd);
	document.getElementById('ref').innerHTML = title;
}

function cellDelete_colorbox(ev){
	//for IE environment
	var ev = ev || window.event;
	var target = ev.target || ev.srcElement;
	var brickId = target.parentElement.getAttribute('id')
	//starting locking the one should be replaced
	cellDelete_replace(brickId);
}

function cellDelete_replace(brickId){
	let targetCell = document.getElementById(brickId).parentElement.parentElement;
	let cellDefault = document.createElement('div');
	cellDefault.classList.add('cell-default');
	$(targetCell).replaceWith(cellDefault);
	set_Colorbox_celldefault(cellDefault);
	let cellDefaultParent = cellDefault.parentElement;
	let cellDefaultParentId = cellDefaultParent.getAttribute('id');
	rowSubmit(cellDefaultParentId, cellDefaultParent.innerHTML);
}

function rowSubmit(rowId, rowCode){
  axios.post('/rowupdate', {
    "rowId": rowId,
		"rowCode": rowCode
  })
  .then(
    function(res){
      console.log(res.data);
    }
  );
}

function set_Colorbox_celldefault(targetElement){
	$(targetElement).colorbox({
		href:"#addBox",
		inline: true,
		width:"30%",
		height:"50%",
		closeButton: false,
		onLoad: function(){
			$('#addBox').show();
		},
		onCleanup: function(obj){
			$('#addBox').hide();
			var container = obj.el;
			let parentRow = obj.el.parentElement;
			let rowId = parentRow.getAttribute('id');

			var text = document.getElementById('main_text').value;
			var ref = document.getElementById('ref').innerHTML;

			text = text.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;');
			ref = ref.replace(/ /g, '&nbsp;');
			if (text.length < 1){
				return false;
			} else {
				var cell = document.createElement('div');
				cell.classList.add('cell');
				$(container).replaceWith(cell);
				cell.innerHTML += (
				//wrap the "brick" with a anchor tag, for linking colorbox
				//id of the anchor was used by "drag()"
				'<a class="colorbox-anchor" id="anchor_brickOriginal'
				+ document.getElementsByClassName('brickOriginal').length
				+ '" href="#brickOriginal'
				+ document.getElementsByClassName('brickOriginal').length
				+  '">'
				//then create the brick style`
				+ '<div id="brickOriginal'
				+ document.getElementsByClassName('brickOriginal').length
				+ '" class="brickOriginal" draggable="true" ondragstart="drag(event);">'
				//then pull in the main_text and reference
            	+ '<div class="brick-content">' + text + '</div>'
				+ '<p class="brick-ref">' + ref + '</p>'
				+ '<input type="submit" value="Delete" onClick="cellDelete_colorbox(event);"/>'
            	+ '</div>'
				+ '</a>');
				//link the anchor tag to the colorbox effect
				var newAnchor = cell.getElementsByTagName('a')[0];
				$(newAnchor).colorbox({inline: true, width:"50%", height:"50%"});
				document.getElementById('main_text').value = null;
   				document.getElementById('ref').innerHTML = null;
			}

				rowSubmit(rowId, parentRow.innerHTML);

		}
	});
}

function set_Colorbox_cell(targetElement) {
	$(targetElement).colorbox({
		inline: true,
		width:"50%",
		height:"50%",
		closeButton: false
	});
}

function initialize(){
    document.addEventListener('drop', function(ev){
		if(ev.target.parentElement.classList.contains('row')){
			drop(ev);
		}else if(ev.target.classList.contains('row_Temp_List')){
			drop_toTemp(ev);
		}else if(ev.target.parentElement.classList.contains('brickOriginal')){
			drop_toTemp(ev);
		}
	});
    document.addEventListener('dragover', dragover_handler);
    document.addEventListener('dragleave', dragleave_handler);
	document.getElementById('main_text').addEventListener('paste', add_Title);
}

window.onload = initialize;

$(document).ready(function() {
	set_Colorbox_celldefault('.cell-default');
	set_Colorbox_cell('.colorbox-anchor');
});
