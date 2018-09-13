function (user, context, callback) {
    var _ = require('lodash');

    var clientScopes = context.request.body.scope || context.request.query.scope;

    clientScopes = clientScopes.split(" ");
    clientScopes = _.without(clientScopes, "items:read", "items:write", "items:delete");

    user.app_metadata = user.app_metadata || [];
    user.app_metadata.role = user.app_metadata.role || '';
    
    switch(user.app_metadata.role.toLowerCase()) {
        case 'child': 
            clientScopes.push("items:read");
            break;
        case 'adult':
            clientScopes.push("items:read");
            clientScopes.push("items:write");
            break;
        case 'admin':
            clientScopes.push("items:read");
            clientScopes.push("items:write");
            clientScopes.push("items:delete");
            break;        
    }


    context.accessToken.scope = clientScopes.join(" ");
    callback(null, user, context);
  }