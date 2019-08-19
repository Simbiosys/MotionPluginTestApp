function Accelerometer () {
  this.x = 0
  this.y = 0
  this.z = 0
  this.enabled = false

  // DOM elements
  this.enabledSpan = document.getElementById('js-accelerometer-enabled')
  this.xSpan = document.getElementById('js-accelerometer-x')
  this.ySpan = document.getElementById('js-accelerometer-y')
  this.zSpan = document.getElementById('js-accelerometer-z')

  // Button
  this.button = document.getElementById('js-accelerometer-capture')
  this.button.onclick = this.buttonClickHandler
}

Accelerometer.prototype.buttonClickHandler = function (event) {
  var self = window.accelerometer
  var motionPlugin = window.motionPlugin

  event.preventDefault()

  if (!self.enabled) {
    motionPlugin.startAccelerometerCapture(function (pluginResponse) {
      console.log(pluginResponse)
      self.enabled = true
      self.displayStatus()
      self.setButtonText()
    }, function (error) {
      console.log(error)
    })
  } else {
    motionPlugin.stopAccelerometerCapture(function (pluginResponse) {
      console.log(pluginResponse)
      self.enabled = false
      self.displayStatus()
      self.setButtonText()
    }, function (error) {
      console.log(error)
    })
  }
}

Accelerometer.prototype.displayStatus = function () {
  var self = this

  self.enabledSpan.innerHTML = self.enabled ? 'enabled' : 'disabled'
}

Accelerometer.prototype.updateAcceleration = function (x, y, z) {
  var self = this

  self.x = x
  self.y = y
  self.z = z

  self.displayAcceleration()
}

Accelerometer.prototype.displayAcceleration = function () {
  var self = this

  self.xSpan.innerHTML = self.x
  self.ySpan.innerHTML = self.y
  self.zSpan.innerHTML = self.z
}

Accelerometer.prototype.setButtonText = function () {
  var self = this

  self.button.innerHTML = self.enabled ? 'Stop capture' : 'Start capture'
}

window.accelerometer = new Accelerometer()
