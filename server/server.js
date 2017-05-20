const connect = require('connect');
const morgan = require('morgan');
const cors = require('cors');

const wait = seconds => {
  const waitTill = new Date(new Date().getTime() + seconds * 1000);
  while (waitTill > new Date()) {
  }
};

const app = connect();

app.use(morgan('tiny'));
app.use(cors());

const workingRequestCap = 10;
let reqCount = 0;
let mode = 'work';
app.use("/comics", (req, res, next) => {
  if (mode === 'work') {
    console.log(`This the request #${reqCount}`);
    if (++reqCount > workingRequestCap) {
      mode = 'fail';
      console.warn("Client must reauthenticate");
    }
  }
  if (mode === 'fail')
    next(new Error("We're failing now until re-authentication happens"));
  else
    next()
});

app.use("/comics", (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    result: "ok",
    count: reqCount,
    remaining: (workingRequestCap - reqCount)
  }))
});

app.use("/reauthenticate", (req, res) => {
  wait(1);
  mode = 'work';
  reqCount = 0;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({result: "ok"}))
});

app.listen(9091);

console.log('Server running...');
console.log('Try http://localhost:9091/');