'use strict';
class People{
    constructor(name){
        this.name = name;
    }
    sayHi(){
        alert(`hi ${this.name} !`);
    }
}
export default People;