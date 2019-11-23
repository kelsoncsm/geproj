(function () {
	// Criando o módulo
	var MedicoesModule = angular.module('Medicoes', []);

	// Criando função controller de Medicaos
	var MedicoesController = function ($scope, $location, GeProjFactory) {

		// Iniciando as variáveis
		$scope.clientes = [];
		$scope.projetosListados = [];
		var projetos = [];
		$scope.nPaginas = 0;
		$scope.q = {
			id_cliente: 0,
			id_projeto: 0,
			enviada: 2,
			pagAtual: 1
		};

		$scope.qEsq = {
			id_area: undefined,
			id_disciplina: undefined
		};

		// Carregando dados
		loadClientes();
		loadProjetos();
		loadConfig();

		// FUNÇÕES DE COMUNICAÇÃO COM O SERVIDOR = = = = = = = = = = = = = = = = = = = = = = = =
		function buscar(q) {
			$scope.root.carregando = true;
			GeProjFactory.buscarMedicao(q).success(function (response) {
				$scope.root.carregando = false;
				$scope.resultados = response.result;
				$scope.nPaginas = response.nPaginas;

				// Parsing datas
				var r;
				for (var i = $scope.resultados.length - 1; i >= 0; i--) {
					r = $scope.resultados[i];
					r.datahora_registro = new Date(r.datahora_registro);
					r.datahora_enviada = r.datahora_enviada == null ? null : new Date(r.datahora_enviada);
				}
			})
		}

		function goToMedicao(id) {
			$location.url('/medicoes/' + id);
		}

		// FUNÇÕES DE RESPOSTA A INTERFACE = = = = = = = = = = = = = = = = = = = = = = = = = = =
		$scope.onNovaClick = function () {
			$location.url('/medicoes/0');
		}

		$scope.onClienteChange = function () {
			$scope.projetosListados = projetos.filter(
				function (a) {
					return (this == 0 ? true : a.id_cliente == this);
				}, $scope.q.id_cliente
			);
		}

		$scope.onFormSubmit = function () {
			$scope.q.pagAtual = 1;
			buscar($scope.q);
		}

		$scope.onBuscarClick = function () {
			$scope.q.pagAtual = 1;
			buscar($scope.q);
		}

		$scope.onPreviousPageClick = function () {
			if ($scope.q.pagAtual > 1) {
				$scope.q.pagAtual--;
				buscar($scope.q);
			}
		}

		$scope.onNextPageClick = function () {
			if ($scope.q.pagAtual < $scope.nPaginas) {
				$scope.q.pagAtual++;
				buscar($scope.q);
			}
		}

		$scope.onFirstPageClick = function () {
			if ($scope.q.pagAtual > 1) {
				$scope.q.pagAtual = 1;
				buscar($scope.q);
			}
		}

		$scope.onLastPageClick = function () {
			if ($scope.q.pagAtual < $scope.nPaginas) {
				$scope.q.pagAtual = $scope.nPaginas;
				buscar($scope.q);
			}
		}

		$scope.onResultadoClick = function (id) {
			goToMedicao(id);
		}

		// FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
		// função que carrega clientes da base local
		function loadClientes() {
			indexedDB.open('geproj').onsuccess = function (evt) {
				evt.target.result.transaction('clientes').objectStore('clientes').getAll().onsuccess = function (evt) {
					$scope.clientes = evt.target.result;
				}
			}
		}

		// Função que carrega projetos da base local
		function loadProjetos() {
			indexedDB.open('geproj').onsuccess = function (evt) {
				evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function (evt) {
					projetos = evt.target.result;
					$scope.projetosListados = projetos;
					$scope.onClienteChange();
					$scope.$apply();
				}
			}
		}

		// Função que carrega configurações do GeProj
		function loadConfig() {
			GeProjFactory.getConfiguracoes()
				.success(function (response) {
					$scope.somenteConcluidosPodemSerAdd = response.config.SOMENTE_DOC_CONCLUIDOS_SAO_EMITIDOS.valor;
				})
				.error(function (error) {
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
							.textContent('Falha ao carregar configurações. Assumindo comportamento padrão.')
							.position('bottom left')
							.hideDelay(5000)
					);

					$scope.somenteConcluidosPodemSerAdd = true;
				});
		}



		// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
	}

	// Criando função controller de Medicaos
	// Criando função controller de Medicaos
	var MedicaoController = function ($scope, $location, GeProjFactory, $routeParams, $mdToast, $mdDialog) {

		// Lendo id da url
		var id_medicao = $routeParams.id;

		// definindo flag que indica se os codigos emi e os tipos de documento foram carregados
		var codigosEmiCarregados = false;
		var tiposDeDocumentoCarregados = false;
		var medicaoCarregada = false;

		// Carregando medicao
		$scope.medicao = null;

		// Definindo códigos emis
		$scope.codigosEmi = [];
		loadCodigosEmi();


		// definindo projetos
		$scope.projetos = [];

		// definindo documentos
		$scope.documentos = [];

		// definindo lista
		$scope.listaItem = [];

		// Carregando clientes
		$scope.clientes = [];
		GeProjFactory.getClientes()
			.success(function (response) {
				$scope.clientes = response.clientes;


				// atribuindo cliente da medicao  caso ela tenha sido carregada primeiro
				if ($scope.medicao != null) {
					$scope.medicao.cliente = $scope.clientes.find(function (a) { return a.id == this }, $scope.medicao.id_cliente);
				}
			})
			.error(function (error) {
				// Retornando Toast para usuário
				$mdToast.show(
					$mdToast.simple()
						.textContent('Falha ao tentar carregar clientes')
						.position('bottom left')
						.hideDelay(5000)
				);
			});


		$scope.openNewItemDialog = function (evt, item) {



			$mdDialog.show(
				{
					controller: itemDialogController,
					locals: {
						item: angular.copy(item),
						parentDoc: item,
						parentScope: $scope
					},
					templateUrl: './app/modules/medicoes/meditem.dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose: true
				})
				.then(function (answer) {
					$scope.status = 'You said the information was "' + answer + '".';
				}, function () {
					$scope.status = 'You cancelled the dialog.';
				});
		}

		$scope.openItemDialog = function (evt, item) {



			$mdDialog.show(
				{
					controller: itemDialogController,
					locals: {
						item: angular.copy(item),
						parentDoc: item,
						parentScope: $scope
					},
					templateUrl: './app/modules/medicoes/meditem.dialog.tmpl.html',
					parent: angular.element(document.body),
					targetEvent: evt,
					clickOutsideToClose: true
				})
				.then(function (answer) {
					$scope.status = 'You said the information was "' + answer + '".';
				}, function () {
					$scope.status = 'You cancelled the dialog.';
				});
		}

		// Função controller do diálogo para alterar endereço físico
		// Função controller do diálogo para alterar endereço físico
		function itemDialogController($scope, parentScope, parentDoc, item) {

			if (item.id_item == 0) {

				$scope.medicao = item;

				$scope.item = {
					tipo_medicao: 'H',
					id_item: 0
				};

				$scope.tipoMedicao = [
					{ id: "H", nome: "Hora/Hora" },
					{ id: "U", nome: "Unitario" }];

				$scope.cargos = [];

				GeProjFactory.getCargos().success(function (response) {
					$scope.cargos = response.cargos;
				});

				$scope.tamanhosDePapel = [];
				GeProjFactory.getTamanhosDePapel().success(function (response) {
					$scope.tamanhosDePapel = response.tamanhosDePapel;
				});
			} else {

				$scope.tipoMedicao = [
					{ id: "H", nome: "Hora/Hora" },
					{ id: "U", nome: "Unitario" }];


				if (item.tipo_medicao == 'U') {

					$scope.tamanhosDePapel = [];
					GeProjFactory.getTamanhosDePapel().success(function (response) {
						$scope.tamanhosDePapel = response.tamanhosDePapel;
					});

				} else {


					$scope.cargos = [];

					GeProjFactory.getCargos().success(function (response) {
						$scope.cargos = response.cargos;
					});


				}

				item.valor = 1*item.valor;
				
				$scope.item =angular.copy(item);

			}

			$scope.cancelar = function () {
				$mdDialog.hide();
			}


			// Função que salva medicao
			$scope.salvarItem = function (item) {

				//salvarItem

				// Mostra carregando
				// $scope.root.carregando = true;

				// Fazendo cópia de medicao
				

				if (item.id_item == 0) {


			   var medicao = angular.copy($scope.medicao);

				medicao.id_projeto = medicao.projeto.id;
				medicao.id_cliente = medicao.projeto.id_cliente;


				// removendo dados desnecessários
				delete medicao.cliente;
				delete medicao.projeto;


					item.id_empresa = 1;
					item.id_cliente = medicao.id_cliente;
					item.id_medicao = medicao.id;
					tipo = item.tipo_medicao == 'U' ? 'U' : 'H'


					GeProjFactory.adicionarItemMedicao(item, tipo)
						.success(function (response) {
							// Esconde carregando
							// $scope.root.carregando = false;

							// Atribuindo id da medicao recém criada
							$scope.medicao.id = response.newId;

							// Atribuindo-se a data de registro
							$scope.medicao.datahora_registro = new Date();

							LoadItemMedicao(medicao.id);

							// Retornando Toast para o usuário
							$mdToast.show(
								$mdToast.simple()
									.textContent('Item cadastrado com sucesso!')
									.position('bottom left')
									.hideDelay(5000)
							);

							$mdDialog.hide();

						})
						.error(function (error) {

						});

				} else {

					// item.id_empresa = medicao.id_empresa;
					// item.id_cliente = medicao.id_cliente;
					// item.id_medicao = medicao.id;
					tipo = item.tipo_medicao == 'U' ? 'U' : 'H'

					GeProjFactory.atualizaItemMedicao(item, tipo)
						.success(function (response) {

							LoadItemMedicao(item.id_medicao);

							$mdToast.show(
								$mdToast.simple()
									.textContent('Item atualizado com sucesso!')
									.position('bottom left')
									.hideDelay(5000)
							);
							$mdDialog.hide();

						})
						.error(function (error) {

						});

				}
			}

		}
		// Carregando configurações do GeProj
		var config = null;
		GeProjFactory.getConfiguracoes().
			success(function (response) {
				config = response.config;
			})
			.error(function (error) {
				// Retornando Toast para o usuário
				$mdToast.show(
					$mdToast.simple()
						.textContent('Falha ao carregar configurações: ' + error.msg)
						.position('bottom left')
						.hideDelay(5000)
				);
			});

		// Define função a ser executada quando o cliente é alterado
		$scope.onClienteChange = function () {
			// Mostra carregando
			$scope.root.carregando = true;

			// Carrega os projetos daquele cliente
			GeProjFactory.getProjetos($scope.medicao.cliente.id)
				.success(function (response) {

					// Esconde carregando
					$scope.root.carregando = false;

					// Escreve os projetos requisitados no escopo
					$scope.projetos = response.projetos;
				})
				.error(function (error) {

					// Esconde carregando
					$scope.root.carregando = false;

					// Retornando Toast para usuário
					$mdToast.show(
						$mdToast.simple()
							.textContent('Falha ao tentar carregar projetos deste cliente')
							.position('bottom left')
							.hideDelay(5000)
					);

				});

			// Anula o projeto do cliente selecionado
			$scope.medicao.projeto = null;
			$scope.medicao.alterada = true;
		}

		// Define função a ser executada quando o projeto muda
		$scope.onProjetoChange = function () {
			$scope.medicao.alterada = true;
		}

		// Função que leva para a busca de medicaos
		$scope.goToPesquisa = function () {
			$location.url('/medicoes');
		}


		// Função executada quando se clica no burão para visualizar o Medição
		$scope.onVisualizarMedicaoClick = function () {
			// GeProjFactory.viewMedição($scope.medicao.id);
		}

		// FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

		// Função que carrega códigos EMI
		function loadCodigosEmi() {
			GeProjFactory.getCodigosEmi()
				.success(function (response) {
					// Setando codigos emi no scope
					$scope.codigosEmi = response.codigosEmi;

					// Definindo código EMI padrão
					$scope.codigoEmiPadrao = $scope.codigosEmi[1];

					// Marcando como carregado
					codigosEmiCarregados = true;

					// tentando carregar medicao
					loadMedicao(id_medicao);
					LoadItemMedicao(id_medicao);
				})
				.error(function (error) {
					// Retornando Toast para o usuário
					$mdToast.show(
						$mdToast.simple()
							.textContent('Não foi possível carregar Códigos EMI.')
							.position('bottom left')
							.hideDelay(5000)
					);

					// Imprimindo erro no console
					console.warn(error);
				});
		}


		function LoadItemMedicao(id_medicao) {

			GeProjFactory.getItemUnidade(id_medicao)
				.success(function (response) {
					$scope.unidade = response.unidade;
				})
				.error(function (error) {

				});

			GeProjFactory.getItemCargo(id_medicao)
				.success(function (response) {
					$scope.cargo = response.cargo;


				})
				.error(function (error) {
				});

		}
		// Função que carrega a Medição
		function loadMedicao(id) {
			if (id == 0) {
				$scope.medicao = {
					id: 0,
					alterada: false,
					projeto_ativo: true
				};

				let id_cliente = $location.search().id_cliente;
				if (id_cliente != undefined && !isNaN(id_cliente)) {
					$scope.medicao.id_cliente = id_cliente;

					// Carregando os projetos deste cliente
					GeProjFactory.getProjetos(id_cliente)
						.success(function (response) {
							$scope.projetos = response.projetos;

							// Determinando o projeto se ele também estiver definido na url
							let id_projeto = $location.search().id_projeto;
							if (id_projeto != undefined && !isNaN(id_projeto)) {
								$scope.medicao.projeto = $scope.projetos.find(function (p) { return p.id == this }, id_projeto);
							}
						})
						.error(function (error) {

						});
				}


			} else {

				// Mostra carregando
				$scope.root.carregado = true;

				// Carregando Medição do servidor
				GeProjFactory.getMedicao(id)
					.success(function (response) {

						// Esconde carregando
						$scope.root.carregando = false;

						// Settando Medição no scope
						$scope.medicao = response.medicao;
						$scope.medicao.alterada = false;


						// parsing datas
						//$scope.medicao.datahora_enviada = (//$scope.medicao.datahora_enviada!=null) ? new Date(//$scope.medicao.datahora_enviada) : null;
						$scope.medicao.datahora_registro = new Date($scope.medicao.datahora_registro);


						// Verificando se a medicao é de um projeto ativo;
						if ($scope.medicao.projeto_ativo == 1) {

							// Projeto ativo. Carregando o projeto da base local
							indexedDB.open('geproj').onsuccess = function (evt) {
								evt.target.result.transaction('projetos').objectStore('projetos').getAll().onsuccess = function (evt) {


									// Levantando os projetos do cliente
									$scope.projetos = evt.target.result.filter(function (a) { return a.id_cliente == this }, $scope.medicao.id_cliente);

									// atribuindo projeto a medicao
									$scope.medicao.projeto = $scope.projetos.find(function (a) { return a.id == this }, $scope.medicao.id_projeto);

									// apagando propriedade id_projeto
									delete $scope.medicao.id_projeto;
									delete $scope.medicao.id_cliente;
								}
							}
						} else {
							// Projeto da Medição é inativo. As informações do projeto já estão carregadas na Medição.
							// Push o projeto da Medição no $scope.projetos
							$scope.projetos.push($scope.medicao.projeto);
						}

						// Mostrando alerta caso a Medição seja de um projeto inativo
						if ($scope.medicao.projeto_ativo == 0) {
							$mdDialog.show(
								$mdDialog.alert()
									.clickOutsideToClose(false)
									.title('Essa Medição é de um projeto inativo!')
									.textContent('Algumas informações dela não poderão ser alteradas. Ela não poderá ser enviada para o cliente.')
									.ariaLabel('Medição de projeto inativo')
									.ok('OK')
							);
						}

						// atribuindo o cliente
						$scope.medicao.cliente = $scope.clientes.find(function (a) { return a.id == this }, $scope.medicao.projeto.id_cliente);

						$scope.listaMedCargo = response.medicao.cargo;
						$scope.listaMedHH = response.medicao.hh;

					})
					.error(function (error) {
						// Esconde carregando
						$scope.root.carregando = false;

						// Retornando Toast para o usuário
						$mdToast.show(
							$mdToast.simple()
								.textContent('Falha ao tentar carregar Medição: ' + error.msg)
								.position('bottom left')
								.hideDelay(5000)
						);

						// Imprimindo erro no console
						console.warn(error);
					});
			}
		}


	}

	// FIM DE FUNÇÕES DE CARGA DE DADOS = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

	// Atribuindo função controller ao módulo
	MedicoesModule.controller('MedicoesController', MedicoesController);
	MedicoesModule.controller('MedicaoController', MedicaoController);

})()