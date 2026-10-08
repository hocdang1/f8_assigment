import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Op,
    Order,
    Sequelize,
} from 'sequelize';
import slugify from 'slugify';

export interface SortOptions {
    enabled: boolean;
    column: string;
    type: string;
}

export class Course extends Model<
    InferAttributes<Course>,
    InferCreationAttributes<Course>
> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string | null;
    declare image: string | null;
    declare videoId: string;
    declare level: string | null;

    declare slug: CreationOptional<string>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
    declare deletedAt: CreationOptional<Date | null>;

    // Trả về mảng order cho findAll dựa vào res.locals._sort
    // Dùng: Course.findAll({ order: Course.sortable(res.locals._sort) })
    static sortable(
        sort: SortOptions,
        defaultOrder: Order = [['createdAt', 'DESC']],
    ): Order {
        // chỉ cho sắp xếp theo cột có thật trong model (không tin người dùng)
        const columns = Object.keys(this.getAttributes());

        if (sort.enabled && columns.includes(sort.column)) {
            const type = sort.type === 'asc' ? 'ASC' : 'DESC';
            return [[sort.column, type]];
        }

        return defaultOrder;
    }
}

// Tạo slug từ name, thêm -1, -2... nếu trùng
async function setSlug(course: Course): Promise<void> {
    // name rỗng/sai kiểu vẫn gán slug tạm để lỗi trả về là lỗi validate của name
    const base =
        slugify(String(course.name ?? ''), {
            lower: true,
            strict: true,
            locale: 'vi',
        }) || 'khoa-hoc';
    let slug = base;
    let i = 1;
    while (
        await Course.findOne({
            where: { slug, ...(course.id && { id: { [Op.ne]: course.id } }) },
            paranoid: false, // bản ghi đã xóa mềm vẫn giữ slug
        })
    ) {
        slug = `${base}-${i++}`;
    }
    course.slug = slug;
}

export function initCourse(sequelize: Sequelize): typeof Course {
    Course.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Tên khóa học không được để trống' },
                    notEmpty: { msg: 'Tên khóa học không được để trống' },
                    len: {
                        args: [0, 255],
                        msg: 'Tên khóa học tối đa 255 ký tự',
                    },
                },
            },
            description: {
                type: DataTypes.STRING,
                validate: {
                    len: { args: [0, 255], msg: 'Mô tả tối đa 255 ký tự' },
                },
            },
            image: { type: DataTypes.STRING },
            videoId: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: { msg: 'Video ID không được để trống' },
                    notEmpty: { msg: 'Video ID không được để trống' },
                },
            },
            level: { type: DataTypes.STRING },
            slug: { type: DataTypes.STRING, allowNull: false, unique: true },
            // Sequelize tự quản lý 3 cột này; khai báo ở đây để type của init() khớp với class
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
            deletedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Course',
            tableName: 'courses',
            underscored: true,
            paranoid: true, // xóa mềm: destroy() chỉ ghi deleted_at
            hooks: {
                // Tạo mới: gán slug trước khi validate (slug là NOT NULL)
                async beforeValidate(course) {
                    if (course.isNewRecord && !course.slug)
                        await setSlug(course);
                },
                // Cập nhật: phải gán ở beforeUpdate, vì field đổi trong beforeValidate
                // không được Sequelize đưa vào câu UPDATE
                async beforeUpdate(course) {
                    if (course.changed('name')) await setSlug(course);
                },
            },
        },
    );

    return Course;
}
