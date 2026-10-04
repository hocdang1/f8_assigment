// Tạo icon + link sắp xếp cho 1 cột trong bảng
// field: tên cột (name, level, createdAt), sort: res.locals._sort
module.exports = function sortable(field, sort) {
    // chỉ cột đang được sắp xếp mới đổi icon, các cột khác giữ icon mặc định
    const sortType = field === sort.column ? sort.type : 'default';

    const icons = {
        default: 'fa-solid fa-sort',
        asc: 'fa-solid fa-arrow-up-short-wide',
        desc: 'fa-solid fa-arrow-down-wide-short',
    };

    // bấm lần sau thì đảo chiều
    const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc',
    };

    return `<a href="?_sort&column=${field}&type=${types[sortType]}"><i class="${icons[sortType]}"></i></a>`;
};
