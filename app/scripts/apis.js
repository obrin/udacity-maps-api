var fsAPI = {
	CLIENT_ID : 'JZZWQ2GOQCFO4J1R03HFTPFMOTNMTQFRGV5XQ2S0KHQYPVMZ',
	CLIENT_SECRET : 'HC1KWRSYXWW5TBRBPW4DKDPH4TEXEVAZQK34GXLW2X1D315G',
	V: '20130815',

	getPlacesIn: function (neighborhood, successCallback, errorCallback) {
	    var endpoint = 'https://api.foursquare.com/v2/venues/search?client_id=' + this.clientId
	        + '&client_secret='
	        + this.clientSecret
	        + '&ll=' + neighborhood.lat + ','
	        + neighborhood.lng
	        + '&v=20140806&m=foursquare';

	    this.get('venues', endpoint, successCallback, errorCallback);
	}

}

