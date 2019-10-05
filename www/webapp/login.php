<!DOCTYPE html>
<html lang="pt-br" ng-app="WebGeProj">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>GeProj</title>
		<link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet">
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="stylesheet" href="css/normalizer.css">
		<link rel="stylesheet" href="node_modules/angular-material/angular-material.min.css">
		<link rel="stylesheet" href="css/geral.css">
		<link rel="stylesheet" href="css/login.css">
	</head>
	<body ng-controller="LoginController">
		<div class="container" ng-cloak>
			<md-progress-linear md-mode="indeterminate" ng-if="carregando"></md-progress-linear>
			<form ng-submit="getToken()" class="login" layout="column" md-whiteframe="1dp">
				<img src="img/logo.png" alt="GeProj">
				<md-input-container>
					<label>Empresa</label>
					<input type="text" ng-model="loginData.empresa" id="empresa">
				</md-input-container>
				<md-input-container>
					<label>Login</label>
					<input type="text" ng-model="loginData.login" id="login"  >
				</md-input-container>
				<md-input-container>
					<label>Senha</label>
					<input type="password" ng-model="loginData.senha" id="senha" >
				</md-input-container>
				<div layout="row">
					<md-button ng-click="esqueceuSenha()" class="md-primary" aria-label="Esqueci minha senha">Esqueci minha senha</md-button>
					<md-button ng-click="getToken()" flex class="md-raised md-primary" ng-disabled="empresa=='' || login=='' || senha==''" aria-label="Entrar em empresa">Entrar</md-button>
				</div>
				<button type="submit"></button>
				<div ng-if="loginFail" class="loginFail">Login/Senha inválidos.</div>
				<div ng-if="getIddbFail" class="loginFail">Empresa Inexistente.</div>
			</form>
		</div>
	</body>
	<script src="node_modules/angular/angular.min.js"></script>
	<script src="node_modules/angular-animate/angular-animate.min.js"></script>
	<script src="node_modules/angular-aria/angular-aria.min.js"></script>
	<script src="node_modules/angular-cookies/angular-cookies.min.js"></script>
	<script src="node_modules/angular-material/angular-material.min.js"></script>
	<script src="app/services/constants.js"></script>
	<script>
		// Definindo o módulo
		var WebGeProj = angular.module('WebGeProj',['ngCookies','ngAnimate','ngMaterial']);

		// Definindo Controladores do módulo.
		WebGeProj.controller(
			'LoginController',
			function($scope,$http,$cookies,$location){
				// Limpando variáveis do scope. (anula auto complete)
				$scope.loginData = {};
				$scope.loginData.login = 'kelson';
				$scope.loginData.senha = 'kelson*123';
				$scope.loginData.empresa = 'fday';	

				// Carregando imagem de fundo (background)
				var img = new Image();
				img.onload = function(){
					document.body.style.backgroundImage = 'url(' + img.src + ')';
					document.body.style.opacity = 1;
				}
				img.src = "img/loginbg.jpg";

				// Defininfo tela inicial
				var screen = $location.search().screen?$location.search().screen:'';

				// dando foco nos campos na tora.
				// focus directive não funciona com o ng-cloak e para funcionar o posicionamento dos labels
				setTimeout(function(){
					document.getElementById("senha").focus();
					document.getElementById("login").focus();
					document.getElementById("empresa").focus();
				},100);

				// Determinando valores inciais
				$scope.loginFail = false;
				$scope.carregando = false;

				// Definindo função que tenta obter o token
				$scope.getToken = function(){


				
					
					// Iniciando animação de carregando
					$scope.carregando = true;

					// Escondendo mensagem de login falho
					$scope.loginFail = false;
					// fazendo post
					$http.post(API_ROOT+'/login',$scope.loginData,{headers:{Authorization:$scope.loginData.empresa + '-0'}})
					.then(function(response) {
						// Parando animação de carregando
						$scope.carregando = false;
						

						
						if(response.data.error === 0){

							// Guardando os dados do usuário nos cookies
							$cookies.putObject('user',response.data.user,{path:'/'});
							
							// Limpando base de dados.
							var deleteRequest = indexedDB.deleteDatabase("GeProj");
							deleteRequest.onsuccess = function(evt){
								// indo para a página principal do aplicativo
								if(screen == ''){
									window.location = "WebGeProj.php";
								} else {
									window.location = "WebGeProj.php#"+screen;
								}
								
							}
							
							deleteRequest.onerror = function(evt){
								console.log("Erro ao tentar zerar base de dados.");
								console.dir(evt);
							}
						}
					}, function(response) {
						$scope.carregando = false;
						$scope.loginFail = true;
					});
				}

				// Definindo função que vai para a tela de esqueci minha senha
				$scope.esqueceuSenha = function(){
					window.location = "/esqueci";
				}
			}
		);

		// Configurando cores
		WebGeProj.config(function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
			.primaryPalette('blue')
			.accentPalette('orange',{'default':'800'});
		});

		// Configurando location provider
		WebGeProj.config(['$locationProvider', function($locationProvider) {
  			$locationProvider.html5Mode({'enabled': true,'requireBase':false});
  		}]);

	</script>
	<script src="app/directives/directives.js"></script>
</html>