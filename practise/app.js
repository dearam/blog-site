// Type of Object creation
//method1 normal function
function hello1(name,num){
    var obj={};
    obj.firstname=name;
    obj.num=num;
    return obj;
}

console.log(hello1("dearam",1234));

//method2 constructor way obj
function hello2(name,num){
    this.name=name;
    this.num=num
}
console.log(new hello2("dearam",123));

//method 3 using new Object()
const person=new Object();
person.name="dearam";
person.num=123;
console.log(person)

//method4 ES6 
class user{
    constructor(name,num){
        this.name=name;
        this.num=num;
    }
}
console.log(new user());

//method 5 factory function
function createPerson(name, age) {
    return {
        name: name,
        age: age,
        greet() {
            console.log('Hello, ' + this.name);
        }
    };
}

//method 5 object create(to inherite)
const user={
    name:"guest",
    role:"user",
    greet() {
        console.log(`Hello, my name is ${this.name} and I am a ${this.role}`);
    }
}
const admin=Object.create(user,{
    role:{
        value:'admin'
    },
    Permissions:{
        value:['manage_users','view_reports']
    }
})
console.log(admin);

//Types of function declarations
//method1 func declaration normal
function hello(){
    console.log("hello")
}

//method2 func expression
const hello2=function(name){
    console.log(name+" hello");
}

//method3 arrow function
const hello3=(name)=>{
    console.log(name);
}

// Types of function calls

// method 1 methodcall
const person={
    name:'dearam',
    greet(){
        console.log("hello");
    }
}
person.greet();

//method2 function call
function greet(){
    console.log('hello');
}
greet();

//method3 constructor call
function greet(name){
    console.log(`hello ${name}`);
}
greet("dearam");

//method4 call 
function greet(name){
    console.log(`hello bro ${name}`)
}
const person={name:'dearam'};
greet.call(person);//outpue hello dearam

//method5 apply
// explicitly set the this context for a function call
function greet(greeting){
    console.log(greeting+" "+this.name);
}
const person={name:'ddeara'};
greet.apply(person,['hello']);//hello ddeara

//method 6 bind
function greet(greeting) {
    console.log(greeting + ', ' + this.name);
}

const person = { name: 'John' };
const greetPerson = greet.bind(person, 'Hello');
greetPerson(); // Output: Hello, John

//method 7 anonymous func
(function(){
    console.log("hello bro");
})



