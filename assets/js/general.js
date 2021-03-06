loadingAnimToggler = (mode, text) => {
    "use strict";

    $("#loading-text").text(text);

    let possibleAnimationClasses = ["slide-out-bck-center", "puff-out-center", "roll-out-blurred-left", "slit-out-vertical", "rotate-out-center"];
    let rndAnimation = possibleAnimationClasses[Math.floor(Math.random() * possibleAnimationClasses.length)];

    switch (mode) {
        case "hide":
            $("#loading-container svg").addClass(rndAnimation);
            $("#loading-container span").each((i, obj) => {
                $(obj).fadeOut(750);
            });

            window.setTimeout(function() {
                $("#loading-container").hide();
                $("#loading-container svg").removeClass(rndAnimation);
                $("#loading-container span").each((i, obj) => {
                    $(obj).fadeIn(750);
                });
            }, 750);
            break;
        case "show":
            $("#loading-container").show();
            break;
    }
};

/* src https://www.w3schools.com/js/js_cookies.asp */

getCookie = cname => {
    "use strict";
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

crEl = tag => {
    "use strict";
    return document.createElement(tag);
};

Array.prototype.min = function() {
    return Math.min.apply(null, this);
};

Array.prototype.max = function() {
    return Math.max.apply(null, this);
};

let applyTippyOnNewElement = el => {
    "use strict";

    if (!el.hasClass("tippied")) {
        tippy(el[0], {
            dynamicTitle: true
        });
    }
};

let changeElementClasses = (el, rmvClass, addClass) => {
    "use strict";
    let $el = $(el);

    if ($.isArray(rmvClass)) {
        $.each(rmvClass, (i, className) => {
            if ($el.hasClass(className)) {
                $el.removeClass(className);
            }
        });
    } else {
        if ($el.hasClass(rmvClass)) {
            $el.removeClass(rmvClass);
        }
    }

    if (addClass) {
        $el.addClass(addClass);
    }
};

let switchActiveNavigationLink = selectedNav => {
    "use strict";
    $(".nav-link").each((i, navLink) => {
        if (selectedNav == navLink.id) {
            $(navLink).addClass("active");
        } else {
            $(navLink).removeClass("active");
        }
    });
};

let switchActiveModule = targetId => {
    "use strict";
    $("main > div").each((i, moduleEl) => {
        if (targetId == moduleEl.id) {
            $(moduleEl).css("display", "block");
        } else {
            $(moduleEl).css("display", "none");
        }
    });

    if (targetId == "module-leaderboard") {
        rHelper.methods.INSRT_leaderboard();
    }
};

let toggleTab = (selectedNav, targetId) => {
    "use strict";

    switchActiveNavigationLink(selectedNav);
    switchActiveModule(targetId);
};

let toggleTechUpgradeInfo = mode => {
    "use strict";

    let loading = $("#techupgrades-loading");
    let finished = $("#techupgrades-finished");

    let loadingChange = "";
    let finishedChange = "";

    switch (mode) {
        case "start":
            loadingChange = "flex";
            finishedChange = "none";
            break;
        case "end":
            loadingChange = "none";
            finishedChange = "inline-block";
            break;
    }

    loading.css("display", loadingChange);
    finished.css("display", finishedChange);
};

$("input").each((i, obj) => {
    "use strict";

    $(obj).click(() => {
        obj.select();
    });
});

$("#registration-reset-fields").click(() => {
    "use strict";

    $("#registration-form input").each((i, obj) => {
        $(obj).val("");
    });
});

$("#registration-form").submit(event => {
    "use strict";

    let passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,}$");
    let pw1El = $("#registration-pw-1");
    let pw2El = $("#registration-pw-2");
    let pw1Val = pw1El.val();
    let pw2Val = pw2El.val();

    $.each([pw1Val, pw2Val], (i, value) => {
        if (value === "") {
            swal("Error", "password empty", "error");
            event.preventDefault();
        }
    });

    if (pw1Val !== pw2Val) {
        swal("Error", "Passwords do not match", "error");
        event.preventDefault();
    }

    $.each([pw1El, pw2El], (i, obj) => {
        if (passwordRegex.test(obj.val()) === false) {
            swal("Invalid password type", 'minimum of 4 characters including one number\n(e.g. "pas1").', "error");
            event.preventDefault();
        }
    });

    if ($("#registration-language").val() === null) {
        swal("Missing language", "please select a language", "error");
        event.preventDefault();
    }
});

