/**
 * TODO: 
 * Issue: old chart data being displayed, destroy old chart before showing new chart. 
 * 
 * Additional Enhancements: 
 * 1. Color, Scaling, etc.. Visual tweaks
 *
 */

$("document").ready(function(){


    $('#clickMe').click(function(){

        let dummyObject = {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: 'Frequency of Words',
                    data: [12, 19, 3, 5, 2, 3],
                    /* fixed background color and border color to RED */
                    backgroundColor: ['rgba(255, 99, 132, 1.0)'],
                    borderColor: ['rgba(255,99,132,1)'],
                    borderWidth: 1.0
                }]
            },
            options: {
                legend: {
                    display: true,
                    position: 'right',

                },
                responsive: false,
                //            scales: {
                //                yAxes: [{
                //                    ticks: {
                //                        beginAtZero:true
                //                    }
                //                }]
                //            }
            }
        }; 
        let year = $("#year").val(); 
        let graphType = $("#graphType").val();
        let JobjectPath = "JsonObjects/" + year + "_JO.json"; 

        /** TODO: Retrieve slider number here. **/
        let slidernumber = 20; 

        $.getJSON(JobjectPath, function(data){
            dummyObject["type"] = graphType; 

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
            backgroundColor[0] = "rgba(22, 217,35,1.0)"; 


            /* Fix for chart js displaying old chart data.   */
            //            console.log("Removed"); 
            $('#canvasNew').remove();
            $('#myChart').append('<canvas id="canvasNew" width="800" height="650"></canvas>');
            //            console.log("Added again"); 

            ctx = document.getElementById("canvasNew").getContext('2d');
            var myChart = new Chart(ctx, dummyObject); 
        });
    });
});


