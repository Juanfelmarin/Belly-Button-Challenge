//loading url via d3 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


//Drop down menu for interacting with samples
function init() {
    d3.json(url).then(function (data) {
        let names = data.names;
        let menu = d3.select('#selDataset');
        names.forEach(value => {
            menu.append('option').text(value);
        })
        Bar(names[0]);
    })
};

// creating the bar chart and bubble chart
function Bar(subject_id) {
    d3.json(url).then(function(data){
    let sample_list = data.samples;
    let ID = sample_list.filter(sample => sample.id === subject_id)[0];
    let otuID = ID.otu_ids.slice(0,10).reverse();
    let otuVals = ID.sample_values.slice(0,10).reverse();
    let otuLabels = ID.otu_labels.slice(0, 10).reverse();
    h_trace = 
        {
            x: otuVals,
            y: otuID.map(object => 'OTU ' + object),
            name: otuLabels,
            type:'bar',
            orientation: 'h',
            marker: {
                color: "black"
            }
        };
        let barLayout = {
            width: 400,
            height: 300,
            margin: {
              t: 30,
              b: 0
            }
          };
    let h_data = [h_trace];
    Plotly.newPlot('bar', h_data, barLayout);

    let bubbleTrace = {
        x: ID.otu_ids,
        y: ID.sample_values,
        mode: 'markers',
        marker: {
            size: ID.sample_values,
            color: ID.otu_ids,
            colorscale: 'red'
        },
        text: ID.otu_labels,
    };
    let bubbleData = [bubbleTrace];
     let bubbleLayout = {
        width: 1100,
      height: 700,
      xaxis: {
        title: {
          text: 'OTU Sample',
          }
      },
      margin: {
        t:0
      }
    };

    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    })

};

//Function change subject id 
function optionChanged(subject_id) {
    Bar(subject_id);
};
init();