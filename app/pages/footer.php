<div class="p-4 mt-3 mb-3">

<?php

$footerArray = [
    "tos" => "Terms of Service",
    "contact" => "Contact",
    "donate" => "Donate",
];

foreach ($footerArray as $anchor => $link) {
    echo '
	<a href="#' .$anchor. '">' .$link. '</a><br />';
}

?>

<a href="#">Source Code</a>

</div>