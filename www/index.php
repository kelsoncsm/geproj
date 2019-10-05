<?php
	include('GeProj/GeProj.php');
	if(GeProj::server() == GeProj::SERVER_LOCAL){
		header("Location: /geproj/www/webapp/login.php");
	} else {
		header("Location: http://www.geproj.com.br/geproj/www/webapp/login.php");
	}
 ?>