function ActivityDetection () {
  this.enabled = false

  // DOM elements
  this.enabledSpan = document.getElementById('js-activity-detection-enabled')
  this.dataDiv = document.getElementById('js-activity-detection-data')

  // Button
  this.button = document.getElementById('js-activity-detection-capture')
  this.button.onclick = this.buttonClickHandler
}

ActivityDetection.prototype.buttonClickHandler = function (event) {
  var self = window.activityDetection
  var motionPlugin = window.motionPlugin

  event.preventDefault()

  if (!self.enabled) {
    motionPlugin.startActivityDetectionCapture(function (pluginResponse) {
      console.log(pluginResponse)
      self.enabled = true
      self.displayStatus()
      self.setButtonText()
    }, function (error) {
      console.log(error)
    })
  } else {
    motionPlugin.stopActivityDetectionCapture(function (pluginResponse) {
      console.log(pluginResponse)
      self.enabled = false
      self.displayStatus()
      self.setButtonText()
    }, function (error) {
      console.log(error)
    })
  }
}

ActivityDetection.prototype.displayStatus = function () {
  var self = this

  self.enabledSpan.innerHTML = self.enabled ? 'enabled' : 'disabled'
}

ActivityDetection.prototype.setButtonText = function () {
  var self = this

  self.button.innerHTML = self.enabled ? 'Stop capture' : 'Start capture'
}

ActivityDetection.prototype.updateActivityData = function (data) {
  var p = document.createElement('p')
  p.innerHTML = 'Transition type: ' + data.transitionType + '. Activity type: ' + data.activityType
  this.dataDiv.appendChild(p)
}

window.activityDetection = new ActivityDetection()
