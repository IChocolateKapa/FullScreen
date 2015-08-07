/**
 * Created by Administrator on 2015/8/7.
 */

/*学习给对象封装原型方法*/

/*获取数组中最大的数字*/
Array.prototype.getMax = function(){
    var arr = this;
    var maxN = arr[0];
    for(var ar in arr){
        if(arr[ar] >= maxN){
            maxN = arr[ar];
        }
    }
    return maxN;
}


var Person = function(name, sex, age){
    this.name = name;
    this.sex = sex;
    this.age = age;
};
Person.prototype.getDetail = function(){
    var outPut =  this.sex==="男"? "boy": "girl";
    return ("This is a " +  outPut + " named " + this.name + " aged " + this.age);
}



