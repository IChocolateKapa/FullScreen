/**
 * Created by Administrator on 2015/7/16.
 */

/*1������ȫ������
* 2�����������������ƻ�
* 3������jquery������ - $ */
(function($){

    var defaults = {
        'container' : '#container',//����
        'sections' : '.section',//������
        'easing' : 'ease',//��Ч��ʽ��ease-in,ease-out,linear
        'duration' : 1000,//ÿ�ζ���ִ�е�ʱ��
        'pagination' : true,//�Ƿ���ʾ��ҳ
        'loop' : false,//�Ƿ�ѭ��
        'keyboard' : true,//�Ƿ�֧�ּ���
        'direction' : 'vertical',//�����ķ��� horizontal,vertical,
        'onpageSwitch' : function(pagenum){}
    };


    $.fn.pageSwitdh = function(options){
        var opts = $.extend({}, defaults, options || {});
        return this.each(function(){

        });
    }
})(jQuery)


/*Ϊjquery����ԭ�ͷ��� ����*/
$.fn.foo = function(){

};
/*����$.fn === $.prototype*/
