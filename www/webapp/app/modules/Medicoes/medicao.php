<div class="container_80" id="medicao_container" layout="column">
    <div class="controle_principal" layout="row" layout-align="start center">
        <div layout="row" flex="none">
            <md-button class="md-raised md-primary" aria-label="Buscar Medição" ng-click="goToPesquisa()">
                <md-icon class="material-icons step" aria-label="Buscar Medição">search</md-icon>
                Buscar
            </md-button>
        </div>
        <div flex layout="row" layout-align="end center">
        <md-button
						class="md-raised md-fab md-mini md-primary"
						ng-click="baixarMedicao(medicao.id,$event)"
						aria-label="Baixar LDP">
							<md-icon class="material-icons step">playlist_add_check</md-icon>
							<md-tooltip md-delay="0" md-direction="bottom" md-autohide="true">
								Baixar LDP
							</md-tooltip>
					</md-button>

            <md-button ng-disabled="medicao.docs.length == 0 || medicao.docs==undefined" class="md-raised md-primary"
                aria-label="Baixar GRD em ZIP" ng-click="onVisualizarGrdClick()">
                <md-icon class="material-icons step" aria-label="Baixar em ZIP">remove_red_eye</md-icon>
                Visualizar
            </md-button>

        </div>
    </div>
    <md-tabs md-selected="0" md-dynamic-height md-border-bottom md-whiteframe="1dp">
        <md-tab label="Dados">
            <md-content class="md-padding dados">
                <form name="formDados" ng-submit="salvarmedicao(medicao)">
                    <div layout="row" layout-align="space-between start">
                        <md-input-container flex="25">
                            <label>Cliente</label>
                            <md-select ng-model="medicao.cliente" ng-change="onClienteChange()"
                                ng-disabled="medicao.projeto_ativo==0" required>
                                <md-select-label>Selecione um Cliente</md-select-label>
                                <md-option ng-value="cliente" ng-repeat="cliente in clientes|orderBy:'nome'">
                                    {{ cliente.nome }}</md-option>
                            </md-select>
                        </md-input-container>
                        <md-input-container flex="25">
                            <label>Nome do Contato</label>
                            <input type="text" disabled="disabled" ng-model="medicao.cliente.contato_nome">
                        </md-input-container>
                        <md-input-container flex="25">
                            <label>Telefone do Contato</label>
                            <input type="text" disabled="disabled" ng-model="medicao.cliente.contato_telefone">
                        </md-input-container flex="25">
                        <md-input-container>
                            <label>Email do Contato</label>
                            <input type="text" disabled="disabled" ng-model="medicao.cliente.contato_email">
                        </md-input-container>
                    </div>
                    <div layout="row" layout-align="space-between start">
                        <md-input-container flex="25">
                            <label>Projeto</label>
                            <md-select ng-model="medicao.projeto" ng-change="onProjetoChange()"
                                ng-disabled="medicao.datahora_enviada!=null || medicao.projeto_ativo==0" required>
                                <md-select-label>Selecione um Projeto do Cliente</md-select-label>
                                <md-option ng-value="projeto" ng-repeat="projeto in projetos|orderBy:'nome'">
                                    {{ projeto.nome }}</md-option>
                            </md-select>
                        </md-input-container>
                        <md-input-container flex="25">
                            <label>Código </label>
                            <input type="text" ng-model="medicao.codigo" disabled="disabled"
                                placeholder="Automático após salvamento">
                        </md-input-container>
                        <md-input-container flex="50">
                        </md-input-container>
                    </div>
                    <div layout="row" layout-align="end center" class="bottom_controls">
                    <md-button ng-click="cancelarMedicao()" class="md-raised md-primary" aria-label="Cancelar">Cancelar
                    </md-button>
                    <md-button ng-disabled="formDados.$pristine || formDados.$invalid || !medicao.alterada"
                        ng-click="salvarMedicao(medicao)" class="md-raised md-primary" aria-label="Salvar">Salvar GRD
                    </md-button>
                </div>
                    <div class="container_100" id="propostas_container" ng-if="medicao.id > 0">
                        <div class="controles" layout="row" layout-align="space-between start">
                            <md-button ng-click="openNewItemDialog($event,medicao)"
                                class="md-raised md-accent novaPropBt" aria-label="Criar novo item" >
                                <md-icon class="material-icons step">add</md-icon>
                            </md-button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <td style="width: 100px;text-align: center;">Título</td>
                                    <td style="width: 100px;text-align: center;">Quantidade</td>
                                    <td style="width: 100px;text-align: center;">Valor</td>
                                    <td style="width: 100px;text-align: center;">Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="im in item_medicao" ng-click="openItemDialog($event,im)">
                                    <td style="width: 338px;text-align: center;">{{im.descricao}}</td>
                                    <td style="width: 100px;text-align: center;">{{im.qtd}}</td>
                                    <td style="width: 100px;text-align: center;">{{im.valor | currency }}</td>
                                    <td style="width: 100px;text-align: center;">{{im.valor *  im.qtd | currency }}
                                    </td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div> 
                </form>
            </md-content>
        </md-tab>
    </md-tabs>
</div>