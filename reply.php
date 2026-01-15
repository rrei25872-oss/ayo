<?php
$file = "comments.json";
$data = json_decode(file_get_contents($file), true);

$index = $_POST["index"];

$data[$index]["replies"][] = [
    "name" => htmlspecialchars($_POST["name"]),
    "text" => htmlspecialchars($_POST["reply"]),
    "time" => date("Y-m-d H:i")
];

file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
?>
