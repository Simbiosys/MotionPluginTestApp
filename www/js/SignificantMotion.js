function SignificantMotion () {
  this.values = null
  this.enabled = false

  // DOM elements
  this.enabledSpan = document.getElementById('js-significantmotion-enabled')
  this.valuesSpan = document.getElementById('js-significantmotion-values')

  // Button
  this.button = document.getElementById('js-significantmotion-capture')
  this.button.onclick = this.buttonClickHandler
}

SignificantMotion.prototype.buttonClickHandler = function (event) {
  var self = window.significantmotion
  var motionPlugin = window.motionPlugin

  event.preventDefault()

  if (!self.enabled) {
    motionPlugin.enableSignificantMotionTrigger(function (pluginResponse) {
      console.log(pluginResponse)
      self.enabled = true
      self.displayStatus()
      self.setButtonText()

      motionPlugin.enableTriggerAfterEvent(function (pluginResponse) {
        console.log(pluginResponse)
      }, function (error) {
        console.log(error)
      })
    }, function (error) {
      console.log(error)
    })
  } else {
    motionPlugin.disableSignificantMotionTrigger(function (pluginResponse) {
      console.log(pluginResponse)
      self.enabled = false
      self.displayStatus()
      self.setButtonText()
    }, function (error) {
      console.log(error)
    })
  }
}

SignificantMotion.prototype.displayStatus = function () {
  var self = this

  self.enabledSpan.innerHTML = self.enabled ? 'enabled' : 'disabled'
}

SignificantMotion.prototype.updateSensorData = function (values) {
  var self = this

  self.values = values

  self.displaySensorData()
}

SignificantMotion.prototype.displaySensorData = function () {
  var self = this

  self.valuesSpan.innerHTML = 'Event captured at ' + Date.now() + '. Event data: ' + self.values
}

SignificantMotion.prototype.setButtonText = function () {
  var self = this

  self.button.innerHTML = self.enabled ? 'Disable Trigger' : 'Enable Trigger'
}

SignificantMotion.prototype.setAsDisabled = function () {
  var self = this

  self.enabled = false
  self.displayStatus()
  self.setButtonText()
}

window.significantmotion = new SignificantMotion()
