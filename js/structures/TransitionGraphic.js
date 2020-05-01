class TransitionGraphic extends Graphic {
    constructor (
        sourceState, 
        targetState, 
        transitionSymbol, 
        ...args
    ) {
        super(...args);

        // Properties
        this.sourceState = sourceState; 
        this.targetState = targetState;
        this.transitionSymbol = transitionSymbol;

        // Start pos
        this.x = window.innerWidth / 4;
        this.y = window.innerHeight / 4;
        
        // Draw base
        super.reset();
    }

    update (
        {
            cpXY1=[0,0],
            cpXY2=[0,0],
            toXY=[this.targetState.graphic.x, this.targetState.graphic.y],
            baseColor=0xffffff,
            arrowColor=0xff0000
        }
    ) { 
        // Clear previous pixels
        super.destroy();

        // Source position
        this.x = this.sourceState.graphic.x;
        this.y = this.sourceState.graphic.y;

        // Some maths
        let normal = [
            -(toXY[1] - cpXY2[1]),
            toXY[0] - cpXY2[0],
        ];

        let l = Math.sqrt(normal[0] ** 2 + normal[1] ** 2);
        
        normal[0] /= l;
        normal[1] /= l;
    
        let tangent = [
            -normal[1] * 30,
            normal[0] * 30
        ]
    
        normal[0] *= 20;
        normal[1] *= 20;
        
        // Draw
        this.lineStyle(6, baseColor, 1)
            .bezierCurveTo(cpXY1[0], cpXY1[1], cpXY2[0], cpXY2[1], toXY[0], toXY[1])
            .lineStyle(6, arrowColor, 1, .5)
            .moveTo(toXY[0] + normal[0] + tangent[0], toXY[1] + normal[1] + tangent[1])
            .lineTo(toXY[0], toXY[1])
            .lineTo(toXY[0] - normal[0] + tangent[0], toXY[1] - normal[1] + tangent[1])
    }

    highlight (color=0xf24949) {
        this.update(
            {
                baseColor:color
            }
        );
    }
}