This is a fork of the [Kiwix-html5](https://github.com/sharun-s/kiwix-html5) which is itself a fork of [Kiwix-js](https://github.com/kiwix/kiwix-js), mainly to test new features with a focus on loading .ZIM archives over XHR and HTTP, for use on minimal openwrt routers that only static webservers will run on. In this mode all you need to read and search a ZIM Archive (an **offline** full archive of Wikipedia/Stackoverflow/KhanAcademy etc) is a browser. 

1. Find and download an offline archive [here](http://www.kiwix.org/downloads/)
2. Download the code [here](https://github.com/nixcamic/kiwix-html5/archive/dev.zip)  
Unzip to a folder and click on index.html
3. Point the app at the location of the ZIM file downloaded in step 1.  (TODO: Load from URL, ATM must manually pass archive as parameter)
  
**Thats it!** You are ready to start browsing an offline version of Wikipedia.

**Browser Compatibility:**  
This code has been tested on Firefox.