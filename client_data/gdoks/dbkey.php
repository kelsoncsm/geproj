<?php
	include_once('GDoks/GDoks.php');
	$dbkey = new stdClass();

	// if(GDoks::server() == GDoks::SERVER_LOCAL){
		$dbkey->DB_HOST = 'localhost';
		$dbkey->DB_USER = 'root';
		$dbkey->DB_PASS = 'vaiplaneta';
		$dbkey->DB_BASE = 'gdoks001';
		$dbkey->DB_PORT = null;
		$dbkey->DB_SOCKET = null;
		$dbkey->ID_EMPRESA = 1;
	// } else {
	// 	$dbkey->DB_HOST = 'gdoks002.mysql.dbaas.com.br';
	// 	$dbkey->DB_USER = 'gdoks002';
	// 	$dbkey->DB_PASS = 'k128#_gdoks';
	// 	$dbkey->DB_BASE = 'gdoks002';
	// 	$dbkey->DB_PORT = null;
	// 	$dbkey->DB_SOCKET = null;
	// 	$dbkey->ID_EMPRESA = 1;
	// }