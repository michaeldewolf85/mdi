/**
 * @file
 * Javascript for Michelle and Mike's wedding website.
 */

 /**
  * Toggle object for DOM manipulation.
  *
  * @param mixed selector
  * A CSS selector or a full DOM object.
  *
  * @return this
  * The Toggle object.
  */
function Toggle(selector) {
  this.elements = [];
  if (typeof selector == 'string') {
    this.elements = document.querySelectorAll(selector);
  }
  if (typeof selector == 'object') {
    this.elements.push(selector);
  }
  this.entranceEffect = 'bounceInRight';
  this.exitEffect = 'bounceOutLeft';
  return this;
}

/**
 * Perform operations on elements' classes.
 *
 * @param string operation
 * The operation to perform.
 * @param string className
 * The class to use.
 * @param number index
 * The index of the item to apply the change to.
 *
 * @return this
 * The Toggle object.
 */
Toggle.prototype.manipClass = function(operation, className, index) {
  var elements = this.elements;
  if (index) {
    elements = elements[index] ? [elements[index]] : elements;
  }
  var classes = className.split(' ');
  var classLen = classes.length;
  var len = elements.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < classLen; j++) {
      elements[i].classList[operation](classes[j]);
    }
  }
  return this;
}

/**
 * Assign a callable to an event on an element.
 *
 * @param string event
 * The event to bind to.
 * @param object callable
 * The function to call.
 *
 * @return this
 * The Toggle object.
 */
Toggle.prototype.on = function(event, callable) {
  var len = this.elements.length;
  for (var i = 0; i < len; i++) {
    this.elements[i].addEventListener(event, callable);
  }
  return this;
}

/**
 * Retrieve a data attribute from an element.
 *
 * @param string attribute
 * The attribute, without 'data-'.
 *
 * @return string
 * The data attribute if present.
 */
Toggle.prototype.data = function(attribute) {
  var data = this.elements[0].attributes.getNamedItem('data-' + attribute);
  if (data) {
    data = data.value
  }
  return data
}

/**
 * Clean out animation classes from all elements in the set.
 */
Toggle.prototype.clean = function() {
  this.manipClass('remove', 'animated ' + this.entranceEffect);
  this.manipClass('remove', 'animated ' + this.exitEffect);
}

window.onload = function() {
  var tabs = new Toggle('.tabs li');
  var tabsContent = new Toggle('.tabs-content');
  tabs.on('click', function(e) {
    // Clean out active tab animation classes.
    var activeTab = new Toggle('.tabs-content-active');
    tabsContent.clean();
    // Handle triggering element.
    var trigger = new Toggle(e.target.parentNode);
    var index = trigger.data('option');
    // Remove all Actives.
    tabs.manipClass('remove', 'tabs-active');
    activeTab.manipClass('add', 'animated ' + activeTab.exitEffect);
    activeTab.manipClass('remove', 'tabs-content-active');
    // Re-bestow active status.
    trigger.manipClass('add', 'tabs-active');
    tabsContent.manipClass('add', 'animated ' + tabsContent.entranceEffect, index);
    tabsContent.manipClass('add', 'tabs-content-active', index);
  });
}