$("#password-change-form").submit(event => {
    "use strict";

    let passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,}$");
    let pwOldEl = $("#settings-current-password");
    let pw1El = $("#settings-new-password-1");
    let pw2El = $("#settings-new-password-2");
    //let pwOldElVal = pwOldEl.val();
    let pw1Val = pw1El.val();
    let pw2Val = pw2El.val();

    $.each([pwOldEl, pw1Val, pw2Val], (i, value) => {
        if (value === "") {
            swal("Error", "password empty", "error");
            event.preventDefault();
        }
    });

    if (pw1Val !== pw2Val) {
        swal("Error", "New passwords do not match", "error");
        event.preventDefault();
    }

    if (passwordRegex.test(pwOldEl.val()) === false) {
        swal("Invalid old password", 'Your old password does not fit the required pattern: minimum of 4 characters including one number\n(e.g. "pas1").', "error");
        event.preventDefault();
    }

    $.each([pw1El, pw2El], (i, obj) => {
        if (passwordRegex.test(obj.val()) === false) {
            swal("Invalid password type", 'minimum of 4 characters including one number\n(e.g. "pas1").', "error");
            event.preventDefault();
        }
    });
});

$("#login-forgot-password").click(e => {
    "use strict";

    e.preventDefault();
    swal({
        title: "Reset password for...",
        input: "email",
        inputPlaceholder: "mail",
        showCancelButton: true,
        confirmButtonText: "Continue"
    }).then(result => {
        if (result.value) {
            $.post({
                url: "api/resetPasswordValidateMail.php",
                data: {
                    mail: result.value
                },
                success: response => {
                    if (response.invalid) {
                        swal.showValidationError("Account not found.");
                    } else if (response.valid) {
                        swal({
                            title: `Security token for '${result.value}'`,
                            input: "text",
                            showCancelButton: true,
                            confirmButtonText: "Validate",
                            showLoaderOnConfirm: true,
                            allowOutsideClick: () => !swal.isLoading(),
                            preConfirm: token => {
                                return new Promise(resolve => {
                                    $.post({
                                        url: "api/resetPassword.php",
                                        data: {
                                            mail: result.value,
                                            token: token
                                        },
                                        success: response => {
                                            if (response.invalid) {
                                                swal.showValidationError("Invalid security token.");
                                            } else if (response.url) {
                                                location.replace(response.url);
                                            }
                                            resolve();
                                        }
                                    });
                                });
                            }
                        });
                    }
                }
            });
        }
    });
});

window.setInterval(() => {
    "use strict";

    let wait = document.getElementById("loading-dots");

    if (wait) {
        if (wait.innerHTML.length > 3) {
            wait.innerHTML = "";
        } else {
            wait.innerHTML += ".";
        }
    }
}, 1000);

$("#settings-toggler").on("click", e => {
    "use strict";

    e.preventDefault();

    let settings = $("#module-settings");

    if (settings.css("display") == "block") {
        settings.css("display", "none");
    } else {
        settings.css("display", "block");
    }
});

$("#settings-close").on("click", e => {
    "use strict";

    e.preventDefault();

    $("#module-settings").css("display", "none");
});

