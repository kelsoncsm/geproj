<?php 

	// includes
	include_once('constantes.php');
	include_once('db.php');
	require_once('vendor/autoload.php');

	

	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	
	class med {

		private $item_linha;
		
		private $titulos;
		private $xlsx;
		private $db;
		private $empresa;
		
		/**
		* Construtor: Recebe id de projeto como parâmetro ou um vetor cujos
		* elementos são dados de documentos.
		*/
		public function __construct($parametro){
			// Carregando a dbkey
			include(dirname(__FILE__).'/dbkey.php');

			// Determinando o codigo da empresa
			$this->empresa = basename(dirname(__FILE__));
			
			// Criando conexão
			$this->db = new DB($dbkey);
			unset($dbkey);

			// Testando se o parâmetro é um inteiro (id de projeto)
			if(is_numeric($parametro)){
				
				// // Carregando dados do projeto
				// $this->loadDadosDoProjeto($parametro);

				// // Carregando documentos do projeto
				// $this->loadDocumentosDoProjeto($parametro);
				// $this->loadTituloMedicao($parametro);

				$parametro = 1;
				$this->loadTituloMedicao($parametro);
				$this->loadItensPorMedicao(17);


			} elseif (is_array($parametro)) {

				// Verificando o tamanho do vetor de documentos
				if(sizeof($parametro) == 0){
					throw new Exception("Lista de documentos vazia", 1);
				}

				// Verificando se o primeiro elemento do vetor parâmetro tem um campo id_projeto
				if(!property_exists($parametro[0], 'projeto_id')){
					throw new Exception("Lista de documentos inválida", 1);
				}

				// Atribuindo o vetor parâmetro a lista de documentos
				$this->documentos = $parametro;

				// Carregando dados do projeto
				$this->loadDadosDoProjeto($this->documentos[0]->projeto_id);

			}
		}

		private function loadTituloMedicao($id_projeto){


			$sql = 'SELECT
						id,nometitulo,numeroproposta,nomecliente,nomeprojeto,nomearea,nomedisciplina,nomeresponsavel, datageracao
					FROM titulo where id=?';
			$this->titulos = (object)($this->db->query($sql,'i',$id_projeto)[0]);

			// $sql = 'SELECT
			// 			a.id,
			// 			a.nome,
			// 			a.codigo,
			// 			a.data_inicio_p,
			// 			a.data_final_p,
			// 			c.nome as nome_responsavel,
			// 			c.email as email_responsavel,
			// 			b.nome as nome_cliente,
			// 			b.contato_nome,
			// 			b.contato_email,
			// 			b.contato_telefone
			// 		FROM projetos a
			// 		INNER JOIN clientes b ON (a.id_cliente=b.id
			// 		                                AND a.id=?)
			// 		INNER JOIN usuarios c ON a.id_responsavel=c.id';
			// $this->titulos = (object)($this->db->query($sql,'i',$id_projeto)[0]);

		}


		private function loadItensPorMedicao($id_medicao){

			// Carregando documentos
			$sql = 'select mi.id as cod_atividade, concat(sd.sigla," - ",sd.nome) as descricao
			,mqf.A4 as "A4"
			,mqf.A3 as "A3"
			,mqf.A2 as "A2"
			,mqf.A1 as "A1"
			,mqf.A0 as "A0"
			,null as "A41"
			,null as "A31"
			, null as "A21"
			, null as "A11"
			,null as "A01"
			,mqc.SR as "SR"
			,mqc.PL as "PL"
			,mqc.JR as "JR"
			,mqc.PRS as "PRS"
			,mqc.PRL as "PRL"
			,mqc.DE as "DE"
			from medicao_item mi
			left join medicao_item_qtd_cargo mqc on mqc.id_item = mi.id
			left join medicao_item_vlr_cargo miv on miv.id_qtd_cargo = mqc.id
			left join medicao_item_qtd_folhas mqf on mqf.id_item = mi.id
			left join medicao_item_vlr_folhas mif on mif.id_qtd_folhas = mqf.id
			inner join subdisciplinas sd on sd.id = mi.id_subdisciplina
			where mi.id_medicao =?';

			$this->item_linha = array_map(function($a){return (object)$a;}, $this->db->query($sql,'i',$id_medicao));
		}

		private function criaXlsx(){
			
			// Abrindo o documento modelo da empresa
			$modelo = dirname(__FILE__).'/med.xlsx';

			// Verificando existência de modelo
			if(!file_exists($modelo)) {
				throw new Exception("Modelo de LDP inexistente para a empresa.", 1);
			}

			// Abrindo arquivo para escrita
			$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($modelo);

			// Pegando a planilha ativa para escrever nela
			$sheet = $spreadsheet->getActiveSheet();

			// Escrevendo informações de cabeçalho
	
			 $sheet->setCellValue('B6',$this->titulos->nomecliente);
			// $sheet->setCellValue('S8',$this->titulos->datageracao);
			// $sheet->setCellValue('A6','Data Final (previsto): '.$this->titulos->data_final_p);
			// $sheet->setCellValue('A7','Responsável: '.$this->titulos->nome_responsavel.' ('.$this->titulos->email_responsavel.')');
			// $sheet->setCellValue('G5','Cliente: '.$this->titulos->nome_cliente);
			// $sheet->setCellValue('G6','Contato: '.$this->titulos->contato_nome);
			// $sheet->setCellValue('G7','Telefone: '.$this->titulos->contato_telefone);

			// Fixando limites para escrita de dados de documento
			$linhaInicial = 12;
			$colunaInicial = 'C';
			$colunaFinal = 'V';

			// Estabelecendo vetor de estilos
			$styleArray = [
			    'borders' => [
			        'top' => [
			            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
			        ],
			        'bottom' => [
			            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
			        ],
			        'left' => [
			            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
			        ],
			        'right' => [
			            'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
			        ]
			    ]
			];

			// Loop dos documentos
			 for ($i=0; $i < sizeof($this->item_linha); $i++) { 

			// 	// Fizando o valor da linha para evitar recalculo
				 $linha = $linhaInicial+$i;
				 
			// 	// Escrevendo linha
				
				$sheet->setCellValue('C'.$linha,$this->item_linha[$i]->descricao);
                $sheet->setCellValue('G'.$linha,$this->item_linha[$i]->A4);
				$sheet->setCellValue('H'.$linha,$this->item_linha[$i]->A3);
				$sheet->setCellValue('I'.$linha,$this->item_linha[$i]->A2);
				$sheet->setCellValue('J'.$linha,$this->item_linha[$i]->A1);
				$sheet->setCellValue('K'.$linha,$this->item_linha[$i]->A0);
				$sheet->setCellValue('L'.$linha,$this->item_linha[$i]->A41);
				$sheet->setCellValue('M'.$linha,$this->item_linha[$i]->A31);
				$sheet->setCellValue('N'.$linha,$this->item_linha[$i]->A21);
				$sheet->setCellValue('O'.$linha,$this->item_linha[$i]->A11);
				$sheet->setCellValue('P'.$linha,$this->item_linha[$i]->A01);
				$sheet->setCellValue('Q'.$linha,$this->item_linha[$i]->SR);
				$sheet->setCellValue('R'.$linha,$this->item_linha[$i]->PL);
				$sheet->setCellValue('S'.$linha,$this->item_linha[$i]->JR);
				$sheet->setCellValue('T'.$linha,$this->item_linha[$i]->PRS);
				$sheet->setCellValue('U'.$linha,$this->item_linha[$i]->PRL);
				$sheet->setCellValue('V'.$linha,$this->item_linha[$i]->DE);
			// 	// Alterando altura da linha
			$sheet->getRowDimension($linha)->setRowHeight(20);

			// 	// Formatando linha
			$sheet->getStyle('B'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('C'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('G'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('H'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('I'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('J'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('K'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('L'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('M'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('N'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('O'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('P'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('Q'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('R'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('S'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('T'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('U'.$linha)->applyFromArray($styleArray);
			$sheet->getStyle('V'.$linha)->applyFromArray($styleArray);

			}

			// Salvando o xlsx;
			$this->xlsx = $spreadsheet;
		}

		public function enviarXlsx(){

			// Criando
			$this->criaXlsx();

			// Mandando os headers
			header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
			header('Content-Disposition: attachment;filename="med_'.$this->titulos->id.'.xlsx"');
			header('Cache-Control: max-age=0');
			
			// Criando o Writer
			$writer = new Xlsx($this->xlsx);

			// Escrevendo o arquivo na saída php
			$writer->save('php://output');
		}
		
	}