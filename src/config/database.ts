// Chỉ dành cho sequelize-cli (xem .sequelizerc): CLI cần file export thẳng config của DB
// Dùng `export =` (module.exports) vì CLI đọc file này bằng import() và lấy thẳng module.exports
import config from './index';

export = config.db;
