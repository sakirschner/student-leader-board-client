<script>
import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
  mixins: [reactiveProp],
  data: () => ({
    options: {
      scales: {
        xAxes: [
          {
            gridLines: { display: false },
            ticks: { fontColor: "#fff", fontSize: "14" },
          },
        ],
        yAxes: [
          {
            gridLines: { display: false },
            ticks: { fontColor: "#fff", fontSize: "14", precision: 0 },
          },
        ],
      },
      legend: {
        display: false,
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
};
</script>
