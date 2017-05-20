const range = max => {
  const numbers = [];
  for (let i = 0; i < max; i++)
    numbers.push(i);
  return numbers;
};

export default class Controller {
  constructor(httpProxy, $interval, $q) {
    console.log("Ctrl construido");
    this.httpProxy = httpProxy;
    this.$interval = $interval;
    this.count = 0;
    this.remaining = null;
    this.callDelay = 5;
    this.interval = null;
    this.callAmount = 20;
    this.calls = [];
  }

  $onInit() {

  }

  callOnce() {
    this.httpProxy.get("http://localhost:9091/comics")
        .then(response => {
          this.count = response.data.count;
          this.remaining = response.data.remaining
        }, error => console.error(error));
  }

  startCalling() {
    this.interval = this.$interval(() => this.callOnce(), this.callDelay);
  }

  stopCalling() {
    this.$interval.cancel(this.interval);
  }

  callMany() {
    this.calls = range(this.callAmount).map(n => {
      return this.httpProxy.get("http://localhost:9091/comics");
    });
  }
}

Controller.$inject = ['httpProxy', '$interval', '$q'];