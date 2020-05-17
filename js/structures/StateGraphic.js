class StateGraphic extends Graphic {
    constructor (
        id,
        accepting, 
        pos = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        }, 
        ...args
    ) {
        super(...args);

        // Properties
        this.id = id;
        this.accepting = accepting;
        this.highlighted = false;
        this.marked = false;

        // Events
        this.on('pointerdown', this._onDragStart);
        this.on('pointerup', this._onDragEnd);
        this.on('pointerupoutside', this._onDragEnd);
        this.on('pointermove', this._onDragMove);

        // Start pos
        this.x = pos.x;
        this.y = pos.y;
        
        // Draw base
        super.reset();
    }

    _onDragStart(event) {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
            
        //store this variable for convenience           
        let position = this.data.getLocalPosition(this);
        
        this.alpha = 0.7;
        this.dragging = true;
    }

    _onDragEnd () {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }

    _onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
    
            // Update position
            this.x = newPosition.x;
            this.y = newPosition.y;

            this.update({});
        }
    }

    update (
        {
            borderColor = SETTINGS.canvas.stateOuterColor || 0x535453,
            acceptColor = SETTINGS.canvas.stateAcceptColor || 0xa1ffac,
            baseColor = SETTINGS.canvas.stateInnerColor || 0xe5e5e5,
            textColor = SETTINGS.canvas.textColor || 0x000000,
            fontSize = 37,
            borderWidth = 5,
            innerSize = 55,
            outerSize = 70
        }
    ) {
        // Clear previous pixels
        super.destroy();

        // update attached
        super.updateAttached();

        // Marked color
        if (this.marked) {
            borderColor = 0x640082;
        }

        if (this.highlighted) {
            baseColor = 0xf24949;
        }

        // ID
        let idText = new PIXI.Text(
            this.id,
            {
                fontSize, 
                fontFamily: 'BoldFont', 
                fill: textColor, 
                align: 'center'
            }
        );

        // Add text to graphic as a child
        this.addChild(idText)

        // Center text manually
        idText.x = 0 - fontSize/3;
        idText.y = 0 - fontSize/1.9;

        // Border
        this.lineStyle(0);
        this.beginFill(borderColor, 1);
        this.drawCircle(0, 0, outerSize + borderWidth);
        this.endFill(); 

        // Accepting 
        if (this.accepting) {
            this.lineStyle(0);
            this.beginFill(acceptColor, 1);
            this.drawCircle(0, 0, outerSize);
            this.endFill(); 
        }

        // Base
        this.lineStyle(0);
        this.beginFill(baseColor, 1);
        this.drawCircle(0, 0, innerSize);
        this.endFill();
    }

    highlight (bool=true) {
        this.highlighted = Boolean(bool);
        this.update({});
    }

    mark (bool=true) {
        this.marked = Boolean(bool);
        this.update({});
    }

    reset () {
        this.highlight(false);
        this.mark(false);
        super.reset();
    }
}