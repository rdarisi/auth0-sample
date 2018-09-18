function (user, context, callback) {
    user.user_metadata = user.user_metadata || {};
    var user_home_geoip = user.user_metadata.homeGeoIP || {};
    if(!user_home_geoip) {
      callback(null, user, context);  
    }
    user.user_metadata.geoip = context.request.geoip;
    user.user_metadata.geoip.distanceFromHome = 
      getLatLngDistance(user_home_geoip.latitude,
                        user_home_geoip.longitude,
                        context.request.geoip.latitude,
                        context.request.geoip.longitude);
    context.idToken['https://rdxonline.com/geoip'] = user.user_metadata.geoip;
    callback(null, user, context);
    
    function getLatLngDistance(lat1,lng1,lat2,lng2) {
      var R = 6371;
      var dLat = deg2rad(lat2-lat1);
      var dLon = deg2rad(lng2-lng1); 
      var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c * 0.621371;
      return d;
    }
    function deg2rad(deg) {
      return deg * (Math.PI/180);
    }
  }