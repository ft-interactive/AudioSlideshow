Audio Slideshow
===============

Look mum no hands!

### For Journalists

See the 'Super quick start' section below if you just need a refresher.

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

1. Go to the [FT Spreadsheet templates gallery](https://drive.google.com/a/ft.com/templates?type=spreadsheets).
1. In the Template Gallery, find the **IG Audio Slideshow** template and click **Use this template**.  
![Click the Use this template button](https://www.evernote.com/shard/s213/sh/ddbb96b1-15a9-4ee3-ad8c-620d7c126672/20e9599e0fa3a38b2bdbf6872410229d/deep/0/Screenshot%2005/03/2013%2013:22.jpg)
1. A new spreadsheet will be created from the template and will open in your browser.
1. Rename you new Audio Slideshow spreadsheet
1. Drag the new spreadsheet into the *IG Audio Slideshow* shared folder. If you don't have the folder shared with you then please ask. Email: [team.interactive@ft.com](team.interactive@ft.com). Once the spreadsheet is in this folder then it will be visible to the Audio Slideshow widget. 
![Select IG Audio Slideshow folder](https://www.evernote.com/shard/s213/sh/00a3131f-542c-473a-8c00-ede6bbf5a483/5c79863eae2b86e12013ff477570a4ee/deep/0/Screenshot%2005/03/2013%2013:20.jpg)  
1. To fill in the spreadsheet, **follow the instructions in the notes** on the column headers.
1. Put images and audio in a folder on the interactive server and make sure you reference this folder in the options sheet.
1. Get the ID from the address bar of the Spreadsheet.  
![the ID follows ?key=](https://www.evernote.com/shard/s213/sh/88f591e8-f80a-432a-acde-900a06ff24fa/7358be3582da6e81fc84813351f19ff7/deep/0/Screenshot%2005/03/2013%2013:11.jpg)  
1. Check the trigger publish trigger is enabled.  
1. Substitute the ID into the **template URL**: [http://ig.ft.com/nohands/audioss/0.0.1/?id=SpreadsheetID]  
1. Use the following **IFRAME** snippet in **Methode**. Again substitute the Spreadsheet ID.  

```
	<iframe src="http://ig.ft.com/nohands/audioss/0.0.1/?id=SpreadsheetID" 
			width="972" height="790" scolling="no" style="border:0 none;" frameborder="0">
	</iframe>
```
