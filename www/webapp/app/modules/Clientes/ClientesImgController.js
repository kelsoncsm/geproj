(function(){
	var modClientes = angular.module('Clientes');

	var ClientesImgController = function($scope,Upload,$cookies,GeProjFactory,$mdToast,$mdDialog){

		// Arquivos de documentos de abertura de operações
		$scope.clienteFiles = [];

		// Nomes dos documentos
		$scope.clienteNames = [];

		// Exibição de mensagem de erro em operação de DAO
		$scope.erroEmOperacaoDeCliente = null;

		// Controla a exibição do prograsso do upload
		$scope.mostrarProgressoUploadCliente = false;

		// Vetor de erros no upload
		$scope.errosNoUploadDeCliente = [];
		
		// Remove o DAOFile na posição indicada
		$scope.removerClienteFile = function(pos){
			$scope.clienteFiles.splice(pos,1);
			$scope.clienteNames.splice(pos,1);
		}

		// Upload de DaoFiles
		$scope.uploadClienteFiles = function (files) {
			// Verificando se files está definido e se seu tamanho é maior que zero.
			if (files && files.length) {

				// mostrando barra de progresso de upload
				$scope.mostrarProgressoUploadCliente = true;
				
				// Criando pacote a enviar
				var packToSend = [];
				for (var i = files.length - 1; i >= 0; i--) {
					packToSend.push({file:files[i], nome:$scope.clienteNames[i]});
				};

				// Enviando pacote
				Upload.upload(
					{
	                	url: API_ROOT+'/cliente/'+$scope.cliente.id+'/img/',
	                	data: {profiles: packToSend},
	                	headers: {'Authorization':$cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}
	            	}
	            ).then(
	            	function(response){
	            		if(response.status == 200){
	            			// Upload Concluído com sucesso!
	            			var result = response.data;

	            			// Escondendo o carregando
	            			$scope.mostrarProgressoUploadCliente = false;

	            			// Tratando resposta
							if(result.error == 0){
								var tr; // variável da linha da tabela que exibe os campos dos arquivos que vão subir
								for (var i = result.sucessos.length - 1; i >= 0; i--) {
									$scope.cliente.imgs.push(result.sucessos[i]);

									// removendo da clienteFile que obtiveram sucesso.
									for (var j = $scope.clienteFiles.length - 1; j >= 0; j--) {
										if($scope.clienteFiles[j].name == result.sucessos[i].nome_arquivo){
											$scope.clienteFiles.splice(j,1);
											$scope.clienteNames.splice(j,1);
										}
									}

								};
								for (var i = result.erros.length - 1; i >= 0; i--) {
									// switch de erros de códigos conhecidos
									switch(result.erros[i].codigo){
										case 3:
											$scope.errosNoUploadDeCliente[result.erros[i].arquivo] = 'Um arquivo já foi cadastrado com este nome';
											break;

										default:
											$scope.errosNoUploadDeCliente[result.erros[i].arquivo] = result.erros[i].msg;
											break;
									}
								};

								$location.reload();
								
							} else {
								// Retornando Toast para o usuário
								$mdToast.show(
									$mdToast.simple()
									.textContent(result.msg)
									.position('bottom left')
									.hideDelay(5000)
								);

								// imprimindo mensagem no console
								console.warn(result.msg);
							}
	            		}
	            	},
	            	function(error){
	            		// Imprimindo erro no console
	            		console.warn(error);

	            		// Retornando Toast para o usuário
	            		$mdToast.show(
	            			$mdToast.simple()
	            			.textContent(error.statusText + ' ' + error.status)
	            			.position('bottom left')
	            			.hideDelay(5000)
	            		);

	            		// Esconde o carregando
	            		$scope.mostrarProgressoUploadCliente = false;
	            	},
	            	function (evt) {
						$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
					}
	            )
			}
		}

		// Abrir dialog para confirmar Remoção de DAO
		$scope.openConfirmRemoveImg = function(ev,idCliente) {
			// Appending dialog to document.body to cover sidenav in docs app
			var confirm = $mdDialog.confirm()
				.title('Tem certeza que deseja a imagem deste cliente?')
				.textContent('A ação não poderá ser desfeita.')
				.ariaLabel('Deseja remover a Imagem')
				.targetEvent(ev)
				.ok('Sim')
				.cancel('Não');

			$mdDialog.show(confirm).then(
				function() {
					// Mostra carregando
					$scope.root.carregando = true;

					// Ajeitando dao a ser removida
					var cli = $scope.cliente.imgs.find(function(a){return a.id == this},idCliente);
					cli.id = $scope.cliente.id;

					$timeout(function () {

					GeProjFactory.removerImg(cli)
					.success(function(response){
						// Esconde carregando
						$scope.root.carregando = false;

						// removendo dao do vetor local
						$scope.cliente.imgs = $scope.cliente.imgs.filter(function(a){return a.id!=this},idCliente);

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent('Documento removido com sucesso')
							.position('bottom left')
							.hideDelay(5000)
						);

						
					})
					.error(function(error){
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
							.textContent(error.msg)
							.position('bottom left')
							.hideDelay(5000)
						);

						// Imprimindo erro no console
						console.warn(error.msg);
					});

					
				}
			);
		};
	}

	modClientes.controller('ClientesImgController',ClientesImgController);
})();