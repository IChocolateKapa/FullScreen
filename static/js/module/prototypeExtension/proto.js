/**
 * Created by Administrator on 2015/8/7.
 */

/*ѧϰ�������װԭ�ͷ���*/

/*��ȡ��������������*/
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
    var outPut =  this.sex==="��"? "boy": "girl";
    return ("This is a " +  outPut + " named " + this.name + " aged " + this.age);
}



