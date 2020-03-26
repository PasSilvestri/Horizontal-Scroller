
# Horizontal-Scroller

A simple library to build an horizontal scrolling div.
All the elements will be arranged in horizontal and placed in a carousel with arrows to go back and forward. Nothing fancy, no weird animations or complex code. It's similar to the different sections on streaming sites like Netflix. Very nice on mobile to not stretch vertically too much you page.

Just add the class `.horizontal_scroller`, add `<script src="./HorizontalScroller.min.js"></script>` to your page and then call `buildHorizontalScrollers()`.
You can customize the scrollers by passing those 3 arguments:

- height: to set the height of the scrollers
- unit: the css unit for the height (eg "px", "em", "%", ...)
- hideScrollbars: boolean to hide the horizontal scrollbars

Is also possible to customize single divs by calling `buildSingleScroller(element,height,unit,hideScrollbar)` before calling `buildHorizontalScrollers`.
Reset a scroller to it's original form by calling `resetScroller(element)`

example.html is a usage example

*This project is the result of a couple of hours of boredom. Take the code, modify it and adapt it to your needs as much as you like*