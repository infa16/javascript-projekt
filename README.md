#Enkelt jQuery-galleri
Detta är ett enkelt galleri byggt på jQuery.
Det går snabbt att installera, är enkelt att använda och snyggt att titta på. 
Dina bilder hamnar i fokus och kan visas upp genom att du själv bläddrar genom dem, 
eller så startar du en slideshow och bara njuter.

##Installation
Detta plugin kräver att jQuery (3.*) inkluderas på sidan där pluginet används.
 
 Ange följande HTML-kod för att använda pluginet:
 ```HTML
<div id="infa16-gallery"> 
    <img src='1.jpg'/> 
    <img src='2.jpg' title="Bild 2"/> 
    <img src='3.jpg'/> 
</div> 
```

Initiera galleriet med:
```javascript
$(document).ready(function () { 
    $("#infa16-gallery").infa16_gallery({ 
        size: 100, 
        autoplay: 500 
    }); 
}); 
```


##Konfiguration
Du kan ange vilken storlek du vill ha på thumbnails samt hur snabbt slideshowen ska gå, genom att ändra
```javascript
size: 100,
autoplay: 500
```

till valfritt värde.

Om du anger en titel på bilden kommer den att användas som beskrivning till bilden. Anges ingen titel kommer filnamnet att användas.
