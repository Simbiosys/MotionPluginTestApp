function ActivityDetection () {
  this.enabled = false

  // DOM elements
  this.enabledSpan = document.getElementById('js-activity-detection-enabled')
  this.dataDiv = document.getElementById('js-activity-detection-data')

  // Buttons
  this.button = document.getElementById('js-activity-detection-capture')
  this.button.onclick = this.buttonClickHandler
  this.logButton = document.getElementById('js-activity-detection-query')
  this.logButton.onclick = this.logButtonClickHandler
}

ActivityDetection.prototype.buttonClickHandler = function (event) {
  var self = window.activityDetection
  var motionPlugin = window.motionPlugin

  event.preventDefault()

  if (!self.enabled) {
    // Enable return of GPS location coordinates within the event
    motionPlugin.setActivityDetectionEventsWithLocation(
      true,
      function (pluginResponse) {
        console.log(pluginResponse)

        // Start capture
        motionPlugin.startActivityDetectionCapture(function (pluginResponse) {
          console.log(pluginResponse)
          self.enabled = true
          self.displayStatus()
          self.setButtonText()
        }, function (error) {
          console.log(error)
        })
      }, function (error) {
        console.log(error)
      })

    /* motionPlugin.startActivityDetectionCapture(function (pluginResponse) {
      console.log(pluginResponse)
      self.enabled = true
      self.displayStatus()
      self.setButtonText()
    }, function (error) {
      console.log(error)
    }) */
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

ActivityDetection.prototype.logButtonClickHandler = function (event) {
  var motionPlugin = window.motionPlugin

  var currentDate = new Date()
  var currentMonth = currentDate.getMonth() + 1
  var fromDate = currentDate.getFullYear()
  fromDate += '-' + (currentMonth > 10 ? currentMonth : '0' + currentMonth)
  fromDate += '-' + (currentDate.getDate() > 10 ? currentDate.getDate() : '0' + currentDate.getDate())
  fromDate += ' 00:00:00'
  var toDate = currentDate.getFullYear()
  toDate += '-' + (currentMonth > 10 ? currentMonth : '0' + currentMonth)
  toDate += '-' + (currentDate.getDate() > 10 ? currentDate.getDate() : '0' + currentDate.getDate())
  toDate += ' 23:59:59'

  motionPlugin.getActivityLog(fromDate, toDate, function (pluginResponse) {
    console.log(pluginResponse)
  }, function (error) {
    console.log(error)
  })
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

  p.innerHTML = '[' + data.timestamp + '] '

  if (data.hasOwnProperty('transitionType')) {
    p.innerHTML += 'Transition type: ' + (data.hasOwnProperty('transitionType') ? data.transitionType : '-') + '. '
  }

  p.innerHTML += 'Detected activities: ' + data.detectedActivities.join(', ')

  if (data.hasOwnProperty('confidence')) {
    p.innerHTML += ' with confidence: ' + data.confidence
  }

  if (data.hasOwnProperty('latitude') && data.hasOwnProperty('longitude')) {
    p.innerHTML += ' . Lat: ' + data.latitude + ' Long: ' + data.longitude
  }

  this.dataDiv.appendChild(p)
}

ActivityDetection.prototype.displayActivityLog = function (data) {
  var p = document.createElement('p')
  p.innerHTML = '----- Activity Log Start -----'
  this.dataDiv.appendChild(p)

  for (var i = 0; i < data.activities.length; i++) {
    p = document.createElement('p')
    p.innerHTML = '[' + data.activities[i].timestamp + '] '
    p.innerHTML += 'Detected activities: ' + data.activities[i].detectedActivities.join(', ')
    p.innerHTML += ' with confidence: ' + data.activities[i].confidence
    this.dataDiv.appendChild(p)
  }

  p = document.createElement('p')
  p.innerHTML = '----- Activity Log End -----'
  this.dataDiv.appendChild(p)
}

window.activityDetection = new ActivityDetection()
