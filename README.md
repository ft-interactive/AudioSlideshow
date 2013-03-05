Audio Slideshow
===============

Look mum no hands!

### For Journalists

* Getting started
* How to make an Audio Slideshow Google Spreadsheet (gss)
* Using the the No Hands Template
* Working with images
* Publishing
* FAQs

### For Developers

* Overview
* Hacking
* Developing locally
* Releasing/Deploying
* Tools etc.


## Super quick start

1. In Google Drive navigate to the 'IG Audio Slideshow' shared folder. If you dont have the folder shared with you then please ask. Email team.interactive@ft.com
1. Click Create > From Template. Agree the the 'Create and Share' dialog.
1. In the Template Gallery, find the 'IG Audio Slideshow' template and click 'Use this template'.
1. The spreadsheet will open. To fill in the spreadsheet, follow the instructions in the notes on the column headers.
1. Fill in your spreadsheet and put images in a folder on the interactive server. See the 'For journalists' section above.
1. Get the ID from the address bar of the Spreadsheet.
![the ID follows ?key=](https://www.evernote.com/shard/s213/sh/182fd935-a575-4517-874d-5b1af7f0d783/acd0b2ae49fef147f5df73204a437398/res/7bc6ccac-ceea-425e-9f2f-8660441d08cd/skitch.png)
1. Check the trigger publish trigger is enabled.
1. Substitute the ID into the template URL: [http://ig.ft.com/nohands/audioss/0.0.1/?id=SpreadsheetID]
1. Use the following IFRAME snippet in Methode. Again substitute the Spreadsheet ID.

```html
<iframe src="http://ig.ft.com/nohands/audioss/0.0.1/?id=SpreadsheetID" 
			width="972" height="790" scolling="no" style="border:0 none;" frameborder="0">
</iframe>
```