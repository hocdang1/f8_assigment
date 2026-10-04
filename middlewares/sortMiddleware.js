module.exports = function sortMiddleware(req, res, next) {
    res.locals._sort = {
        enabled: false,
        type: 'default',
    };

    if (req.query.hasOwnProperty('_sort')) {
        Object.assign(res.locals._sort, {
            enabled: true,
            // chỉ nhận 'asc' hoặc 'desc', giá trị lạ đều coi là 'desc' (chống XSS)
            type: req.query.type === 'asc' ? 'asc' : 'desc',
            column: req.query.column,
        });
    }

    next();
};
