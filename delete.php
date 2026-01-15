<?php
$adminPass = "admin123";

$input = json_decode(file_get_contents("php://input"), true);
if ($input["pass"] !== $adminPass) exit;

$file = "comments.json";
$data = json_decode(file_get_contents($file), true);
array_splice($data, $input["index"], 1);

file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
?>
