$(document).ready(function() {
  /*
  $('.conclusion_Entry').colorbox({
		inline: true,
		width:"50%",
		height:"50%",
		onLoad: function(){
			$('#conclusionBox').show();
		},
		onCleanup: function(){
			$('#conclusionBox').hide();
		}
	});
  */
	set_Colorbox_celldefault('.cell-default');
});

function set_Colorbox_celldefault(targetElement){
  $(targetElement).colorbox({
		href:"#addBox",
		inline: true,
		width:"30%",
		height:"50%",
		closeButton: false,
		onLoad:
      function(){
			     $('#addBox').show();
		  },
		onCleanup:
      function(obj){
        var parentRow = obj.el.parentElement;
        insertBrick(obj);
        rowSubmit(parentRow.innerHTML);
      }
	});
}

function insertBrick(obj){
  $('#addBox').hide();
  var text = document.getElementById('main_text').value;
  var ref = document.getElementById('ref').innerHTML;
  var container = obj.el;
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
    '<a id="anchor_brickOriginal'
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
          + '</div>'
    + '</a>');
    //link the anchor tag to the colorbox effect
    var newAnchor = cell.getElementsByTagName('a')[0];
    $(newAnchor).colorbox({inline: true, width:"50%", height:"50%"});
    document.getElementById('main_text').value = null;
      document.getElementById('ref').innerHTML = null;
  }
}

function rowSubmit(row){
  axios.post('/data/rowhistory', {
    "row": row
  })
  .then(
    function(res){
      console.log(res.data);
    }
  );
}
