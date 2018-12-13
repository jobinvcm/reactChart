import React, { Component } from 'react';
import logo from './logo.svg';
import {Form, FormGroup, Input, Label, Button } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css'
import Axios from 'axios';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      name: '',
      email: '',
      message: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  async handleSubmit(e) {
    const {name, email, message} = this.state;

    const form = await Axios.post('/api/form', {
      name: name,
      email: email,
      message: message,
    });
  }

  componentDidMount() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.paddingRight = 20;

    let data = [];
    let visits = 10;
    for (let i = 1; i < 120; i++) {
      let visitsLast = Math.round((Math.random() * 100)  + 1);
      let visitsCurrent = Math.round((Math.random() * 100)  + 1);
      data.push({ date: new Date(2018, 2, i), name: "name" + i, valueLast: visitsLast, valueCurrent: visitsCurrent });
    }

    chart.data = data;
    console.log(data);

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35; 

    let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis2.tooltip.disabled = true;
    valueAxis2.renderer.minWidth = 35; 

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "valueLast";

    series.tooltipText = "Last Year - {valueLast}";

    chart.cursor = new am4charts.XYCursor();

    let series2 = chart.series.push(new am4charts.ColumnSeries());
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "valueCurrent"
    series2.yAxis = valueAxis2;

    series2.columns.template.tooltipText = "{date} - ${valueCurrent}"

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;

    this.chart = chart;
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }


  render() {
    return (
      <div className="App">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="message">Message</Label>
            <Input
              type="textarea"
              name="message"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button>SUBMIT</Button>
        </Form>

         <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
      </div>
    );
  }
}

export default App;
