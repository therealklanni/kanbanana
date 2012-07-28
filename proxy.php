<?php

header('Content-Type: application/json');

$path = $_GET['path'];
$email = $_GET['email'];
$key = $_GET['key'];

$ch = curl_init();

curl_setopt_array($ch,$opts = array(
	CURLOPT_URL => 'https://www.kanbanpad.com/api/v1/'.$path,
	CURLOPT_RETURNTRANSFER => 1,
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_SSL_VERIFYHOST => 0,
	//CURLOPT_POST => 1,
	//CURLOPT_POSTFIELDS => array(),
	CURLOPT_TIMEOUT => 60,
	//CURLOPT_FAILONERROR => 1,
	CURLOPT_FOLLOWLOCATION => 1,
	CURLOPT_HTTPAUTH => CURLAUTH_BASIC,
	CURLOPT_USERPWD => "{$email}:{$key}",
));

$resp = curl_exec($ch);

echo json_encode($resp ?
	json_decode($resp) :
	json_encode(array(
		'success' => false,
		'errorMessage' => curl_error($ch),
	)
));

curl_close($ch);

?>