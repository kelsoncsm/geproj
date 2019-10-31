<?php 
	// Incluindo classe "Tela" para carregar as opções da tela Documentos
	include('GeProj/Tela.php');

	// Levantando dados do usuário a partir do cookie
	$user = json_decode($_COOKIE['user']);

	// Incluindo constantes
	include_once('constantes.php');
	include_once('db.php');

	// Carregando dbkey
	include_once(CLIENT_DATA_PATH.$user->empresa.'/dbkey.php');

	// Criando conexão com base de dados
	$db = new DB($dbkey);
	unset($dbkey);

	$tela = Tela::CreateById(1,$user->id, $db);
	$permissoes = $tela->getOpcoes();

 ?>
    <div class="bloco_conteudo bloco_central_80" md-whiteframe="1dp">
        <md-tabs md-dynamic-height md-border-bottom>
            <md-tab label="Dados">
                <md-content id="addprojeto_dados_container" class="md-padding">
                    <form name="form" ng-submit="salvarCliente()">
                        <div layout="column">
                            <!-- <h1>Dados de {{ cliente.id==0 ? 'Novo Cliente' : cliente.nome}}</h1> -->

                            <div class="md-padding" layout="column">
                                ​
                                <picture>
                                    <source srcset="..." type={{cliente.enderecoimagem}}>
                                    <img src={{cliente.enderecoimagem}} class="img-fluid img-thumbnail" alt="..." width="99px" align="right">
                                </picture>
                                <div layout="row">
                                    <md-input-container flex="45">
                                        <label>Nome</label>
                                        <input type="text" ng-model="cliente.nome" required>
                                    </md-input-container>
                                    <md-input-container flex="45">
                                        <label>Nome Fantasia</label>
                                        <input type="text" ng-model="cliente.nome_fantasia" required>
                                    </md-input-container>
                                </div>

                                <div layout="row">
                                    <md-input-container flex="45">
                                        <label>Tipo</label>
                                        <md-select ng-model="cliente.tipo" ng-change="onTipoChange()">
                                            <md-option ng-value="1">Pessoa Jurídica</md-option>
                                            <md-option ng-value="2">Pessoa Física</md-option>
                                        </md-select>
                                    </md-input-container>
                                    <md-input-container flex="45" ng-if="cliente.tipo=='1'">
                                        <label>CNPJ</label>
                                        <input type="text" placeholder="" ng-model="cliente.cnpj" ui-mask="99.999.999/9999-99" ui-mask-placeholder-char="#" ng-required="cliente.tipo=='1'" model-view-value="true">
                                    </md-input-container>
                                    <md-input-container flex="45" ng-if="cliente.tipo=='2'">
                                        <label>CPF</label>
                                        <input type="text" placeholder="" ng-model="cliente.cpf" ui-mask="999.999.999-99" ui-mask-placeholder-char="#" ng-required="cliente.tipo=='2'" model-view-value="true">
                                    </md-input-container>
                                </div>

                                <div layout="row">
                                    <md-input-container flex="30">
                                        <label>Nome do Contato</label>
                                        <input type="text" ng-model="cliente.contato_nome" required>
                                    </md-input-container>
                                    <md-input-container flex="30">
                                        <label>E-mail do Contato</label>
                                        <input type="email" ng-model="cliente.contato_email" required>
                                    </md-input-container>
                                    <md-input-container flex="30">
                                        <label>Telefone do Contato</label>
                                        <input type="text" ng-model="cliente.contato_telefone" required>
                                    </md-input-container>
                                </div>

                                <div layout="row">
                                    <md-input-container flex="30">
                                        <label>Login</label>
                                        <input type="text" ng-model="cliente.login">
                                    </md-input-container>
                                    <md-input-container flex="30">
                                        <label>Senha</label>
                                        <input type="password" ng-model="cliente.senha1">
                                    </md-input-container>
                                    <md-input-container flex="30">
                                        <label>Confirmação de Senha</label>
                                        <input type="password" ng-model="cliente.senha2">
                                    </md-input-container>
                                </div>

                                <div layout="row">
                                    <md-input-container flex="100">
                                        <label>Endereço</label>
                                        <input type="text" ng-model="cliente.endereco" md-maxlength="256" maxlength="256">
                                    </md-input-container>
                                </div>

                                <div layout="row">
                                    <md-input-container flex="30">
                                        <label>Endereço FTP</label>
                                        <input type="text" ng-model="cliente.ftp_host">
                                    </md-input-container>
                                    <md-input-container flex="30">
                                        <label>Usuário do FTP</label>
                                        <input type="text" ng-model="cliente.ftp_usuario">
                                    </md-input-container>
                                    <md-input-container flex="30">
                                        <label>Senha do FTP</label>
                                        <input type="password" ng-model="cliente.ftp_senha">
                                    </md-input-container>
                                </div>

                                <div layout="row">
                                    <md-button class="md-raised md-accent" ng-click="cancel()" aria-label="Cancelar">Cancelar</md-button>
                                    <md-button class="md-raised md-primary" ng-click="salvarCliente()" aria-label="Salvar" ng-disabled="form.$pristine || form.$invalid || cliente.senha1!=cliente.senha2">{{cliente.senha1!=cliente.senha2?'Senhas não confirmada':'Salvar'}}</md-button>
                                </div>
                            </div>
                        </div>
                        <button type="submit" style="display: none"></button>
                    </form>

                </md-content>
            </md-tab>
            <md-tab label="Imagem">
                <md-content id="addprojeto_dados_container" class="md-padding">
				<form id="form_files" name="form_files" >
						<div layout="row" layout-align="space-between center">
							<md-button
								class="md-raised md-primary"
								ngf-multiple="true"
								ngf-select
								ngf-max-size="<?php echo(ini_get('upload_max_filesize').'B'); ?>"
								ngf-model-invalid="errorFiles"
							ng-model="cliFiles"
							ng-disabled="cliFiles.length>0"
							aria-label="Selecione">Selecione (Máximo <?php echo(ini_get('upload_max_filesize').'B)'); ?></md-button>
					
					</div>
					<div ng-if="errorFiles.length" class="alertaDeTamanho">
						Foram selecionados arquivos com tamanho superior a {{errorFiles[0].$errorParam}}.<br>
						Estes arquivos não serão enviados.
					</div>
					<table ng-if="cliFiles.length>0">
						<thead>
							<tr>
								<td>Nome do Documento</td>
								<td>Arquivo</td>
								<td></td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							<tr ng-repeat="file in cliFiles" id="tr_{{file.name}}">
								<td><input type="text" name="daoName_{{$index}}" ng-model="daoNames[$index]" required></td>
								<td>{{file.name}}</td>
								<td>{{errosNoUploadDeDaos[file.name]}}</td>
								<td>
									<md-button class="md-raised md-accent" aria-label="Remover" ng-click="removerDaoFile($index)">Remover</md-button>
								</td>
							</tr>
						</tbody>
					</table>
					
					<div layout="row" layout-align="end center">
						<md-progress-circular ng-if="mostrarProgressoUploadDaos" md-mode="determinate" value="{{progress}}" md-diameter="20"></md-progress-circular>
						<md-button class="md-raised md-primary" ng-click="uploadcliFiles(cliFiles)" ng-if="cliFiles.length>0"  ng-disabled="cliFiles.length==0 || !form_daos.$valid" aria-label="Salvar Documentos de Abertura de Operações">Salvar Documentos de Abertura de Operações</md-button>
					</div>
				</form>
                </md-content>
            </md-tab>
        </md-tabs>

    </div>