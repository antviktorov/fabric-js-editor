//(function(global) {

    'use strict';

    console.log("Custom tooltip 1");

    var fabric = global.fabric || (global.fabric = { })
        extend = fabric.util.object.extend;

    console.log("Custom tooltip 2");

    /*if (fabric.Tooltip) {
        fabric.warn('fabric.Tooltip is already defined');
        return;
    }*/

    /**
     * Tooltip class
     * @class fabric.Tooltip
     * @extends fabric.Object
     * @return {fabric.Rect} thisArg
     * @see {@link fabric.Rect#initialize} for constructor definition
     */
    fabric.Tooltip = fabric.util.createClass(fabric.Rect, /** @lends fabric.Rect.prototype */ {
        /**
         * List of properties to consider when checking if state of an object is changed ({@link fabric.Object#hasStateChanged})
         * as well as for history (undo/redo) purposes
         * @type Array
         */
        //stateProperties: fabric.Object.prototype.stateProperties.concat('rx', 'ry'),

        /**
         * Type of an object
         * @type String
         * @default
         */
        type: 'tooltip',

        /**
         * Constructor
         * @param {Object} [options] Options object
         * @return {Object} thisArg
         */
        initialize: function(options) {
            this.callSuper('initialize', options);
            //this._initRxRy();
        },

        /**
         * @private
         * @param {CanvasRenderingContext2D} ctx Context to render on
         */
        /*_render: function(ctx) {

            // optimize 1x1 case (used in spray brush)
            if (this.width === 1 && this.height === 1) {
                ctx.fillRect(-0.5, -0.5, 1, 1);
                return;
            }

            var rx = this.rx ? Math.min(this.rx, this.width / 2) : 0,
                ry = this.ry ? Math.min(this.ry, this.height / 2) : 0,
                w = this.width,
                h = this.height,
                x = -this.width / 2,
                y = -this.height / 2,
                isRounded = rx !== 0 || ry !== 0,
            // "magic number" for bezier approximations of arcs (http://itc.ktu.lt/itc354/Riskus354.pdf)
                k = 1 - 0.5522847498;
            ctx.beginPath();

            ctx.moveTo(x + rx, y);

            ctx.lineTo(x + w - rx, y);
            isRounded && ctx.bezierCurveTo(x + w - k * rx, y, x + w, y + k * ry, x + w, y + ry);

            ctx.lineTo(x + w, y + h - ry);
            isRounded && ctx.bezierCurveTo(x + w, y + h - k * ry, x + w - k * rx, y + h, x + w - rx, y + h);

            ctx.lineTo(x + rx, y + h);
            isRounded && ctx.bezierCurveTo(x + k * rx, y + h, x, y + h - k * ry, x, y + h - ry);

            ctx.lineTo(x, y + ry);
            isRounded && ctx.bezierCurveTo(x, y + k * ry, x + k * rx, y, x + rx, y);

            ctx.closePath();

            this._renderPaintInOrder(ctx);
        },

        /**
         * @private
         * @param {CanvasRenderingContext2D} ctx Context to render on
         */
        /*_renderDashedStroke: function(ctx) {
            var x = -this.width / 2,
                y = -this.height / 2,
                w = this.width,
                h = this.height;

            ctx.beginPath();
            fabric.util.drawDashedLine(ctx, x, y, x + w, y, this.strokeDashArray);
            fabric.util.drawDashedLine(ctx, x + w, y, x + w, y + h, this.strokeDashArray);
            fabric.util.drawDashedLine(ctx, x + w, y + h, x, y + h, this.strokeDashArray);
            fabric.util.drawDashedLine(ctx, x, y + h, x, y, this.strokeDashArray);
            ctx.closePath();
        },*/

        /**
         * Returns object representation of an instance
         * @param {Array} [propertiesToInclude] Any properties that you might want to additionally include in the output
         * @return {Object} object representation of an instance
         */
        /*toObject: function(propertiesToInclude) {
            return this.callSuper('toObject', ['rx', 'ry'].concat(propertiesToInclude));
        },*/

        /* _TO_SVG_START_ */
        //TODO export SVG implementation
        /* _TO_SVG_END_ */
    });

    /* _FROM_SVG_START_ */
    //TODO import SVG implementation
    /* _FROM_SVG_END_ */

    /**
     * Returns {@link fabric.Rect} instance from an object representation
     * @static
     * @memberOf fabric.Rect
     * @param {Object} object Object to create an instance from
     * @param {Function} [callback] Callback to invoke when an fabric.Rect instance is created
     */
    fabric.Tooltip.fromObject = function(object, callback) {
        return fabric.Object._fromObject('Tooltip', object, callback);
    };

//})(typeof exports !== 'undefined' ? exports : this);