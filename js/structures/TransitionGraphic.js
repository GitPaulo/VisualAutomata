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
        
        // this.update({});
    }

    _onDragMove() {
        if (this.dragging) {
            const newPosition = this.data.getLocalPosition(this.parent);

            this.test = this.test || {x:newPosition.x, y:newPosition.y}
            
            // Update position
            let cx = this.test.x + newPosition.x;
            let cy = this.test.y + newPosition.y;

            this.update({
               bendP1: [cx, cy],
               bendP2: [cx, cy]
            })
        }
    }

    update (
        {
            fontSize=45,
            bendP1=[0,0],
            bendP2=[0,0],
            textColor=0xdc8fff,
            baseColor=0xffffff,
            arrowColor=0xdc8fff
        }
    ) { 
        // Clear previous pixels
        super.destroy();

        // Start pos
        this.x = this.sourceGraphic.x;
        this.y = this.sourceGraphic.y;

        // End pos (GLOBAL -> local)
        let targetP = this.toLocal(this.targetGraphic.position);
        targetP = [targetP.x, targetP.y]

        // ID
        let idText = new PIXI.Text(
            "'" + this.transitionSymbol + "'",
            {
                fontSize, 
                fontFamily: 'Arial', 
                fill: textColor, 
                align: 'center'
            }
        );

        // Add text to graphic as a child
        this.addChild(idText)


        // Midpoint
        let midpoint = {
            x: bendP1[0] || targetP[0] / 2,
            y: bendP1[1] || targetP[1] / 2
        }

        // Change position with 
        idText.x = midpoint.x - fontSize/2;
        idText.y = midpoint.y + 15;

        // Some maths
        let normal = [
            -(targetP[1] - bendP2[1]),
            targetP[0] - bendP2[0],
        ];

        let l = Math.sqrt(normal[0] ** 2 + normal[1] ** 2);
        
        normal[0] /= l;
        normal[1] /= l;
    
        let tangent = [
            -normal[1] * 10,
            normal[0] * 10
        ]
    
        normal[0] *= 10;
        normal[1] *= 10;
        
        // Draw
        this.lineStyle(20, baseColor, 1)
            .bezierCurveTo(bendP1[0], bendP1[1], bendP2[0], bendP2[1], targetP[0], targetP[1])
            .lineStyle(4, arrowColor, 2, .5)
            .moveTo(midpoint.x + normal[0] + tangent[0], midpoint.y + normal[1] + tangent[1])
            .lineTo(midpoint.x, midpoint.y)
            .lineTo(midpoint.x - normal[0] + tangent[0], midpoint.y - normal[1] + tangent[1])
    }

    highlight (color=0xf24949) {
        this.update(
            {
                baseColor:color
            }
        );
    }
}