$("#api-submit").on("click", function(e) {
    "use strict";

    e.preventDefault();
    this.disabled = true;
    let key = $("#api-key")
        .val()
        .replace(/ /g, "");
    let anonymity = false;

    if (!key || key.length != 45) {
        swal("API Error", `Key missing or too short/long (${key.length} instead of 45 characters)`, "error");
        return;
    }

    let API_possibilities = ["factories", "warehouse", "buildings", "headquarter", "mines-summary", "mines-detailed", "player", "attack-log", "trade-log", "missions"];

    let queries = [];

    $.each(API_possibilities, (i, possibility) => {
        let el = $(`#api-${possibility}`);

        if (el.prop("checked") === true) {
            queries.push(parseInt(el.attr("data-query")));
        }
    });

    queries.push(0);

    if ($("#api-player-anonymity").prop("checked") !== true) {
        anonymity = true;
    }

    rHelper.methods.API_init(key, queries, anonymity);
});

$(".nav-link").each((i, navLink) => {
    $(navLink).on("click", () => {
        toggleTab(navLink.id, navLink.dataset.target);
    });
});

$("#techupgrades-toggle").on("click", function() {
    "use strict";

    let el = $(this);

    if (el.prop("checked") === true) {
        rHelper.methods.INSRT_techUpgradeRows("tu4");
        sorttable.innerSortFunction.apply($("#module-techupgrades th")[4], []);
        sorttable.innerSortFunction.apply($("#module-techupgrades th")[5], []);
        sorttable.innerSortFunction.apply($("#module-techupgrades th")[5], []);
    } else {
        rHelper.methods.INSRT_techUpgradeRows();
    }
});

$("#techupgrades-input").on("input", function() {
    "use strict";

    let tu4Allowance = $("#techupgrades-calc-tu4-allowance");
    let value = parseFloat(this.value);

    if (value >= 1.01 && value <= 5) {
        if (tu4Allowance.prop("checked") === true) {
            rHelper.methods.INSRT_techUpgradeCalculator(value, "tu4Included");
        } else {
            rHelper.methods.INSRT_techUpgradeCalculator(value);
        }
    }
});

$("#personalmap-create").on("click", () => {
    "use strict";

    if (rHelper.data.mineMap.length == 0 && getCookie("loggedIn") == 1) {
        rHelper.methods.API_getMineMap();
    }
});

$("#worldmap-selector").on("change", function() {
    "use strict";

    rHelper.methods.API_getWorldMap(this.value);
    $("#worldmap").css("display", "block");
});

$("#qualitycomparator-selector").on("change", function() {
    "use strict";

    let type = parseInt(this.value);
    let quality = $("#qualitycomparator-quality").val();
    rHelper.methods.INSRT_qualityComparator(type, quality);
});

$("#qualitycomparator-quality").on("input", function() {
    "use strict";

    let type = $("#qualitycomparator-selector").val();
    let quality = parseInt(this.value);
    rHelper.methods.INSRT_qualityComparator(type, quality);
});

$("#attacklog-detailed-selector").on("change", function() {
    "use strict";

    let target = this.value;
    let type = "attackDetailed";
    let skipCount = rHelper.data.attackLog.skipCount;

    let currentTarget = rHelper.data.attackLog.data[0].target;
    if (target != currentTarget) {
        skipCount = 0;
    }

    if (parseInt(target) == -1) {
        target = 0;
        skipCount = 0;
    }

    rHelper.methods.API_getAttackLog(type, target, skipCount);
});

$("#attacklog-detailed-next").on("click", () => {
    "use strict";

    let target = $("#attacklog-detailed-selector").val();
    let type = "attackDetailed";
    let skipCount = rHelper.data.attackLog.skipCount + 100;

    rHelper.methods.API_getAttackLog(type, target, skipCount);
});

$("#attacklog-detailed-last").on("click", () => {
    "use strict";

    let target = $("#attacklog-detailed-selector").val();
    let type = "attackDetailed";
    let skipCount = rHelper.data.attackLog.skipCount - 100;

    rHelper.methods.API_getAttackLog(type, target, skipCount);
});
