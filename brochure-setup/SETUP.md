# Zahter website forms — Google Sheet setup (about 5 minutes)

The private dining enquiry form and the brochure download form on zahter.co.uk/private-dining both send to one
Google Apps Script, which writes each submission to a Google Sheet (tabs "Enquiries" and "Brochure downloads") and
emails reservation@zahter.co.uk and charles@thewonder.group. Until you paste the script URL into site.js, both forms
fall back to the old behaviour (open an email / open the PDF).

## 1. Create the Sheet
1. In Google Drive (the thewonder.group account is fine), create a new Google Sheet called "Zahter website forms".
2. Extensions → Apps Script.
3. Delete the sample code, paste in the contents of Code.gs, and save (Ctrl/Cmd+S).
   - To change who gets the notification emails, edit the NOTIFY block at the top (one line per form).

## 2. Deploy it as a web app
1. Click Deploy → New deployment.
2. Click the gear next to "Select type" → Web app.
3. Description: "brochure form". Execute as: **Me**. Who has access: **Anyone**.
4. Click Deploy, then Authorise access when Google asks (choose your account → Advanced → Go to … (unsafe) → Allow.
   It says "unsafe" only because it's your own unpublished script).
5. Copy the Web app URL — it looks like https://script.google.com/macros/s/AKfycb.../exec

## 3. Put the URL in the site
1. Open site.js — line 2 reads:
   `window.ZAHTER_FORMS_ENDPOINT='';`
2. Paste the URL between the quotes.
3. Upload site.js to the repo along with the other files.

## 4. Test it
Open zahter.co.uk/private-dining/ and send a test enquiry: the form is replaced by a thank-you message, a row appears
in the "Enquiries" tab within a few seconds, and the notification email arrives at both addresses (reply-to is the
guest's address, so Zahter can just hit reply). Then click "Download the brochure" and do the same: PDF opens, row in
"Brochure downloads", email arrives.

## Notes
- If you ever edit Code.gs, you must Deploy → Manage deployments → pencil icon → Version: New version → Deploy,
  otherwise the live URL keeps running the old code. The URL itself doesn't change.
- Gmail quota for MailApp is 100 emails/day on a free account, 1,500/day on Workspace — plenty.
- The PDF lives at /docs/zahter-private-dining-events.pdf. It's not linked anywhere except after the form,
  and /docs/ is excluded in robots.txt so it won't show up in Google. Anyone who has the link can still open it —
  that's normal for a lead-gen brochure on a static site.
- To swap the brochure for a new version, overwrite that one PDF file in the repo.
- GTM: the forms push `private_dining_enquiry`, `brochure_open` and `brochure_download` events to the dataLayer,
  so Jamil can set up triggers to fire Meta Lead events.
- If the script ever fails (quota, outage), the enquiry form shows an error with a direct email link, so nothing is
  lost silently.
