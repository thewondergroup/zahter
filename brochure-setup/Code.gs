// Zahter website forms — Google Apps Script backend
// Handles: private dining enquiries (type=private_dining) and brochure downloads (type=brochure).
// Paste into Extensions → Apps Script inside the leads Google Sheet, then Deploy → New deployment → Web app
// (Execute as: Me · Who has access: Anyone). Put the web app URL into site.js: window.ZAHTER_FORMS_ENDPOINT='...';

var NOTIFY = {
  private_dining: 'reservation@zahter.co.uk, charles@thewonder.group',
  brochure:       'reservation@zahter.co.uk, charles@thewonder.group'
};

function doPost(e) {
  var p = (e && e.parameter) || {};
  var type = p.type === 'private_dining' ? 'private_dining' : 'brochure';
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (type === 'private_dining') {
    var sh = sheet(ss, 'Enquiries', ['Timestamp', 'Name', 'Email', 'Phone', 'Date', 'Guests', 'Time of day', 'Occasion', 'Notes', 'Page']);
    sh.appendRow([new Date(), p.name || '', p.email || '', p.phone || '', p.date || '', p.guests || '', p.slot || '', p.occasion || '', p.notes || '', p.page || '']);
    notify(NOTIFY.private_dining, p.email,
      'Private dining enquiry — ' + (p.date || 'date TBC') + ' — ' + (p.name || ''),
      'New private dining enquiry from the website.\n\n' +
      'Name:        ' + (p.name || '') + '\n' +
      'Email:       ' + (p.email || '') + '\n' +
      'Phone:       ' + (p.phone || '') + '\n' +
      'Date:        ' + (p.date || '') + '\n' +
      'Guests:      ' + (p.guests || '') + '\n' +
      'Time of day: ' + (p.slot || '') + '\n' +
      'Occasion:    ' + (p.occasion || '') + '\n\n' +
      'Notes:\n' + (p.notes || '') + '\n\n' +
      'Reply to this email to answer the guest directly.\nSheet: ' + ss.getUrl());
  } else {
    var sh2 = sheet(ss, 'Brochure downloads', ['Timestamp', 'Name', 'Email', 'Phone', 'Page', 'Source']);
    sh2.appendRow([new Date(), p.name || '', p.email || '', p.phone || '', p.page || '', p.source || 'website']);
    notify(NOTIFY.brochure, p.email,
      'Zahter brochure download — ' + (p.name || p.email || ''),
      'Someone downloaded the private dining & events brochure.\n\n' +
      'Name:  ' + (p.name || '') + '\n' +
      'Email: ' + (p.email || '') + '\n' +
      'Phone: ' + (p.phone || '') + '\n\n' +
      'Sheet: ' + ss.getUrl());
  }

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}

function sheet(ss, name, headers) {
  var sh = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
  return sh;
}

function notify(to, replyTo, subject, body) {
  if (!to) return;
  try {
    var opts = { to: to, subject: subject, body: body };
    if (replyTo && /@/.test(replyTo)) opts.replyTo = replyTo;
    MailApp.sendEmail(opts);
  } catch (err) { /* quota or bad address — the row is still saved in the Sheet */ }
}

// Opening the web app URL in a browser should show this.
function doGet() {
  return ContentService.createTextOutput('Zahter forms endpoint OK');
}
