//Class level Decorator
//this Lockclass function compiled once and run once not based an object created for the class
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function LockClass(func) {
    // console.log(func);//it return constructor of bankAccount class
    Object.freeze(func); //it restrict inheritance its javascript
    Object.freeze(func.prototype); //it also restrict prototype inherit also
}
var BankAccount = /** @class */ (function () {
    function BankAccount(accountNumber) {
        this.accountNumber = accountNumber;
    }
    BankAccount = __decorate([
        LockClass,
        __metadata("design:paramtypes", [Number])
    ], BankAccount);
    return BankAccount;
}());
var StudentBankAccount = /** @class */ (function (_super) {
    __extends(StudentBankAccount, _super);
    function StudentBankAccount() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StudentBankAccount;
}(BankAccount));
var acc1 = new BankAccount(101);
// --------------------------------------------------------------
//Factories Decorator
function LockClassF() {
    return function (func) {
        Object.freeze(func); //it restrict inheritance its javascript
        Object.freeze(func.prototype); //it also restrict prototype inherit also
    };
}
var BankAccount1 = /** @class */ (function () {
    function BankAccount1(accountNumber) {
        this.accountNumber = accountNumber;
    }
    BankAccount1 = __decorate([
        LockClassF() //decorator returning
        ,
        __metadata("design:paramtypes", [Number])
    ], BankAccount1);
    return BankAccount1;
}());
var StudentBankAccount1 = /** @class */ (function (_super) {
    __extends(StudentBankAccount1, _super);
    function StudentBankAccount1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StudentBankAccount1;
}(BankAccount1));
// -------------------------------------------------------------------
function Log() {
    console.log("log factory called");
    return function (cfunc) {
        console.log("log dectorator called");
    };
}
function BankStandards() {
    console.log("standard factory called");
    return function (cfunc) {
        Object.freeze(cfunc);
        Object.freeze(cfunc.prototype);
        console.log("standard decorator called");
        cfunc.prototype.createdDateTime = new Date();
    };
}
//factories called queue order FIFO
//decorators called stack order LIFO
var BankAccount2 = /** @class */ (function () {
    function BankAccount2(acc) {
        this.accountNumber = acc;
    }
    BankAccount2 = __decorate([
        BankStandards(),
        Log(),
        __metadata("design:paramtypes", [Number])
    ], BankAccount2);
    return BankAccount2;
}());
var acc2 = new BankAccount2(102);
console.log(acc2.createdDateTime); //return the time
//Property Decorator
// Property Decorator
function Trim() {
    return function (target, key) {
        // target is object of the property 
        // key is variable of the property like name 
        var value = target[key];
        var getter = function () { return value; };
        var setter = function (nextValue) {
            value = nextValue.trim();
        };
        // Corrected Object.defineProperty call
        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            enumerable: true,
            configurable: true
        });
    };
}
var BankAccount3 = /** @class */ (function () {
    function BankAccount3() {
        this.name = "  dearam  "; // Initial value with leading/trailing spaces
    }
    __decorate([
        Trim(),
        __metadata("design:type", String)
    ], BankAccount3.prototype, "name", void 0);
    return BankAccount3;
}());
// Create an instance and test
var acc3 = new BankAccount3();
console.log(acc3.name); // Outputs "dearam" after trimming
//Method Decorator
function userConfirmation() {
    return function (target, key, descriptor) {
        // target is object of that Class 
        // key is function name 
        // descriptor is complete function like {...}
        var originalMethod = descriptor.value; // Backup the original method
        // ...args is parameters of function 
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var isOk = confirm("Are you sure?");
            if (isOk) {
                // Use `this` to call the original method with the correct context
                return originalMethod.apply(this, args);
            }
            else {
                console.log("Operation canceled");
                return null;
            }
        };
    };
}
var BankAccount4 = /** @class */ (function () {
    function BankAccount4() {
        this.accountName = "Dearam";
    }
    BankAccount4.prototype.debit = function () {
        console.log("Debited successfully");
    };
    BankAccount4.prototype.credit = function () {
        console.log("Credited successfully");
    };
    __decorate([
        userConfirmation(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BankAccount4.prototype, "debit", null);
    __decorate([
        userConfirmation(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], BankAccount4.prototype, "credit", null);
    return BankAccount4;
}());
var acc4 = new BankAccount4();
acc4.debit(); // Should prompt for confirmation and then log the message if confirmed
//# sourceMappingURL=main.js.map