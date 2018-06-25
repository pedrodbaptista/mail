var imap = require('imap')

var inspect = require('util').inspect;
var body = ";"
var imap = new imap({
  user: 'pedrodbaptistatest@gmail.com',
  password: 'Katia123',
  host: 'imap.gmail.com',
  port: 993,
  tls: true
});

// imap.on('ready', function() {
//     imap.openBox('INBOX', true, function() {
//       var f = imap.seq.fetch(1);
//       f.on('message', function(m) {
//         m.once('attributes', function(attrs) {
//           result = attrs;
//         });
//       });
//       f.on('end', function() {
//         srv.close();
//         imap.end();
//       });
//     });
//   });
// imap.connect();


function openInbox(cb) {
  imap.openBox('INBOX', true, cb);
}

// imap.once('ready', function() {
//     openInbox(function(err, box) {
//       if (err) throw err;
//       var f = imap.seq.fetch('1:3', {
//         bodies: 'HEADER.FIELDS (FROM TO SUBJECT DATE)',
//         struct: true
//       });
//       f.on('message', function(msg, seqno) {
//         console.log('Message #%d', seqno);
//         var prefix = '(#' + seqno + ') ';
//         imap.on('ready', function() {
//             imap.openBox('INBOX', true, function() {
//               var f = imap.seq.fetch(1, { bodies: ['TEXT'] });
//               f.on('message', function(m) {
//                 m.on('body', function(stream, info) {
//                   bodyInfo = info;
//                   stream.on('data', function(chunk) { body += chunk.toString('utf8'); });
//                 });
//                 m.on('attributes', function(attrs) {
//                   result = attrs;
//                 });
//               });
//               f.on('end', function() {
//                 srv.close();
//                 imap.end();
//               });
//             });
//           });
//         msg.once('attributes', function(attrs) {
//           console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
//         });
//         msg.once('end', function() {
//           console.log(prefix + 'Finished');
//         });
//       });
//       f.once('error', function(err) {
//         console.log('Fetch error: ' + err);
//       });
//       f.once('end', function() {
//         console.log('Done fetching all messages!');
//         imap.end();
//       });
//     });
//   });
  
//   imap.once('error', function(err) {
//     console.log(err);
//   });
  
//   imap.once('end', function() {
//     console.log('Connection ended');
//   });
imap.on('ready', function() {
    imap.openBox('INBOX', true, function() {
      var f = imap.seq.fetch(1, { bodies: ['TEXT'] });
      f.on('message', function(m) {
        m.on('body', function(stream, info) {
          bodyInfo = info;
          stream.on('data', function(chunk) { 
              body += chunk.toString('utf8'); 
            });
        });
        m.on('attributes', function(attrs) {
          result = attrs;
        });
      });
      f.on('end', function() {
        srv.close();
        imap.end();
      });
    });
  });
  imap.connect();
