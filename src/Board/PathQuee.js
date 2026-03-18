 
export class Path {
    constructor(){
         this.array = []
         this.endo = []
         this.rendo = []
       
    }
    pushItems(someValue){
        this.array.push(someValue)

    }
    aff(){
      return this.array
    }
    FuncEndo(){
        const DelteLastOne =  this.array.pop()
     
       if(DelteLastOne){
        this.rendo.push(DelteLastOne)
        return this.array 
       }
      
        
    }
    FuncRendo(){
   
        
        const getOneFromTheTrash = this.rendo.pop()
        if(getOneFromTheTrash){
           this.array.push(getOneFromTheTrash) 
     
           return this.array
       
        }
   
      
    }

    Erraser(word){
        
 
         this.array = this.array.filter((item)=>item.toString()!==word.toString() )
         this.rendo.push([word])
         return this.array
        
    

    }


}