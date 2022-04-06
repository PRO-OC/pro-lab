const ROLE_VAKCINACE = 367172;
const ROLE_ZADAVATEL_POCT = 367173;
const ROLE_INDIKUJICI_OSOBA = 373644;

var JmenoDetailVysetreniLabelElement = document.querySelector('label[for="LabUdaje_Jmeno"]');
var PrijmeniDetailVysetreniLabelElement = document.querySelector('label[for="LabUdaje_Prijmeni"]');
var RodneCisloDetailVysetreniLabelElement = document.querySelector('label[for="LabUdaje_RodneCislo"]');
var DatumNarozeniDetailVysetreniLabelElement = document.querySelector('label[for="LabUdaje_DatumNarozeni"]');
var CisloZadankyDetailVysetreniLabelElement = document.querySelector('label[for="LabPripad_CisloZadanky"]');
var NarodnostDetailVysetreniLabelElement = document.querySelector('label[for="LabUdaje_Stat"]');

const vyhledatPacientaVPacientiLinkElementId = "vyhledat-v-pacienti";
var vyhledatPacientaVPacientiLinkElement = document.getElementById(vyhledatPacientaVPacientiLinkElementId);

var actionsElement = document.querySelector('.actions');

if(
    !vyhledatPacientaVPacientiLinkElement &&
    JmenoDetailVysetreniLabelElement && JmenoDetailVysetreniLabelElement.nextElementSibling.innerText &&
    PrijmeniDetailVysetreniLabelElement && PrijmeniDetailVysetreniLabelElement.nextElementSibling.innerText &&
    DatumNarozeniDetailVysetreniLabelElement && DatumNarozeniDetailVysetreniLabelElement.nextElementSibling.innerText &&
    actionsElement
) {
    var Jmeno = JmenoDetailVysetreniLabelElement.nextElementSibling.innerText;
    var Prijmeni = PrijmeniDetailVysetreniLabelElement.nextElementSibling.innerText;
    var DatumNarozeni = DatumNarozeniDetailVysetreniLabelElement.nextElementSibling.innerText;

    vyhledatPacientaVPacientiLinkElement = document.createElement("a");
    vyhledatPacientaVPacientiLinkElement.setAttribute("class", "button-action ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only valid");
    vyhledatPacientaVPacientiLinkElement.setAttribute("id", vyhledatPacientaVPacientiLinkElementId);
    vyhledatPacientaVPacientiLinkElement.text = "Vyhledat pacienta";
    vyhledatPacientaVPacientiLinkElement.setAttribute("role", "button");

    vyhledatPacientaVPacientiLinkElement.addEventListener('click', function() {
        setUserRole(ROLE_VAKCINACE, function() {

            var url = getRegistrCUDZadankyVyhledaniPacientaPrehledVsechPage();
            var urlParams = getRegistrCUDZadankyVyhledaniPacientaPrehledVsechUrlParams(Jmeno, Prijmeni, DatumNarozeni);  
            var vyhledatPacientaVPacientiLink = url + "?" + urlParams.toString();

            chrome.runtime.sendMessage({
                "text": "createTab",
                "data": {
                    "url": window.location.origin + vyhledatPacientaVPacientiLink
                }
            });
        });
        
    });

    actionsElement.appendChild(vyhledatPacientaVPacientiLinkElement);
}

function getUrlRoleAddressUrlParams(efektivniRoleId) {
    var urlParams = new URLSearchParams();
    urlParams.set("efektivniRoleId", efektivniRoleId);
    return urlParams;
}

function getRegistrCUDZadankyVyhledaniPacientaPrehledVsechPage() {
    return "/Registr/CUDZadanky/VyhledaniPacienta/PrehledVsech";
}

function getRegistrCUDZadankyVyhledaniPacientaPrehledVsechUrlParams(Jmeno, Prijmeni, DatumNarozeni) {
    var urlParams = new URLSearchParams();
    urlParams.set("Filter.Jmeno", Jmeno);
    urlParams.set("Filter.Prijmeni", Prijmeni);
    urlParams.set("Filter.DatumNarozeni", DatumNarozeni);
    urlParams.set("_submit", "None");
    urlParams.set("Filter.PageSize", 50);
    return urlParams;
}

function getVyberRoleUrl() {
    return "https://ereg.ksrzis.cz/Registr/CUDZadanky/MenuToolbar/VyberRole";
}

function setUserRole(roleId, onEnd) {

    var urlRoleAddress = getVyberRoleUrl();

    var urlRoleAddressParams = getUrlRoleAddressUrlParams(roleId);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", urlRoleAddress, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if(xhr.status == 200) {
                onEnd();   
            } else {
                onEnd();
            }
        }
    }
    xhr.send(urlRoleAddressParams.toString());
}

