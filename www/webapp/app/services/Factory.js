WebGeProj.factory('GeProjFactory',
	[
		'$http','$cookies',
		function($http,$cookies){
			var GeProjFactory = {};

			// Função auxiliar que retorna headers baseada no cooke user = = = = = = = = = = = = = = = = = = = = = = = = =
			var buildHeaders = function(){
				return {headers: {'Authorization': $cookies.getObject('user').empresa + '-' + $cookies.getObject('user').token}};
			}

			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para mudar login e senha
			GeProjFactory.mudaLoginSenha = function(novoLogin,novaSenha){
				return $http.post(API_ROOT+'/mudaLoginSenha',{'novoLogin':novoLogin,'novaSenha':novaSenha},buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.refreshToken = function(){
				return $http.get(API_ROOT+'/refresh',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.loadUsuarios = function(){
				return $http.get(API_ROOT+'/usuarios',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GeProjFactory.atualizarUsuario = function(usuario){
				return $http.put(API_ROOT+'/usuarios/'+usuario.id,usuario,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar novo usuario enviado
			GeProjFactory.adicionarUsuario = function(usuario){
				return $http.post(API_ROOT+'/usuarios',usuario,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getTelasDeUsuario = function(id_usuario){
				return $http.get(API_ROOT+'/usuarios/'+id_usuario+'/telas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.salvarTelasDeUsuario = function(id_usuario,telas){
				return $http.put(API_ROOT+'/usuarios/'+id_usuario+'/telas',telas,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getDisciplinas = function(){
				return $http.get(API_ROOT+'/disciplinas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getDisciplina = function(id_disciplina){
				return $http.get(API_ROOT+'/disciplinas/'+id_disciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para atualizar o usuario enviado
			GeProjFactory.atualizarDisciplina = function(disciplina){
				return $http.put(API_ROOT+'/disciplinas/'+disciplina.id,disciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// Faz requisição para adicionar nova disciplina
			GeProjFactory.adicionarDisciplina = function(disciplina){
				return $http.post(API_ROOT+'/disciplinas',disciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.atualizarSubdisciplina = function(subdisciplina){
				return $http.put(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,subdisciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.adicionarSubdisciplina = function(subdisciplina){
				return $http.post(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/',subdisciplina,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.removerSubdisciplina = function(subdisciplina){
				return $http.delete(API_ROOT+'/disciplinas/'+subdisciplina.id_disciplina+'/subs/'+subdisciplina.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.salvarEspecialistas = function(id_disciplina,ids_especialistas){
				return $http.put(API_ROOT+'/disciplinas/'+id_disciplina+'/especialistas/',ids_especialistas,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.adicionarValidador = function(id_disciplina,id_usuario,tipo){
				return $http.post(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/',{"idu":id_usuario,"tipo":tipo},buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.removerValidador = function(id_disciplina,id_usuario){
				return $http.delete(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/'+id_usuario,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.salvarValidadores = function(id_disciplina,ids_validadores){
				return $http.put(API_ROOT+'/disciplinas/'+id_disciplina+'/validadores/',ids_validadores,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getProjetos = function(id_cliente){
				if(id_cliente == undefined){
					return $http.get(API_ROOT+'/projetos',buildHeaders());
				} else {
					return $http.get(API_ROOT+'/projetos?id_cliente='+id_cliente,buildHeaders());
				}
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getProjetosDetalhados = function(listarInativos){
				var i = (listarInativos === true)?1:0;
				return $http.get(API_ROOT+'/projetos/detalhados?i='+i,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getProjeto = function(id){
				return $http.get(API_ROOT+'/projetos/'+id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.atualizarProjeto = function(projeto){
				return $http.put(API_ROOT+'/projetos/'+projeto.id,projeto,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.adicionarProjeto = function(projeto){
				return $http.post(API_ROOT+'/projetos',projeto,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.adicionarArea = function(area){
				return $http.post(API_ROOT+'/projetos/'+area.id_projeto+'/areas/',area,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.atualizarArea = function(area){
				return $http.put(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,area,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.removerArea = function(area){
				return $http.delete(API_ROOT+'/projetos/'+area.id_projeto+'/areas/'+area.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getAreas = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/areas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.adicionarSubarea = function(subarea){
				return $http.post(API_ROOT+'/subareas/',subarea,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.atualizarSubarea = function(subarea){
				return $http.put(API_ROOT+'/subareas/'+subarea.id,subarea,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.removerSubarea = function(subarea){
				return $http.delete(API_ROOT+'/subareas/'+subarea.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getSubareas = function(id_projeto,id_area){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/areas/'+id_area+'/subareas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.salvarDAOs = function(){
				// implementada em ProjetoDAOsControlller
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.removerDAO = function(dao){
				return $http.delete(API_ROOT+'/projetos/'+dao.id_projeto+'/daos/'+dao.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.alterarDocumento = function(documento){
				return $http.put(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/'+documento.id,documento,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.adicionarDocumento = function(documento){
				return $http.post(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/',documento,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.removerDocumento = function(documento){
				return $http.delete(API_ROOT+'/projetos/'+documento.id_projeto+'/documentos/'+documento.id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getClientes = function(){
				return $http.get(API_ROOT+'/clientes',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getCliente = function(id){
				return $http.get(API_ROOT+'/clientes/'+id,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.atualizarCliente = function(cliente){
				return $http.put(API_ROOT+'/clientes/'+cliente.id,cliente,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.adicionarCliente = function(cliente){
				return $http.post(API_ROOT+'/clientes',cliente,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.removerImg = function(cliente){
				return $http.delete(API_ROOT+'/clientes/img/'+cliente.id_cliente);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getDocumentosParaValidar = function(){
				return $http.get(API_ROOT+'/documentos/paraValidar',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getDocumentosDoProjeto = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/documentos/',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getGrdsDoProjeto = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/grds/',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getDocumentos = function(id_projeto){
				return $http.get(API_ROOT+'/documentos',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getDocumento = function(id_documento){
				return $http.get(API_ROOT+'/documentos/'+id_documento,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.downloadArquivo = function(idArquivo){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT+'/arquivos/'+idArquivo);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// criando o campo para o token
				var input = document.createElement('input');
				input.setAttribute('name','token');
				input.setAttribute('value',$cookies.getObject('user').token);

				// adicionando input ao form
				form.appendChild(input);

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.validarProgresso = function(idDocumento,progresso){
				return $http.post(API_ROOT+'/documentos/'+idDocumento+'/validacaoDeProgresso', progresso,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.validarProgressos = function(progressos){
				return $http.post(API_ROOT+'/documentos/validarProgressos', progressos,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.lockDoc = function(idDoc){
				return $http.get(API_ROOT+'/documentos/'+idDoc+'/lock',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.delockDoc = function(idDoc){
				return $http.get(API_ROOT+'/documentos/'+idDoc+'/delock',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getAcoes = function(){
				return $http.get(API_ROOT+'/acoes',buildHeaders());		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getTelas = function(){
				return $http.get(API_ROOT+'/telas',buildHeaders());		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getLogs = function(q){
				var query = [];
				if(!isNaN(q.uid)){query.push(q.uid)};
				if(!isNaN(q.aid)){query.push(q.aid)};
				query.push(q.de.toJSON().substr(0,10));
				query.push(q.ate.toJSON().substr(0,10));
				return $http.get(API_ROOT+'/logs/'+query.join('/'),buildHeaders());		
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getCargos = function(){
				return $http.get(API_ROOT+'/cargos',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.atualizarCargo = function(cargo){
				return $http.put(API_ROOT+'/cargos/'+cargo.id,cargo,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.inserirCargo = function(cargo){
				return $http.post(API_ROOT+'/cargos',cargo,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.removerCargo = function(idCargo){
				return $http.delete(API_ROOT+'/cargos/'+idCargo,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getTamanhosDePapel = function(){
				return $http.get(API_ROOT+'/tamanhosDePapel',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.baixarPDA = function(id_pda){

				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT+'/pdas/'+id_pda);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

			
				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.baixarPDAParaRevisao = function(id_pda){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT+'/pdas/checkout/'+id_pda);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// Criando um input field do tipo hidden com um token
				var token = Math.round(Math.pow(10,10)*Math.random());
				var input = document.createElement("input");
				input.setAttribute('name','downloadToken');
				input.setAttribute('type','hidden');
				input.setAttribute('value',token);

				// Adicionando input no form
				form.appendChild(input);

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);

				return token;
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.bloquearDocumentoParaRevisao = function(id_doc){
				return $http.post(API_ROOT+'/documentos/'+id_doc+'/checkout',null,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.desbloquearDocumento = function(id_doc){
				return $http.post(API_ROOT+'/documentos/'+id_doc+'/checkin',null,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.baixarRevisaoAtualizada = function(id_revisao){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT+'/revisoes/'+id_revisao);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.adicionarGrd = function(grd){
				return $http.post(API_ROOT+'/grds', grd,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.atualizarGrd = function(grd){
				return $http.put(API_ROOT+'/grds/'+grd.id, grd,buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getGrd = function(id_grd){
				return $http.get(API_ROOT+'/grds/'+id_grd,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getCodigosEmi = function(){
				return $http.get(API_ROOT+'/emis',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getTiposDeDocumento = function(){
				return $http.get(API_ROOT+'/tiposDeDocumento',buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.viewGRD = function(id_grd){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT + '/grds/' + id_grd);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');
				form.setAttribute('target','_blank');

				// adicionando campo
				var input = document.createElement('input');
				input.setAttribute('name','view');
				input.setAttribute('value','pdf');


				// adicionando form a dom
				document.body.appendChild(form);
				form.appendChild(input);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.downloadGRD = function(id_grd){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT + '/grds/' + id_grd);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// adicionando campo
				var input = document.createElement('input');
				input.setAttribute('name','view');
				input.setAttribute('value','zip');


				// adicionando form a dom
				document.body.appendChild(form);
				form.appendChild(input);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.buscarGRD = function(query){
				
				// Montando a query string com base no objeto query
				var queryString = '';
				for(var i in query){

					// Verificando se é do tipo Date
					if(query[i] instanceof Date){
						
						// Propriedade é do tipo data. Transformando em string
						queryString += i+'='+(query[i].toJSON().substr(0,10))+'&';
					
					} else {

						// Propriedade não é Date. emendando na string
						queryString += i+'='+query[i]+'&';
					}
					
				}

				// removendo o derradeiro &;
				queryString = queryString.substr(0,queryString.length-1);

				// Retornando promise da requisição de busca
				return $http.get(API_ROOT+'/grds/search/q?'+queryString,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.mailGRD = function(id_grd,mail){
				return $http.post(API_ROOT+'/grds/'+id_grd+'/mail',mail,buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.mailLinkGRD = function(id_grd,mail){
				return $http.post(API_ROOT+'/grds/'+id_grd+'/link',mail,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.loadObservacoesDeGRD = function(id_grd){
				return $http.get(API_ROOT+'/grds/'+id_grd+'/obs',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.ftpGRD = function(id_grd){
				return $http.post(API_ROOT+'/grds/'+id_grd+'/ftp',null,buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.publicarGRD = function(id_grd){
				return $http.post(API_ROOT+'/grds/'+id_grd+'/publicar',null,buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.buscarDocumentos = function(query){
				// Montando a query string com base no objeto query
				var queryString = '';
				for(var i in query){
					queryString += i+'='+query[i]+'&';
				}

				// removendo o derradeiro &;
				queryString = queryString.substr(0,queryString.length-1);

				// Retornando promise da requisição de busca
				return $http.get(API_ROOT+'/documentos/search/q?'+queryString,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.updateEndFisico = function(doc){
				return $http.put(API_ROOT+'/documentos/'+doc.id+'/revisoes/'+doc.rev_id+'/enderecoFisico', doc.end_fisico,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.avancarRevisao = function(doc){
				return $http.get(API_ROOT+'/documentos/'+doc.id+'/avancarRevisao',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getHistProjetos = function(){
			 	return $http.get(API_ROOT+'/historico/projetos',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getVisaoGeral = function(){
				return $http.get(API_ROOT+'/visaogeral',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getEstatisticasDeProjeto = function(id_projeto){
				return $http.get(API_ROOT+'/projetos/'+id_projeto+'/stats',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.baixarModeloParaImportacao = function(id_projeto){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT + '/projetos/'+id_projeto+'/modeloLdpParaImportacao');
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.baixarLDP = function(idProjeto,busca){

				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT + '/projetos/' + idProjeto + '/ldp');
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');

				// Criando de busca para conter o objeto de busca
				if(busca!=undefined){
					var input = document.createElement('input');
					input.setAttribute('name','busca2');
					
					input.setAttribute('value',JSON.stringify(busca));
					form.appendChild(input);
				}

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.emitirLDP = function(idProjeto,busca){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT + '/projetos/' + idProjeto + '/ldp');
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');
				form.setAttribute('target','_blank');

				// Criando de busca para conter o objeto de busca
				if(busca!=undefined){
					var input1 = document.createElement('input');
					input1.setAttribute('name','busca');
					input1.setAttribute('value',JSON.stringify(busca));
					form.appendChild(input1);

					var input2 = document.createElement('input');
					input2.setAttribute('name','view');
					input2.setAttribute('value','html');
					form.appendChild(input2);
				}

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getConfiguracoes = function(){
				return $http.get(API_ROOT+'/configuracoes',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.putConfiguracoes = function(config){
				return $http.put(API_ROOT+'/configuracoes',config,buildHeaders());	
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getDadosFinanceirosDoProjeto = function(id){
				return $http.get(API_ROOT+'/projetos/'+id+'/dadosFinanceiros',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.salvaDadosFinanceirosDoProjeto = function(idProjeto,dadosFinanceiros){
				return $http.put(API_ROOT+'/projetos/'+idProjeto+'/dadosFinanceiros',dadosFinanceiros,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getUltimasPropostas = function(id){
				return $http.get(API_ROOT+'/propostas/ultimas',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getProposta = function(id_proposta){
				return $http.get(API_ROOT+'/propostas/'+id_proposta,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.downloadVersaoDeProposta = function(id_proposta,serial_versao){
				// Criando um formulário para enviar a requisição pelo arquivo
				var form = document.createElement("form");
				form.setAttribute('action',API_ROOT + '/propostas/' + id_proposta + '/versoes/'+serial_versao);
				form.setAttribute('method','GET');
				form.setAttribute('style','display:none');
				form.setAttribute('target','_blank');

				// adicionando form a dom
				document.body.appendChild(form);

				// submetendo o form
				form.submit();

				// removendo o form da dom
				form.parentNode.removeChild(form);
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.deleteVersao = function(id_proposta,serial_versao){
				return $http.delete(API_ROOT+'/propostas/'+id_proposta+'/versoes/'+serial_versao, buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.aprovarVersao = function(id_proposta,serial_versao){
				return $http.post(API_ROOT+'/propostas/'+id_proposta+'/versoes/'+serial_versao+'/aprovar',null, buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.reprovarVersao = function(id_proposta,serial_versao){
				return $http.post(API_ROOT+'/propostas/'+id_proposta+'/versoes/'+serial_versao+'/reprovar',null, buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.deleteProposta = function(id_proposta){
				return $http.delete(API_ROOT+'/propostas/'+id_proposta, buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.mailProposta = function(id_proposta,serial_versao,mail){
				return $http.post(API_ROOT+'/propostas/'+id_proposta+'/versoes/'+serial_versao+'/enviar',mail,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.buscarProposta = function(busca){
				// Criando string de busca "qstring"
				var parametros = []
				for (i in busca) {
					if(busca[i] instanceof Date) {
						parametros.push(i+'='+busca[i].toISOString());
					} else {
						parametros.push(i+'='+busca[i]);
					}
				}

				// Fazendo requisição de busca
				return $http.get(API_ROOT+'/propostas/q?'+parametros.join('&'),buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.alterarProposta = function(proposta){
				return $http.put(API_ROOT+'/propostas/'+proposta.id,proposta,buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			GeProjFactory.getPropostasDeCliente = function(id_cliente){
				// Fazendo requisição de busca
				return $http.get(API_ROOT+'/clientes/'+id_cliente+'/propostas?',buildHeaders());
			}
			// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
			return GeProjFactory;
		}
	]
)