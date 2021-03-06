var values = {};
var temp = {};
var temp2 = {};
cvs = document.getElementById("canv");
cvs.width = window.innerWidth / 2;
cvs.height = window.innerHeight;
ctx = cvs.getContext("2d");
ctx.fillStyle = "white";

function calc() {
  values.a = Number(document.forms["strany"]["A"].value);
  values.b = Number(document.forms["strany"]["B"].value);
  values.c = Number(document.forms["strany"]["C"].value);
  values.alpha = Number(document.forms["uhly"]["ALPHA"].value);
  values.beta = Number(document.forms["uhly"]["BETA"].value);
  values.gamma = Number(document.forms["uhly"]["GAMMA"].value);

  var jsemkokot = [
    values.a,
    values.b,
    values.c,
    values.alpha,
    values.beta,
    values.gamma
  ];

  var knownVariables = 0;

  for (var i = 0; i < 6; i++) {
    if (jsemkokot[i] != "") {
      knownVariables += 1;
    }
  }

  // DOPLŇOVÁNÍ STRAN

  if (knownVariables > 2) {
    var pokracovat = true;
    if (values.a != "" && values.b != "" && values.gamma != "" && pokracovat) {
      //A B GAMMA
      values.c = Math.sqrt(
        Math.pow(values.a, 2) +
          Math.pow(values.b, 2) -
          2 * values.a * values.b * Math.cos(toRadians(values.gamma))
      );
      values.alpha = toDegrees(
        Math.asin((values.a * Math.sin(toRadians(values.gamma))) / values.c)
      );
      values.beta = toDegrees(
        Math.asin((values.b * Math.sin(toRadians(values.gamma))) / values.c)
      );

      document.forms["strany"]["C"].value = values.c;
      document.forms["uhly"]["ALPHA"].value = values.alpha;
      document.forms["uhly"]["BETA"].value = values.beta;

      pokracovat = false;
    } else if (
      values.a != "" &&
      values.beta != "" &&
      values.c != "" &&
      pokracovat
    ) {
      //A BETA C
      values.b = Math.sqrt(
        Math.pow(values.a, 2) +
          Math.pow(values.c, 2) -
          2 * values.a * values.c * Math.cos(toRadians(values.gamma))
      );
      values.alpha = toDegrees(
        Math.asin((values.a * Math.sin(toRadians(values.gamma))) / values.c)
      );
      values.gamma = toDegrees(
        Math.asin((values.c * Math.sin(toRadians(values.gamma))) / values.b)
      );

      document.forms["strany"]["B"].value = values.b;
      document.forms["uhly"]["ALPHA"].value = values.alpha;
      document.forms["uhly"]["GAMMA"].value = values.gamma;

      pokracovat = false;
    } else if (
      values.a != "" &&
      values.beta != "" &&
      values.gamma != "" &&
      pokracovat
    ) {
      //A BETA GAMMA
      values.alpha = 180 - values.beta - values.gamma;
      values.b =
        (values.a * Math.sin(toRadians(values.beta))) /
        Math.sin(toRadians(values.alpha));
      values.c =
        (values.a * Math.sin(toRadians(values.gamma))) /
        Math.sin(toRadians(values.alpha));

      document.forms["strany"]["B"].value = values.b;
      document.forms["uhly"]["ALPHA"].value = values.alpha;
      document.forms["strany"]["C"].value = values.c;

      pokracovat = false;
    } else if (
      values.alpha != "" &&
      values.beta != "" &&
      values.c != "" &&
      pokracovat
    ) {
      //ALPHA BETA C
      values.gamma = 180 - values.beta - values.alpha;
      values.b =
        (values.c * Math.sin(toRadians(values.beta))) /
        Math.sin(toRadians(values.gamma));
      values.a =
        (values.c * Math.sin(toRadians(values.alpha))) /
        Math.sin(toRadians(values.gamma));

      document.forms["strany"]["B"].value = values.b;
      document.forms["uhly"]["GAMMA"].value = values.gamma;
      document.forms["strany"]["A"].value = values.a;

      pokracovat = false;
    } else if (
      values.alpha != "" &&
      values.b != "" &&
      values.gamma != "" &&
      pokracovat
    ) {
      //ALPHA B GAMMA
      values.beta = 180 - values.alpha - values.gamma;
      values.c =
        (values.b * Math.sin(toRadians(values.gamma))) /
        Math.sin(toRadians(values.beta));
      values.a =
        (values.b * Math.sin(toRadians(values.alpha))) /
        Math.sin(toRadians(values.beta));

      document.forms["strany"]["C"].value = values.c;
      document.forms["uhly"]["BETA"].value = values.beta;
      document.forms["strany"]["A"].value = values.a;

      pokracovat = false;
    } else if (
      values.alpha != "" &&
      values.b != "" &&
      values.c != "" &&
      pokracovat
    ) {
      //ALPHA B C
      values.a = Math.sqrt(
        Math.pow(values.a, 2) +
          Math.pow(values.c, 2) -
          2 * values.a * values.c * Math.cos(toRadians(values.gamma))
      );
      values.beta = toDegrees(
        Math.asin((Math.sin(toRadians(values.alpha)) * values.b) / values.a)
      );
      values.gamma = toDegrees(
        Math.asin((values.c * Math.sin(toRadians(values.beta))) / values.b)
      );

      document.forms["strany"]["A"].value = values.a;
      document.forms["uhly"]["BETA"].value = values.beta;
      document.forms["uhly"]["GAMMA"].value = values.gamma;

      pokracovat = false;
    }
    var skupinaA = values.a != "" && values.alpha != "" && pokracovat;
    if (skupinaA && values.b != "") {
      //A B
      values.beta = toDegrees(
        Math.asin((values.b * Math.sin(toRadians(values.alpha))) / values.a)
      );
      values.gamma = 180 - values.alpha - values.beta;
      values.c =
        (values.a * Math.sin(toRadians(values.gamma))) /
        Math.sin(toRadians(values.alpha));

      document.forms["strany"]["C"].value = values.c;
      document.forms["uhly"]["BETA"].value = values.beta;
      document.forms["uhly"]["GAMMA"].value = values.gamma;

      pokracovat = false;
    } else if (skupinaA && values.beta != "") {
      //A BETA
      values.b =
        (values.a * Math.sin(toRadians(values.beta))) /
        Math.sin(toRadians(values.alpha));
      values.gamma = 180 - values.alpha - values.beta;
      values.c =
        (values.a * Math.sin(toRadians(values.gamma))) /
        Math.sin(toRadians(values.alpha));

      document.forms["strany"]["B"].value = values.b;
      document.forms["strany"]["C"].value = values.c;
      document.forms["uhly"]["GAMMA"].value = values.gamma;

      pokracovat = false;
    } else if (skupinaA && values.c != "") {
      //A C
      values.gamma = toDegrees(
        Math.asin((values.c * Math.sin(toRadians(values.alpha))) / values.a)
      );
      values.beta = 180 - values.alpha - values.gamma;
      values.b =
        (values.a * Math.sin(toRadians(values.beta))) /
        Math.sin(toRadians(values.alpha));

      document.forms["uhly"]["BETA"].value = values.beta;
      document.forms["uhly"]["GAMMA"].value = values.gamma;
      document.forms["strany"]["B"].value = values.b;

      pokracovat = false;
    } else if (skupinaA && values.gamma != "") {
      // A GAMMA
      values.c =
        (values.a * Math.sin(toRadians(values.gamma))) /
        Math.sin(toRadians(values.alpha));
      values.beta = 180 - values.alpha - values.gamma;
      values.b =
        (values.a * Math.sin(toRadians(values.beta))) /
        Math.sin(toRadians(values.alpha));

      document.forms["strany"]["B"].value = values.b;
      document.forms["strany"]["C"].value = values.c;
      document.forms["uhly"]["BETA"].value = values.beta;

      pokracovat = false;
    }
    var skupinaB = values.b != "" && values.beta != "" && pokracovat;
    if (skupinaB && values.a != "") {
      // B A
      values.alpha = toDegrees(
        Math.asin((values.a * Math.sin(toRadians(values.beta))) / values.b)
      );
      values.gamma = 180 - values.alpha - values.beta;
      values.c =
        (values.a * Math.sin(toRadians(values.gamma))) /
        Math.sin(toRadians(values.alpha));

      document.forms["uhly"]["ALPHA"].value = values.alpha;
      document.forms["uhly"]["GAMMA"].value = values.gamma;
      document.forms["strany"]["C"].value = values.c;

      pokracovat = false;
    } else if (skupinaB && values.alpha != "") {
      // B ALPHA
      values.a = (values.b * Math.sin(toRadians(values.alpha))) / values.beta;
      values.gamma = 180 - values.alpha - values.beta;
      values.c =
        (values.a * Math.sin(toRadians(values.gamma))) /
        Math.sin(toRadians(values.alpha));

      document.forms["strany"]["A"].value = values.a;
      document.forms["strany"]["C"].value = values.c;
      document.forms["uhly"]["GAMMA"].value = values.gamma;

      pokracovat = false;
    } else if (skupinaB && values.c != "") {
      // B C
      values.gamma = toDegrees(
        Math.asin((values.c * Math.sin(toRadians(values.beta))) / values.b)
      );
      values.alpha = 180 - values.beta - values.gamma;
      values.a =
        (values.c * Math.sin(toRadians(values.alpha))) /
        Math.sin(toRadians(values.gamma));

      document.forms["uhly"]["ALPHA"].value = values.alpha;
      document.forms["uhly"]["GAMMA"].value = values.gamma;
      document.forms["strany"]["A"].value = values.a;

      pokracovat = false;
    } else if (skupinaB && values.gamma != "") {
      // B GAMMA
      values.c =
        (values.b * Math.sin(toRadians(values.gamma))) /
        Math.sin(toRadians(values.beta));
      values.beta = 180 - values.alpha - values.gamma;
      values.a =
        (values.c * Math.sin(toRadians(values.alpha))) /
        Math.sin(toRadians(values.gamma));

      document.forms["strany"]["C"].value = values.c;
      document.forms["strany"]["A"].value = values.a;
      document.forms["uhly"]["BETA"].value = values.beta;

      pokracovat = false;
    }
    var skupinaC = values.c != "" && values.gamma != "" && pokracovat;
    if (skupinaC && values.a != "") {
      // C A
      values.alpha = toDegrees(
        Math.asin((values.a * Math.sin(toRadians(values.gamma))) / values.c)
      );
      values.beta = 180 - values.alpha - values.gamma;
      values.b =
        (values.a * Math.sin(toRadians(values.beta))) /
        Math.sin(toRadians(values.alpha));

      document.forms["uhly"]["ALPHA"].value = values.alpha;
      document.forms["uhly"]["BETA"].value = values.beta;
      document.forms["strany"]["B"].value = values.b;
      pokracovat = false;
    } else if (skupinaC && values.alpha != "") {
      // C ALPHA
      values.a =
        (values.c * Math.sin(toRadians(values.alpha))) /
        Math.sin(toRadians(values.gamma));
      values.beta = 180 - values.alpha - values.gamma;
      values.b =
        (values.a * Math.sin(toRadians(values.beta))) /
        Math.sin(toRadians(values.alpha));

      document.forms["strany"]["A"].value = values.a;
      document.forms["strany"]["B"].value = values.b;
      document.forms["uhly"]["BETA"].value = values.beta;
      pokracovat = false;
    } else if (skupinaC && values.b != "") {
      // C B
      values.beta = toDegrees(
        Math.asin((values.b * Math.sin(toRadians(values.gamma))) / values.c)
      );
      values.alpha = 180 - values.gamma - values.beta;
      values.a =
        (values.c * Math.sin(toRadians(values.alpha))) /
        Math.sin(toRadians(values.gamma));

      document.forms["uhly"]["ALPHA"].value = values.alpha;
      document.forms["uhly"]["BETA"].value = values.beta;
      document.forms["strany"]["A"].value = values.a;
      pokracovat = false;
    } else if (skupinaC && values.beta != "") {
      // C BETA
      values.b =
        (values.c * Math.sin(toRadians(values.beta))) /
        Math.sin(toRadians(values.gamma));
      values.alpha = 180 - values.beta - values.gamma;
      values.a =
        (values.c * Math.sin(toRadians(values.alpha))) /
        Math.sin(toRadians(values.gamma));

      document.forms["strany"]["A"].value = values.a;
      document.forms["strany"]["B"].value = values.b;
      document.forms["uhly"]["ALPHA"].value = values.alpha;
      pokracovat = false;
    }
  }

  // VÝŠKY

  if (knownVariables > 2) {
    values.Va =
      (values.b * Math.sin(toRadians(values.gamma))) / Math.sin(toRadians(90));
    values.Vb =
      (values.c * Math.sin(toRadians(values.alpha))) / Math.sin(toRadians(90));
    values.Vc =
      (values.a * Math.sin(toRadians(values.beta))) / Math.sin(toRadians(90));
  }

  // OBVOD A OBSAH

  if (knownVariables > 2) {
    values.o = Number(values.a) + Number(values.b) + Number(values.c);
    document.getElementById("obvod").innerHTML = "Obvod = " + values.o;

    values.S = (values.a * values.Va) / 2;
    document.getElementById("obsah").innerHTML = "Obsah = " + values.S;
  }

  if (knownVariables > 2) draw();
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function toDegrees(angle) {
  return angle * (180 / Math.PI);
}
    
