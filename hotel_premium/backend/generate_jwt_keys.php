<?php

$config = [
    "private_key_bits" => 4096,
    "private_key_type" => OPENSSL_KEYTYPE_RSA,
];

$res = openssl_pkey_new($config);

if ($res === false) {
    while ($msg = openssl_error_string()) {
        echo $msg . PHP_EOL;
    }
    die("OpenSSL error\n");
}

openssl_pkey_export($res, $privateKey);
$details = openssl_pkey_get_details($res);

file_put_contents(__DIR__ . "/config/jwt/private.pem", $privateKey);
file_put_contents(__DIR__ . "/config/jwt/public.pem", $details["key"]);

echo "JWT keys generated successfully\n";
