const ThemeMap = require('../const/theme');
const select = require('d3').select;
const JSDOM = require('jsdom').JSDOM;

class Card {
    constructor(
        title = 'Title',
        width = 1280,
        height = 1024,
        theme = ThemeMap.get('default'),
        xPadding = 30,
        yPadding = 40
    ) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.xPadding = xPadding;
        this.yPadding = yPadding;
        // use fake dom let us can get html element
        const fakeDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
        this.body = select(fakeDom.window.document).select('body');
        this.svg = this.body
            .append('div')
            .attr('class', 'container')
            .append('svg')
            .attr('xmlns', 'http://www.w3.org/2000/svg')
            .attr('width', width)
            .attr('height', height)
            .attr('viewBox', `0 0 ${this.width} ${this.height}`);
        this.svg.append('style').html(
            `* {
          font-family: Ubuntu, 'Lucida Grande', Arial, Helvetica, sans-serif
            }`
        );
        const gradient = this.svg
            .append('linearGradient')
            .attr('id', 'grad')
            .attr('x1', '0')
            .attr('x2', '1')
            .attr('y1', '0')
            .attr('y2', '1');
        gradient
            .append('stop')
            .attr('offset', '0%')
            .attr('stop-color', '#ff02ef');
        gradient
            .append('stop')
            .attr('offset', '25%')
            .attr('stop-color', '#c901f4');
        gradient
            .append('stop')
            .attr('offset', '100%')
            .attr('stop-color', '#4f00ff');
        this.svg
            .append('rect')
            .attr('x', 1.5)
            .attr('y', 1.5)
            .attr('rx', 5)
            .attr('ry', 5)
            .attr('height', '98%')
            .attr('width', '98%')
            .attr('fill', 'url(#grad)')
            .attr('stroke-opacity', 1);

        const isEmptyTitle = this.title == '';
        if (!isEmptyTitle) {
            this.svg
                .append('text')
                .attr('x', this.xPadding)
                .attr('y', this.yPadding)
                .style('font-size', `22px`)
                .style('fill', `${theme.title_color}`)
                .text(this.title);
        }
        this.svg = this.svg
            .append('g')
            .attr(
                'transform',
                `translate(0,${isEmptyTitle ? 0 : this.yPadding})`
            );
    }

    getSVG() {
        return this.svg;
    }

    toString() {
        return this.body.select('.container').html();
    }
}

module.exports = Card;
