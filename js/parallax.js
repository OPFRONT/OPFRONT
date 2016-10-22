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
        ];
        this._documentHeight = document.height !== undefined ? document.height : document.body.offsetHeight;
    }

    onScroll(offset) {
        // TODO fade in once they scroll past header section

        const scrollPercentage = offset / this._documentHeight;

        for(let i = 0; i < this.prisms.length; i++) {
            const prism = this.prisms[i];
            prism.ele.css('top', `calc(${prism.initialPosition} + ${scrollPercentage * prism.move}px)`);
        }
    }
}
