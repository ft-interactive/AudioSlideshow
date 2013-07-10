Audio Slideshow
===============

Look mum no hands!

## Super quick start

1. Go to the [FT Spreadsheet templates gallery](https://drive.google.com/a/ft.com/templates?type=spreadsheets).
1. In the Template Gallery, find the **IG Audio Slideshow** template and click **Use this template**.  
![Click the Use this template button](https://www.evernote.com/shard/s213/sh/ddbb96b1-15a9-4ee3-ad8c-620d7c126672/20e9599e0fa3a38b2bdbf6872410229d/deep/0/Screenshot%2005/03/2013%2013:22.jpg) 
1. A new spreadsheet will be created from the template and will opened in your browser.
1. Rename you new Audio Slideshow spreadsheet 
![Rename the spreadsheet](https://www.evernote.com/shard/s213/sh/26ec058b-9fdf-4ace-84bd-ca9c339428da/73da387a14be17ff855bddbd984c4708/deep/0/Screenshot%2010/07/2013%2012:56.png) 
1. Drag the new spreadsheet into the *IG Audio Slideshow* shared folder. If you don't have the folder shared with you then please ask for access to it. Email: [team.interactive@ft.com](team.interactive@ft.com). Once the spreadsheet is in this folder then it will be visible to the Audio Slideshow widget.  
![Drag spreadsheet into the IG Audio Slideshow folder](https://www.evernote.com/shard/s213/sh/ee4a17e1-f8f9-4b15-820b-45c629fb3077/1b16ad344b98ff6cba5f50a6f8532e90/deep/0/Screenshot%2010/07/2013%2012:59.png)  
1. To fill in the spreadsheet, **follow the instructions in the notes** on the column headers. 
1. Put images and audio in a folder on the interactive server and make sure you reference this folder in the options sheet. 
![Fill in the options sheet](https://www.evernote.com/shard/s213/sh/c63411e7-8d7c-4661-bc56-bd4d41a5332a/c588cc2994ff9241021104fa928459a9/deep/0/Screenshot%2010/07/2013%2013:04.png)
1. Get the ID from the address bar of the Spreadsheet.  
![the ID follows ?key=](https://www.evernote.com/shard/s213/sh/88f591e8-f80a-432a-acde-900a06ff24fa/7358be3582da6e81fc84813351f19ff7/deep/0/Screenshot%2005/03/2013%2013:11.jpg)  
1. Check the publish trigger is enabled.  
1. Substitute the ID into the **template URL**: [http://ig.ft.com/nohands/audioss/0.0.1/?id=SpreadsheetID]  
1. Use the following **IFRAME** snippet in **Methode**. Again substitute the Spreadsheet ID.  

```html
	<iframe src="http://ig.ft.com/nohands/audioss/0.0.1/?id=SpreadsheetID" 
			width="972" height="790" scolling="no" style="border:0 none;" frameborder="0">
	</iframe>
```
