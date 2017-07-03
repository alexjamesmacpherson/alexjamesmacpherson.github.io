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
	
	$emailErr = "To message " . $name . " back, simply reply to this email.";
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$email = "noreply@alexmacpherson.uk";
		$emailErr = $name . "'s email address is not valid, so can't be replied to.";
	}
	
	$msg = $message . "\n\n ---------- \n\nMessage sent from: http://www.alexmacpherson.uk/ \n\n" . $emailErr;
	
	mail("hello@alexmacpherson.uk", "New Message From " . $name, $msg, "From:" . $name . "<" . $email . ">");
	
	$thanks = "Hey " . $name . "!\n\nThanks for your message, I'll do my best to get back to you as soon as I can. In the meantime, if there's anything else you wish to add, feel free to reply to this automated email and I'll get it.\n\nCheers!\nAlex\n\n ---------- \n\nAutomated message sent from http://www.alexmacpherson.uk/ \n\nYour original message:\n\n" . $message;
	
	mail($email, "Thanks for your message!", $thanks, "From:Alex Macpherson<hello@alexmacpherson.uk>");
	
	header('Location: /#contact');
?>