//for testing: 
// getChartYear(2017,"pie",10); 
// getChartPresident("Abraham Lincoln", "horizontalBar", 20); 
// getWordCloudPresident("Andrew Jackson");
// getFourCharts(1992)
// getChartTransition("Clinton-GWBush", "bar"); 

/**
 *
 * Expecting the following president names: 
 * 1. Clinton-GWBush
 * 2. GHWBush-Clinton
 * 3. GWBush-Obama
 * 4. Obama-Trump
 * 5. Raegan-GHWBush
 *
 * --- ONLY THE FOLLOWING COMPARISONS PERMITTED ---
 * 1. ClintonVsGWBush
 * 2. GHWBushVsClinton
 * 3. GWBushVsObama
 * 4. ObamaVsTrump
 * 5. RaeganVsGHWBush
 * 
 * @param  transitionString: contains both president names. 
 * @param  chartType: 1. horizontalBar. 
                      2. bar. 
                      3. line. 
                      4. polar Area (doesn't display president names) ISSUE. 
 */
function getChartTransition(transitionString, chartType){
    let s = transitionString.split("-"); 
    let president1 = s[0]; 
    let president2 = s[1]; 

    console.log(president1); 
    console.log(president2); 
    
    if(president1 == "Clinton" && president2 == "GWBush"){
        fileName = "ClintonVsGWBush";
    }else if(president1 == "GHWBush" && president2 == "Clinton"){
        fileName = "GHWBushVsClinton";
    }else if(president1 == "GWBush" && president2 == "Obama"){
        fileName = "GWBushVsObama";
    }else if(president1 == "Obama" && president2 == "Trump"){
        fileName = "ObamaVsTrump";
    }else if(president1 == "Raegan" && president2 == "GHWBush"){
        fileName = "RaeganVsGHWBush";
    }

    let JobjectPath = "JsonObjects/" + fileName + "_COMPJO.json"; 


    $.getJSON(JobjectPath, function(data){

        data["datasets"][0]["label"] = president1; 
        data["datasets"][1]["label"] = president2; 
        
        let dummyObject =  {
            type: 'bar',
            data: data,
            options: {
                barValueSpacing: 20,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                        }
                    }]
                }
            }
        }; 

        dummyObject["type"] = chartType; 
        

        /* Fix for chart js displaying old chart data.   */
        //            console.log("Removed"); 
        $('#myChart').remove();
        $('#Canvas').append('<canvas id="myChart" width="850 !important;" height="400 !important;"></canvas>');
        //            console.log("Added again"); 


        ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, dummyObject); 
    });


}

function getFourCharts(year){
    let TERM = 4; 

    for(let i=0; i<TERM; i++){
        getChartPie("pie", (year+i), "pie"+(i+1), (i+1)); 
    }
}

/*
 * Changed to zing charts. 
 */
function getChartPie(chartType, year, pieid, canvasid){

    let dummyObject = {
        "type":"pie3d",
        "title":{
            "text": "Year: " + year, 
        },
        "scale":{
            "size-factor": 0.7, 
        },
        "series":[ 
            {"text": "Home",
             "values":[59]},  
        ]
    };


    let JobjectPath = "JsonObjects/" + "trend_" + year + "_JO.json"; 


    $.getJSON(JobjectPath, function(data){

        let dummy = dummyObject["series"]; 

        //Primary Object
        let loop2primary = data["data"]; 
        let labelData_Primary = loop2primary["labels"]; 
        loop2primary = loop2primary["datasets"]; 
        let frequency_Primary = loop2primary[0]["data"]; 

        let seriesObj = new Object(); 

        for(let i=0; i<5; i++){
            seriesObj = new Object(); 
            seriesObj.text = labelData_Primary[i]; 
            seriesObj.values = [Number(frequency_Primary[i])]; 
            dummy[i] = seriesObj; 
        }

        zingchart.render({ 
            id : pieid, 
            data : dummyObject, 
            height: 220, 
            width: "100%" 
        });

        //        $('#' + pieid).remove();
        //        $('#Canvas' + canvasid).append("<canvas id=" + "\'" + pieid + "\'" + 'width="350" height="220"></canvas>');
        //        ctx = document.getElementById(pieid).getContext('2d');
        //        var myChart = new Chart(ctx, dummyObject); 
    });
}


/*
 * Presidents: 
 * 1. Barack Obama. 
 * 2. George Bush. 
 * 3. Bill Clinton. 
 * 4. George H W Bush. 
 * 5. Ronald Reagen. 
 * 6. Harry Truman. 
 * 7. Dwight Eisenhower. 
 * 8. FDR. 
 * 9. Abraham Lincoln. 
 * 10. George Washington. 
 */
