angular.module("app", [])
	.controller("cartController", ["$scope","$http", function($scope,$http) {
		//存储购物车中所有的商品信息,是一个数组
		$http.get("js/items.json").then(function(r){
			console.log(r.data);
			$scope.items = r.data;
		})
		
		
		//下面的写法不会进行脏数据检查
//		$scope.totalMoney=getTotalMoney1();
//		
//		function getTotalMoney1(){
//			var totalMoney = 0;
//			angular.forEach($scope.items, function(item) {
//				if(item.selected) {
//					totalMoney += item.price * item.nums;
//				}
//			})
//			return totalMoney;
//		}
		//为增加数量的按钮绑定事件
		$scope.addNums = function(index) {
			$scope.items[index].nums++;
			$scope.items[index].selected=true;
			/*angular.forEach($scope.items, function(item) {
				if(item.id == id) {
					item.nums++;
					item.selected=true;
				}
			})*/
		};
		//为总金额增加绑定
		$scope.getTotalMoney = function() {
			var totalMoney = 0;
			angular.forEach($scope.items, function(item) {
				if(item.selected) {
					totalMoney += item.price * item.nums;
				}
			})
			return totalMoney;
		}
		//为商品的复选框绑定事件
		$scope.selectItem = function(id) {
			angular.forEach($scope.items, function(item) {
				if(item.id == id) {
					item.selected = !item.selected;
				}
			})
		}
		//为全选设置选中状态
		$scope.isAllSelected = function() {
			var isChecked = true;
			angular.forEach($scope.items, function(item) {
				if(!item.selected) {
					isChecked = false;
					return;
				}
			});
			return isChecked;
		}
		//为全选按钮增加点击事件
		$scope.selectAll = function(s) {
			angular.forEach($scope.items, function(item) {
				item.selected = s.target.checked
			});
		}
		//为删除按钮绑定事件
		$scope.remove = function(id) {
			angular.forEach($scope.items, function(item, index) {
				if(item.id == id) {
					//按照索引删除数组中的一个元素
					$scope.items.splice(index, 1);
				}
			});
		}
	}])