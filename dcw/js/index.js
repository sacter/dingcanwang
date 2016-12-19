/**
 * Created by Administrator on 2016/12/2.
 */
    angular.module('md',['ng','ngRoute']).controller('mc',function($scope,$rootScope,$http,$location){
        //注册页面
        $scope.nameW="用户名4~12位,必须字母开头,不能有特殊符号、空格、中文!";
        $scope.pwdW="密码长度在6~12位,只能包含字符、数字和下划线!";
        $scope.phoneW="请使用常用手机号码!";
        $scope.nameL=function(){   //用户名验证
            $scope.reg=/^[a-zA-Z\d]\w{2,10}[a-zA-Z\d]$/i;
            if(!($scope.reg.test($('#yhm').val()))){
                $scope.nameW="用户名格式不正确";
                $('#ltr1').css({'color':'red'});
            }else{
                $scope.str=$('#yhm').val()
                $scope.keyword='yhm='+$scope.str;
                /*$http({   //angularjs异步请求的第一种种方式
                    method:'post',
                    url:'php/dcw-yan.php?'+$scope.keyword,
                })*/
                $http.post('php/dcw-yan.php?'+$scope.keyword).success(function(data){  //angularjs异步请求的第二种种方式
                        if(data==0){
                            $scope.nameW='用户已存在，请更换用户名！';
                            $('#ltr1').css({'color':'red'});
                        }else{
                            $scope.nameW='用户名可以使用！';
                            $('#ltr1').css({'color':'green'});
                        }
                    })
                }
            }


        $scope.pwdL=function(){   //验证密码
            $scope.reg=/^\w{6,12}$/i;
            if(!($scope.reg.test($('#mm').val()))){
                $scope.pwdW='密码格式不正确';
                $('#ltr2').css({'color':'red'});
            }else{
                $scope.pwdW='密码可以使用！';
                $('#ltr2').css({'color':'green'});
            }
        }

        $scope.rpwdL=function(){   //密码重复验证
            $scope.reg=/^\w{6,12}$/i;
            if ($('#mm').val()!= $('#rmm').val()) {
                $scope.rpwdW='密码不相同,请重新输入！';
                $('#ltr3').css({'color':'red'});
            }else{
                $scope.rpwdW="两次密码一致";
                $('#ltr3').css({'color':'green'});
            }
        }

        $scope.phoneL=function(){   //手机号码验证
            $scope.reg=/^1[34578]\d{9}$/;
            if($('#lxfs').val().length==0){
                $scope.phoneW='联系方式不能为空！';
                $('#ltr4').css({'color':'red'});
            }else if(!($scope.reg.test($('#lxfs').val()))){
                $scope.phoneW='手机号码有误，请重填！';
                $('#ltr4').css({'color':'red'});
            }else{
                $scope.str=$('#lxfs').val();
                $scope.keyword='lxfs='+$scope.str;
                $http.post('php/dcw-sj.php?'+$scope.keyword).success(function(data){  //angularjs异步请求的第二种种方式
                    if(data==0){
                        $scope.phoneW='手机已注册，请更换！';
                        $('#ltr4').css({'color':'red'});
                    }else{
                        $scope.phoneW='联系方式可用！';
                        $('#ltr4').css({'color':'green'});
						$('#zhc').removeAttr('disabled');
                    }
                })
            }
        }

        $scope.creat=function(){   //点击提交注册信息
            location.href='#first';
        }

        //登陆页面
        $scope.sing=function(){
            $scope.keyword='ename='+$('#uname').val()+'&epwd='+$('#upwd').val();
            $http.post('php/dcw-dl.php?'+$scope.keyword).success(function(data){  //angularjs异步请求的第二种种方式
                if(data==1){
                    $scope.uname='用户或密码不正确，请重新输入！';
                    $('#ltr').css({'color':'red'});
                }else{
                    location.href='#first';
                }
            })
        }

        //产品页面
        $scope.box1=[];
        $scope.box2=[];
        $scope.box3=[];
        $scope.box4=[];
        $scope.box5=[];
        $scope.box6=[];
        $scope.box7=[];
        $scope.box8=[];
        $scope.box=$scope.box1;
        $http.post('js/chanp.json').success(function(data){
            //console.log(data)
            $rootScope.arr=data;
            for(var i=0;i<$rootScope.arr.length;i++){
                if($rootScope.arr[i].pfl==01){
                    $scope.box1.push($rootScope.arr[i]);
                }else if($rootScope.arr[i].pfl==02){
                    $scope.box2.push($rootScope.arr[i]);
                }else if($rootScope.arr[i].pfl==03){
                    $scope.box3.push($rootScope.arr[i]);
                }else if($rootScope.arr[i].pfl==04){
                    $scope.box4.push($rootScope.arr[i]);
                }else if($rootScope.arr[i].pfl==05){
                    $scope.box5.push($rootScope.arr[i]);
                }else if($rootScope.arr[i].pfl==06){
                    $scope.box6.push($rootScope.arr[i]);
                }else if($rootScope.arr[i].pfl==07){
                    $scope.box7.push($rootScope.arr[i]);
                }else {
                    $scope.box8.push($rootScope.arr[i]);
                }
            }
        })
        $scope.tuij=function(){
            $scope.box=$scope.box1;
        }
        $scope.tejia=function(){
            $scope.box=$scope.box5;
        }
        $scope.taoc=function(){
            $scope.box=$scope.box3;
        }
        $scope.mians=function(){
            $scope.box=$scope.box2;
        }
        $scope.chaoc=function(){
            $scope.box=$scope.box6;
        }
        $scope.liangc=function(){
            $scope.box=$scope.box7;
        }
        $scope.xiaoc=function(){
            $scope.box=$scope.box8;
        }
        $scope.yinl=function(){
            $scope.box=$scope.box4;
        }
        //减少数量函数
        $scope.reduce = function(index){
            if( $scope.box[index].pnum> 1){
                $scope.box[index].pnum--;
            }else{
                $scope.box[index].pnum=0;
            }
        }
        $scope.buy=[];
        $scope.new=[];
        $scope.creat=function(obj){  //将对应的产品信息添加到购物车
            $scope.buy.unshift(obj);
            for(var i=0;i<$scope.buy.length;i++){
                if($scope.new.indexOf($scope.buy[i])<0){
                    $scope.new.unshift($scope.buy[i]);
                }
            }
        }
        //添加数量函数
        $scope.add = function(index){
            $scope.box[index].pnum++;
            $scope.creat($scope.box[index])
        }
        //所有商品总价函数
        $scope.totalQuantity = function(){
            var allprice=0;
            for(var i=0;i<$rootScope.arr.length;i++ ){
                allprice+=$rootScope.arr[i].pnum*$rootScope.arr[i].pj;
            }
            return allprice;
        }
        //购买总数量函数
        $scope.numAll = function(){
            var numAlls = 0
            for(var i = 0 ; i <$rootScope.arr.length;i++ ){
                numAlls +=Number($rootScope.arr[i].pnum);
            }
            return numAlls;
        }
        //下单信息页面
        $scope.look=function(){
            location.href="#gwc"
        }
        $scope.succ=function(){
            location.href="#gwc"
        }
    }).config(function($routeProvider){   //路由
        $routeProvider.when('/home',{
            templateUrl:'tpl/home.html'
        }).when('/creat',{
            templateUrl:'tpl/creatH.html'
        }).when('/first',{
            templateUrl:'tpl/first.html'
        }).when('/gwc',{
            templateUrl:'tpl/gouwuche.html'
        }).when('/buy',{
            templateUrl:'tpl/buy.html'
        }).otherwise({
            redirectTo:'/home'
        })
    })
