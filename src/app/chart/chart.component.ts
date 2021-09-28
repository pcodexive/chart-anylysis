import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import studentsData from './data.json';
import * as _ from 'lodash';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  filterOptions:any = [
    { value: 'analysis', viewValue: 'Analysis' },
  ];
  selectedResult = 'analysis';
  tasks: any = [{
    name: 'BY Count',
    completed: true,
    selected: true,
    subtasks: [
      { name: 'Total Attempt', completed: true},
      { name: 'Correct Attempts', completed: true},
      { name: 'Wrong Attempt', completed: true},
      { name: 'Not Attempted', completed: true}
    ]
    },
    {
      name: 'BY Percent',
      completed: false,
      selected: false,
      subtasks: [
        { name: 'Correct Percentage', completed: false },
        { name: 'Wrong Percentage', completed: false },
        { name: 'Attempt Percentage', completed: false },
      ]
    }];
  chart: am4charts.XYChart;
  chart2: am4charts.XYChart;
  students:any = studentsData;
  data1: any = [];
  data2: any = [];
  allType: any = [];
  constructor() { }

  ngOnInit(): void {
   this.handleFilter();
   this.handleFilter2();
  }

  handleFilter(){
    this.data1 = [];
    if (this.tasks[0].selected){
      for (let i = 0; i < this.students.length; i++) {
        const TotalAttemptValue = [];
        const CorrectAttemptsValue = [];
        const WrongAttemptValue = [];
        const NotAttemptedValue = [];
        const obj = {
          "question": 'q' + (i + 1),
        }
        if (this.tasks[0].subtasks[0].completed){
          Object.keys(this.students[i]).forEach(key => {
            if (this.students[i][key] == 1 || this.students[i][key] == 0) {
              TotalAttemptValue.push(key)
            }
          })
          obj["TotalAttempt"] = TotalAttemptValue.length;
           
        }
        if (this.tasks[0].subtasks[1].completed) {
          Object.keys(this.students[i]).forEach(key => {
            if (this.students[i][key] == 1) {
              CorrectAttemptsValue.push(key)
            }
          })
          obj["CorrectAttempts"] = CorrectAttemptsValue.length;
        }
        if (this.tasks[0].subtasks[2].completed) {
          Object.keys(this.students[i]).forEach(key => {
            if (this.students[i][key] == 0) {
              WrongAttemptValue.push(key)
            }
          })
          obj["WrongAttempt"] = WrongAttemptValue.length;
        }
        if (this.tasks[0].subtasks[3].completed) {
          Object.keys(this.students[i]).forEach(key => {
            if (this.students[i][key] == -1) {
              NotAttemptedValue.push(key)
            }
          })
          obj["NotAttempted"] = NotAttemptedValue.length;
        }
        
        this.data1.push(obj);
      }
    }
    if (this.tasks[1].selected){
      for (let i = 0; i < this.students.length; i++) {
        const TotalAttemptValue = [];
        const CorrectAttemptsValue = [];
        const WrongAttemptValue = [];
        const NotAttemptedValue = [];
        const obj = {
          "question": 'q' + (i + 1),
        }
        if (this.tasks[1].subtasks[0].completed){
          Object.keys(this.students[i]).forEach(key => {
            if (this.students[i][key] == 1 || this.students[i][key] == 0) {
              TotalAttemptValue.push(key)
            }
          })
          obj["TotalAttempt"] = TotalAttemptValue.length;
           
        }
        if (this.tasks[1].subtasks[1].completed) {
          Object.keys(this.students[i]).forEach(key => {
            if (this.students[i][key] == 1) {
              CorrectAttemptsValue.push(key)
            }
          })
          obj["CorrectAttempts"] = CorrectAttemptsValue.length;
        }
        if (this.tasks[1].subtasks[2].completed) {
          Object.keys(this.students[i]).forEach(key => {
            if (this.students[i][key] == 0) {
              WrongAttemptValue.push(key)
            }
          })
          obj["WrongAttempt"] = WrongAttemptValue.length;
        }
        
        
        this.data1.push(obj);
      }
    }
   
  }

  handleFilter2(){
    this.allType = _.uniq(_.map(this.students, 'type'));
    for (let i = 0; i < this.allType.length; i++) {
      const obj = {
        "question": this.allType[i],
      }
      const allSameArray = _.filter(this.students, { type: this.allType[i]});
      const CorrectAttemptsValue = [];
      const WrongAttemptValue = [];
      const NotAttemptedValue = [];
      for (let i = 0; i < allSameArray.length; i++) {
        Object.keys(allSameArray[i]).forEach(key => {
            if (allSameArray[i][key] == 1) {
              CorrectAttemptsValue.push(key)
            }
          })
        obj["CorrectAttempts"] = CorrectAttemptsValue.length * 100 / (allSameArray.length * 30 );
        Object.keys(allSameArray[i]).forEach(key => {
          if (allSameArray[i][key] == 0) {
            WrongAttemptValue.push(key)
          }
        })
        obj["WrongAttempt"] = WrongAttemptValue.length * 100 / (allSameArray.length * 30);
        Object.keys(allSameArray[i]).forEach(key => {
          if (allSameArray[i][key] == -1) {
            NotAttemptedValue.push(key)
          }
        })
        obj["NotAttempted"] = NotAttemptedValue.length * 100 / (allSameArray.length * 30);
      }
      this.data2.push(obj);
     
    }
  }

  loadNewData() {
    this.loadChart1();
  }

  ngAfterViewInit(){
    this.loadChart1()
    this.loadChart2()
  }

  loadChart1(){
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    // Add data
    chart.data = this.data1;

    // Create axes
    let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "question";
    categoryAxis.numberFormatter.numberFormat = "#";
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.cellStartLocation = 0.1;
    categoryAxis.renderer.cellEndLocation = 0.9;

    let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.opposite = true;
    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.start = 0.6;
    chart.colors.list = [
      am4core.color("#67B7DC"),
      am4core.color("#73D672"),
      am4core.color("#F2A300"),
      am4core.color("#dee2e6")
    ];
    // Create series
    function createSeries(field, name, percentage) {
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = field;
      series.dataFields.categoryY = "question";
      series.name = name;
     
      series.columns.template.height = am4core.percent(100);
      if (percentage) {
        series.sequencedInterpolation = true;
        series.calculatePercent = true;
        series.dataFields.valueYShow = "changePercent";
        // series.stacked = true;
        series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryY}: [bold]{valueX.percent}%[/] ({valueX})";
      }else{
        series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
      }
      series.columns.template.width = am4core.percent(60);
      let valueLabel = series.bullets.push(new am4charts.LabelBullet());
      if (percentage) {
        // valueLabel.label.text = "{valueX.percent}%";
      }else{
        valueLabel.label.text = "{valueX}";
      }
      valueLabel.label.horizontalCenter = "left";
      valueLabel.label.dx = 10;
      valueLabel.label.hideOversized = false;
      valueLabel.label.truncate = false;

      let categoryLabel = series.bullets.push(new am4charts.LabelBullet());
      categoryLabel.label.horizontalCenter = "right";
      categoryLabel.label.dx = -10;
      categoryLabel.label.fill = am4core.color("#fff");
      categoryLabel.label.hideOversized = false;
      categoryLabel.label.truncate = false;
    }

    if (this.tasks[0].selected){
    createSeries("TotalAttempt", "TotalAttempt", false);
    createSeries("CorrectAttempts", "CorrectAttempts", false);
    createSeries("WrongAttempt", "WrongAttempt", false);
    createSeries("NotAttempted", "NotAttempted", false);
    } if (this.tasks[1].selected){
      createSeries("CorrectAttempts", "CorrectPercentage", this.tasks[1].selected);
      createSeries("WrongAttempt", "WrongPercentage", this.tasks[1].selected);
      createSeries("TotalAttempt", "AttemptedPercentage", this.tasks[1].selected);
    }
    this.chart = chart;
  }


  loadChart2(){
    am4core.useTheme(am4themes_animated);

    // Create chart instance
    let chart = am4core.create("chartdiv2", am4charts.XYChart);

    // Add data
    chart.data = this.data2

    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "question";
    categoryAxis.renderer.grid.template.location = 0;

    chart.numberFormatter.numberFormat = "#.#'%'";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 100;
    valueAxis.strictMinMax = true;
    valueAxis.min = 0;

    chart.colors.list = [
      am4core.color("#67B7DC"),
      am4core.color("#73D672"),
      am4core.color("#F2A300"),
      am4core.color("#dee2e6")
    ];
    // Create series
    function createSeries(field, name) {

      // Set up series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.name = name;
      series.dataFields.valueY = field;
      series.dataFields.categoryX = "question";
      series.sequencedInterpolation = true;
      series.calculatePercent = true;
      series.dataFields.valueXShow = "changePercent";
      series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: [bold]{valueY.percent}%[/]";
      // Make it stacked
      series.stacked = true;

      // Configure columns
      series.columns.template.width = am4core.percent(60);
      // series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";

      // Add label
      let labelBullet = series.bullets.push(new am4charts.LabelBullet());
      labelBullet.label.text = "{valueY}";
      labelBullet.locationY = 0.5;
      labelBullet.label.hideOversized = true;

      return series;
    }

    createSeries("CorrectAttempts", "Correct Questions");
    createSeries("WrongAttempt", "InCorrect Questions");
    createSeries("NotAttempted", "Non Attempted Questions");

    // Legend
    chart.legend = new am4charts.Legend();
    chart.legend.position = "top"
    this.chart2 = chart;
  }

  updateAllComplete(index) {
    this.tasks[index].completed = this.tasks[index].subtasks != null && this.tasks[index].subtasks.every(t => t.completed);
    for (let i = 0; i < this.tasks.length; i++) {
      if (i != index) {
        this.diselectAll(i)
      }
    }
    this.handleFilter();
    this.loadNewData();
  }

  someComplete(i): boolean {
    if (this.tasks[i].subtasks == null) {
      return false;
    }
    return this.tasks[i].subtasks.filter(t => t.completed).length > 0 && !this.tasks[i].completed;
  }

  setAll(completed: boolean, index) {
    for (let i = 0; i < this.tasks.length; i++) {
      if(i == index){
        this.tasks[i].completed = completed;
        this.tasks[i].selected = completed;
        if (this.tasks[i].subtasks == null) {
          return;
        }
        this.tasks[i].subtasks.forEach(t => t.completed = completed);
      } else {
        this.diselectAll(i)
      }
    }
    this.handleFilter();
    this.loadNewData();
  }

  diselectAll(i){
    this.tasks[i].completed = false;
    this.tasks[i].selected = false;
    if (this.tasks[i].subtasks == null) {
      return;
    }
    this.tasks[i].subtasks.forEach(t => t.completed = false);
  }

}
