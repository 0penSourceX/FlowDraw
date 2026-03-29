 
export class Path {
    constructor(){
         this.array = []
         this.undo = []
         this.rendo = []
       
    }
 
    HandelPushPaths(ObjectOfPath){
        this.array.push(ObjectOfPath)
          console.log(this.array)
    }

    handelTrash(v)
    {
        this.undo.push(v)
      
    }
 handelrendo(){
   
    const getitem = this.undo.pop()
    return getitem 
 }


}