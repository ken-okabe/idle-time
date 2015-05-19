var rebootingTime = (0 * 60 + 20)*1000;

var x11 = require('x11');
x11.createClient(function(err, display) {
    var X = display.client;
    X.require('screen-saver', function(err, SS)
    {
      var f = function()
      {
        SS.QueryInfo(display.screen[0].root, function(err, info)
        {
            console.log('Idle time', info.idle);

            if (info.idle > rebootingTime)
            {
              console.log('rebooting...');
              clearInterval(t);

              var exec = require('child_process').exec;
              var puts = function(error, stdout, stderr)
                                { console.log(stdout) };
              exec("shutdown -h now", puts);
            }
        });
      };
      var t = setInterval(f,1000);

    });
    X.on('error', console.error);
});
