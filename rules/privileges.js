function (user, context, callback) {
    var _ = require('lodash');

    var clientScopes = context.request.body.scope || context.request.query.scope;

    clientScopes = clientScopes.split(" ");
    var clientScopesINC = _.intersection(clientScopes, ["items:read", "items:write", "items:delete"]);
    var clienScopesTBI = [];
    //var clientScopesWO = _.without(clientScopes, "items:read", "items:write", "items:delete");

    user.app_metadata = user.app_metadata || [];
    user.app_metadata.role = user.app_metadata.role || '';
    
    switch(user.app_metadata.role.toLowerCase()) {
        case 'child': 
            clienScopesTBI.push("items:read");
            break;
        case 'adult':
            clienScopesTBI.push("items:read");
            clienScopesTBI.push("items:write");
            break;
        case 'admin':
            clienScopesTBI.push("items:read");
            clienScopesTBI.push("items:write");
            clienScopesTBI.push("items:delete");
            break;        
    }
    var clientScopesTBI = _.intersection(clientScopesINC, clienScopesTBI);
    clientScopes = _.without(clientScopes, "items:read", "items:write", "items:delete");
    clientScopes = _.union(clientScopes, clientScopesTBI);
    context.accessToken.scope = clientScopes.join(" ");
    callback(null, user, context);
  }