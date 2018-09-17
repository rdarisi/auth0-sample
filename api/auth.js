//AUTHOR: Raghav Darisi
var auth = {};
auth.hasScope = function(scope) {
    return function(req, res, next) {
        var scopes = req.user.scope.split(' ') || [];
        console.log(scopes);
        if(scopes.indexOf(scope) > -1) {
            next();
        }
        else {
            res.status(403).json({code: 403, message: "not a valid scope"});
        }
    };
};

module.exports = auth;
