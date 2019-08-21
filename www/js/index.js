/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    document.addEventListener('subscribedOk', function () {
      console.log('subscribedOk')

      /* // Start accelerometer capture
      window.motionPlugin.startAccelerometerCapture(function (pluginResponse) {
        console.log(pluginResponse)
      }, function (error) {
        console.log(error)
      }) */
    }, false)

    document.addEventListener('onAccelerometerChanged', function (eventData) {
      console.log('onAccelerometerChanged')

      var accelerometer = window.accelerometer
      accelerometer.updateAcceleration(eventData.x, eventData.y, eventData.z)
    }, false)
    document.addEventListener('onSignificantMotion', function (eventData) {
      console.log('onSignificantMotion')

      var significantmotion = window.significantmotion
      significantmotion.updateSensorData(eventData.values)
      // Once the event is triggered, sensor is disabled
      // significantmotion.setAsDisabled()
    }, false)
    document.addEventListener('onLinearAccelerometerChanged', function (eventData) {
      console.log('onLinearAccelerometerChanged')

      var linearAccelerometer = window.linearAccelerometer
      linearAccelerometer.updateAcceleration(eventData.x, eventData.y, eventData.z)
    }, false)
    document.addEventListener('onActivityDetection', function (eventData) {
      console.log('onActivityDetection')

      var activityDetection = window.activityDetection
      activityDetection.updateActivityData(eventData)
    })
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    this.receivedEvent('deviceready')
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id)
    var listeningElement = parentElement.querySelector('.listening')
    var receivedElement = parentElement.querySelector('.received')

    listeningElement.setAttribute('style', 'display:none')
    receivedElement.setAttribute('style', 'display:block')

    console.log('Received Event: ' + id)
  }
}

app.initialize()
