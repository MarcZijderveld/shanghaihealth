
    var MAP_ZOOM = 15;

    function location(lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this.window = "";
        this.marker = "";
        this.no2 = "";
        this.pm2 = "";
        this.pm10 = "";
    }

    l1 = new location(51.439081, 5.4732041);
    l2 = new location(51.4422918, 5.4733198);
    l3 = new location(51.444723, 5.4784552);
    l4 = new location(51.4519482, 5.4774798);
    l5 = new location(51.4434067, 5.476368);

    locations = [l1, l2, l3, l4, l5];

    var openWindow = null;

    if(Meteor.isServer) {
        Meteor.methods({
            checkno2: function (lat, lng, index) {
                this.unblock();
                return Meteor.http.call("GET", "http://web-ecodistrict.tno.nl/tiler/TilerWebService.dll/point?layer=" + "1" + "&lat=" + lat + "&lon=" + lng);
            },
            checkpm2: function (lat, lng, index) {
                this.unblock();
                return Meteor.http.call("GET", "http://web-ecodistrict.tno.nl/tiler/TilerWebService.dll/point?layer=" + "2" + "&lat=" + lat + "&lon=" + lng);
            },
            checkpm10: function (lat, lng, index) {
                this.unblock();
                return Meteor.http.call("GET", "http://web-ecodistrict.tno.nl/tiler/TilerWebService.dll/point?layer=" + "3" + "&lat=" + lat + "&lon=" + lng);
            }
            //})
        });
    }

    if (Meteor.isClient) {

        Meteor.startup(function()
        {
            GoogleMaps.load();
        });

        StartMap();

        function CheckData()
        {
            if(!Session.equals("no5", undefined) && !Session.equals("pm25")&& !Session.equals("pm105"))
            {
                SetMarkers();
                GoogleMaps.initialize();
            }
            else {
                window.setTimeout(CheckData, 200);
                console.log("check");
            }
        }

        for (var i = 0; i < locations.length; i++)
        {
            Meteor.call("checkno2", locations[i].lat, locations[i].lng, i, function (error, results) {
                var no2 = JSON.parse(results.content).value; //results.data should be a JSON obje
                Session.set("no"+i, no2);
            });
            Meteor.call("checkpm2", locations[i].lat, locations[i].lng, i, function (error, results) {
                var no2 = JSON.parse(results.content).value; //results.data should be a JSON obje
                Session.set("pm2"+i, no2);
            });
            Meteor.call("checkpm10", locations[i].lat, locations[i].lng, i, function (error, results) {
                var no2 = JSON.parse(results.content).value; //results.data should be a JSON obje
                Session.set("pm10"+i, no2);
            });
        }

        CheckData();
    }

    function SetMarkers()
    {
        //Template.body.onCreated(function()
        //{
            GoogleMaps.ready('map', function(map)
            {
                var markers = [];

                console.log("settings tuff");

                var icon = new google.maps.MarkerImage(
                    "imgs/marker.png", //url

                    new google.maps.Size(50, 50), // scaled size

                    new google.maps.Point(0, 0), // origin

                    new google.maps.Point(0, 0) // anchor

                );

                for (var i = 0; i < locations.length; i++) {

                    var marker = new google.maps.Marker({
                        animation: google.maps.Animation.DROP,
                        icon: icon,
                        position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
                        map: map.instance
                    });

                    //Create a content window for the picture with additional information.
                    var content =
                        '<h5>Air Quality Statistics</h5>' +
                        '<b>NO2:</b> ' + Session.get("no5") +
                        '</br><b>PM2.5:</b>  ' + Session.get("pm25")+
                        '</br><b>PM10:</b>  ' + Session.get("p105");

                    //Initiate the content window with properties.
                    var infowindow = new google.maps.InfoWindow(
                        {
                            content: content
                        });

                    //Add the event listener to the marker.
                    google.maps.event.addListener(marker, "click", function () {
                        //Close the open window if needed.
                        if (openWindow != undefined) {
                            openWindow.close();
                        }
                        infowindow.open(map.instance, marker);
                        //Set the new current window.
                        openWindow = infowindow;
                    });

                    markers[i] = marker;
                }

                // Center and zoom the map view onto the current position.
                map.instance.setCenter(markers[0].getPosition());
                map.instance.setZoom(MAP_ZOOM);
            });
        //});
    }

    function StartMap()
    {
        Template.map.onCreated(function()
        {
            GoogleMaps.ready('map', function (map)
            {
                console.log("ready!");
                SetMarkers();
            });
        });

        Template.gMap.helpers({
            geolocationError: function () {
                var error = Geolocation.error();
                return error && error.message;
            },
            mapOptions: function () {
                var latLng = Geolocation.latLng();

                // Initialize the map once we have the latLng.
                if (GoogleMaps.loaded() && latLng) {
                    return {
                        center: new google.maps.LatLng(latLng.lat, latLng.lng),
                        zoom: MAP_ZOOM
                    };
                }
            }
        });
    }

