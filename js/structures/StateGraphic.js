class StateGraphic extends Graphic {
    constructor (state, ...args) {
        super(...args);

        // Properties
        this.state = state;

        // enable the bunny to be interactive... 
        // this will allow it to respond to mouse and touch events
        this.interactive = true;

        // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
        this.buttonMode = true;

        // if dragging
        this.dragging = false;

        // Events
        this.on('pointerdown', this._onDragStart);
        this.on('pointerup', this._onDragEnd);
        this.on('pointerupoutside', this._onDragEnd);
        this.on('pointermove', this._onDragMove);

        // Start pos
        this.x = window.innerWidth / 4;
        this.y = window.innerHeight / 4;
        
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

        // Set the pivot point to the new position
        this.pivot.set(position.x, position.y)

        this.alpha = 0.7;
        this.dragging = true;
    }

    _onDragEnd () {
        this.alpha = 1;
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
        
        // this.update({});
    }

    _onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);
    
            // Update position
            this.x = newPosition.x;
            this.y = newPosition.y;
        }
    }

    update (
        {
            borderColor = 0x535453,
            acceptColor = 0xa1ffac,
            baseColor = 0xe5e5e5,
            textColor = 0x000000,
            fontSize = 37,
            borderWidth = 5,
            innerSize = 55,
            outerSize = 70
        }
    ) {
        // Clear previous pixels
        super.destroy();

        // ID
        let idText = new PIXI.Text(
            this.state.id,
            {
                fontSize, 
                fontFamily: 'BoldFont', 
                fill: textColor, 
                align: 'center'
            }
        );

        // Center text manually
        idText.x = this.x - idText.width/2;
        idText.y = this.y - idText.height/2;

        // Add text to graphic as a child
        this.addChild(idText)

        // Border
        this.lineStyle(0);
        this.beginFill(borderColor, 1);
        this.drawCircle(this.x, this.y, outerSize + borderWidth);
        this.endFill(); 

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

    highlight (color=0xf24949) {
        this.update(
            {
                baseColor:color
            }
        );
    }
}