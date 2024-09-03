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