function getChartPresident(presidentName, chartType, slidernumber){

    let pntermbasis = "";
    if(presidentName == "Donald Trump"){
        pntermbasis = "2017"; 
    }else if(presidentName == "Barack Obama"){
        pntermbasis = "ObamaFullTerm"; 
    }else if(presidentName == "George Bush"){
        pntermbasis = "GWBushFullTerm";    
    }else if(presidentName == "Bill Clinton"){
        pntermbasis = "ClintonFullTerm"; 
    }else if(presidentName == "George H W Bush"){
        pntermbasis = "GHWBushFullTerm"; 
    }else if(presidentName == "Ronald Reagen"){
        pntermbasis = "RonaldRaeganFullTerm"; 
    }else if(presidentName == "Harry Truman"){
        pntermbasis = "HarryTrumanFullTerm"; 
    }else if(presidentName == "Franklin D Roosevelt"){
        pntermbasis = "FDRFullTerm"; 
    }else if(presidentName == "Dwight Eisenhower"){
        pntermbasis = "DwightEisenhowerFullTerm"; 
    }else if(presidentName == "Abraham Lincoln"){
         pntermbasis = "AbrahamLincolnFullTerm"; 
    }else if(presidentName == "George Washington"){
        pntermbasis = "WashingtonFullTerm"; 
    }

    getChartYear(pntermbasis, chartType, slidernumber); 

}

/**
 * function to generate word cloud. 
 * 1. Andrew Jackson
 * 2. James Madison
 * 3. James Monroe
 * 4. Theodore Roosevelt
 * 5. Thomas Jefferson
 * 6. Woodrow Wilson
 * 
 * @param currentPresident: Takes president name. 
 */
function getWordCloudPresident(currentPresident){

    let pntermbasis = "";
    let id = "";
    if(currentPresident == "Andrew Jackson"){
        pntermbasis = "WordCloudAndrewJackson";
        id = "canvas0";
    }else if(currentPresident == "James Madison"){
        pntermbasis = "WordCloudJamesMadison"; 
        id = "canvas1";
    }else if(currentPresident == "James Monroe"){
        pntermbasis = "WordCloudJamesMonroe"; 
        id = "canvas2";
    }else if(currentPresident == "Theodore Roosevelt"){
        pntermbasis = "WordCloudTheodoreRoosevelt"; 
        id = "canvas3";
    }else if(currentPresident == "Thomas Jefferson"){
        pntermbasis = "WordCloudThomasJefferson"; 
        id = "canvas4";
    }else if(currentPresident == "Woodrow Wilson"){
        pntermbasis = "WordCloudWoodrowWilson"; 
        id = "canvas5";
    }

    let JobjectPath = "JsonObjects/" + pntermbasis + "_WCJO.json"; 

    $.getJSON(JobjectPath, function(data){

        var myConfig = JSON.stringify(data);  
        zingchart.render({ 
            id: id,
            data: myConfig, 
            height: '450', 
            width: '850' 
        });
    });


}

/**
 * To retrieve chart based on year. 
 * 
 * Notes for UI: 
 * canvas ID used: canvasNew
 * Div ID used: myChart
 * 
 *  <div id="myChart">
 *      <canvas id="canvasNew" width="800" height="650"></canvas>
 *  </div>
 * 
 * @param chartType: different chart types. 
 * @param year: filtering based on year. 
 * @param slidernumber:  amount of data set to display. 
 */
function getChartYear(year, chartType, slidernumber){

    let dummyObject = {
        type: 'bar',
        data: {
            labels: ["Red"],
            datasets: [{
                label: 'Word Frequency',
                data: [12],
                /* fixed background color and border color to RED */
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255,99,132,1)'],
                borderWidth: 1.0
            }]
        },
        options: {
            responsive: false,
        }
    }; 

    let JobjectPath = "JsonObjects/" + year + "_JO.json"; 


    $.getJSON(JobjectPath, function(data){
        dummyObject["type"] = chartType; 

        let loop2 = dummyObject["data"]; 
        let labelData = loop2["labels"];
        loop2 = loop2["datasets"]
        let frequency = loop2[0]["data"]; 

        let backgroundColor = loop2[0]["backgroundColor"]; 
        let borderColor = loop2[0]["borderColor"]; 

        //Primary Object
        let loop2primary = data["data"]; 
        let labelData_Primary = loop2primary["labels"]; 
        loop2primary = loop2primary["datasets"]; 
        let frequency_Primary = loop2primary[0]["data"]; 
        let backgroundColor_Primary = loop2primary[0]["backgroundColor"]; 
        let bordercolor_Primary = loop2primary[0]["borderColor"]; 

        for(let i=0; i<slidernumber; i++){
            labelData[i] = labelData_Primary[i]; 
            frequency[i] = frequency_Primary[i];
            backgroundColor[i] = backgroundColor_Primary[i]; 
            borderColor[i] = bordercolor_Primary[i]; 
        }


        /* Fix for chart js displaying old chart data.   */
        //            console.log("Removed"); 
        $('#myChart').remove();
        $('#Canvas').append('<canvas id="myChart" width="850 !important;" height="400 !important;"></canvas>');
        //            console.log("Added again"); 


        ctx = document.getElementById("myChart").getContext('2d');
        var myChart = new Chart(ctx, dummyObject); 
    });
}