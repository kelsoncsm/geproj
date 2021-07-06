<?php
	include('GeProj/GeProj.php');
	if(GeProj::server() == GeProj::SERVER_LOCAL){
		header("Location: /webapp/login.php");
	} else {
		header("Location: http://www.geproj.com.br/webapp/login.php");
	}
 ?>