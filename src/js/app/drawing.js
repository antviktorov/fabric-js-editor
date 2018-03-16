"use strict";

var canvas = global.canvas;
var utils = new (require('./fabricUtils.js'))();

var drawnObj, isMouseDown;

function disableDraw() {
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    canvas.selection = true;
    canvas.forEachObject(function (o) {
        o.selectable = true;
    });
}

function drawObj(objType) {
    // Esc key handler
    $(document).on("keyup", escHandler);

    canvas.selection = false;
    canvas.forEachObject(function (o) {
        o.selectable = false;
    });

    canvas.on('mouse:down', function (o) {
        // Unregister escape key handler
        $(document).off("keyup", escHandler);

        isMouseDown = true;
        var pointer = canvas.getPointer(o.e);

        if (objType === 'line') {
            var points = [pointer.x, pointer.y, pointer.x, pointer.y];
            drawnObj = new fabric.Line(points, {
                strokeWidth: 5,
                fill: 'blue',
                stroke: 'blue',
                originX: 'center',
                originY: 'center'
            });
        } else if (objType === 'square') {
            drawnObj = new fabric.Rect({
                width: 0,
                height: 0,
                top: pointer.y,
                left: pointer.x,
                fill: 'green'
            });
        } else if (objType === 'rounded-rect') {
            drawnObj = new fabric.Rect({
                width: 0,
                height: 0,
                top: pointer.y,
                left: pointer.x,
                rx: 10,
                ry: 10,
                fill: 'red'
            });
        } else if (objType === 'circle') {
            drawnObj = new fabric.Circle({
                radius: 0,
                top: pointer.y,
                left: pointer.x,
                fill: 'yellow'
            });
        } else if (objType === 'toolbar') {
            var triangle = new fabric.Triangle({
                width: 30, height: 40, fill: 'green', left: pointer.x + 50 - 15, top: pointer.y - 50 + 20
            });

            var roundRect = new fabric.Rect({
                width: 0,
                height: 0,
                top: pointer.y,
                left: pointer.x,
                rx: 10,
                ry: 10,
                fill: 'green'
            });

            drawnObj = new fabric.Group(null, {
                width: 0,
                height: 0,
                left: pointer.x,
                top: pointer.y
            });
            drawnObj.addWithUpdate(triangle);
            drawnObj.addWithUpdate(roundRect);
        }

        canvas.add(drawnObj);
    });

    canvas.on('mouse:move', function (o) {
        if (!isMouseDown) return;
        var shift = o.e.shiftKey;
        var pointer = canvas.getPointer(o.e);

        var newWidth, newHeight;

        if (objType === 'line') {
            if (shift) {
                // TODO rotate towards closest angle
                drawnObj.set({x2: pointer.x, y2: pointer.y});
            } else {
                drawnObj.set({x2: pointer.x, y2: pointer.y});
            }
        } else if (objType === 'square' || objType === 'rounded-rect') {
            newWidth = (drawnObj.left - pointer.x) * -1;
            newHeight = (drawnObj.top - pointer.y) * -1;
            drawnObj.set({width: newWidth, height: newHeight});
        } else if (objType === 'toolbar') {
            newWidth = (drawnObj.left - pointer.x) * -1;
            newHeight = (drawnObj.top - pointer.y) * -1;

            var objects = drawnObj.getObjects();
            if (!drawnObj.isEmpty()) {
                var object;
                for (var i = 0, len = objects.length; i < len; i++) {
                    object = objects[i];
                    if (object.type === 'rect') {
                        object.set(
                            {
                                top: newHeight * -0.5 + 40,
                                left: newWidth * -0.5,
                                width: newWidth,
                                height: newHeight - 40
                            }
                        );
                    } else if (object.type === 'triangle') {
                        object.set({left: -15, top: newHeight * -0.5});
                    }
                }
            }
            drawnObj.set({width: newWidth, height: newHeight});
        } else if (objType === 'circle') {
            var x = drawnObj.left - pointer.x;
            var y = drawnObj.top - pointer.y;
            var diff = Math.sqrt(x * x + y * y);
            drawnObj.set({radius: diff / 2.3});
        }

        canvas.renderAll();
    });

    canvas.on('mouse:up', function (o) {
        isMouseDown = false;

        // Fix upside-down square
        if (objType === 'square' || objType === 'rounded-rect') {
            if (drawnObj.width < 0) {
                var newLeft = drawnObj.left + drawnObj.width;
                var newWidth = Math.abs(drawnObj.width);
                drawnObj.set({left: newLeft, width: newWidth});
            }

            if (drawnObj.height < 0) {
                var newTop = drawnObj.top + drawnObj.height;
                var newHeight = Math.abs(drawnObj.height);
                drawnObj.set({top: newTop, height: newHeight});
            }
        }

        // Delete the object if it's tiny, otherwise select it
        if (drawnObj.height !== 0 || drawnObj.width !== 0) {
            canvas.defaultCursor = 'auto';

            // Fix selection bug by selecting and deselecting all objects
            utils.selectAll();
            canvas.discardActiveObject();

            // Select the object
            canvas.setActiveObject(drawnObj).renderAll();

            // Set per-pixel dragging rather than bounding-box dragging
            drawnObj.perPixelTargetFind = true;
            drawnObj.targetFindTolerance = 4;

            // Disable drawing
            disableDraw();

            // Push the canvas state to history
            canvas.trigger("object:statechange");
        } else {
            canvas.remove(drawnObj);
        }
    });

}

function cancelInsert() {
    canvas.defaultCursor = 'auto';
    disableDraw();
    $("#toolbar-text").removeClass("toolbar-item-active ");
}

// Cancel text insertion
function escHandler(e) {
    if (e.keyCode == 27) {
        cancelInsert();

        // Unregister escape key handler
        $(document).off("keyup", escHandler);
    }
}

/* ----- exports ----- */

function DrawingModule() {
    if (!(this instanceof DrawingModule)) return new DrawingModule();
    // constructor
}

DrawingModule.prototype.drawObj = drawObj;
DrawingModule.prototype.disableDraw = disableDraw;

module.exports = DrawingModule;
