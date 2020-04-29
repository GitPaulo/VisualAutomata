class StateGraphic extends PIXI.Graphics {
    constructor (state, ...args) {
        super(...args);

        // Properties
        this.state = state;

        // Draw base
        this.reset();
    }

    _clear () {
        this.clear(); 

        for (let child of this.children) {
            child.destroy();
        }
    }

    _draw (
        {
            acceptColor = 0xFFD9F9,
            baseColor = 0xe5e5e5,
            innerSize = 90,
            outerSize = 100
        }
    ) {
        this._clear();

        // ID
        let idText = new PIXI.Text(
            this.state.id,
            {fontFamily : 'Arial', fontSize: 54, fill : 0xea37ff, align : 'center'}
        );

        idText.x = this.x - 65;
        idText.y = this.y - 54/2;

        this.addChild(idText)

        // Accepting 
        if (this.state.accepting) {
            this.lineStyle(0);
            this.beginFill(acceptColor, 1);
            this.drawCircle(this.x, this.y, outerSize);
            this.endFill(); 
        }

        // Base
        this.lineStyle(0);
        this.beginFill(baseColor, 1);
        this.drawCircle(this.x, this.y, innerSize);
        this.endFill();
    }

    reset () {
        this._draw({});
    }

    highlight (color=0xf24949) {
        this._draw({
            baseColor:color
        });
    }
}
