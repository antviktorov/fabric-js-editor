fabric.ToolGroup = fabric.util.createClass(fabric.Group, fabric.Collection, {
    triangleWidth: 30,
    triangleHeight: 40,
    triangleHalfWidth: this.triangleWidth * 0.5,
    triangleHalfHeigt: this.triangleHalfHeigt * 0.5,
    rectangleMaxHeight: 100,
    rectangleMaxWidth: 100,
    color: "green",
    rectAngle: 12,
    type: "tooltip",
    initialize: function(options, isAlreadyGrouped) {

        var triangle = new fabric.Triangle({
            width: this.triangleWidth,
            height: this.triangleHeight,
            fill: this.color,
            left: options.left + 50 - 15,
            top: options.top - 50 + 20
        });

        var roundRect = new fabric.Rect({
            top: options.top,
            left: options.left,
            rx: this.rectAngle,
            ry: this.rectAngle,
            fill: this.color
        });

        this.set({top: options.top, left: options.left});

        this.callSuper("initialize", [triangle, roundRect], options, isAlreadyGrouped);
    },

    update: function(cords) {
        var newWidth = cords.width;
        var newHeight = cords.height;

        if (newWidth < this.rectangleMaxWidth) {
            newWidth = this.rectangleMaxWidth;
        }

        if (newHeight < this.rectangleMaxHeight) {
            newHeight = this.rectangleMaxHeight;
        }

        var objects = this.getObjects();
        if (!this.isEmpty()) {
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
        this.set({width: newWidth, height: newHeight});

        //this._calcBounds();
       // this._updateObjectsCoords();
       // this.setCoords();
    },

    /*toString: function() {
        return "#<fabric.Group: (" + this.complexity() + ")>";
    },
    toObject: function(propertiesToInclude) {
        var objsToObject = this.getObjects().map(function(obj) {
            var originalDefaults = obj.includeDefaultValues;
            obj.includeDefaultValues = obj.group.includeDefaultValues;
            var _obj = obj.toObject(propertiesToInclude);
            obj.includeDefaultValues = originalDefaults;
            return _obj;
        });
        return extend(this.callSuper("toObject", propertiesToInclude), {
            objects: objsToObject
        });
    },
    render: function(ctx) {
        this._transformDone = true;
        this.callSuper("render", ctx);
        this._transformDone = false;
        this.set()
    },*/
});
