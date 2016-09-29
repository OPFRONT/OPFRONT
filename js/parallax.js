class Parallax {
    constructor() {
        this.prisms = [{
                ele: $('#teal-stick'),
                initialPosition: $('#teal-stick').css('top'),
                move: 125
            },
            {
                ele: $('#black-stick'),
                initialPosition: $('#black-stick').css('top'),
                move: -280
            },
            {
                ele: $('#red-stick'),
                initialPosition: $('#red-stick').css('top'),
                move: -200
            }
        ]
    }

    _getContentHeight() {
        return parseInt($('.page-content').height(), 10);
    };

    onScroll(offset) {
        const scrollPercentage = offset / this._getContentHeight();

        for (let prism of this.prisms) {
            prism.ele.css('top', `calc(${prism.initialPosition} + ${scrollPercentage * prism.move}px)`)
        }
    }
}
