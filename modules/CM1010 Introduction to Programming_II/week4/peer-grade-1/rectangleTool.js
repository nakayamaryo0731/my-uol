function rectangleTool()
{
    this.name = "rectangleTool";
    this.icon = "assets/rectangle.jpg";

    this.startX = -1;
    this.startY = -1;
    this.finishX = -1;
    this.finishY = -1;
    this.isDrawing = false;

    this.draw = function()
    {
       if(mouseIsPressed && !this.isDrawing)
        {
            this.startX = mouseX;
            this.startY = mouseY;
            this.isDrawing = true;
        } 

        if(!mouseIsPressed && this.isDrawing)
        {
            this.finishX = mouseX;
            this.finishY = mouseY;
            this.isDrawing = false;

            let w = this.finishX - this.startX;
            let h = this.finishY - this.startY;
            rect(this.startX, this.startY, abs(w), abs(h
                
            ));


        }
    };
}