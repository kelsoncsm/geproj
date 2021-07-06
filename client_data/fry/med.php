<?php 

	// includes
	include_once('constantes.php');
	include_once('db.php');
	require_once('vendor/autoload.php');

	

	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
	
	class med {

		private $linhas;
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
				$this->loadTituloMedicao($parametro);


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

			$sql = 'SELECT id,nometitulo,numeroproposta,nomecliente,nomeprojeto,nomearea,nomedisciplina,nomeresponsavel, datageracao
					FROM titulo WHERE id=?';

			$this->titulos = array_map(function($a){return (object)$a;}, $this->db->query($sql,'i',$id_projeto));
		}


		private function loadDocumentosDoProjeto($id_projeto){

			// Carregando documentos
			$sql = 'SELECT a.codigo,
					       a.nome,
					       a.codigo_alternativo,
					       b.nome AS subarea_nome,
					       c.nome AS area_nome,
					       d.nome AS subdisciplina_nome,
					       e.nome AS disciplina_nome,
					       R.serial AS serial
					FROM documentos a
					INNER JOIN subareas b ON a.id_subarea=b.id
					INNER JOIN areas c ON b.id_area=c.id
					INNER JOIN subdisciplinas d ON a.id_subdisciplina=d.id
					INNER JOIN disciplinas e ON d.id_disciplina=e.id
					LEFT JOIN
					  (SELECT
							a.id_documento,
						    max(a.serial) as serial
						FROM revisoes a
						INNER JOIN documentos b on a.id_documento=b.id
						INNER JOIN subareas c on b.id_subarea=c.id
						INNER JOIN areas d on c.id_area=d.id
						WHERE d.id_projeto=?
						group by a.id_documento
						order by a.id DESC) R ON R.id_documento=a.id
					WHERE c.id_projeto=? order by a.codigo';

			$this->documentos = array_map(function($a){return (object)$a;}, $this->db->query($sql,'ii',$id_projeto,$id_projeto));
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
			// $linhaInicial = 10;
			// $colunaInicial = 'A';
			// $colunaFinal = 'S';

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
			// for ($i=0; $i < sizeof($this->documentos); $i++) { 

			// 	// Fizando o valor da linha para evitar recalculo
			// 	$linha = $linhaInicial+$i;

			// 	// Escrevendo linha
			// 	$sheet->setCellValue('A'.$linha,$this->documentos[$i]->codigo);
			// 	$sheet->setCellValue('B'.$linha,$this->documentos[$i]->codigo_alternativo);
			// 	$sheet->setCellValue('C'.$linha,$this->documentos[$i]->nome);
			// 	$sheet->setCellValue('D'.$linha,$this->documentos[$i]->area_nome);
			// 	$sheet->setCellValue('E'.$linha,$this->documentos[$i]->subarea_nome);
			// 	$sheet->setCellValue('F'.$linha,$this->documentos[$i]->disciplina_nome);
			// 	$sheet->setCellValue('G'.$linha,$this->documentos[$i]->subdisciplina_nome);
			// 	$sheet->setCellValue('H'.$linha,'rev' . $this->documentos[$i]->serial);

			// 	// Alterando altura da linha
			// 	$sheet->getRowDimension($linha)->setRowHeight(20);

			// 	// Formatando linha
			// 	$sheet->getStyle('A'.$linha)->applyFromArray($styleArray);
			// 	$sheet->getStyle('B'.$linha)->applyFromArray($styleArray);
			// 	$sheet->getStyle('C'.$linha)->applyFromArray($styleArray);
			// 	$sheet->getStyle('D'.$linha)->applyFromArray($styleArray);
			// 	$sheet->getStyle('E'.$linha)->applyFromArray($styleArray);
			// 	$sheet->getStyle('F'.$linha)->applyFromArray($styleArray);
			// 	$sheet->getStyle('G'.$linha)->applyFromArray($styleArray);
			// }

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