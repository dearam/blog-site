// Class decorator in angular way
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Component(htmlcode, id) {
    return function (sfunc) {
        var htmlDiv = document.getElementById(id);
        var data = new sfunc();
        htmlcode = htmlcode.replace("{{idnum}}", data.num);
        htmlcode = htmlcode.replace("{{phn}}", data.phn);
        htmlDiv.innerHTML = htmlcode;
    };
}
var Greetings = /** @class */ (function () {
    function Greetings() {
        this.num = 123;
        this.phn = 98124234;
    }
    Greetings = __decorate([
        Component("\n    <h2>Hello from angular</h2>\n    <h5>num : {{idnum}}</h5>\n    <h6>phone no:{{phn}}</h6>\n    ", "mainDiv")
    ], Greetings);
    return Greetings;
}());
//# sourceMappingURL=angular.js.map