import $ from 'jquery';
import get from 'ember-metal/get';
import { getLayout } from "dom-ruler";

var Rectangle = function Rectangle(x, y, width, height) {
  this.x = this.left = x;
  this.y = this.top = y;
  this.right = x + width;
  this.bottom = y + height;
  this.width = width;
  this.height = height;
  this.area = width * height;
};

Rectangle.prototype = {
  intersects: function intersects(rect) {
    return Rectangle.intersection(this, rect).area > 0;
  },

  contains: function contains(rect) {
    return Rectangle.intersection(this, rect).area === rect.area;
  },

  translateX: function translateX(dX) {
    this.x = this.left = this.x + dX;
    this.right += dX;
  },

  translateY: function translateY(dY) {
    this.y = this.top = this.y + dY;
    this.bottom += dY;
  },

  translate: function translate(dX, dY) {
    this.translateX(dX);
    this.translateY(dY);
  },

  setX: function setX(x) {
    this.translateX(x - this.x);
  },

  setY: function setY(y) {
    this.translateY(y - this.y);
  }
};

Rectangle.intersection = function (rectA, rectB) {
  // Find the edges
  var x = Math.max(rectA.x, rectB.x);
  var y = Math.max(rectA.y, rectB.y);
  var right = Math.min(rectA.right, rectB.right);
  var bottom = Math.min(rectA.bottom, rectB.bottom);
  var width = undefined,
      height = undefined;

  if (rectA.right <= rectB.left || rectB.right <= rectA.left || rectA.bottom <= rectB.top || rectB.bottom <= rectA.top) {
    x = y = width = height = 0;
  } else {
    width = Math.max(0, right - x);
    height = Math.max(0, bottom - y);
  }

  return new Rectangle(x, y, width, height);
};

Rectangle.ofView = function (view, boxModel) {
  return this.ofElement(get(view, 'element'), boxModel);
};

Rectangle.ofElement = function (element, boxModel) {
  var size = getLayout(element);
  if (boxModel) {
    size = size[boxModel];
  }
  var offset = $(element).offset() || { top: $(element).scrollTop(), left: $(element).scrollLeft() };

  return new Rectangle(offset.left, offset.top, size.width, size.height);
};

export default Rectangle;