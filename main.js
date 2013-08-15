//Device view mode flag
var deviceViewMode = false

$(document).ready(function() {
	//URL form submit event
	$('#url').submit(function() {
		$('iframe').attr('src', $('#url input[type=text]').val())
		return false
	}).trigger('submit')

	//Window resize event
	$(window).resize(function() {
		if (!deviceViewMode) {
			var frameHeight = $(window).height() - $('#head').height()
			$('#frame').css('height', frameHeight + 'px')
		}
	}).trigger('resize')

	//Make frame resizeable
	$('#frame').resizable({
		handles: 'e, w',
		start: function(event, ui) {
			$('iframe').css('pointer-events','none')
		},
		stop: function(event, ui) {
			$('iframe').css('pointer-events','auto')
		},
		resize: function(event, ui) {
			updateFrameSize()
		}
	})

	//Init current frame width
	updateFrameSize()

	//Init ruler
	var maxWidth = 2000
	var stepSize = 10
	var bigStepSize = 50

	$('#ruler .inner').css('width', maxWidth + 'px')

	for (var i = 1; i < maxWidth / stepSize; i++) {
		var className = i * stepSize % bigStepSize == 0 ? 'big' : 'small'
		var label = className == 'big' ? i * stepSize : ''

		$('#ruler .inner').append(
			'<div class="' + className + '" style="width: ' + (stepSize - 1) + 'px;">' +
				'<span class="label">' + label + '</label>' +
			'</div>'
		)
	}

	//Device click
	$('#devices a').click(function() {
		var deviceWidth = $(this).data('width')
		var deviceHeight = $(this).data('height')

		if (deviceHeight) {
			deviceViewMode = true
			$('#frame-wrapper').addClass('device-border')
			$('#frame').animate({ width: deviceWidth, height: deviceHeight }, 300, function() { updateFrameSize() })
		} else {
			deviceViewMode = false
			$('#frame-wrapper').removeClass('device-border')
			$('#frame').animate({ width: deviceWidth }, 300, function() { updateFrameSize() })
			$(window).trigger('resize')
		}

		return false
	})
})

function updateFrameSize() {
	$('#current-width').html('Current size: ' + $('#frame').width() + 'px')
}