if(
    CisloZadankyDetailVysetreniLabelElement && CisloZadankyDetailVysetreniLabelElement.nextElementSibling &&
    RodneCisloDetailVysetreniLabelElement && RodneCisloDetailVysetreniLabelElement.nextElementSibling &&
    NarodnostDetailVysetreniLabelElement && NarodnostDetailVysetreniLabelElement.nextElementSibling &&
    JmenoDetailVysetreniLabelElement && JmenoDetailVysetreniLabelElement.nextElementSibling &&
    PrijmeniDetailVysetreniLabelElement && PrijmeniDetailVysetreniLabelElement.nextElementSibling &&
    DatumNarozeniDetailVysetreniLabelElement && DatumNarozeniDetailVysetreniLabelElement.nextElementSibling &&
    actionsElement
  ) {

    Cislo = CisloZadankyDetailVysetreniLabelElement.nextElementSibling.innerText;
    StatniPrislusnost = NarodnostDetailVysetreniLabelElement.nextElementSibling.innerText.split("-")[0].trim();
    RodneCislo = RodneCisloDetailVysetreniLabelElement.nextElementSibling.innerText;
    TestovanyJmeno = JmenoDetailVysetreniLabelElement.nextElementSibling.innerText;
    TestovanyPrijmeni = PrijmeniDetailVysetreniLabelElement.nextElementSibling.innerText;
    TestovanyDatumNarozeni = DatumNarozeniDetailVysetreniLabelElement.nextElementSibling.innerText;

    // Testing purpose
    //Cislo = null;
    //StatniPrislusnost = "GB";

    var zkontrolovatZadankuFormId = "zkontrolovat-zadanku";
    var zkontrolovatZadankuForm = document.getElementById(zkontrolovatZadankuFormId);

    if(!zkontrolovatZadankuForm) {

        var zadankaData = {
            "Cislo": Cislo,
            "StatniPrislusnost": StatniPrislusnost,
            "TestovanyCisloPojistence": RodneCislo,
            "TestovanyJmeno": TestovanyJmeno,
            "TestovanyPrijmeni": TestovanyPrijmeni,
            "TestovanyDatumNarozeni": TestovanyDatumNarozeni
        }

        createZkontrolovatZadankuForm("Zkontrolovat žádanku", zkontrolovatZadankuFormId, zadankaData, function(zkontrolovatZadankuForm) {
            actionsElement.appendChild(zkontrolovatZadankuForm);
        });
    }
}

function getRegistrCUDOvereniPage() {
    return "/Registr/CUD/Overeni";
}

function getRegistrCUDOvereniUrl(callback) {
    getRegistrUrl(function(registrUrl) {
        callback(registrUrl + getRegistrCUDOvereniPage());
    });
}

function getRegistrUrl(callback) {
    getRegistrDomain(function(registrDomain) {
        callback("https://" + registrDomain);
    });
}

function getRegistrDomain(callback) {
    callback("eregpublicsecure.ksrzis.cz");
}

function createZkontrolovatZadankuForm(text, id, ZadankaData, onCreateForm) {

    getRegistrCUDOvereniUrl(function(url) {

        var form = document.createElement("form");
        form.action = url;
        form.id = id;
        form.method = "POST";
        form.target = "_blank";
  
        var inputTypVyhledavani = document.createElement("input");
        inputTypVyhledavani.type = "hidden";
        inputTypVyhledavani.name = "TypVyhledavani";
        form.appendChild(inputTypVyhledavani);

        if (ZadankaData.Cislo) {
            inputTypVyhledavani.value = "Cislo";

            var inputCislo = document.createElement("input");
            inputCislo.type = "hidden";
            inputCislo.value = ZadankaData.Cislo;
            inputCislo.name = "Cislo";
            form.appendChild(inputCislo);
        } else if (ZadankaData.StatniPrislusnost == "CZ") {
            inputTypVyhledavani.value = "RC";

            var inputCisloPojistence = document.createElement("input");
            inputCisloPojistence.type = "hidden";
            inputCisloPojistence.value = ZadankaData.TestovanyCisloPojistence;
            inputCisloPojistence.name = "TestovanyCisloPojistence";
            form.appendChild(inputCisloPojistence);
        } else {
            inputTypVyhledavani.value = "JmenoPrijmeniDatumNarozeni";

            var inputJmeno = document.createElement("input");
            inputJmeno.type = "hidden";
            inputJmeno.value = ZadankaData.TestovanyJmeno;
            inputJmeno.name = "TestovanyJmeno";
            form.appendChild(inputJmeno);

            var inputPrijmeni = document.createElement("input");
            inputPrijmeni.type = "hidden";
            inputPrijmeni.value = ZadankaData.TestovanyPrijmeni;
            inputPrijmeni.name = "TestovanyPrijmeni";
            form.appendChild(inputPrijmeni);

            var inputDatumNarozeni = document.createElement("input");
            inputDatumNarozeni.type = "hidden";
            inputDatumNarozeni.value = ZadankaData.TestovanyDatumNarozeni;
            inputDatumNarozeni.name = "TestovanyDatumNarozeni";
            form.appendChild(inputDatumNarozeni);
        }

        var inputSubmit = document.createElement("button");
        inputSubmit.type = "submit";
        inputSubmit.setAttribute("class", "button-action ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only");
        inputSubmit.innerText = text;
        form.appendChild(inputSubmit);

        onCreateForm(form);
    });
}