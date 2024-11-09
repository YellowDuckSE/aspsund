<?php
exec("echo '".print_r(json_decode($_POST["payload"]))."' > /tmp/test.phl");

if (json_decode($_POST["payload"])->{'hook'}->{'config'}->{'secret'} === "SA0WII") {
    echo exec("cd /var/www/se/aspsund/new;git pull");
} else {
    echo "Invalid call!";
}

