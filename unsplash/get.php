<?php
/**
 * Get images from unsplash API and put to json file.
 *
 * https://github.com/sanjabteam/sanjabteam.github.io
 */


$config = require_once "config.php";

$images = [];

do {
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://api.unsplash.com/users/amir9480/likes?per_page=30&page=".(count($images) / 30 + 1),
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "Accept: application/json",
            "Accept-Version: v1",
            "Authorization: Client-ID ".$config['client_id'],
            "Cache-Control: no-cache",
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    $tempImages = [];
    if ($err) {
        echo "cURL Error #:" . $err;
        exit;
    } else {
        $tempImages = json_decode($response, true);
        $images = array_merge($images, $tempImages);
    }
} while (is_array($tempImages) && count($tempImages) > 0 && count($images) < 100);
foreach ($images as $key => $image) {
    $images[$key] = [
        'author' => $image['user']['name'],
        'link' => $image['links']['html'].'?'.http_build_query(['utm_source' => 'sanjab', 'utm_medium' => 'referral']),
        'image' => $image['urls']['regular'],
    ];
}
$file = fopen('images.json', 'w');
fwrite($file, json_encode($images, JSON_PRETTY_PRINT));
fclose($file);
echo "Response saved in images.json";
