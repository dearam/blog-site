// Class decorator in angular way

function Component(htmlcode:string,id:string){
    return function(sfunc:any){
        let htmlDiv=document.getElementById(id);
        let data=new sfunc();
        
        htmlcode=htmlcode.replace("{{idnum}}",data.num);
        htmlcode=htmlcode.replace("{{phn}}",data.phn);

        htmlDiv.innerHTML=htmlcode;
    }
}

@Component(`
    <h2>Hello from angular</h2>
    <h5>num : {{idnum}}</h5>
    <h6>phone no:{{phn}}</h6>
    `,"mainDiv")
class Greetings{
    num:number=123;
    phn:number=98124234;
}