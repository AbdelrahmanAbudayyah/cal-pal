// Import external libraries.
const express = require('express');
const cors = require('cors');
const session = require('express-session');

// Import your own session secret for session cookies. Ideally should be a
// string with 32 bytes of entropy generated with a CSPRNG, but unless this
// is production code it doesn't really matter.
const sessionInfo = require('./config/session_info.json');

// Set up the app:

// Create an express application instance.
const app = express();

// Parse any request bodies into JSON instead of string.
app.use(express.json());
// Enable cross origin request from any origin.
const corsOptions = {
    origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200
};
//app.use(cors(corsOptions));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use(
  session({
    secret: sessionInfo.secret,
    resave: false,
    saveUninitialized: false
  })
);

const PORT = process.env.PORT || 2000;

// Set up the http requests.
app.use('/auth', require('./services/auth.js'));
app.use('/user', require('./services/user.js'));
app.use("/calendar", require("./services/calendar.js"));
app.use("/event", require("./services/event.js"));
app.use("/event/type", require("./services/event_type.js"));
app.use("/message", require("./services/message.js"));

app.get('/', (req, res) => {
    res.send('API is running');
});




// Start listening.
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
