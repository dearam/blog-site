// tech with nadar 
// https://i.sstatic.net/AGfN3.png 
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes 

Prototypes:
    Prototypes are the mechanism by which JavaScript objects inherit features from one another. 
    
    Javascript has Object default this Object has prototype for itselft own functionalities
        -tostring etc,
    And Object has __proto__ this is the its parent prototype

when Prototype is assigned for one object:
    when one object is created using of one constructor function's instance
    function animal(name,speak){
        this.name=name,
        this.speak=speak
    }

    const dog=new animal("dog","bark");
    //this object have prototype for its own 
    // that prototype is made for animal funct so that prototype is common for all instance of animal constructor
    // animal function have its parent __proto__ that is comming from 

Once ,
    const animal={
        name:'dog'
    }

const animal={
    name:'dog'
}
function bird(name){
    this.name=name;
}
const dove=new bird("dove");

                bird           Function      Object         
   dove        __proto__  == prototype == __proto__     animal
 __proto__ ==  prototype     __proto__    prototype ==  __proto__

//  Prototype Inheritance:
//  -----------------------



    