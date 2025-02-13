<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/SMTP.php';

header('Content-Type: application/json'); // Set JSON header

// Check if the request is from the form
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Error: This script should be called via POST method."]);
    exit;
}

// Get form data
$name = htmlspecialchars($_POST["name"] ?? '', ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars($_POST["email"] ?? '', ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($_POST["message"] ?? '', ENT_QUOTES, 'UTF-8');

// Check if fields are empty
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(["status" => "error", "message" => "Error: All fields are required!"]);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["status" => "error", "message" => "Error: Invalid email format!"]);
    exit;
}

// Initialize PHPMailer
$mail = new PHPMailer(true);

try {
    // SMTP server configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.yourmailserver.com';  // Change to your mail server
    $mail->SMTPAuth = true;
    $mail->Username = 'your_email@example.com';  // Replace with your email
    $mail->Password = 'your_secure_app_password'; // Use "App Password"!
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = "UTF-8"; // Correct encoding for special characters

    // Sender and recipient
    $mail->setFrom('your_email@example.com', $name); // User's name as sender
    $mail->addReplyTo($email, $name); // Reply to user's email
    $mail->addAddress('your_email@example.com'); // Replace with recipient email

    // Email content
    $mail->isHTML(true);
    $mail->Subject = "New message from the contact form";
    $mail->Body = "<strong>Name:</strong> $name <br> 
                   <strong>Email:</strong> $email <br><br> 
                   <strong>Message:</strong><br> $message";

    // Send email
    $mail->send();

    echo json_encode(["status" => "success", "message" => "Message has been sent successfully"]);
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Error sending message: {$mail->ErrorInfo}"]);
}
?>
