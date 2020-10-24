var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     (req.connection.socket ? req.connection.socket.remoteAddress : null);
Note that sometimes you can get more than one IP address in req.headers['x-forwarded-for']. Also, an x-forwarded-for header will not always be set which may throw an error.

The general format of the field is:

x-forwarded-for: client, proxy1, proxy2, proxy3

where the value is a comma+space separated list of IP addresses, the left-most being the original client, and each successive proxy that passed the request adding the IP address where it received the request from. In this example, the request passed through proxy1, proxy2, and then proxy3. proxy3 appears as remote address of the request.

This is the solution suggested by Arnav Gupta with a fix Martin has suggested below in the comments for cases when x-forwarded-for is not set :

var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress
share edit follow