/**
 * Created by Administrator on 2015/8/5.
 */

/*Angular controller*/
function imgList($scope){
    $scope.imgs = new Array();
    for(var i = 0; i < 10; i++){
        $scope.imgs.push(i);
    }

    console.log($scope.imgs)
}
