init();
let executed = false;
var data = '';

let countryArr = new Array();
let countryConfirmed = new Array();
let countryDeath = new Array();
function init(){
    
    var url ='https://api.covid19api.com/summary';
    $.get(url,function(data){
        for(let i = 0; i < data.Countries.length; i++){
            countryArr.push(data.Countries[i].Country);
            countryConfirmed.push(data.Countries[i].TotalConfirmed);
            countryDeath.push(data.Countries[i].TotalDeaths);
        }
        console.log(countryArr);
        data = `
            <td>${data.Global.TotalConfirmed}</td>
            <td> ${data.Global.TotalDeaths}</td>
            <td>${data.Global.TotalRecovered}</td> 
        `;
        $('#data').html(data);

    })
}
function refresh(){
    $('#data').empty();
    init();
    if(executed == true){
        $('#data1').empty();
        getData();
    }
    
}

var select = document.getElementById("arr");
function countrywise(){
    document.getElementById('country-wise').style.display = "block";
    for (var i = 0; i < countryArr.length; i++) {
        var optn = countryArr[i];
        var el = document.createElement("option");
        el.textContent = optn;
        el.value = i;
        select.appendChild(el);
    } 
    charItConfirmed();
    if(document.getElementById('form').value == 1){
        charItConfirmed();
    }else{
        charItDeath();
    }
    
}
function getData(){
    document.getElementById('countrywise-table').style.display = "block";
    removeData();
    executed =true;
    var value = document.getElementById('arr').value;
    var url ='https://api.covid19api.com/summary';
    $.get(url,function(data){
        document.getElementById('country-name').innerHTML = data.Countries[value].Country +' ['+ data.Countries[value].CountryCode +']';
        data = `
            <td>${data.Countries[value].TotalConfirmed}</td>
            <td> ${data.Countries[value].TotalDeaths}</td>
            <td>${data.Countries[value].TotalRecovered}</td> 
        `;
        $('#data1').html(data);

    })
}
function removeData(){
    $('#data1').empty();
}
 

function charItConfirmed(){
    document.getElementById('canvas').style.display = "block";
    document.getElementById('myChart').style.display = "block";
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: countryArr,
            datasets: [{
                label: "Total Confirmed Cases",
                data: countryConfirmed,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
    });
}
function charItDeath(){
    document.getElementById('canvas').style.display = "block";
    document.getElementById('myChart').style.display = "block";
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: countryArr,
            datasets: [{
                label: "Total Death",
                data: countryDeath,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
    });
}