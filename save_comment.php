<?php
$file = "comments.json";
$data = json_decode(file_get_contents($file), true);

$data[] = [
    "name" => htmlspecialchars($_POST["name"]),
    "comment" => htmlspecialchars($_POST["comment"])
];

file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
?>
