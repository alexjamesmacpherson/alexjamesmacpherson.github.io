<?php
	$name = $email = $message = "";
	
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$name = safeInput($_POST["name"]);
		$email = safeInput($_POST["email"]);
		$message = safeInput($_POST["message"]);
	}
	
	function safeInput($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}
	
	$emailErr = "To message " . $name . " back, simply reply to this email!";
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$email = "noreply@sjb.alexmacpherson.uk";
		$emailErr = $name . "'s email address is not valid, so can't be replied to.";
	}
	
	$msg = "You've received a new message from " . $name . ":\n\n ---------- \n\n" . $message . "\n\n ---------- \n\nThis automated message was sent from http://sjb.alexmacpherson.uk/\n\n" . $emailErr;
	
	mail("fake@alexmacpherson.uk", "New Message From " . $name, $msg, "From:" . $email); // sjb_carpentry@yahoo.co.uk for live version
	
	header('Location: /#contact');
?>