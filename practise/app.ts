@printDecoratorData
class Manager{
    task:string="Simple task"
    project:string="simple project"

    constructor(){
        console.log("initializing the mananger class")
    }
}

function printDecoratorData(value:Function,context:ClassDecoratorContext){
    console.log('value');
    console.log(value);
    console.log('context');
    console.log(context);
}

//Decorators
// - mechanism for adding metadata information to our source code 
// - used to add something to existing logic - popular choices for libraries - use more than create 
// Unit typescript5 - stage 3 JS decorators

// Class Decorators
// Class decorators are special functions that can modify or enhance the behavior of a class. 
// They act as wrappers around a class, allowing you to inject additional functionality without 
// altering the original class code. 
// This is particularly useful for adding common functionalities across multiple classes, such as logging, 
// validation, or data serialization, in a consistent and declarative manner