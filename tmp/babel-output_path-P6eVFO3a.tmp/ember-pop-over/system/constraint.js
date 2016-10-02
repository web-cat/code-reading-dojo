define('ember-pop-over/system/constraint', ['exports', 'ember', 'ember-array/utils', 'ember-metal/utils'], function (exports, _ember, _emberArrayUtils, _emberMetalUtils) {
  'use strict';

  var mixin = _ember['default'].mixin;
  var compare = _ember['default'].compare;

  function orientAbove(target, popover, pointer, over) {
    var shiftY = over ? 0 : popover.height + pointer.height;
    popover.setY(target.top - shiftY);
    pointer.setY(popover.height);
  }

  function orientBelow(target, popover, pointer, over) {
    var shiftY = over ? -1 * popover.height : pointer.height;
    popover.setY(target.bottom + shiftY);
    pointer.setY(pointer.height * -1);
  }

  function orientLeft(target, popover, pointer, over) {
    var shiftX = over ? 0 : popover.width + pointer.width;
    popover.setX(target.left - shiftX);
    pointer.setX(popover.width);
  }

  function orientRight(target, popover, pointer, over) {
    var shiftX = over ? -1 * popover.width : pointer.width;
    popover.setX(target.right + shiftX);
    pointer.setX(pointer.width * -1);
  }

  function orientCenter(target, popover, pointer) {
    horizontallyCenter(target, popover, pointer);
    verticallyCenter(target, popover, pointer);
  }

  function horizontallyCenter(target, popover, pointer) {
    popover.setX(target.left + target.width / 2 - popover.width / 2);
    pointer.setX(popover.width / 2 - pointer.width / 2);
  }

  function verticallyCenter(target, popover, pointer) {
    popover.setY(target.top + target.height / 2 - popover.height / 2);
    pointer.setY(popover.height / 2 - pointer.height / 2);
  }

  function snapLeft(target, popover, pointer) {
    var offsetLeft = Math.min(target.width / 2 - pointer.width * 1.5, 0);
    popover.setX(target.left + offsetLeft);
    pointer.setX(pointer.width);
  }

  function snapRight(target, popover, pointer) {
    var offsetRight = Math.min(target.width / 2 - pointer.width * 1.5, 0);
    popover.setX(target.right - offsetRight - popover.width);
    pointer.setX(popover.width - pointer.width * 2);
  }

  function snapAbove(target, popover, pointer) {
    var offsetTop = Math.min(target.height / 2 - pointer.height * 1.5, 0);
    popover.setY(target.top + offsetTop);
    pointer.setY(pointer.height);
  }

  function snapBelow(target, popover, pointer) {
    var offsetBottom = Math.min(target.height / 2 - pointer.height * 1.5, 0);
    popover.setY(target.bottom - offsetBottom - popover.height);
    pointer.setY(popover.height - pointer.height * 2);
  }

  function slideHorizontally(guidelines, boundary, target, popover, pointer) {
    var edges = {
      'left-edge': Math.min(target.width / 2 - pointer.width * 1.5, 0),
      'center': target.width / 2 - popover.width / 2,
      'right-edge': target.width - popover.width
    };
    var range = (0, _emberArrayUtils.A)(guidelines).map(function (guideline) {
      return edges[guideline] || [-1, -1];
    });

    var left = target.x + range[0];
    var right = left + popover.width;

    range = range.sort(function (a, b) {
      return compare(a, b);
    });
    var minX = target.x + range[0];
    var maxX = target.x + range[1];

    var padding = pointer.width;

    // Adjust the popover so it remains in view
    if (left < boundary.left + padding) {
      left = boundary.left + padding;
    } else if (right > boundary.right - padding) {
      left = boundary.right - popover.width - padding;
    }

    var valid = left >= minX && left <= maxX;
    left = Math.max(Math.min(left, maxX), minX);

    popover.setX(left);

    var dX = target.left - left;
    var oneThird = (edges['left-edge'] - edges['right-edge']) / 3;
    var pointerClassName = undefined;

    if (dX < oneThird) {
      pointer.setX(dX + Math.min(pointer.width, target.width / 2 - pointer.width * 1.5));
      pointerClassName = 'left-edge';
    } else if (dX < oneThird * 2) {
      pointer.setX(dX + target.width / 2 - pointer.width / 2);
      pointerClassName = 'center';
    } else {
      pointer.setX(dX + target.width - pointer.width * 1.5);
      pointerClassName = 'right-edge';
    }

    return {
      valid: valid,
      pointer: pointerClassName
    };
  }

  function slideVertically(guidelines, boundary, target, popover, pointer) {
    var edges = {
      'top-edge': Math.min(target.height / 2 - pointer.height * 1.5, 0),
      'center': target.height / 2 - popover.height / 2,
      'bottom-edge': target.height - popover.height
    };
    var range = (0, _emberArrayUtils.A)(guidelines).map(function (guideline) {
      return edges[guideline];
    });

    var top = target.y + range[0];
    var bottom = top + popover.height;

    range = range.sort(function (a, b) {
      return compare(a, b);
    });
    var minY = target.y + range[0];
    var maxY = target.y + range[1];

    var padding = pointer.height;

    // Adjust the popover so it remains in view
    if (top < boundary.top + padding) {
      top = boundary.top + padding;
    } else if (bottom > boundary.bottom - padding) {
      top = boundary.bottom - popover.height - padding;
    }

    var valid = top >= minY && top <= maxY;
    top = Math.max(Math.min(top, maxY), minY + padding);

    popover.setY(top);

    var dY = target.top - top;
    var oneThird = (edges['top-edge'] - edges['bottom-edge']) / 3;
    var pointerClassName = undefined;

    if (dY < oneThird) {
      pointer.setY(dY + pointer.height + Math.min(target.height / 2 - pointer.height * 1.5, 0));
      pointerClassName = 'top-edge';
    } else if (dY < oneThird * 2) {
      pointer.setY(dY + target.height / 2 - pointer.height / 2);
      pointerClassName = 'center';
    } else {
      pointer.setY(dY - Math.min(target.height + pointer.height * 1.5, 0));
      pointerClassName = 'bottom-edge';
    }

    return {
      valid: valid,
      pointer: pointerClassName
    };
  }

  function Constraint(object) {
    Object.keys(object).forEach(function (key) {
      this[key] = object[key];
    }, this);
  }

  Constraint.prototype.solveFor = function (boundingRect, targetRect, popoverRect, pointerRect, positionOver) {
    var orientation = this.orientation;
    var result = {
      orientation: orientation,
      valid: true
    };

    if (orientation === 'center') {
      (0, _emberMetalUtils.assert)('You can not use the "center" orientation without setting the ' + '{{pop-over}} component to "cover=false"', positionOver);
    }

    // Orient the pane
    switch (orientation) {
      case 'above':
        orientAbove(targetRect, popoverRect, pointerRect, positionOver);break;
      case 'below':
        orientBelow(targetRect, popoverRect, pointerRect, positionOver);break;
      case 'left':
        orientLeft(targetRect, popoverRect, pointerRect, positionOver);break;
      case 'right':
        orientRight(targetRect, popoverRect, pointerRect, positionOver);break;
      case 'center':
        orientCenter(targetRect, popoverRect, pointerRect);break;
    }

    // The pane should slide in the direction specified by the flow
    if (this.behavior === 'slide') {
      switch (orientation) {
        case 'above':
        case 'below':
          mixin(result, slideHorizontally(this.guideline, boundingRect, targetRect, popoverRect, pointerRect, positionOver));
          break;
        case 'left':
        case 'right':
          mixin(result, slideVertically(this.guideline, boundingRect, targetRect, popoverRect, pointerRect, positionOver));
          break;
      }
    } else if (this.behavior === 'snap') {
      result.pointer = this.guideline;
      switch (this.guideline) {
        case 'center':
          switch (this.orientation) {
            case 'above':
            case 'below':
              horizontallyCenter(targetRect, popoverRect, pointerRect);break;
            case 'left':
            case 'right':
              verticallyCenter(targetRect, popoverRect, pointerRect);break;
            case 'center':
              horizontallyCenter(targetRect, popoverRect, pointerRect);
              verticallyCenter(targetRect, popoverRect, pointerRect);
          }
          break;
        case 'top-edge':
          snapAbove(targetRect, popoverRect, pointerRect);break;
        case 'bottom-edge':
          snapBelow(targetRect, popoverRect, pointerRect);break;
        case 'right-edge':
          snapRight(targetRect, popoverRect, pointerRect);break;
        case 'left-edge':
          snapLeft(targetRect, popoverRect, pointerRect);break;
      }
    }

    result.valid = result.valid && boundingRect.contains(popoverRect);
    return result;
  };

  exports['default'] = Constraint;
});