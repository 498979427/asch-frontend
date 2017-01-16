angular.module('asch').controller('addaclCtrl', function ($scope, $rootScope, apiService, ipCookie, $location, $window, NgTableParams, userService,postSerivice, $translate) {
    $rootScope.userlogin = true;
    $scope.comfirmDialog = false;
    $scope.sub = function () {
        var currency = $rootScope.addACL.name;;
        var flagType = 1;
        var flag = $rootScope.addACL.acl;
        var operator = '+'; // '+'表示增加， ‘-’表示删除
        console.log($scope.addList)
        var list = $scope.addList.split('\n') || [];
        console.log(list)
        $scope.addacltrs = AschJS.uia.createAcl(currency, operator, flag, list, userService.secret, $scope.secondPassword);
        $scope.comfirmDialog = true;
        $rootScope.isBodyMask = true;

    };
    //关闭确认
    $scope.comfirmDialogClose = function () {
        $rootScope.isBodyMask = false;
        $scope.comfirmDialog = false;
    };
    $scope.comfirmSub = function () {
        var trs = $scope.addacltrs;
        postSerivice.post(trs).success(function (res) {
            if (res.success == true) {
                toast($translate.instant('INF_REGISTER_SUCCESS'));
                $scope.comfirmDialogClose();
            } else {
                toastError(res.error)
            };
        }).error(function (res) {
            toastError($translate.instant('ERR_SERVER_ERROR'));
        });
    }

});