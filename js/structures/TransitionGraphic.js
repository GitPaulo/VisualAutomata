class TransitionGraphic extends Graphic {
    constructor (
        sourceGraphic,
        targetGraphic,
        transitionSymbol, 
        ...args
    ) {
        super(...args);

        // Properties
        this.sourceGraphic = sourceGraphic;
        this.targetGraphic = targetGraphic;
        this.transitionSymbol = transitionSymbol;

        // Attach
        sourceGraphic.attach(this);
        targetGraphic.attach(this);

        // if dragging
        this.dragging = false;

        // control point for dragging
        this.controlPoint = null;

        // Events
        this.on('pointerdown', this._onDragStart);
        this.on('pointerup', this._onDragEnd);
        this.on('pointerupoutside', this._onDragEnd);
        this.on('pointermove', this._onDragMove);
        
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

        this.alpha = 0.3;
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
            
            // Update control point
            this.controlPoint = {
                x: newPosition.x - this.x, 
                y: newPosition.y - this.y 
            };

            // Update
            this.update({});
        }
    }

    update (
        {
            fontSize=45,
            textColor=0xdc8fff,
            baseColor=0xffffff,
            arrowColor=0xdc8fff
        }
    ) {         
        // Clear previous pixels
        super.destroy();

        // Update (global) graphic position
        this.x = this.sourceGraphic.x;
        this.y = this.sourceGraphic.y;

        // Start Point
        let startPoint = {
            x: 0,
            y: 0,
        };

        // End Point (GLOBAL -> local)
        let targetPoint = this.toLocal(this.targetGraphic.position);

        // Mid Point
        let midPoint = {
            x: targetPoint.x / 2,
            y: targetPoint.y / 2
        };

        // Distance
        let distance = Math.sqrt(Math.pow((startPoint.x-targetPoint.x), 2) + Math.pow((startPoint.y-targetPoint.y), 2));
        
        // Control Point
        let controlPoint = this.controlPoint;

        if (!controlPoint) {
            controlPoint = midPoint;
        }

        // Normal
        let normal = {
            x: -(targetPoint.y - controlPoint.y),
            y: targetPoint.x - targetPoint.y,
        };

        let l = Math.sqrt(normal.x ** 2 + normal.y ** 2);
        
        normal.x /= l;
        normal.y /= l;

        // Tangent
        let tangent = {
          x: -normal.y * 10,
          y: normal.x * 10
        };
    
        normal.x *= 10;
        normal.y *= 10;

        // === Draw Text
        let idText = new PIXI.Text(
            "'" + this.transitionSymbol + "'",
            {
                fontSize, 
                fontFamily: 'Arial', 
                fill: textColor, 
                align: 'center'
            }
        );

        // Set text graphic pos
        idText.x = controlPoint.x - fontSize/2;
        idText.y = controlPoint.y + fontSize/2;

        // Add text to graphic as a child
        this.addChild(idText)

        // === Draw Graphic
        this.lineStyle(20, baseColor, 1);
        this.bezierCurveTo(controlPoint.x, controlPoint.y, controlPoint.x, controlPoint.y, targetPoint.x, targetPoint.y);
        this.lineStyle(4, arrowColor, 2, .5);
        this.moveTo(controlPoint.x + normal.x + tangent.x, controlPoint.y + normal.y + tangent.y);
        this.lineTo(controlPoint.x, controlPoint.y);
        this.lineTo(controlPoint.x - normal.x + tangent.x, controlPoint.y - normal.y + tangent.y);
    }

    highlight (color=0xf24949) {
        this.update(
            {
                baseColor:color
            }
        );
    }
}