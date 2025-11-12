function ellipseTool()
{
    this.name="ellipseTool";
    this.icon="assets/ellipse.jpg";

    this.startX = -1;
    this.startY = -1;

    this.finishX = -1;
    this.finishY = -1;

    this.isDrawing = false; 
    this.draw = function()
    {
        if(mouseIsPressed && !this.isDrawing )

        {
            this.startX = mouseX;
            this.startY = mouseY;
            this.isDrawing = true;
        }

        if (!mouseIsPressed && this.isDrawing) 
        {
            this.finishX = mouseX;
            this.finishY = mouseY;
            this.isDrawing = false; 
        
            let w = this.finishX - this.startX;
            let h = this.finishY - this.startY;

            ellipse(this.startX + w/2, this.startY + h/2, abs(w), abs(h));

            
        }

        
    };


}