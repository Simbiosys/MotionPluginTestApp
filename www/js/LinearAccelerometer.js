function LinearAccelerometer () {
  this.x = 0
  this.y = 0
  this.z = 0
  this.enabled = false

  // DOM elements
  this.enabledSpan = document.getElementById('js-linear-accelerometer-enabled')
  this.xSpan = document.getElementById('js-linear-accelerometer-x')
  this.ySpan = document.getElementById('js-linear-accelerometer-y')
  this.zSpan = document.getElementById('js-linear-accelerometer-z')

  // Button
  this.button = document.getElementById('js-linear-accelerometer-capture')
  this.button.onclick = this.buttonClickHandler
}

LinearAccelerometer.prototype.buttonClickHandler = function (event) {
  var self = window.linearAccelerometer
  var motionPlugin = window.motionPlugin

  event.preventDefault()

  if (!self.enabled) {
    motionPlugin.startLinearAccelerometerCapture(function (pluginResponse) {
      console.log(pluginResponse)
      self.enabled = true
      self.displayStatus()
      self.setButtonText()
    }, function (error) {
      console.log(error)
    })
  } else {
    motionPlugin.stopLinearAccelerometerCapture(function (pluginResponse) {
      console.log(pluginResponse)
      self.enabled = false
      self.displayStatus()
      self.setButtonText()
    }, function (error) {
      console.log(error)
    })
  }
}

LinearAccelerometer.prototype.displayStatus = function () {
  var self = this

  self.enabledSpan.innerHTML = self.enabled ? 'enabled' : 'disabled'
}

LinearAccelerometer.prototype.updateAcceleration = function (x, y, z) {
  var self = this

  self.x = x
  self.y = y
  self.z = z

  self.displayAcceleration()
}

LinearAccelerometer.prototype.displayAcceleration = function () {
  var self = this

  self.xSpan.innerHTML = self.x
  self.ySpan.innerHTML = self.y
  self.zSpan.innerHTML = self.z
}

LinearAccelerometer.prototype.setButtonText = function () {
  var self = this

  self.button.innerHTML = self.enabled ? 'Stop capture' : 'Start capture'
}

window.linearAccelerometer = new LinearAccelerometer()
