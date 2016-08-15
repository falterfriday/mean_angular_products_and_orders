var appModule = angular.module('app', []);

//-----------Product-Factory--------------------------------------------
appModule.factory('productFactory', ['$http', function($http) {
	var factory = {};
	var products = [];
	factory.index = function(callback){
		callback(products);
	};
	factory.create = function(product, callback) {
		if(product.price && Number(parseFloat(product.price))==product.price) {
		products.push(product);
		console.log(products);
		callback(products);
		}
	};
	factory.delete = function(id, callback) {
		products.splice(id,1);
		callback(products);
	};
	factory.buy = function(id, callback){
		if (products[id].qty === 0){
			callback(products);
		}
		else {
			products[id].qty--;
			callback(products);
		}
	};
	return factory;
}]);

//-----------Product-Controller----------------------------------------------
appModule.controller('productController', ['$scope', 'productFactory', function($scope, productFactory) {
	function setProducts(data){
		$scope.products = data;
		$scope.product = {qty:50};
	}

	$scope.products = {};
	$scope.product = {};

	$scope.index = function(){
		productFactory.index(setProducts);
	};

	$scope.index();

	$scope.create = function(){
		productFactory.create($scope.product, setProducts);
	};
	$scope.delete = function(id){
		console.log(id);
		productFactory.delete(id, setProducts);
	};
}]);
//-----------Order-Controller----------------------------------------------

appModule.controller('orderController', ['$scope', 'productFactory', function($scope, productFactory) {
	function setProducts(data){
		$scope.products = data;
	}

	$scope.products = {};

	$scope.index = function(){
		productFactory.index(setProducts);
	};

	$scope.index();

	$scope.buy = function(id){
		console.log(id);
		productFactory.buy(id, setProducts);
	};
}]);
