//Class level Decorator
//this Lockclass function compiled once and run once not based an object created for the class
function LockClass(func:Function){
    console.log(func.prototype);
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
