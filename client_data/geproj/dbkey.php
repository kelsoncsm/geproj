<?php
	include_once('GeProj/GeProj.php');
	$dbkey = new stdClass();

	if(GeProj::server() == GeProj::SERVER_LOCAL){
		$dbkey->DB_HOST = 'localhost';
		$dbkey->DB_USER = "root";
		$dbkey->DB_PASS = "vaiplaneta";
		$dbkey->DB_BASE = "geproj002";
		$dbkey->DB_PORT = null;
		$dbkey->DB_SOCKET = null;
		$dbkey->ID_EMPRESA = 1;
	  } else {
	  	$dbkey->DB_HOST = 'geproj001.mysql.dbaas.com.br';
	  	$dbkey->DB_USER = 'geproj001';
	  	$dbkey->DB_PASS = 'FrYEng2019';
	  	$dbkey->DB_BASE = 'geproj001';
	  	$dbkey->DB_PORT = null;
	  	$dbkey->DB_SOCKET = null;
	  	$dbkey->ID_EMPRESA = 1;
	  }