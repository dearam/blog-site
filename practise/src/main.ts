//Class level Decorator
//this Lockclass function compiled once and run once not based an object created for the class

function LockClass(func:Function){
    // console.log(func);//it return constructor of bankAccount class
    Object.freeze(func);//it restrict inheritance its javascript
    Object.freeze(func.prototype);//it also restrict prototype inherit also
}

@LockClass
class BankAccount{
  accountNumber:number;
  constructor(accountNumber:number){
    this.accountNumber=accountNumber;
  }
}

class StudentBankAccount extends BankAccount{
   
}

let acc1=new BankAccount(101);

// --------------------------------------------------------------

//Factories Decorator

function LockClassF(){//kind of factory
  return function(func:Function){//it returning one decorator
    Object.freeze(func);//it restrict inheritance its javascript
    Object.freeze(func.prototype);//it also restrict prototype inherit also
  }
  
}

@LockClassF()//decorator returning
class BankAccount1{
accountNumber:number;
constructor(accountNumber:number){
  this.accountNumber=accountNumber;
}
}

class StudentBankAccount1 extends BankAccount1{
 
}

// -------------------------------------------------------------------

function Log(){
  console.log("log factory called");
  return function(cfunc:Function){
    console.log("log dectorator called");
  }
}

function BankStandards(){
  console.log("standard factory called");
  return function(cfunc:Function){
    Object.freeze(cfunc);
    Object.freeze(cfunc.prototype);
    console.log("standard decorator called");
    cfunc.prototype.createdDateTime=new Date();
  }
}

//factories called queue order FIFO
//decorators called stack order LIFO
@BankStandards()
@Log()
class BankAccount2{
  [x: string]: any;
  accountNumber:number;
  constructor(acc:number){
    this.accountNumber=acc;
  }
}

let acc2=new BankAccount2(102);
console.log(acc2.createdDateTime);//return the time


//Property Decorator

// Property Decorator
function Trim() {
  return function(target: any, key: string) {
    // target is object of the property 
    // key is variable of the property like name 
    let value = target[key];

    const getter = () => value;
    const setter = (nextValue: string) => {
      value = nextValue.trim();
    };

    // Corrected Object.defineProperty call
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }
}

class BankAccount3 {
  @Trim()
  name: string = "  dearam  "; // Initial value with leading/trailing spaces
}

// Create an instance and test
const acc3 = new BankAccount3();
console.log(acc3.name); // Outputs "dearam" after trimming


//Method Decorator

function userConfirmation() {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    // target is object of that Class 
    // key is function name 
    // descriptor is complete function like {...}
    const originalMethod = descriptor.value; // Backup the original method

    // ...args is parameters of function 
    descriptor.value = function(...args: any[]) {
      const isOk = confirm("Are you sure?");
      if (isOk) {
        // Use `this` to call the original method with the correct context
        return originalMethod.apply(this, args);
      } else {
        console.log("Operation canceled");
        return null;
      }
    };
  };
}

class BankAccount4 {
  accountName: string = "Dearam";

  @userConfirmation()
  debit() {
    console.log("Debited successfully");
  }

  @userConfirmation()
  credit(){
    console.log("Credited successfully");
  }
}

const acc4 = new BankAccount4();
acc4.debit(); // Should prompt for confirmation and then log the message if confirmed
