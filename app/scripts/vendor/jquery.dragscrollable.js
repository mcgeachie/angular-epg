/*
 * jQuery dragscrollable Plugin
 * version: 1.0 (25-Jun-2009)
 * Copyright (c) 2009 Miquel Herrera
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
;(function($){ // secure $ jQuery alias

/**
 * Adds the ability to manage elements scroll by dragging
 * one or more of its descendant elements. Options parameter
 * allow to specifically select which inner elements will
 * respond to the drag events.
 *
 * options properties:
 * ------------------------------------------------------------------------
 *  dragSelector         | jquery selector to apply to each wrapped element
 *                       | to find which will be the dragging elements.
 *                       | Defaults to '>:first' which is the first child of
 *                       | scrollable element
 * ------------------------------------------------------------------------
 *  acceptPropagatedEvent| Will the dragging element accept propagated
 *                         | events? default is yes, a propagated mouse event
 *                         | on a inner element will be accepted and processed.
 *                         | If set to false, only events originated on the
 *                         | draggable elements will be processed.
 * ------------------------------------------------------------------------
 *  preventDefault       | Prevents the event to propagate further effectivey
 *                       | dissabling other default actions. Defaults to true
 * ------------------------------------------------------------------------
 *
 *  usage examples:
 *
 *  To add the scroll by drag to the element id=viewport when dragging its
 *  first child accepting any propagated events
 *    $('#viewport').dragscrollable();
 *
 *  To add the scroll by drag ability to any element div of class viewport
 *  when dragging its first descendant of class dragMe responding only to
 *  evcents originated on the '.dragMe' elements.
 *    $('div.viewport').dragscrollable({dragSelector:'.dragMe:first',
 *                                      acceptPropagatedEvent: false});
 *
 *  Notice that some 'viewports' could be nested within others but events
 *  would not interfere as acceptPropagatedEvent is set to false.
 *
 */
$.fn.dragscrollable = function( options ){

    var settings = $.extend(
        {
            dragSelector:'>:first',
            acceptPropagatedEvent: true,
            preventDefault: true,
            threshold: 0,
            axis: 'both'
        },options || {});


    var dragscroll= {
        mouseDownHandler : function(event) {
            // mousedown, left click, check propagation
            if (event.which!=1 ||
                (!event.data.acceptPropagatedEvent && event.target != this)){
                return false;
            }
            event.data.scrollable.css('cursor', 'move');

            // Added for SkyPlus
            $(event.data.scrollable.attr('body')).addClass('dragged');

            // Initial coordinates will be the last when dragging
            event.data.lastCoord = {left: event.clientX, top: event.clientY};
            event.data.originalCoord = {left: event.clientX, top: event.clientY};

            $.event.add( document, "mouseup",
                         dragscroll.mouseUpHandler, event.data );
            $.event.add( document, "mousemove",
                         dragscroll.mouseMoveHandler, event.data );
            if (event.data.preventDefault) {
                event.preventDefault();
                return false;
            }
        },
        mouseMoveHandler : function(event) { // User is dragging
            // How much did the mouse move?
            var delta = {
                left: (event.clientX - event.data.lastCoord.left),
                top: (event.clientY - event.data.lastCoord.top)
            },
            deltaOriginal;

            if (delta.left || delta.top) {
                // Added for SkyPlus
                deltaOriginal = {
                    left: (event.clientX - event.data.originalCoord.left),
                    top: (event.clientY - event.data.originalCoord.top)
                };

                var xPos = event.data.scrollable.scrollLeft(),
                    yPos = event.data.scrollable.scrollTop();
                // Set the scroll position relative to what ever the scroll is now
                if( settings.axis == 'x' || settings.axis == 'both') {
                    xPos -= delta.left;
                }
                if( settings.axis == 'y' || settings.axis == 'both' ) {
                    yPos -= delta.top;
                }
                $(event.data.scrollable.get(0)).scrollTo(xPos, yPos);

                // Save where the cursor is
                event.data.lastCoord={left: event.clientX, top: event.clientY};
                // Added for SkyPlus
                if (Math.abs(deltaOriginal.left) > event.data.threshold || Math.abs(deltaOriginal.top) > event.data.threshold) {
                    event.data.scrollable.trigger('dragscroll', [event]);
                }
            }

            if (event.data.preventDefault) {
                event.preventDefault();
                return false;
            }

        },
        mouseUpHandler : function(event) { // Stop scrolling
            $.event.remove( document, "mousemove", dragscroll.mouseMoveHandler);
            $.event.remove( document, "mouseup", dragscroll.mouseUpHandler);
            event.data.scrollable.css('cursor', '');
            $(event.data.scrollable.attr('document').body).removeClass('dragged');
            if (event.data.preventDefault) {
                event.preventDefault();
                return false;
            }
        }
    };

    // set up the initial events
    this.each(function() {
        // closure object data for each scrollable element
        var data = {scrollable : $(this),
                    acceptPropagatedEvent : settings.acceptPropagatedEvent,
                    preventDefault : settings.preventDefault,
                    threshold: settings.threshold };
        // Set mouse initiating event on the desired descendant
        $(settings.dragSelector).
                        bind('mousedown', data, dragscroll.mouseDownHandler);
    });
}; //end plugin dragscrollable

})( jQuery ); // confine scope
