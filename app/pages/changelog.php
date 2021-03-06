<!-- #module-changelog -->

<div class="bg-light mt-3 mb-3 p-4 col-12 rounded" id="module-changelog">

    <h6>Changelog</h6>
    <hr class="mb-3">

    <?php

    $changelogIndex = [
        2 => [
            "class" => "active",
            "title" => "Resources Helper 3.0"
        ],
        1 => [
            "class" => "",
            "title" => "Resources Helper 2.0"
        ],
        0 => [
            "class" => "",
            "title" => "Resources Helper 1.0"
        ],
    ];

    $changelogContent = [

        2 => [
            "class" => "show active",
            "title" => "Resources Helper 3.0",
            "date" => "April 2018",
            "description" => "
            <strong>General</strong><br />
            – NEW: added API options for: Trade Log and Missions<br />
            – NEW: official support for this page via Discord - please report any bugs you find, visual or mathematical!<br />
            – NEW: World Map now also shows Headquarters depending on user settings (depending on headquarter API import)<br />
            – NEW: Personal Map now also show Headquarter (depending on headquarter API import)<br />
            – NEW: maps now include mine information agian - click a mine to see details<br />
            – NEW: map headquarter radius can be dragged around to compare radius on different spots!<br />
            – NEW: missing Tech upgrade calculator: shows which upgrades you're missing for a messed up teching process<br />
            <br />
            – HEAVILY MODIFIED: moved clunky settings to own menu with more options and less clutter<br />
            – HEAVILY MODIFIED: leaderboard now only shows metrics that cannot be seen in-game<br />
            <br />
            - CHANGED: Missions, Personal Mine Map, Trade Log and Attack Log are only available for registered users, due to their size they need to be saved serverside<br />
            – CHANGED: Price History shows both KI and Player price now, including averages. Last 28 days/4 weeks are shown. Downloadable .csv has properly named columns now.<br />
            <br />
            <strong>Bugfixes</strong><br />
            - Giant Diamond calculator: fixed top 10 profit calculation, fixed a bug where sometimes wrong efficiency values would be calculated<br />
            <br />
            <strong>Techncial</strong><br />
            – visual redesign with customized Bootstrap, thus finally responsive to screen sizes<br />
            – rewrote and refactored most of the code (OOP PHP and VanillaJS -> jQuery)<br />",
        ],
        1 => [
            "class" => "",
            "title" => "Resources Helper 2.0",
            "date" => "December 2017",
            "description" => "complete overhaul, tab system, registration, own world ranking, own metrics such as Company worth etc.",
        ],
        0 => [
            "class" => "",
            "title" => "Resources Helper 1.0",
            "date" => "June 2017",
            "description" => "first version, rather sad than efficient",
        ],
    ];

    ?>

    <div class="row">
        <div class="col-lg-4 col-md-12">
            <div class="list-group" id="list-tab" role="tablist">
                <?php
                foreach ($changelogIndex as $index => $array) {
                    echo '
                    <a class="list-group-item list-group-item-action ' .$array["class"]. '" id="changelog-list-' .$index. '" data-toggle="list" href="#changelog-' .$index. '" role="tab" aria-controls="changelog-' .$index. '">' .$array["title"]. '</a>';
                }
                ?>
            </div>
        </div>
        <div class="col-lg-8 col-md-12 mt-3">
                <div class="tab-content" id="nav-tabContent">
                    <?php
                    foreach ($changelogContent as $index => $array) {
                        echo '
                        <div class="tab-pane fade ' .$array["class"]. '" id="changelog-' .$index. '" role="tabpanel" aria-labelledby="changelog-list-' .$index. '">
                            <h6>' .$array["date"]. '</h6>
                            <hr class="mb-3" />
                            ' .$array["description"]. '
                        </div>';
                    }
                    ?>
            </div>
        </div>
    </div>
</div>
