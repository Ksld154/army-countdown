document.addEventListener('DOMContentLoaded', () => {
  let body = document.body;
  body.classList.toggle('light-theme');

  plotProgressChart();
  let chartInterval = setInterval(plotProgressChart, 1000 * 60);


  // Unix timestamp (in seconds) to count down to
  let targetTime = moment.tz("2023-03-29 17:00", "Asia/Taipei").unix();

  // Set up FlipDown
  var flipdown = new FlipDown(targetTime, {
    theme: "light",
    headings: ["", "", "", ""],
  })

    // Start the countdown
    .start()

    // Do something when the countdown ends
    .ifEnded(() => {
      console.log('The countdown has ended!');
      clearInterval(chartInterval);
    });

});


function plotProgressChart() {
  // Grab the current date
  let currentDate = new Date();

  // calculate date progress
  let startDate = moment.tz("2022-12-06 00:00", "Asia/Taipei");
  let targetDate = moment.tz("2023-03-29 17:00", "Asia/Taipei");
  let totalDuration = Math.round((targetDate - startDate) / 1000);

  let passedTime = (currentDate - startDate) / 1000;
  let percent = (passedTime / totalDuration) * 100;
  let roundedPercent = Math.round(percent * 1000) / 1000;
  console.log(roundedPercent);


  // draw pie chart
  let chart = document.getElementById("count-down");
  chart.setAttribute("data-percent", roundedPercent);
  chart.textContent = roundedPercent + "%";

  new EasyPieChart(chart, {
    size: 230,
    barColor: function (percent) {
      var ctx = this.renderer.getCtx();
      var canvas = this.renderer.getCanvas();
      var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#00f7ff");
      gradient.addColorStop(1, "#ff00c4");
      return gradient;
    },
    scaleLength: 0,
    lineWidth: 15,
    trackColor: "#373737",
    lineCap: "circle",
    animate: 2000,
  });

}